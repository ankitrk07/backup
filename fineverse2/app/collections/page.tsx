import { Metadata } from "next";
import Link from "next/link";
import { getCollections } from "@/lib/data";
import { FineverseImage } from "@/components/ui/FineverseImage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArrowUpRight, Flame } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Collections & Limited Drops",
  description:
    "Discover FINEVERSE numbered streetwear capsules and silhouette lines. From Drop 04 Sisters Revenge to the core 240 GSM and 420 GSM collections.",
  openGraph: {
    title: `Collections | ${siteConfig.name}`,
    description: "Numbered creator drop capsules and foundational streetwear archives.",
  },
};

export const revalidate = 60;

export default async function CollectionsPage() {
  const collections = await getCollections();

  const breadcrumbs = [
    { label: "SHOP", href: "/shop" },
    { label: "COLLECTIONS" },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-8">
        <Breadcrumbs items={breadcrumbs} className="mb-4" />
        <div className="border-b border-white/10 pb-6">
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
            COLLECTIONS & DROPS
          </h1>
          <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-1">
            Numbered creator capsules, limited archival drops, and foundational heavyweight blanks.
          </p>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {collections.map((col) => (
          <Link
            key={col.id}
            href={`/collections/${col.slug}`}
            className="group surface-card surface-card-hover overflow-hidden relative block"
          >
            {/* Visual Aspect Ratio Container */}
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/10" }}>
              <FineverseImage
                slotKey={col.imageSlotKey}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/40 to-transparent" />

              {/* Live Badge for Drop Collections */}
              {col.dropNumber && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="live" size="sm">
                    <Flame className="w-3.5 h-3.5 mr-1 text-acid" />
                    LIVE DROP {col.dropNumber}
                  </Badge>
                </div>
              )}
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-3 bg-space-950/80">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase group-hover:text-acid transition-colors">
                  {col.title}
                </h2>
                <div className="w-9 h-9 rounded-full bg-space-900 border border-white/15 flex items-center justify-center text-zinc-400 group-hover:text-acid group-hover:border-acid transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <p className="text-xs sm:text-sm font-mono text-acid font-bold">
                {col.tagline}
              </p>

              <p className="text-xs text-zinc-300 font-sans leading-relaxed line-clamp-2">
                {col.description}
              </p>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>{col.productCount} SPECIMENS ALLOCATED</span>
                <span className="text-zinc-300 group-hover:text-acid transition-colors">
                  EXPLORE ARCHIVE →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
