"use client";

import { Heart, Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { selectCartCount, useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { headerIconButton } from "./header-styles";

function CountBadge({ count }: { count: number }) {
  return (
    <span
      aria-hidden="true"
      className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold leading-none text-accent-fg"
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

export function HeaderActions() {
  const setSearchOpen = useUiStore((state) => state.setSearchOpen);
  const setCartOpen = useUiStore((state) => state.setCartOpen);

  const cartHydrated = useCartStore((state) => state.hasHydrated);
  const cartCount = useCartStore(selectCartCount);
  const wishlistHydrated = useWishlistStore((state) => state.hasHydrated);
  const wishlistCount = useWishlistStore((state) => state.slugs.length);

  const showCart = cartHydrated && cartCount > 0;
  const showWishlist = wishlistHydrated && wishlistCount > 0;

  // Warm the lazy chunks when the pointer approaches, so opening feels instant.
  const warmPalette = () => void import("./command-palette");
  const warmCart = () => void import("./cart-drawer");

  return (
    <div className="flex items-center gap-0.5">
      <button
        type="button"
        aria-label="Search"
        aria-haspopup="dialog"
        onClick={() => setSearchOpen(true)}
        onPointerEnter={warmPalette}
        onFocus={warmPalette}
        className="mr-1 hidden h-11 items-center gap-2 rounded border border-line bg-surface px-3 text-sm text-muted transition-colors hover:border-subtle hover:text-fg lg:flex"
      >
        <Search className="size-4" aria-hidden="true" />
        <span>Search</span>
        <kbd className="ml-3 rounded border border-line px-1.5 py-0.5 text-xs text-subtle">Ctrl K</kbd>
      </button>
      <button
        type="button"
        aria-label="Search"
        aria-haspopup="dialog"
        onClick={() => setSearchOpen(true)}
        onPointerEnter={warmPalette}
        onFocus={warmPalette}
        className={cn(headerIconButton, "lg:hidden")}
      >
        <Search className="size-6" aria-hidden="true" />
      </button>

      <Link
        href="/wishlist"
        aria-label={showWishlist ? `Wishlist, ${wishlistCount} saved` : "Wishlist"}
        className={cn(headerIconButton, "hidden sm:inline-flex")}
      >
        <Heart className="size-6" aria-hidden="true" />
        {showWishlist ? <CountBadge count={wishlistCount} /> : null}
      </Link>

      <Link
        href="/account"
        aria-label="Account"
        className={cn(headerIconButton, "hidden lg:inline-flex")}
      >
        <User className="size-6" aria-hidden="true" />
      </Link>

      <button
        type="button"
        aria-label={showCart ? `Open cart, ${cartCount} items` : "Open cart"}
        aria-haspopup="dialog"
        onClick={() => setCartOpen(true)}
        onPointerEnter={warmCart}
        onFocus={warmCart}
        className={headerIconButton}
      >
        <ShoppingBag className="size-6" aria-hidden="true" />
        {showCart ? <CountBadge count={cartCount} /> : null}
      </button>
    </div>
  );
}