import React from "react";
import Image from "next/image";
import { getImageSlot } from "@/lib/images";

interface FineverseImageProps {
  slotKey: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
}

/**
 * Universal Image Slot Component.
 * - If a real file path is defined in /lib/images.ts, it renders next/image.
 * - Otherwise, it renders the lightweight vector SVG placeholder component.
 * - Enforces zero layout shift with identical aspect ratios and reserved bounds.
 */
export const FineverseImage: React.FC<FineverseImageProps> = ({
  slotKey,
  className = "w-full h-full object-cover",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  fill = false,
}) => {
  const slot = getImageSlot(slotKey);

  if (slot.filePath) {
    if (fill) {
      return (
        <Image
          src={slot.filePath}
          alt={slot.alt}
          fill
          priority={priority}
          sizes={sizes}
          className={className}
        />
      );
    }

    return (
      <Image
        src={slot.filePath}
        alt={slot.alt}
        width={slot.width}
        height={slot.height}
        priority={priority}
        sizes={sizes}
        className={className}
      />
    );
  }

  // Render vector SVG component
  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center ${className}`}
      style={{ aspectRatio: slot.aspectRatio }}
      role="img"
      aria-label={slot.alt}
    >
      {slot.component}
    </div>
  );
};
