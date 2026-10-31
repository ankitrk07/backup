import { getDropStatus } from "@/lib/drop-state";
import type { Drop, DropStatus } from "@/types/drop";
import { useNow } from "./use-now";

export function useDropStatus(
  drop: Pick<Drop, "startsAt" | "endsAt" | "stockRemaining">,
  serverNow: number,
): { status: DropStatus; now: number } {
  const now = useNow(serverNow);
  return { status: getDropStatus(drop, now), now };
}