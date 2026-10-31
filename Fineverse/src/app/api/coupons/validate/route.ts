import { NextResponse } from "next/server"
import { z } from "zod"
import { validateCoupon } from "@/lib/services/coupon-service"

const bodySchema = z.object({
  code: z.string().min(1).max(40),
  subtotal: z.number().min(0),
})

export async function POST(request: Request) {
  const json = await request.json().catch(() => null)
  const parsed = bodySchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ valid: false, message: "Invalid request" }, { status: 400 })
  }

  const result = await validateCoupon(parsed.data.code, parsed.data.subtotal)
  return NextResponse.json(result)
}
