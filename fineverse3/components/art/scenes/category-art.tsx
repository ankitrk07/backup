import type { GarmentArtProps } from "../primitives";
import type { CategoryId } from "@/types/product";
import { CapArt } from "../garments/cap-art";
import { HoodieArt } from "../garments/hoodie-art";
import { OversizedTeeArt } from "../garments/oversized-tee-art";
import { TeeArt } from "../garments/tee-art";

interface CategoryArtProps {
  uid: string;
  category: CategoryId;
  label: string;
}

/**
 * 800 x 1000 (4:5). Category tiles reuse the garment artwork with a hero
 * colour and graphic per category, so there is no duplicated drawing code.
 */
export function CategoryArt({ uid, category, label }: CategoryArtProps) {
  const base = { uid, label };

  const props = (
    color: GarmentArtProps["color"],
    view: GarmentArtProps["view"],
    graphic: GarmentArtProps["graphic"],
  ): GarmentArtProps => ({ ...base, color, view, graphic });

  switch (category) {
    case "oversized-tees":
      return <OversizedTeeArt {...props("interstellar-acid", "back", "sisters-revenge")} />;
    case "hoodies":
      return <HoodieArt {...props("nebula-violet", "front", "planet-x")} />;
    case "tees":
      return <TeeArt {...props("stardust-bone", "front", "wear-the-universe")} />;
    case "accessories":
      return <CapArt {...props("cosmic-pitch-black", "front", "logo-mark")} />;
  }
}