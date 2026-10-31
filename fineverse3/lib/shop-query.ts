import type { ProductQuery, ProductSort } from "@/lib/data";
import { formatINR } from "@/lib/format";
import { CATEGORY_LABEL, sizeLabel } from "@/lib/labels";
import { CATEGORY_IDS, SIZE_IDS, type CategoryId, type SizeId } from "@/types/product";

/*
 * Pure helpers shared by the server page and the client filter controls.
 * Do NOT import runtime values from "@/lib/data" here (type imports are fine),
 * otherwise the mock catalogue would be bundled into the browser.
 */

export type RawSearchParams = Record<string, string | string[] | undefined>;

export interface ShopFilters {
  category: CategoryId | null;
  sizes: SizeId[];
  minPrice: number | null;
  maxPrice: number | null;
  inStockOnly: boolean;
  sort: ProductSort;
  page: number;
}

export const DEFAULT_SORT: ProductSort = "featured";

export const SORT_OPTIONS: ReadonlyArray<{ value: ProductSort; label: string }> = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "discount", label: "Biggest discount" },
  { value: "rating", label: "Top rated" },
];

export interface PriceBand {
  id: string;
  label: string;
  min: number | null;
  max: number | null;
}

/** [EDIT] Adjust the bands to match your real price range. */
export const PRICE_BANDS: ReadonlyArray<PriceBand> = [
  { id: "under-1000", label: `Under ${formatINR(1000)}`, min: null, max: 999 },
  { id: "1000-1999", label: `${formatINR(1000)} to ${formatINR(1999)}`, min: 1000, max: 1999 },
  { id: "2000-2999", label: `${formatINR(2000)} to ${formatINR(2999)}`, min: 2000, max: 2999 },
  { id: "3000-plus", label: `${formatINR(3000)} and above`, min: 3000, max: null },
];

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parseNumber(value: string | undefined): number | null {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : null;
}

function isCategoryId(value: string | undefined): value is CategoryId {
  return value !== undefined && (CATEGORY_IDS as readonly string[]).includes(value);
}

/** Reads the URL. Anything invalid is ignored, so a bad link never breaks the page. */
export function parseShopParams(raw: RawSearchParams): ShopFilters {
  const categoryRaw = first(raw.category);
  const requestedSizes = (first(raw.size) ?? "").split(",");
  const sortRaw = first(raw.sort);

  return {
    category: isCategoryId(categoryRaw) ? categoryRaw : null,
    sizes: SIZE_IDS.filter((size) => requestedSizes.includes(size)),
    minPrice: parseNumber(first(raw.min)),
    maxPrice: parseNumber(first(raw.max)),
    inStockOnly: first(raw.stock) === "1",
    sort: SORT_OPTIONS.find((option) => option.value === sortRaw)?.value ?? DEFAULT_SORT,
    page: Math.max(1, parseNumber(first(raw.page)) ?? 1),
  };
}

export function toProductQuery(filters: ShopFilters): ProductQuery {
  return {
    category: filters.category ?? undefined,
    sizes: filters.sizes.length > 0 ? filters.sizes : undefined,
    minPrice: filters.minPrice ?? undefined,
    maxPrice: filters.maxPrice ?? undefined,
    inStockOnly: filters.inStockOnly || undefined,
    sort: filters.sort,
    page: filters.page,
  };
}

/** Builds a clean URL: defaults are omitted. */
export function buildShopHref(filters: ShopFilters, basePath = "/shop"): string {
  const params = new URLSearchParams();
  if (filters.category) params.set("category", filters.category);
  if (filters.sizes.length > 0) params.set("size", filters.sizes.join(","));
  if (filters.minPrice !== null) params.set("min", String(filters.minPrice));
  if (filters.maxPrice !== null) params.set("max", String(filters.maxPrice));
  if (filters.inStockOnly) params.set("stock", "1");
  if (filters.sort !== DEFAULT_SORT) params.set("sort", filters.sort);
  if (filters.page > 1) params.set("page", String(filters.page));
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function countActiveFilters(filters: ShopFilters): number {
  return (
    (filters.category ? 1 : 0) +
    filters.sizes.length +
    (filters.minPrice !== null || filters.maxPrice !== null ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0)
  );
}

export function hasActiveFilters(filters: ShopFilters): boolean {
  return countActiveFilters(filters) > 0;
}

/** True for "/shop?category=hoodies" and nothing else: the only filtered view worth indexing. */
export function isCategoryOnly(filters: ShopFilters): boolean {
  return (
    filters.category !== null &&
    countActiveFilters(filters) === 1 &&
    filters.sort === DEFAULT_SORT &&
    filters.page === 1
  );
}

export function clearFilters(filters: ShopFilters): ShopFilters {
  return {
    ...filters,
    category: null,
    sizes: [],
    minPrice: null,
    maxPrice: null,
    inStockOnly: false,
    page: 1,
  };
}

export interface ActiveFilterChip {
  key: string;
  label: string;
  /** link that removes just this filter */
  href: string;
}

function priceChipLabel(filters: ShopFilters): string {
  const band = PRICE_BANDS.find(
    (candidate) => candidate.min === filters.minPrice && candidate.max === filters.maxPrice,
  );
  if (band) return band.label;
  if (filters.minPrice !== null && filters.maxPrice !== null) {
    return `${formatINR(filters.minPrice)} to ${formatINR(filters.maxPrice)}`;
  }
  if (filters.minPrice !== null) return `${formatINR(filters.minPrice)} and above`;
  return `Under ${formatINR((filters.maxPrice ?? 0) + 1)}`;
}

export function getActiveFilterChips(filters: ShopFilters): ActiveFilterChip[] {
  const chips: ActiveFilterChip[] = [];
  const without = (patch: Partial<ShopFilters>) =>
    buildShopHref({ ...filters, ...patch, page: 1 });

  if (filters.category) {
    chips.push({
      key: "category",
      label: CATEGORY_LABEL[filters.category],
      href: without({ category: null }),
    });
  }
  for (const size of filters.sizes) {
    chips.push({
      key: `size-${size}`,
      label: `Size: ${sizeLabel(size)}`,
      href: without({ sizes: filters.sizes.filter((item) => item !== size) }),
    });
  }
  if (filters.minPrice !== null || filters.maxPrice !== null) {
    chips.push({
      key: "price",
      label: priceChipLabel(filters),
      href: without({ minPrice: null, maxPrice: null }),
    });
  }
  if (filters.inStockOnly) {
    chips.push({ key: "stock", label: "In stock only", href: without({ inStockOnly: false }) });
  }
  return chips;
}