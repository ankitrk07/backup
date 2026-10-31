"use client";

import { useCallback, useState } from "react";
import { EmptyCart } from "@/components/cart/empty-cart";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore } from "@/store/cart-store";
import { CheckoutForm } from "./checkout-form";

function CheckoutSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_26rem]" role="status" aria-busy="true">
      <span className="sr-only">Loading checkout</span>
      <div aria-hidden="true" className="space-y-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
      <Skeleton aria-hidden="true" className="h-80 w-full" />
    </div>
  );
}

export function CheckoutView() {
  const hydrated = useCartStore((state) => state.hasHydrated);
  const lines = useCartStore((state) => state.lines);
  const [placed, setPlaced] = useState(false);

  const handlePlaced = useCallback(() => {
    setPlaced(true);
    useCartStore.getState().clear();
  }, []);

  if (!hydrated) return <CheckoutSkeleton />;

  if (placed) {
    return (
      <p role="status" className="py-20 text-center text-lg text-muted">
        Order placed. Taking you to your confirmation...
      </p>
    );
  }

  if (lines.length === 0) return <EmptyCart variant="page" />;

  return <CheckoutForm lines={lines} onPlaced={handlePlaced} />;
}