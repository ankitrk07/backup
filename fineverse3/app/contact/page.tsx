import { Clock, Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact us",
  description: `Questions about an order, a product or a collab? Contact the ${siteConfig.name} team.`,
  path: "/contact",
});

const LINK = "text-accent underline underline-offset-4";

export default function ContactPage() {
  const { contact, policies } = siteConfig;

  return (
    <div className="container pb-16 pt-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <h1 className="mt-4 font-display text-display-lg uppercase text-fg">Contact us</h1>
      <p className="mt-2 max-w-xl text-muted">
        Questions about an order, a product or a collab? Send a message and we will get back to you{" "}
        {policies.supportResponseTime}.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        <ContactForm />

        <aside aria-labelledby="reach-heading" className="space-y-6">
          <div className="rounded-xl border border-line bg-surface p-5 sm:p-6">
            <h2 id="reach-heading" className="font-display text-2xl uppercase tracking-wide text-fg">
              Other ways to reach us
            </h2>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" />
                <a href={`mailto:${contact.supportEmail}`} className={LINK}>
                  {contact.supportEmail}
                </a>
              </li>
              {contact.phone ? (
                <li className="flex items-start gap-3">
                  <Phone className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" />
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className={LINK}>
                    {contact.phone}
                  </a>
                </li>
              ) : null}
              {contact.whatsapp ? (
                <li className="flex items-start gap-3">
                  <MessageCircle className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" />
                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={LINK}
                  >
                    Chat on WhatsApp
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ) : null}
              <li className="flex items-start gap-3">
                <Clock className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" />
                <span className="text-muted">{contact.hours}</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-line bg-surface p-5 sm:p-6">
            <h2 className="font-display text-xl uppercase tracking-wide text-fg">Quick answers</h2>
            <ul className="mt-3 space-y-1">
              <li>
                <Link href="/track-order" className={`inline-flex min-h-tap items-center ${LINK}`}>
                  Track an order
                </Link>
              </li>
              <li>
                <Link href="/faq" className={`inline-flex min-h-tap items-center ${LINK}`}>
                  Read the FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/policies/returns"
                  className={`inline-flex min-h-tap items-center ${LINK}`}
                >
                  Returns &amp; exchanges
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}