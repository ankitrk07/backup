'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useCartStore } from '@/store/useCartStore';
import { mockProducts } from '@/lib/data/mock-db';
import { formatINR } from '@/lib/formatters';
import { FineverseImage } from '@/components/ui/FineverseImage';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Size } from '@/types/product';

export default function WishlistPage() {
  const { items: wishlistIds, removeItem, clearWishlist } = useWishlistStore();
  const { addItem, openCart } = useCartStore();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, Size>>({});

  // Resolve product objects from wishlist IDs
  const wishlistedProducts = wishlistIds
    .map((id) => mockProducts.find((p) => p.id === id))
    .filter((p): p is (typeof mockProducts)[0] => Boolean(p));

  const handleSizeSelect = (productId: string, size: Size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleMoveToCart = (product: (typeof mockProducts)[0]) => {
    // Default to 'L' or first available size if none selected
    const chosenSize: Size = selectedSizes[product.id] || (product.sizes[2] || product.sizes[0] || 'L');
    
    addItem(product, chosenSize, 1);
    removeItem(product.id);
    openCart();
  };

  return (
    <div className="min-h-screen bg-brand-black text-white pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-charcoal/80 pb-6 mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-silver mb-2">
              <Link href="/" className="hover:text-brand-crimson transition-colors">Home</Link>
              <span>/</span>
              <span className="text-brand-crimson font-semibold">Wishlist</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black font-heading tracking-tight uppercase">
              Vaulted <span className="text-brand-crimson">Pieces</span>
            </h1>
            <p className="text-brand-silver text-sm mt-2">
              Items saved to your private reserve. Allocation is not guaranteed until checkout completion.
            </p>
          </div>

          {wishlistedProducts.length > 0 && (
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-brand-silver uppercase tracking-wider">
                {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'Item' : 'Items'} Reserved
              </span>
              <button
                type="button"
                onClick={clearWishlist}
                className="text-xs font-mono uppercase tracking-wider text-brand-silver hover:text-brand-crimson flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded border border-brand-charcoal hover:border-brand-crimson/50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {wishlistedProducts.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-brand-charcoal/80 rounded-2xl bg-brand-dark/40">
            <div className="w-20 h-20 rounded-full bg-brand-charcoal/50 flex items-center justify-center text-brand-silver/50 mb-6">
              <Heart className="w-10 h-10 stroke-[1.5]" />
            </div>
            <h2 className="text-2xl font-black font-heading uppercase tracking-wide mb-2">
              Your Vault Is Empty
            </h2>
            <p className="text-brand-silver text-sm max-w-md mb-8">
              Explore Drop 04 and limited collector streetwear. Hit the heart icon on any drop or garment to preserve it here.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button href="/shop" variant="primary" size="lg" className="gap-2">
                Explore The Catalog
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href="/collections" variant="outline" size="lg">
                View Collections
              </Button>
            </div>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistedProducts.map((product) => {
              const activeSize = selectedSizes[product.id] || (product.sizes[2] || product.sizes[0] || 'L');

              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col bg-brand-dark/60 border border-brand-charcoal/70 rounded-xl overflow-hidden hover:border-brand-crimson/50 transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] bg-brand-charcoal/30 overflow-hidden">
                    <Link href={`/shop/${product.slug}`} className="block w-full h-full">
                      <FineverseImage
                        src={product.images[0]?.src || ''}
                        alt={product.images[0]?.alt || product.name}
                        aspectRatio="4:5"
                        badgeText={product.badge}
                        className="group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    {/* Remove Quick Button */}
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      aria-label={`Remove ${product.name} from wishlist`}
                      className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-brand-black/80 backdrop-blur-md text-brand-silver hover:text-brand-crimson hover:bg-brand-black flex items-center justify-center transition-colors border border-white/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Fabric GSM tag */}
                    {product.gsm && (
                      <div className="absolute bottom-3 left-3 z-10">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-brand-black/85 text-brand-silver border border-white/10">
                          {product.gsm} GSM
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-brand-silver uppercase tracking-wider mb-1">
                        <span>{product.dropTag || 'Fineverse Street'}</span>
                        <span className={product.inStock ? 'text-emerald-400' : 'text-red-400'}>
                          {product.inStock ? 'In Stock' : 'Sold Out'}
                        </span>
                      </div>

                      <Link href={`/shop/${product.slug}`}>
                        <h3 className="font-heading font-bold text-base text-white hover:text-brand-crimson transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>

                      {/* Pricing */}
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-lg font-black font-heading text-white">
                          {formatINR(product.price)}
                        </span>
                        {product.compareAtPrice && product.compareAtPrice > product.price && (
                          <span className="text-xs text-brand-silver line-through">
                            {formatINR(product.compareAtPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Size Selector & CTA */}
                    <div className="mt-5 pt-4 border-t border-brand-charcoal/60 space-y-3">
                      <div>
                        <div className="flex justify-between items-center text-[10px] font-mono text-brand-silver uppercase tracking-wider mb-1.5">
                          <span>Select Size:</span>
                          <span className="text-white font-bold">{activeSize}</span>
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {product.sizes.map((sz) => (
                            <button
                              key={sz}
                              type="button"
                              onClick={() => handleSizeSelect(product.id, sz)}
                              className={`text-xs font-mono py-1 px-2.5 rounded border transition-all ${
                                activeSize === sz
                                  ? 'bg-brand-crimson text-white border-brand-crimson'
                                  : 'bg-brand-charcoal/40 text-brand-silver border-brand-charcoal hover:border-white/30'
                              }`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleMoveToCart(product)}
                        disabled={!product.inStock}
                        className="w-full gap-2 text-xs uppercase tracking-wider font-bold"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Move to Bag
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Wishlist Assurance Banner */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-brand-dark/40 border border-brand-charcoal/60">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-brand-crimson shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Drop Priority
              </h4>
              <p className="text-xs text-brand-silver mt-1">
                Items in your wishlist generate restock alert pings before general public drop releases.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-brand-crimson shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Guaranteed Authenticity
              </h4>
              <p className="text-xs text-brand-silver mt-1">
                Every piece ships with a numbered NFC/Holographic authentication certificate tag.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShoppingBag className="w-5 h-5 text-brand-crimson shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Express Fulfillment
              </h4>
              <p className="text-xs text-brand-silver mt-1">
                Dispatched directly from our Tirupur textile hub via Bluedart & Delhivery Air Express.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
