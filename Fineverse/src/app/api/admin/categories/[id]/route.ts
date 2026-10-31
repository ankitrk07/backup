import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { deleteAdminCategory, updateAdminCategory } from "@/lib/services/admin-service"
import { categorySchema } from "@/lib/validations/admin"
import { db } from "@/lib/db"

export async function PATCH(request: Request, { params }: RouteContext<"/api/admin/categories/[id]">) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json().catch(() => null)
  const parsed = categorySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 })
  }

  if (parsed.data.parentId === id) {
    return NextResponse.json({ error: "A category can't be its own parent" }, { status: 400 })
  }

  const existing = await db.category.findFirst({ where: { slug: parsed.data.slug, id: { not: id } } })
  if (existing) {
    return NextResponse.json({ error: "A category with this slug already exists" }, { status: 400 })
  }

  await updateAdminCategory(id, parsed.data)
  return NextResponse.json({ success: true })
}

export async function DELETE(_request: Request, { params }: RouteContext<"/api/admin/categories/[id]">) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const result = await deleteAdminCategory(id)
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }
  return NextResponse.json({ success: true })
}
