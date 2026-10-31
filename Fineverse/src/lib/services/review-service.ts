import { db } from "@/lib/db"

export type ReviewWithAuthor = {
  id: string
  rating: number
  title: string | null
  comment: string
  isVerifiedPurchase: boolean
  helpfulCount: number
  createdAt: Date
  author: string
}

export async function getProductReviews(
  productId: string,
  sort: "recent" | "helpful" | "highest" | "lowest" = "recent"
): Promise<ReviewWithAuthor[]> {
  const orderBy =
    sort === "helpful"
      ? { helpfulCount: "desc" as const }
      : sort === "highest"
        ? { rating: "desc" as const }
        : sort === "lowest"
          ? { rating: "asc" as const }
          : { createdAt: "desc" as const }

  const reviews = await db.review.findMany({
    where: { productId },
    include: { user: { select: { name: true } } },
    orderBy,
    take: 20,
  })

  return reviews.map((r) => ({
    id: r.id,
    rating: r.rating,
    title: r.title,
    comment: r.comment,
    isVerifiedPurchase: r.isVerifiedPurchase,
    helpfulCount: r.helpfulCount,
    createdAt: r.createdAt,
    author: r.user.name ?? "Fineverse Customer",
  }))
}

export async function getRatingBreakdown(productId: string) {
  const reviews = await db.review.findMany({ where: { productId }, select: { rating: true } })
  const counts = [0, 0, 0, 0, 0]
  for (const r of reviews) {
    if (r.rating >= 1 && r.rating <= 5) counts[r.rating - 1]++
  }
  const total = reviews.length
  return {
    total,
    // index 0 = 5 stars, index 4 = 1 star, for easy top-down rendering
    breakdown: [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: counts[star - 1],
      percent: total ? Math.round((counts[star - 1] / total) * 100) : 0,
    })),
  }
}

export type ProductQuestionWithAuthor = {
  id: string
  question: string
  answer: string | null
  createdAt: Date
  answeredAt: Date | null
  author: string
}

export async function getProductQuestions(productId: string): Promise<ProductQuestionWithAuthor[]> {
  const questions = await db.productQuestion.findMany({
    where: { productId },
    include: { user: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
    take: 20,
  })

  return questions.map((q) => ({
    id: q.id,
    question: q.question,
    answer: q.answer,
    createdAt: q.createdAt,
    answeredAt: q.answeredAt,
    author: q.user.name ?? "Fineverse Customer",
  }))
}
