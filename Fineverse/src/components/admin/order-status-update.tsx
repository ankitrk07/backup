"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { OrderStatus } from "@/generated/prisma/client"

export function OrderStatusUpdate({ orderId, nextStatuses }: { orderId: string; nextStatuses: OrderStatus[] }) {
  const router = useRouter()
  const [selected, setSelected] = useState<OrderStatus | "">("")
  const [loading, setLoading] = useState(false)

  if (nextStatuses.length === 0) {
    return <p className="text-muted-foreground text-sm">This order is in a final state and can&rsquo;t be updated.</p>
  }

  const handleUpdate = async () => {
    if (!selected) return
    setLoading(true)
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: selected }),
    })
    const data = await res.json().catch(() => ({}))
    setLoading(false)

    if (!res.ok) {
      toast.error(data.error ?? "Failed to update order status")
      return
    }
    toast.success(`Order marked as ${selected.replace(/_/g, " ").toLowerCase()}`)
    setSelected("")
    router.refresh()
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={selected} onValueChange={(v) => setSelected(v as OrderStatus)}>
        <SelectTrigger className="w-[200px]" aria-label="Update order status">
          <SelectValue placeholder="Update status to..." />
        </SelectTrigger>
        <SelectContent>
          {nextStatuses.map((s) => (
            <SelectItem key={s} value={s}>
              {s.replace(/_/g, " ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button size="sm" onClick={handleUpdate} disabled={!selected || loading}>
        {loading && <Loader2 className="size-4 animate-spin" />}
        Update
      </Button>
    </div>
  )
}
