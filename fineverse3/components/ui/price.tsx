import { formatINR } from "@/lib/format";
import { computeDiscountPercent } from "@/lib/product";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";

type PriceSize = "sm" | "md" | "lg";

interface PriceProps {
  price: number;
  compareAtPrice?: number | null;
  size?: PriceSize;
  showDiscount?: boolean;
  className?: string;
}

const PRICE_SIZE: Record<PriceSize, string> = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
};

export function Price({
  price,
  compareAtPrice = null,
  size = "md",
  showDiscount = true,
  className,
}: PriceProps) {
  const discount = computeDiscountPercent(price, compareAtPrice);
  const hasDiscount = discount > 0 && compareAtPrice !== null;

  return (
    <div className={cn("flex flex-wrap items-center gap-x-2.5 gap-y-1", className)}>
      <span className={cn("font-display tracking-wide text-fg tabular", PRICE_SIZE[size])}>
        <span className="sr-only">Price: </span>
        {formatINR(price)}
      </span>
      {hasDiscount ? (
        <>
          <s className="text-sm text-subtle tabular">
            <span className="sr-only">Original price: </span>
            {formatINR(compareAtPrice)}
          </s>
          {showDiscount ? <Badge variant="accent">{discount}% off</Badge> : null}
        </>
      ) : null}
    </div>
  );
}