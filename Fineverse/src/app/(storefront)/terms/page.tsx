import type { Metadata } from "next"
import { Container } from "@/components/shared/container"
import { siteConfig } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms that govern your use of ${siteConfig.name}.`,
}

const sections = [
  {
    title: "Acceptance of terms",
    body: `By creating an account or placing an order on ${siteConfig.name}, you agree to these terms. If you don't agree, please don't use the site.`,
  },
  {
    title: "Accounts",
    body: "You're responsible for keeping your account password confidential and for all activity under your account. Let us know immediately if you suspect unauthorized use.",
  },
  {
    title: "Pricing & availability",
    body: "Prices are shown in Indian Rupees (INR) and include applicable taxes unless stated otherwise. We reserve the right to correct pricing errors and to limit order quantities. Product availability is not guaranteed until your order is confirmed.",
  },
  {
    title: "Orders & payment",
    body: "Placing an order is an offer to purchase, which we accept when we confirm your order. All prices, stock, and coupon discounts are re-validated on our servers at checkout — the price shown at payment is final. Cash on Delivery orders may require ID verification on delivery.",
  },
  {
    title: "Shipping & delivery",
    body: "Delivery estimates are provided at checkout and are not guaranteed delivery dates. Fineverse is not responsible for delays caused by courier partners, weather, or circumstances outside our control.",
  },
  {
    title: "Returns & cancellations",
    body: "Returns and cancellations are governed by our Returns policy (see FAQ). Some items are non-returnable for hygiene, safety, or customization reasons, as noted on the product page.",
  },
  {
    title: "Product content & reviews",
    body: "Product descriptions and images are provided for reference and may differ slightly from the item received due to manufacturer updates. Reviews you submit must reflect a genuine experience with the product and may be removed if they violate this or contain prohibited content.",
  },
  {
    title: "Limitation of liability",
    body: "Fineverse is not liable for indirect or consequential damages arising from use of the site or products purchased through it, to the maximum extent permitted by applicable law.",
  },
  {
    title: "Changes to these terms",
    body: "We may update these terms from time to time. Continued use of the site after changes take effect constitutes acceptance of the updated terms.",
  },
  {
    title: "Contact",
    body: `Questions about these terms can be sent to ${siteConfig.supportEmail}.`,
  },
]

export default function TermsPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-foreground text-3xl font-semibold">Terms & Conditions</h1>
        <p className="text-muted-foreground mt-2 text-sm">Last updated: January 1, 2026</p>

        <div className="mt-10 flex flex-col gap-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-foreground text-lg font-semibold">{section.title}</h2>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </Container>
  )
}
