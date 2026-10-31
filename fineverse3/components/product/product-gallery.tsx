"use client";

import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { SlotImage } from "@/components/media/slot-image";
import { prefersReducedMotion } from "@/lib/dom";
import { getProductImagesForColor } from "@/lib/product";
import { cn } from "@/lib/utils";
import type { ColorId, Product, ProductImage, ProductView } from "@/types/product";
import { GalleryZoomLoader } from "./gallery-zoom-loader";

const VIEW_LABEL: Record<ProductView, string> = {
  front: "front",
  back: "back",
  detail: "close-up",
};

const ARROW_BUTTON =
  "absolute top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-bg/70 text-fg backdrop-blur transition-colors hover:text-accent disabled:opacity-30 sm:flex";

interface GalleryInnerProps {
  images: ProductImage[];
  productName: string;
}

function GalleryInner({ images, productName }: GalleryInnerProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const count = images.length;

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  function goTo(index: number) {
    const track = trackRef.current;
    const next = Math.min(Math.max(index, 0), count - 1);
    setActive(next);
    track?.scrollTo({
      left: next * track.clientWidth,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }

  // Keeps the thumbnails in sync while the shopper swipes.
  function onScroll() {
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      const track = trackRef.current;
      if (!track || track.clientWidth === 0) return;
      const index = Math.min(Math.max(Math.round(track.scrollLeft / track.clientWidth), 0), count - 1);
      setActive((current) => (current === index ? current : index));
    });
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(active - 1);
    }
  }

  return (
    <div>
      <div className="relative">
        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label={`${productName} images`}
          tabIndex={0}
          onScroll={onScroll}
          onKeyDown={onKeyDown}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-xl border border-line bg-surface"
        >
          {images.map((image, index) => (
            <div
              key={`${image.colorId}-${image.view}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
              className="w-full shrink-0 snap-center"
            >
              <button
                type="button"
                onClick={() => {
                  setActive(index);
                  setZoomOpen(true);
                }}
                aria-haspopup="dialog"
                aria-label={`Zoom image: ${image.slot.alt}`}
                className="relative block w-full cursor-zoom-in"
              >
                <SlotImage
                  slot={image.slot}
                  decorative
                  priority={index === 0}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full bg-bg/70 text-fg backdrop-blur"
                >
                  <ZoomIn className="size-5" />
                </span>
              </button>
            </div>
          ))}
        </div>

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label="Previous image"
              className={cn(ARROW_BUTTON, "left-2")}
            >
              <ChevronLeft className="size-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              disabled={active === count - 1}
              aria-label="Next image"
              className={cn(ARROW_BUTTON, "right-2")}
            >
              <ChevronRight className="size-6" aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>

      <p className="sr-only" aria-live="polite">
        Image {active + 1} of {count}
      </p>

      {count > 1 ? (
        <ul className="mt-3 flex gap-2 sm:gap-3">
          {images.map((image, index) => (
            <li key={`${image.colorId}-${image.view}`} className="flex-1">
              <button
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Show ${VIEW_LABEL[image.view]} view`}
                aria-current={index === active ? "true" : undefined}
                className={cn(
                  "block w-full overflow-hidden rounded-lg border-2 transition-colors",
                  index === active ? "border-accent" : "border-line hover:border-subtle",
                )}
              >
                <SlotImage slot={image.slot} decorative sizes="(min-width: 1024px) 15vw, 30vw" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <GalleryZoomLoader
        open={zoomOpen}
        onClose={() => setZoomOpen(false)}
        images={images}
        index={active}
        onIndexChange={goTo}
        productName={productName}
      />
    </div>
  );
}

interface ProductGalleryProps {
  product: Product;
  colorId: ColorId;
}

export function ProductGallery({ product, colorId }: ProductGalleryProps) {
  const images = useMemo(() => getProductImagesForColor(product, colorId), [product, colorId]);

  // `key` resets the scroll position and active thumbnail whenever the colour changes.
  return <GalleryInner key={colorId} images={images} productName={product.name} />;
}