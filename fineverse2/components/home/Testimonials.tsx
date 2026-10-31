import React from "react";
import { Star, ShieldCheck, Check } from "lucide-react";
import { Review } from "@/types/review";
import { FineverseImage } from "@/components/ui/FineverseImage";

interface TestimonialsProps {
  reviews: Review[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ reviews }) => {
  return (
    <section aria-label="Customer Reviews" className="py-20 border-b border-white/10 bg-space-950">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header with Mandatory Mock Flag */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-acid tracking-widest uppercase">
                COMMUNITY INTEL
              </span>
              {/* Mandatory Mock Data Notice */}
              <span className="px-2 py-0.5 bg-space-850 border border-white/20 text-[10px] font-mono text-zinc-400">
                [DATASET: VERIFIED TEST RUN ARCHIVE]
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
              WHAT THE NOCTURNAL SAY
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <div className="flex items-center text-acid">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-acid" />
              ))}
            </div>
            <span className="font-bold text-white">4.92 / 5.0</span>
            <span>OVERALL SATISFACTION</span>
          </div>
        </div>

        {/* Reviews 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="surface-card p-6 border border-white/10 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Stars & Fit Pill */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-acid">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-acid" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-acid bg-acid/10 px-2 py-0.5 border border-acid/20">
                    FIT: {review.fitFeedback.toUpperCase()}
                  </span>
                </div>

                {/* Review Title */}
                <h3 className="font-display font-bold uppercase text-base text-white">
                  "{review.title}"
                </h3>

                {/* Review Comment */}
                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  {review.comment}
                </p>
              </div>

              {/* Author Row */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-space-900 border border-white/20 flex-shrink-0">
                  <FineverseImage slotKey={review.avatarSlotKey || "avatar-aarav"} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-bold uppercase text-sm text-white truncate">
                      {review.authorName}
                    </span>
                    {review.verifiedPurchase && (
                      <Check className="w-3.5 h-3.5 text-acid flex-shrink-0" title="Verified Buyer" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                    <span>{review.authorCity}</span>
                    <span>•</span>
                    <span>SIZE: {review.sizePurchased}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
