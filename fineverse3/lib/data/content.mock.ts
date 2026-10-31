import { siteConfig } from "@/config/site";
import { joinList } from "@/lib/format";
import { freeShippingMessage, isCodEnabled, paymentMessage } from "@/lib/shipping";
import type { FaqItem, SizeChart, Testimonial, VideoItem } from "@/types/content";
import type { AvatarVariant, ThumbnailVariant } from "@/types/image";
import type { CategoryId } from "@/types/product";

/** Flag for the home-page testimonials. [EDIT] set to false only with real quotes. */
export const IS_MOCK_TESTIMONIALS = true;

/* ───────────── testimonials (MOCK) ───────────── */

export type TestimonialRecord = Omit<Testimonial, "avatar"> & { avatarVariant: AvatarVariant };

export const testimonialRecords: TestimonialRecord[] = [
  {
    id: "t_001",
    name: "Aarav S.",
    role: "Sample customer",
    quote: "The oversized fit and the back print are exactly what I wanted from a creator drop.",
    rating: 5,
    avatarVariant: "orbit",
    isMock: true,
  },
  {
    id: "t_002",
    name: "Riya M.",
    role: "Sample customer",
    quote: "Colours look even better in person. The acid tee is impossible to miss.",
    rating: 5,
    avatarVariant: "comet",
    isMock: true,
  },
  {
    id: "t_003",
    name: "Dev K.",
    role: "Sample customer",
    quote: "Heavy hoodie, clean print, easy checkout. Already waiting for the next drop.",
    rating: 4,
    avatarVariant: "nebula",
    isMock: true,
  },
];

/* ───────────── videos ───────────── */

export type VideoRecord = Omit<VideoItem, "thumbnail"> & { thumbnailVariant: ThumbnailVariant };

/**
 * [EDIT] Paste real YouTube video IDs into `youtubeId` (the part after v=).
 * While it is null, the card links to your channel instead of loading a player.
 * Titles are placeholders. Replace them with your real video titles.
 */
export const videoRecords: VideoRecord[] = [
  {
    id: "v_001",
    title: "Drop reveal: Sisters Revenge",
    description: "First look at the numbered drop.",
    youtubeId: null,
    thumbnailVariant: "drop-reveal",
  },
  {
    id: "v_002",
    title: "Behind the print",
    description: "How the artwork goes from sketch to garment.",
    youtubeId: null,
    thumbnailVariant: "behind-the-print",
  },
  {
    id: "v_003",
    title: "Unboxing the drop",
    description: "Everything that ships in the drop, up close.",
    youtubeId: null,
    thumbnailVariant: "unboxing",
  },
];

/* ───────────── FAQs (answers are generated from config, never hardcoded) ───────────── */

function shippingSpeedSentence(): string {
  const parts = siteConfig.shipping.methods.map(
    (method) => `${method.label.toLowerCase()} takes ${method.minDays}–${method.maxDays} days`,
  );
  return `${joinList(parts)}.`;
}

function codAnswer(): string {
  if (!isCodEnabled()) return "Cash on Delivery is not available at the moment.";
  const fee = siteConfig.payments.methods.find((method) => method.id === "cod")?.fee ?? 0;
  return fee > 0
    ? `Yes. Cash on Delivery is available with a handling fee of ₹${fee}.`
    : "Yes. Cash on Delivery is available at no extra charge.";
}

function returnsAnswer(): string {
  const days = siteConfig.policies.returnWindowDays;
  const exchange = siteConfig.policies.exchangesAllowed
    ? "Returns and exchanges are accepted"
    : "Returns are accepted";
  return `${exchange} within ${days} days of delivery for eligible items. See the Returns & exchanges page for the full policy.`;
}

export const faqRecords: FaqItem[] = [
  {
    id: "f_001",
    category: "orders",
    question: "How do I track my order?",
    answer:
      "Open the Track order page and enter your order number with the email or mobile number used at checkout.",
  },
  {
    id: "f_002",
    category: "orders",
    question: "Can I change or cancel my order?",
    answer: `Write to ${siteConfig.contact.supportEmail} as soon as possible with your order number. [EDIT] Add your exact cancellation rules.`,
  },
  {
    id: "f_003",
    category: "shipping",
    question: "How long does delivery take?",
    answer: `Orders are dispatched in ${siteConfig.shipping.dispatchTime}. After dispatch, ${shippingSpeedSentence()}`,
  },
  {
    id: "f_004",
    category: "shipping",
    question: "Is shipping free?",
    answer: `${freeShippingMessage()}. Below that amount a delivery fee applies and is shown at checkout.`,
  },
  {
    id: "f_005",
    category: "returns",
    question: "What is your return policy?",
    answer: returnsAnswer(),
  },
  {
    id: "f_006",
    category: "payments",
    question: "Which payment methods do you accept?",
    answer: `We accept ${paymentMessage()}.`,
  },
  {
    id: "f_007",
    category: "payments",
    question: "Is Cash on Delivery available?",
    answer: codAnswer(),
  },
  {
    id: "f_008",
    category: "products",
    question: "How do I choose my size?",
    answer:
      "Every product page has a size guide with garment measurements. Oversized pieces are cut roomy, so take your usual size for the intended look.",
  },
  {
    id: "f_009",
    category: "products",
    question: "What are the fabric and GSM of each piece?",
    answer:
      "Fabric and GSM are listed on each product page under Fabric & specs, so you always see the exact details for the item you are viewing.",
  },
  {
    id: "f_010",
    category: "products",
    question: "What is a drop?",
    answer:
      "A drop is a limited, numbered release available for a set window or until stock runs out. The countdown and the remaining-stock count are calculated from live inventory data.",
  },
];

/* ───────────── size charts (MOCK measurements) ───────────── */

const SIZE_NOTE =
  "Sample garment measurements in inches. [EDIT] Replace with your real measurements before launch.";

export const sizeCharts: Partial<Record<CategoryId, SizeChart>> = {
  tees: {
    id: "tees",
    title: "Tees: regular fit",
    note: SIZE_NOTE,
    rows: [
      { size: "S", chest: 38, length: 27, shoulder: 17 },
      { size: "M", chest: 40, length: 28, shoulder: 17.5 },
      { size: "L", chest: 42, length: 29, shoulder: 18.5 },
      { size: "XL", chest: 44, length: 30, shoulder: 19.5 },
      { size: "XXL", chest: 46, length: 31, shoulder: 20.5 },
    ],
  },
  "oversized-tees": {
    id: "oversized-tees",
    title: "Oversized tees",
    note: SIZE_NOTE,
    rows: [
      { size: "S", chest: 44, length: 28, shoulder: 21 },
      { size: "M", chest: 46, length: 29, shoulder: 22 },
      { size: "L", chest: 48, length: 30, shoulder: 23 },
      { size: "XL", chest: 50, length: 31, shoulder: 24 },
      { size: "XXL", chest: 52, length: 32, shoulder: 25 },
    ],
  },
  hoodies: {
    id: "hoodies",
    title: "Hoodies: boxy fit",
    note: SIZE_NOTE,
    rows: [
      { size: "S", chest: 42, length: 26, shoulder: 20 },
      { size: "M", chest: 44, length: 27, shoulder: 21 },
      { size: "L", chest: 46, length: 28, shoulder: 22 },
      { size: "XL", chest: 48, length: 29, shoulder: 23 },
      { size: "XXL", chest: 50, length: 30, shoulder: 24 },
    ],
  },
};