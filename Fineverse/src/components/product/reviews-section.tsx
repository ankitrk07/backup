import Link from "next/link"
import { BadgeCheck, ThumbsUp } from "lucide-react"
import { StarRating } from "@/components/shared/star-rating"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { formatDate } from "@/lib/utils"
import { getProductReviews, getRatingBreakdown } from "@/lib/services/review-service"

export async function ReviewsSection({
  productId,
  productSlug,
  avgRating,
  reviewCount,
}: {
  productId: string
  productSlug: string
  avgRating: number
  reviewCount: number
}) {
  // Sequential — see homepage comment on why (dev-only database constraint).
  const reviews = await getProductReviews(productId)
  const { total, breakdown } = await getRatingBreakdown(productId)

  return (
    <div id="reviews" className="scroll-mt-24">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-foreground">Customer Reviews</h2>
        <Button asChild variant="outline" size="sm">
          <Link href={`/login?redirect=/product/${productSlug}`}>Write a Review</Link>
        </Button>
      </div>
      <p className="text-muted-foreground mt-1 text-xs">
        Sign in and complete a purchase to write a verified review.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-[220px_1fr]">
        <div className="flex flex-col items-start gap-2">
          <p className="text-4xl font-semibold text-foreground">{avgRating.toFixed(1)}</p>
          <StarRating rating={avgRating} size="md" />
          <p className="text-muted-foreground text-sm">
            Based on {reviewCount.toLocaleString("en-IN")} ratings
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {breakdown.map((row) => (
            <div key={row.star} className="flex items-center gap-3">
              <span className="text-muted-foreground w-10 shrink-0 text-xs">{row.star} star</span>
              <Progress
                value={row.percent}
                aria-label={`${row.star} star reviews: ${row.percent}%`}
                className="h-2 flex-1"
              />
              <span className="text-muted-foreground w-8 shrink-0 text-right text-xs">{row.percent}%</span>
            </div>
          ))}
          {total === 0 && (
            <p className="text-muted-foreground text-sm">No written reviews yet — be the first to share one.</p>
          )}
        </div>
      </div>

      {reviews.length > 0 && (
        <ul className="divide-border mt-8 flex flex-col divide-y">
          {reviews.map((review) => (
            <li key={review.id} className="py-5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <StarRating rating={review.rating} size="xs" />
                  {review.isVerifiedPurchase && (
                    <span className="text-success flex items-center gap-1 text-xs font-medium">
                      <BadgeCheck className="size-3.5" /> Verified Purchase
                    </span>
                  )}
                </div>
                <span className="text-muted-foreground text-xs">{formatDate(review.createdAt)}</span>
              </div>
              {review.title && (
                <p className="text-foreground mt-2 text-sm font-semibold">{review.title}</p>
              )}
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{review.comment}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-muted-foreground text-xs">{review.author}</span>
                {review.helpfulCount > 0 && (
                  <span className="text-muted-foreground flex items-center gap-1 text-xs">
                    <ThumbsUp className="size-3" /> {review.helpfulCount} found this helpful
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
