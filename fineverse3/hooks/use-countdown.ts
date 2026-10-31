import { getCountdownParts, type CountdownParts } from "@/lib/drop-state";
import { useNow } from "./use-now";

/**
 * Ticks every second towards a real ISO timestamp.
 * @param serverNow timestamp from the server render, keeps hydration stable
 */
export function useCountdown(targetIso: string, serverNow: number): CountdownParts {
  const now = useNow(serverNow);
  return getCountdownParts(Date.parse(targetIso), now);
}