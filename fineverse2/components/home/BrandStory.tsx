import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Cpu } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

export const BrandStory: React.FC = () => {
  return (
    <section aria-label="Brand Philosophy" className="py-24 border-b border-white/10 relative overflow-hidden bg-space-950">
      {/* Background Starlight Ambience */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-cosmic-purple/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-acid/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Brand Manifesto */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-acid inline-block" />
              <span className="font-mono text-xs text-acid tracking-widest uppercase">
                THE FINEVERSE MANIFESTO
              </span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-none">
              ENGINEERED FOR THE <span className="text-acid text-glow-acid">NOCTURNAL</span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
              FINEVERSE was born out of frustration with generic influencer merch in India. Most creator merchandise relies on cheap, lightweight promotional blanks with plastic heat-transfers that peel off after two washes.
            </p>

            <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
              We took the opposite approach: building our custom garment specs from the yarn up in Tirupur. Every piece is cut in an authentic Japanese anime streetwear boxy silhouette, pairing dense fabric structures with eco-friendly breathable discharge printing.
            </p>

            {/* Engineering Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-space-900 border border-white/10 space-y-2">
                <Cpu className="w-5 h-5 text-acid" />
                <h3 className="font-display font-bold uppercase text-sm text-white">
                  240 GSM TEES
                </h3>
                <p className="text-xs font-mono text-zinc-400">
                  100% Super Combed Compact Cotton Single Jersey. Zero sag collar.
                </p>
              </div>

              <div className="p-4 bg-space-900 border border-white/10 space-y-2">
                <Shield className="w-5 h-5 text-purple-400" />
                <h3 className="font-display font-bold uppercase text-sm text-white">
                  420 GSM HOODIES
                </h3>
                <p className="text-xs font-mono text-zinc-400">
                  Heavyweight French Terry loopback interior with structured crossover hoods.
                </p>
              </div>

              <div className="p-4 bg-space-900 border border-white/10 space-y-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="font-display font-bold uppercase text-sm text-white">
                  NUMBERED DROPS
                </h3>
                <p className="text-xs font-mono text-zinc-400">
                  Numbered capsules with collector verification cards. No restocks once gone.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Button variant="outline" size="md">
                <Link href="/about" className="flex items-center gap-2">
                  <span>READ OUR FULL CREATOR STORY</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Visual Spec Card */}
          <div className="lg:col-span-5">
            <div className="surface-card p-6 sm:p-8 border border-white/15 space-y-6 relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                  FABRIC SPECIFICATION PROTOCOL
                </span>
                <span className="font-mono text-xs text-acid font-bold">100% PREPAID & COD</span>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-zinc-400">TEE FABRIC WEIGHT</span>
                  <strong className="text-white">240 GSM (Pure Combed Compact)</strong>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-zinc-400">HOODIE FABRIC WEIGHT</span>
                  <strong className="text-white">420 GSM (Loopback French Terry)</strong>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-zinc-400">PRINT TECHNOLOGY</span>
                  <strong className="text-white">Discharge Ink + Puff Screenprint</strong>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-zinc-400">FABRIC TREATMENT</span>
                  <strong className="text-white">Bio-Silicon Wash (Zero Shrinkage)</strong>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-zinc-400">FREE SHIPPING</span>
                  <strong className="text-acid">Orders over ₹{siteConfig.shipping.freeShippingThreshold}</strong>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-zinc-400">DISPATCH TIMELINE</span>
                  <strong className="text-white">{siteConfig.shipping.metroEstimatedDays}</strong>
                </div>
              </div>

              <div className="p-3 bg-acid/10 border border-acid/30 text-acid font-mono text-[11px] leading-relaxed">
                "We don't manufacture merchandise. We craft tangible artifacts from our stories."
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
