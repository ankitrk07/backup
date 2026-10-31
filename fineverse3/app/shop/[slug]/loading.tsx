import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div className="container pb-24 pt-6 lg:pb-16" role="status" aria-busy="true">
      <span className="sr-only">Loading product</span>
      <Skeleton className="mb-6 h-5 w-72" />
      <div aria-hidden="true" className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div>
          <Skeleton className="aspect-[4/5] w-full rounded-xl" />
          <div className="mt-3 flex gap-3">
            <Skeleton className="aspect-[4/5] flex-1 rounded-lg" />
            <Skeleton className="aspect-[4/5] flex-1 rounded-lg" />
            <Skeleton className="aspect-[4/5] flex-1 rounded-lg" />
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-14 w-3/4" />
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-11 w-48" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-14 w-full" />
        </div>
      </div>
    </div>
  );
}