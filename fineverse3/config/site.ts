import type { FooterColumn, NavLink } from "@/types/content";
import type { PaymentMethodId, ShippingMethodId } from "@/types/order";

/**
 * FINEVERSE: single source of truth for brand text, contact details,
 * commerce rules and navigation. Anything tagged [EDIT] is a placeholder
 * you must replace with a real value before launch.
 */

export type SocialPlatform = "youtube" | "instagram" | "x" | "facebook";

export interface SocialAccount {
  platform: SocialPlatform;
  label: string;
  /** Handle WITHOUT the @. Leave empty to hide the link everywhere. */
  handle: string;
}

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  url: string;
}

export interface ShippingMethodConfig {
  id: ShippingMethodId;
  label: string;
  description: string;
  fee: number;
  minDays: number;
  maxDays: number;
  /** Whether the free-shipping threshold applies to this method. */
  freeEligible: boolean;
}

export interface PaymentMethodConfig {
  id: PaymentMethodId;
  label: string;
  shortLabel: string;
  description: string;
  enabled: boolean;
  /** Extra fee added at checkout when this method is chosen. */
  fee: number;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  locale: string;
  currency: string;
  themeColor: string;
  /** "mock" shows sample-data labels on reviews/testimonials. */
  dataMode: "mock" | "live";
  contact: {
    supportEmail: string;
    phone: string;
    whatsapp: string;
    hours: string;
  };
  legal: {
    businessName: string;
    registeredAddress: string;
    gstin: string;
  };
  socials: SocialAccount[];
  seo: {
    titleTemplate: string;
    defaultTitle: string;
    keywords: string[];
    twitterHandle: string;
  };
  shipping: {
    freeThreshold: number;
    dispatchTime: string;
    methods: ShippingMethodConfig[];
  };
  payments: {
    methods: PaymentMethodConfig[];
  };
  policies: {
    returnWindowDays: number;
    exchangesAllowed: boolean;
    supportResponseTime: string;
  };
  catalog: {
    pageSize: number;
    lowStockThreshold: number;
    maxQtyPerLine: number;
    /** Drop is "almost gone" when remaining / total is at or below this ratio. */
    dropLowStockRatio: number;
  };
  navigation: {
    main: NavLink[];
    footer: FooterColumn[];
  };
  marquee: string[];
  copy: {
    hero: {
      headline: string;
      subheadline: string;
      primaryCta: string;
      secondaryCta: string;
    };
    brandStory: {
      eyebrow: string;
      heading: string;
      paragraphs: string[];
    };
    newsletter: {
      heading: string;
      description: string;
      cta: string;
      success: string;
    };
    youtube: {
      eyebrow: string;
      heading: string;
      description: string;
      channelCta: string;
    };
  };
}

