"use server";

import { getProductBySlug } from "@/lib/data";
import type { Product } from "@/types/product";

/** Lets client components (the wishlist) read catalogue data without importing the data layer. */
export async function fetchProductsBySlugs(slugs: string[]): Promise<Product[]> {
  const unique = Array.from(new Set(slugs.filter((slug) => typeof slug === "string"))).slice(0, 50);
  const found = await Promise.all(unique.map((slug) => getProductBySlug(slug)));
  return found.filter((product): product is Product => product !== null);
}