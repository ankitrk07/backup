import type { Metadata, Route } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { Container } from "@/components/shared/container"
import { ImageGallery } from "@/components/product/image-gallery"
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel"
import { ProductInfoTabs } from "@/components/product/product-info-tabs"
import { ReviewsSection } from "@/components/product/reviews-section"
import { QnaSection } from "@/components/product/qna-section"
import { FrequentlyBoughtTogether } from "@/components/product/frequently-bought-together"
import { TrackRecentlyViewed } from "@/components/product/track-recently-viewed"
import { RecentlyViewedSection } from "@/components/home/recently-viewed-section"
import { ProductCarousel } from "@/components/home/product-carousel"
import { getProductBySlug, getRelatedProducts } from "@/lib/services/product-service"

// No generateStaticParams: pages are generated on first request and cached
// (ISR) rather than all pre-built at once — appropriate for a catalog that
// can grow large, and pricing/stock benefit from the periodic revalidation
// below more than from being baked in at build time.
export const revalidate = 300

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: "Product Not Found" }

  return {
    title: product.name,
    description: product.description.slice(0, 155),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 155),
      images: product.images[0] ? [{ url: product.images[0] }] : undefined,
    },
    alternates: { canonical: `/product/${product.slug}` },
  }
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  // Sequential — see homepage comment on why (dev-only database constraint).
  const related = await getRelatedProducts(product.categorySlug, product.id)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    sku: product.id,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability:
        product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `/product/${product.slug}`,
    },
    aggregateRating:
      product.reviewCount > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          }
        : undefined,
  }

  return (
    <Container className="py-6 sm:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <TrackRecentlyViewed product={product} />

      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${product.topCategorySlug}` as Route}>{product.topCategoryName}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {product.categorySlug !== product.topCategorySlug && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${product.topCategorySlug}?sub=${product.categorySlug}` as Route}>
                    {product.categoryName}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="line-clamp-1">{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ImageGallery images={product.images} productName={product.name} />
        <ProductPurchasePanel product={product} />
      </div>

      <Separator className="my-10" />
      <ProductInfoTabs product={product} />

      <Separator className="my-10" />
      <FrequentlyBoughtTogether current={product} related={related} />

      <Separator className="my-10" />
      <ReviewsSection
        productId={product.id}
        productSlug={product.slug}
        avgRating={product.rating}
        reviewCount={product.reviewCount}
      />

      <Separator className="my-10" />
      <QnaSection productId={product.id} productSlug={product.slug} />

      {related.length > 0 && (
        <>
          <Separator className="my-10" />
          <ProductCarousel title="You May Also Like" products={related} />
        </>
      )}

      <RecentlyViewedSection />
    </Container>
  )
}
