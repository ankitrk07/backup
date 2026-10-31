import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

function buildHref(basePath: string, params: URLSearchParams, page: number) {
  const next = new URLSearchParams(params)
  if (page <= 1) next.delete("page")
  else next.set("page", String(page))
  const qs = next.toString()
  return qs ? `${basePath}?${qs}` : basePath
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  const pages = new Set<number>([1, total, current, current - 1, current + 1])
  const sorted = Array.from(pages).filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)

  const result: (number | "ellipsis")[] = []
  let prev = 0
  for (const p of sorted) {
    if (prev && p - prev > 1) result.push("ellipsis")
    result.push(p)
    prev = p
  }
  return result
}

export function PaginationControls({
  basePath,
  currentSearchParams,
  page,
  pageCount,
}: {
  basePath: string
  currentSearchParams: Record<string, string | string[] | undefined>
  page: number
  pageCount: number
}) {
  if (pageCount <= 1) return null

  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(currentSearchParams)) {
    if (key === "page" || value === undefined) continue
    if (Array.isArray(value)) value.forEach((v) => params.append(key, v))
    else params.set(key, value)
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={buildHref(basePath, params, Math.max(1, page - 1))}
            aria-disabled={page <= 1}
            className={page <= 1 ? "pointer-events-none opacity-40" : undefined}
          />
        </PaginationItem>

        {getPageNumbers(page, pageCount).map((p, i) =>
          p === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink href={buildHref(basePath, params, p)} isActive={p === page}>
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href={buildHref(basePath, params, Math.min(pageCount, page + 1))}
            aria-disabled={page >= pageCount}
            className={page >= pageCount ? "pointer-events-none opacity-40" : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
