import { siteConfig } from "@/config/site";
import type { ImageSlot } from "@/types/image";
import {
  PRODUCT_VIEWS,
  SIZE_IDS,
  type ColorId,
  type Product,
  type ProductImage,
  type ProductRating,
  type ProductSize,
  type ProductView,
  type SizeId,
} from "@/types/product";

export type StockState = "out" | "low" | "in";

export function computeDiscountPercent(price: number, compareAtPrice: number | null): number {
  if (compareAtPrice === null || compareAtPrice <= price) return 0;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

export function getTotalStock(product: Pick<Product, "sizes">): number {
  return product.sizes.reduce((total, entry) => total + Math.max(0, entry.stock), 0);
}

export function getSizeStock(product: Pick<Product, "sizes">, size: SizeId): number {
  return product.sizes.find((entry) => entry.size === size)?.stock ?? 0;
}

export function isSoldOut(product: Pick<Product, "sizes">): boolean {
  return getTotalStock(product) <= 0;
}

export function getStockState(stock: number): StockState {
  if (stock <= 0) return "out";
  if (stock <= siteConfig.catalog.lowStockThreshold) return "low";
  return "in";
}

export function sortSizes(sizes: readonly ProductSize[]): ProductSize[] {
  return [...sizes].sort((a, b) => SIZE_IDS.indexOf(a.size) - SIZE_IDS.indexOf(b.size));
}

/** Exact match, else same colour front view, else the first available image. */
export function getProductImage(
  product: Pick<Product, "images">,
  colorId: ColorId,
  view: ProductView,
): ImageSlot | null {
  const exact = product.images.find((img) => img.colorId === colorId && img.view === view);
  if (exact) return exact.slot;
  const front = product.images.find((img) => img.colorId === colorId && img.view === "front");
  if (front) return front.slot;
  return product.images[0]?.slot ?? null;
}

/** Images for one colour, ordered front, back, detail. */
export function getProductImagesForColor(
  product: Pick<Product, "images">,
  colorId: ColorId,
): ProductImage[] {
  return PRODUCT_VIEWS.map((view) =>
    product.images.find((img) => img.colorId === colorId && img.view === view),
  ).filter((img): img is ProductImage => img !== undefined);
}

export function summarizeRating(ratings: readonly number[], isMock: boolean): ProductRating {
  if (ratings.length === 0) return { average: 0, count: 0, isMock };
  const sum = ratings.reduce((total, value) => total + value, 0);
  return { average: Math.round((sum / ratings.length) * 10) / 10, count: ratings.length, isMock };
}