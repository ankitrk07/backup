import type { Category } from "@/types/collection";

export type CategoryRecord = Omit<Category, "image">;

export const categoryRecords: CategoryRecord[] = [
  {
    id: "oversized-tees",
    name: "Oversized Tees",
    tagline: "Drop-shoulder, roomy fit",
    href: "/shop?category=oversized-tees",
  },
  {
    id: "hoodies",
    name: "Hoodies",
    tagline: "Heavyweight comfort",
    href: "/shop?category=hoodies",
  },
  {
    id: "tees",
    name: "Tees",
    tagline: "Everyday cosmic basics",
    href: "/shop?category=tees",
  },
  {
    id: "accessories",
    name: "Accessories",
    tagline: "Caps, stickers & tags",
    href: "/shop?category=accessories",
  },
];