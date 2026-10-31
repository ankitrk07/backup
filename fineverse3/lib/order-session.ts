import type { PlacedOrder } from "@/types/order";

const STORAGE_KEY = "fineverse-last-order";

export function saveLastOrder(order: PlacedOrder): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  } catch {
    // Storage can be blocked (private mode). The confirmation page then shows its empty state.
  }
}

/** Returns the raw string so it can be used as a stable useSyncExternalStore snapshot. */
export function readLastOrderSnapshot(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function parseOrder(raw: string | null): PlacedOrder | null {
  if (!raw) return null;
  try {
    const data: unknown = JSON.parse(raw);
    if (typeof data !== "object" || data === null) return null;
    const value = data as Record<string, unknown>;
    const valid =
      typeof value.id === "string" &&
      typeof value.placedAt === "string" &&
      typeof value.totals === "object" &&
      value.totals !== null &&
      Array.isArray(value.lines) &&
      Array.isArray(value.addressLines);
    return valid ? (data as PlacedOrder) : null;
  } catch {
    return null;
  }
}