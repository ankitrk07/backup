import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { deleteAdminProduct, updateAdminProduct } from "@/lib/services/admin-service"
import { productSchema } from "@/lib/validations/admin"
import { db } from "@/lib/db"

export async function PATCH(request: Request, { params }: RouteContext<"/api/admin/products/[id]">) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json().catch(() => null)
  const parsed = productSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 })
  }

  const existingSlug = await db.product.findFirst({ where: { slug: parsed.data.slug, id: { not: id } } })
  if (existingSlug) {
    return NextResponse.json({ error: "A product with this slug already exists" }, { status: 400 })
  }
  const existingSku = await db.product.findFirst({ where: { sku: parsed.data.sku, id: { not: id } } })
  if (existingSku) {
    return NextResponse.json({ error: "A product with this SKU already exists" }, { status: 400 })
  }

  await updateAdminProduct(id, parsed.data)
  return NextResponse.json({ success: true })
}

export async function DELETE(_request: Request, { params }: RouteContext<"/api/admin/products/[id]">) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  await deleteAdminProduct(id)
  return NextResponse.json({ success: true })
}
