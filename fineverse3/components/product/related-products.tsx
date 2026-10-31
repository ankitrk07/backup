import { ProductGrid } from "@/components/product/product-grid";
import type { Product } from "@/types/product";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="mt-16">
      <h2 id="related-heading" className="font-display text-display-sm uppercase text-fg">
        You may also like
      </h2>
      <ProductGrid products={products} className="mt-6" />
    </section>
  );
}