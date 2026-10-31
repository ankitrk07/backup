import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { siteConfig } from "@/config/site";
import { getCartCount, getCartSubtotal } from "@/lib/cart";
import type { CartLine, CartLineInput } from "@/types/cart";
import type { ColorId, SizeId } from "@/types/product";

export type AddItemResult =
  | { ok: true; quantity: number; capped: boolean }
  | { ok: false; reason: "out-of-stock" };

interface CartState {
  lines: CartLine[];
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  addItem: (input: CartLineInput, quantity?: number) => AddItemResult;
  removeItem: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clear: () => void;
}

export function getCartLineKey(productId: string, colorId: ColorId, size: SizeId): string {
  return `${productId}:${colorId}:${size}`;
}

function isCartLine(value: unknown): value is CartLine {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.key === "string" &&
    typeof v.productId === "string" &&
    typeof v.slug === "string" &&
    typeof v.name === "string" &&
    typeof v.price === "number" &&
    (v.compareAtPrice === null || typeof v.compareAtPrice === "number") &&
    typeof v.colorId === "string" &&
    typeof v.colorName === "string" &&
    typeof v.size === "string" &&
    typeof v.maxQuantity === "number" &&
    typeof v.quantity === "number" &&
    v.quantity > 0
  );
}

function lineLimit(maxQuantity: number): number {
  return Math.min(maxQuantity, siteConfig.catalog.maxQtyPerLine);
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),

      addItem: (input, quantity = 1) => {
        const limit = lineLimit(input.maxQuantity);
        if (limit <= 0) return { ok: false, reason: "out-of-stock" };

        const key = getCartLineKey(input.productId, input.colorId, input.size);
        const existing = get().lines.find((line) => line.key === key);
        const add = Math.max(1, Math.floor(quantity));
        const wanted = (existing?.quantity ?? 0) + add;
        const next = Math.min(wanted, limit);

        set((state) => ({
          lines: existing
            ? state.lines.map((line) =>
                line.key === key ? { ...line, ...input, key, quantity: next } : line,
              )
            : [...state.lines, { ...input, key, quantity: next }],
        }));

        return { ok: true, quantity: next, capped: wanted > limit };
      },

      removeItem: (key) => set((state) => ({ lines: state.lines.filter((line) => line.key !== key) })),

      setQuantity: (key, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((line) => line.key !== key)
              : state.lines.map((line) =>
                  line.key === key
                    ? {
                        ...line,
                        quantity: Math.min(Math.floor(quantity), lineLimit(line.maxQuantity)),
                      }
                    : line,
                ),
        })),

      clear: () => set({ lines: [] }),
    }),
    {
      name: "fineverse-cart",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      // Hydrated manually after mount (see store/hydrate.ts) to avoid SSR mismatches.
      skipHydration: true,
      partialize: (state) => ({ lines: state.lines }),
            migrate: (persisted) => {
        const stored = (persisted as { lines?: unknown } | null)?.lines;
        return { lines: Array.isArray(stored) ? stored.filter(isCartLine) : [] };
      },
      merge: (persisted, current) => {
        const stored = (persisted as { lines?: unknown } | null)?.lines;
        return { ...current, lines: Array.isArray(stored) ? stored.filter(isCartLine) : [] };
      },
    },
  ),
);

export const selectCartCount = (state: CartState): number => getCartCount(state.lines);
export const selectCartSubtotal = (state: CartState): number => getCartSubtotal(state.lines);