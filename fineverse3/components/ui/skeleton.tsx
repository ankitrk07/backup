import { cn } from "@/lib/utils";

/** Sized by the caller via className, e.g. `<Skeleton className="h-4 w-32" />`. */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("skeleton animate-shimmer rounded", className)} />;
}