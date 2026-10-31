export interface Collection {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  imageSlotKey: string;
  productCount: number;
  featured: boolean;
  dropNumber?: number;
}
