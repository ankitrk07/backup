import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export function StarRating({
  rating,
  reviewCount,
  size = "sm",
  className,
}: {
  rating: number
  reviewCount?: number
  size?: "xs" | "sm" | "md"
  className?: string
}) {
  const starSize = size === "xs" ? "size-3" : size === "sm" ? "size-3.5" : "size-4.5"

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center" role="img" aria-label={`Rated ${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(rating)
          return (
            <Star
              key={i}
              className={cn(starSize, filled ? "fill-rating text-rating" : "fill-muted text-muted-foreground/40")}
            />
          )
        })}
      </div>
      {reviewCount !== undefined && (
        <span className="text-muted-foreground text-xs">
          {rating > 0 ? rating.toFixed(1) : "No ratings"}
          {reviewCount > 0 && ` (${reviewCount.toLocaleString("en-IN")})`}
        </span>
      )}
    </div>
  )
}
