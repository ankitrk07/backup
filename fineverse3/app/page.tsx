import { BrandStory } from "@/components/home/brand-story";
import { CategoryGrid } from "@/components/home/category-grid";
import { DropCountdown } from "@/components/home/drop-countdown";
import { DropSpotlight } from "@/components/home/drop-spotlight";
import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { Testimonials } from "@/components/home/testimonials";
import { TrendingProducts } from "@/components/home/trending-products";
import { TrustStrip } from "@/components/home/trust-strip";
import { YouTubeSection } from "@/components/home/youtube-section";
import { getSocialUrl, siteConfig } from "@/config/site";
import {
  getCategories,
  getCurrentDrop,
  getProducts,
  getTestimonials,
  getTrendingProducts,
  getUpcomingDrop,
  getVideos,
} from "@/lib/data";
import { getDropStatus } from "@/lib/drop-state";
import { buildMetadata } from "@/lib/seo";

// Re-generated at most once a minute so the server-rendered drop state stays fresh.
// The browser then keeps counting from real timestamps.
export const revalidate = 60;

export const metadata = buildMetadata({ path: "/" });

export default async function HomePage() {
  const serverNow = Date.now();

  const [current, upcoming, categories, trending, testimonials, videos] = await Promise.all([
    getCurrentDrop(serverNow),
    getUpcomingDrop(serverNow),
    getCategories(),
    getTrendingProducts(4),
    getTestimonials(),
    getVideos(),
  ]);

  const dropProducts = current ? await getProducts({ drop: current.id }) : [];

  // The countdown focuses on the live drop; otherwise on the next one that is coming.
  const countdownDrop =
    current && getDropStatus(current, serverNow) === "live" ? current : (upcoming ?? current);

  return (
    <>
      <Hero drop={current} serverNow={serverNow} />
      <Marquee items={siteConfig.marquee} />
      {current ? <DropSpotlight drop={current} products={dropProducts} serverNow={serverNow} /> : null}
      <CategoryGrid categories={categories} />
      <TrendingProducts products={trending} />
      <BrandStory />
      {countdownDrop ? (
        <DropCountdown drop={countdownDrop} next={upcoming} serverNow={serverNow} />
      ) : null}
      <YouTubeSection videos={videos} channelUrl={getSocialUrl("youtube")} />
      <Testimonials testimonials={testimonials} />
      <NewsletterSection />
      <TrustStrip />
    </>
  );
}