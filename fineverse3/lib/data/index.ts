import { siteConfig } from "@/config/site";
import { formatINR } from "@/lib/format";
import { clamp } from "@/lib/format";
import {
  getAvatar,
  getCategoryImage,
  getCollectionBanner,
  getDropBanner,
  getProductImages,
  getVideoThumbnail,
} from "@/lib/images";
import { getDropStatus } from "@/lib/drop-state";
import {
  computeDiscountPercent,
  getProductImage,
  getTotalStock,
  isSoldOut,
  summarizeRating,
} from "@/lib/product";
import { createSearchEntry, type SearchEntry } from "@/lib/search";
import type { Category, Collection } from "@/types/collection";
import type { SizeChart, Testimonial, VideoItem, FaqItem } from "@/types/content";
import type { Drop, DropId } from "@/types/drop";
import type { TrackingResult, OrderSummary } from "@/types/order";
import {
  CATEGORY_IDS,
  SIZE_IDS,
  type CategoryId,
  type Product,
  type ProductRecord,
  type SizeId,
} from "@/types/product";
import type { CollectionSlug } from "@/types/collection";
import type { Review } from "@/types/review";

import { categoryRecords } from "./categories.mock";
import { collectionRecords } from "./collections.mock";
import {
  faqRecords,
  IS_MOCK_TESTIMONIALS,
  sizeCharts,
  testimonialRecords,
  videoRecords,
} from "./content.mock";
import { dropRecords, type DropRecord } from "./drops.mock";
import { buildMockTracking, mockAccountOrders } from "./orders.mock";
import { productRecords } from "./products.mock";
import { IS_MOCK_REVIEWS, reviewRecords } from "./reviews.mock";

/*
 * DATA-ACCESS LAYER
 * UI components import ONLY from "@/lib/data". To go live, replace the
 * implementations below (or the *.mock.ts sources) with Shopify / API calls
 * that return the same types. No component needs to change.
 */

export const DATA_FLAGS = {
  reviewsAreMock: IS_MOCK_REVIEWS,
  testimonialsAreMock: IS_MOCK_TESTIMONIALS,
} as const;

/* ───────────── query types ───────────── */

export type ProductSort =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "discount"
  | "rating";

export const PRODUCT_SORTS: ReadonlyArray<{ value: ProductSort; label: string }> = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "discount", label: "Biggest discount" },
  { value: "rating", label: "Top rated" },
];

export interface ProductQuery {
  category?: CategoryId;
  collection?: CollectionSlug;
  drop?: DropId;
  tag?: string;
  /** product must have at least one of these sizes IN STOCK */
  sizes?: SizeId[];
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  inStockOnly?: boolean;
  sort?: ProductSort;
  /** 1-based. getProductPage returns items for pages 1..page (load-more style). */
  page?: number;
  pageSize?: number;
}

export interface ProductPage {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
  hasMore: boolean;
}

export interface CatalogFacets {
  priceMin: number;
  priceMax: number;
  sizes: SizeId[];
  categoryCounts: Record<CategoryId, number>;
}

/* ───────────── internal builders ───────────── */

function toProduct(record: ProductRecord): Product {
  const ratings = reviewRecords
    .filter((review) => review.productSlug === record.slug)
    .map((review) => review.rating);

  return {
    ...record,
    discountPercent: computeDiscountPercent(record.price, record.compareAtPrice),
    images: getProductImages({ slug: record.slug, name: record.name, colors: record.colors }),
    rating: summarizeRating(ratings, IS_MOCK_REVIEWS),
  };
}

let productCache: Product[] | undefined;
function allProducts(): Product[] {
  productCache ??= productRecords.map(toProduct);
  return productCache;
}

function toDrop(record: DropRecord): Drop {
  const inDrop = allProducts().filter((product) => product.drop === record.id);
  const stockRemaining =
    inDrop.length === 0
      ? record.stockTotal
      : Math.min(
          record.stockTotal,
          inDrop.reduce((total, product) => total + getTotalStock(product), 0),
        );
  return { ...record, stockRemaining, banner: getDropBanner(record.id, record.name) };
}

let dropCache: Drop[] | undefined;
function allDrops(): Drop[] {
  dropCache ??= dropRecords.map(toDrop);
  return dropCache;
}

let collectionCache: Collection[] | undefined;
function allCollections(): Collection[] {
  collectionCache ??= collectionRecords.map((record) => ({
    ...record,
    banner: getCollectionBanner(record.slug, record.name),
  }));
  return collectionCache;
}

