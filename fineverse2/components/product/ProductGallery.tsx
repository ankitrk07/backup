"use client";

import React, { useState, useEffect } from "react";
import { ProductImageSlot } from "@/types/product";
import { FineverseImage } from "@/components/ui/FineverseImage";
import { ZoomIn, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

interface ProductGalleryProps {
  images: ProductImageSlot[];
  selectedColorSlug: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  selectedColorSlug,
}) => {
  // Filter images for the active color
  const activeImages = images.filter((img) => img.colorSlug === selectedColorSlug);
  const galleryList = activeImages.length > 0 ? activeImages : images;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Reset to first image if color changes
  useEffect(() => {
    setActiveIndex(0);
  }, [selectedColorSlug]);

  const currentImage = galleryList[activeIndex] || galleryList[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + galleryList.length) % galleryList.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % galleryList.length);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails Row / Column */}
      <div className="flex md:flex-col gap-3 overflow-x-auto no-scrollbar pb-2 md:pb-0">
        {galleryList.map((img, idx) => {
          const isSelected = activeIndex === idx;

          return (
            <button
              key={img.slotKey}
              onClick={() => setActiveIndex(idx)}
              aria-label={`View ${img.view} photo`}
              className={`relative w-16 h-20 sm:w-20 sm:h-24 bg-space-900 border flex-shrink-0 overflow-hidden transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-acid ${
                isSelected
                  ? "border-acid ring-1 ring-acid"
                  : "border-white/10 opacity-70 hover:opacity-100"
              }`}
            >
              <FineverseImage slotKey={img.slotKey} className="w-full h-full object-cover" />
              <span className="absolute bottom-1 left-1 text-[8px] font-mono uppercase bg-black/80 px-1 text-zinc-300">
                {img.view}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Image View */}
      <div className="relative flex-1 bg-space-900 border border-white/10 overflow-hidden group">
        <div
          className="relative w-full cursor-zoom-in"
          style={{ aspectRatio: "4/5" }}
          onClick={() => setIsZoomOpen(true)}
        >
          <FineverseImage
            slotKey={currentImage.slotKey}
            priority={true}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
          />

          {/* Floating Zoom Indicator */}
          <div className="absolute bottom-3 right-3 p-2 bg-void/80 border border-white/15 text-zinc-300 group-hover:text-acid group-hover:border-acid transition-colors">
            <ZoomIn className="w-4 h-4" />
          </div>

          {/* View Badge */}
          <div className="absolute top-3 left-3 px-2 py-0.5 bg-void/90 border border-white/20 text-[10px] font-mono uppercase text-zinc-300">
            {currentImage.view.toUpperCase()} VIEW
          </div>
        </div>

        {/* Swipe / Navigation Chevrons */}
        {galleryList.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 min-h-[44px] min-w-[44px] bg-void/80 border border-white/10 hover:border-acid text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-acid"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 min-h-[44px] min-w-[44px] bg-void/80 border border-white/10 hover:border-acid text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-acid"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* High-Resolution Zoom Lightbox Modal */}
      <Modal
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        maxWidth="2xl"
        title="HIGH RESOLUTION SPECIMEN VIEW"
        description={`${currentImage.alt}`}
      >
        <div className="relative w-full max-h-[75vh] flex items-center justify-center overflow-hidden bg-space-950 p-2">
          <div className="w-full max-w-lg mx-auto" style={{ aspectRatio: "4/5" }}>
            <FineverseImage slotKey={currentImage.slotKey} className="w-full h-full object-contain" />
          </div>
        </div>
      </Modal>
    </div>
  );
};
