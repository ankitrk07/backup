import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ShieldCheck, Flame, Compass, Scissors, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'About The Movement | FINEVERSE Streetwear',
  description:
    'The story of FINEVERSE — born from YouTube creator culture, engineered with Tirupur heavyweight textiles, and dedicated to the anime streetwear underground.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-black text-white pt-28 pb-24">
      {/* Hero Header */}
      <div className="relative border-b border-brand-charcoal/80 overflow-hidden pb-20">
        <div className="absolute inset-0 bg-radial-gradient from-brand-crimson/10 via-transparent to-transparent opacity-40 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-crimson/10 border border-brand-crimson/30 text-brand-crimson text-xs font-mono uppercase tracking-widest mb-6">
            <Flame className="w-3.5 h-3.5" />
            <span>The Fineverse Manifesto</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading uppercase tracking-tight leading-[0.95]">
            Wear The <span className="text-brand-crimson">Universe.</span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-brand-silver font-sans max-w-3xl mx-auto leading-relaxed">
            We stopped waiting for international streetwear houses to understand Indian anime collectors. 
            FINEVERSE was born to fuse high-density South Indian textile engineering with cinematic storytelling.
          </p>
        </div>
      </div>

      {/* Main Narrative Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Origin Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-brand-crimson font-bold block mb-2">
              01 // The Origin
            </span>
            <h2 className="text-3xl font-black font-heading uppercase tracking-tight text-white mb-6">
              Creator Culture Meets Textile Rebellion
            </h2>
            <div className="space-y-4 text-sm text-brand-silver leading-relaxed font-sans">
              <p>
                For years, creator merchandise in India meant flimsy, 160 GSM single-wash promotional tees with rubbery stickers that cracked after two machine cycles.
              </p>
              <p>
                Our community demanded more. They wanted heavyweight silhouettes that drape with architectural weight, high-tension ribs that never bacon, and screen prints that sink into the cotton fibers rather than sitting like plastic armor.
              </p>
              <p className="text-white font-medium">
                In 2024, after spending six months on the factory floors of Tirupur, Tamil Nadu — the textile capital of India — FINEVERSE launched with a singular rule: <span className="text-brand-crimson underline decoration-brand-crimson/40 underline-offset-4">Zero compromises on yarn or ink.</span>
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl bg-brand-dark/80 border border-brand-charcoal p-8 space-y-6">
            <div className="text-4xl font-black font-heading text-brand-crimson">
              240 & 420
            </div>
            <h3 className="text-lg font-heading font-bold text-white uppercase">
              The Exact Fabric Standard
            </h3>
            <p className="text-xs text-brand-silver leading-relaxed font-mono">
              Every tee we cut is 240 GSM 100% Super Combed Compact Cotton (Single Jersey) with bio-wash and silicone wash finishes. Every hoodie is 420 GSM 100% Cotton French Terry loopback. No polyester blends. No generic blank garments.
            </p>
            <div className="pt-4 border-t border-brand-charcoal flex items-center justify-between text-xs font-mono text-brand-silver">
              <span>Textile Origin</span>
              <strong className="text-white">Tirupur, Tamil Nadu</strong>
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-brand-silver">
              <span>Dye Standard</span>
              <strong className="text-white">OEKO-TEX® Certified Reactive Low-Impact</strong>
            </div>
          </div>
        </div>

        {/* The Pillar Values */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-crimson font-bold block mb-2">
              02 // Core Philosophy
            </span>
            <h2 className="text-3xl font-black font-heading uppercase tracking-tight text-white">
              Why We Refuse Mass Production
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-brand-dark/50 border border-brand-charcoal/80 space-y-3">
              <Scissors className="w-6 h-6 text-brand-crimson" />
              <h3 className="font-heading font-bold uppercase text-white text-base">
                Numbered Limited Drops
              </h3>
              <p className="text-xs text-brand-silver leading-relaxed">
                We produce in capped batches. Once Drop 04 "Sisters Revenge" allocates its 500 units, the screens are washed and vaulted. No endless re-runs diluting your collection.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-brand-dark/50 border border-brand-charcoal/80 space-y-3">
              <Award className="w-6 h-6 text-brand-crimson" />
              <h3 className="font-heading font-bold uppercase text-white text-base">
                NFC Authentication
              </h3>
              <p className="text-xs text-brand-silver leading-relaxed">
                Counterfeits are rampant in streetwear. Every limited Fineverse garment ships with an embedded or sewn micro-NFC tag verifying individual release sequence and authenticity.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-brand-dark/50 border border-brand-charcoal/80 space-y-3">
              <Compass className="w-6 h-6 text-brand-crimson" />
              <h3 className="font-heading font-bold uppercase text-white text-base">
                Custom Tailored Drapes
              </h3>
              <p className="text-xs text-brand-silver leading-relaxed">
                Our oversized silhouettes are custom graded for South Asian frames. Boxy chest proportions, dropped shoulders, and precise length calibration prevent dress-like silhouettes.
              </p>
            </div>
          </div>
        </div>

        {/* Creator Note & Commitment */}
        <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-brand-dark via-brand-black to-brand-dark border border-brand-charcoal/90 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-crimson font-bold">
              A Personal Note to the Community
            </span>
            <blockquote className="text-lg md:text-xl font-heading font-bold text-white uppercase tracking-tight leading-snug">
              "We didn't launch Fineverse to make cheap giveaway tees. We built it because we were tired of feeling like Indian creators treated apparel as an afterthought. This is wearable world-building."
            </blockquote>
            <p className="text-xs font-mono text-brand-silver">
              — Fineverse Creative Direction & Production Collective
            </p>

            <div className="pt-6">
              <Button href="/shop" variant="primary" size="lg" className="gap-2">
                Explore Drop 04
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
