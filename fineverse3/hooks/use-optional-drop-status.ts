import { getDropStatus, type DropTiming } from "@/lib/drop-state";
import type { DropStatus } from "@/types/drop";
import { useNow } from "./use-now";

/** Like useDropStatus, but for products that may not belong to a drop. */
export function useOptionalDropStatus(
  drop: DropTiming | null,
  serverNow: number,
): DropStatus | null {
  const now = useNow(serverNow);
  return drop ? getDropStatus(drop, now) : null;
}