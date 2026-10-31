import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { createAdminCoupon } from "@/lib/services/admin-service"
import { couponSchema } from "@/lib/validations/admin"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const parsed = couponSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 })
  }

  const existing = await db.coupon.findUnique({ where: { code: parsed.data.code } })
  if (existing) {
    return NextResponse.json({ error: "A coupon with this code already exists" }, { status: 400 })
  }

  const coupon = await createAdminCoupon(parsed.data)
  return NextResponse.json({ id: coupon.id })
}
