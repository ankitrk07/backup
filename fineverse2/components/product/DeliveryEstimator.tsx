"use client";

import React, { useState } from "react";
import { Truck, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { isValidIndianPincode } from "@/lib/formatters";
import { siteConfig } from "@/config/site";

export const DeliveryEstimator: React.FC = () => {
  const [pincode, setPincode] = useState("");
  const [estimate, setEstimate] = useState<{
    days: string;
    isMetro: boolean;
    city?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setEstimate(null);

    if (!isValidIndianPincode(pincode)) {
      setError("Please enter a valid 6-digit Indian Postal PIN code.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Simulated Indian PIN lookup logic
      const firstDigit = pincode.charAt(0);
      const isMetro = ["1", "4", "5", "6"].includes(firstDigit); // Delhi, Mumbai, Hyderabad, Bengaluru metros

      setEstimate({
        days: isMetro ? siteConfig.shipping.metroEstimatedDays : siteConfig.shipping.restOfIndiaEstimatedDays,
        isMetro,
        city: isMetro ? "Metro Zone (Priority Dispatch)" : "Standard Logistics Hub",
      });
    }, 400);
  };

  return (
    <div className="surface-card p-5 border border-white/10 space-y-3">
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-300">
        <Truck className="w-4 h-4 text-acid" />
        <span>CHECK ESTIMATED DELIVERY TO YOUR PINCODE</span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
          placeholder="Enter 6-digit PIN code"
          className="w-full h-11 bg-space-900 border border-white/15 px-3.5 text-sm text-zinc-100 font-mono placeholder:text-zinc-500 focus:border-acid focus:outline-none focus:ring-1 focus:ring-acid"
        />
        <button
          type="submit"
          disabled={isLoading || pincode.length !== 6}
          className="h-11 px-5 bg-space-800 hover:bg-space-700 disabled:opacity-40 disabled:cursor-not-allowed border border-white/20 text-xs font-mono font-bold uppercase tracking-wider text-white transition-colors flex-shrink-0 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-acid"
        >
          {isLoading ? (
            <span>CHECKING...</span>
          ) : (
            <>
              <span>CHECK</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="flex items-center gap-2 text-xs font-mono text-cosmic-crimson">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {estimate && (
        <div className="p-3 bg-acid/10 border border-acid/30 text-xs font-mono space-y-1">
          <div className="flex items-center gap-1.5 text-acid font-bold">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>ESTIMATED DELIVERY IN {estimate.days.toUpperCase()}</span>
          </div>
          <p className="text-zinc-400 pl-5 text-[11px]">
            {estimate.city} • Cash on Delivery & Express Prepaid tracking available.
          </p>
        </div>
      )}
    </div>
  );
};
