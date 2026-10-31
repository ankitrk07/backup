import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { pluralize } from "@/lib/format";
import { buildShopHref, type ShopFilters } from "@/lib/shop-query";

interface LoadMoreProps {
  filters: ShopFilters;
  shown: number;
  total: number;
  /** null when everything is already shown */
  nextPage: number | null;
}

/** A real link, so it works without JavaScript and every page state has a URL. */
export function LoadMore({ filters, shown, total, nextPage }: LoadMoreProps) {
  return (
    <div className="mt-12 flex flex-col items-center gap-4">
      <p role="status" className="text-sm text-muted">
        Showing {shown} of {total} {pluralize(total, "product")}
      </p>
      {nextPage ? (
        <Link
          href={buildShopHref({ ...filters, page: nextPage })}
          scroll={false}
          prefetch={false}
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          Load more
        </Link>
      ) : null}
    </div>
  );
}