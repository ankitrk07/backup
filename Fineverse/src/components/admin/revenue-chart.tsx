"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { formatPrice } from "@/lib/utils"

export function RevenueChart({ data }: { data: { date: string; revenue: number }[] }) {
  const formatted = data.map((d) => ({
    ...d,
    label: new Date(d.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
  }))

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={formatted} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-foreground)" stopOpacity={0.25} />
            <stop offset="95%" stopColor="var(--color-foreground)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border" />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          className="fill-muted-foreground text-xs"
          minTickGap={24}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          className="fill-muted-foreground text-xs"
          width={56}
          tickFormatter={(v) => formatPrice(v)}
        />
        <Tooltip
          formatter={(value) => [formatPrice(Number(value)), "Revenue"]}
          contentStyle={{
            background: "var(--color-popover)",
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            fontSize: 12,
          }}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="var(--color-foreground)"
          strokeWidth={2}
          fill="url(#revenueFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
