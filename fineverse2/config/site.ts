// ==============================================================================
// FINEVERSE - BRAND CONFIGURATION (SINGLE SOURCE OF TRUTH)
// ==============================================================================
// Instructions: Fill in placeholders marked with [EDIT] with real business credentials.
// Do not invent fake business registration/tax/phone details.

export const siteConfig = {
  name: "FINEVERSE",
  tagline: "Wear The Universe",
  description:
    "Limited-drop cosmic anime streetwear and heavyweight creator merchandise crafted in India. Designed for the nocturnal aesthetic.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://fineverse.in",
  ogImage: "/images/og-image.svg",
  
  // Logistics & Store Policies
  currency: {
    code: "INR",
    symbol: "₹",
    locale: "en-IN",
  },
  
  shipping: {
    freeShippingThreshold: 1999, // Free shipping on orders over ₹1999
    standardShippingFee: 99,
    codFee: 49,
    codAvailable: true,
    estimatedDaysMin: 3,
    estimatedDaysMax: 6,
    metroEstimatedDays: "2-3 business days",
    restOfIndiaEstimatedDays: "4-6 business days",
  },

  returns: {
    windowDays: 7,
    conditions: "Unworn, unwashed with original cosmic hangtags attached.",
    nonReturnableItems: ["Limited numbered drops (Size exchanges only, subject to stock)", "Stickers & accessories"],
  },

  payment: {
    methods: ["UPI", "Debit & Credit Cards", "NetBanking", "Cash on Delivery (COD)"],
    upiApps: ["GPay", "PhonePe", "Paytm", "CRED UPI"],
    codTerms: "Available for orders under ₹5,000. Verification OTP sent prior to dispatch.",
  },

  contact: {
    supportEmail: "support@fineverse.in", // [EDIT: Replace with verified customer support email]
    businessEmail: "collabs@fineverse.in", // [EDIT: Creator collab / business email]
    phone: "+91 [EDIT: ADD PHONE NUMBER]", // [EDIT: Enter customer helpline number]
    hours: "Mon - Sat: 11:00 AM – 7:00 PM IST",
    warehouseAddress: {
      addressLine1: "[EDIT: Warehouse / Origin Facility Address Line 1]",
      city: "[EDIT: City]",
      state: "[EDIT: State]",
      pincode: "[EDIT: Pincode]",
      country: "India",
    },
  },

  socials: {
    youtube: "https://youtube.com/@[EDIT_CHANNEL_HANDLE]", // [EDIT: Creator's YouTube channel link]
    instagram: "https://instagram.com/[EDIT_HANDLE]", // [EDIT: Instagram page link]
    discord: "https://discord.gg/[EDIT_INVITE_CODE]", // [EDIT: Discord community link]
    twitter: "https://twitter.com/[EDIT_HANDLE]", // [EDIT: X / Twitter handle]
  },

  creator: {
    channelName: "[EDIT: Creator Channel Name]",
    subscriberCount: "[EDIT: e.g. 1.2M Subscribers]",
    featuredVideoId: "dQw4w9WgXcQ", // Default fallback video ID for click-to-load facade
  },

  navigation: {
    main: [
      { label: "Shop All", href: "/shop" },
      { label: "Drop 04", href: "/collections/drop-04-sisters-revenge", badge: "LIVE" },
      { label: "Collections", href: "/collections" },
      { label: "About", href: "/about" },
    ],
    footer: {
      shop: [
        { label: "All Garments", href: "/shop" },
        { label: "Oversized Tees", href: "/shop?category=oversized-tees" },
        { label: "Heavyweight Hoodies", href: "/shop?category=hoodies" },
        { label: "Drop 04 Vault", href: "/collections/drop-04-sisters-revenge" },
        { label: "Accessories & Tags", href: "/shop?category=accessories" },
      ],
      support: [
        { label: "Track Your Order", href: "/track-order" },
        { label: "Shipping Policy", href: "/policies/shipping" },
        { label: "Returns & Exchanges", href: "/policies/returns" },
        { label: "Contact Us", href: "/contact" },
        { label: "FAQ", href: "/faq" },
      ],
      legal: [
        { label: "Privacy Policy", href: "/policies/privacy" },
        { label: "Terms of Service", href: "/policies/terms" },
      ],
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
