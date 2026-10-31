"use client";

import { Modal } from "@/components/ui/modal";
import type { SizeChart } from "@/types/content";

interface SizeGuideModalProps {
  open: boolean;
  onClose: () => void;
  chart: SizeChart;
}

const MEASURE_STEPS = [
  "Chest: measure around the fullest part of the chest, under the arms.",
  "Length: measure from the highest point of the shoulder to the bottom hem.",
  "Shoulder: measure straight across the back, seam to seam.",
];

export function SizeGuideModal({ open, onClose, chart }: SizeGuideModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Size guide" description={chart.title} size="lg">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[20rem] text-left">
          <caption className="sr-only">{chart.title}: garment measurements in inches</caption>
          <thead>
            <tr className="border-b border-line font-display text-sm uppercase tracking-wider text-subtle">
              <th scope="col" className="py-3 pr-4 font-normal">
                Size
              </th>
              <th scope="col" className="px-4 py-3 font-normal">
                Chest (in)
              </th>
              <th scope="col" className="px-4 py-3 font-normal">
                Length (in)
              </th>
              <th scope="col" className="py-3 pl-4 font-normal">
                Shoulder (in)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {chart.rows.map((row) => (
              <tr key={row.size}>
                <th scope="row" className="py-3 pr-4 font-display text-lg text-accent">
                  {row.size}
                </th>
                <td className="px-4 py-3 text-fg tabular">{row.chest}</td>
                <td className="px-4 py-3 text-fg tabular">{row.length}</td>
                <td className="py-3 pl-4 text-fg tabular">{row.shoulder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-subtle">{chart.note}</p>

      <h3 className="mt-6 font-display text-lg uppercase tracking-wide text-fg">How to measure</h3>
      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-muted marker:text-accent">
        {MEASURE_STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
    </Modal>
  );
}