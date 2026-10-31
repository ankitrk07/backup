// Minimal email abstraction. Sends via Resend when RESEND_API_KEY is
// configured; otherwise logs the message to the server console so the flow
// (e.g. password reset) is still fully exercisable in development without
// pretending an email was actually delivered.

type SendEmailInput = {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: SendEmailInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM ?? "Fineverse <orders@fineverse.example>"

  if (!apiKey) {
    console.log(`\n[email-service] RESEND_API_KEY not configured — logging instead of sending.`)
    console.log(`[email-service] To: ${to}`)
    console.log(`[email-service] Subject: ${subject}`)
    console.log(`[email-service] Body:\n${html}\n`)
    return
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => "")
    throw new Error(`Failed to send email via Resend: ${res.status} ${body}`)
  }
}

export function passwordResetEmail(resetUrl: string) {
  return {
    subject: "Reset your Fineverse password",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Reset your password</h2>
        <p>We received a request to reset your Fineverse password. Click the button below to choose a new one. This link expires in 1 hour.</p>
        <p><a href="${resetUrl}" style="display: inline-block; background: #131417; color: #fff; padding: 12px 20px; border-radius: 8px; text-decoration: none;">Reset Password</a></p>
        <p>If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  }
}
