import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: Product[];
  className?: string;
  sizes?: string;
}

export function ProductGrid({ products, className, sizes }: ProductGridProps) {
  return (
    <ul className={cn("grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4", className)}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} sizes={sizes} />
        </li>
      ))}
    </ul>
  );
}