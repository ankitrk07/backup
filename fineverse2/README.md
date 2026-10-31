# FINEVERSE ("Wear The Universe")

> **Production-Grade Frontend for Creator Anime Streetwear & Limited Numbered Drops**  
> Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide Icons, and Zustand.

---

## 🌌 Brand & Architecture Overview

FINEVERSE is an Indian creator anime streetwear brand engineered around heavyweight luxury silhouettes (240 GSM compact cotton tees and 420 GSM French Terry hoodies) produced in Tirupur, Tamil Nadu. The store is designed around a strictly numbered "capsule drop" distribution model (featuring Drop 04 "Sisters Revenge").

### Key Architectural Strengths
- **Zero Stock Placeholders**: Comes with custom, responsive SVG vector artwork renderers (`GarmentArtworks.tsx`, `GraphicBanners.tsx`) rendering front, back, detail, and model perspectives out of the box with zero external CDN dependencies.
- **Strict Brand Consistency**: Zero conflicting GSM claims or contradictory shipping/COD policies. All tees are strictly 240 GSM (100% Super Combed Compact Cotton, Single Jersey); all hoodies are strictly 420 GSM (100% Cotton French Terry loopback). Free shipping threshold is uniformly fixed across the whole codebase at ₹1,999.
- **Bulletproof State Management**: SSR-safe, persisted Zustand stores for Cart (`useCartStore`) and Vaulted Wishlist (`useWishlistStore`) with drawer synchronization, live price totals, and threshold-based free delivery progress.
- **Dynamic Drop Mechanics**: Drop countdowns, remaining allocation counters (`totalUnitsAllocated - unitsClaimed`), and status badges are computed client-side in real-time.
- **Performance First**: Zero Cumulative Layout Shift (CLS) through fixed aspect ratio containers (4:5 garment drapes, 16:9 cinematic video facades). YouTube embedded video uses an interactive click-to-load facade that executes zero external scripts until user interaction.

---

## 📁 Repository Directory Map

```text
fineverse2/
├── app/
│   ├── about/page.tsx               # Brand manifesto, Tirupur craftsmanship & origins
│   ├── account/page.tsx             # Collector profile, order history, VIP badge & demo auth
│   ├── cart/page.tsx                # Dedicated cart view with order breakdown & upsell triggers
│   ├── checkout/page.tsx            # Zod-validated 2-step checkout (Address, UPI, Card, COD)
│   ├── collections/
│   │   ├── page.tsx                 # Collections directory (Drop 04, Cyber Samurai, etc.)
│   │   └── [slug]/page.tsx          # Dynamic collection catalog with live filters
│   ├── contact/page.tsx             # Support ticketing desk, WhatsApp link, Discord invite
│   ├── faq/page.tsx                 # Categorized accordion FAQ (GSM, Drops, COD, Size Swaps)
│   ├── order/
│   │   └── confirmation/page.tsx    # Confetti celebration order receipt with AWB & print
│   ├── policies/
│   │   ├── privacy/page.tsx         # DPDP Act (India) compliant privacy policy
│   │   ├── returns/page.tsx         # 7-day size swap & unboxing video policy
│   │   ├── shipping/page.tsx        # Free ₹1,999 shipping rules & Tirupur air speeds
│   │   └── terms/page.tsx           # Anti-bot allocation limits & GST legal agreement
│   ├── shop/
│   │   ├── page.tsx                 # Full catalog with URL parameter search/filter/sort
│   │   └── [slug]/page.tsx          # PDP with gallery, size guide, and stock meter
│   ├── track-order/page.tsx         # Live radar tracker (AWB, Tirupur checkpoints & GPS)
│   ├── wishlist/page.tsx            # Vaulted pieces with quick move-to-bag & size selection
│   ├── error.tsx                    # App router error boundary with retry trigger
│   ├── globals.css                  # Custom design tokens, glassmorphism, marquee & animations
│   ├── layout.tsx                   # Root HTML shell, font declarations, Command Palette & Cart Drawer
│   ├── loading.tsx                  # High-tech branded loading state
│   ├── not-found.tsx                # Atmospheric 404 page ("Lost in the Fineverse")
│   ├── page.tsx                     # Flagship homepage with 11 cinematic sections
│   ├── robots.ts                    # Search engine crawl directives
│   └── sitemap.ts                   # Dynamic sitemap generator for all products & collections
├── components/
│   ├── home/                        # Hero, Marquee, Flagship Spotlight, Drop Countdown, etc.
│   ├── placeholders/                # GarmentArtworks, GraphicBanners, MediaThumbnails
│   ├── product/                     # ProductGallery, SizeGuideModal, StickyMobileCTA, etc.
│   ├── shell/                       # Header, AnnouncementBar, MobileNav, Footer, CommandPalette, CartDrawer
│   ├── shop/                        # ShopFilterBar, ShopCatalogView
│   └── ui/                          # Button, Badge, Input, Select, Modal, Drawer, FineverseImage, etc.
├── config/
│   └── site.ts                      # Central configuration single source of truth
├── lib/
│   ├── data/                        # mock-db.ts, products.ts, drops.ts, collections.ts, reviews.ts
│   ├── formatters.ts                # formatINR, formatDate, percentageOff
│   ├── images.ts                    # Single source of truth for all imagery & artwork resolvers
│   └── utils.ts                     # cn utility (clsx + tailwind-merge)
├── store/
│   ├── useCartStore.ts              # Zustand shopping bag with localStorage persistence
│   └── useWishlistStore.ts          # Zustand wishlist with localStorage persistence
├── types/                           # Strict TypeScript types for products, drops, cart, and reviews
├── public/
│   └── images/                      # SVG brand logo, OG graphic, and photoshoot drop folder
├── .env.example                     # Environment variables schema
├── tailwind.config.ts               # Custom color palette (brand-crimson, brand-black, brand-charcoal)
├── tsconfig.json                    # Strict TypeScript compiler options
└── package.json
```

