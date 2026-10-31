"use client";

import { useRouter } from "next/navigation";
import { useId, useTransition } from "react";
import { Select } from "@/components/ui/select";
import { SORT_OPTIONS, buildShopHref, type ShopFilters } from "@/lib/shop-query";

export function SortSelect({ filters }: { filters: ShopFilters }) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const id = useId();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="hidden text-sm text-muted sm:block">
        Sort by
      </label>
      <div className="min-w-[10.5rem]">
        <Select
          id={id}
          value={filters.sort}
          onChange={(event) => {
            const option = SORT_OPTIONS.find((item) => item.value === event.target.value);
            if (!option) return;
            startTransition(() => {
              router.push(buildShopHref({ ...filters, sort: option.value, page: 1 }), {
                scroll: false,
              });
            });
          }}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}