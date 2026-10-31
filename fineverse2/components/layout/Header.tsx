"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, ShoppingBag, Menu } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/config/site";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { CommandPalette } from "./CommandPalette";
import { MobileNav } from "./MobileNav";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { cn } from "@/lib/utils";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { getTotals, openDrawer } = useCartStore();
  const { productIds } = useWishlistStore();
  const totals = getTotals();

  // Scroll detection for enhanced border/backdrop
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-200 border-b",
          isScrolled
            ? "bg-space-950/90 backdrop-blur-md border-white/10 shadow-lg shadow-black/50"
            : "bg-void/80 backdrop-blur-sm border-white/5"
        )}
      >
        <div className="container mx-auto flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6">
          {/* Left: Mobile Menu Trigger + Brand Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open mobile menu"
              className="lg:hidden p-2.5 -ml-2 text-zinc-300 hover:text-acid transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-acid"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Logo />
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {siteConfig.navigation.main.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 text-sm font-display uppercase tracking-widest font-black transition-colors min-h-[44px] py-2 relative group focus-visible:outline-none focus-visible:text-acid",
                    isActive ? "text-acid" : "text-zinc-300 hover:text-white"
                  )}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge variant="live" size="sm">
                      {item.badge}
                    </Badge>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-acid shadow-[0_0_8px_rgba(204,255,0,0.8)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions (Search, Wishlist, Cart) */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search merch (CMD+K)"
              className="flex items-center gap-2 px-3 py-2 text-zinc-300 hover:text-acid transition-colors min-h-[44px] rounded-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-acid"
            >
              <Search className="w-5 h-5" />
              <span className="hidden md:inline font-mono text-xs text-zinc-500 uppercase tracking-wider border border-white/10 px-1.5 py-0.5">
                ⌘K
              </span>
            </button>

            {/* Wishlist Link with dynamic badge */}
            <Link
              href="/wishlist"
              aria-label={`Wishlist with ${productIds.length} items`}
              className="relative p-2.5 text-zinc-300 hover:text-acid transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-acid"
            >
              <Heart className="w-5 h-5" />
              {productIds.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-cosmic-purple text-white text-[10px] font-mono font-bold flex items-center justify-center rounded-full">
                  {productIds.length}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger Button */}
            <button
              onClick={openDrawer}
              aria-label={`Open shopping cart with ${totals.itemCount} items`}
              className="relative flex items-center gap-2 p-2.5 sm:px-3.5 bg-space-900 border border-white/10 hover:border-acid text-zinc-100 hover:text-acid transition-all min-h-[44px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-acid"
            >
              <ShoppingBag className="w-5 h-5 text-acid" />
              <span className="font-mono text-xs font-bold hidden sm:inline">CART</span>
              <span className="w-5 h-5 bg-acid text-void text-[11px] font-mono font-black flex items-center justify-center">
                {totals.itemCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Global Modals & Drawers */}
      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
      <CartDrawer />
    </>
  );
};
