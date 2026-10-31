"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { Product } from "@/types/product";
import { FineverseImage } from "@/components/ui/FineverseImage";
import { Badge } from "@/components/ui/Badge";
import { useWishlistStore } from "@/store/useWishlistStore";
import { formatPrice } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const [selectedColorSlug, setSelectedColorSlug] = useState(
    product.colors[0]?.slug || "pitch-black"
  );
  const [isHovered, setIsHovered] = useState(false);

  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const wishlisted = isInWishlist(product.id);

  // Find images matching current color
  const colorImages = product.images.filter(
    (img) => img.colorSlug === selectedColorSlug
  );
  const frontImage = colorImages.find((img) => img.view === "front") || product.images[0];
  const backImage = colorImages.find((img) => img.view === "back") || colorImages[1] || frontImage;

  // Active image to display (swaps on hover)
  const activeImage = isHovered && backImage ? backImage : frontImage;

  // Calculate total stock remaining across sizes
  const totalStock = product.sizes.reduce((sum, s) => sum + s.stock, 0);
  const isSoldOut = totalStock === 0;
  const isLowStock = totalStock > 0 && totalStock < 15;

  return (
    <div
      className={cn("group flex flex-col surface-card surface-card-hover overflow-hidden relative", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media Image Container with 4:5 Aspect Ratio */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative block w-full bg-space-900 overflow-hidden"
        style={{ aspectRatio: "4/5" }}
        tabIndex={-1}
        aria-hidden="true"
      >
        <FineverseImage
          slotKey={activeImage.slotKey}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Top Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.isLimitedDrop && (
            <Badge variant="live" size="sm">
              DROP 04
            </Badge>
          )}
          {product.compareAtPrice && product.discountPercent && (
            <Badge variant="discount" size="sm">
              {product.discountPercent}% OFF
            </Badge>
          )}
          {product.gsm > 0 && (
            <Badge variant="gsm" size="sm">
              {product.gsm} GSM
            </Badge>
          )}
        </div>

        {/* Stock Warning Overlay */}
        {isSoldOut ? (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="font-display font-black text-white text-base tracking-widest px-4 py-2 border border-white/20 bg-space-950/80 uppercase">
              ARCHIVED // SOLD OUT
            </span>
          </div>
        ) : isLowStock ? (
          <span className="absolute bottom-2.5 left-2.5 z-10 px-2 py-0.5 bg-void/90 border border-acid/40 text-[10px] font-mono text-acid uppercase font-bold">
            FEW PIECES LEFT
          </span>
        ) : null}
      </Link>

      {/* Floating Wishlist Button */}
      <button
        type="button"
        onClick={() => toggleWishlist(product.id)}
        aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        className={cn(
          "absolute top-2.5 right-2.5 z-20 w-9 h-9 min-h-[44px] min-w-[44px] flex items-center justify-center bg-void/80 backdrop-blur-sm border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-acid",
          wishlisted
            ? "border-cosmic-purple text-cosmic-purple"
            : "border-white/10 text-zinc-400 hover:text-white hover:border-white/30"
        )}
      >
        <Heart className={cn("w-4 h-4", wishlisted && "fill-current")} />
      </button>

      {/* Product Details Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-space-950/70">
        <div>
          {/* Rating & Category */}
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1">
            <span className="uppercase tracking-widest text-zinc-500">{product.fit}</span>
            <div className="flex items-center gap-1 text-acid font-bold">
              <Star className="w-3 h-3 fill-acid" />
              <span>{product.rating.average.toFixed(1)}</span>
              <span className="text-zinc-600">({product.rating.count})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-display font-bold uppercase text-base text-zinc-100 group-hover:text-acid transition-colors line-clamp-1">
            <Link href={`/shop/${product.slug}`}>{product.name}</Link>
          </h3>

          {/* Fabric Spec snippet */}
          <p className="text-[11px] font-mono text-zinc-400 mt-1 line-clamp-1">
            {product.fabric}
          </p>
        </div>

        {/* Color Swatches & Price */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
          {/* Color variant dots */}
          <div className="flex items-center gap-1.5" aria-label="Available colors">
            {product.colors.map((color) => {
              const isSelected = selectedColorSlug === color.slug;

              return (
                <button
                  key={color.slug}
                  type="button"
                  onClick={() => setSelectedColorSlug(color.slug)}
                  title={color.name}
                  aria-label={`Select ${color.name}`}
                  className={cn(
                    "w-4 h-4 rounded-full border transition-all",
                    isSelected
                      ? "ring-2 ring-acid ring-offset-2 ring-offset-space-950 scale-110 border-white"
                      : "border-white/20 hover:scale-105"
                  )}
                  style={{ backgroundColor: color.hex }}
                />
              );
            })}
          </div>

          {/* Price */}
          <div className="text-right">
            <span className="font-mono font-bold text-sm text-zinc-100">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="ml-2 font-mono text-xs text-zinc-500 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
