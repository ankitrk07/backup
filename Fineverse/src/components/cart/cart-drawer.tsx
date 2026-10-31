"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/store/cart-store"
import { formatPrice } from "@/lib/utils"

export function CartDrawer({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  // Select the raw array (stable reference) and derive in the render body —
  // a selector that returns `.filter(...)` creates a new array every call,
  // which breaks useSyncExternalStore's snapshot equality check and causes
  // an infinite re-render loop.
  const allItems = useCartStore((s) => s.items)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const subtotal = useCartStore((s) => s.subtotal())
  const coupon = useCartStore((s) => s.coupon)
  const items = allItems.filter((i) => !i.savedForLater)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart ({items.length})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="relative flex size-18 items-center justify-center rounded-2xl border border-indigo-500/25 bg-indigo-500/10 text-indigo-500 shadow-inner">
              <ShoppingBag className="size-8 transition-transform duration-300 hover:scale-110" />
              <div className="pointer-events-none absolute -inset-2 rounded-2xl bg-indigo-500/10 blur-xl" />
            </div>
            <div>
              <p className="text-base font-semibold text-foreground">Your cart is empty</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Add your favorite items from our curated collections.
              </p>
            </div>
            <Button asChild size="default" className="mt-2 w-full max-w-[200px] rounded-xl shadow-md shadow-indigo-500/20" onClick={() => onOpenChange(false)}>
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4">
              <ul className="flex flex-col divide-y divide-border">
                {items.map((item) => (
                  <li key={item.variantId} className="flex gap-3 py-4">
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={() => onOpenChange(false)}
                      className="bg-muted relative size-16 shrink-0 overflow-hidden rounded-md"
                    >
                      {item.image && (
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      )}
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={() => onOpenChange(false)}
                        className="line-clamp-1 text-sm font-medium text-foreground hover:underline"
                      >
                        {item.name}
                      </Link>
                      {(item.size || item.color) && (
                        <p className="text-muted-foreground text-xs">
                          {[item.color, item.size].filter(Boolean).join(" / ")}
                        </p>
                      )}
                      <div className="mt-1 flex items-center justify-between">
                        <div className="border-border flex items-center rounded-md border">
                          <button
                            className="text-muted-foreground hover:text-foreground flex size-6 items-center justify-center disabled:opacity-40"
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-medium">{item.quantity}</span>
                          <button
                            className="text-muted-foreground hover:text-foreground flex size-6 items-center justify-center disabled:opacity-40"
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            aria-label="Increase quantity"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <span className="font-mono text-sm font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.variantId)}
                      aria-label="Remove item"
                      className="text-muted-foreground hover:text-sale self-start"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <SheetFooter className="border-t border-border">
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-mono font-semibold text-foreground">{formatPrice(subtotal)}</span>
              </div>
              {coupon && (
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-success">Coupon ({coupon.code})</span>
                  <span className="text-success font-mono">-{formatPrice(coupon.discount)}</span>
                </div>
              )}
              <p className="text-muted-foreground mb-2 text-xs">Shipping & taxes calculated at checkout.</p>
              <Separator className="mb-2" />
              <Button asChild size="lg" onClick={() => onOpenChange(false)}>
                <Link href="/checkout">Checkout</Link>
              </Button>
              <Button asChild variant="outline" onClick={() => onOpenChange(false)}>
                <Link href="/cart">View Cart</Link>
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
