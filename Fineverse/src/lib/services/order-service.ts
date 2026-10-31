import { db } from "@/lib/db"
import { generateOrderNumber } from "@/lib/utils"
import { calculateOrderTotals, type DeliveryMethod } from "@/lib/pricing"
import { validateCoupon } from "@/lib/services/coupon-service"
import { getPaymentProvider, PaymentProviderNotConfiguredError, type CreatePaymentResult } from "@/lib/services/payment-service"
import type { PaymentMethod } from "@/generated/prisma/client"

export type CreateOrderInput = {
  userId: string
  items: { variantId: string; quantity: number }[]
  shippingAddressId: string
  billingAddressId: string
  couponCode?: string
  paymentMethod: PaymentMethod
  deliveryMethod: DeliveryMethod
}

export type CreateOrderResult =
  | {
      success: true
      orderId: string
      orderNumber: string
      total: number
      payment: CreatePaymentResult
    }
  | {
      success: false
      error: string
      unavailableItems?: { variantId: string; name: string; availableStock: number }[]
    }

export async function createOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
  if (input.items.length === 0) {
    return { success: false, error: "Your cart is empty." }
  }

  // Never trust client-supplied prices or stock — re-fetch everything fresh.
  const variants = await db.productVariant.findMany({
    where: { id: { in: input.items.map((i) => i.variantId) } },
    include: { product: { include: { images: { orderBy: { position: "asc" }, take: 1 } } } },
  })

  const variantMap = new Map(variants.map((v) => [v.id, v]))
  const unavailableItems: { variantId: string; name: string; availableStock: number }[] = []

  for (const item of input.items) {
    const variant = variantMap.get(item.variantId)
    if (!variant || !variant.product.isActive) {
      unavailableItems.push({ variantId: item.variantId, name: "Unknown item", availableStock: 0 })
      continue
    }
    if (variant.stock < item.quantity) {
      unavailableItems.push({
        variantId: item.variantId,
        name: variant.product.name,
        availableStock: variant.stock,
      })
    }
  }

  if (unavailableItems.length > 0) {
    return {
      success: false,
      error: "Some items in your cart are no longer available in the requested quantity.",
      unavailableItems,
    }
  }

  const [shippingAddress, billingAddress] = await Promise.all([
    db.address.findFirst({ where: { id: input.shippingAddressId, userId: input.userId } }),
    db.address.findFirst({ where: { id: input.billingAddressId, userId: input.userId } }),
  ])
  if (!shippingAddress || !billingAddress) {
    return { success: false, error: "Please select a valid shipping and billing address." }
  }

  const lineItems = input.items.map((item) => {
    const variant = variantMap.get(item.variantId)!
    const price = variant.priceOverride ? Number(variant.priceOverride) : Number(variant.product.basePrice)
    return { variant, quantity: item.quantity, price }
  })
  const subtotal = lineItems.reduce((sum, li) => sum + li.price * li.quantity, 0)

  let couponId: string | null = null
  let discount = 0
  if (input.couponCode) {
    const result = await validateCoupon(input.couponCode, subtotal)
    if (!result.valid) {
      return { success: false, error: result.message }
    }
    discount = result.discount
    const coupon = await db.coupon.findUnique({ where: { code: result.code } })
    couponId = coupon?.id ?? null
  }

  const { shipping, tax, total } = calculateOrderTotals(subtotal, discount, input.deliveryMethod)
  const orderNumber = generateOrderNumber()
  const isCod = input.paymentMethod === "COD"

  // Order + stock decrement + coupon usage happen atomically first. The
  // payment provider call is a network request to an external API, so it
  // deliberately happens *outside* the DB transaction (holding a Postgres
  // transaction open across a network round-trip risks long-lived locks).
  // If the payment step fails afterward, the order still exists as PENDING
  // with no Payment row — recoverable by retrying payment, not silently
  // marked paid.
  const order = await db.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        orderNumber,
        userId: input.userId,
        status: isCod ? "CONFIRMED" : "PENDING",
        subtotal,
        discount,
        shipping,
        tax,
        total,
        couponId,
        shippingAddressId: shippingAddress.id,
        billingAddressId: billingAddress.id,
        estimatedDeliveryAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        items: {
          create: lineItems.map((li) => ({
            productId: li.variant.productId,
            variantId: li.variant.id,
            name: li.variant.product.name,
            image: li.variant.product.images[0]?.url ?? null,
            sku: li.variant.sku,
            size: li.variant.size,
            color: li.variant.color,
            price: li.price,
            quantity: li.quantity,
          })),
        },
        events: {
          create: {
            status: isCod ? "CONFIRMED" : "PENDING",
            note: isCod ? "Order placed (Cash on Delivery)" : "Awaiting payment",
          },
        },
      },
    })

    for (const li of lineItems) {
      await tx.productVariant.update({
        where: { id: li.variant.id },
        data: { stock: { decrement: li.quantity } },
      })
    }
    await tx.product.updateMany({
      where: { id: { in: lineItems.map((li) => li.variant.productId) } },
      data: { soldCount: { increment: 1 } },
    })

    if (couponId) {
      await tx.coupon.update({ where: { id: couponId }, data: { usedCount: { increment: 1 } } })
    }

    return created
  })

  let payment: CreatePaymentResult
  try {
    const provider = getPaymentProvider(input.paymentMethod)
    payment = await provider.createPayment({
      orderId: order.id,
      orderNumber: order.orderNumber,
      amount: total,
      currency: "INR",
    })
  } catch (error) {
    if (error instanceof PaymentProviderNotConfiguredError) {
      return { success: false, error: error.message }
    }
    throw error
  }

  await db.payment.create({
    data: {
      orderId: order.id,
      provider: payment.provider,
      providerPaymentId: payment.providerPaymentId,
      status: "PENDING",
      method: input.paymentMethod,
      amount: total,
      currency: "INR",
    },
  })

  return {
    success: true,
    orderId: order.id,
    orderNumber: order.orderNumber,
    total,
    payment,
  }
}

