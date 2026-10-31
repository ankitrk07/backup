"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye } from "lucide-react"
import { StarRating } from "@/components/shared/star-rating"
import { PriceTag } from "@/components/shared/price-tag"
import { WishlistButton } from "@/components/product/wishlist-button"
import { AddToCartButton } from "@/components/product/add-to-cart-button"
import { ProductBadges } from "@/components/product/product-badges"
import { QuickViewDialog } from "@/components/product/quick-view-dialog"
import { cn } from "@/lib/utils"
import type { ProductCardData } from "@/types"

export function ProductCard({
  product,
  className,
  rank,
}: {
  product: ProductCardData
  className?: string
  rank?: number
}) {
  const [quickViewOpen, setQuickViewOpen] = useState(false)
  const outOfStock = product.stock <= 0

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-border/70 dark:border-white/[0.08] bg-card dark:bg-[#151622] shadow-xs hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:border-indigo-500/40",
        className
      )}
    >
      {/* Top Floating Controls */}
      <div className="absolute top-2 left-2 right-2 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 pointer-events-auto">
          {typeof rank === "number" && (
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-indigo-600/90 text-white font-black text-[10px] sm:text-[11px] shadow-sm tracking-wider">
              #{rank < 10 ? `0${rank}` : rank}
            </span>
          )}
          <ProductBadges badges={product.badges} className="transition-transform duration-200 group-hover:scale-105" />
        </div>

        <WishlistButton
          product={product}
          className="pointer-events-auto size-7 sm:size-7.5 border border-border/60 bg-background/85 backdrop-blur-md shadow-xs transition-transform duration-200 hover:scale-110"
          size="sm"
        />
      </div>

      <Link href={`/product/${product.slug}`} className="flex flex-1 flex-col">
        {/* Compact Square Product Shot */}
        <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-900/50">
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 18vw"
            className={cn(
              "object-cover transition-transform duration-500 ease-out group-hover:scale-105",
              product.hoverImage && "group-hover:opacity-0"
            )}
          />
          {product.hoverImage && (
            <Image
              src={product.hoverImage}
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 18vw"
              className="object-cover opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-105"
            />
          )}

          {outOfStock && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-xs">
              <span className="bg-foreground text-background rounded-md px-2.5 py-0.5 text-[11px] font-semibold">
                Out of Stock
              </span>
            </div>
          )}

          {/* Quick View Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setQuickViewOpen(true)
            }}
            className="bg-background/95 text-foreground border border-border/70 backdrop-blur-md absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 translate-y-2 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold opacity-0 shadow-md transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 hover:scale-105 active:scale-95 max-sm:hidden"
          >
            <Eye className="size-3 text-indigo-500" /> Quick View
          </button>
        </div>

        {/* Compact Product Details */}
        <div className="flex flex-1 flex-col justify-between p-2.5 sm:p-3">
          <div>
            {product.brand && (
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground/75 truncate group-hover:text-indigo-500 transition-colors">
                {product.brand}
              </span>
            )}
            <h3 className="mt-0.5 line-clamp-1 text-xs sm:text-[13px] font-medium leading-snug text-foreground transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              {product.name}
            </h3>
          </div>

          <div className="mt-1.5 flex flex-col gap-1">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="xs" />
            <PriceTag price={product.price} compareAtPrice={product.compareAtPrice} size="sm" />
          </div>
        </div>
      </Link>

      <div className="mt-auto px-2.5 pb-2.5 sm:px-3 sm:pb-3">
        <AddToCartButton
          className="w-full h-8 text-xs font-medium"
          size="sm"
          variant="outline"
          cartLine={{
            productId: product.id,
            variantId: product.defaultVariantId ?? "",
            slug: product.slug,
            name: product.name,
            image: product.image,
            price: product.price,
            compareAtPrice: product.compareAtPrice,
            stock: product.stock,
          }}
        />
      </div>

      <QuickViewDialog product={product} open={quickViewOpen} onOpenChange={setQuickViewOpen} />
    </article>
  )
}
