import type { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/shared/container"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { siteConfig } from "@/lib/constants"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about orders, shipping, returns, and payments at Fineverse.",
}

const faqGroups = [
  {
    group: "Orders & Shipping",
    items: [
      {
        q: "How long does delivery take?",
        a: "Standard delivery arrives within 5 business days; Express delivery arrives within 2 business days. Exact estimates are shown at checkout before you pay and again on your order confirmation.",
      },
      {
        q: "Is shipping free?",
        a: "Yes, on orders over ₹999. Orders under that threshold have a flat ₹99 shipping fee. Express delivery adds ₹149 regardless of order value.",
      },
      {
        q: "Can I track my order?",
        a: "Yes — go to My Orders in your account to see live status and a full timeline for every order.",
      },
      {
        q: "Can I change or cancel my order after placing it?",
        a: "Orders can be cancelled from My Orders as long as they haven't shipped yet (status is Pending, Confirmed, or Processing). Once an order ships, it can no longer be cancelled online — contact support instead.",
      },
    ],
  },
  {
    group: "Returns & Refunds",
    items: [
      {
        q: "What's your return policy?",
        a: "Most items can be returned within 15 days of delivery in their original condition and packaging. A few categories (innerwear, personal care, opened toys) are non-returnable for hygiene and safety reasons.",
      },
      {
        q: "How do refunds work?",
        a: "Once a returned item is received and inspected, refunds are issued to your original payment method within 5-7 business days. Cash on Delivery orders are refunded via bank transfer.",
      },
    ],
  },
  {
    group: "Payments",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "Cash on Delivery is available on every order. Card, UPI, and other online payment methods are enabled where a payment gateway is configured for the store.",
      },
      {
        q: "Is it safe to pay online on Fineverse?",
        a: "Yes. Card and UPI payments are processed through a PCI-compliant payment gateway — Fineverse never stores your card details.",
      },
      {
        q: "Do coupon codes stack?",
        a: "Only one coupon code can be applied per order. The best-value code is highlighted automatically if you're eligible for more than one.",
      },
    ],
  },
  {
    group: "Account",
    items: [
      {
        q: "Do I need an account to shop?",
        a: "You can browse and build a cart as a guest, but you'll need an account to check out, track orders, and save addresses for next time.",
      },
      {
        q: "How do I reset my password?",
        a: "Use the \"Forgot password?\" link on the sign-in page. We'll email you a secure reset link that expires in 1 hour.",
      },
    ],
  },
]

export default function FaqPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-foreground text-3xl font-semibold sm:text-4xl">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mt-3 text-base">
          Can&rsquo;t find what you&rsquo;re looking for?{" "}
          <Link href="/contact" className="text-brand font-medium hover:underline">
            Contact our support team
          </Link>
          .
        </p>
      </div>

      <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-10">
        {faqGroups.map((group) => (
          <div key={group.group} id={group.group === "Returns & Refunds" ? "returns" : undefined}>
            <h2 className="text-foreground text-lg font-semibold">{group.group}</h2>
            <Accordion type="single" collapsible className="mt-3">
              {group.items.map((item, i) => (
                <AccordionItem key={i} value={`${group.group}-${i}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>

      <p className="text-muted-foreground mx-auto mt-14 max-w-2xl text-center text-sm">
        Still stuck? Reach us at{" "}
        <a href={`mailto:${siteConfig.supportEmail}`} className="text-brand font-medium hover:underline">
          {siteConfig.supportEmail}
        </a>{" "}
        or {siteConfig.supportPhone}.
      </p>
    </Container>
  )
}
