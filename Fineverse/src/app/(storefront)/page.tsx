import type { Metadata } from "next"
import { Hero } from "@/components/home/hero"
import { CategoryGrid } from "@/components/home/category-grid"
import { ProductCarousel } from "@/components/home/product-carousel"
import { RecentlyViewedSection } from "@/components/home/recently-viewed-section"
import { Testimonials } from "@/components/home/testimonials"
import { QualityStrip } from "@/components/home/quality-strip"
import { NewsletterBand } from "@/components/home/newsletter-band"
import {
  getFeaturedProducts,
  getBestsellers,
  getNewArrivals,
  getTrendingProducts,
  getDeals,
  getRecommendedProducts,
} from "@/lib/services/product-service"

// Revalidate periodically so pricing/stock/badges stay reasonably fresh
// without making the homepage fully dynamic.
export const revalidate = 60

export const metadata: Metadata = {
  title: "Fineverse — Electronics, Fashion & Toys",
  description:
    "Shop premium electronics, fashion, and toys at Fineverse. Curated quality, fast delivery, and unbeatable prices.",
}

export default async function HomePage() {
  // Sequential rather than Promise.all: the local dev database (PGlite,
  // see scripts/pglite-server.mjs) only reliably serves one query at a
  // time. Real Postgres in staging/production handles concurrent queries
  // fine, but there's no upside to parallelizing homepage section fetches
  // enough to warrant two code paths.
  const featured = await getFeaturedProducts()
  const bestsellers = await getBestsellers()
  const newArrivals = await getNewArrivals()
  const trending = await getTrendingProducts()
  const deals = await getDeals()
  const recommended = await getRecommendedProducts()

  return (
    <>
      <Hero />
      <CategoryGrid />
      <ProductCarousel title="Featured Products" description="Hand-picked favorites, just for you" href="/products?featured=true" products={featured} variant="stacked" />
      <ProductCarousel title="Best Sellers" description="What everyone's buying right now" href="/products?sort=popular" products={bestsellers} showRank />
      <ProductCarousel title="New Arrivals" description="Fresh off the shelf" href="/products?sort=newest" products={newArrivals} />
      <ProductCarousel title="Trending Now" description="Popular across Fineverse this week" href="/products?sort=popular" products={trending} variant="stacked" />
      <ProductCarousel title="Deals & Discounts" description="Limited-time savings you don't want to miss" href="/products?discount=true" products={deals} />
      <ProductCarousel title="Recommended for You" description="Top-rated picks across the store" href="/products?sort=rating" products={recommended} />
      <RecentlyViewedSection />
      <Testimonials />
      <QualityStrip />
      <NewsletterBand />
    </>
  )
}
