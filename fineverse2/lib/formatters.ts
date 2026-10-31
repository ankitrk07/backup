import { siteConfig } from "@/config/site";

/**
 * Formats a numeric price into localized Indian Rupee currency format (e.g., ₹1,499)
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat(siteConfig.currency.locale, {
    style: "currency",
    currency: siteConfig.currency.code,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Formats an ISO date string into readable drop date (e.g., "15 Nov 2026")
 */
export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(isoDate));
}

/**
 * Calculates percentage discount between regular price and compareAt price
 */
export function calculateDiscount(price: number, compareAtPrice?: number): number {
  if (!compareAtPrice || compareAtPrice <= price) return 0;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

/**
 * Validates 6-digit Indian Postal PIN codes
 */
export function isValidIndianPincode(pincode: string): boolean {
  return /^[1-9][0-9]{5}$/.test(pincode.trim());
}
