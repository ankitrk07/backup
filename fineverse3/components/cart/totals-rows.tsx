import { formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";

interface RowProps {
  label: string;
  value: string;
  tone?: "default" | "accent" | "success";
}

function Row({ label, value, tone = "default" }: RowProps) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd
        className={cn(
          "text-right font-semibold tabular",
          tone === "default" && "text-fg",
          tone === "accent" && "text-accent",
          tone === "success" && "text-success",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

interface TotalsRowsProps {
  subtotal: number;
  savings?: number;
  /** undefined = not known yet ("calculated at checkout"), 0 = free */
  shipping?: number;
  paymentFee?: number;
  total?: number;
  className?: string;
}

export function TotalsRows({
  subtotal,
  savings = 0,
  shipping,
  paymentFee = 0,
  total,
  className,
}: TotalsRowsProps) {
  return (
    <dl className={cn("space-y-3 text-base", className)}>
      <Row label="Subtotal" value={formatINR(subtotal)} />
      {savings > 0 ? <Row label="You save" value={`-${formatINR(savings)}`} tone="accent" /> : null}
      <Row
        label="Shipping"
        value={
          shipping === undefined
            ? "Calculated at checkout"
            : shipping === 0
              ? "Free"
              : formatINR(shipping)
        }
        tone={shipping === 0 ? "success" : "default"}
      />
      {paymentFee > 0 ? <Row label="Payment fee" value={formatINR(paymentFee)} /> : null}
      {total !== undefined ? (
        <div className="flex items-baseline justify-between gap-4 border-t border-line pt-3">
          <dt className="font-display text-xl uppercase tracking-wide text-fg">Total</dt>
          <dd className="font-display text-3xl tracking-wide text-fg tabular">{formatINR(total)}</dd>
        </div>
      ) : null}
    </dl>
  );
}