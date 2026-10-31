"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { FreeShippingBar } from "./FreeShippingBar";
import { CartItemRow } from "./CartItemRow";
import { formatPrice } from "@/lib/formatters";

export const CartDrawer: React.FC = () => {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    getTotals,
  } = useCartStore();

  const totals = getTotals();

  return (
    <Drawer
      isOpen={isDrawerOpen}
      onClose={closeDrawer}
      title={`YOUR CART (${totals.itemCount})`}
      side="right"
    >
      <div className="flex flex-col h-full justify-between -mx-2">
        {/* Top Free Shipping Calculator Bar */}
        <div className="mb-4">
          <FreeShippingBar
            subtotal={totals.subtotal}
            threshold={totals.freeShippingThreshold}
            progress={totals.freeShippingProgress}
            amountNeeded={totals.amountNeededForFreeShipping}
            hasFreeShipping={totals.hasFreeShipping}
          />
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto pr-1">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-space-900 border border-white/10 flex items-center justify-center text-zinc-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold uppercase text-lg text-white">
                  YOUR CART IS EMPTY
                </h3>
                <p className="text-xs font-mono text-zinc-400 max-w-xs mx-auto">
                  Limited Drop 04 pieces are selling fast. Explore the latest drop before pieces sell out.
                </p>
              </div>
              <Button
                variant="acid"
                size="md"
                className="mt-2"
                onClick={closeDrawer}
              >
                <Link href="/shop" className="flex items-center gap-2">
                  <span>EXPLORE SHOP</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer Subtotal & Checkout Section */}
        {items.length > 0 && (
          <div className="pt-4 border-t border-white/10 mt-4 space-y-3 bg-space-950">
            {/* Price Row */}
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-zinc-400">
                <span>SUBTOTAL</span>
                <span className="text-zinc-100 font-bold">{formatPrice(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>SHIPPING</span>
                <span>
                  {totals.hasFreeShipping ? (
                    <strong className="text-acid">FREE</strong>
                  ) : (
                    <span>{formatPrice(totals.shipping)} (At Checkout)</span>
                  )}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center text-base font-display font-bold border-t border-white/10 pt-2">
              <span className="text-white uppercase tracking-wider">ESTIMATED TOTAL</span>
              <span className="text-acid font-mono text-lg">{formatPrice(totals.total)}</span>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2 pt-1">
              <Button
                variant="acid"
                size="lg"
                className="w-full justify-between"
                onClick={closeDrawer}
              >
                <Link href="/checkout" className="w-full flex items-center justify-between">
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="md"
                className="w-full text-xs"
                onClick={closeDrawer}
              >
                <Link href="/cart" className="w-full text-center">
                  VIEW FULL CART DETAILS
                </Link>
              </Button>
            </div>

            {/* Trust Micro-Badge */}
            <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-acid" />
              <span>UPI • CARDS • COD AVAILABLE PAN-INDIA</span>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};
