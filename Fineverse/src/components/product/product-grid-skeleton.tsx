import { Skeleton } from "@/components/ui/skeleton"

export function ProductGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border-border overflow-hidden rounded-xl border">
          <Skeleton className="aspect-[4/5] w-full rounded-none" />
          <div className="flex flex-col gap-2 p-3.5">
            <Skeleton className="h-3 w-1/3" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="mt-1 h-4 w-2/5" />
            <Skeleton className="mt-2 h-8 w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}
