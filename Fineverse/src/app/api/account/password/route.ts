import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { changePasswordSchema } from "@/lib/validations/auth"

export async function PATCH(request: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const json = await request.json().catch(() => null)
  const parsed = changePasswordSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    )
  }

  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (!user?.passwordHash) {
    return NextResponse.json({ error: "Password change is not available for this account" }, { status: 400 })
  }

  const valid = await bcrypt.compare(parsed.data.currentPassword, user.passwordHash)
  if (!valid) {
    return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
  }

  const passwordHash = await bcrypt.hash(parsed.data.newPassword, 12)
  await db.user.update({ where: { id: user.id }, data: { passwordHash } })

  return NextResponse.json({ success: true })
}
