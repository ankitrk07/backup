import { ProductGridSkeleton } from "@/components/product/product-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function ShopLoading() {
  return (
    <div className="container pb-16 pt-6">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="mt-6 h-14 w-64" />
      <Skeleton className="mt-3 h-5 w-full max-w-md" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-10">
        <div className="hidden space-y-4 lg:block" aria-hidden="true">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div>
          <Skeleton className="mb-6 h-11 w-full" />
          <ProductGridSkeleton count={6} className="lg:grid-cols-3" />
        </div>
      </div>
    </div>
  );
}