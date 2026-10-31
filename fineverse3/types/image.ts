import type { CollectionSlug } from "./collection";
import type { DropId } from "./drop";
import type { CategoryId, ColorId, ProductView } from "./product";

export type GarmentKind =
  | "tee"
  | "oversized-tee"
  | "hoodie"
  | "cap"
  | "sticker-pack"
  | "flight-tag";

export type GraphicId =
  | "none"
  | "sisters-revenge"
  | "planet-x"
  | "wear-the-universe"
  | "logo-mark"
  | "nebula-drift"
  | "orbit-zero"
  | "stardust";

export type ThumbnailVariant = "drop-reveal" | "behind-the-print" | "unboxing";
export type AvatarVariant = "orbit" | "comet" | "nebula" | "pulsar";

/** Describes which generated SVG artwork to draw. */
export type ArtRef =
  | {
      type: "garment";
      garment: GarmentKind;
      color: ColorId;
      view: ProductView;
      graphic: GraphicId;
    }
  | { type: "hero" }
  | { type: "logo" }
  | { type: "category"; category: CategoryId }
  | { type: "collection-banner"; collection: CollectionSlug }
  | { type: "drop-banner"; drop: DropId }
  | { type: "thumbnail"; variant: ThumbnailVariant }
  | { type: "avatar"; variant: AvatarVariant };

interface ImageSlotBase {
  alt: string;
  /** Intrinsic size. Defines the aspect ratio so swapping assets causes no layout shift. */
  width: number;
  height: number;
}

export interface ArtImageSlot extends ImageSlotBase {
  kind: "art";
  art: ArtRef;
}

export interface FileImageSlot extends ImageSlotBase {
  kind: "file";
  /** Path under /public, e.g. "/images/products/x/front.jpg" */
  src: string;
  blurDataURL?: string;
}

export type ImageSlot = ArtImageSlot | FileImageSlot;