function applyQuery(products: readonly Product[], query: ProductQuery): Product[] {
  const tokens = (query.search ?? "").toLowerCase().split(/\s+/).filter(Boolean);

  const filtered = products.filter((product) => {
    if (query.category && product.category !== query.category) return false;
    if (query.collection && product.collection !== query.collection) return false;
    if (query.drop && product.drop !== query.drop) return false;
    if (query.tag && !product.tags.includes(query.tag)) return false;
    if (query.minPrice !== undefined && product.price < query.minPrice) return false;
    if (query.maxPrice !== undefined && product.price > query.maxPrice) return false;
    if (query.inStockOnly && isSoldOut(product)) return false;
    if (
      query.sizes &&
      query.sizes.length > 0 &&
      !product.sizes.some((entry) => query.sizes?.includes(entry.size) && entry.stock > 0)
    ) {
      return false;
    }
    if (tokens.length > 0) {
      const text = `${product.name} ${product.description} ${product.tags.join(" ")} ${product.category}`.toLowerCase();
      if (!tokens.every((token) => text.includes(token))) return false;
    }
    return true;
  });

  const sorted = [...filtered];
  switch (query.sort ?? "featured") {
    case "newest":
      sorted.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
      break;
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "discount":
      sorted.sort((a, b) => b.discountPercent - a.discountPercent);
      break;
    case "rating":
      sorted.sort((a, b) => b.rating.average - a.rating.average || b.rating.count - a.rating.count);
      break;
    case "featured":
    default:
      // curated order, but sold-out items sink to the end (stable)
      return [...sorted.filter((p) => !isSoldOut(p)), ...sorted.filter((p) => isSoldOut(p))];
  }
  return sorted;
}

/* ───────────── products ───────────── */

export async function getProducts(query: ProductQuery = {}): Promise<Product[]> {
  return applyQuery(allProducts(), query);
}

export async function getProductPage(query: ProductQuery = {}): Promise<ProductPage> {
  const filtered = applyQuery(allProducts(), query);
  const pageSize = Math.max(1, query.pageSize ?? siteConfig.catalog.pageSize);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const page = clamp(Math.floor(query.page ?? 1), 1, pageCount);
  return {
    items: filtered.slice(0, page * pageSize),
    total: filtered.length,
    page,
    pageSize,
    pageCount,
    hasMore: page < pageCount,
  };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return allProducts().find((product) => product.slug === slug) ?? null;
}

export async function getProductSlugs(): Promise<string[]> {
  return allProducts().map((product) => product.slug);
}

