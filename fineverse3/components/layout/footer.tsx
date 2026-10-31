import Link from "next/link";
import { BrandLogo } from "@/components/media/brand-logo";
import { getSocialLinks, siteConfig } from "@/config/site";
import { paymentMessage } from "@/lib/shipping";
import { FooterNewsletter } from "./footer-newsletter";

const FOOTER_LINK =
  "inline-flex min-h-tap items-center text-base text-muted transition-colors hover:text-accent";

export function Footer() {
  const socials = getSocialLinks();
  const { supportEmail, phone, whatsapp, hours } = siteConfig.contact;

  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <FooterNewsletter />

      <div className="container grid gap-10 py-12 lg:grid-cols-[1.3fr_2fr]">
        <div>
          <Link
            href="/"
            aria-label={`${siteConfig.name} home`}
            className="inline-flex items-center gap-3"
          >
            <BrandLogo size={56} />
            <span className="font-display text-3xl uppercase tracking-wider text-fg" aria-hidden="true">
              {siteConfig.name}
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-muted">{siteConfig.tagline}. {siteConfig.description}</p>

          <address className="mt-6 space-y-1 not-italic">
            <a href={`mailto:${supportEmail}`} className={FOOTER_LINK}>
              {supportEmail}
            </a>
            {phone ? (
              <p>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className={FOOTER_LINK}>
                  {phone}
                </a>
              </p>
            ) : null}
            {whatsapp ? (
              <p>
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={FOOTER_LINK}
                >
                  WhatsApp
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            ) : null}
            <p className="text-sm text-subtle">{hours}</p>
          </address>

          {socials.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-x-5">
              {socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={FOOTER_LINK}
                  >
                    {social.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {siteConfig.navigation.footer.map((column) => (
            <div key={column.title}>
              <h2 className="font-display text-lg uppercase tracking-wider text-fg">{column.title}</h2>
              <ul className="mt-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={FOOTER_LINK}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container flex flex-col gap-2 py-6 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>We accept {paymentMessage()}.</p>
        </div>
      </div>
    </footer>
  );
}