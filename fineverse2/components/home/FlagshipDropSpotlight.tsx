import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Drop } from "@/types/drop";
import { Product } from "@/types/product";
import { FineverseImage } from "@/components/ui/FineverseImage";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/formatters";

interface FlagshipDropSpotlightProps {
  drop: Drop;
  flagshipProduct: Product;
}

export const FlagshipDropSpotlight: React.FC<FlagshipDropSpotlightProps> = ({
  drop,
  flagshipProduct,
}) => {
  return (
    <section aria-label="Drop 04 Flagship Piece" className="py-20 border-b border-white/10 relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="live" size="sm">
                FLAGSHIP PIECE
              </Badge>
              <span className="text-xs font-mono text-zinc-400">
                DROP 04 ARCHIVE
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
              {drop.name}
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-md">
            {drop.tagline} • Individually numbered woven hem label with collector card.
          </p>
        </div>

        {/* 2-Column Spotlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-space-950 border border-white/10 p-6 sm:p-10 surface-card">
          {/* Left Column: Visual Artwork Carousel / Split Front & Back */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <div className="relative bg-space-900 border border-white/10 overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <FineverseImage slotKey="sisters-revenge-black-front" />
              <span className="absolute bottom-2 left-2 text-[10px] font-mono text-zinc-400 bg-void/80 px-2 py-0.5 border border-white/10">
                FRONT CHEST
              </span>
            </div>
            <div className="relative bg-space-900 border border-white/10 overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <FineverseImage slotKey="sisters-revenge-black-back" />
              <span className="absolute bottom-2 left-2 text-[10px] font-mono text-acid bg-void/80 px-2 py-0.5 border border-acid/30">
                COSMIC BACK ARTWORK
              </span>
            </div>
          </div>

          {/* Right Column: Spec Sheet & Direct Action */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-acid">LIMITED TO 500 PCS</span>
                <span className="text-zinc-600">•</span>
                <span className="font-mono text-xs text-zinc-400">240 GSM COMBED</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
                {flagshipProduct.name}
              </h3>
              <div className="flex items-center gap-3 pt-1">
                <span className="font-mono font-bold text-2xl text-acid">
                  {formatPrice(flagshipProduct.price)}
                </span>
                {flagshipProduct.compareAtPrice && (
                  <span className="font-mono text-sm text-zinc-500 line-through">
                    {formatPrice(flagshipProduct.compareAtPrice)}
                  </span>
                )}
                <Badge variant="discount" size="sm">
                  SAVE 20%
                </Badge>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
              {flagshipProduct.description}
            </p>

            {/* Spec Highlights Checklist */}
            <div className="space-y-2 pt-2 border-t border-white/10 text-xs font-mono text-zinc-300">
              {flagshipProduct.details.slice(0, 4).map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-acid flex-shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button variant="acid" size="lg" className="w-full">
                <Link
                  href={`/shop/${flagshipProduct.slug}`}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <span>VIEW PRODUCT DETAILS & SIZES</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
