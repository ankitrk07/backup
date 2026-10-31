"use client"

import { Heart } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useWishlistStore } from "@/store/wishlist-store"
import { cn } from "@/lib/utils"
import type { ProductCardData } from "@/types"

export function WishlistButton({
  product,
  className,
  size = "default",
}: {
  product: ProductCardData
  className?: string
  size?: "default" | "sm"
}) {
  const inWishlist = useWishlistStore((s) => s.has(product.id))
  const toggle = useWishlistStore((s) => s.toggle)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggle({
      productId: product.id,
      variantId: product.defaultVariantId,
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      inStock: product.stock > 0,
    })
    toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist")
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={inWishlist}
      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      className={cn(
        "bg-card/90 flex items-center justify-center rounded-full shadow-sm backdrop-blur-sm transition-colors hover:bg-card",
        size === "sm" ? "size-8" : "size-9",
        className
      )}
    >
      <motion.span
        key={inWishlist ? "filled" : "empty"}
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
        className="flex items-center justify-center"
      >
        <Heart
          className={cn(
            size === "sm" ? "size-4" : "size-4.5",
            inWishlist ? "fill-sale text-sale" : "text-foreground"
          )}
        />
      </motion.span>
    </button>
  )
}
