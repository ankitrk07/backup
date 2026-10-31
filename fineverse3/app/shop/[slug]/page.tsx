import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/product-detail";
import { RelatedProducts } from "@/components/product/related-products";
import { ReviewsSection } from "@/components/product/reviews-section";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import {
  getDrop,
  getProductBySlug,
  getProductSlugs,
  getRelatedProducts,
  getReviews,
  getSizeChart,
} from "@/lib/data";
import { truncate } from "@/lib/format";
import { CATEGORY_LABEL } from "@/lib/labels";
import { breadcrumbJsonLd, buildMetadata, productJsonLd } from "@/lib/seo";

// Stock and drop state change, so refresh the server-rendered page every minute.
export const revalidate = 60;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found", robots: { index: false } };

  return buildMetadata({
    title: product.name,
    description: truncate(product.description, 155),
    path: `/shop/${product.slug}`,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const serverNow = Date.now();
  const [reviews, related, sizeChart, drop] = await Promise.all([
    getReviews(product.slug),
    getRelatedProducts(product, 4),
    getSizeChart(product.category),
    product.drop ? getDrop(product.drop) : Promise.resolve(null),
  ]);

  const categoryPath = `/shop?category=${product.category}`;

  return (
    <div className="container pb-24 pt-6 lg:pb-16">
      <JsonLd data={productJsonLd(product)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          { name: CATEGORY_LABEL[product.category], path: categoryPath },
          { name: product.name, path: `/shop/${product.slug}` },
        ])}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: CATEGORY_LABEL[product.category], href: categoryPath },
          { label: product.name },
        ]}
        className="mb-6"
      />

      <ProductDetail product={product} sizeChart={sizeChart} drop={drop} serverNow={serverNow} />
      <ReviewsSection product={product} reviews={reviews} />
      <RelatedProducts products={related} />
    </div>
  );
}