"use client";

import { usePathname } from "next/navigation";
import { useId } from "react";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { siteConfig } from "@/config/site";

/**
 * The home page has its own dedicated whitelist section, so the footer form is
 * hidden there. That keeps exactly one email-capture visible on every page.
 */
export function FooterNewsletter() {
  const pathname = usePathname();
  const headingId = useId();

  if (pathname === "/") return null;

  return (
    <section aria-labelledby={headingId} className="border-b border-line">
      <div className="container grid gap-6 py-10 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div>
          <h2 id={headingId} className="font-display text-display-sm uppercase text-fg">
            {siteConfig.copy.newsletter.heading}
          </h2>
          <p className="mt-2 text-muted">{siteConfig.copy.newsletter.description}</p>
        </div>
        <NewsletterForm />
      </div>
    </section>
  );
}