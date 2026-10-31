import type { Metadata } from "next"
import { Truck, ShieldCheck, RotateCcw, Sparkles } from "lucide-react"
import { Container } from "@/components/shared/container"
import { siteConfig } from "@/lib/constants"

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name}'s mission to bring curated electronics, fashion, and toys to shoppers who care about quality.`,
}

const values = [
  {
    icon: Sparkles,
    title: "Curated, not crowded",
    description:
      "Every product on Fineverse is reviewed before it's listed. We'd rather carry 500 things we believe in than 50,000 we don't.",
  },
  {
    icon: ShieldCheck,
    title: "Real quality checks",
    description:
      "From electronics warranties to apparel fabric sourcing to toy safety certifications, our category teams vet suppliers by vertical.",
  },
  {
    icon: Truck,
    title: "Fast, reliable delivery",
    description: "Free shipping over ₹999 and delivery estimates you can actually trust, tracked from dispatch to doorstep.",
  },
  {
    icon: RotateCcw,
    title: "Easy returns",
    description: "A 15-day return window with no interrogation. If it's not right, send it back.",
  },
]

export default function AboutPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-foreground text-3xl font-semibold sm:text-4xl">About Fineverse</h1>
        <p className="text-muted-foreground mt-4 text-base leading-relaxed">
          Fineverse started with a simple frustration: shopping online for electronics, fashion, and toys meant
          juggling a different app for every category, each with its own quirks, quality bar, and checkout. We built
          Fineverse to be the one place worth trusting across all three — a single storefront where the products are
          curated, the pricing is honest, and the experience doesn&rsquo;t change depending on what you&rsquo;re
          buying.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
        {values.map((value) => (
          <div key={value.title} className="flex gap-4">
            <span className="bg-secondary flex size-11 shrink-0 items-center justify-center rounded-full">
              <value.icon className="text-foreground size-5" />
            </span>
            <div>
              <h2 className="text-foreground font-semibold">{value.title}</h2>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{value.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-2xl border-t border-border pt-10 text-center">
        <h2 className="text-foreground text-xl font-semibold">Get in touch</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Questions, feedback, or a partnership idea? We&rsquo;d like to hear it.
        </p>
        <p className="text-foreground mt-3 text-sm font-medium">
          {siteConfig.supportEmail} · {siteConfig.supportPhone}
        </p>
      </div>
    </Container>
  )
}
