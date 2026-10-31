"use client";

import { ShoppingBag } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyCartProps {
  variant?: "drawer" | "page";
  onNavigate?: () => void;
}

export function EmptyCart({ variant = "page", onNavigate }: EmptyCartProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        variant === "page" ? "py-20" : "py-12",
      )}
    >
      <span className="flex size-16 items-center justify-center rounded-full bg-raised text-accent">
        <ShoppingBag className="size-8" aria-hidden="true" />
      </span>
      <p className="mt-5 font-display text-2xl uppercase tracking-wide text-fg">Your cart is empty</p>
      <p className="mt-2 max-w-xs text-muted">
        Nothing here yet. Explore the latest drop and add something from the universe.
      </p>
      <ButtonLink href="/shop" onClick={onNavigate} className="mt-6">
        Start shopping
      </ButtonLink>
    </div>
  );
}