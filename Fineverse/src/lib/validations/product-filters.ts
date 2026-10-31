import {
  parseAsString,
  parseAsArrayOf,
  parseAsFloat,
  parseAsInteger,
  parseAsBoolean,
  parseAsStringEnum,
  createSearchParamsCache,
  type inferParserType,
} from "nuqs/server"
import type { ProductFilters } from "@/types"

export const sortOptions = [
  "featured",
  "newest",
  "price-asc",
  "price-desc",
  "rating",
  "popular",
  "discount",
] as const

export const productFilterParsers = {
  category: parseAsString,
  sub: parseAsString,
  brand: parseAsArrayOf(parseAsString).withDefault([]),
  minPrice: parseAsFloat,
  maxPrice: parseAsFloat,
  rating: parseAsInteger,
  featured: parseAsBoolean,
  inStock: parseAsBoolean,
  discount: parseAsBoolean,
  color: parseAsArrayOf(parseAsString).withDefault([]),
  size: parseAsArrayOf(parseAsString).withDefault([]),
  sort: parseAsStringEnum([...sortOptions]).withDefault("featured"),
  page: parseAsInteger.withDefault(1),
  q: parseAsString,
}

export type ProductFilterParams = inferParserType<typeof productFilterParsers>

export const productFiltersCache = createSearchParamsCache(productFilterParsers)

export function toProductFilters(
  params: ProductFilterParams,
  overrides?: { category?: string }
): ProductFilters {
  return {
    category: overrides?.category ?? params.category ?? undefined,
    subcategory: params.sub ?? undefined,
    brand: params.brand.length ? params.brand : undefined,
    minPrice: params.minPrice ?? undefined,
    maxPrice: params.maxPrice ?? undefined,
    rating: params.rating ?? undefined,
    featuredOnly: params.featured ?? undefined,
    inStockOnly: params.inStock ?? undefined,
    minDiscount: params.discount ? 1 : undefined,
    color: params.color.length ? params.color : undefined,
    size: params.size.length ? params.size : undefined,
    sort: params.sort,
    page: params.page,
    q: params.q ?? undefined,
  }
}
