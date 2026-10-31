import type { MetadataRoute } from "next"
import { db } from "@/lib/db"
import { siteConfig } from "@/lib/constants"

// Generated per-request rather than frozen at build time, so newly added
// products show up in the sitemap without a full rebuild.
export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await db.product.findMany({
    where: { isActive: true },
    select: { slug: true, updatedAt: true },
  })

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, changeFrequency: "daily", priority: 1 },
    { url: `${siteConfig.url}/products`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.url}/electronics`, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteConfig.url}/fashion`, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteConfig.url}/toys`, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteConfig.url}/search`, changeFrequency: "weekly", priority: 0.4 },
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/faq`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/login`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${siteConfig.url}/register`, changeFrequency: "yearly", priority: 0.1 },
  ]

  // Subcategories are addressed via a query param (/electronics?sub=...),
  // not a distinct path, so they're intentionally not listed separately —
  // only the 3 top-level category pages above are canonical crawl targets.
  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${siteConfig.url}/product/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...productRoutes]
}
