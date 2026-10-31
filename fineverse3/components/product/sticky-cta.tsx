"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { cn } from "@/lib/utils";

interface StickyCtaProps {
  name: string;
  price: number;
  compareAtPrice: number | null;
  label: string;
  disabled: boolean;
  onClick: () => void;
  /** id of the main add-to-cart block; the bar shows only while that is off screen */
  observeId: string;
}

export function StickyCta({
  name,
  price,
  compareAtPrice,
  label,
  disabled,
  onClick,
  observeId,
}: StickyCtaProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(observeId);
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting));
    observer.observe(target);
    return () => observer.disconnect();
  }, [observeId]);

  return (
    <div
      inert={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-sticky border-t border-line bg-bg/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-300 ease-out-expo motion-reduce:transition-none lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="mx-auto flex max-w-xl items-center gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm text-muted">{name}</p>
          <Price price={price} compareAtPrice={compareAtPrice} size="sm" showDiscount={false} />
        </div>
        <Button className="ml-auto shrink-0" onClick={onClick} disabled={disabled}>
          {label}
        </Button>
      </div>
    </div>
  );
}