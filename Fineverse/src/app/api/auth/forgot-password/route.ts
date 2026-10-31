import { NextResponse } from "next/server"
import crypto from "node:crypto"
import { db } from "@/lib/db"
import { forgotPasswordSchema } from "@/lib/validations/auth"
import { sendEmail, passwordResetEmail } from "@/lib/services/email-service"

const TOKEN_TTL_MS = 60 * 60 * 1000 // 1 hour

export async function POST(request: Request) {
  const json = await request.json().catch(() => null)
  const parsed = forgotPasswordSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 })
  }

  const email = parsed.data.email.toLowerCase()
  const user = await db.user.findUnique({ where: { email } })

  // Always respond the same way regardless of whether the account exists,
  // to avoid leaking which emails are registered.
  if (user) {
    const token = crypto.randomBytes(32).toString("hex")
    await db.verificationToken.create({
      data: { identifier: email, token, expires: new Date(Date.now() + TOKEN_TTL_MS) },
    })

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/reset-password?token=${token}`
    const { subject, html } = passwordResetEmail(resetUrl)
    await sendEmail({ to: email, subject, html })
  }

  return NextResponse.json({
    message: "If an account exists with that email, we've sent a password reset link.",
  })
}
