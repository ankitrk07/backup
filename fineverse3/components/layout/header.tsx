import Link from "next/link";
import { BrandLogo } from "@/components/media/brand-logo";
import { siteConfig } from "@/config/site";
import { HeaderActions } from "./header-actions";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-header border-b border-line bg-bg/90 pt-safe backdrop-blur-md">
      <div className="container flex h-header items-center gap-2">
        <MobileMenu />

        <Link
          href="/"
          aria-label={`${siteConfig.name} home`}
          className="flex min-h-tap items-center gap-2.5 pr-2"
        >
          <BrandLogo size={40} />
          <span
            aria-hidden="true"
            className="hidden font-display text-2xl uppercase tracking-wider text-fg sm:inline"
          >
            {siteConfig.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-6 hidden lg:block">
          <ul className="flex items-center gap-1">
            {siteConfig.navigation.main.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-tap items-center rounded px-3 font-display text-base uppercase tracking-wider text-fg transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto">
          <HeaderActions />
        </div>
      </div>
    </header>
  );
}