import Stripe from "stripe"
import type { PaymentMethod } from "@/generated/prisma/client"

export class PaymentProviderNotConfiguredError extends Error {}

export type CreatePaymentInput = {
  orderId: string
  orderNumber: string
  amount: number
  currency: string
}

export type CreatePaymentResult =
  | { status: "requires_action"; clientSecret: string; providerPaymentId: string; provider: string }
  | { status: "pending_fulfillment"; providerPaymentId: null; provider: string }

export interface PaymentProvider {
  readonly name: string
  createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult>
}

// Cash on Delivery needs no external gateway — the order is confirmed
// immediately and payment is collected on delivery. This is a genuine,
// commonly-offered payment method, not a stand-in for a "fake" success path.
class CodProvider implements PaymentProvider {
  readonly name = "cod"

  async createPayment(): Promise<CreatePaymentResult> {
    return { status: "pending_fulfillment", providerPaymentId: null, provider: this.name }
  }
}

// Real Stripe integration. Requires STRIPE_SECRET_KEY — if it's not set,
// getPaymentProvider() throws PaymentProviderNotConfiguredError rather than
// falling back to a fake success, per the "never pretend a payment
// succeeded" requirement. Client confirms the PaymentIntent via Stripe.js;
// the webhook in src/app/api/webhooks/stripe/route.ts marks the order paid
// once Stripe confirms the charge — this route never marks a payment
// successful on its own.
class StripeProvider implements PaymentProvider {
  readonly name = "stripe"
  private stripe: Stripe

  constructor(secretKey: string) {
    this.stripe = new Stripe(secretKey)
  }

  async createPayment({ orderId, orderNumber, amount, currency }: CreatePaymentInput): Promise<CreatePaymentResult> {
    const intent = await this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: currency.toLowerCase(),
      metadata: { orderId, orderNumber },
      automatic_payment_methods: { enabled: true },
    })

    if (!intent.client_secret) {
      throw new Error("Stripe did not return a client secret for this PaymentIntent")
    }

    return {
      status: "requires_action",
      clientSecret: intent.client_secret,
      providerPaymentId: intent.id,
      provider: this.name,
    }
  }
}

export function isStripeConfigured(): boolean {
  return !!process.env.STRIPE_SECRET_KEY
}

export function getPaymentProvider(method: PaymentMethod): PaymentProvider {
  if (method === "COD") return new CodProvider()

  if (!isStripeConfigured()) {
    throw new PaymentProviderNotConfiguredError(
      `${method} payments require a payment gateway to be configured. Please choose Cash on Delivery, or contact support.`
    )
  }
  return new StripeProvider(process.env.STRIPE_SECRET_KEY!)
}
