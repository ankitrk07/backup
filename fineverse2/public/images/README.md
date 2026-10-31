# FINEVERSE Store — Image Slot Directory & Asset Replacement Guide

This directory documents all image slots used across the FINEVERSE e-commerce frontend.

## How to Replace Placeholders with Real Photos (Zero Component Editing Required)

1. Save your professional product or model photo into `/public/images/` using the recommended filename convention (WebP or AVIF recommended).
2. Open `/lib/images.ts`.
3. Locate the corresponding `slotKey` in `IMAGE_SLOT_REGISTRY`.
4. Change `filePath: null` to your new file path (e.g. `filePath: "/images/products/sisters-revenge-black-front.webp"`).
5. That's it! The entire site (PDP gallery, zoom modal, hover card swaps, checkout, cart drawer) will automatically render the new photo with perfect aspect ratios and zero layout shift.

---

## Complete Image Slot Catalog

### 1. Brand Identity & Global Media
| Slot Key | Recommended File Path | Aspect Ratio | Dimensions | Description |
| :--- | :--- | :--- | :--- | :--- |
| `site-logo` | `/public/images/logo.svg` | 1:1 | 500 × 500 px | Circular vector logo with planetary rings |
| `hero-banner-main` | `/public/images/hero/hero-main.webp` | 16:10 | 1440 × 900 px | Desktop & mobile main hero background |
| `banner-drop-04` | `/public/images/drops/drop-04-banner.webp` | 2:1 | 1200 × 600 px | Drop 04 Sisters Revenge spotlight banner |
| `og-image` | `/public/images/og-image.svg` | 1.91:1 | 1200 × 630 px | Social sharing preview card (Twitter/OG) |

### 2. Category & Collection Tiles
| Slot Key | Recommended File Path | Aspect Ratio | Dimensions | Description |
| :--- | :--- | :--- | :--- | :--- |
| `category-drop04` | `/public/images/categories/drop-04.webp` | 4:5 | 600 × 750 px | Drop 04 collection card |
| `category-tees` | `/public/images/categories/tees.webp` | 4:5 | 600 × 750 px | Oversized tees category tile |
| `category-hoodies` | `/public/images/categories/hoodies.webp` | 4:5 | 600 × 750 px | Heavyweight hoodies category tile |
| `category-accessories` | `/public/images/categories/accessories.webp`| 4:5 | 600 × 750 px | Tactical accessories tile |

### 3. Flagship: Sisters Revenge Oversized Tee (Drop 04)
| Slot Key | Recommended File Path | Aspect Ratio | Dimensions | Description |
| :--- | :--- | :--- | :--- | :--- |
| `sisters-revenge-black-front` | `/public/images/products/sisters-black-front.webp` | 4:5 | 800 × 1000 px | Pitch Black front chest view |
| `sisters-revenge-black-back` | `/public/images/products/sisters-black-back.webp` | 4:5 | 800 × 1000 px | Pitch Black expansive back graphic |
| `sisters-revenge-black-detail` | `/public/images/products/sisters-black-detail.webp` | 4:5 | 800 × 1000 px | 240 GSM collar rib and fabric macro |
| `sisters-revenge-acid-front` | `/public/images/products/sisters-acid-front.webp` | 4:5 | 800 × 1000 px | Interstellar Acid front view |
| `sisters-revenge-acid-back` | `/public/images/products/sisters-acid-back.webp` | 4:5 | 800 × 1000 px | Interstellar Acid back view |
| `sisters-revenge-acid-detail` | `/public/images/products/sisters-acid-detail.webp` | 4:5 | 800 × 1000 px | Interstellar Acid detail view |

