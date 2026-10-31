import { Star } from "lucide-react";
import { pluralize } from "@/lib/format";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  /** 0 to 5, fractions allowed */
  rating: number;
  count?: number;
  /** star size in px */
  size?: number;
  showValue?: boolean;
  className?: string;
}

const STAR_INDEXES = [0, 1, 2, 3, 4];

export function StarRating({ rating, count, size = 16, showValue = false, className }: StarRatingProps) {
  const clamped = Math.min(5, Math.max(0, rating));
  const percent = (clamped / 5) * 100;
  const label =
    count === undefined
      ? `Rated ${clamped.toFixed(1)} out of 5`
      : `Rated ${clamped.toFixed(1)} out of 5 from ${count} ${pluralize(count, "review")}`;

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <span role="img" aria-label={label} className="relative inline-flex">
        <span className="flex text-line" aria-hidden="true">
          {STAR_INDEXES.map((index) => (
            <Star key={index} size={size} className="fill-current" />
          ))}
        </span>
        <span
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${percent}%` }}
          aria-hidden="true"
        >
          <span className="flex w-max text-accent">
            {STAR_INDEXES.map((index) => (
              <Star key={index} size={size} className="fill-current" />
            ))}
          </span>
        </span>
      </span>
      {showValue ? (
        <span className="text-sm text-muted tabular">
          {clamped.toFixed(1)}
          {count !== undefined ? <span className="text-subtle"> ({count})</span> : null}
        </span>
      ) : null}
    </div>
  );
}