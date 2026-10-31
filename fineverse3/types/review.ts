import type { ColorId, SizeId } from "./product";

export interface Review {
  id: string;
  productSlug: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  createdAt: string;
  verifiedPurchase: boolean;
  size?: SizeId;
  colorId?: ColorId;
  /** true for sample data. The UI must label these clearly. */
  isMock: boolean;
}