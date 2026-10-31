"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { useOptionalDropStatus } from "@/hooks/use-optional-drop-status";
import { scrollIntoViewCentered } from "@/lib/dom";
import { sizeLabel } from "@/lib/labels";
import { getSizeStock, isSoldOut } from "@/lib/product";
import { useCartStore } from "@/store/cart-store";
import { toast } from "@/store/toast-store";
import { useUiStore } from "@/store/ui-store";
import type { SizeChart } from "@/types/content";
import type { Drop } from "@/types/drop";
import type { ColorId, Product, SizeId } from "@/types/product";
import { ProductGallery } from "./product-gallery";
import { MAIN_CTA_ID, PurchasePanel } from "./purchase-panel";
import { SIZE_GROUP_ID } from "./size-selector";
import { StickyCta } from "./sticky-cta";

interface ProductDetailProps {
  product: Product;
  sizeChart: SizeChart | null;
  drop: Drop | null;
  /** timestamp from the server render, keeps drop state hydration-safe */
  serverNow: number;
}

/** Owns the selection state shared by the gallery, the purchase panel and the sticky bar. */
export function ProductDetail({ product, sizeChart, drop, serverNow }: ProductDetailProps) {
  const [colorId, setColorId] = useState<ColorId>(product.colors[0].id);
  const [size, setSize] = useState<SizeId | null>(() => {
    const only = product.sizes.length === 1 ? product.sizes[0] : undefined;
    return only && only.stock > 0 ? only.size : null;
  });
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState<string | null>(null);

  const setCartOpen = useUiStore((state) => state.setCartOpen);
  const dropStatus = useOptionalDropStatus(drop, serverNow);

  const soldOut = isSoldOut(product);
  const notStarted = dropStatus === "upcoming";
  const selectedStock = size ? getSizeStock(product, size) : 0;
  const maxQuantity = Math.max(1, Math.min(selectedStock, siteConfig.catalog.maxQtyPerLine));
  const safeQuantity = Math.min(quantity, maxQuantity);

  const cta = soldOut
    ? { label: "Sold out", disabled: true }
    : notStarted
      ? { label: "Drop starts soon", disabled: true }
      : !size
        ? { label: "Select a size", disabled: false }
        : selectedStock <= 0
          ? { label: "Out of stock", disabled: true }
          : { label: "Add to cart", disabled: false };

  function handleSizeChange(next: SizeId) {
    setSize(next);
    setSizeError(null);
  }

  function handleAdd() {
    if (cta.disabled) return;

    if (!size) {
      setSizeError("Select a size to continue");
      scrollIntoViewCentered(document.getElementById(SIZE_GROUP_ID));
      document
        .querySelector<HTMLInputElement>(`#${SIZE_GROUP_ID} input:not(:disabled)`)
        ?.focus({ preventScroll: true });
      return;
    }

    const color = product.colors.find((item) => item.id === colorId);
    if (!color) return;

    const cart = useCartStore.getState();
    if (!cart.hasHydrated) {
      toast.info("One moment", "Your cart is still loading. Please try again.");
      return;
    }

    const result = cart.addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        colorId: color.id,
        colorName: color.name,
        size,
        maxQuantity: selectedStock,
      },
      safeQuantity,
    );

    if (!result.ok) {
      toast.error("Out of stock", `${product.name} (${sizeLabel(size)}) just sold out.`);
      return;
    }
    if (result.capped) {
      toast.info(
        "Maximum quantity reached",
        `You already have the most we can offer of ${sizeLabel(size)}.`,
      );
    }
    setCartOpen(true);
  }

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
          <ProductGallery product={product} colorId={colorId} />
        </div>

        <PurchasePanel
          product={product}
          colorId={colorId}
          onColorChange={setColorId}
          size={size}
          onSizeChange={handleSizeChange}
          sizeError={sizeError}
          quantity={safeQuantity}
          maxQuantity={maxQuantity}
          onQuantityChange={setQuantity}
          sizeChart={sizeChart}
          drop={drop}
          dropStatus={dropStatus}
          serverNow={serverNow}
          cta={cta}
          onAdd={handleAdd}
        />
      </div>

      <StickyCta
        name={product.name}
        price={product.price}
        compareAtPrice={product.compareAtPrice}
        label={cta.label}
        disabled={cta.disabled}
        onClick={handleAdd}
        observeId={MAIN_CTA_ID}
      />
    </>
  );
}