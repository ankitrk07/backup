import type { DropId } from "./drop";
import type { ImageSlot } from "./image";
import type { CategoryId } from "./product";

export const COLLECTION_SLUGS = ["sisters-revenge", "orbit-zero", "planet-x", "essentials"] as const;
export type CollectionSlug = (typeof COLLECTION_SLUGS)[number];

export interface Collection {
  slug: CollectionSlug;
  name: string;
  tagline: string;
  description: string;
  dropId: DropId | null;
  banner: ImageSlot;
}

export interface Category {
  id: CategoryId;
  name: string;
  tagline: string;
  href: string;
  image: ImageSlot;
}