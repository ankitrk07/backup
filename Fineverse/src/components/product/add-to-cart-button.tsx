"use client"

import { ShoppingCart, Check } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart-store"
import { cn } from "@/lib/utils"

export function AddToCartButton({
  cartLine,
  quantity = 1,
  disabled,
  className,
  size = "default",
  variant = "default",
  label = "Add to Cart",
}: {
  cartLine: {
    productId: string
    variantId: string
    slug: string
    name: string
    image: string | null
    price: number
    compareAtPrice: number | null
    size?: string | null
    color?: string | null
    stock: number
  }
  quantity?: number
  disabled?: boolean
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
  variant?: "default" | "outline" | "secondary"
  label?: string
}) {
  const addItem = useCartStore((s) => s.addItem)
  const [justAdded, setJustAdded] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (disabled || cartLine.stock <= 0) return

    addItem(cartLine, quantity)
    toast.success("Added to cart", { description: cartLine.name })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  const outOfStock = cartLine.stock <= 0

  return (
    <Button
      type="button"
      size={size}
      variant={variant}
      disabled={disabled || outOfStock}
      onClick={handleClick}
      className={cn("gap-1.5", className)}
    >
      {justAdded ? (
        <>
          <Check className="size-4" /> Added
        </>
      ) : outOfStock ? (
        "Out of Stock"
      ) : (
        <>
          <ShoppingCart className="size-4" /> {label}
        </>
      )}
    </Button>
  )
}
