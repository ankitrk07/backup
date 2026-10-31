import Link from "next/link";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";

/**
 * The single email-capture on the home page (the footer form is hidden on "/").
 * Other sections link here with href="#whitelist".
 */
export function NewsletterSection() {
  const { heading, description } = siteConfig.copy.newsletter;

  return (
    <section id="whitelist" aria-label="Whitelist" className="container scroll-mt-24 py-16">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-violet/40 via-surface to-surface p-6 sm:p-12">
          <div aria-hidden="true" className="starfield absolute inset-0 -z-10 opacity-60" />
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div>
              <p className="font-display text-eyebrow uppercase text-accent">Early access</p>
              <h2 className="mt-2 text-balance font-display text-display-md uppercase text-fg">
                {heading}
              </h2>
              <p className="mt-3 max-w-md text-lg text-muted">{description}</p>
            </div>
            <div>
              <NewsletterForm />
              <p className="mt-3 text-sm text-subtle">
                See our{" "}
                <Link href="/policies/privacy" className="underline underline-offset-4 hover:text-accent">
                  Privacy policy
                </Link>{" "}
                for how your email is used.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}