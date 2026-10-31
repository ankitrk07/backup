"use client"

import { cn } from "@/lib/utils"

export function IconCountButton({
  icon,
  count,
  label,
  onClick,
  className,
}: {
  icon: React.ReactNode
  count: number
  label: string
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${label}${count > 0 ? ` (${count} items)` : ""}`}
      className={cn(
        "hover:bg-muted relative flex size-9 items-center justify-center rounded-full transition-colors",
        className
      )}
    >
      {icon}
      {count > 0 && (
        <span className="bg-brand text-brand-foreground absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-semibold leading-none">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  )
}
