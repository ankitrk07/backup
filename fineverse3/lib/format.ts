import { siteConfig } from "@/config/site";

const TIME_ZONE = "Asia/Kolkata";

const currencyFormatter = new Intl.NumberFormat(siteConfig.locale, {
  style: "currency",
  currency: siteConfig.currency,
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat(siteConfig.locale, {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: TIME_ZONE,
});

const shortDateFormatter = new Intl.DateTimeFormat(siteConfig.locale, {
  day: "numeric",
  month: "short",
  timeZone: TIME_ZONE,
});

const dateTimeFormatter = new Intl.DateTimeFormat(siteConfig.locale, {
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: TIME_ZONE,
});

type DateInput = string | number | Date;

export function formatINR(amount: number): string {
  return currencyFormatter.format(amount);
}

export function formatDate(value: DateInput): string {
  return dateFormatter.format(new Date(value));
}

export function formatShortDate(value: DateInput): string {
  return shortDateFormatter.format(new Date(value));
}

/** Always rendered in IST so server and client output match. */
export function formatDateTime(value: DateInput): string {
  return `${dateTimeFormatter.format(new Date(value))} IST`;
}

export function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return count === 1 ? singular : plural;
}

/** ["a","b","c"] -> "a, b and c" */
export function joinList(items: readonly string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}