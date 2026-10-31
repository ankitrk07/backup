"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchProductsBySlugs } from "@/app/actions/products";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductGridSkeleton } from "@/components/product/product-card-skeleton";
import { Button, ButtonLink } from "@/components/ui/button";
import { pluralize } from "@/lib/format";
import { useWishlistStore } from "@/store/wishlist-store";
import type { Product } from "@/types/product";

interface LoadedProducts {
  key: string;
  products: Product[];
}

export function WishlistView() {
  const hydrated = useWishlistStore((state) => state.hasHydrated);
  const slugs = useWishlistStore((state) => state.slugs);
  const clear = useWishlistStore((state) => state.clear);
  const [loaded, setLoaded] = useState<LoadedProducts | null>(null);

  const key = slugs.join(",");

  useEffect(() => {
    if (!hydrated || slugs.length === 0) return;
    let cancelled = false;

    fetchProductsBySlugs(slugs)
      .then((products) => {
        if (!cancelled) setLoaded({ key, products });
      })
      .catch(() => {
        if (!cancelled) setLoaded({ key, products: [] });
      });

    return () => {
      cancelled = true;
    };
  }, [hydrated, key, slugs]);

  if (!hydrated) return <ProductGridSkeleton count={4} />;

  if (slugs.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-raised text-accent">
          <Heart className="size-8" aria-hidden="true" />
        </span>
        <h2 className="mt-5 font-display text-2xl uppercase tracking-wide text-fg">
          Your wishlist is empty
        </h2>
        <p className="mt-2 max-w-sm text-muted">
          Tap the heart on any product to save it here for later.
        </p>
        <ButtonLink href="/shop" size="lg" className="mt-6">
          Explore the shop
        </ButtonLink>
      </div>
    );
  }

  if (loaded === null) return <ProductGridSkeleton count={Math.min(slugs.length, 8)} />;

  // Filtering by the live list makes removed hearts disappear instantly.
  const visible = loaded.products.filter((product) => slugs.includes(product.slug));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p role="status" className="text-sm text-muted">
          {visible.length} saved {pluralize(visible.length, "item")}
        </p>
        <Button variant="ghost" size="sm" onClick={clear}>
          Clear all
        </Button>
      </div>
      <ProductGrid products={visible} className="mt-6" />
    </div>
  );
}