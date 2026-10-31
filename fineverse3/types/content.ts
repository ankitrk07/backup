import type { ImageSlot } from "./image";

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: 1 | 2 | 3 | 4 | 5;
  avatar: ImageSlot;
  isMock: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  /** null until you add a real YouTube video ID. The facade then links to the channel. */
  youtubeId: string | null;
  thumbnail: ImageSlot;
}

export type FaqCategory = "orders" | "shipping" | "returns" | "payments" | "products";

export interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
}

export interface SizeChartRow {
  size: string;
  /** Measurements in inches */
  chest: number;
  length: number;
  shoulder: number;
}

export interface SizeChart {
  id: string;
  title: string;
  note: string;
  rows: SizeChartRow[];
}

export interface SearchResult {
  id: string;
  type: "product" | "collection" | "page";
  title: string;
  subtitle?: string;
  href: string;
  image?: ImageSlot;
}