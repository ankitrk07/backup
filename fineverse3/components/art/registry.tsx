import type { ReactElement } from "react";
import type { ArtRef, GarmentKind } from "@/types/image";
import { CapArt } from "./garments/cap-art";
import { FlightTagArt } from "./garments/flight-tag-art";
import { HoodieArt } from "./garments/hoodie-art";
import { OversizedTeeArt } from "./garments/oversized-tee-art";
import { StickerPackArt } from "./garments/sticker-pack-art";
import { TeeArt } from "./garments/tee-art";
import { LogoMarkArt } from "./logo-mark";
import type { GarmentArtProps } from "./primitives";
import { AvatarArt } from "./scenes/avatar-art";
import { CategoryArt } from "./scenes/category-art";
import { CollectionBannerArt } from "./scenes/collection-banner-art";
import { DropBannerArt } from "./scenes/drop-banner-art";
import { HeroArt } from "./scenes/hero-art";
import { ThumbnailArt } from "./scenes/thumbnail-art";

const GARMENT_COMPONENTS: Record<GarmentKind, (props: GarmentArtProps) => ReactElement> = {
  tee: TeeArt,
  "oversized-tee": OversizedTeeArt,
  hoodie: HoodieArt,
  cap: CapArt,
  "sticker-pack": StickerPackArt,
  "flight-tag": FlightTagArt,
};

/**
 * Deterministic id prefix for every SVG id inside one artwork.
 * Identical artwork always gets the same prefix, so duplicates on one page are harmless.
 */
export function getArtUid(art: ArtRef): string {
  switch (art.type) {
    case "garment":
      return `fv-${art.garment}-${art.color}-${art.view}-${art.graphic}`;
    case "hero":
      return "fv-hero";
    case "logo":
      return "fv-logo";
    case "category":
      return `fv-cat-${art.category}`;
    case "collection-banner":
      return `fv-col-${art.collection}`;
    case "drop-banner":
      return `fv-drop-${art.drop}`;
    case "thumbnail":
      return `fv-thumb-${art.variant}`;
    case "avatar":
      return `fv-avatar-${art.variant}`;
  }
}

interface ArtRendererProps {
  art: ArtRef;
  label: string;
}

export function ArtRenderer({ art, label }: ArtRendererProps): ReactElement {
  const uid = getArtUid(art);

  switch (art.type) {
    case "garment": {
      const Garment = GARMENT_COMPONENTS[art.garment];
      return (
        <Garment uid={uid} color={art.color} view={art.view} graphic={art.graphic} label={label} />
      );
    }
    case "hero":
      return <HeroArt uid={uid} label={label} />;
    case "logo":
      return <LogoMarkArt label={label} />;
    case "category":
      return <CategoryArt uid={uid} category={art.category} label={label} />;
    case "collection-banner":
      return <CollectionBannerArt uid={uid} collection={art.collection} label={label} />;
    case "drop-banner":
      return <DropBannerArt uid={uid} drop={art.drop} label={label} />;
    case "thumbnail":
      return <ThumbnailArt uid={uid} variant={art.variant} label={label} />;
    case "avatar":
      return <AvatarArt uid={uid} variant={art.variant} label={label} />;
  }
}