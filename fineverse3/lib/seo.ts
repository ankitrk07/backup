import type { Metadata } from "next";
import { absoluteUrl, getSocialLinks, siteConfig } from "@/config/site";
import { BRAND_LOGO_SRC } from "@/lib/images";
import { getTotalStock } from "@/lib/product";
import type { Product } from "@/types/product";

interface PageMetaInput {
  /** Page title WITHOUT the brand. The layout template appends " | FINEVERSE". */
  title?: string;
  description?: string;
  /** Path starting with "/", used for the canonical URL */
  path: string;
  noIndex?: boolean;
}

const OG_IMAGE_PATH = "/opengraph-image";

/** One helper for every route's metadata: title, description, canonical, Open Graph, Twitter. */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path,
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.seo.defaultTitle;
  const imageUrl = absoluteUrl(OG_IMAGE_PATH);

  return {
    title,
    description,
    alternates: { canonical: url },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      locale: "en_IN",
      title: socialTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name}: ${siteConfig.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [imageUrl],
      ...(siteConfig.seo.twitterHandle ? { creator: siteConfig.seo.twitterHandle } : {}),
    },
  };
}

type JsonLdData = Record<string, unknown>;

export function organizationJsonLd(): JsonLdData {
  const { supportEmail, phone } = siteConfig.contact;
  const sameAs = getSocialLinks().map((link) => link.url);
  // Never publish the placeholder email as structured data.
  const hasRealEmail = !supportEmail.endsWith("@example.com");

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl(BRAND_LOGO_SRC),
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(hasRealEmail
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: supportEmail,
            ...(phone ? { telephone: phone } : {}),
            availableLanguage: ["English"],
          },
        }
      : {}),
  };
}

export interface BreadcrumbEntry {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(items: readonly BreadcrumbEntry[]): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productJsonLd(product: Product): JsonLdData {
  const inStock = getTotalStock(product) > 0;
  // Generated SVG art has no public URL, so only real photo files are listed.
  const images = Array.from(
    new Set(product.images.flatMap((image) => (image.slot.kind === "file" ? [absoluteUrl(image.slot.src)] : []))),
  );
  // Ratings are only published when they come from real reviews.
  const hasRealRating = !product.rating.isMock && product.rating.count > 0;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.id,
    category: product.category,
    material: product.fabric,
    brand: { "@type": "Brand", name: siteConfig.name },
    ...(images.length > 0 ? { image: images } : {}),
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/shop/${product.slug}`),
      priceCurrency: siteConfig.currency,
      price: product.price,
      availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    ...(hasRealRating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating.average,
            reviewCount: product.rating.count,
          },
        }
      : {}),
  };
}