import { BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { formatDate, pluralize } from "@/lib/format";
import { sizeLabel } from "@/lib/labels";
import type { Product } from "@/types/product";
import type { Review } from "@/types/review";

interface ReviewsSectionProps {
  product: Product;
  reviews: Review[];
}

const STAR_ROWS = [5, 4, 3, 2, 1] as const;

export function ReviewsSection({ product, reviews }: ReviewsSectionProps) {
  const hasMock = reviews.some((review) => review.isMock);
  const { rating } = product;

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="mt-16 scroll-mt-24">
      <div className="flex flex-wrap items-center gap-3">
        <h2 id="reviews-heading" className="font-display text-display-sm uppercase text-fg">
          Reviews
        </h2>
        {hasMock ? <Badge variant="warning">Sample reviews</Badge> : null}
      </div>

      {hasMock ? (
        <p className="mt-2 max-w-2xl text-sm text-subtle">
          These are placeholder reviews shown for design purposes. They are not from real customers.
        </p>
      ) : null}

      {reviews.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-line px-6 py-12 text-center text-muted">
          No reviews yet for this product.
        </p>
      ) : (
        <div className="mt-6 grid gap-8 lg:grid-cols-[18rem_1fr] lg:gap-12">
          <div className="rounded-xl border border-line bg-surface p-5">
            <p className="font-display text-6xl leading-none text-fg tabular">
              {rating.average.toFixed(1)}
            </p>
            <StarRating rating={rating.average} size={20} className="mt-3" />
            <p className="mt-2 text-sm text-muted">
              Based on {rating.count} {rating.isMock ? "sample " : ""}
              {pluralize(rating.count, "review")}
            </p>

            <ul className="mt-5 space-y-2" aria-label="Rating breakdown">
              {STAR_ROWS.map((stars) => {
                const total = reviews.filter((review) => review.rating === stars).length;
                const percent = Math.round((total / reviews.length) * 100);
                return (
                  <li key={stars} className="flex items-center gap-3 text-sm">
                    <span className="w-12 shrink-0 text-muted tabular">{stars} star</span>
                    <span
                      className="h-2 flex-1 overflow-hidden rounded-full bg-line"
                      role="img"
                      aria-label={`${total} of ${reviews.length} reviews`}
                    >
                      <span className="block h-full rounded-full bg-accent" style={{ width: `${percent}%` }} />
                    </span>
                    <span className="w-6 shrink-0 text-right text-subtle tabular">{total}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <ul className="divide-y divide-line">
            {reviews.map((review) => {
              const colorName = product.colors.find((color) => color.id === review.colorId)?.name;
              return (
                <li key={review.id} className="py-6 first:pt-0">
                  <article>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <StarRating rating={review.rating} />
                      {review.isMock ? <Badge variant="outline">Sample</Badge> : null}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-fg">{review.title}</h3>
                    <p className="mt-1 leading-7 text-muted">{review.body}</p>
                    <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-subtle">
                      <span className="font-semibold text-muted">{review.author}</span>
                      <time dateTime={review.createdAt}>{formatDate(review.createdAt)}</time>
                      {review.size ? <span>Size {sizeLabel(review.size)}</span> : null}
                      {colorName ? <span>{colorName}</span> : null}
                      {review.verifiedPurchase ? (
                        <span className="inline-flex items-center gap-1 text-success">
                          <BadgeCheck className="size-4" aria-hidden="true" />
                          Verified purchase
                        </span>
                      ) : null}
                    </p>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}