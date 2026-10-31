import { db } from "@/lib/db"
import type { ProductInput, CategoryInput, CouponInput } from "@/lib/validations/admin"
import type { OrderStatus, Prisma } from "@/generated/prisma/client"

// ── Dashboard ──────────────────────────────────────────────────────────────

export async function getDashboardMetrics() {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

  // Sequential, not Promise.all: local dev runs against PGlite over a single
  // physical connection (DB_POOL_MAX=1, see db.ts), and firing this many
  // queries concurrently against it has been observed to interleave/cross
  // over results between queries. Real Postgres would handle the concurrent
  // form fine, but correctness on the dev DB wins here.
  const revenueAgg = await db.order.aggregate({
    where: { status: { not: "CANCELLED" } },
    _sum: { total: true },
  })
  const orderCount = await db.order.count({ where: { status: { not: "CANCELLED" } } })
  const customerCount = await db.user.count({ where: { role: "CUSTOMER" } })
  const productCount = await db.product.count({ where: { isActive: true } })
  const pendingOrderCount = await db.order.count({ where: { status: "PENDING" } })
  // Prisma's query builder can't compare two columns (stock vs.
  // lowStockThreshold) directly, so fetch active-product variants and
  // filter in memory — fine at this catalog's scale.
  const lowStockVariants = await db.productVariant
    .findMany({
      where: { product: { isActive: true } },
      include: { product: { select: { name: true, slug: true, isActive: true } } },
      orderBy: { stock: "asc" },
    })
    .then((variants) => variants.filter((v) => v.stock <= v.lowStockThreshold).slice(0, 8))
  const revenueByDay = await db.order.findMany({
    where: { status: { not: "CANCELLED" }, createdAt: { gte: thirtyDaysAgo } },
    select: { total: true, createdAt: true },
  })
  const recentOrders = await db.order.findMany({
    where: {},
    select: {
      id: true,
      orderNumber: true,
      total: true,
      status: true,
      createdAt: true,
      user: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 8,
  })

  const dailyRevenue = new Map<string, number>()
  for (const o of revenueByDay) {
    const key = o.createdAt.toISOString().slice(0, 10)
    dailyRevenue.set(key, (dailyRevenue.get(key) ?? 0) + Number(o.total))
  }
  const chartData: { date: string; revenue: number }[] = []
  for (let i = 13; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
    const key = d.toISOString().slice(0, 10)
    chartData.push({ date: key, revenue: dailyRevenue.get(key) ?? 0 })
  }

  return {
    totalRevenue: Number(revenueAgg._sum.total ?? 0),
    orderCount,
    customerCount,
    productCount,
    pendingOrderCount,
    lowStockVariants,
    recentOrders,
    chartData,
  }
}

// ── Products ───────────────────────────────────────────────────────────────

const ADMIN_PAGE_SIZE = 20

export async function getAdminProducts(params: { q?: string; page?: number }) {
  const page = Math.max(1, params.page ?? 1)
  const where: Prisma.ProductWhereInput = params.q?.trim()
    ? {
        OR: [
          { name: { contains: params.q, mode: "insensitive" } },
          { sku: { contains: params.q, mode: "insensitive" } },
        ],
      }
    : {}

  const [products, total] = await Promise.all([
    db.product.findMany({
      where,
      include: {
        category: true,
        brand: true,
        images: { orderBy: { position: "asc" }, take: 1 },
        variants: { select: { stock: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * ADMIN_PAGE_SIZE,
      take: ADMIN_PAGE_SIZE,
    }),
    db.product.count({ where }),
  ])

  return {
    products,
    total,
    page,
    pageCount: Math.max(1, Math.ceil(total / ADMIN_PAGE_SIZE)),
  }
}

export async function getAdminProductById(id: string) {
  return db.product.findUnique({
    where: { id },
    include: {
      images: { orderBy: { position: "asc" } },
      variants: true,
      specifications: { orderBy: { position: "asc" } },
    },
  })
}

function productWriteData(input: ProductInput) {
  return {
    name: input.name,
    slug: input.slug,
    description: input.description,
    highlights: input.highlights,
    sku: input.sku,
    basePrice: input.basePrice,
    compareAtPrice: input.compareAtPrice ?? null,
    costPrice: input.costPrice ?? null,
    condition: input.condition,
    categoryId: input.categoryId,
    brandId: input.brandId || null,
    minAgeMonths: input.minAgeMonths ?? null,
    maxAgeMonths: input.maxAgeMonths ?? null,
    safetyInfo: input.safetyInfo || null,
    material: input.material || null,
    warrantyMonths: input.warrantyMonths ?? null,
    isActive: input.isActive,
    isFeatured: input.isFeatured,
    isBestseller: input.isBestseller,
    isNew: input.isNew,
    metaTitle: input.metaTitle || null,
    metaDescription: input.metaDescription || null,
  }
}

export async function createAdminProduct(input: ProductInput) {
  const { categoryId, brandId, ...rest } = productWriteData(input)

  return db.product.create({
    data: {
      ...rest,
      category: { connect: { id: categoryId } },
      brand: brandId ? { connect: { id: brandId } } : undefined,
      images: { create: input.images.map((url, i) => ({ url, position: i })) },
      variants: {
        create: input.variants.map((v) => ({
          sku: v.sku,
          size: v.size || null,
          color: v.color || null,
          colorHex: v.colorHex || null,
          priceOverride: v.priceOverride ?? null,
          stock: v.stock,
          lowStockThreshold: v.lowStockThreshold,
          isDefault: v.isDefault,
        })),
      },
      specifications: {
        create: input.specifications.map((s, i) => ({ ...s, position: i })),
      },
    },
  })
}

export async function updateAdminProduct(id: string, input: ProductInput) {
  const { categoryId, brandId, ...rest } = productWriteData(input)

  return db.$transaction(async (tx) => {
    await tx.product.update({
      where: { id },
      data: {
        ...rest,
        category: { connect: { id: categoryId } },
        brand: brandId ? { connect: { id: brandId } } : { disconnect: true },
      },
    })

    await tx.productImage.deleteMany({ where: { productId: id } })
    await tx.productImage.createMany({
      data: input.images.map((url, i) => ({ productId: id, url, position: i })),
    })

    await tx.productSpecification.deleteMany({ where: { productId: id } })
    await tx.productSpecification.createMany({
      data: input.specifications.map((s, i) => ({ productId: id, ...s, position: i })),
    })

    const existingVariantIds = (await tx.productVariant.findMany({ where: { productId: id }, select: { id: true } })).map(
      (v) => v.id
    )
    const keptIds = input.variants.filter((v) => v.id).map((v) => v.id!)
    const toDelete = existingVariantIds.filter((vid) => !keptIds.includes(vid))
    if (toDelete.length) {
      await tx.productVariant.deleteMany({ where: { id: { in: toDelete } } })
    }

    for (const v of input.variants) {
      const data = {
        sku: v.sku,
        size: v.size || null,
        color: v.color || null,
        colorHex: v.colorHex || null,
        priceOverride: v.priceOverride ?? null,
        stock: v.stock,
        lowStockThreshold: v.lowStockThreshold,
        isDefault: v.isDefault,
      }
      if (v.id) {
        await tx.productVariant.update({ where: { id: v.id }, data })
      } else {
        await tx.productVariant.create({ data: { ...data, productId: id } })
      }
    }

    return tx.product.findUniqueOrThrow({ where: { id } })
  })
}

export async function deleteAdminProduct(id: string) {
  return db.product.update({ where: { id }, data: { isActive: false } })
}

// ── Categories ─────────────────────────────────────────────────────────────

export async function getAdminCategories() {
  const all = await db.category.findMany({
    include: { parent: true, _count: { select: { products: true, children: true } } },
    orderBy: { position: "asc" },
  })

  // Postgres sorts NULLs last by default, so ordering by parentId alone
  // pushes every top-level category (parentId: null) below its own
  // children. Interleave manually: each top-level category immediately
  // followed by its children, instead of relying on SQL null ordering.
  const byParent = new Map<string, typeof all>()
  for (const c of all) {
    if (!c.parentId) continue
    const list = byParent.get(c.parentId) ?? []
    list.push(c)
    byParent.set(c.parentId, list)
  }

  const ordered: typeof all = []
  for (const c of all.filter((c) => !c.parentId)) {
    ordered.push(c)
    ordered.push(...(byParent.get(c.id) ?? []))
  }

  return ordered
}

export async function createAdminCategory(input: CategoryInput) {
  return db.category.create({
    data: {
      name: input.name,
      slug: input.slug,
      description: input.description || null,
      image: input.image || null,
      icon: input.icon || null,
      parentId: input.parentId || null,
      position: input.position,
    },
  })
}

export async function updateAdminCategory(id: string, input: CategoryInput) {
  return db.category.update({
    where: { id },
    data: {
      name: input.name,
      slug: input.slug,
      description: input.description || null,
      image: input.image || null,
      icon: input.icon || null,
      parentId: input.parentId || null,
      position: input.position,
    },
  })
}

export async function deleteAdminCategory(id: string) {
  const productCount = await db.product.count({ where: { categoryId: id } })
  const childCount = await db.category.count({ where: { parentId: id } })
  if (productCount > 0 || childCount > 0) {
    return { success: false as const, error: "Category has products or subcategories and can't be deleted." }
  }
  await db.category.delete({ where: { id } })
  return { success: true as const }
}

// ── Orders ─────────────────────────────────────────────────────────────────

export async function getAdminOrders(params: { status?: OrderStatus; q?: string; page?: number }) {
  const page = Math.max(1, params.page ?? 1)
  const where: Prisma.OrderWhereInput = {
    ...(params.status ? { status: params.status } : {}),
    ...(params.q?.trim()
      ? {
          OR: [
            { orderNumber: { contains: params.q, mode: "insensitive" } },
            { user: { email: { contains: params.q, mode: "insensitive" } } },
            { user: { name: { contains: params.q, mode: "insensitive" } } },
          ],
        }
      : {}),
  }

  const [orders, total] = await Promise.all([
    db.order.findMany({
      where,
      include: { user: { select: { name: true, email: true } }, items: true, payment: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * ADMIN_PAGE_SIZE,
      take: ADMIN_PAGE_SIZE,
    }),
    db.order.count({ where }),
  ])

  return { orders, total, page, pageCount: Math.max(1, Math.ceil(total / ADMIN_PAGE_SIZE)) }
}

export async function getAdminOrderById(id: string) {
  return db.order.findUnique({
    where: { id },
    include: {
      user: true,
      items: true,
      payment: true,
      shippingAddress: true,
      billingAddress: true,
      coupon: true,
      events: { orderBy: { createdAt: "asc" } },
    },
  })
}

export const VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PROCESSING", "CANCELLED"],
  PROCESSING: ["SHIPPED", "CANCELLED"],
  SHIPPED: ["OUT_FOR_DELIVERY", "DELIVERED"],
  OUT_FOR_DELIVERY: ["DELIVERED"],
  DELIVERED: ["RETURNED"],
  CANCELLED: [],
  RETURNED: [],
}

export async function updateOrderStatus(orderId: string, status: OrderStatus, note?: string) {
  const order = await db.order.findUnique({ where: { id: orderId }, include: { items: true, payment: true } })
  if (!order) return { success: false as const, error: "Order not found" }

  if (order.status !== status && !VALID_TRANSITIONS[order.status].includes(status)) {
    return { success: false as const, error: `Cannot move an order from ${order.status} to ${status}` }
  }

  await db.$transaction(async (tx) => {
    await tx.order.update({
      where: { id: orderId },
      data: {
        status,
        cancelledAt: status === "CANCELLED" ? new Date() : order.cancelledAt,
      },
    })
    await tx.orderEvent.create({ data: { orderId, status, note } })

    if (status === "CANCELLED" && order.status !== "CANCELLED") {
      for (const item of order.items) {
        await tx.productVariant.update({ where: { id: item.variantId }, data: { stock: { increment: item.quantity } } })
      }
      if (order.payment && order.payment.status === "PAID") {
        await tx.payment.update({ where: { orderId }, data: { status: "REFUNDED" } })
      }
    }
    if (status === "DELIVERED" && order.payment?.method === "COD" && order.payment.status === "PENDING") {
      await tx.payment.update({ where: { orderId }, data: { status: "PAID" } })
    }
  })

  return { success: true as const }
}

// ── Customers ──────────────────────────────────────────────────────────────

export async function getAdminCustomers(params: { q?: string; page?: number }) {
  const page = Math.max(1, params.page ?? 1)
  const where: Prisma.UserWhereInput = {
    role: "CUSTOMER",
    ...(params.q?.trim()
      ? {
          OR: [
            { name: { contains: params.q, mode: "insensitive" } },
            { email: { contains: params.q, mode: "insensitive" } },
          ],
        }
      : {}),
  }

  const [customers, total] = await Promise.all([
    db.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        _count: { select: { orders: true } },
        orders: { where: { status: { not: "CANCELLED" } }, select: { total: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * ADMIN_PAGE_SIZE,
      take: ADMIN_PAGE_SIZE,
    }),
    db.user.count({ where }),
  ])

  return {
    customers: customers.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      createdAt: c.createdAt,
      orderCount: c._count.orders,
      totalSpent: c.orders.reduce((sum, o) => sum + Number(o.total), 0),
    })),
    total,
    page,
    pageCount: Math.max(1, Math.ceil(total / ADMIN_PAGE_SIZE)),
  }
}

export async function getAdminCustomerById(id: string) {
  return db.user.findUnique({
    where: { id, role: "CUSTOMER" },
    include: {
      addresses: true,
      orders: { include: { items: true }, orderBy: { createdAt: "desc" } },
    },
  })
}

// ── Reviews ────────────────────────────────────────────────────────────────

export async function getAdminReviews(params: { page?: number }) {
  const page = Math.max(1, params.page ?? 1)
  const [reviews, total] = await Promise.all([
    db.review.findMany({
      include: { user: { select: { name: true, email: true } }, product: { select: { name: true, slug: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * ADMIN_PAGE_SIZE,
      take: ADMIN_PAGE_SIZE,
    }),
    db.review.count(),
  ])
  return { reviews, total, page, pageCount: Math.max(1, Math.ceil(total / ADMIN_PAGE_SIZE)) }
}

export async function deleteAdminReview(id: string) {
  const review = await db.review.findUnique({ where: { id } })
  if (!review) return { success: false as const, error: "Review not found" }

  await db.$transaction(async (tx) => {
    await tx.review.delete({ where: { id } })
    const agg = await tx.review.aggregate({ where: { productId: review.productId }, _avg: { rating: true }, _count: true })
    await tx.product.update({
      where: { id: review.productId },
      data: { avgRating: agg._avg.rating ?? 0, reviewCount: agg._count },
    })
  })

  return { success: true as const }
}

// ── Coupons ────────────────────────────────────────────────────────────────

export async function getAdminCoupons() {
  return db.coupon.findMany({ orderBy: { createdAt: "desc" } })
}

export async function createAdminCoupon(input: CouponInput) {
  return db.coupon.create({
    data: {
      code: input.code,
      description: input.description || null,
      type: input.type,
      value: input.value,
      minOrderValue: input.minOrderValue ?? null,
      maxDiscount: input.maxDiscount ?? null,
      usageLimit: input.usageLimit ?? null,
      isActive: input.isActive,
      startsAt: input.startsAt ? new Date(input.startsAt) : null,
      expiresAt: input.expiresAt ? new Date(input.expiresAt) : null,
    },
  })
}

export async function updateAdminCoupon(id: string, input: CouponInput) {
  return db.coupon.update({
    where: { id },
    data: {
      code: input.code,
      description: input.description || null,
      type: input.type,
      value: input.value,
      minOrderValue: input.minOrderValue ?? null,
      maxDiscount: input.maxDiscount ?? null,
      usageLimit: input.usageLimit ?? null,
      isActive: input.isActive,
      startsAt: input.startsAt ? new Date(input.startsAt) : null,
      expiresAt: input.expiresAt ? new Date(input.expiresAt) : null,
    },
  })
}

export async function deleteAdminCoupon(id: string) {
  await db.coupon.delete({ where: { id } })
}

export async function getAdminCategoryOptions() {
  return db.category.findMany({ select: { id: true, name: true, parentId: true }, orderBy: { name: "asc" } })
}

export async function getAdminBrandOptions() {
  return db.brand.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } })
}
