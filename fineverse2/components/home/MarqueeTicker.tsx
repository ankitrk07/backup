import React from "react";

export const MarqueeTicker: React.FC = () => {
  const items = [
    "DROP 04 LIVE",
    "240 GSM SUPER COMBED COTTON",
    "420 GSM FRENCH TERRY",
    "NUMBERED COLLECTOR PIECES",
    "PAN-INDIA DISPATCH",
    "NO RESTOCKS ON NUMBERED DROPS",
    "BIO-SILICON FINISH",
    "AUTHENTIC CREATOR MERCH",
  ];

  return (
    <div
      aria-hidden="true"
      className="bg-acid text-void py-3 font-display font-black text-sm uppercase tracking-widest overflow-hidden border-y border-black select-none"
    >
      <div className="flex w-full whitespace-nowrap animate-marquee">
        {Array.from({ length: 3 }).map((_, repeatIndex) => (
          <div key={repeatIndex} className="flex items-center">
            {items.map((item, idx) => (
              <span key={idx} className="flex items-center">
                <span className="mx-6">{item}</span>
                <span className="text-black/40 font-mono">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
