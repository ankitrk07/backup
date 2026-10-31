import React from "react";
import { getCurrentDrop, getProductBySlug, getProducts, getAllReviews } from "@/lib/data";
import { HeroSection } from "@/components/home/HeroSection";
import { MarqueeTicker } from "@/components/home/MarqueeTicker";
import { DropCountdown } from "@/components/home/DropCountdown";
import { FlagshipDropSpotlight } from "@/components/home/FlagshipDropSpotlight";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { TrendingProducts } from "@/components/home/TrendingProducts";
import { BrandStory } from "@/components/home/BrandStory";
import { YouTubeSection } from "@/components/home/YouTubeSection";
import { Testimonials } from "@/components/home/Testimonials";
import { EmailCapture } from "@/components/home/EmailCapture";
import { TrustStrip } from "@/components/home/TrustStrip";

export const revalidate = 60; // Incremental Static Regeneration every minute

export default async function HomePage() {
  const currentDrop = await getCurrentDrop();
  const flagshipProduct = (await getProductBySlug("sisters-revenge-oversized-tee"))!;
  const allProducts = await getProducts();
  const allReviews = await getAllReviews();

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Spotlight */}
      <HeroSection />

      {/* 2. Marquee Ticker */}
      <MarqueeTicker />

      {/* 3. Live Drop Countdown & Real Stock Tracker */}
      <section className="py-12 bg-void border-b border-white/10 px-4">
        <DropCountdown drop={currentDrop} />
      </section>

      {/* 4. Flagship Drop Spotlight (Drop 04 Sisters Revenge) */}
      <FlagshipDropSpotlight drop={currentDrop} flagshipProduct={flagshipProduct} />

      {/* 5. Category Grid */}
      <CategoryGrid />

      {/* 6. Trending Merch Catalog */}
      <TrendingProducts products={allProducts} />

      {/* 7. Brand Philosophy & Fabric Specs */}
      <BrandStory />

      {/* 8. YouTube Creator Studio Vlog (Click-to-Load Facade) */}
      <YouTubeSection />

      {/* 9. Verified Customer Reviews */}
      <Testimonials reviews={allReviews} />

      {/* 10. Drop 05 Whitelist Email Form */}
      <EmailCapture />

      {/* 11. Customer Guarantees Trust Strip */}
      <TrustStrip />
    </div>
  );
}
