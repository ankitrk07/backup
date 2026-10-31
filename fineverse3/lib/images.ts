import { COLOR_CATALOG } from "@/lib/colors";
import type { CollectionSlug } from "@/types/collection";
import type { DropId } from "@/types/drop";
import type {
  ArtRef,
  AvatarVariant,
  FileImageSlot,
  GarmentKind,
  GraphicId,
  ImageSlot,
  ThumbnailVariant,
} from "@/types/image";
import {
  PRODUCT_VIEWS,
  type CategoryId,
  type ColorId,
  type ProductColor,
  type ProductImage,
  type ProductView,
} from "@/types/product";

/*
 * ════════════════════════════════════════════════════════════════════
 *  SINGLE SOURCE OF TRUTH FOR EVERY IMAGE ON THE SITE
 * ════════════════════════════════════════════════════════════════════
 *  Every image slot resolves here, either to generated SVG artwork or to a
 *  real file in /public/images. No component ever picks an image itself.
 *
 *  TO REPLACE A PLACEHOLDER WITH A REAL PHOTO
 *   1. Put the file in /public/images (see public/images/README.md).
 *   2. Add ONE line to FILE_OVERRIDES below, e.g.
 *        "product:sisters-revenge-oversized-tee:cosmic-pitch-black:front": {
 *          src: "/images/products/sisters-revenge-oversized-tee/cosmic-pitch-black-front.jpg",
 *        },
 *   No component edits are needed. Keep the same aspect ratio as the slot
 *   (or set width/height with the same ratio) so the layout never shifts.
 * ════════════════════════════════════════════════════════════════════
 */

/* ───────────── slot sizes (intrinsic ratio, prevents layout shift) ───────────── */

export const IMAGE_SIZE = {
  product: { width: 800, height: 1000 }, // 4:5
  hero: { width: 1200, height: 1500 }, // 4:5
  category: { width: 800, height: 1000 }, // 4:5
  collectionBanner: { width: 1600, height: 900 }, // 16:9
  dropBanner: { width: 1600, height: 800 }, // 2:1
  thumbnail: { width: 1280, height: 720 }, // 16:9
  avatar: { width: 160, height: 160 }, // 1:1
  logo: { width: 160, height: 160 }, // 1:1
} as const;

type Size = { width: number; height: number };

/* ───────────── blur placeholder for file images ───────────── */

const BLUR_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='8' height='10'><rect width='8' height='10' fill='#0c1220'/></svg>";

export const BLUR_DATA_URL = `data:image/svg+xml;base64,${btoa(BLUR_SVG)}`;

/* ───────────── real-file overrides (the only thing you edit) ───────────── */

interface FileOverride {
  /** path under /public, e.g. "/images/heroes/hero.jpg" */
  src: string;
  /** only set these if the file's real size differs (same aspect ratio!) */
  width?: number;
  height?: number;
  blurDataURL?: string;
}

/**
 * Slot keys:
 *   product:{slug}:{colorId}:{front|back|detail}
 *   hero
 *   category:{categoryId}
 *   collection:{collectionSlug}
 *   drop:{dropId}
 *   thumbnail:{variant}
 *   avatar:{variant}
 */
const FILE_OVERRIDES: Partial<Record<string, FileOverride>> = {
  // "hero": { src: "/images/heroes/hero.jpg" },
  // "category:hoodies": { src: "/images/categories/hoodies.jpg" },
  // "collection:sisters-revenge": { src: "/images/collections/sisters-revenge.jpg" },
  // "drop:drop-04": { src: "/images/drops/drop-04.jpg" },
  // "thumbnail:drop-reveal": { src: "/images/videos/drop-reveal.jpg" },
  // "avatar:orbit": { src: "/images/avatars/orbit.jpg", width: 320, height: 320 },
};

export const slotKey = {
  product: (slug: string, color: ColorId, view: ProductView) => `product:${slug}:${color}:${view}`,
  hero: () => "hero",
  category: (id: CategoryId) => `category:${id}`,
  collection: (slug: CollectionSlug) => `collection:${slug}`,
  drop: (id: DropId) => `drop:${id}`,
  thumbnail: (variant: ThumbnailVariant) => `thumbnail:${variant}`,
  avatar: (variant: AvatarVariant) => `avatar:${variant}`,
};

function buildSlot(key: string, art: ArtRef, alt: string, size: Size): ImageSlot {
  const override = FILE_OVERRIDES[key];
  if (override) {
    return {
      kind: "file",
      src: override.src,
      alt,
      width: override.width ?? size.width,
      height: override.height ?? size.height,
      blurDataURL: override.blurDataURL ?? BLUR_DATA_URL,
    };
  }
  return { kind: "art", art, alt, width: size.width, height: size.height };
}

/* ───────────── products ───────────── */

interface ProductArt {
  garment: GarmentKind;
  graphic: GraphicId;
}

