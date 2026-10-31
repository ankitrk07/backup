import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { createAdminCategory } from "@/lib/services/admin-service"
import { categorySchema } from "@/lib/validations/admin"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const parsed = categorySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 })
  }

  const existing = await db.category.findUnique({ where: { slug: parsed.data.slug } })
  if (existing) {
    return NextResponse.json({ error: "A category with this slug already exists" }, { status: 400 })
  }

  const category = await createAdminCategory(parsed.data)
  return NextResponse.json({ id: category.id })
}
