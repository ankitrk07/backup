"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer } from "@/components/ui/Drawer";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/Badge";
import { ArrowUpRight, Youtube, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} side="left" title="NAVIGATION">
      <div className="flex flex-col h-full justify-between py-2">
        {/* Main Links */}
        <nav className="space-y-1">
          {siteConfig.navigation.main.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center justify-between py-4 px-3 text-lg font-display uppercase tracking-wider font-black transition-colors min-h-[48px] border-b border-white/5",
                  isActive
                    ? "text-acid bg-acid/5 border-acid/30"
                    : "text-zinc-200 hover:text-acid hover:bg-white/5"
                )}
              >
                <span>{item.label}</span>
                {item.badge ? (
                  <Badge variant="live" size="sm">
                    {item.badge}
                  </Badge>
                ) : (
                  <ArrowUpRight className="w-4 h-4 text-zinc-500" />
                )}
              </Link>
            );
          })}

          {/* Quick Categories */}
          <div className="pt-6 pb-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 px-3">
              SHOP BY CATEGORY
            </span>
            <div className="mt-2 space-y-1">
              <Link
                href="/shop?category=oversized-tees"
                onClick={onClose}
                className="block py-2.5 px-3 text-sm font-sans text-zinc-300 hover:text-acid min-h-[44px] flex items-center"
              >
                Oversized Tees (240 GSM)
              </Link>
              <Link
                href="/shop?category=hoodies"
                onClick={onClose}
                className="block py-2.5 px-3 text-sm font-sans text-zinc-300 hover:text-acid min-h-[44px] flex items-center"
              >
                Heavyweight Hoodies (420 GSM)
              </Link>
              <Link
                href="/shop?category=accessories"
                onClick={onClose}
                className="block py-2.5 px-3 text-sm font-sans text-zinc-300 hover:text-acid min-h-[44px] flex items-center"
              >
                Tactical Tags & Caps
              </Link>
              <Link
                href="/track-order"
                onClick={onClose}
                className="block py-2.5 px-3 text-sm font-sans text-acid hover:underline min-h-[44px] flex items-center"
              >
                Track Your Order →
              </Link>
            </div>
          </div>
        </nav>

        {/* Footer Meta & Socials */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <div className="flex items-center gap-4 px-3">
            <a
              href={siteConfig.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube Channel"
              className="p-2.5 bg-space-900 border border-white/10 text-zinc-300 hover:text-acid hover:border-acid transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Page"
              className="p-2.5 bg-space-900 border border-white/10 text-zinc-300 hover:text-acid hover:border-acid transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          <div className="px-3 text-xs font-mono text-zinc-400 space-y-1">
            <p>WEAR THE UNIVERSE // NOCTURNAL MERCH</p>
            <p className="text-zinc-500">Free India Shipping on ₹{siteConfig.shipping.freeShippingThreshold}+</p>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
