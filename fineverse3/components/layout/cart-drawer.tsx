"use client";

import { useCallback } from "react";
import { CartLineItem } from "@/components/cart/cart-line";
import { EmptyCart } from "@/components/cart/empty-cart";
import { FreeShippingBar } from "@/components/cart/free-shipping-bar";
import { ButtonLink } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { Skeleton } from "@/components/ui/skeleton";
import { formatINR } from "@/lib/format";
import { selectCartCount, selectCartSubtotal, useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";

export function CartDrawer() {
  const open = useUiStore((state) => state.cartOpen);
  const setCartOpen = useUiStore((state) => state.setCartOpen);
  const lines = useCartStore((state) => state.lines);
  const hydrated = useCartStore((state) => state.hasHydrated);
  const count = useCartStore(selectCartCount);
  const subtotal = useCartStore(selectCartSubtotal);

  const close = useCallback(() => setCartOpen(false), [setCartOpen]);
  const hasItems = hydrated && lines.length > 0;

  const footer = hasItems ? (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <span className="text-base text-muted">Subtotal</span>
        <span className="font-display text-2xl tracking-wide text-fg tabular">
          {formatINR(subtotal)}
        </span>
      </div>
      <p className="text-sm text-subtle">Delivery and any payment fees are calculated at checkout.</p>
      <ButtonLink href="/checkout" fullWidth size="lg" onClick={close}>
        Checkout
      </ButtonLink>
      <ButtonLink href="/cart" variant="outline" fullWidth onClick={close}>
        View cart
      </ButtonLink>
    </div>
  ) : undefined;

  return (
    <Drawer
      open={open}
      onClose={close}
      title={hasItems ? `Cart (${count})` : "Cart"}
      side="right"
      footer={footer}
    >
      {!hydrated ? (
        <div className="space-y-4" aria-busy="true">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : lines.length === 0 ? (
        <EmptyCart variant="drawer" onNavigate={close} />
      ) : (
        <div>
          <FreeShippingBar subtotal={subtotal} />
          <ul className="mt-2 divide-y divide-line">
            {lines.map((line) => (
              <CartLineItem key={line.key} line={line} variant="compact" onNavigate={close} />
            ))}
          </ul>
        </div>
      )}
    </Drawer>
  );
}