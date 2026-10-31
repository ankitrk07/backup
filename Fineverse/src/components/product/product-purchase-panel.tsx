"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Minus, Plus, ShieldCheck, Truck, RotateCcw, CreditCard } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { StarRating } from "@/components/shared/star-rating"
import { PriceTag } from "@/components/shared/price-tag"
import { WishlistButton } from "@/components/product/wishlist-button"
import { SizeGuideDialog } from "@/components/product/size-guide-dialog"
import { useCartStore } from "@/store/cart-store"
import { cn, formatPrice } from "@/lib/utils"
import type { ProductDetail } from "@/types"

export function ProductPurchasePanel({ product }: { product: ProductDetail }) {
  const router = useRouter()
  const addItem = useCartStore((s) => s.addItem)

  const colors = useMemo(
    () => Array.from(new Set(product.variants.map((v) => v.color).filter(Boolean))) as string[],
    [product.variants]
  )
  const sizes = useMemo(
    () => Array.from(new Set(product.variants.map((v) => v.size).filter(Boolean))) as string[],
    [product.variants]
  )

  const defaultVariant = product.variants.find((v) => v.stock > 0) ?? product.variants[0]
  const [selectedColor, setSelectedColor] = useState<string | null>(defaultVariant?.color ?? null)
  const [selectedSize, setSelectedSize] = useState<string | null>(defaultVariant?.size ?? null)
  const [quantity, setQuantity] = useState(1)

  const selectedVariant = product.variants.find(
    (v) => (v.color ?? null) === selectedColor && (v.size ?? null) === selectedSize
  )

  const stock = selectedVariant?.stock ?? 0
  const price = selectedVariant?.priceOverride ?? product.price
  const isFashion = product.topCategorySlug === "fashion"
  const isToy = product.topCategorySlug === "toys"

  const buildCartLine = () => ({
    productId: product.id,
    variantId: selectedVariant?.id ?? "",
    slug: product.slug,
    name: product.name,
    image: product.images[0] ?? product.image,
    price,
    compareAtPrice: product.compareAtPrice,
    size: selectedSize,
    color: selectedColor,
    stock,
  })

  const handleAddToCart = () => {
    if (!selectedVariant || stock <= 0) return
    addItem(buildCartLine(), quantity)
    toast.success("Added to cart", { description: product.name })
  }

  const handleBuyNow = () => {
    if (!selectedVariant || stock <= 0) return
    addItem(buildCartLine(), quantity)
    router.push("/checkout")
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        {product.brand && (
          <span className="text-muted-foreground text-sm font-medium uppercase tracking-wide">
            {product.brand}
          </span>
        )}
        <h1 className="mt-1 text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
          {product.name}
        </h1>
        <div className="mt-2">
          <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
        </div>
      </div>

      <PriceTag price={price} compareAtPrice={product.compareAtPrice} size="lg" />
      <p className="text-muted-foreground -mt-2 text-xs">
        or 3 interest-free payments of {formatPrice(price / 3)} with EMI options at checkout
      </p>

      {colors.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">
            Color{selectedColor ? `: ${selectedColor}` : ""}
          </p>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
              const swatch = product.variants.find((v) => v.color === color)
              const available = product.variants.some((v) => v.color === color && v.stock > 0)
              return (
                <button
                  key={color}
                  type="button"
                  title={color}
                  disabled={!available}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "size-9 rounded-full border-2 transition-transform disabled:cursor-not-allowed disabled:opacity-30",
                    selectedColor === color ? "border-primary scale-110" : "border-border"
                  )}
                  style={{ backgroundColor: swatch?.colorHex ?? "#ccc" }}
                >
                  <span className="sr-only">{color}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {sizes.length > 0 && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Size{selectedSize ? `: ${selectedSize}` : ""}</p>
            {isFashion && <SizeGuideDialog />}
          </div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const available = product.variants.some(
                (v) => v.size === size && (colors.length === 0 || v.color === selectedColor) && v.stock > 0
              )
              return (
                <button
                  key={size}
                  type="button"
                  disabled={!available}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "min-w-11 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-30",
                    selectedSize === size
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  {size}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div>
        <p className="mb-2 text-sm font-medium text-foreground">Quantity</p>
        <div className="flex items-center gap-3">
          <div className="border-border flex items-center rounded-lg border">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="flex size-10 items-center justify-center disabled:opacity-40"
            >
              <Minus className="size-4" />
            </button>
            <span className="w-10 text-center text-sm font-medium">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
              disabled={quantity >= stock}
              aria-label="Increase quantity"
              className="flex size-10 items-center justify-center disabled:opacity-40"
            >
              <Plus className="size-4" />
            </button>
          </div>
          <StockStatus stock={stock} />
        </div>
      </div>

      <div className="flex gap-2">
        <Button size="lg" variant="outline" className="flex-1" disabled={stock <= 0} onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Button size="lg" className="flex-1" disabled={stock <= 0} onClick={handleBuyNow}>
          Buy Now
        </Button>
        <WishlistButton
          product={{
            ...product,
            variantCount: product.variants.length,
            defaultVariantId: selectedVariant?.id ?? product.defaultVariantId,
          }}
          className="border-border size-12 shrink-0 border"
        />
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <TrustPoint icon={Truck} title="Fast Delivery" description="Usually ships within 24 hours" />
        <TrustPoint icon={RotateCcw} title="Easy Returns" description="15-day return window" />
        <TrustPoint
          icon={ShieldCheck}
          title={product.warrantyMonths ? `${product.warrantyMonths}-Month Warranty` : "Quality Guaranteed"}
          description="Verified authentic products"
        />
        <TrustPoint icon={CreditCard} title="Secure Payment" description="Cards, UPI, netbanking & more" />
      </div>

      {isToy && (product.minAgeMonths || product.safetyInfo) && (
        <div className="bg-secondary rounded-lg p-4 text-sm">
          {product.minAgeMonths && (
            <p className="text-foreground font-medium">
              Recommended age: {formatAgeRange(product.minAgeMonths, product.maxAgeMonths)}
            </p>
          )}
          {product.safetyInfo && <p className="text-muted-foreground mt-1">{product.safetyInfo}</p>}
        </div>
      )}
    </div>
  )
}

function StockStatus({ stock }: { stock: number }) {
  if (stock <= 0) return <span className="text-sale text-sm font-medium">Out of Stock</span>
  if (stock <= 10) return <span className="text-sale text-sm font-medium">Only {stock} left in stock</span>
  return <span className="text-success text-sm font-medium">In Stock</span>
}

function TrustPoint({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
      <div>
        <p className="text-foreground text-xs font-medium">{title}</p>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
    </div>
  )
}

function formatAgeRange(minMonths: number, maxMonths?: number | null) {
  const toLabel = (months: number) => (months >= 12 ? `${Math.round(months / 12)}+ years` : `${months}+ months`)
  if (maxMonths) {
    return `${minMonths}–${maxMonths} months`
  }
  return toLabel(minMonths)
}
