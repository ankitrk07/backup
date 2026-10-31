import type { CategoryId, SizeId } from "@/types/product";

export function sizeLabel(size: SizeId): string {
  return size === "ONE" ? "One size" : size;
}

export const CATEGORY_LABEL: Record<CategoryId, string> = {
  tees: "Tees",
  "oversized-tees": "Oversized Tees",
  hoodies: "Hoodies",
  accessories: "Accessories",
};