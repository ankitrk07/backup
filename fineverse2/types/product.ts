export type ProductCategory = "oversized-tees" | "hoodies" | "accessories" | "headwear";

export type GarmentFit = "Boxy Oversized" | "Relaxed Streetwear" | "Drop Shoulder" | "Standard Heavyweight";

export type FabricComposition =
  | "100% Combed Compact Cotton (Super Combed Single Jersey)"
  | "100% Heavyweight Cotton French Terry (Loopback, 420 GSM)"
  | "Cotton Twill / Reinforced Canvas"
  | "High-Density Woven Polyester & Alloy Hardware";

export interface ProductColorVariant {
  name: string;        // e.g. "Pitch Void Black", "Acid Volt", "Cosmic Violet"
  hex: string;         // e.g. "#050508", "#CCFF00", "#8B5CF6"
  slug: string;        // e.g. "pitch-black", "acid-volt"
}

export type GarmentSize = "XS" | "S" | "M" | "L" | "XL" | "2XL" | "ONE SIZE";

export interface SizeStock {
  size: GarmentSize;
  stock: number; // Stock count for this specific size
  isAvailable: boolean;
}

export interface ProductImageSlot {
  slotKey: string;     // Unique identifier matching lib/images.ts (e.g. "sisters-revenge-black-front")
  colorSlug: string;   // Associated color variant
  view: "front" | "back" | "detail";
  alt: string;
  width: number;
  height: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  description: string;
  details: string[];    // Spec bullet points
  careInstructions: string[];
  category: ProductCategory;
  collectionSlug: string;
  dropId?: string;      // Optional associated drop ID
  price: number;        // In INR (e.g. 1499)
  compareAtPrice?: number; // In INR for strikethrough discount (e.g. 1999)
  discountPercent?: number; // Derived/calculated
  gsm: number;          // Exact GSM (e.g. 240 for tees, 420 for hoodies)
  fabric: FabricComposition;
  fit: GarmentFit;
  colors: ProductColorVariant[];
  sizes: SizeStock[];
  images: ProductImageSlot[];
  tags: string[];       // e.g. ["Flagship", "Heavyweight", "Drop 04", "Anime"]
  rating: {
    average: number;
    count: number;
  };
  isNewArrival?: boolean;
  isFeatured?: boolean;
  isLimitedDrop?: boolean;
  createdAt: string;    // ISO timestamp
}

export interface ProductFilterParams {
  category?: ProductCategory;
  collection?: string;
  drop?: string;
  size?: GarmentSize;
  color?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "featured" | "price-asc" | "price-desc" | "newest" | "rating";
  search?: string;
}
