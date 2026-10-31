import { ProductGrid } from "@/components/product/product-grid";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Product } from "@/types/product";

export function TrendingProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section aria-label="Trending products" className="container py-16">
      <Reveal>
        <SectionHeading
          eyebrow="Trending now"
          title="Most wanted"
          action={
            <ButtonLink href="/shop" variant="outline" size="sm">
              View all
            </ButtonLink>
          }
        />
      </Reveal>
      <Reveal className="mt-8">
        <ProductGrid products={products} />
      </Reveal>
    </section>
  );
}