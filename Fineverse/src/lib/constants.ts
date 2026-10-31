export const siteConfig = {
  name: "Fineverse",
  tagline: "Electronics. Fashion. Toys. All premium.",
  description:
    "Fineverse is a premium destination for electronics, fashion, and toys — curated quality, fast delivery, and prices you'll love.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  supportEmail: "support@fineverse.example",
  supportPhone: "+91 1800 123 4567",
}

export type NavCategory = {
  label: string
  href: string
  description: string
  subcategories: { label: string; href: string }[]
}

export const navCategories: NavCategory[] = [
  {
    label: "Electronics",
    href: "/electronics",
    description: "Phones, laptops, audio, wearables & more",
    subcategories: [
      { label: "Smartphones", href: "/electronics?sub=smartphones" },
      { label: "Laptops", href: "/electronics?sub=laptops" },
      { label: "Gadgets", href: "/electronics?sub=gadgets" },
      { label: "Headphones", href: "/electronics?sub=headphones" },
      { label: "Smart Watches", href: "/electronics?sub=smart-watches" },
      { label: "Speakers", href: "/electronics?sub=speakers" },
      { label: "Accessories", href: "/electronics?sub=accessories" },
    ],
  },
  {
    label: "Fashion",
    href: "/fashion",
    description: "Everyday essentials to statement pieces",
    subcategories: [
      { label: "Boys", href: "/fashion?sub=boys" },
      { label: "Women", href: "/fashion?sub=women" },
      { label: "Kids", href: "/fashion?sub=kids" },
    ],
  },
  {
    label: "Toys",
    href: "/toys",
    description: "Play, learn, and grow",
    subcategories: [
      { label: "Remote Control", href: "/toys?sub=remote-control" },
      { label: "Building Blocks", href: "/toys?sub=building-blocks" },
      { label: "Action Figures", href: "/toys?sub=action-figures" },
      { label: "Educational", href: "/toys?sub=educational" },
      { label: "Board Games", href: "/toys?sub=board-games" },
      { label: "Soft Toys", href: "/toys?sub=soft-toys" },
    ],
  },
]

export const footerLinks = {
  shop: [
    { label: "All Products", href: "/products" },
    { label: "Electronics", href: "/electronics" },
    { label: "Fashion", href: "/fashion" },
    { label: "Toys", href: "/toys" },
    { label: "Deals", href: "/products?discount=true" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Track Order", href: "/account/orders" },
    { label: "Returns & Refunds", href: "/faq#returns" },
  ],
  company: [
    { label: "About Fineverse", href: "/about" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
}

export const popularSearches = [
  "Wireless headphones",
  "Running shoes",
  "Smart watch",
  "Building blocks",
  "Denim jacket",
  "Bluetooth speaker",
]
