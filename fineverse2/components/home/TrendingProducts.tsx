"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";

interface TrendingProductsProps {
  products: Product[];
}

export const TrendingProducts: React.FC<TrendingProductsProps> = ({ products }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "ALL MERCH" },
    { id: "oversized-tees", label: "240 GSM TEES" },
    { id: "hoodies", label: "420 GSM HOODIES" },
    { id: "accessories", label: "ACCESSORIES" },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section aria-label="Trending Garments" className="py-20 border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header with Category Filter Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-acid uppercase block mb-1">
              DROP 04 ARCHIVE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
              TRENDING MERCH
            </h2>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-wider font-bold transition-all whitespace-nowrap min-h-[44px] border ${
                    isActive
                      ? "bg-acid text-void border-acid shadow-[0_0_15px_rgba(204,255,0,0.3)]"
                      : "bg-space-900 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-display uppercase tracking-widest text-sm text-acid hover:text-white transition-colors"
          >
            <span>VIEW ALL AVAILABLE STYLES</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
