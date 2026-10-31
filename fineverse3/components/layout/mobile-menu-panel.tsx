"use client";

import { Heart, PackageSearch, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { Drawer } from "@/components/ui/drawer";
import { getSocialLinks, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/ui-store";

const SECONDARY_LINKS = [
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "My account", href: "/account", icon: User },
  { label: "Track order", href: "/track-order", icon: PackageSearch },
];

export function MobileMenuPanel() {
  const open = useUiStore((state) => state.mobileMenuOpen);
  const setOpen = useUiStore((state) => state.setMobileMenuOpen);
  const pathname = usePathname();
  const close = useCallback(() => setOpen(false), [setOpen]);
  const socials = getSocialLinks();

  return (
    <Drawer open={open} onClose={close} title="Menu" side="left">
      <nav aria-label="Mobile">
        <ul>
          {siteConfig.navigation.main.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={close}
                aria-current={link.href === pathname ? "page" : undefined}
                className={cn(
                  "flex min-h-14 items-center border-b border-line font-display text-3xl uppercase tracking-wide transition-colors hover:text-accent",
                  link.href === pathname ? "text-accent" : "text-fg",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="mt-6 space-y-1">
          {SECONDARY_LINKS.map(({ label, href, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={close}
                className="flex min-h-tap items-center gap-3 text-base text-muted transition-colors hover:text-accent"
              >
                <Icon className="size-5" aria-hidden="true" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {socials.length > 0 ? (
        <div className="mt-8 border-t border-line pt-6">
          <p className="mb-2 font-display text-eyebrow uppercase text-subtle">Follow</p>
          <ul className="flex flex-wrap gap-x-5">
            {socials.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-tap items-center text-base text-muted transition-colors hover:text-accent"
                >
                  {social.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Drawer>
  );
}