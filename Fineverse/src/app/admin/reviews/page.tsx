import type { Metadata } from "next"
import Link from "next/link"
import { getAdminReviews } from "@/lib/services/admin-service"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/shared/star-rating"
import { DeleteReviewButton } from "@/components/admin/delete-review-button"
import { PaginationControls } from "@/components/product/pagination-controls"
import { formatDate } from "@/lib/utils"

export const metadata: Metadata = { title: "Reviews" }

export default async function AdminReviewsPage({ searchParams }: PageProps<"/admin/reviews">) {
  const params = await searchParams
  const page = typeof params.page === "string" ? Number(params.page) : 1

  const { reviews, total, pageCount } = await getAdminReviews({ page })

  return (
    <div>
      <h1 className="text-foreground text-2xl font-semibold">Reviews</h1>

      <div className="mt-4 flex flex-col gap-3">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <StarRating rating={review.rating} size="sm" />
                  {review.isVerifiedPurchase && <Badge variant="secondary">Verified Purchase</Badge>}
                  <span className="text-muted-foreground text-xs">{formatDate(review.createdAt)}</span>
                </div>
                {review.title && <p className="text-foreground mt-1.5 text-sm font-medium">{review.title}</p>}
                <p className="text-muted-foreground mt-1 text-sm">{review.comment}</p>
                <p className="text-muted-foreground mt-2 text-xs">
                  by {review.user.name ?? review.user.email} on{" "}
                  <Link href={`/product/${review.product.slug}`} target="_blank" className="hover:underline">
                    {review.product.name}
                  </Link>
                </p>
              </div>
              <DeleteReviewButton reviewId={review.id} />
            </CardContent>
          </Card>
        ))}
        {reviews.length === 0 && (
          <Card>
            <CardContent className="text-muted-foreground py-8 text-center">No reviews yet.</CardContent>
          </Card>
        )}
      </div>

      <p className="text-muted-foreground mt-3 text-sm">{total} review{total === 1 ? "" : "s"} total</p>

      <div className="mt-4">
        <PaginationControls basePath="/admin/reviews" currentSearchParams={params} page={page} pageCount={pageCount} />
      </div>
    </div>
  )
}
