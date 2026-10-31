import Link from "next/link"
import type { Route } from "next"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function SectionHeading({
  title,
  description,
  href,
  hrefLabel = "View all",
  className,
}: {
  title: string
  description?: string
  href?: string
  hrefLabel?: string
  className?: string
}) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7", className)}>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="h-1.5 w-5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
            Curated
          </span>
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">{title}</h2>
        {description && <p className="text-muted-foreground mt-1 text-xs sm:text-sm font-normal">{description}</p>}
      </div>
      {href && (
        <Link
          href={href as Route}
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border/80 bg-card/70 px-4 py-1.5 text-xs font-semibold text-foreground backdrop-blur-sm transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-400 self-start sm:self-auto"
        >
          {hrefLabel}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  )
}