export const siteConfig: SiteConfig = {
  name: "FINEVERSE",
  tagline: "Wear The Universe",
  description:
    "FINEVERSE is a cosmic-anime streetwear label: oversized tees, heavyweight hoodies, accessories and limited numbered drops from a YouTube creator universe.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "en-IN",
  currency: "INR",
  themeColor: "#060A15",
  dataMode: "mock",

  contact: {
    supportEmail: "support@example.com", // [EDIT] real support email
    phone: "", // [EDIT] e.g. "+91 00000 00000" (empty hides it)
    whatsapp: "", // [EDIT] digits only with country code, e.g. "919000000000"
    hours: "[EDIT] Support hours, e.g. Mon–Sat, 10am–6pm IST",
  },

  legal: {
    businessName: "[EDIT] Registered business name",
    registeredAddress: "[EDIT] Registered business address",
    gstin: "", // [EDIT] add only if applicable (empty hides it)
  },

  socials: [
    { platform: "youtube", label: "YouTube", handle: "" }, // [EDIT]
    { platform: "instagram", label: "Instagram", handle: "" }, // [EDIT]
    { platform: "x", label: "X (Twitter)", handle: "" }, // [EDIT]
    { platform: "facebook", label: "Facebook", handle: "" }, // [EDIT]
  ],

  seo: {
    titleTemplate: "%s | FINEVERSE",
    defaultTitle: "FINEVERSE | Wear The Universe",
    keywords: [
      "streetwear India",
      "oversized t-shirts",
      "heavyweight hoodies",
      "creator merch",
      "anime streetwear",
      "limited drops",
    ],
    twitterHandle: "", // [EDIT] e.g. "@yourhandle"
  },

  // All amounts are in INR and are placeholders. [EDIT]
  shipping: {
    freeThreshold: 1999, // [EDIT]
    dispatchTime: "1–2 business days", // [EDIT]
    methods: [
      {
        id: "standard",
        label: "Standard delivery",
        description: "Tracked delivery to your doorstep",
        fee: 99, // [EDIT]
        minDays: 3,
        maxDays: 6,
        freeEligible: true,
      },
      {
        id: "express",
        label: "Express delivery",
        description: "Priority dispatch and faster transit",
        fee: 199, // [EDIT]
        minDays: 1,
        maxDays: 3,
        freeEligible: false,
      },
    ],
  },

  // Payment messaging everywhere is generated from this list.
  payments: {
    methods: [
      {
        id: "upi",
        label: "UPI",
        shortLabel: "UPI",
        description: "Pay with any UPI app",
        enabled: true,
        fee: 0,
      },
      {
        id: "card",
        label: "Credit / Debit card",
        shortLabel: "Cards",
        description: "Visa, Mastercard, RuPay",
        enabled: true,
        fee: 0,
      },
      {
        id: "cod",
        label: "Cash on Delivery",
        shortLabel: "Cash on Delivery",
        description: "Pay when your order arrives",
        enabled: true,
        fee: 0, // [EDIT] COD handling fee, if any
      },
    ],
  },

  policies: {
    returnWindowDays: 7, // [EDIT]
    exchangesAllowed: true, // [EDIT]
    supportResponseTime: "within 1–2 business days", // [EDIT]
  },

  catalog: {
    pageSize: 8,
    lowStockThreshold: 5,
    maxQtyPerLine: 10,
    dropLowStockRatio: 0.2,
  },

  navigation: {
    main: [
      { label: "Shop", href: "/shop" },
      { label: "Collections", href: "/collections" },
      { label: "Oversized", href: "/shop?category=oversized-tees" },
      { label: "Hoodies", href: "/shop?category=hoodies" },
      { label: "About", href: "/about" },
    ],
    footer: [
      {
        title: "Shop",
        links: [
          { label: "All products", href: "/shop" },
          { label: "Collections", href: "/collections" },
          { label: "Oversized tees", href: "/shop?category=oversized-tees" },
          { label: "Hoodies", href: "/shop?category=hoodies" },
          { label: "Accessories", href: "/shop?category=accessories" },
          { label: "Wishlist", href: "/wishlist" },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "Track order", href: "/track-order" },
          { label: "Shipping", href: "/policies/shipping" },
          { label: "Returns & exchanges", href: "/policies/returns" },
          { label: "FAQ", href: "/faq" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Privacy policy", href: "/policies/privacy" },
          { label: "Terms of service", href: "/policies/terms" },
          { label: "My account", href: "/account" },
        ],
      },
    ],
  },

  marquee: ["WEAR THE UNIVERSE", "LIMITED NUMBERED DROPS", "OVERSIZED FITS", "FINEVERSE"],

  copy: {
    hero: {
      headline: "Wear The Universe",
      subheadline:
        "Oversized tees, heavyweight hoodies and limited numbered drops from the FINEVERSE creator universe.",
      primaryCta: "Shop the drop",
      secondaryCta: "Browse all",
    },
    brandStory: {
      eyebrow: "The story",
      heading: "Born on YouTube. Built for the universe.",
      paragraphs: [
        "FINEVERSE is the streetwear label of a YouTube creator community: oversized silhouettes, cosmic-anime graphics and numbered drops.",
        "[EDIT] Add your real origin story here: who designs the drops, what the community means to you, and why it exists.",
      ],
    },
    newsletter: {
      heading: "Join the whitelist",
      description: "Get early access to drops before they go public. No spam.",
      cta: "Join the whitelist",
      success: "You're on the list. Watch your inbox.",
    },
    youtube: {
      eyebrow: "On the channel",
      heading: "Watch the universe unfold",
      description: "Drop reveals, behind-the-print breakdowns and unboxings.",
      channelCta: "Visit the channel",
    },
  },
};

/* ───────────── helpers derived from the config ───────────── */

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${siteConfig.url}/`).toString();
}

const SOCIAL_URL_BUILDERS: Record<SocialPlatform, (handle: string) => string> = {
  youtube: (h) => `https://www.youtube.com/@${h}`,
  instagram: (h) => `https://www.instagram.com/${h}`,
  x: (h) => `https://x.com/${h}`,
  facebook: (h) => `https://www.facebook.com/${h}`,
};

/** Only accounts with a real handle are returned, so no dead links ship. */
export function getSocialLinks(): SocialLink[] {
  return siteConfig.socials
    .map((account) => ({ ...account, handle: account.handle.trim().replace(/^@/, "") }))
    .filter((account) => account.handle.length > 0)
    .map((account) => ({
      platform: account.platform,
      label: account.label,
      url: SOCIAL_URL_BUILDERS[account.platform](account.handle),
    }));
}

export function getSocialUrl(platform: SocialPlatform): string | null {
  return getSocialLinks().find((link) => link.platform === platform)?.url ?? null;
}