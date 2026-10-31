import { Drop, DropStatus } from "@/types";
import { MOCK_DROPS } from "./mock-db";

const simulateDelay = (ms = 50) => new Promise((resolve) => setTimeout(resolve, ms));

export function getDropStatus(drop: Drop): DropStatus {
  const now = new Date().getTime();
  const start = new Date(drop.startDateTime).getTime();
  const end = new Date(drop.endDateTime).getTime();
  const remainingStock = drop.totalUnitsAllocated - drop.unitsClaimed;

  if (remainingStock <= 0) {
    return "sold_out";
  }
  if (now < start) {
    return "upcoming";
  }
  if (now > end) {
    return "ended";
  }
  return "live";
}

export async function getCurrentDrop(): Promise<Drop> {
  await simulateDelay();
  // Returns Drop 04 (most recent active drop)
  return MOCK_DROPS[0];
}

export async function getDropBySlug(slug: string): Promise<Drop | null> {
  await simulateDelay();
  const drop = MOCK_DROPS.find((d) => d.slug === slug || d.id === slug);
  return drop || null;
}
