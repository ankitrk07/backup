import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { getStockState, getTotalStock, isSoldOut } from "@/lib/product";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductBadgesProps {
  product: Product;
  className?: string;
}

interface BadgeEntry {
  label: string;
  variant: BadgeVariant;
}

export function ProductBadges({ product, className }: ProductBadgesProps) {
  const badges: BadgeEntry[] = [];

  if (isSoldOut(product)) {
    badges.push({ label: "Sold out", variant: "danger" });
  } else {
    if (product.tags.includes("new")) badges.push({ label: "New", variant: "violet" });
    if (product.discountPercent > 0) {
      badges.push({ label: `${product.discountPercent}% off`, variant: "accent" });
    } else if (getStockState(getTotalStock(product)) === "low") {
      badges.push({ label: "Low stock", variant: "warning" });
    }
  }

  if (badges.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {badges.slice(0, 2).map((badge) => (
        <Badge key={badge.label} variant={badge.variant}>
          {badge.label}
        </Badge>
      ))}
    </div>
  );
}