import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { registerSchema } from "@/lib/validations/auth"

export async function POST(request: Request) {
  const json = await request.json().catch(() => null)
  const parsed = registerSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    )
  }

  const { name, email, password } = parsed.data
  const normalizedEmail = email.toLowerCase()

  const existing = await db.user.findUnique({ where: { email: normalizedEmail } })
  if (existing) {
    return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 })
  }

  const passwordHash = await bcrypt.hash(password, 12)

  await db.user.create({
    data: { name, email: normalizedEmail, passwordHash, role: "CUSTOMER" },
  })

  return NextResponse.json({ success: true })
}