export async function getTrendingProducts(limit = 4): Promise<Product[]> {
  const products = allProducts().filter((product) => !isSoldOut(product));
  const tagged = products.filter((product) => product.tags.includes("trending"));
  const rest = products.filter((product) => !product.tags.includes("trending"));
  return [...tagged, ...rest].slice(0, limit);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return allProducts()
    .filter((candidate) => candidate.slug !== product.slug)
    .map((candidate) => {
      let score = 0;
      if (candidate.collection === product.collection) score += 3;
      if (candidate.category === product.category) score += 2;
      if (candidate.drop !== null && candidate.drop === product.drop) score += 1;
      if (isSoldOut(candidate)) score -= 5;
      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.candidate);
}

export async function getFacets(): Promise<CatalogFacets> {
  const products = allProducts();
  const prices = products.map((product) => product.price);
  const sizes = new Set<SizeId>();
  const categoryCounts = { tees: 0, "oversized-tees": 0, hoodies: 0, accessories: 0 } satisfies Record<
    CategoryId,
    number
  >;

  for (const product of products) {
    categoryCounts[product.category] += 1;
    product.sizes.forEach((entry) => sizes.add(entry.size));
  }

  return {
    priceMin: prices.length ? Math.min(...prices) : 0,
    priceMax: prices.length ? Math.max(...prices) : 0,
    sizes: SIZE_IDS.filter((size) => sizes.has(size)),
    categoryCounts,
  };
}

/* ───────────── categories & collections ───────────── */

export async function getCategories(): Promise<Category[]> {
  return categoryRecords.map((record) => ({ ...record, image: getCategoryImage(record.id) }));
}

export function isCategoryId(value: string): value is CategoryId {
  return (CATEGORY_IDS as readonly string[]).includes(value);
}

export async function getCollections(): Promise<Collection[]> {
  return allCollections();
}

export async function getCollection(slug: string): Promise<Collection | null> {
  return allCollections().find((collection) => collection.slug === slug) ?? null;
}

export async function getCollectionSlugs(): Promise<string[]> {
  return allCollections().map((collection) => collection.slug);
}

/* ───────────── drops ───────────── */

export async function getDrops(): Promise<Drop[]> {
  return [...allDrops()].sort((a, b) => b.number - a.number);
}

export async function getDrop(idOrSlug: string): Promise<Drop | null> {
  return allDrops().find((drop) => drop.id === idOrSlug || drop.slug === idOrSlug) ?? null;
}

/**
 * The flagship drop for the home page: a LIVE drop if there is one, otherwise
 * the most recent drop that actually has products.
 */
export async function getCurrentDrop(now: number = Date.now()): Promise<Drop | null> {
  const drops = allDrops();
  const live = drops
    .filter((drop) => getDropStatus(drop, now) === "live")
    .sort((a, b) => Date.parse(a.endsAt) - Date.parse(b.endsAt));
  if (live.length > 0) return live[0];

  const withProducts = drops
    .filter((drop) => allProducts().some((product) => product.drop === drop.id))
    .sort((a, b) => b.number - a.number);
  return withProducts[0] ?? drops[0] ?? null;
}

/** The soonest drop that has not started yet (used for the "next drop" countdown). */
export async function getUpcomingDrop(now: number = Date.now()): Promise<Drop | null> {
  const upcoming = allDrops()
    .filter((drop) => getDropStatus(drop, now) === "upcoming")
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
  return upcoming[0] ?? null;
}

/* ───────────── reviews & content ───────────── */

export async function getReviews(productSlug: string): Promise<Review[]> {
  return reviewRecords
    .filter((review) => review.productSlug === productSlug)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return testimonialRecords.map(({ avatarVariant, ...record }) => ({
    ...record,
    avatar: getAvatar(avatarVariant, record.name),
  }));
}

export async function getVideos(): Promise<VideoItem[]> {
  return videoRecords.map(({ thumbnailVariant, ...record }) => ({
    ...record,
    thumbnail: getVideoThumbnail(thumbnailVariant, record.title),
  }));
}

export async function getFaqs(): Promise<FaqItem[]> {
  return faqRecords;
}

export async function getSizeChart(category: CategoryId): Promise<SizeChart | null> {
  return sizeCharts[category] ?? null;
}

/* ───────────── orders (mock) ───────────── */

export async function getAccountOrders(): Promise<OrderSummary[]> {
  return mockAccountOrders;
}

/** MOCK. Call from a server action; returns a deterministic fake timeline. */
export async function trackOrder(orderId: string): Promise<TrackingResult | null> {
  const trimmed = orderId.trim();
  if (trimmed.length < 4) return null;
  return buildMockTracking(trimmed, Date.now());
}

/* ───────────── search index ───────────── */

const PAGE_ENTRIES = [
  { title: "Track order", href: "/track-order", keywords: ["tracking", "status", "delivery"] },
  { title: "FAQ", href: "/faq", keywords: ["help", "questions", "support"] },
  { title: "Shipping policy", href: "/policies/shipping", keywords: ["delivery", "dispatch"] },
  { title: "Returns & exchanges", href: "/policies/returns", keywords: ["refund", "return"] },
  { title: "Contact us", href: "/contact", keywords: ["support", "help", "email"] },
  { title: "About FINEVERSE", href: "/about", keywords: ["story", "brand"] },
  { title: "Wishlist", href: "/wishlist", keywords: ["saved", "favourites"] },
] as const;

/** Light-weight index passed to the (lazy) command palette. */
export async function getSearchIndex(): Promise<SearchEntry[]> {
  const categoryNames = new Map(categoryRecords.map((record) => [record.id, record.name]));

  const products = allProducts().map((product) => {
    const firstColor = product.colors[0];
    return createSearchEntry(
      {
        id: `product:${product.slug}`,
        type: "product",
        title: product.name,
        subtitle: `${categoryNames.get(product.category) ?? "Product"} · ${formatINR(product.price)}`,
        href: `/shop/${product.slug}`,
        image: firstColor ? (getProductImage(product, firstColor.id, "front") ?? undefined) : undefined,
      },
      [...product.tags, product.category, product.collection, product.description],
    );
  });

  const collections = allCollections().map((collection) =>
    createSearchEntry(
      {
        id: `collection:${collection.slug}`,
        type: "collection",
        title: collection.name,
        subtitle: collection.tagline,
        href: `/collections/${collection.slug}`,
      },
      [collection.description],
    ),
  );

  const pages = PAGE_ENTRIES.map((page) =>
    createSearchEntry(
      { id: `page:${page.href}`, type: "page", title: page.title, href: page.href },
      page.keywords,
    ),
  );

  return [...collections, ...products, ...pages];
}