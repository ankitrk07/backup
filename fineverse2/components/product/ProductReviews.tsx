import React from "react";
import { Star, Check, ShieldCheck } from "lucide-react";
import { Review } from "@/types/review";
import { FineverseImage } from "@/components/ui/FineverseImage";
import { formatDate } from "@/lib/formatters";

interface ProductReviewsProps {
  reviews: Review[];
  rating: {
    average: number;
    count: number;
  };
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({
  reviews,
  rating,
}) => {
  return (
    <section aria-label="Customer Reviews" className="mt-16 pt-12 border-t border-white/10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs text-acid tracking-widest uppercase">
              VERIFIED BUYER ARCHIVE
            </span>
            <span className="px-2 py-0.5 bg-space-850 border border-white/20 text-[10px] font-mono text-zinc-400">
              [DATASET: VERIFIED TEST ARCHIVE]
            </span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
            CUSTOMER REVIEWS & FIT FEEDBACK
          </h2>
        </div>

        {/* Aggregate Score */}
        <div className="flex items-center gap-3 p-3 bg-space-900 border border-white/10">
          <div className="flex items-center text-acid">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-acid" />
            ))}
          </div>
          <span className="font-mono font-bold text-lg text-white">
            {rating.average.toFixed(1)} / 5.0
          </span>
          <span className="font-mono text-xs text-zinc-400">
            ({rating.count} ratings)
          </span>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="surface-card p-6 border border-white/10 space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex text-acid">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-acid" />
                  ))}
                </div>
                <h3 className="font-display font-bold uppercase text-sm sm:text-base text-white">
                  {rev.title}
                </h3>
              </div>

              <span className="text-[10px] font-mono text-acid bg-acid/10 px-2 py-0.5 border border-acid/20">
                FIT: {rev.fitFeedback.toUpperCase()}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
              {rev.comment}
            </p>

            <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="text-zinc-200 font-bold">{rev.authorName}</span>
                <span>•</span>
                <span>{rev.authorCity}</span>
                {rev.verifiedPurchase && (
                  <span className="flex items-center gap-1 text-acid text-[10px]">
                    <Check className="w-3.5 h-3.5" />
                    <span>VERIFIED BUYER</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                <span>SIZE: <strong className="text-zinc-300">{rev.sizePurchased}</strong></span>
                <span>•</span>
                <span>{formatDate(rev.createdAt)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
