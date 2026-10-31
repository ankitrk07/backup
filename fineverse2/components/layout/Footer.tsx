"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Youtube, Instagram, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-space-950 border-t border-white/10 text-zinc-300 pt-16 pb-12 mt-20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand & Manifesto Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo />
            <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>

            <div className="pt-2 text-xs font-mono text-zinc-500 space-y-1">
              <p>SUPPORT: <a href={`mailto:${siteConfig.contact.supportEmail}`} className="text-zinc-300 hover:text-acid">{siteConfig.contact.supportEmail}</a></p>
              <p>HOURS: {siteConfig.contact.hours}</p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Channel"
                className="w-10 h-10 min-h-[44px] min-w-[44px] bg-space-900 border border-white/10 hover:border-acid hover:text-acid flex items-center justify-center transition-colors text-zinc-400"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="w-10 h-10 min-h-[44px] min-w-[44px] bg-space-900 border border-white/10 hover:border-acid hover:text-acid flex items-center justify-center transition-colors text-zinc-400"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="font-display font-bold uppercase tracking-wider text-sm text-white mb-4">
              COLLECTIONS & SHOP
            </h3>
            <ul className="space-y-2.5 text-xs font-mono">
              {siteConfig.navigation.footer.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-acid transition-colors block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="font-display font-bold uppercase tracking-wider text-sm text-white mb-4">
              CUSTOMER SUPPORT
            </h3>
            <ul className="space-y-2.5 text-xs font-mono">
              {siteConfig.navigation.footer.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-acid transition-colors block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-3">
            <h3 className="font-display font-bold uppercase tracking-wider text-sm text-white">
              DROP WHITELIST
            </h3>
            <p className="text-xs text-zinc-400 font-sans">
              Sign up for priority Drop 05 notifications and secret vault restock access. Zero spam.
            </p>

            {isSubscribed ? (
              <div className="p-3 bg-acid/10 border border-acid/40 text-acid font-mono text-xs flex items-center gap-2">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>YOU ARE ON THE DROP WHITELIST.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full h-11 min-h-[44px] bg-space-900 border border-white/10 px-3 text-xs text-zinc-100 placeholder:text-zinc-500 font-mono focus:border-acid focus:outline-none"
                  />
                  <Button
                    type="submit"
                    variant="acid"
                    size="icon"
                    aria-label="Subscribe to whitelist"
                    className="flex-shrink-0"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 block">
                  By joining, you agree to our Terms & Privacy Policy.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Payment & Trust Strip */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-acid" />
            <span>100% SECURE CHECKOUT — PAN-INDIA DISPATCH</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <span className="px-2 py-1 bg-space-900 border border-white/10 text-zinc-300">UPI / GPAY / PHONEPE</span>
            <span className="px-2 py-1 bg-space-900 border border-white/10 text-zinc-300">CRED</span>
            <span className="px-2 py-1 bg-space-900 border border-white/10 text-zinc-300">VISA / MASTERCARD</span>
            <span className="px-2 py-1 bg-space-900 border border-white/10 text-acid">CASH ON DELIVERY</span>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <Link href="/policies/privacy" className="hover:text-acid transition-colors">
              PRIVACY POLICY
            </Link>
            <Link href="/policies/terms" className="hover:text-acid transition-colors">
              TERMS OF SERVICE
            </Link>
            <Link href="/policies/shipping" className="hover:text-acid transition-colors">
              SHIPPING
            </Link>
            <Link href="/policies/returns" className="hover:text-acid transition-colors">
              RETURNS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
