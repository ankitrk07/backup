import React from "react";
import { Truck, RotateCcw, ShieldCheck, Zap } from "lucide-react";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/formatters";

export const TrustStrip: React.FC = () => {
  const pillars = [
    {
      icon: <Truck className="w-5 h-5 text-acid" />,
      title: "FREE PAN-INDIA SHIPPING",
      description: `Complimentary express delivery on all orders exceeding ${formatPrice(siteConfig.shipping.freeShippingThreshold)}.`,
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-purple-400" />,
      title: `${siteConfig.returns.windowDays}-DAY REPLACEMENT WINDOW`,
      description: "Easy exchanges for unworn pieces with cosmic tags attached.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
      title: "GUARANTEED FABRIC INTEGRITY",
      description: "Super combed 240 GSM single jersey and 420 GSM loopback French terry.",
    },
    {
      icon: <Zap className="w-5 h-5 text-acid" />,
      title: "CASH ON DELIVERY & UPI",
      description: "Verified pan-India payment methods: GPay, PhonePe, Cards, and COD.",
    },
  ];

  return (
    <section aria-label="Customer Guarantees" className="py-16 border-b border-white/10 bg-space-950">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-5 bg-space-900 border border-white/10 surface-card space-y-3"
            >
              <div className="w-10 h-10 rounded-none bg-void border border-white/10 flex items-center justify-center">
                {pillar.icon}
              </div>
              <h3 className="font-display font-bold uppercase text-sm text-white tracking-wider">
                {pillar.title}
              </h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
