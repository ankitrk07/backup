import type { Metadata } from "next"
import { Container } from "@/components/shared/container"
import { siteConfig } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your personal information.`,
}

const sections = [
  {
    title: "Information we collect",
    body: "When you create an account, place an order, or contact support, we collect information you provide directly — name, email, phone number, shipping and billing addresses, and payment method (card/UPI details are handled entirely by our payment gateway; we never see or store your full card number). We also collect order history and basic usage data (pages viewed, items added to cart) to improve the shopping experience.",
  },
  {
    title: "How we use your information",
    body: "We use your information to process and deliver orders, provide customer support, send order and account-related notifications, and — only if you opt in — send you offers and product updates. We do not sell your personal information to third parties.",
  },
  {
    title: "Payment information",
    body: "All online payments are processed by a PCI-DSS compliant payment gateway. Fineverse's servers never receive or store your full card number, CVV, or UPI PIN. For Cash on Delivery orders, no payment information is collected online at all.",
  },
  {
    title: "Cookies",
    body: "We use essential cookies to keep you signed in and remember your cart. We do not use third-party advertising trackers.",
  },
  {
    title: "Data retention",
    body: "We retain order records for as long as your account is active and as required by tax and consumer-protection law. You can request deletion of your account and associated personal data by contacting support, subject to records we're legally required to keep.",
  },
  {
    title: "Your rights",
    body: "You can view and update your profile and saved addresses at any time from My Account. To request a copy of your data or to have it deleted, contact us using the details below.",
  },
  {
    title: "Contact us",
    body: `Questions about this policy can be sent to ${siteConfig.supportEmail}.`,
  },
]

export default function PrivacyPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-foreground text-3xl font-semibold">Privacy Policy</h1>
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
