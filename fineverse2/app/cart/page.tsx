"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { FreeShippingBar } from "@/components/cart/FreeShippingBar";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { formatPrice } from "@/lib/formatters";
import { siteConfig } from "@/config/site";
import { ShoppingBag, ArrowRight, ShieldCheck, Tag, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotals, hasHydrated } =
    useCartStore();

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const totals = getTotals();

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");

    if (promoCode.trim().toUpperCase() === "DROP04" || promoCode.trim().toUpperCase() === "FINEVERSE10") {
      setPromoApplied(true);
    } else {
      setPromoError("Invalid or expired access code. Try 'DROP04' for test verification.");
    }
  };

  const breadcrumbs = [
    { label: "SHOP", href: "/shop" },
    { label: "SHOPPING CART" },
  ];

  if (!hasHydrated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="h-8 w-48 bg-space-850 animate-pulse mx-auto mb-8" />
        <div className="h-64 max-w-2xl bg-space-900 animate-pulse mx-auto" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-8">
        <Breadcrumbs items={breadcrumbs} className="mb-4" />
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
              YOUR CART ({totals.itemCount})
            </h1>
            <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-1">
              Verify your selected streetwear sizes and quantities before proceeding to checkout.
            </p>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs font-mono text-zinc-500 hover:text-cosmic-crimson transition-colors"
            >
              CLEAR ENTIRE CART
            </button>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="surface-card p-12 text-center border border-white/10 space-y-4 max-w-md mx-auto my-12">
          <div className="w-16 h-16 mx-auto bg-space-900 border border-white/15 flex items-center justify-center text-zinc-500">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-display font-bold uppercase text-xl text-white">
            YOUR CART IS CURRENTLY EMPTY
          </h2>
          <p className="text-xs font-mono text-zinc-400 leading-relaxed">
            You haven't reserved any pieces from Drop 04 or our core archive yet.
          </p>
          <Button variant="acid" size="lg" className="mt-2">
            <Link href="/shop" className="flex items-center gap-2">
              <span>EXPLORE ALL MERCH</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Items List */}
          <div className="lg:col-span-8 space-y-4">
            <FreeShippingBar
              subtotal={totals.subtotal}
              threshold={totals.freeShippingThreshold}
              progress={totals.freeShippingProgress}
              amountNeeded={totals.amountNeededForFreeShipping}
              hasFreeShipping={totals.hasFreeShipping}
            />

            <div className="surface-card p-6 border border-white/10 divide-y divide-white/10">
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-acid transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>CONTINUE SHOPPING CATALOG</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="surface-card p-6 border border-white/15 space-y-6 sticky top-28">
              <h2 className="font-display font-black text-xl uppercase tracking-wider text-white border-b border-white/10 pb-4">
                ORDER SUMMARY
              </h2>

              {/* Breakdown */}
              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>ITEMS SUBTOTAL</span>
                  <span className="text-zinc-100 font-bold">{formatPrice(totals.subtotal)}</span>
                </div>

                <div className="flex justify-between text-zinc-400">
                  <span>ESTIMATED SHIPPING</span>
                  <span>
                    {totals.hasFreeShipping ? (
                      <strong className="text-acid">FREE (PAN-INDIA)</strong>
                    ) : (
                      <span className="text-zinc-200">{formatPrice(totals.shipping)}</span>
                    )}
                  </span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-acid font-bold">
                    <span>SPECIAL ACCESS DISCOUNT (10%)</span>
                    <span>-{formatPrice(totals.subtotal * 0.1)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-white/10 flex justify-between items-center text-sm">
                  <span className="font-display font-black uppercase text-white tracking-wider">
                    TOTAL PAYABLE
                  </span>
                  <span className="font-mono font-bold text-xl text-acid">
                    {formatPrice(
                      promoApplied ? totals.total - totals.subtotal * 0.1 : totals.total
                    )}
                  </span>
                </div>
              </div>

              {/* Promo Code Box */}
              <form onSubmit={handleApplyPromo} className="space-y-2 pt-2 border-t border-white/10">
                <label className="text-[11px] font-mono uppercase text-zinc-400 block">
                  PROMO / CREATOR PASS CODE
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="ENTER CODE (e.g. DROP04)"
                    className="w-full h-11 min-h-[44px] bg-space-900 border border-white/15 px-3 text-xs font-mono uppercase text-zinc-100 placeholder:text-zinc-500 focus:border-acid focus:outline-none"
                  />
                  <Button
                    type="submit"
                    variant="surface"
                    size="md"
                    className="flex-shrink-0 text-xs px-4"
                  >
                    APPLY
                  </Button>
                </div>
                {promoError && (
                  <p className="text-xs text-cosmic-crimson font-mono">{promoError}</p>
                )}
                {promoApplied && (
                  <p className="text-xs text-acid font-mono flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>CODE APPLIED: 10% VAULT DISCOUNT</span>
                  </p>
                )}
              </form>

              {/* Checkout CTA */}
              <Button variant="acid" size="lg" className="w-full justify-between shadow-acid">
                <Link href="/checkout" className="w-full flex items-center justify-between">
                  <span>PROCEED TO SECURE CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-500 pt-2 border-t border-white/5">
                <ShieldCheck className="w-4 h-4 text-acid" />
                <span>UPI • CARDS • NETBANKING • COD AVAILABLE</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
