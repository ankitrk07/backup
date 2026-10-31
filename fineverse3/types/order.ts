export const SHIPPING_METHOD_IDS = ["standard", "express"] as const;
export type ShippingMethodId = (typeof SHIPPING_METHOD_IDS)[number];

export const PAYMENT_METHOD_IDS = ["upi", "card", "cod"] as const;
export type PaymentMethodId = (typeof PAYMENT_METHOD_IDS)[number];

export type OrderStatus =
  | "placed"
  | "packed"
  | "shipped"
  | "out-for-delivery"
  | "delivered"
  | "cancelled";

export interface OrderTotals {
  subtotal: number;
  shipping: number;
  paymentFee: number;
  total: number;
  savings: number;
}

export interface OrderLine {
  slug: string;
  name: string;
  colorId: string;
  colorName: string;
  size: string;
  quantity: number;
  unitPrice: number;
}

export interface PlacedOrder {
  id: string;
  placedAt: string;
  email: string;
  fullName: string;
  addressLines: string[];
  lines: OrderLine[];
  totals: OrderTotals;
  shippingMethod: ShippingMethodId;
  paymentMethod: PaymentMethodId;
}

export interface TrackingEvent {
  status: OrderStatus;
  label: string;
  timestamp: string;
  note?: string;
}

export interface TrackingResult {
  orderId: string;
  status: OrderStatus;
  events: TrackingEvent[];
  estimatedDelivery: string | null;
  isMock: boolean;
}

export interface OrderSummary {
  id: string;
  placedAt: string;
  status: OrderStatus;
  total: number;
  itemCount: number;
}