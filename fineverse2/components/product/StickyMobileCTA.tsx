"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { Product, GarmentSize, ProductColorVariant } from "@/types/product";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/formatters";

interface StickyMobileCTAProps {
  product: Product;
  selectedColor: ProductColorVariant;
  selectedSize: GarmentSize;
  onSizeChange: (size: GarmentSize) => void;
  onAddToCart: () => void;
  isAvailable: boolean;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({
  product,
  selectedColor,
  selectedSize,
  onSizeChange,
  onAddToCart,
  isAvailable,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show bar after scrolling down past the main hero header (approx 450px)
      setIsVisible(window.scrollY > 450);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-space-950/95 backdrop-blur-md border-t border-white/15 p-3 shadow-2xl transition-transform duration-300 transform translate-y-0"
      aria-label="Quick Add to Cart Mobile Bar"
    >
      <div className="flex items-center gap-3">
        {/* Left: Size Selector Pill */}
        <select
          value={selectedSize}
          onChange={(e) => onSizeChange(e.target.value as GarmentSize)}
          aria-label="Select Garment Size"
          className="h-11 min-h-[44px] bg-space-900 border border-white/20 px-3 text-xs font-mono font-bold text-white uppercase focus:border-acid focus:outline-none"
        >
          {product.sizes.map((s) => (
            <option
              key={s.size}
              value={s.size}
              disabled={!s.isAvailable || s.stock <= 0}
              className="bg-space-950 text-white"
            >
              {s.size} {!s.isAvailable || s.stock <= 0 ? "(SOLD OUT)" : ""}
            </option>
          ))}
        </select>

        {/* Right: Instant Add Button */}
        <Button
          variant="acid"
          size="md"
          disabled={!isAvailable}
          onClick={onAddToCart}
          className="flex-1 min-h-[44px] justify-center"
        >
          <ShoppingBag className="w-4 h-4 mr-1.5" />
          <span>{isAvailable ? `ADD • ${formatPrice(product.price)}` : "SOLD OUT"}</span>
        </Button>
      </div>
    </div>
  );
};
