import { Skeleton } from "@/components/ui/skeleton";

export default function CollectionsLoading() {
  return (
    <div className="container pb-16 pt-6" role="status" aria-busy="true">
      <span className="sr-only">Loading collections</span>
      <Skeleton className="h-5 w-40" />
      <Skeleton className="mt-6 h-14 w-72" />
      <ul aria-hidden="true" className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <li key={index}>
            <Skeleton className="aspect-video w-full rounded-xl" />
            <Skeleton className="mt-4 h-4 w-24" />
            <Skeleton className="mt-2 h-7 w-48" />
          </li>
        ))}
      </ul>
    </div>
  );
}