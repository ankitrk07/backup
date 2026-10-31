import Link from "next/link"
import type { Route } from "next"
import { SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EmptyResults({
  title = "No products found",
  description = "Try adjusting your filters or search for something else.",
  clearHref,
}: {
  title?: string
  description?: string
  clearHref?: string
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
      <div className="bg-muted flex size-14 items-center justify-center rounded-full">
        <SearchX className="text-muted-foreground size-6" />
      </div>
      <p className="text-foreground text-lg font-semibold">{title}</p>
      <p className="text-muted-foreground max-w-sm text-sm">{description}</p>
      {clearHref && (
        <Button asChild variant="outline" size="sm" className="mt-2">
          <Link href={clearHref as Route}>Clear all filters</Link>
        </Button>
      )}
    </div>
  )
}
