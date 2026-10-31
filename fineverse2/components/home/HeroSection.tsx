import React from "react";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FineverseImage } from "@/components/ui/FineverseImage";

export const HeroSection: React.FC = () => {
  return (
    <section
      aria-label="Hero Spotlight"
      className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-white/10"
    >
      {/* Background Graphic Artwork */}
      <div className="absolute inset-0 z-0">
        <FineverseImage
          slotKey="hero-banner-main"
          priority={true}
          className="w-full h-full object-cover opacity-60 filter brightness-90"
        />
        {/* Gradient fades for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/90 via-transparent to-void/90" />
      </div>

      {/* Content Container */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 py-20 text-center flex flex-col items-center">
        {/* Drop 04 Live Pill */}
        <div className="mb-6 flex items-center gap-2">
          <Badge variant="live" size="md">
            <Flame className="w-3.5 h-3.5 mr-1 text-acid" />
            DROP 04 IS LIVE // SISTERS REVENGE
          </Badge>
          <span className="hidden sm:inline-block font-mono text-xs text-zinc-400">
            LIMITED TO 500 NUMBERED PIECES
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase max-w-5xl leading-[0.95]">
          WEAR THE <span className="text-acid text-glow-acid">UNIVERSE</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-sm sm:text-base md:text-lg font-sans text-zinc-300 max-w-2xl leading-relaxed">
          Limited-run cosmic anime streetwear engineered from custom 240 GSM compact combed cotton and 420 GSM loopback French terry. Numbered collector capsules made in India.
        </p>

        {/* Spec Chips */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-zinc-400">
          <span className="px-3 py-1 bg-space-900/80 border border-white/10">
            240 GSM BOXY TEES
          </span>
          <span className="px-3 py-1 bg-space-900/80 border border-white/10">
            420 GSM FRENCH TERRY
          </span>
          <span className="px-3 py-1 bg-space-900/80 border border-white/10">
            ZERO SHRINKAGE BIO-SILICON
          </span>
        </div>

        {/* Call to Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Button
            variant="acid"
            size="lg"
            className="w-full sm:w-auto shadow-acid min-w-[200px]"
          >
            <Link href="/collections/drop-04-sisters-revenge" className="flex items-center justify-center gap-2">
              <span>EXPLORE DROP 04</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto min-w-[180px]"
          >
            <Link href="/shop">SHOP ALL PIECES</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
