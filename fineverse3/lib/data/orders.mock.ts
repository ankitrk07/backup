import type { OrderStatus, OrderSummary, TrackingEvent, TrackingResult } from "@/types/order";

/** Account page placeholder: no orders until a real backend exists. */
export const mockAccountOrders: OrderSummary[] = [];

const TIMELINE: ReadonlyArray<{ status: OrderStatus; label: string }> = [
  { status: "placed", label: "Order placed" },
  { status: "packed", label: "Packed" },
  { status: "shipped", label: "Shipped" },
  { status: "out-for-delivery", label: "Out for delivery" },
  { status: "delivered", label: "Delivered" },
];

const HOUR_MS = 3_600_000;
const DAY_MS = 86_400_000;

function hash(value: string): number {
  let total = 0;
  for (let index = 0; index < value.length; index += 1) {
    total = (total * 31 + value.charCodeAt(index)) % 100_003;
  }
  return total;
}

/**
 * MOCK: any order number returns a deterministic fake timeline.
 * [EDIT] Replace with a real courier / order API.
 */
export function buildMockTracking(orderId: string, now: number): TrackingResult {
  const reached = (hash(orderId.toUpperCase()) % 4) + 1; // 1..4
  const events: TrackingEvent[] = TIMELINE.slice(0, reached + 1).map((step, index) => ({
    status: step.status,
    label: step.label,
    timestamp: new Date(now - (reached - index) * 20 * HOUR_MS - 15 * 60_000).toISOString(),
  }));
  const status = TIMELINE[reached].status;
  return {
    orderId: orderId.toUpperCase(),
    status,
    events,
    estimatedDelivery:
      status === "delivered" ? null : new Date(now + (TIMELINE.length - reached) * DAY_MS).toISOString(),
    isMock: true,
  };
}