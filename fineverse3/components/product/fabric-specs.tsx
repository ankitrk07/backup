import type { FitType, Product } from "@/types/product";

const FIT_LABEL: Record<FitType, string> = {
  regular: "Regular fit",
  oversized: "Oversized fit",
  boxy: "Boxy fit",
  adjustable: "Adjustable",
  "one-size": "One size",
};

interface FabricSpecsProps {
  product: Pick<Product, "fabric" | "gsm" | "fit" | "colors">;
}

/**
 * The ONLY place fabric and GSM are displayed. Both come straight from the
 * product model, so claims can never contradict each other across the site.
 */
export function FabricSpecs({ product }: FabricSpecsProps) {
  const rows: Array<{ label: string; value: string }> = [
    { label: "Fabric", value: product.fabric },
    ...(product.gsm !== null ? [{ label: "Weight", value: `${product.gsm} GSM` }] : []),
    { label: "Fit", value: FIT_LABEL[product.fit] },
    { label: "Colours", value: product.colors.map((color) => color.name).join(", ") },
  ];

  return (
    <dl className="divide-y divide-line">
      {rows.map((row) => (
        <div key={row.label} className="flex justify-between gap-6 py-3 first:pt-0 last:pb-0">
          <dt className="text-muted">{row.label}</dt>
          <dd className="text-right font-semibold text-fg">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}