const orderInclude = {
  items: true,
  payment: true,
  shippingAddress: true,
  billingAddress: true,
  coupon: true,
  events: { orderBy: { createdAt: "asc" as const } },
}

export async function getOrderByNumber(orderNumber: string, userId: string) {
  return db.order.findFirst({ where: { orderNumber, userId }, include: orderInclude })
}

export async function getOrderById(id: string, userId: string) {
  return db.order.findFirst({ where: { id, userId }, include: orderInclude })
}

export async function getUserOrders(userId: string) {
  return db.order.findMany({
    where: { userId },
    include: { items: true, payment: true },
    orderBy: { createdAt: "desc" },
  })
}

const CANCELLABLE_STATUSES = ["PENDING", "CONFIRMED", "PROCESSING"] as const

export async function cancelOrder(orderId: string, userId: string, reason?: string) {
  const order = await db.order.findFirst({ where: { id: orderId, userId }, include: { items: true, payment: true } })
  if (!order) return { success: false as const, error: "Order not found" }
  if (!CANCELLABLE_STATUSES.includes(order.status as (typeof CANCELLABLE_STATUSES)[number])) {
    return { success: false as const, error: "This order can no longer be cancelled" }
  }

  await db.$transaction(async (tx) => {
    await tx.order.update({
      where: { id: orderId },
      data: { status: "CANCELLED", cancelledAt: new Date(), cancelReason: reason ?? null },
    })
    await tx.orderEvent.create({
      data: { orderId, status: "CANCELLED", note: reason ?? "Cancelled by customer" },
    })
    for (const item of order.items) {
      await tx.productVariant.update({ where: { id: item.variantId }, data: { stock: { increment: item.quantity } } })
    }
    if (order.payment && order.payment.status === "PAID") {
      await tx.payment.update({ where: { orderId }, data: { status: "REFUNDED" } })
    }
  })

  return { success: true as const }
}
