import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getReviewsByProductId, getRelatedProducts, getProducts } from "@/lib/data";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import { siteConfig } from "@/config/site";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const primaryImage = product.images[0];

  return {
    title: `${product.name} (${product.gsm > 0 ? `${product.gsm} GSM` : "Streetwear"})`,
    description: product.description,
    openGraph: {
      title: `${product.name} | ${siteConfig.name}`,
      description: product.description,
      images: [
        {
          url: `/images/products/${primaryImage.slotKey}.webp`,
          width: primaryImage.width,
          height: primaryImage.height,
          alt: primaryImage.alt,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const reviews = await getReviewsByProductId(product.id);
  const relatedProducts = await getRelatedProducts(product.id, 4);

  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `/images/products/${product.images[0].slotKey}.webp`,
    description: product.description,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/shop/${product.slug}`,
      priceCurrency: "INR",
      price: product.price,
      availability:
        product.sizes.some((s) => s.stock > 0)
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.average,
      reviewCount: product.rating.count,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailView
        product={product}
        reviews={reviews}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