/** Which generated artwork each product uses while it has no real photo. */
const PRODUCT_ART: Partial<Record<string, ProductArt>> = {
  "sisters-revenge-oversized-tee": { garment: "oversized-tee", graphic: "sisters-revenge" },
  "sisters-revenge-hoodie": { garment: "hoodie", graphic: "sisters-revenge" },
  "sisters-revenge-cap": { garment: "cap", graphic: "sisters-revenge" },
  "sisters-revenge-sticker-pack": { garment: "sticker-pack", graphic: "sisters-revenge" },
  "planet-x-oversized-tee": { garment: "oversized-tee", graphic: "planet-x" },
  "planet-x-hoodie": { garment: "hoodie", graphic: "planet-x" },
  "planet-x-flight-tag": { garment: "flight-tag", graphic: "planet-x" },
  "wear-the-universe-tee": { garment: "tee", graphic: "wear-the-universe" },
  "wear-the-universe-hoodie": { garment: "hoodie", graphic: "wear-the-universe" },
  "fineverse-logo-cap": { garment: "cap", graphic: "logo-mark" },
  "stardust-tee": { garment: "tee", graphic: "stardust" },
  "nebula-drift-oversized-tee": { garment: "oversized-tee", graphic: "nebula-drift" },
  "orbit-zero-oversized-tee": { garment: "oversized-tee", graphic: "orbit-zero" },
};

const FALLBACK_PRODUCT_ART: ProductArt = { garment: "tee", graphic: "none" };

const VIEW_ALT: Record<ProductView, string> = {
  front: "front view",
  back: "back view",
  detail: "print close-up",
};

interface ProductImageInput {
  slug: string;
  name: string;
  colors: readonly ProductColor[];
}

/** One image per colour and view, so the gallery, hover swap and colour selector all change visibly. */
export function getProductImages(product: ProductImageInput): ProductImage[] {
  const { garment, graphic } = PRODUCT_ART[product.slug] ?? FALLBACK_PRODUCT_ART;

  return product.colors.flatMap((color) =>
    PRODUCT_VIEWS.map((view): ProductImage => {
      const colorName = COLOR_CATALOG[color.id].name;
      const alt = `${product.name} in ${colorName}, ${VIEW_ALT[view]}`;
      const art: ArtRef = { type: "garment", garment, color: color.id, view, graphic };
      return {
        colorId: color.id,
        view,
        slot: buildSlot(slotKey.product(product.slug, color.id, view), art, alt, IMAGE_SIZE.product),
      };
    }),
  );
}

/* ───────────── site-wide slots ───────────── */

export function getHeroImage(): ImageSlot {
  return buildSlot(
    slotKey.hero(),
    { type: "hero" },
    "FINEVERSE hero artwork: a ringed teal planet above the words Wear The Universe",
    IMAGE_SIZE.hero,
  );
}

export function getCategoryImage(category: CategoryId): ImageSlot {
  const name = category.replace(/-/g, " ");
  return buildSlot(
    slotKey.category(category),
    { type: "category", category },
    `Category artwork for ${name}`,
    IMAGE_SIZE.category,
  );
}

export function getCollectionBanner(collection: CollectionSlug, name: string): ImageSlot {
  return buildSlot(
    slotKey.collection(collection),
    { type: "collection-banner", collection },
    `${name} collection banner`,
    IMAGE_SIZE.collectionBanner,
  );
}

export function getDropBanner(drop: DropId, name: string): ImageSlot {
  return buildSlot(
    slotKey.drop(drop),
    { type: "drop-banner", drop },
    `${name} drop banner`,
    IMAGE_SIZE.dropBanner,
  );
}

export function getVideoThumbnail(variant: ThumbnailVariant, title: string): ImageSlot {
  return buildSlot(
    slotKey.thumbnail(variant),
    { type: "thumbnail", variant },
    `Video thumbnail: ${title}`,
    IMAGE_SIZE.thumbnail,
  );
}

export function getAvatar(variant: AvatarVariant, name: string): ImageSlot {
  return buildSlot(
    slotKey.avatar(variant),
    { type: "avatar", variant },
    `Avatar of ${name}`,
    IMAGE_SIZE.avatar,
  );
}

/* ───────────── brand logo ───────────── */

/** Your uploaded logo (a real file, 160 x 160). Replace the file or this path to update it. */
export const BRAND_LOGO_SRC = "/images/brand/fineverse-logo.jpg";

export function getBrandLogo(): FileImageSlot {
  return {
    kind: "file",
    src: BRAND_LOGO_SRC,
    alt: "FINEVERSE logo: a ringed teal planet",
    width: IMAGE_SIZE.logo.width,
    height: IMAGE_SIZE.logo.height,
  };
}

/** Crisp vector version of the logo, drawn as SVG artwork. */
export function getBrandMark(): ImageSlot {
  return {
    kind: "art",
    art: { type: "logo" },
    alt: "FINEVERSE logo: a ringed teal planet",
    width: IMAGE_SIZE.logo.width,
    height: IMAGE_SIZE.logo.height,
  };
}