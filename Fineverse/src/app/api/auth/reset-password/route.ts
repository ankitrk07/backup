import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { resetPasswordSchema } from "@/lib/validations/auth"

export async function POST(request: Request) {
  const json = await request.json().catch(() => null)
  const parsed = resetPasswordSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    )
  }

  const { token, password } = parsed.data

  const record = await db.verificationToken.findUnique({ where: { token } })
  if (!record || record.expires < new Date()) {
    if (record) await db.verificationToken.delete({ where: { token } }).catch(() => {})
    return NextResponse.json({ error: "This reset link is invalid or has expired." }, { status: 400 })
  }

  const passwordHash = await bcrypt.hash(password, 12)
  await db.user.update({ where: { email: record.identifier }, data: { passwordHash } })
  await db.verificationToken.delete({ where: { token } })

  return NextResponse.json({ success: true })
}
