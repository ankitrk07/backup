"use client";

import { Trash2 } from "lucide-react";
import Link from "next/link";
import { SlotImage } from "@/components/media/slot-image";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { siteConfig } from "@/config/site";
import { getCartLineImage } from "@/lib/cart-image";
import { formatINR } from "@/lib/format";
import { sizeLabel } from "@/lib/labels";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import type { CartLine } from "@/types/cart";

interface CartLineItemProps {
  line: CartLine;
  variant?: "compact" | "full";
  /** called when the shopper follows the product link (e.g. to close the drawer) */
  onNavigate?: () => void;
}

export function CartLineItem({ line, variant = "compact", onNavigate }: CartLineItemProps) {
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const slot = getCartLineImage(line);
  const maxQuantity = Math.min(line.maxQuantity, siteConfig.catalog.maxQtyPerLine);
  const variantText = `${line.colorName} · ${sizeLabel(line.size)}`;
  const isFull = variant === "full";

  return (
    <li className="flex gap-4 py-4">
      <SlotImage
        slot={slot}
        decorative
        sizes={isFull ? "112px" : "80px"}
        className={cn("shrink-0 rounded border border-line", isFull ? "w-28" : "w-20")}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/shop/${line.slug}`}
              onClick={onNavigate}
              className="block text-base font-semibold leading-snug text-fg transition-colors hover:text-accent"
            >
              {line.name}
            </Link>
            <p className="mt-0.5 text-sm text-muted">{variantText}</p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(line.key)}
            aria-label={`Remove ${line.name}, ${variantText}, from cart`}
            className="-mr-2 -mt-1 flex size-11 shrink-0 items-center justify-center rounded text-subtle transition-colors hover:text-danger"
          >
            <Trash2 className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
          <QuantityStepper
            value={line.quantity}
            max={maxQuantity}
            label={`${line.name} (${variantText})`}
            onChange={(next) => setQuantity(line.key, next)}
          />
          <div className="text-right">
            <p className="font-display text-xl tracking-wide text-fg tabular">
              {formatINR(line.price * line.quantity)}
            </p>
            {line.quantity > 1 ? (
              <p className="text-xs text-subtle tabular">{formatINR(line.price)} each</p>
            ) : null}
          </div>
        </div>

        {line.quantity >= maxQuantity ? (
          <p className="mt-2 text-xs text-warning">Maximum available quantity added</p>
        ) : null}
      </div>
    </li>
  );
}