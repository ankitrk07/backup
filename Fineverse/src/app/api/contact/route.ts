import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/services/email-service"
import { contactSchema } from "@/lib/validations/contact"
import { siteConfig } from "@/lib/constants"

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 })
  }

  const { name, email, subject, message } = parsed.data

  await sendEmail({
    to: siteConfig.supportEmail,
    subject: `[Contact Form] ${escapeHtml(subject)}`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>New contact form submission</h2>
        <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>
    `,
  })

  return NextResponse.json({ success: true })
}
