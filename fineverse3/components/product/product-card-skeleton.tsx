import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ProductCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-[4/5] w-full rounded-lg" />
      <Skeleton className="mt-3 h-4 w-3/4" />
      <Skeleton className="mt-2 h-5 w-1/3" />
      <Skeleton className="mt-2 h-3.5 w-1/2" />
    </div>
  );
}

interface ProductGridSkeletonProps {
  count?: number;
  className?: string;
}

export function ProductGridSkeleton({ count = 8, className }: ProductGridSkeletonProps) {
  return (
    <div role="status" aria-busy="true">
      <span className="sr-only">Loading products</span>
      <ul
        aria-hidden="true"
        className={cn("grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4", className)}
      >
        {Array.from({ length: count }, (_, index) => (
          <li key={index}>
            <ProductCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}