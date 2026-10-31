"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { ProductCategory } from "@/types/product";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: ProductCategory;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  category,
}) => {
  const [unit, setUnit] = useState<"cm" | "in">("in");

  const isTee = category === "oversized-tees";

  // Streetwear Size Measurements
  const measurements = isTee
    ? [
        { size: "XS", chest: unit === "in" ? "42" : "107", length: unit === "in" ? "28" : "71", shoulder: unit === "in" ? "21" : "53" },
        { size: "S", chest: unit === "in" ? "44" : "112", length: unit === "in" ? "29" : "74", shoulder: unit === "in" ? "22" : "56" },
        { size: "M", chest: unit === "in" ? "46" : "117", length: unit === "in" ? "30" : "76", shoulder: unit === "in" ? "23" : "58" },
        { size: "L", chest: unit === "in" ? "48" : "122", length: unit === "in" ? "31" : "79", shoulder: unit === "in" ? "24" : "61" },
        { size: "XL", chest: unit === "in" ? "50" : "127", length: unit === "in" ? "32" : "81", shoulder: unit === "in" ? "25" : "63" },
        { size: "2XL", chest: unit === "in" ? "52" : "132", length: unit === "in" ? "33" : "84", shoulder: unit === "in" ? "26" : "66" },
      ]
    : [
        { size: "S", chest: unit === "in" ? "46" : "117", length: unit === "in" ? "27" : "69", shoulder: unit === "in" ? "23" : "58" },
        { size: "M", chest: unit === "in" ? "48" : "122", length: unit === "in" ? "28" : "71", shoulder: unit === "in" ? "24" : "61" },
        { size: "L", chest: unit === "in" ? "50" : "127", length: unit === "in" ? "29" : "74", shoulder: unit === "in" ? "25" : "63" },
        { size: "XL", chest: unit === "in" ? "52" : "132", length: unit === "in" ? "30" : "76", shoulder: unit === "in" ? "26" : "66" },
        { size: "2XL", chest: unit === "in" ? "54" : "137", length: unit === "in" ? "31" : "79", shoulder: unit === "in" ? "27" : "69" },
      ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="STREETWEAR SIZE GUIDE"
      description={isTee ? "240 GSM Boxy Oversized Fit (True Drop-Shoulder)" : "420 GSM Thermal French Terry Fit"}
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Unit Toggle */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-xs font-mono text-zinc-400">MEASUREMENT UNITS:</span>
          <div className="flex border border-white/15 bg-space-900 p-0.5">
            <button
              onClick={() => setUnit("in")}
              className={`px-3 py-1 text-xs font-mono font-bold transition-colors ${
                unit === "in" ? "bg-acid text-void" : "text-zinc-400 hover:text-white"
              }`}
            >
              INCHES
            </button>
            <button
              onClick={() => setUnit("cm")}
              className={`px-3 py-1 text-xs font-mono font-bold transition-colors ${
                unit === "cm" ? "bg-acid text-void" : "text-zinc-400 hover:text-white"
              }`}
            >
              CENTIMETERS
            </button>
          </div>
        </div>

        {/* Measurements Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-white/15 text-zinc-400">
                <th className="py-2.5 px-3 uppercase">SIZE</th>
                <th className="py-2.5 px-3 uppercase">CHEST WIDTH ({unit})</th>
                <th className="py-2.5 px-3 uppercase">BODY LENGTH ({unit})</th>
                <th className="py-2.5 px-3 uppercase">SHOULDER DROP ({unit})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {measurements.map((row) => (
                <tr key={row.size} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 font-bold text-acid">{row.size}</td>
                  <td className="py-3 px-3 text-zinc-200">{row.chest}</td>
                  <td className="py-3 px-3 text-zinc-200">{row.length}</td>
                  <td className="py-3 px-3 text-zinc-200">{row.shoulder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fit Recommendation Note */}
        <div className="p-4 bg-space-900 border border-white/10 text-xs font-mono text-zinc-300 space-y-1.5">
          <p className="font-bold text-acid">FIT ADVICE FOR NOCTURNAL MERCH:</p>
          <p className="leading-relaxed">
            Our garments are cut boxy and oversized intentionally. If you want our intended loose anime streetwear drape, <strong>order your regular size</strong>. If you prefer a more tailored/standard fit, <strong>size down by one</strong>.
          </p>
        </div>
      </div>
    </Modal>
  );
};
