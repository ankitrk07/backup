"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { SlotImage } from "@/components/media/slot-image";
import { Button } from "@/components/ui/button";
import { Overlay } from "@/components/ui/overlay";
import { cn } from "@/lib/utils";
import type { ImageSlot } from "@/types/image";
import type { ProductImage } from "@/types/product";

export interface GalleryZoomProps {
  open: boolean;
  onClose: () => void;
  images: ProductImage[];
  index: number;
  onIndexChange: (index: number) => void;
  productName: string;
}

const STAGE_HEIGHT = "min(66dvh, 52rem)";
const ZOOM_FACTOR = 2.5;

/** Remounted per image (key), so every image starts un-zoomed. */
function ZoomStage({ slot }: { slot: ImageSlot }) {
  const [zoomed, setZoomed] = useState(false);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const ratio = slot.width / slot.height;
  const fitWidth = `min(100%, calc(${STAGE_HEIGHT} * ${ratio}))`;

  // Start zoomed-in views centred on the image.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !zoomed) return;
    scroller.scrollLeft = (scroller.scrollWidth - scroller.clientWidth) / 2;
    scroller.scrollTop = (scroller.scrollHeight - scroller.clientHeight) / 2;
  }, [zoomed]);

  return (
    <div
      ref={scrollerRef}
      className="flex w-full overflow-auto overscroll-contain bg-bg"
      style={{ height: STAGE_HEIGHT }}
    >
      <button
        type="button"
        onClick={() => setZoomed((value) => !value)}
        aria-label={zoomed ? "Zoom out" : "Zoom in"}
        className={cn("relative m-auto block shrink-0", zoomed ? "cursor-zoom-out" : "cursor-zoom-in")}
        style={{
          aspectRatio: `${slot.width} / ${slot.height}`,
          width: zoomed ? `calc(${fitWidth} * ${ZOOM_FACTOR})` : fitWidth,
        }}
      >
        <div className="absolute inset-0">
          <SlotImage slot={slot} fill decorative sizes="(min-width: 1024px) 1000px, 100vw" />
        </div>
      </button>
    </div>
  );
}

export function GalleryZoom({
  open,
  onClose,
  images,
  index,
  onIndexChange,
  productName,
}: GalleryZoomProps) {
  const titleId = useId();
  const count = images.length;
  const current = images[index];

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") onIndexChange(Math.min(index + 1, count - 1));
      else if (event.key === "ArrowLeft") onIndexChange(Math.max(index - 1, 0));
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, index, count, onIndexChange]);

  return (
    <Overlay
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      placement="center"
      panelClassName="max-w-4xl overflow-hidden"
    >
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-line px-5 py-2">
        <h2 id={titleId} className="truncate font-display text-xl uppercase tracking-wide text-fg">
          {productName}
        </h2>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close image viewer">
          <X className="size-6" aria-hidden="true" />
        </Button>
      </div>

      {current ? <ZoomStage key={index} slot={current.slot} /> : null}

      <div className="flex shrink-0 items-center justify-between gap-4 border-t border-line px-5 py-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onIndexChange(index - 1)}
          disabled={index <= 0}
          aria-label="Previous image"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </Button>
        <p className="text-center text-sm text-muted" aria-live="polite">
          Image {index + 1} of {count}
          <span className="hidden sm:inline"> · Click the image to zoom</span>
        </p>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onIndexChange(index + 1)}
          disabled={index >= count - 1}
          aria-label="Next image"
        >
          <ChevronRight className="size-6" aria-hidden="true" />
        </Button>
      </div>
    </Overlay>
  );
}