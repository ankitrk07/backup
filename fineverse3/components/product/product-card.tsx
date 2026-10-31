import Link from "next/link";
import { SlotImage } from "@/components/media/slot-image";
import { Price } from "@/components/ui/price";
import { StarRating } from "@/components/ui/star-rating";
import { pluralize } from "@/lib/format";
import { getProductImage, isSoldOut } from "@/lib/product";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";
import { ProductBadges } from "./product-badges";
import { WishlistButton } from "./wishlist-button";

interface ProductCardProps {
  product: Product;
  sizes?: string;
  className?: string;
}

const DEFAULT_SIZES = "(min-width: 1024px) 25vw, 50vw";

export function ProductCard({ product, sizes = DEFAULT_SIZES, className }: ProductCardProps) {
  const firstColor = product.colors[0];
  const front = firstColor ? getProductImage(product, firstColor.id, "front") : null;
  const back = firstColor ? getProductImage(product, firstColor.id, "back") : null;
  const hasHoverImage = front !== null && back !== null && back !== front;
  const soldOut = isSoldOut(product);
  const showRating = product.rating.count > 0 && !product.rating.isMock;

  return (
    <article className={cn("group relative", className)}>
      <Link href={`/shop/${product.slug}`} className="block">
        <div
          className={cn(
            "relative overflow-hidden rounded-lg border border-line bg-surface transition-colors group-hover:border-subtle",
            soldOut && "opacity-70",
          )}
        >
          {front ? <SlotImage slot={front} decorative sizes={sizes} /> : null}
          {hasHoverImage && back ? (
            <SlotImage
              slot={back}
              decorative
              sizes={sizes}
              fill
              className="absolute inset-0 opacity-0 transition-opacity duration-300 motion-reduce:transition-none [@media(hover:hover)]:group-hover:opacity-100"
            />
          ) : null}
          <ProductBadges product={product} className="absolute left-2 top-2" />
        </div>

        <div className="mt-3 space-y-1.5">
          <h3 className="text-base font-semibold leading-snug text-fg transition-colors group-hover:text-accent">
            {product.name}
          </h3>
          <Price price={product.price} compareAtPrice={product.compareAtPrice} size="sm" showDiscount={false} />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <ul className="flex items-center gap-1.5" aria-label="Available colours">
              {product.colors.map((color) => (
                <li key={color.id}>
                  <span
                    className="block size-3.5 rounded-full border border-subtle"
                    style={{ backgroundColor: color.hex }}
                    aria-hidden="true"
                  />
                  <span className="sr-only">{color.name}</span>
                </li>
              ))}
            </ul>
            <span className="text-sm text-muted">
              {product.colors.length} {pluralize(product.colors.length, "colour")}
            </span>
          </div>
          {showRating ? (
            <StarRating rating={product.rating.average} count={product.rating.count} size={14} showValue />
          ) : null}
        </div>
      </Link>

      <WishlistButton slug={product.slug} name={product.name} className="absolute right-1.5 top-1.5" />
    </article>
  );
}