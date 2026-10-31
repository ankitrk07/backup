import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { getCollections, getProducts } from "@/lib/data";
import { CATEGORY_IDS } from "@/types/product";

type Frequency = "daily" | "weekly" | "monthly" | "yearly";

interface StaticRoute {
  path: string;
  changeFrequency: Frequency;
  priority: number;
}

/** Only indexable pages. Cart, checkout, account, wishlist and order pages are left out on purpose. */
const STATIC_ROUTES: StaticRoute[] = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/shop", changeFrequency: "daily", priority: 0.9 },
  { path: "/collections", changeFrequency: "weekly", priority: 0.8 },
  { path: "/about", changeFrequency: "yearly", priority: 0.5 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.5 },
  { path: "/track-order", changeFrequency: "yearly", priority: 0.3 },
  { path: "/policies/shipping", changeFrequency: "yearly", priority: 0.3 },
  { path: "/policies/returns", changeFrequency: "yearly", priority: 0.3 },
  { path: "/policies/privacy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/policies/terms", changeFrequency: "yearly", priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, collections] = await Promise.all([getProducts(), getCollections()]);
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const categoryEntries: MetadataRoute.Sitemap = CATEGORY_IDS.map((id) => ({
    url: absoluteUrl(`/shop?category=${id}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const collectionEntries: MetadataRoute.Sitemap = collections.map((collection) => ({
    url: absoluteUrl(`/collections/${collection.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/shop/${product.slug}`),
    lastModified: new Date(product.createdAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...categoryEntries, ...collectionEntries, ...productEntries];
}