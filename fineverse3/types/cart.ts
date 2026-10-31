import type { ColorId, SizeId } from "./product";

export interface CartLineInput {
  productId: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice: number | null;
  colorId: ColorId;
  colorName: string;
  size: SizeId;
  /** Stock available for this size at the time of adding. */
  maxQuantity: number;
}

export interface CartLine extends CartLineInput {
  /** `${productId}:${colorId}:${size}`, each variant is its own line. */
  key: string;
  quantity: number;
}