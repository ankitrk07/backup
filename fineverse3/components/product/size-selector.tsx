"use client";

import { CircleAlert } from "lucide-react";
import { useId, type ReactNode } from "react";
import { sizeLabel } from "@/lib/labels";
import { sortSizes } from "@/lib/product";
import { cn } from "@/lib/utils";
import type { ProductSize, SizeId } from "@/types/product";

/** The add-to-cart flow scrolls to and focuses this element when no size is chosen. */
export const SIZE_GROUP_ID = "size-selector";

interface SizeSelectorProps {
  sizes: ProductSize[];
  value: SizeId | null;
  onChange: (size: SizeId) => void;
  error: string | null;
  /** e.g. the size guide trigger */
  action?: ReactNode;
}

export function SizeSelector({ sizes, value, onChange, error, action }: SizeSelectorProps) {
  const groupName = useId();
  const labelId = `${groupName}-label`;
  const errorId = `${groupName}-error`;

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p id={labelId} className="text-sm font-semibold text-fg">
          Size
        </p>
        {action}
      </div>

      <div
        id={SIZE_GROUP_ID}
        role="radiogroup"
        aria-labelledby={labelId}
        aria-describedby={error ? errorId : undefined}
        className="mt-3 flex flex-wrap gap-2"
      >
        {sortSizes(sizes).map((entry) => {
          const soldOut = entry.stock <= 0;
          return (
            <label key={entry.size} className="relative">
              <input
                type="radio"
                name={groupName}
                value={entry.size}
                checked={value === entry.size}
                disabled={soldOut}
                onChange={() => onChange(entry.size)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "flex min-h-tap min-w-[3.25rem] cursor-pointer items-center justify-center rounded border border-line px-4 text-base font-semibold text-fg transition-colors",
                  "hover:border-subtle peer-checked:border-accent peer-checked:bg-accent peer-checked:text-accent-fg",
                  "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent",
                  "peer-disabled:cursor-not-allowed peer-disabled:border-dashed peer-disabled:text-subtle peer-disabled:line-through peer-disabled:hover:border-line",
                )}
              >
                {sizeLabel(entry.size)}
                {soldOut ? <span className="sr-only"> (out of stock)</span> : null}
              </span>
            </label>
          );
        })}
      </div>

      {error ? (
        <p id={errorId} role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-danger">
          <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}