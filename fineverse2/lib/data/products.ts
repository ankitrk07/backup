import { Product, ProductFilterParams } from "@/types";
import { MOCK_PRODUCTS } from "./mock-db";

// Simulated network latency for true async API parity
const simulateDelay = (ms = 50) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getProducts(filters?: ProductFilterParams): Promise<Product[]> {
  await simulateDelay();
  let results = [...MOCK_PRODUCTS];

  if (!filters) return results;

  if (filters.category) {
    results = results.filter((p) => p.category === filters.category);
  }

  if (filters.collection) {
    results = results.filter((p) => p.collectionSlug === filters.collection);
  }

  if (filters.drop) {
    results = results.filter((p) => p.dropId === filters.drop);
  }

  if (filters.size) {
    results = results.filter((p) =>
      p.sizes.some((s) => s.size === filters.size && s.isAvailable && s.stock > 0)
    );
  }

  if (filters.color) {
    results = results.filter((p) =>
      p.colors.some((c) => c.slug === filters.color)
    );
  }

  if (filters.minPrice !== undefined) {
    results = results.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    results = results.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters.search) {
    const q = filters.search.toLowerCase().trim();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (filters.sort) {
    switch (filters.sort) {
      case "price-asc":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        results.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "rating":
        results.sort((a, b) => b.rating.average - a.rating.average);
        break;
      case "featured":
      default:
        results.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }
  }

  return results;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await simulateDelay();
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
  return product || null;
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  await simulateDelay();
  return MOCK_PRODUCTS.filter((p) => p.isFeatured).slice(0, limit);
}

export async function getRelatedProducts(currentProductId: string, limit = 4): Promise<Product[]> {
  await simulateDelay();
  const current = MOCK_PRODUCTS.find((p) => p.id === currentProductId);
  if (!current) return MOCK_PRODUCTS.slice(0, limit);

  return MOCK_PRODUCTS
    .filter((p) => p.id !== currentProductId && (p.category === current.category || p.collectionSlug === current.collectionSlug))
    .slice(0, limit);
}