### 4. Planet X Heavyweight Hoodie (420 GSM)
| Slot Key | Recommended File Path | Aspect Ratio | Dimensions | Description |
| :--- | :--- | :--- | :--- | :--- |
| `planet-x-black-front` | `/public/images/products/planet-black-front.webp` | 4:5 | 800 × 1000 px | Pitch Black front hoodie view |
| `planet-x-black-back` | `/public/images/products/planet-black-back.webp` | 4:5 | 800 × 1000 px | Pitch Black planetary back art |
| `planet-x-black-detail` | `/public/images/products/planet-black-detail.webp` | 4:5 | 800 × 1000 px | 420 GSM French Terry loopback interior |
| `planet-x-violet-front` | `/public/images/products/planet-violet-front.webp` | 4:5 | 800 × 1000 px | Cosmic Violet front view |
| `planet-x-violet-back` | `/public/images/products/planet-violet-back.webp` | 4:5 | 800 × 1000 px | Cosmic Violet back view |
| `planet-x-violet-detail` | `/public/images/products/planet-violet-detail.webp` | 4:5 | 800 × 1000 px | Cosmic Violet fabric & embroidery detail |

### 5. Wear The Universe Core Tee
| Slot Key | Recommended File Path | Aspect Ratio | Dimensions | Description |
| :--- | :--- | :--- | :--- | :--- |
| `wear-universe-black-front` | `/public/images/products/universe-black-front.webp` | 4:5 | 800 × 1000 px | Core Black front view |
| `wear-universe-black-back` | `/public/images/products/universe-black-back.webp` | 4:5 | 800 × 1000 px | Core Black spine coordinates |
| `wear-universe-black-detail`| `/public/images/products/universe-black-detail.webp`| 4:5 | 800 × 1000 px | Texture & stitch detail |
| `wear-universe-acid-front` | `/public/images/products/universe-acid-front.webp` | 4:5 | 800 × 1000 px | Acid Volt front view |
| `wear-universe-acid-back` | `/public/images/products/universe-acid-back.webp` | 4:5 | 800 × 1000 px | Acid Volt spine view |
| `wear-universe-acid-detail` | `/public/images/products/universe-acid-detail.webp` | 4:5 | 800 × 1000 px | Acid Volt detail |

### 6. Accessories & Headwear
| Slot Key | Recommended File Path | Aspect Ratio | Dimensions | Description |
| :--- | :--- | :--- | :--- | :--- |
| `flight-tag-acid-front` | `/public/images/products/tag-acid-front.webp` | 4:5 | 800 × 1000 px | Acid Neon flight tag front |
| `flight-tag-acid-back` | `/public/images/products/tag-acid-back.webp` | 4:5 | 800 × 1000 px | Acid Neon flight tag back |
| `flight-tag-acid-detail` | `/public/images/products/tag-acid-detail.webp` | 4:5 | 800 × 1000 px | Gunmetal carabiner close-up |
| `flight-tag-violet-front` | `/public/images/products/tag-violet-front.webp` | 4:5 | 800 × 1000 px | Cosmic Violet flight tag front |
| `cargo-cap-black-front` | `/public/images/products/cap-black-front.webp` | 4:5 | 800 × 1000 px | Cargo Cap front embroidery |
| `cargo-cap-black-back` | `/public/images/products/cap-black-back.webp` | 4:5 | 800 × 1000 px | Cargo Cap brass buckle slider |

### 7. Social Proof & Media
| Slot Key | Recommended File Path | Aspect Ratio | Dimensions | Description |
| :--- | :--- | :--- | :--- | :--- |
| `yt-thumb-drop04` | `/public/images/media/yt-drop04.webp` | 16:9 | 1280 × 720 px | YouTube behind-the-scenes video thumbnail |
| `avatar-aarav` | `/public/images/avatars/aarav.webp` | 1:1 | 200 × 200 px | Customer review avatar 1 |
| `avatar-tanvi` | `/public/images/avatars/tanvi.webp` | 1:1 | 200 × 200 px | Customer review avatar 2 |
| `avatar-rohan` | `/public/images/avatars/rohan.webp` | 1:1 | 200 × 200 px | Customer review avatar 3 |
| `avatar-vikram` | `/public/images/avatars/vikram.webp` | 1:1 | 200 × 200 px | Customer review avatar 4 |
