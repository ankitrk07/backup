"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/shared/star-rating"
import { PriceTag } from "@/components/shared/price-tag"
import { WishlistButton } from "@/components/product/wishlist-button"
import { AddToCartButton } from "@/components/product/add-to-cart-button"
import { cn } from "@/lib/utils"
import type { ProductCardData, ProductDetail } from "@/types"

export function QuickViewDialog({
  product,
  open,
  onOpenChange,
}: {
  product: ProductCardData
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [detail, setDetail] = useState<ProductDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  // Fetch-on-open: no data-fetching library in this project, so the effect
  // owns request lifecycle (loading/result) directly.
  useEffect(() => {
    if (!open || detail) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    fetch(`/api/products/${product.slug}`)
      .then((res) => res.json())
      .then((data: ProductDetail) => {
        setDetail(data)
        const defaultVariant =
          data.variants.find((v) => v.stock > 0) ?? data.variants[0]
        setSelectedColor(defaultVariant?.color ?? null)
        setSelectedSize(defaultVariant?.size ?? null)
      })
      .finally(() => setLoading(false))
  }, [open, detail, product.slug])

  const colors = detail ? Array.from(new Set(detail.variants.map((v) => v.color).filter(Boolean))) : []
  const sizes = detail ? Array.from(new Set(detail.variants.map((v) => v.size).filter(Boolean))) : []

  const matchedVariant = detail?.variants.find(
    (v) => (v.color ?? null) === selectedColor && (v.size ?? null) === selectedSize
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>Quick view of {product.name}</DialogDescription>
        </DialogHeader>

        {loading && !detail ? (
          <div className="flex h-80 items-center justify-center">
            <Loader2 className="text-muted-foreground size-6 animate-spin" />
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="bg-muted relative aspect-[4/5] overflow-hidden rounded-lg">
              <Image
                src={detail?.images[0] ?? product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, 320px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-3">
              {product.brand && (
                <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                  {product.brand}
                </span>
              )}
              <h3 className="text-lg font-semibold leading-snug text-foreground">{product.name}</h3>
              <StarRating rating={product.rating} reviewCount={product.reviewCount} />
              <PriceTag price={product.price} compareAtPrice={product.compareAtPrice} size="lg" />

              {colors.length > 0 && (
                <div>
                  <p className="mb-1.5 text-xs font-medium text-foreground">Color</p>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          "rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
                          selectedColor === color
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {sizes.length > 0 && (
                <div>
                  <p className="mb-1.5 text-xs font-medium text-foreground">Size</p>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "min-w-9 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
                          selectedSize === size
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-2 flex items-center gap-2">
                <AddToCartButton
                  className="flex-1"
                  disabled={!matchedVariant}
                  cartLine={{
                    productId: product.id,
                    variantId: matchedVariant?.id ?? product.defaultVariantId ?? "",
                    slug: product.slug,
                    name: product.name,
                    image: detail?.images[0] ?? product.image,
                    price: matchedVariant?.priceOverride ?? product.price,
                    compareAtPrice: product.compareAtPrice,
                    size: selectedSize,
                    color: selectedColor,
                    stock: matchedVariant?.stock ?? 0,
                  }}
                />
                <WishlistButton product={product} />
              </div>

              <Button asChild variant="link" className="h-auto justify-start px-0 text-sm">
                <Link href={`/product/${product.slug}`}>View full details</Link>
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
