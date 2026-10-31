export type DropStatus = "upcoming" | "live" | "sold_out" | "ended";

export interface Drop {
  id: string;               // e.g. "drop-04"
  slug: string;             // e.g. "drop-04-sisters-revenge"
  number: number;           // 4
  name: string;             // "Sisters Revenge"
  tagline: string;          // "Chapter IV: A Reckoning in the Void"
  description: string;
  startDateTime: string;    // ISO timestamp (e.g. "2026-10-01T12:00:00Z")
  endDateTime: string;      // ISO timestamp (e.g. "2026-11-15T23:59:59Z")
  totalUnitsAllocated: number; // e.g. 500
  unitsClaimed: number;        // e.g. 402
  // unitsRemaining = totalUnitsAllocated - unitsClaimed
  isNumberedPieces: boolean;   // Limited numbered edition certificates
  flagshipProductId: string;   // Associated flagship product id
  featuredProductIds: string[];
  bannerSlotKey: string;
  themeColor: {
    primary: string;    // e.g. "#CCFF00"
    secondary: string;  // e.g. "#8B5CF6"
    accentBg: string;   // e.g. "rgba(204, 255, 0, 0.05)"
  };
}
