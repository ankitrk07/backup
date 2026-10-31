import { Truck } from "lucide-react";
import { formatINR } from "@/lib/format";
import { getFreeShippingProgress } from "@/lib/shipping";
import { cn } from "@/lib/utils";

interface FreeShippingBarProps {
  subtotal: number;
  className?: string;
}

/** Threshold comes from config, so the message and the maths never disagree. */
export function FreeShippingBar({ subtotal, className }: FreeShippingBarProps) {
  const progress = getFreeShippingProgress(subtotal);

  return (
    <div className={cn("rounded-lg border border-line bg-raised p-4", className)}>
      <p className="flex items-center gap-2 text-sm text-fg">
        <Truck
          className={cn("size-5 shrink-0", progress.unlocked ? "text-accent" : "text-subtle")}
          aria-hidden="true"
        />
        {progress.unlocked ? (
          <span className="font-semibold text-accent">{"You've unlocked free shipping"}</span>
        ) : (
          <span>
            Add <strong className="text-accent">{formatINR(progress.remaining)}</strong> more for free
            shipping
          </span>
        )}
      </p>
      <div
        role="progressbar"
        aria-label="Progress towards free shipping"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress.percent}
        className="mt-3 h-2 overflow-hidden rounded-full bg-line"
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out-expo motion-reduce:transition-none"
          style={{ width: `${progress.percent}%` }}
        />
      </div>
    </div>
  );
}