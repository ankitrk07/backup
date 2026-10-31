import { NextResponse } from "next/server"
import { z } from "zod"
import { auth } from "@/lib/auth"
import { createOrder } from "@/lib/services/order-service"

const bodySchema = z.object({
  items: z.array(z.object({ variantId: z.string().min(1), quantity: z.number().int().min(1).max(20) })).min(1),
  shippingAddressId: z.string().min(1),
  billingAddressId: z.string().min(1),
  couponCode: z.string().optional(),
  paymentMethod: z.enum(["CARD", "UPI", "NET_BANKING", "WALLET", "COD"]),
  deliveryMethod: z.enum(["standard", "express"]),
})

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Please sign in to place an order." }, { status: 401 })
  }

  const json = await request.json().catch(() => null)
  const parsed = bodySchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid checkout request." }, { status: 400 })
  }

  const result = await createOrder({ ...parsed.data, userId: session.user.id })

  if (!result.success) {
    return NextResponse.json(result, { status: 400 })
  }
  return NextResponse.json(result)
}
