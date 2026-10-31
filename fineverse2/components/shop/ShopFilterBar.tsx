"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, SlidersHorizontal, X, RotateCcw } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { ProductCategory, GarmentSize } from "@/types/product";

export const ShopFilterBar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Active query parameters
  const currentCategory = searchParams.get("category") || "";
  const currentSize = searchParams.get("size") || "";
  const currentSort = searchParams.get("sort") || "featured";
  const currentPriceRange = searchParams.get("price") || "";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all" && value !== "") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/shop?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push("/shop");
    setIsMobileFilterOpen(false);
  };

  const categories: { label: string; value: ProductCategory | "" }[] = [
    { label: "ALL GARMENTS", value: "" },
    { label: "OVERSIZED TEES (240 GSM)", value: "oversized-tees" },
    { label: "HOODIES (420 GSM)", value: "hoodies" },
    { label: "ACCESSORIES", value: "accessories" },
    { label: "HEADWEAR", value: "headwear" },
  ];

  const sizes: GarmentSize[] = ["XS", "S", "M", "L", "XL", "2XL"];

  const sortOptions = [
    { label: "FEATURED FIRST", value: "featured" },
    { label: "PRICE: LOW TO HIGH", value: "price-asc" },
    { label: "PRICE: HIGH TO LOW", value: "price-desc" },
    { label: "NEWEST ARRIVALS", value: "newest" },
    { label: "HIGHEST RATED", value: "rating" },
  ];

  const priceRanges = [
    { label: "ALL PRICES", value: "" },
    { label: "UNDER ₹1,000", value: "0-1000" },
    { label: "₹1,000 – ₹2,000", value: "1000-2000" },
    { label: "OVER ₹2,000", value: "2000-99999" },
  ];

  const hasActiveFilters = Boolean(currentCategory || currentSize || currentPriceRange);

  const filterContent = (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="space-y-2.5">
        <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 block font-bold">
          CATEGORY
        </span>
        <div className="flex flex-col space-y-1">
          {categories.map((cat) => {
            const isSelected = currentCategory === cat.value;

            return (
              <button
                key={cat.label}
                onClick={() => updateParam("category", cat.value)}
                className={`py-2 px-3 text-left font-display uppercase tracking-wider text-xs transition-colors flex items-center justify-between min-h-[44px] ${
                  isSelected
                    ? "bg-acid/10 border-l-2 border-acid text-acid font-bold"
                    : "text-zinc-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{cat.label}</span>
                {isSelected && <span className="text-acid font-mono">✦</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Size Filter */}
      <div className="space-y-2.5 pt-4 border-t border-white/10">
        <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 block font-bold">
          SIZE
        </span>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((s) => {
            const isSelected = currentSize === s;

            return (
              <button
                key={s}
                onClick={() => updateParam("size", isSelected ? "" : s)}
                className={`h-11 min-h-[44px] border font-mono text-xs font-bold transition-all uppercase ${
                  isSelected
                    ? "border-acid bg-acid text-void font-black shadow-acid"
                    : "border-white/10 bg-space-900 text-zinc-300 hover:border-white/30"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2.5 pt-4 border-t border-white/10">
        <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 block font-bold">
          PRICE TIER
        </span>
        <div className="flex flex-col space-y-1">
          {priceRanges.map((p) => {
            const isSelected = currentPriceRange === p.value;

            return (
              <button
                key={p.label}
                onClick={() => updateParam("price", p.value)}
                className={`py-2 px-3 text-left font-mono text-xs transition-colors flex items-center justify-between min-h-[44px] ${
                  isSelected
                    ? "bg-acid/10 border-l-2 border-acid text-acid font-bold"
                    : "text-zinc-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{p.label}</span>
                {isSelected && <span className="text-acid font-mono">✦</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Clear All CTA */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-white/10">
          <Button
            variant="outline"
            size="md"
            onClick={clearAllFilters}
            className="w-full text-xs flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET ALL FILTERS</span>
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Top Mobile Bar & Sort Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 mb-6 border-b border-white/10">
        {/* Mobile Filter Drawer Trigger */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 px-4 py-2 bg-space-900 border border-white/15 text-xs font-mono font-bold uppercase tracking-wider text-zinc-200 hover:text-acid min-h-[44px]"
        >
          <Filter className="w-4 h-4 text-acid" />
          <span>FILTERS {hasActiveFilters ? "(ACTIVE)" : ""}</span>
        </button>

        {/* Desktop Active Filter Count */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-zinc-400">
          <SlidersHorizontal className="w-4 h-4 text-acid" />
          <span>REFINE CATALOG</span>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline font-mono text-xs text-zinc-400 uppercase">
            SORT BY:
          </span>
          <select
            value={currentSort}
            onChange={(e) => updateParam("sort", e.target.value)}
            aria-label="Sort products"
            className="h-11 min-h-[44px] bg-space-900 border border-white/15 px-3 text-xs font-mono font-bold text-zinc-200 uppercase focus:border-acid focus:outline-none cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-space-950 text-white">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
            ACTIVE FILTERS:
          </span>
          {currentCategory && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-acid/10 border border-acid/40 text-acid font-mono text-xs">
              <span>{currentCategory.toUpperCase().replace("-", " ")}</span>
              <button
                onClick={() => updateParam("category", "")}
                aria-label="Remove category filter"
                className="hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
          {currentSize && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-acid/10 border border-acid/40 text-acid font-mono text-xs">
              <span>SIZE: {currentSize}</span>
              <button
                onClick={() => updateParam("size", "")}
                aria-label="Remove size filter"
                className="hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
          {currentPriceRange && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-acid/10 border border-acid/40 text-acid font-mono text-xs">
              <span>PRICE: {currentPriceRange}</span>
              <button
                onClick={() => updateParam("price", "")}
                aria-label="Remove price filter"
                className="hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
          <button
            onClick={clearAllFilters}
            className="text-[11px] font-mono text-zinc-400 hover:text-white underline ml-2"
          >
            CLEAR ALL
          </button>
        </div>
      )}

      {/* Desktop Sidebar (Rendered inside ShopCatalogView layout) */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-28 bg-space-950 border border-white/10 p-5 surface-card">
          {filterContent}
        </div>
      </div>

      {/* Mobile Slide-over Drawer */}
      <Drawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        title="FILTER & REFINE"
        side="left"
      >
        <div className="py-2">{filterContent}</div>
      </Drawer>
    </>
  );
};
