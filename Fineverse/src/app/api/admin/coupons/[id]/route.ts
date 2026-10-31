import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { deleteAdminCoupon, updateAdminCoupon } from "@/lib/services/admin-service"
import { couponSchema } from "@/lib/validations/admin"
import { db } from "@/lib/db"

export async function PATCH(request: Request, { params }: RouteContext<"/api/admin/coupons/[id]">) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json().catch(() => null)
  const parsed = couponSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 })
  }

  const existing = await db.coupon.findFirst({ where: { code: parsed.data.code, id: { not: id } } })
  if (existing) {
    return NextResponse.json({ error: "A coupon with this code already exists" }, { status: 400 })
  }

  await updateAdminCoupon(id, parsed.data)
  return NextResponse.json({ success: true })
}

export async function DELETE(_request: Request, { params }: RouteContext<"/api/admin/coupons/[id]">) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  await deleteAdminCoupon(id)
  return NextResponse.json({ success: true })
}
