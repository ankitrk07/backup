import type { CartLine } from "@/types/cart";

export function getCartCount(lines: readonly CartLine[]): number {
  return lines.reduce((count, line) => count + line.quantity, 0);
}

export function getCartSubtotal(lines: readonly CartLine[]): number {
  return lines.reduce((total, line) => total + line.price * line.quantity, 0);
}

/** What the cart would cost at compare-at prices. */
export function getCartCompareAtSubtotal(lines: readonly CartLine[]): number {
  return lines.reduce(
    (total, line) => total + (line.compareAtPrice ?? line.price) * line.quantity,
    0,
  );
}

export function getCartSavings(lines: readonly CartLine[]): number {
  return Math.max(0, getCartCompareAtSubtotal(lines) - getCartSubtotal(lines));
}