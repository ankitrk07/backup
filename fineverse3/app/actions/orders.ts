"use server";

import { trackOrder } from "@/lib/data";
import { trackOrderSchema, type TrackOrderValues } from "@/lib/validators";
import type { TrackingResult } from "@/types/order";

export type TrackOrderActionResult =
  | { ok: true; result: TrackingResult }
  | { ok: false; error: string };

export async function trackOrderAction(input: TrackOrderValues): Promise<TrackOrderActionResult> {
  // Validate again on the server. Never trust the client.
  const parsed = trackOrderSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please check the order number and your contact details." };
  }

  const result = await trackOrder(parsed.data.orderId);
  if (!result) return { ok: false, error: "We could not find that order." };

  return { ok: true, result };
}