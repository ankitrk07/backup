import type { CollectionSlug } from "./collection";
import type { DropId } from "./drop";
import type { ImageSlot } from "./image";

export const CATEGORY_IDS = ["tees", "oversized-tees", "hoodies", "accessories"] as const;
export type CategoryId = (typeof CATEGORY_IDS)[number];

export const SIZE_IDS = ["XS", "S", "M", "L", "XL", "XXL", "ONE"] as const;
export type SizeId = (typeof SIZE_IDS)[number];

export const COLOR_IDS = [
  "cosmic-pitch-black",
  "interstellar-acid",
  "nebula-violet",
  "stardust-bone",
] as const;
export type ColorId = (typeof COLOR_IDS)[number];

export const PRODUCT_VIEWS = ["front", "back", "detail"] as const;
export type ProductView = (typeof PRODUCT_VIEWS)[number];

export type FitType = "regular" | "oversized" | "boxy" | "adjustable" | "one-size";

export interface ProductColor {
  id: ColorId;
  name: string;
  hex: string;
}

export interface ProductSize {
  size: SizeId;
  stock: number;
}

export interface ProductImage {
  colorId: ColorId;
  view: ProductView;
  slot: ImageSlot;
}

export interface ProductRating {
  average: number;
  count: number;
  /** true while ratings are computed from the mock review dataset */
  isMock: boolean;
}

/** Raw catalogue record, exactly what a CMS / Shopify mapper would provide. */
export interface ProductRecord {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: CategoryId;
  collection: CollectionSlug;
  drop: DropId | null;
  price: number;
  compareAtPrice: number | null;
  /** null for products where fabric weight does not apply (stickers, tags) */
  gsm: number | null;
  fabric: string;
  fit: FitType;
  colors: ProductColor[];
  /** Per-size stock (shared across colours). */
  sizes: ProductSize[];
  tags: string[];
  createdAt: string;
}

/** Product as the UI consumes it, with derived fields attached. */
export interface Product extends ProductRecord {
  discountPercent: number;
  images: ProductImage[];
  rating: ProductRating;
}