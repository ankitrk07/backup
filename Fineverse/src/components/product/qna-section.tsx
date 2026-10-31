import Link from "next/link"
import { MessageCircleQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { getProductQuestions } from "@/lib/services/review-service"

export async function QnaSection({
  productId,
  productSlug,
}: {
  productId: string
  productSlug: string
}) {
  const questions = await getProductQuestions(productId)

  return (
    <div id="qna" className="scroll-mt-24">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-foreground">Questions & Answers</h2>
        <Button asChild variant="outline" size="sm">
          <Link href={`/login?redirect=/product/${productSlug}`}>Ask a Question</Link>
        </Button>
      </div>

      {questions.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-2 py-8 text-center">
          <MessageCircleQuestion className="text-muted-foreground size-8" />
          <p className="text-muted-foreground text-sm">No questions yet. Be the first to ask.</p>
        </div>
      ) : (
        <ul className="divide-border mt-6 flex flex-col divide-y">
          {questions.map((q) => (
            <li key={q.id} className="py-5">
              <p className="text-foreground text-sm font-medium">Q: {q.question}</p>
              <p className="text-muted-foreground mt-1 text-xs">
                {q.author} · {formatDate(q.createdAt)}
              </p>
              {q.answer ? (
                <div className="bg-secondary mt-3 rounded-lg p-3">
                  <p className="text-foreground text-sm">
                    <span className="font-medium">A:</span> {q.answer}
                  </p>
                  {q.answeredAt && (
                    <p className="text-muted-foreground mt-1 text-xs">
                      Answered by Fineverse Support · {formatDate(q.answeredAt)}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground mt-2 text-xs italic">Not yet answered</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
