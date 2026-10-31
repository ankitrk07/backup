import React from "react";
import {
  OversizedTeeSVG,
  HeavyweightHoodieSVG,
  TacticalFlightTagSVG,
  CargoCapSVG,
} from "@/components/placeholders/GarmentArtworks";
import {
  HeroBannerSVG,
  DropSpotlightBannerSVG,
  CategoryTileSVG,
} from "@/components/placeholders/GraphicBanners";
import {
  YouTubeThumbnailSVG,
  AvatarSVG,
} from "@/components/placeholders/MediaThumbnails";

export interface ImageSlotDefinition {
  slotKey: string;
  width: number;
  height: number;
  aspectRatio: string;
  alt: string;
  // If filePath is set, the site will render Next/Image pointing to /public/images/...
  // When null or undefined, the site renders the lightweight custom SVG artwork below.
  filePath?: string | null;
  component: React.ReactNode;
}

export const IMAGE_SLOT_REGISTRY: Record<string, ImageSlotDefinition> = {
  // ============================================================================
  // BRAND LOGOS & BANNERS
  // ============================================================================
  "site-logo": {
    slotKey: "site-logo",
    width: 500,
    height: 500,
    aspectRatio: "1/1",
    alt: "FINEVERSE Wear The Universe Brand Emblem",
    filePath: "/images/logo.svg",
    component: null,
  },
  "hero-banner-main": {
    slotKey: "hero-banner-main",
    width: 1440,
    height: 900,
    aspectRatio: "16/10",
    alt: "FINEVERSE Cosmic Streetwear Portal & Anime Cyber Horizon",
    filePath: null, // Set to "/images/hero-banner.webp" when real shoot is done
    component: <HeroBannerSVG />,
  },
  "banner-drop-04": {
    slotKey: "banner-drop-04",
    width: 1200,
    height: 600,
    aspectRatio: "2/1",
    alt: "Drop 04 Sisters Revenge Flagship Capsule Spotlight",
    filePath: null,
    component: <DropSpotlightBannerSVG />,
  },

  // ============================================================================
  // CATEGORY TILES
  // ============================================================================
  "category-drop04": {
    slotKey: "category-drop04",
    width: 600,
    height: 750,
    aspectRatio: "4/5",
    alt: "Drop 04 Sisters Revenge Vault Collection",
    filePath: null,
    component: <CategoryTileSVG categorySlug="drop-04" />,
  },
  "category-tees": {
    slotKey: "category-tees",
    width: 600,
    height: 750,
    aspectRatio: "4/5",
    alt: "Heavyweight 240 GSM Oversized Tees",
    filePath: null,
    component: <CategoryTileSVG categorySlug="tees" />,
  },
  "category-hoodies": {
    slotKey: "category-hoodies",
    width: 600,
    height: 750,
    aspectRatio: "4/5",
    alt: "Thermal 420 GSM French Terry Hoodies",
    filePath: null,
    component: <CategoryTileSVG categorySlug="hoodies" />,
  },
  "category-accessories": {
    slotKey: "category-accessories",
    width: 600,
    height: 750,
    aspectRatio: "4/5",
    alt: "Tactical Flight Tags, Dad Caps & Accessories",
    filePath: null,
    component: <CategoryTileSVG categorySlug="accessories" />,
  },

  // ============================================================================
  // FLAGSHIP: SISTERS REVENGE OVERSIZED TEE (DROP 04)
  // ============================================================================
  "sisters-revenge-black-front": {
    slotKey: "sisters-revenge-black-front",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "Sisters Revenge Oversized Tee in Pitch Void Black - Front View",
    filePath: null,
    component: <OversizedTeeSVG color="pitch-black" view="front" artworkTitle="SISTERS REVENGE" />,
  },
  "sisters-revenge-black-back": {
    slotKey: "sisters-revenge-black-back",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "Sisters Revenge Oversized Tee in Pitch Void Black - Cosmic Back Artwork",
    filePath: null,
    component: <OversizedTeeSVG color="pitch-black" view="back" artworkTitle="SISTERS REVENGE" />,
  },
  "sisters-revenge-black-detail": {
    slotKey: "sisters-revenge-black-detail",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "Sisters Revenge Oversized Tee - 240 GSM Collar & Fabric Detail",
    filePath: null,
    component: <OversizedTeeSVG color="pitch-black" view="detail" />,
  },
  "sisters-revenge-acid-front": {
    slotKey: "sisters-revenge-acid-front",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "Sisters Revenge Oversized Tee in Interstellar Acid - Front View",
    filePath: null,
    component: <OversizedTeeSVG color="acid-volt" view="front" artworkTitle="SISTERS REVENGE" />,
  },
  "sisters-revenge-acid-back": {
    slotKey: "sisters-revenge-acid-back",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "Sisters Revenge Oversized Tee in Interstellar Acid - Back View",
    filePath: null,
    component: <OversizedTeeSVG color="acid-volt" view="back" artworkTitle="SISTERS REVENGE" />,
  },
  "sisters-revenge-acid-detail": {
    slotKey: "sisters-revenge-acid-detail",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "Sisters Revenge Oversized Tee in Interstellar Acid - Detail View",
    filePath: null,
    component: <OversizedTeeSVG color="acid-volt" view="detail" />,
  },

  // ============================================================================
  // PLANET X HEAVYWEIGHT HOODIE (420 GSM)
  // ============================================================================
  "planet-x-black-front": {
    slotKey: "planet-x-black-front",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "Planet X Heavyweight Hoodie in Pitch Void Black - Front View",
    filePath: null,
    component: <HeavyweightHoodieSVG color="pitch-black" view="front" artworkTitle="PLANET X" />,
  },
  "planet-x-black-back": {
    slotKey: "planet-x-black-back",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "Planet X Heavyweight Hoodie in Pitch Void Black - Orbital Back Art",
    filePath: null,
    component: <HeavyweightHoodieSVG color="pitch-black" view="back" artworkTitle="PLANET X" />,
  },
  "planet-x-black-detail": {
    slotKey: "planet-x-black-detail",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "Planet X Heavyweight Hoodie - 420 GSM French Terry Loopback Interior",
    filePath: null,
    component: <HeavyweightHoodieSVG color="pitch-black" view="detail" />,
  },
  "planet-x-violet-front": {
    slotKey: "planet-x-violet-front",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "Planet X Heavyweight Hoodie in Cosmic Violet - Front View",
    filePath: null,
    component: <HeavyweightHoodieSVG color="cosmic-violet" view="front" artworkTitle="PLANET X" />,
  },
  "planet-x-violet-back": {
    slotKey: "planet-x-violet-back",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "Planet X Heavyweight Hoodie in Cosmic Violet - Back View",
    filePath: null,
    component: <HeavyweightHoodieSVG color="cosmic-violet" view="back" artworkTitle="PLANET X" />,
  },
  "planet-x-violet-detail": {
    slotKey: "planet-x-violet-detail",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "Planet X Heavyweight Hoodie in Cosmic Violet - Detail",
    filePath: null,
    component: <HeavyweightHoodieSVG color="cosmic-violet" view="detail" />,
  },

  // ============================================================================
  // WEAR THE UNIVERSE CORE TEE
  // ============================================================================
  "wear-universe-black-front": {
    slotKey: "wear-universe-black-front",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "FINEVERSE Wear The Universe Core Tee in Pitch Void Black",
    filePath: null,
    component: <OversizedTeeSVG color="pitch-black" view="front" artworkTitle="WEAR THE UNIVERSE" />,
  },
  "wear-universe-black-back": {
    slotKey: "wear-universe-black-back",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "FINEVERSE Wear The Universe Core Tee Spine Artwork",
    filePath: null,
    component: <OversizedTeeSVG color="pitch-black" view="back" artworkTitle="WEAR THE UNIVERSE" />,
  },
  "wear-universe-black-detail": {
    slotKey: "wear-universe-black-detail",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "FINEVERSE Wear The Universe Core Tee Texture Detail",
    filePath: null,
    component: <OversizedTeeSVG color="pitch-black" view="detail" />,
  },
  "wear-universe-acid-front": {
    slotKey: "wear-universe-acid-front",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "FINEVERSE Wear The Universe Core Tee in Interstellar Acid",
    filePath: null,
    component: <OversizedTeeSVG color="acid-volt" view="front" artworkTitle="WEAR THE UNIVERSE" />,
  },
  "wear-universe-acid-back": {
    slotKey: "wear-universe-acid-back",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "FINEVERSE Wear The Universe Core Tee in Interstellar Acid - Back",
    filePath: null,
    component: <OversizedTeeSVG color="acid-volt" view="back" artworkTitle="WEAR THE UNIVERSE" />,
  },
  "wear-universe-acid-detail": {
    slotKey: "wear-universe-acid-detail",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "FINEVERSE Wear The Universe Core Tee in Interstellar Acid - Detail",
    filePath: null,
    component: <OversizedTeeSVG color="acid-volt" view="detail" />,
  },

  // ============================================================================
  // NOCTURNAL ODYSSEY HOODIE
  // ============================================================================
  "nocturnal-black-front": {
    slotKey: "nocturnal-black-front",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "FINEVERSE Nocturnal Odyssey Hoodie - Front View",
    filePath: null,
    component: <HeavyweightHoodieSVG color="pitch-black" view="front" artworkTitle="NOCTURNAL ODYSSEY" />,
  },
  "nocturnal-black-back": {
    slotKey: "nocturnal-black-back",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "FINEVERSE Nocturnal Odyssey Hoodie - Back View",
    filePath: null,
    component: <HeavyweightHoodieSVG color="pitch-black" view="back" artworkTitle="NOCTURNAL ODYSSEY" />,
  },
  "nocturnal-black-detail": {
    slotKey: "nocturnal-black-detail",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "FINEVERSE Nocturnal Odyssey Hoodie - Detail",
    filePath: null,
    component: <HeavyweightHoodieSVG color="pitch-black" view="detail" />,
  },

  // ============================================================================
  // TACTICAL FLIGHT TAG & ACCESSORIES
  // ============================================================================
  "flight-tag-acid-front": {
    slotKey: "flight-tag-acid-front",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "Void Archive Tactical Flight Tag in Acid Neon - Front",
    filePath: null,
    component: <TacticalFlightTagSVG color="acid-neon" view="front" />,
  },
  "flight-tag-acid-back": {
    slotKey: "flight-tag-acid-back",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "Void Archive Tactical Flight Tag in Acid Neon - Back",
    filePath: null,
    component: <TacticalFlightTagSVG color="acid-neon" view="back" />,
  },
  "flight-tag-acid-detail": {
    slotKey: "flight-tag-acid-detail",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "Void Archive Tactical Flight Tag in Acid Neon - Hardware Detail",
    filePath: null,
    component: <TacticalFlightTagSVG color="acid-neon" view="detail" />,
  },
  "flight-tag-violet-front": {
    slotKey: "flight-tag-violet-front",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "Void Archive Tactical Flight Tag in Cosmic Violet - Front",
    filePath: null,
    component: <TacticalFlightTagSVG color="cosmic-violet" view="front" />,
  },
  "flight-tag-violet-back": {
    slotKey: "flight-tag-violet-back",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "Void Archive Tactical Flight Tag in Cosmic Violet - Back",
    filePath: null,
    component: <TacticalFlightTagSVG color="cosmic-violet" view="back" />,
  },
  "flight-tag-violet-detail": {
    slotKey: "flight-tag-violet-detail",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "Void Archive Tactical Flight Tag in Cosmic Violet - Hardware Detail",
    filePath: null,
    component: <TacticalFlightTagSVG color="cosmic-violet" view="detail" />,
  },
  "cargo-cap-black-front": {
    slotKey: "cargo-cap-black-front",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "Constellation Cargo Dad Cap - Front 3D Embroidery",
    filePath: null,
    component: <CargoCapSVG view="front" />,
  },
  "cargo-cap-black-back": {
    slotKey: "cargo-cap-black-back",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "Constellation Cargo Dad Cap - Back Brass Slider Strap",
    filePath: null,
    component: <CargoCapSVG view="back" />,
  },
  "cargo-cap-black-detail": {
    slotKey: "cargo-cap-black-detail",
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: "Constellation Cargo Dad Cap - Stitch Detail",
    filePath: null,
    component: <CargoCapSVG view="detail" />,
  },

  // ============================================================================
  // MEDIA & SOCIAL PROOF
  // ============================================================================
  "yt-thumb-drop04": {
    slotKey: "yt-thumb-drop04",
    width: 1280,
    height: 720,
    aspectRatio: "16/9",
    alt: "Designing Drop 04 Sisters Revenge YouTube Video Behind the Scenes",
    filePath: null,
    component: <YouTubeThumbnailSVG />,
  },
  "avatar-aarav": {
    slotKey: "avatar-aarav",
    width: 100,
    height: 100,
    aspectRatio: "1/1",
    alt: "Aarav Sharma - Verified Buyer",
    filePath: null,
    component: <AvatarSVG authorName="Aarav Sharma" />,
  },
  "avatar-tanvi": {
    slotKey: "avatar-tanvi",
    width: 100,
    height: 100,
    aspectRatio: "1/1",
    alt: "Tanvi Deshmukh - Verified Buyer",
    filePath: null,
    component: <AvatarSVG authorName="Tanvi Deshmukh" />,
  },
  "avatar-rohan": {
    slotKey: "avatar-rohan",
    width: 100,
    height: 100,
    aspectRatio: "1/1",
    alt: "Rohan Malhotra - Verified Buyer",
    filePath: null,
    component: <AvatarSVG authorName="Rohan Malhotra" />,
  },
  "avatar-vikram": {
    slotKey: "avatar-vikram",
    width: 100,
    height: 100,
    aspectRatio: "1/1",
    alt: "Vikram Nambiar - Verified Buyer",
    filePath: null,
    component: <AvatarSVG authorName="Vikram Nambiar" />,
  },
};

/**
 * Helper to fetch slot definition by key safely with fallback
 */
export function getImageSlot(slotKey: string): ImageSlotDefinition {
  const slot = IMAGE_SLOT_REGISTRY[slotKey];
  if (slot) return slot;

  // Graceful fallback to avoid any layout breaks
  return {
    slotKey,
    width: 800,
    height: 1000,
    aspectRatio: "4/5",
    alt: `FINEVERSE Merch Asset (${slotKey})`,
    filePath: null,
    component: (
      <div className="w-full h-full flex items-center justify-center bg-space-900 border border-white/10 text-acid font-mono text-xs">
        {slotKey}
      </div>
    ),
  };
}
