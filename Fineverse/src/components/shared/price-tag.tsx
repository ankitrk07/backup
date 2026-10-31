import { formatPrice, calculateDiscountPercent } from "@/lib/utils"
import { cn } from "@/lib/utils"

export function PriceTag({
  price,
  compareAtPrice,
  size = "md",
  className,
}: {
  price: number
  compareAtPrice?: number | null
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const discount = calculateDiscountPercent(price, compareAtPrice)
  const priceClass =
    size === "lg" ? "text-2xl font-extrabold" : size === "md" ? "text-base sm:text-lg font-bold" : "text-sm font-bold"
  const compareClass = size === "lg" ? "text-base" : "text-xs"

  return (
    <div className={cn("flex flex-wrap items-baseline gap-2", className)}>
      <span className={cn("font-mono tracking-tight text-foreground", priceClass)}>
        {formatPrice(price)}
      </span>
      {compareAtPrice && compareAtPrice > price && (
        <>
          <span className={cn("text-muted-foreground/75 font-mono line-through", compareClass)}>
            {formatPrice(compareAtPrice)}
          </span>
          <span className="text-sale text-[11px] font-semibold tracking-tight">{discount}% off</span>
        </>
      )}
    </div>
  )
}
