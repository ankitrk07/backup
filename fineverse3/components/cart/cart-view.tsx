"use client";

import { CartLineItem } from "@/components/cart/cart-line";
import { CartSummary } from "@/components/cart/cart-summary";
import { EmptyCart } from "@/components/cart/empty-cart";
import { FreeShippingBar } from "@/components/cart/free-shipping-bar";
import { Skeleton } from "@/components/ui/skeleton";
import { getCartSavings } from "@/lib/cart";
import { selectCartSubtotal, useCartStore } from "@/store/cart-store";

export function CartView() {
  const hydrated = useCartStore((state) => state.hasHydrated);
  const lines = useCartStore((state) => state.lines);
  const subtotal = useCartStore(selectCartSubtotal);

  if (!hydrated) {
    return (
      <div className="grid gap-8 lg:grid-cols-[1fr_24rem]" role="status" aria-busy="true">
        <span className="sr-only">Loading your cart</span>
        <div aria-hidden="true" className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <Skeleton aria-hidden="true" className="h-72 w-full" />
      </div>
    );
  }

  if (lines.length === 0) return <EmptyCart variant="page" />;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-start lg:gap-12">
      <div>
        <FreeShippingBar subtotal={subtotal} />
        <ul className="mt-2 divide-y divide-line">
          {lines.map((line) => (
            <CartLineItem key={line.key} line={line} variant="full" />
          ))}
        </ul>
      </div>
      <CartSummary subtotal={subtotal} savings={getCartSavings(lines)} />
    </div>
  );
}