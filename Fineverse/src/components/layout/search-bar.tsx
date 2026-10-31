"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Search, X, Clock, TrendingUp, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { formatPrice } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
import { useRecentSearches } from "@/hooks/use-recent-searches"
import { popularSearches } from "@/lib/constants"
import type { ProductCardData } from "@/types"

type SuggestResponse = {
  products: ProductCardData[]
  categories: { name: string; slug: string }[]
}

export function SearchBar({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SuggestResponse>({ products: [], categories: [] })
  const debouncedQuery = useDebounce(query, 300)
  const { recent, add, clear } = useRecentSearches()

  // Fetch-on-dependency-change: no data-fetching library in this project,
  // so the effect owns request lifecycle (loading/result) directly.
  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults({ products: [], categories: [] })
      return
    }
    setLoading(true)
    fetch(`/api/search/suggestions?q=${encodeURIComponent(debouncedQuery)}`)
      .then((res) => res.json())
      .then(setResults)
      .finally(() => setLoading(false))
  }, [debouncedQuery])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const submit = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed) return
    add(trimmed)
    setOpen(false)
    onNavigate?.()
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  const showPanel = open

  return (
    <div ref={containerRef} className={className}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit(query)
        }}
        className="relative"
      >
        <Search className="text-muted-foreground pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Search for products, brands and more..."
          aria-label="Search products"
          className="h-10 rounded-full pl-9 pr-9"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="text-muted-foreground hover:text-foreground absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="size-4" />
          </button>
        )}
      </form>

      {showPanel && (
        <div className="bg-popover text-popover-foreground border-border absolute z-50 mt-2 w-full max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border shadow-lg sm:w-[420px]">
          <div className="max-h-[70vh] overflow-y-auto p-3">
            {loading && (
              <div className="text-muted-foreground flex items-center gap-2 px-2 py-3 text-sm">
                <Loader2 className="size-4 animate-spin" /> Searching...
              </div>
            )}

            {!loading && debouncedQuery.length >= 2 && (
              <>
                {results.categories.length > 0 && (
                  <div className="mb-2">
                    <p className="text-muted-foreground px-2 pb-1 text-xs font-medium uppercase tracking-wide">
                      Categories
                    </p>
                    {results.categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/products?category=${cat.slug}`}
                        onClick={() => setOpen(false)}
                        className="hover:bg-muted flex items-center gap-2 rounded-md px-2 py-2 text-sm"
                      >
                        <Search className="text-muted-foreground size-3.5" />
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}

                {results.products.length > 0 ? (
                  <div>
                    <p className="text-muted-foreground px-2 pb-1 text-xs font-medium uppercase tracking-wide">
                      Products
                    </p>
                    {results.products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={() => {
                          add(query)
                          setOpen(false)
                          onNavigate?.()
                        }}
                        className="hover:bg-muted flex items-center gap-3 rounded-md px-2 py-2"
                      >
                        <div className="bg-muted relative size-11 shrink-0 overflow-hidden rounded-md">
                          <Image src={product.image} alt="" fill className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-foreground">{product.name}</p>
                          <p className="text-muted-foreground text-xs">{formatPrice(product.price)}</p>
                        </div>
                      </Link>
                    ))}
                    <button
                      onClick={() => submit(query)}
                      className="text-brand mt-1 w-full rounded-md px-2 py-2 text-left text-sm font-medium hover:underline"
                    >
                      See all results for &ldquo;{query}&rdquo;
                    </button>
                  </div>
                ) : (
                  !loading && (
                    <p className="text-muted-foreground px-2 py-4 text-center text-sm">
                      No results for &ldquo;{debouncedQuery}&rdquo;
                    </p>
                  )
                )}
              </>
            )}

            {debouncedQuery.length < 2 && (
              <>
                {recent.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between px-2 pb-1">
                      <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                        Recent Searches
                      </p>
                      <button onClick={clear} className="text-muted-foreground text-xs hover:text-foreground">
                        Clear
                      </button>
                    </div>
                    {recent.map((term) => (
                      <button
                        key={term}
                        onClick={() => submit(term)}
                        className="hover:bg-muted flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm"
                      >
                        <Clock className="text-muted-foreground size-3.5" />
                        {term}
                      </button>
                    ))}
                  </div>
                )}
                <div>
                  <p className="text-muted-foreground px-2 pb-1 text-xs font-medium uppercase tracking-wide">
                    Popular Searches
                  </p>
                  <div className="flex flex-wrap gap-1.5 px-2 pt-1">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => submit(term)}
                        className="bg-muted hover:bg-accent flex items-center gap-1 rounded-full px-2.5 py-1 text-xs"
                      >
                        <TrendingUp className="size-3" />
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