---

## ⚡ Quick Start & Development

### 1. Prerequisites
- **Node.js**: `v18.17.0` or higher
- **npm** or **pnpm** or **yarn**

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📸 Image Replacement Workflow

The codebase is built with zero dependency on stock CDN photography. All garments currently render custom SVG vector artwork through `lib/images.ts` and `FineverseImage.tsx`.

When your real photoshoot assets (flat lays, on-model lookbook, macro fabric closeups) are ready:

### Step 1: Export Assets
Export photographs in **WebP** or **AVIF** format with a 4:5 aspect ratio (e.g. `1200 x 1500 px` for PDP galleries; `1920 x 1080 px` for widescreen banners).

### Step 2: Save to `/public/images/`
Place your files in `/public/images/` using standard filenames:
```text
public/images/
├── products/
│   ├── sisters-revenge-tee-front.webp
│   ├── sisters-revenge-tee-back.webp
│   ├── sisters-revenge-tee-detail.webp
│   ├── sisters-revenge-hoodie-front.webp
│   └── sisters-revenge-hoodie-back.webp
├── banners/
│   ├── drop-04-hero.webp
│   └── brand-story.webp
└── creator/
    └── lookbook-model-01.webp
```

### Step 3: Update `lib/images.ts` or `lib/data/mock-db.ts`
Simply update the file path in `lib/data/mock-db.ts` or point the entry in `lib/images.ts`:
```ts
// Example: In lib/data/mock-db.ts
images: [
  {
    id: 'img-sr-tee-1',
    src: '/images/products/sisters-revenge-tee-front.webp', // <--- Replaces SVG resolver
    alt: 'Sisters Revenge Oversized Tee Front Fit',
    width: 1200,
    height: 1500,
  },
]
```
`FineverseImage` automatically switches between raster files and vector mock generators without any layout shift.

---

## 🔍 Search & Replace Checklist (`[EDIT]` Tags)

Search the project for `[EDIT]` to plug in your real credentials:

| File Location | Placeholder | Description |
|---|---|---|
| `config/site.ts` | `[EDIT: Replace with your YouTube channel handle]` | YouTube channel URL |
| `config/site.ts` | `[EDIT: Replace with your Instagram handle]` | Official Instagram profile link |
| `config/site.ts` | `[EDIT: Replace with your Discord invite link]` | Collector community invite link |
| `config/site.ts` | `[EDIT: Replace with your Twitter/X handle]` | X / Twitter account link |
| `config/site.ts` | `[EDIT: Replace with legal facility address]` | Physical business address & pincode |
| `app/contact/page.tsx` | `[EDIT: Replace with legal facility address]` | Tirupur warehouse / registered office |
| `app/policies/privacy/page.tsx` | `[EDIT: Replace with Legal Officer Name]` | DPDP Act Grievance Officer name |
| `app/policies/terms/page.tsx` | `[EDIT: Replace with legal entity name]` | Registered Private Limited / LLP name |
| `app/policies/terms/page.tsx` | `[EDIT: Update jurisdiction city if required]` | Legal court jurisdiction city |
| `.env.example` | `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Production Razorpay key |

---

## 🧪 Zero-Contradiction Verification Checklist

| Dimension | Specification | Enforced In |
|---|---|---|
| **T-Shirt Weight** | Strictly **240 GSM** (100% Super Combed Compact Cotton, Single Jersey) | `mock-db.ts`, PDP, FAQ, About |
| **Hoodie Weight** | Strictly **420 GSM** (100% Cotton French Terry loopback) | `mock-db.ts`, PDP, FAQ, About |
| **Free Shipping** | Uniformly **Above ₹1,999** (₹99 for sub-₹1,999) | `config/site.ts`, AnnouncementBar, Cart, Checkout, Policies |
| **Cash on Delivery** | Supported up to ₹5,000 across India (₹99 handling fee) | `checkout/page.tsx`, FAQ, Policies |
| **Drop Cap** | Strictly **500 Numbered Units** for Drop 04 "Sisters Revenge" | `mock-db.ts`, Countdown, About, Terms |
| **Exchange Window** | **7-Day Doorstep Size Swaps** (1st swap free) | `policies/returns/page.tsx`, FAQ, PDP |

---

## 🚀 Production Deployment Guide

### Deploying to Vercel (Recommended)
1. Push your repository to GitHub or GitLab.
2. Import the repository in [Vercel](https://vercel.com).
3. Set the Framework Preset to **Next.js**.
4. Configure Environment Variables from `.env.example`:
   - `NEXT_PUBLIC_SITE_URL` = `https://your-domain.com`
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID` = `rzp_live_...`
5. Click **Deploy**. Vercel will automatically build the static pages, dynamic sitemaps, and optimized assets.

### Deploying via Docker / Standalone
Enable `output: 'standalone'` in `next.config.mjs` and build your container:
```dockerfile
FROM node:18-alpine AS runner
WORKDIR /app
COPY .next/standalone ./
COPY .next/static ./.next/static
COPY public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## 🖤 Credits & License

Engineered with passion for the creator-led streetwear underground.  
**FINEVERSE** — *"Wear The Universe."*
