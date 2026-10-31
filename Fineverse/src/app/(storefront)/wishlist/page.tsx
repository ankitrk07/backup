"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Trash2, TrendingDown, TrendingUp } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { formatPrice } from "@/lib/utils"
import { useWishlistStore } from "@/store/wishlist-store"
import { useCartStore } from "@/store/cart-store"
import { useMounted } from "@/hooks/use-mounted"
import type { ProductDetail } from "@/types"

export default function WishlistPage() {
  const mounted = useMounted()
  const items = useWishlistStore((s) => s.items)
  const remove = useWishlistStore((s) => s.remove)
  const addToCart = useCartStore((s) => s.addItem)

  const [live, setLive] = useState<Record<string, ProductDetail | null>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!mounted) return
    let cancelled = false

    async function loadLiveData() {
      setLoading(true)
      const results: Record<string, ProductDetail | null> = {}
      // Sequential fetches — see homepage comment on why (dev-only database constraint).
      for (const item of items) {
        try {
          const res = await fetch(`/api/products/${item.slug}`)
          results[item.productId] = res.ok ? await res.json() : null
        } catch {
          results[item.productId] = null
        }
      }
      if (!cancelled) {
        setLive(results)
        setLoading(false)
      }
    }

    if (items.length > 0) loadLiveData()
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch-on-mount: no data-fetching library in this project
    else setLoading(false)

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-fetch only when the wishlist item set or mount state changes
  }, [mounted, items.length])

  const handleMoveToCart = (item: (typeof items)[number]) => {
    const detail = live[item.productId]
    const variant = detail?.variants.find((v) => v.stock > 0) ?? detail?.variants[0]
    if (!detail || !variant) {
      toast.error("This item is currently unavailable")
      return
    }
    addToCart(
      {
        productId: item.productId,
        variantId: variant.id,
        slug: item.slug,
        name: item.name,
        image: detail.images[0] ?? item.image,
        price: variant.priceOverride ?? detail.price,
        compareAtPrice: detail.compareAtPrice,
        size: variant.size,
        color: variant.color,
        stock: variant.stock,
      },
      1
    )
    remove(item.productId)
    toast.success("Moved to cart", { description: item.name })
  }

  if (!mounted) return null

  if (items.length === 0) {
    return (
      <Container className="py-20 sm:py-28">
        <div className="relative mx-auto max-w-lg overflow-hidden rounded-3xl border border-border/80 bg-card/60 p-8 sm:p-12 text-center backdrop-blur-xl shadow-2xl">
          {/* Ambient Glow */}
          <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 size-64 rounded-full bg-rose-500/15 blur-3xl" />

          <div className="relative mx-auto flex size-20 items-center justify-center rounded-2xl border border-rose-500/25 bg-rose-500/10 text-rose-500 shadow-inner">
            <Heart className="size-9 fill-rose-500/20 stroke-rose-500 transition-transform duration-300 hover:scale-110" />
          </div>

          <h1 className="relative mt-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Your wishlist is empty
          </h1>
          <p className="relative mx-auto mt-2.5 max-w-sm text-sm text-muted-foreground leading-relaxed">
            Curate your personal collection. Tap the heart on any product to save it here for later.
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
              <Link href="/products">Explore All Products</Link>
            </Button>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-8 sm:py-10">
      <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
        My Wishlist <span className="text-muted-foreground text-lg font-normal">({items.length})</span>
      </h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const detail = live[item.productId]
          const isOutOfStock = !loading && detail && detail.stock <= 0
          const isUnavailable = !loading && detail === null
          const currentPrice = detail?.price ?? item.price
          const priceDropped = detail && currentPrice < item.price
          const priceIncreased = detail && currentPrice > item.price

          return (
            <div key={item.productId} className="border-border relative flex gap-3 rounded-xl border p-3">
              <button
                onClick={() => {
                  remove(item.productId)
                  toast.success("Removed from wishlist")
                }}
                aria-label="Remove from wishlist"
                className="bg-card text-muted-foreground hover:text-sale absolute right-2 top-2 z-10 flex size-7 items-center justify-center rounded-full shadow-sm"
              >
                <Trash2 className="size-3.5" />
              </button>

              <Link href={`/product/${item.slug}`} className="bg-muted relative size-24 shrink-0 overflow-hidden rounded-lg">
                <Image src={item.image ?? "/placeholder-product.svg"} alt={item.name} fill sizes="96px" className="object-cover" />
                {(isOutOfStock || isUnavailable) && (
                  <div className="bg-background/70 absolute inset-0 flex items-center justify-center">
                    <span className="text-foreground text-[10px] font-semibold">Unavailable</span>
                  </div>
                )}
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                <Link href={`/product/${item.slug}`} className="line-clamp-2 text-sm font-medium text-foreground hover:underline">
                  {item.name}
                </Link>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-mono text-sm font-semibold text-foreground">{formatPrice(currentPrice)}</span>
                  {priceDropped && (
                    <span className="text-success flex items-center gap-0.5 text-xs font-medium">
                      <TrendingDown className="size-3" /> Price dropped
                    </span>
                  )}
                  {priceIncreased && (
                    <span className="text-sale flex items-center gap-0.5 text-xs font-medium">
                      <TrendingUp className="size-3" /> Price increased
                    </span>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-auto gap-1.5"
                  disabled={loading || isOutOfStock || isUnavailable}
                  onClick={() => handleMoveToCart(item)}
                >
                  <ShoppingCart className="size-3.5" />
                  {isOutOfStock ? "Out of Stock" : isUnavailable ? "Unavailable" : "Move to Cart"}
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </Container>
  )
}
