"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingBag, Tag, Trash2, X } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Container } from "@/components/shared/container"
import { formatPrice } from "@/lib/utils"
import { FREE_SHIPPING_THRESHOLD, calculateOrderTotals } from "@/lib/pricing"
import { useCartStore } from "@/store/cart-store"
import { useMounted } from "@/hooks/use-mounted"

export default function CartPage() {
  const mounted = useMounted()
  const allItems = useCartStore((s) => s.items)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const saveForLater = useCartStore((s) => s.saveForLater)
  const moveToCart = useCartStore((s) => s.moveToCart)
  const coupon = useCartStore((s) => s.coupon)
  const couponError = useCartStore((s) => s.couponError)
  const couponLoading = useCartStore((s) => s.couponLoading)
  const applyCoupon = useCartStore((s) => s.applyCoupon)
  const removeCoupon = useCartStore((s) => s.removeCoupon)

  const [couponInput, setCouponInput] = useState("")

  const items = allItems.filter((i) => !i.savedForLater)
  const savedItems = allItems.filter((i) => i.savedForLater)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const discount = coupon?.discount ?? 0
  const { afterDiscount, shipping, tax, total } = calculateOrderTotals(subtotal, discount)

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return
    applyCoupon(couponInput.trim()).then(() => {
      const state = useCartStore.getState()
      if (state.coupon) {
        toast.success("Coupon applied", { description: state.coupon.description ?? undefined })
        setCouponInput("")
      }
    })
  }

  if (!mounted) return null

  if (items.length === 0 && savedItems.length === 0) {
    return (
      <Container className="py-20 sm:py-28">
        <div className="relative mx-auto max-w-lg overflow-hidden rounded-3xl border border-border/80 bg-card/60 p-8 sm:p-12 text-center backdrop-blur-xl shadow-2xl">
          {/* Ambient Glow */}
          <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 size-64 rounded-full bg-indigo-500/15 blur-3xl" />

          <div className="relative mx-auto flex size-20 items-center justify-center rounded-2xl border border-indigo-500/25 bg-indigo-500/10 text-indigo-500 shadow-inner">
            <ShoppingBag className="size-9 transition-transform duration-300 hover:scale-110" />
          </div>

          <h1 className="relative mt-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Your cart is empty
          </h1>
          <p className="relative mx-auto mt-2.5 max-w-sm text-sm text-muted-foreground leading-relaxed">
            Looks like you haven&rsquo;t added anything yet. Discover our curated collections and fill your bag with premium picks.
          </p>

          <div className="relative mt-7 flex flex-wrap justify-center gap-2">
            <Link
              href="/electronics"
              className="rounded-full border border-border/70 bg-muted/40 px-3.5 py-1 text-xs font-medium text-muted-foreground transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-400"
            >
              Electronics
            </Link>
            <Link
              href="/fashion"
              className="rounded-full border border-border/70 bg-muted/40 px-3.5 py-1 text-xs font-medium text-muted-foreground transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-400"
            >
              Fashion
            </Link>
            <Link
              href="/toys"
              className="rounded-full border border-border/70 bg-muted/40 px-3.5 py-1 text-xs font-medium text-muted-foreground transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-400"
            >
              Toys
            </Link>
          </div>

          <div className="relative mt-8">
            <Button asChild size="lg" className="rounded-xl px-8 shadow-lg shadow-indigo-500/20 transition-all hover:scale-102">
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-8 sm:py-10">
      <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">Shopping Cart</h1>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-6">
          {items.length > 0 && (
            <ul className="divide-border flex flex-col divide-y">
              {items.map((item) => (
                <li key={item.variantId} className="flex gap-4 py-5">
                  <Link
                    href={`/product/${item.slug}`}
                    className="bg-muted relative size-24 shrink-0 overflow-hidden rounded-lg"
                  >
                    {item.image && <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />}
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <Link href={`/product/${item.slug}`} className="text-sm font-medium text-foreground hover:underline">
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        aria-label="Remove item"
                        className="text-muted-foreground hover:text-sale shrink-0"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    {(item.color || item.size) && (
                      <p className="text-muted-foreground mt-0.5 text-xs">
                        {[item.color, item.size].filter(Boolean).join(" / ")}
                      </p>
                    )}
                    {item.quantity >= item.stock && (
                      <p className="text-sale mt-1 text-xs">Only {item.stock} left in stock</p>
                    )}

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="border-border flex items-center rounded-lg border">
                        <button
                          className="flex size-8 items-center justify-center disabled:opacity-40"
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          className="flex size-8 items-center justify-center disabled:opacity-40"
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          aria-label="Increase quantity"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            saveForLater(item.variantId)
                            toast.success("Saved for later")
                          }}
                          className="text-muted-foreground text-xs font-medium hover:underline"
                        >
                          Save for later
                        </button>
                        <span className="font-mono text-sm font-semibold text-foreground">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {savedItems.length > 0 && (
            <div>
              <h2 className="text-foreground mb-3 text-sm font-semibold">
                Saved for Later ({savedItems.length})
              </h2>
              <ul className="divide-border flex flex-col divide-y">
                {savedItems.map((item) => (
                  <li key={item.variantId} className="flex gap-4 py-4">
                    <Link
                      href={`/product/${item.slug}`}
                      className="bg-muted relative size-16 shrink-0 overflow-hidden rounded-lg"
                    >
                      {item.image && <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />}
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      <span className="text-muted-foreground font-mono text-sm">{formatPrice(item.price)}</span>
                      <div className="mt-1 flex items-center gap-3">
                        <button
                          onClick={() => moveToCart(item.variantId)}
                          className="text-brand text-xs font-medium hover:underline"
                        >
                          Move to Cart
                        </button>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="text-muted-foreground text-xs font-medium hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-border h-fit rounded-xl border p-5">
            <h2 className="text-foreground text-lg font-semibold">Order Summary</h2>

            <div className="mt-4">
              <label htmlFor="coupon" className="text-foreground mb-1.5 block text-xs font-medium">
                Coupon Code
              </label>
              {coupon ? (
                <div className="bg-secondary flex items-center justify-between rounded-lg px-3 py-2">
                  <div className="flex items-center gap-1.5">
                    <Tag className="text-success size-3.5" />
                    <span className="text-sm font-medium text-foreground">{coupon.code}</span>
                  </div>
                  <button onClick={removeCoupon} aria-label="Remove coupon">
                    <X className="text-muted-foreground size-4" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    id="coupon"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="e.g. WELCOME10"
                    onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                  />
                  <Button variant="outline" onClick={handleApplyCoupon} disabled={couponLoading}>
                    Apply
                  </Button>
                </div>
              )}
              {couponError && <p className="text-sale mt-1.5 text-xs">{couponError}</p>}
            </div>

            <Separator className="my-4" />

            <dl className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-mono text-foreground">{formatPrice(subtotal)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-success">Discount</dt>
                  <dd className="text-success font-mono">-{formatPrice(discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="font-mono text-foreground">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Tax (5%)</dt>
                <dd className="font-mono text-foreground">{formatPrice(tax)}</dd>
              </div>
            </dl>

            <Separator className="my-4" />

            <div className="flex justify-between">
              <span className="text-foreground font-semibold">Total</span>
              <span className="font-mono text-lg font-semibold text-foreground">{formatPrice(total)}</span>
            </div>

            {shipping > 0 && (
              <p className="text-muted-foreground mt-2 text-xs">
                Add {formatPrice(FREE_SHIPPING_THRESHOLD - afterDiscount)} more for free shipping.
              </p>
            )}

            <Button asChild size="lg" className="mt-5 w-full">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        )}
      </div>
    </Container>
  )
}
