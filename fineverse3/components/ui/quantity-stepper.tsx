"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  /** What is being counted, used in screen-reader labels (e.g. the product name). */
  label?: string;
  className?: string;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  label = "item",
  className,
}: QuantityStepperProps) {
  const atMin = value <= min;
  const atMax = value >= max;
  const buttonClass =
    "flex size-11 items-center justify-center text-fg transition-colors hover:bg-raised disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent";

  return (
    <div
      role="group"
      aria-label={`Quantity for ${label}`}
      className={cn("inline-flex items-center rounded border border-line bg-surface", className)}
    >
      <button
        type="button"
        className={buttonClass}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={atMin}
        aria-label={`Decrease quantity of ${label}`}
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <span aria-live="polite" aria-atomic="true" className="w-10 text-center text-base font-semibold tabular">
        {value}
      </span>
      <button
        type="button"
        className={buttonClass}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={atMax}
        aria-label={`Increase quantity of ${label}`}
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}