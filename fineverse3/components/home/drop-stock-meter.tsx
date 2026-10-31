"use client";

import { useDropStatus } from "@/hooks/use-drop-status";
import { getDropStockProgress } from "@/lib/drop-state";
import { cn } from "@/lib/utils";
import type { Drop } from "@/types/drop";

interface DropStockMeterProps {
  drop: Pick<Drop, "startsAt" | "endsAt" | "stockTotal" | "stockRemaining">;
  serverNow: number;
  className?: string;
}

/** Every number here is computed from the drop's data. Nothing is hardcoded. */
export function DropStockMeter({ drop, serverNow, className }: DropStockMeterProps) {
  const { status } = useDropStatus(drop, serverNow);
  const stock = getDropStockProgress(drop);

  if (status === "upcoming") {
    return <p className={cn("text-sm text-muted", className)}>{stock.total} pieces in this drop</p>;
  }
  if (status === "ended") {
    return <p className={cn("text-sm text-muted", className)}>This drop has ended</p>;
  }

  const soldOut = status === "sold-out";
  const tone = soldOut ? "danger" : stock.isLow ? "warning" : "accent";

  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between gap-3 text-sm">
        <span
          className={cn(
            "font-semibold tabular",
            tone === "danger" && "text-danger",
            tone === "warning" && "text-warning",
            tone === "accent" && "text-fg",
          )}
        >
          {soldOut ? "Sold out" : `${stock.remaining} of ${stock.total} left`}
        </span>
        {stock.isLow && !soldOut ? (
          <span className="text-warning">Almost gone</span>
        ) : (
          <span className="text-subtle tabular">{stock.percentSold}% claimed</span>
        )}
      </div>
      <div
        role="progressbar"
        aria-label="Share of this drop already claimed"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={stock.percentSold}
        className="h-2.5 overflow-hidden rounded-full bg-line"
      >
        <div
          className={cn(
            "h-full rounded-full",
            tone === "danger" && "bg-danger",
            tone === "warning" && "bg-warning",
            tone === "accent" && "bg-accent",
          )}
          style={{ width: `${stock.percentSold}%` }}
        />
      </div>
    </div>
  );
}