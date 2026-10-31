import { Badge } from "@/components/ui/badge"
import type { OrderStatus } from "@/generated/prisma/client"

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  PENDING: { label: "Pending", className: "bg-rating/20 text-primary" },
  CONFIRMED: { label: "Confirmed", className: "bg-brand/10 text-brand" },
  PROCESSING: { label: "Processing", className: "bg-brand/10 text-brand" },
  SHIPPED: { label: "Shipped", className: "bg-brand/10 text-brand" },
  OUT_FOR_DELIVERY: { label: "Out for Delivery", className: "bg-brand/10 text-brand" },
  DELIVERED: { label: "Delivered", className: "bg-success/10 text-success" },
  CANCELLED: { label: "Cancelled", className: "bg-sale/10 text-sale" },
  RETURNED: { label: "Returned", className: "bg-muted text-muted-foreground" },
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config = statusConfig[status]
  return <Badge className={config.className}>{config.label}</Badge>
}
