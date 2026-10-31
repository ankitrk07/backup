import type { Drop } from "@/types/drop";

/** Stock remaining is NOT stored here. The data layer computes it from product stock. */
export type DropRecord = Omit<Drop, "banner" | "stockRemaining">;

/*
 * MOCK DROPS. [EDIT] Change names, dates and stock totals to your real drops.
 * Dates are real timestamps (IST). After they pass, the UI moves to the
 * "ended" / "upcoming" states automatically, so nothing needs hardcoding.
 */
export const dropRecords: DropRecord[] = [
  {
    id: "drop-03",
    slug: "orbit-zero",
    number: 3,
    name: "Orbit Zero",
    tagline: "Drop 03",
    description: "A past numbered drop. Remaining stock is listed while it lasts.",
    startsAt: "2026-08-15T19:00:00+05:30",
    endsAt: "2026-08-31T23:59:00+05:30",
    stockTotal: 150,
    collectionSlug: "orbit-zero",
  },
  {
    id: "drop-04",
    slug: "sisters-revenge",
    number: 4,
    name: "Sisters Revenge",
    tagline: "Drop 04",
    description:
      "A numbered, limited release: oversized tee, heavyweight hoodie, cap and sticker pack.",
    startsAt: "2026-10-20T19:00:00+05:30",
    endsAt: "2026-11-30T23:59:00+05:30",
    stockTotal: 300,
    collectionSlug: "sisters-revenge",
  },
  {
    id: "drop-05",
    slug: "classified",
    number: 5,
    name: "Classified",
    tagline: "Drop 05",
    description: "The next numbered drop. Join the whitelist to get early access.",
    startsAt: "2026-12-12T19:00:00+05:30",
    endsAt: "2026-12-31T23:59:00+05:30",
    stockTotal: 250,
    collectionSlug: null,
  },
];