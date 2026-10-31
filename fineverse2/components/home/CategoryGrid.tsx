import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FineverseImage } from "@/components/ui/FineverseImage";

export const CategoryGrid: React.FC = () => {
  const categories = [
    {
      title: "OVERSIZED TEES",
      specs: "240 GSM • Compact Combed Cotton",
      href: "/shop?category=oversized-tees",
      slotKey: "category-tees",
    },
    {
      title: "HEAVYWEIGHT HOODIES",
      specs: "420 GSM • Thermal Loopback French Terry",
      href: "/shop?category=hoodies",
      slotKey: "category-hoodies",
    },
    {
      title: "DROP 04 VAULT",
      specs: "Numbered Pieces • Sisters Revenge Capsule",
      href: "/collections/drop-04-sisters-revenge",
      slotKey: "category-drop04",
    },
    {
      title: "TACTICAL & HEADWEAR",
      specs: "Flight Tags • Distressed Dad Caps",
      href: "/shop?category=accessories",
      slotKey: "category-accessories",
    },
  ];

  return (
    <section aria-label="Product Categories" className="py-20 border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono tracking-widest text-acid uppercase block mb-1">
              CURATED SILHOUETTES
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
              SHOP BY CATEGORY
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-acid flex items-center gap-1.5 transition-colors"
          >
            <span>VIEW FULL CATALOG</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.href}
              className="group surface-card surface-card-hover overflow-hidden relative block"
            >
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/5" }}>
                <FineverseImage
                  slotKey={cat.slotKey}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/20 to-transparent" />
              </div>

              {/* Title Overlay */}
              <div className="p-5 absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between">
                <div>
                  <h3 className="font-display font-black text-lg sm:text-xl text-white uppercase group-hover:text-acid transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] font-mono text-zinc-400 mt-1">
                    {cat.specs}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-space-900 border border-white/15 flex items-center justify-center text-zinc-400 group-hover:text-acid group-hover:border-acid transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
