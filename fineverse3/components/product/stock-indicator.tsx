import { getSizeStock, getStockState, getTotalStock } from "@/lib/product";
import { cn } from "@/lib/utils";
import type { Product, SizeId } from "@/types/product";

interface StockIndicatorProps {
  product: Pick<Product, "sizes">;
  /** the selected size, or null to describe the product overall */
  size: SizeId | null;
  className?: string;
}

/** Every number comes from per-size stock data. */
export function StockIndicator({ product, size, className }: StockIndicatorProps) {
  const stock = size ? getSizeStock(product, size) : getTotalStock(product);
  const state = getStockState(stock);
  const scope = size ? " in this size" : "";

  const text =
    state === "out"
      ? size
        ? "Out of stock in this size"
        : "Sold out"
      : state === "low"
        ? `Only ${stock} left${scope}`
        : "In stock";

  return (
    <p
      role="status"
      className={cn(
        "flex items-center gap-2 text-sm font-semibold",
        state === "out" && "text-danger",
        state === "low" && "text-warning",
        state === "in" && "text-success",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-2.5 rounded-full",
          state === "out" && "bg-danger",
          state === "low" && "animate-pulse-dot bg-warning",
          state === "in" && "bg-success",
        )}
      />
      {text}
    </p>
  );
}