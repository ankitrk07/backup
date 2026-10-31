import { siteConfig } from "@/config/site";
import type { Drop, DropStatus } from "@/types/drop";

export type DropTiming = Pick<Drop, "startsAt" | "endsAt" | "stockRemaining">;

export const DROP_STATUS_LABEL: Record<DropStatus, string> = {
  upcoming: "Coming soon",
  live: "Live now",
  "sold-out": "Sold out",
  ended: "Ended",
};

/**
 * Status is always computed from data, never hardcoded.
 * Order matters: a drop that has not started is "upcoming" even with full stock;
 * an empty drop is "sold-out" even before its end time.
 */
export function getDropStatus(drop: DropTiming, now: number): DropStatus {
  const start = Date.parse(drop.startsAt);
  const end = Date.parse(drop.endsAt);
  if (now < start) return "upcoming";
  if (drop.stockRemaining <= 0) return "sold-out";
  if (now >= end) return "ended";
  return "live";
}

export interface DropStockProgress {
  total: number;
  remaining: number;
  sold: number;
  percentSold: number;
  percentRemaining: number;
  isLow: boolean;
}

export function getDropStockProgress(
  drop: Pick<Drop, "stockTotal" | "stockRemaining">,
): DropStockProgress {
  const total = Math.max(0, drop.stockTotal);
  const remaining = Math.min(Math.max(0, drop.stockRemaining), total);
  const sold = total - remaining;
  const percentSold = total === 0 ? 0 : Math.round((sold / total) * 100);
  return {
    total,
    remaining,
    sold,
    percentSold,
    percentRemaining: 100 - percentSold,
    isLow: total > 0 && remaining > 0 && remaining / total <= siteConfig.catalog.dropLowStockRatio,
  };
}

/** The timestamp the countdown should tick towards (null when there is nothing to count). */
export function getDropCountdownTarget(
  drop: Pick<Drop, "startsAt" | "endsAt">,
  status: DropStatus,
): string | null {
  if (status === "upcoming") return drop.startsAt;
  if (status === "live") return drop.endsAt;
  return null;
}

export interface CountdownParts {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export function getCountdownParts(targetMs: number, nowMs: number): CountdownParts {
  const safeTarget = Number.isNaN(targetMs) ? nowMs : targetMs;
  const totalMs = Math.max(0, safeTarget - nowMs);
  const totalSeconds = Math.floor(totalMs / 1000);
  return {
    totalMs,
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
    isComplete: totalMs <= 0,
  };
}