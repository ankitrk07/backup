import type { ColorId, ProductColor } from "@/types/product";

/** Colours used by the generated SVG garments. */
export interface GarmentPalette {
  body: string;
  shade: string;
  highlight: string;
  rim: string;
  /** main print colour (must contrast with body) */
  ink: string;
  inkSoft: string;
  accent: string;
}

export interface ColorDefinition {
  id: ColorId;
  name: string;
  hex: string;
  palette: GarmentPalette;
}

/** Single source for colour names, swatches and artwork colours. */
export const COLOR_CATALOG: Record<ColorId, ColorDefinition> = {
  "cosmic-pitch-black": {
    id: "cosmic-pitch-black",
    name: "Cosmic Pitch Black",
    hex: "#141722",
    palette: {
      body: "#141722",
      shade: "#0C0E17",
      highlight: "#242A40",
      rim: "#39415F",
      ink: "#F4F6FC",
      inkSoft: "#A8B0C6",
      accent: "#C6FF3D",
    },
  },
  "interstellar-acid": {
    id: "interstellar-acid",
    name: "Interstellar Acid",
    hex: "#C6FF3D",
    palette: {
      body: "#C6FF3D",
      shade: "#9FD126",
      highlight: "#E1FF8F",
      rim: "#EEFFB8",
      ink: "#0B0E17",
      inkSoft: "#2B3347",
      accent: "#7C3AED",
    },
  },
  "nebula-violet": {
    id: "nebula-violet",
    name: "Nebula Violet",
    hex: "#6D3AD6",
    palette: {
      body: "#6D3AD6",
      shade: "#4E24A8",
      highlight: "#9468F0",
      rim: "#B79BF7",
      ink: "#F4F6FC",
      inkSoft: "#D7CBFA",
      accent: "#C6FF3D",
    },
  },
  "stardust-bone": {
    id: "stardust-bone",
    name: "Stardust Bone",
    hex: "#E9E4D8",
    palette: {
      body: "#E9E4D8",
      shade: "#CDC6B4",
      highlight: "#F8F5EC",
      rim: "#FFFFFF",
      ink: "#0B0E17",
      inkSoft: "#434B63",
      accent: "#7C3AED",
    },
  },
};

export function getPalette(id: ColorId): GarmentPalette {
  return COLOR_CATALOG[id].palette;
}

export function toProductColor(id: ColorId): ProductColor {
  const { name, hex } = COLOR_CATALOG[id];
  return { id, name, hex };
}