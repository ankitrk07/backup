import {
  siteConfig,
  type PaymentMethodConfig,
  type ShippingMethodConfig,
} from "@/config/site";
import { formatINR, formatShortDate, joinList } from "@/lib/format";
import type {
  OrderTotals,
  PaymentMethodId,
  ShippingMethodId,
} from "@/types/order";

/* ───────────── shipping ───────────── */

export function getShippingMethod(id: ShippingMethodId): ShippingMethodConfig {
  return (
    siteConfig.shipping.methods.find((method) => method.id === id) ?? siteConfig.shipping.methods[0]
  );
}

export function getShippingFee(subtotal: number, methodId: ShippingMethodId): number {
  if (subtotal <= 0) return 0;
  const method = getShippingMethod(methodId);
  if (method.freeEligible && subtotal >= siteConfig.shipping.freeThreshold) return 0;
  return method.fee;
}

export interface FreeShippingProgress {
  threshold: number;
  remaining: number;
  percent: number;
  unlocked: boolean;
}

export function getFreeShippingProgress(subtotal: number): FreeShippingProgress {
  const threshold = siteConfig.shipping.freeThreshold;
  const remaining = Math.max(0, threshold - subtotal);
  const percent = threshold <= 0 ? 100 : Math.min(100, Math.round((subtotal / threshold) * 100));
  return { threshold, remaining, percent, unlocked: remaining === 0 };
}

export function freeShippingMessage(): string {
  return `Free shipping on orders above ${formatINR(siteConfig.shipping.freeThreshold)}`;
}

/* ───────────── payments ───────────── */

export function getEnabledPaymentMethods(): PaymentMethodConfig[] {
  return siteConfig.payments.methods.filter((method) => method.enabled);
}

export function getPaymentFee(id: PaymentMethodId): number {
  return getEnabledPaymentMethods().find((method) => method.id === id)?.fee ?? 0;
}

/** e.g. "UPI, Cards and Cash on Delivery". Used everywhere payment is mentioned. */
export function paymentMessage(): string {
  return joinList(getEnabledPaymentMethods().map((method) => method.shortLabel));
}

export function isCodEnabled(): boolean {
  return getEnabledPaymentMethods().some((method) => method.id === "cod");
}

/* ───────────── totals ───────────── */

interface TotalsInput {
  subtotal: number;
  /** subtotal at compare-at prices, used to show savings */
  compareAtSubtotal?: number;
  shippingMethod: ShippingMethodId;
  paymentMethod: PaymentMethodId;
}

export function calculateOrderTotals(input: TotalsInput): OrderTotals {
  const shipping = getShippingFee(input.subtotal, input.shippingMethod);
  const paymentFee = input.subtotal > 0 ? getPaymentFee(input.paymentMethod) : 0;
  const savings = Math.max(0, (input.compareAtSubtotal ?? input.subtotal) - input.subtotal);
  return {
    subtotal: input.subtotal,
    shipping,
    paymentFee,
    total: input.subtotal + shipping + paymentFee,
    savings,
  };
}

/* ───────────── delivery estimate (MOCK) ───────────── */

export type DeliveryEstimate =
  | { serviceable: false; message: string }
  | {
      serviceable: true;
      minDays: number;
      maxDays: number;
      label: string;
      codAvailable: boolean;
    };

const DAY_MS = 86_400_000;

// MOCK zone logic based on the first PIN digit. [EDIT] Replace with a courier API.
const EXTRA_DAYS_BY_FIRST_DIGIT: Record<string, number> = { "7": 1, "8": 1 };

export function estimateDelivery(
  pincode: string,
  methodId: ShippingMethodId,
  from: Date = new Date(),
): DeliveryEstimate {
  if (!/^[1-9]\d{5}$/.test(pincode)) {
    return { serviceable: false, message: "Enter a valid 6-digit PIN code." };
  }
  if (pincode.startsWith("9")) {
    return { serviceable: false, message: "We can't deliver to this PIN code yet." };
  }
  const method = getShippingMethod(methodId);
  const extra = EXTRA_DAYS_BY_FIRST_DIGIT[pincode.charAt(0)] ?? 0;
  const minDays = method.minDays + extra;
  const maxDays = method.maxDays + extra;
  const earliest = new Date(from.getTime() + minDays * DAY_MS);
  const latest = new Date(from.getTime() + maxDays * DAY_MS);
  return {
    serviceable: true,
    minDays,
    maxDays,
    label: `Delivery by ${formatShortDate(earliest)} to ${formatShortDate(latest)}`,
    codAvailable: isCodEnabled(),
  };
}