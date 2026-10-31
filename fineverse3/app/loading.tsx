import { Skeleton } from "@/components/ui/skeleton";

/** Fallback while a route streams in. Routes with their own loading.tsx override this. */
export default function RootLoading() {
  return (
    <div className="container py-10" role="status" aria-busy="true">
      <span className="sr-only">Loading</span>
      <div aria-hidden="true" className="space-y-6">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-16 w-full max-w-xl" />
        <Skeleton className="h-5 w-full max-w-md" />
        <div className="grid grid-cols-2 gap-4 pt-4 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className="aspect-[4/5] w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}