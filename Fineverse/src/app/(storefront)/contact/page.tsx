import type { Metadata } from "next"
import { Mail, Phone, Clock } from "lucide-react"
import { Container } from "@/components/shared/container"
import { siteConfig } from "@/lib/constants"
import { ContactForm } from "./contact-form"

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with the ${siteConfig.name} support team.`,
}

export default function ContactPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-foreground text-3xl font-semibold sm:text-4xl">Contact Us</h1>
        <p className="text-muted-foreground mt-3 text-base">
          Have a question about an order, a product, or anything else? Send us a message and we&rsquo;ll get back to
          you within 1-2 business days.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <ContactForm />

        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-3">
            <Mail className="text-foreground mt-0.5 size-5 shrink-0" />
            <div>
              <p className="text-foreground text-sm font-medium">Email</p>
              <a href={`mailto:${siteConfig.supportEmail}`} className="text-muted-foreground text-sm hover:underline">
                {siteConfig.supportEmail}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="text-foreground mt-0.5 size-5 shrink-0" />
            <div>
              <p className="text-foreground text-sm font-medium">Phone</p>
              <a href={`tel:${siteConfig.supportPhone.replace(/\s/g, "")}`} className="text-muted-foreground text-sm hover:underline">
                {siteConfig.supportPhone}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="text-foreground mt-0.5 size-5 shrink-0" />
            <div>
              <p className="text-foreground text-sm font-medium">Support Hours</p>
              <p className="text-muted-foreground text-sm">Mon–Sat, 9:00 AM – 7:00 PM IST</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
