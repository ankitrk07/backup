"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/store/toast-store";
import { useWishlistStore } from "@/store/wishlist-store";

interface WishlistButtonProps {
  slug: string;
  name: string;
  className?: string;
}

export function WishlistButton({ slug, name, className }: WishlistButtonProps) {
  const hydrated = useWishlistStore((state) => state.hasHydrated);
  const saved = useWishlistStore((state) => state.slugs.includes(slug));
  const toggle = useWishlistStore((state) => state.toggle);
  const active = hydrated && saved;

  function onClick() {
    // Ignore taps in the first moments before saved items are loaded, so nothing is overwritten.
    if (!hydrated) return;
    const nowSaved = toggle(slug);
    toast.success(nowSaved ? "Saved to wishlist" : "Removed from wishlist", name);
  }

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={`Save ${name} to wishlist`}
      onClick={onClick}
      className={cn(
        "flex size-11 items-center justify-center rounded-full bg-bg/70 text-fg backdrop-blur transition-colors hover:text-accent",
        className,
      )}
    >
      <Heart className={cn("size-5", active && "fill-accent text-accent")} aria-hidden="true" />
    </button>
  );
}