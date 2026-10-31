import { NextResponse } from "next/server"
import Stripe from "stripe"
import { db } from "@/lib/db"

// The only place a payment is ever marked PAID. The checkout route creates
// the order and PaymentIntent but never assumes success — this webhook,
// verified against Stripe's signature, is the single source of truth once
// a real gateway is configured.
export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secretKey || !webhookSecret) {
    return NextResponse.json({ error: "Stripe is not configured" }, { status: 400 })
  }

  const signature = request.headers.get("stripe-signature")
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  const stripe = new Stripe(secretKey)
  const payload = await request.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret)
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  if (event.type === "payment_intent.succeeded" || event.type === "payment_intent.payment_failed") {
    const intent = event.data.object as Stripe.PaymentIntent
    const payment = await db.payment.findFirst({ where: { providerPaymentId: intent.id } })

    if (payment) {
      const succeeded = event.type === "payment_intent.succeeded"
      await db.payment.update({
        where: { id: payment.id },
        data: {
          status: succeeded ? "PAID" : "FAILED",
          failureReason: succeeded ? null : (intent.last_payment_error?.message ?? "Payment failed"),
        },
      })
      await db.order.update({
        where: { id: payment.orderId },
        data: { status: succeeded ? "CONFIRMED" : "CANCELLED" },
      })
      await db.orderEvent.create({
        data: {
          orderId: payment.orderId,
          status: succeeded ? "CONFIRMED" : "CANCELLED",
          note: succeeded ? "Payment confirmed via Stripe" : "Payment failed",
        },
      })
    }
  }

  return NextResponse.json({ received: true })
}
