"use client";

import React, { useState } from "react";
import { Product, GarmentSize } from "@/types/product";
import { Review } from "@/types/review";
import { ProductGallery } from "./ProductGallery";
import { SizeGuideModal } from "./SizeGuideModal";
import { DeliveryEstimator } from "./DeliveryEstimator";
import { ProductReviews } from "./ProductReviews";
import { StickyMobileCTA } from "./StickyMobileCTA";
import { ProductCard } from "./ProductCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useToast } from "@/components/ui/Toast";
import { formatPrice } from "@/lib/formatters";
import { siteConfig } from "@/config/site";
import { Heart, ShoppingBag, Ruler, ShieldCheck, Check, Sparkles, Flame } from "lucide-react";

interface ProductDetailViewProps {
  product: Product;
  reviews: Review[];
  relatedProducts: Product[];
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  reviews,
  relatedProducts,
}) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<GarmentSize>(
    product.sizes.find((s) => s.isAvailable && s.stock > 0)?.size || product.sizes[0].size
  );
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const { addItem } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { showToast } = useToast();

  const wishlisted = isInWishlist(product.id);

  // Check stock for active size
  const activeSizeStock = product.sizes.find((s) => s.size === selectedSize);
  const isAvailable = Boolean(activeSizeStock && activeSizeStock.isAvailable && activeSizeStock.stock > 0);
  const remainingStockForSize = activeSizeStock?.stock || 0;

  // Active image slot for cart
  const activeImage =
    product.images.find(
      (img) => img.colorSlug === selectedColor.slug && img.view === "front"
    ) || product.images[0];

  const handleAddToCart = () => {
    if (!isAvailable) return;

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      gsm: product.gsm,
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
      maxStock: remainingStockForSize,
      imageSlotKey: activeImage.slotKey,
    });

    showToast(`ADDED ${product.name} TO CART`, {
      description: `Color: ${selectedColor.name} • Size: ${selectedSize}`,
      type: "success",
    });
  };

  const breadcrumbs = [
    { label: "SHOP", href: "/shop" },
    { label: product.category.toUpperCase().replace("-", " "), href: `/shop?category=${product.category}` },
    { label: product.name },
  ];

  const specAccordionItems = [
    {
      id: "specs",
      title: "TECHNICAL SPECIFICATIONS",
      content: (
        <ul className="space-y-2 text-xs font-mono text-zinc-300">
          <li className="flex justify-between py-1 border-b border-white/5">
            <span className="text-zinc-500">FABRIC WEIGHT:</span>
            <span className="text-white font-bold">{product.gsm > 0 ? `${product.gsm} GSM` : "HEAVYWEIGHT"}</span>
          </li>
          <li className="flex justify-between py-1 border-b border-white/5">
            <span className="text-zinc-500">COMPOSITION:</span>
            <span className="text-white">{product.fabric}</span>
          </li>
          <li className="flex justify-between py-1 border-b border-white/5">
            <span className="text-zinc-500">SILHOUETTE:</span>
            <span className="text-white">{product.fit}</span>
          </li>
          <li className="flex justify-between py-1">
            <span className="text-zinc-500">ORIGIN:</span>
            <span className="text-white">Knitted & Crafted in Tirupur, India</span>
          </li>
        </ul>
      ),
    },
    {
      id: "care",
      title: "WASH & CARE INSTRUCTIONS",
      content: (
        <ul className="list-disc pl-4 space-y-1 text-xs font-sans text-zinc-400">
          {product.careInstructions.map((inst, i) => (
            <li key={i}>{inst}</li>
          ))}
        </ul>
      ),
    },
    {
      id: "shipping",
      title: "SHIPPING & 7-DAY REPLACEMENTS",
      content: (
        <div className="space-y-2 text-xs font-sans text-zinc-300">
          <p>
            Free standard shipping across India on orders over <strong>{formatPrice(siteConfig.shipping.freeShippingThreshold)}</strong>.
          </p>
          <p>
            Cash on Delivery is available pan-India. If the size does not fit, exchange requests can be raised within <strong>{siteConfig.returns.windowDays} days</strong> of delivery with original tags intact.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <div className="mb-8">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Main 2-Column Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Responsive Gallery with Color Switching */}
        <div className="lg:col-span-7">
          <ProductGallery
            images={product.images}
            selectedColorSlug={selectedColor.slug}
          />
        </div>

        {/* Right Column: Product Actions & Specs */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header & Badges */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {product.dropId && (
                <Badge variant="live" size="sm">
                  <Flame className="w-3.5 h-3.5 mr-1" />
                  DROP 04 "SISTERS REVENGE"
                </Badge>
              )}
              {product.gsm > 0 && (
                <Badge variant="gsm" size="sm">
                  {product.gsm} GSM
                </Badge>
              )}
              {product.compareAtPrice && product.discountPercent && (
                <Badge variant="discount" size="sm">
                  {product.discountPercent}% OFF
                </Badge>
              )}
            </div>

            <h1 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
              {product.name}
            </h1>
            {product.subtitle && (
              <p className="text-xs font-mono text-zinc-400 mt-1 uppercase">
                {product.subtitle}
              </p>
            )}

            {/* Price Header */}
            <div className="flex items-center gap-3 mt-4">
              <span className="font-mono font-bold text-3xl text-acid">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="font-mono text-base text-zinc-500 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
              <span className="text-xs font-mono text-zinc-500">
                (Inclusive of all taxes)
              </span>
            </div>
          </div>

          {/* Color Selector */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-zinc-400">COLOR VARIANT:</span>
              <strong className="text-white uppercase">{selectedColor.name}</strong>
            </div>
            <div className="flex items-center gap-3">
              {product.colors.map((color) => {
                const isSelected = selectedColor.slug === color.slug;

                return (
                  <button
                    key={color.slug}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select ${color.name}`}
                    className={`flex items-center gap-2 px-3 py-2 border transition-all text-xs font-mono ${
                      isSelected
                        ? "border-acid bg-space-900 text-white ring-1 ring-acid"
                        : "border-white/15 bg-space-950 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20 inline-block"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Size Selector + Size Guide Link */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-400">SELECT SIZE:</span>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-acid hover:underline flex items-center gap-1 font-bold"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>SIZE GUIDE</span>
              </button>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((s) => {
                const isSelected = selectedSize === s.size;
                const inStock = s.isAvailable && s.stock > 0;

                return (
                  <button
                    key={s.size}
                    type="button"
                    disabled={!inStock}
                    onClick={() => setSelectedSize(s.size)}
                    className={`h-12 min-h-[44px] flex flex-col items-center justify-center border font-mono text-xs font-bold transition-all ${
                      isSelected
                        ? "border-acid bg-acid text-void shadow-acid font-black"
                        : inStock
                        ? "border-white/15 bg-space-900 text-zinc-200 hover:border-white/30"
                        : "border-white/5 bg-space-950 text-zinc-600 line-through cursor-not-allowed opacity-50"
                    }`}
                  >
                    <span>{s.size}</span>
                  </button>
                );
              })}
            </div>

            {/* Per-size Stock Warning */}
            {remainingStockForSize > 0 && remainingStockForSize < 12 && (
              <p className="text-[11px] font-mono text-acid pt-1">
                ⚡ Only {remainingStockForSize} units left in size {selectedSize}
              </p>
            )}
          </div>

          {/* Action Buttons: Add to Cart & Wishlist */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              variant="acid"
              size="lg"
              disabled={!isAvailable}
              onClick={handleAddToCart}
              className="flex-1 shadow-acid text-sm sm:text-base font-black min-h-[48px]"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              <span>{isAvailable ? "ADD TO CART" : "SOLD OUT"}</span>
            </Button>

            <Button
              variant={wishlisted ? "cosmic" : "outline"}
              size="icon"
              onClick={() => toggleWishlist(product.id)}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className="flex-shrink-0 min-h-[48px] min-w-[48px]"
            >
              <Heart className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`} />
            </Button>
          </div>

          {/* Delivery Estimator */}
          <DeliveryEstimator />

          {/* Specifications & Care Accordions */}
          <Accordion items={specAccordionItems} defaultExpandedIds={["specs"]} />
        </div>
      </div>

      {/* Customer Reviews Section */}
      <ProductReviews reviews={reviews} rating={product.rating} />

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <section aria-label="Related Merch" className="mt-20 pt-12 border-t border-white/10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-black text-2xl uppercase tracking-tight text-white">
              COMPLETE THE UNIFORM
            </h2>
            <span className="font-mono text-xs text-acid">RECOMMENDED WITH THIS PIECE</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Modals & Sticky CTA */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />

      <StickyMobileCTA
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
        onAddToCart={handleAddToCart}
        isAvailable={isAvailable}
      />
    </div>
  );
};
