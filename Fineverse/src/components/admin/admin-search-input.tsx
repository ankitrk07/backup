"use client"

import { useQueryState, parseAsString, parseAsInteger } from "nuqs"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function AdminSearchInput({ placeholder }: { placeholder: string }) {
  const [q, setQ] = useQueryState("q", parseAsString.withDefault(""))
  const [, setPage] = useQueryState("page", parseAsInteger)

  return (
    <div className="relative">
      <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
      <Input
        value={q}
        onChange={(e) => {
          setQ(e.target.value || null)
          setPage(null)
        }}
        placeholder={placeholder}
        className="pl-8"
      />
    </div>
  )
}
