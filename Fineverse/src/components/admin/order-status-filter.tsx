"use client"

import { useQueryState, parseAsString, parseAsInteger } from "nuqs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const statuses = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
] as const

export function OrderStatusFilter() {
  const [status, setStatus] = useQueryState("status", parseAsString.withDefault("all"))
  const [, setPage] = useQueryState("page", parseAsInteger)

  return (
    <Select
      value={status}
      onValueChange={(value) => {
        setStatus(value === "all" ? null : value)
        setPage(null)
      }}
    >
      <SelectTrigger className="w-[180px]" aria-label="Filter orders by status">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Statuses</SelectItem>
        {statuses.map((s) => (
          <SelectItem key={s} value={s}>
            {s.replace(/_/g, " ")}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
