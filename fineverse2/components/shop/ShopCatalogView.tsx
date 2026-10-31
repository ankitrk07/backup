"use client";

import React, { Suspense } from "react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";
import { ShopFilterBar } from "./ShopFilterBar";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { RotateCcw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface ShopCatalogViewProps {
  products: Product[];
  totalCount: number;
}

export const ShopCatalogView: React.FC<ShopCatalogViewProps> = ({
  products,
  totalCount,
}) => {
  const breadcrumbs = [
    { label: "SHOP", href: "/shop" },
    { label: "ALL MERCH" },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Top Header */}
      <div className="mb-8">
        <Breadcrumbs items={breadcrumbs} className="mb-4" />
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
              ALL STREETWEAR
            </h1>
            <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-1">
              Custom 240 GSM Combed Cotton • 420 GSM Thermal Loopback • Limited Drops
            </p>
          </div>
          <span className="font-mono text-xs text-acid font-bold">
            SHOWING {products.length} OF {totalCount} SPECIMENS
          </span>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <Suspense fallback={<div className="h-20 bg-space-900 animate-pulse" />}>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filter Sidebar & Mobile Drawer Trigger */}
          <ShopFilterBar />

          {/* Product Grid Area */}
          <div className="flex-1">
            {products.length === 0 ? (
              /* Empty Catalog State */
              <div className="surface-card p-12 text-center border border-white/10 space-y-4 max-w-md mx-auto my-12">
                <div className="w-12 h-12 mx-auto bg-space-900 border border-white/15 flex items-center justify-center text-acid font-mono">
                  00
                </div>
                <h3 className="font-display font-bold uppercase text-lg text-white">
                  NO PRODUCTS MATCH YOUR FILTERS
                </h3>
                <p className="text-xs font-mono text-zinc-400">
                  Try adjusting your size or price range, or explore our complete catalog.
                </p>
                <Button variant="acid" size="md">
                  <Link href="/shop" className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    <span>RESET ALL FILTERS</span>
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Suspense>
    </div>
  );
};
