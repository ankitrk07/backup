import type { CollectionSlug } from "./collection";
import type { ImageSlot } from "./image";

export const DROP_IDS = ["drop-03", "drop-04", "drop-05"] as const;
export type DropId = (typeof DROP_IDS)[number];

export type DropStatus = "upcoming" | "live" | "sold-out" | "ended";

export interface Drop {
  id: DropId;
  slug: string;
  number: number;
  name: string;
  tagline: string;
  description: string;
  /** ISO 8601 with offset, e.g. 2026-10-20T19:00:00+05:30 */
  startsAt: string;
  endsAt: string;
  stockTotal: number;
  stockRemaining: number;
  collectionSlug: CollectionSlug | null;
  banner: ImageSlot;
}