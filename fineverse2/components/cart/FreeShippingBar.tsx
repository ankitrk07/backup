import React from "react";
import { Truck } from "lucide-react";
import { formatPrice } from "@/lib/formatters";

interface FreeShippingBarProps {
  subtotal: number;
  threshold: number;
  progress: number;
  amountNeeded: number;
  hasFreeShipping: boolean;
}

export const FreeShippingBar: React.FC<FreeShippingBarProps> = ({
  subtotal,
  threshold,
  progress,
  amountNeeded,
  hasFreeShipping,
}) => {
  return (
    <div className="bg-space-900 border border-white/10 p-3 sm:p-3.5 space-y-2">
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
        <Truck className="w-4 h-4 text-acid flex-shrink-0" />
        {hasFreeShipping ? (
          <span className="text-acid font-bold">
            UNLOCKED: FREE PAN-INDIA EXPRESS SHIPPING!
          </span>
        ) : (
          <span className="text-zinc-300">
            ADD{" "}
            <span className="text-acid font-bold">{formatPrice(amountNeeded)}</span>{" "}
            MORE FOR FREE SHIPPING (ORDERS OVER {formatPrice(threshold)})
          </span>
        )}
      </div>

      {/* Progress Track */}
      <div className="w-full h-1.5 bg-space-950 overflow-hidden relative">
        <div
          className="h-full bg-acid transition-all duration-300 ease-out shadow-[0_0_8px_rgba(204,255,0,0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
