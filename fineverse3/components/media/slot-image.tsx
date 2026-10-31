import Image from "next/image";
import { ArtRenderer } from "@/components/art/registry";
import { BLUR_DATA_URL } from "@/lib/images";
import { cn } from "@/lib/utils";
import type { ImageSlot } from "@/types/image";

const DEFAULT_SIZES = "(min-width: 1024px) 25vw, 50vw";

export interface SlotImageProps {
  slot: ImageSlot;
  /** next/image `sizes`, used only when the slot is a real file */
  sizes?: string;
  /** Use on the single LCP image of a page only. */
  priority?: boolean;
  fit?: "cover" | "contain";
  /** Let the parent size the box instead of the slot's own aspect ratio. */
  fill?: boolean;
  className?: string;
  imageClassName?: string;
  /** Hide from assistive tech when nearby text already describes the image. */
  decorative?: boolean;
}

/**
 * Renders any image slot, generated SVG art or a real photo, inside a box
 * that already has the right aspect ratio, so swapping assets never shifts layout.
 */
export function SlotImage({
  slot,
  sizes = DEFAULT_SIZES,
  priority = false,
  fit = "cover",
  fill = false,
  className,
  imageClassName,
  decorative = false,
}: SlotImageProps) {
  return (
    <div
      className={cn("relative overflow-hidden", fill ? "h-full w-full" : "w-full", className)}
      style={fill ? undefined : { aspectRatio: `${slot.width} / ${slot.height}` }}
    >
      {slot.kind === "art" ? (
        <div className="absolute inset-0" aria-hidden={decorative || undefined}>
          <ArtRenderer art={slot.art} label={slot.alt} />
        </div>
      ) : (
        <Image
          src={slot.src}
          alt={decorative ? "" : slot.alt}
          width={slot.width}
          height={slot.height}
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={slot.blurDataURL ?? BLUR_DATA_URL}
          unoptimized={slot.src.endsWith(".svg")}
          className={cn(
            "absolute inset-0 h-full w-full",
            fit === "cover" ? "object-cover" : "object-contain",
            imageClassName,
          )}
        />
      )}
    </div>
  );
}