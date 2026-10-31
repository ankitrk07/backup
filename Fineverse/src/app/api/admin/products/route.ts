import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { createAdminProduct } from "@/lib/services/admin-service"
import { productSchema } from "@/lib/validations/admin"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const parsed = productSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 })
  }

  const existingSlug = await db.product.findUnique({ where: { slug: parsed.data.slug } })
  if (existingSlug) {
    return NextResponse.json({ error: "A product with this slug already exists" }, { status: 400 })
  }
  const existingSku = await db.product.findUnique({ where: { sku: parsed.data.sku } })
  if (existingSku) {
    return NextResponse.json({ error: "A product with this SKU already exists" }, { status: 400 })
  }

  const product = await createAdminProduct(parsed.data)
  return NextResponse.json({ id: product.id })
}
