import { cn } from "@/lib/utils"
import type { ProductBadge } from "@/types"

const badgeConfig: Record<ProductBadge, { label: string; className: string }> = {
  new: { label: "New", className: "bg-brand text-brand-foreground" },
  bestseller: { label: "Bestseller", className: "bg-primary text-primary-foreground" },
  sale: { label: "Sale", className: "bg-sale text-sale-foreground" },
  "limited-stock": { label: "Limited Stock", className: "bg-rating text-primary" },
}

export function ProductBadges({ badges, className }: { badges: ProductBadge[]; className?: string }) {
  if (badges.length === 0) return null

  // Show at most 2 to keep the card uncluttered; sale/limited-stock take priority over new/bestseller.
  const ordered = [...badges].sort((a, b) => {
    const priority: ProductBadge[] = ["sale", "limited-stock", "bestseller", "new"]
    return priority.indexOf(a) - priority.indexOf(b)
  })

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {ordered.slice(0, 2).map((badge) => (
        <span
          key={badge}
          className={cn(
            "rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide shadow-sm",
            badgeConfig[badge].className
          )}
        >
          {badgeConfig[badge].label}
        </span>
      ))}
    </div>
  )
}
