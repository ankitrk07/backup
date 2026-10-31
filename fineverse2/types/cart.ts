import { GarmentSize, ProductColorVariant } from "./product";

export interface CartItem {
  id: string; // Composite unique key: `${productId}-${colorSlug}-${size}`
  productId: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  gsm: number;
  color: ProductColorVariant;
  size: GarmentSize;
  quantity: number;
  maxStock: number;
  imageSlotKey: string;
}

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  hasFreeShipping: boolean;
  freeShippingProgress: number; // 0 to 100 percentage
}
