import React from "react";

interface BannerProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

/**
 * Hero Visual Artwork — Dark Cosmic Anime Theme with Orbital Rings and Halftone
 */
export const HeroBannerSVG: React.FC<BannerProps> = ({
  className = "w-full h-full object-cover",
}) => {
  return (
    <svg viewBox="0 0 1440 900" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="heroCore" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#1E143E" />
          <stop offset="50%" stopColor="#0B0E17" />
          <stop offset="100%" stopColor="#050508" />
        </radialGradient>
        <linearGradient id="neonBeam" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#CCFF00" />
          <stop offset="50%" stopColor="#00F0FF" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <pattern id="dotHalftone" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="rgba(255,255,255,0.08)" />
        </pattern>
      </defs>

      {/* Deep Space Background */}
      <rect width="1440" height="900" fill="url(#heroCore)" />
      <rect width="1440" height="900" fill="url(#dotHalftone)" />

      {/* Cosmic Horizon Perspective Grid */}
      <g opacity="0.3">
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1={-200 + i * 80}
            y1="900"
            x2="720"
            y2="420"
            stroke="#8B5CF6"
            strokeWidth="1.2"
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse
            key={i}
            cx="720"
            cy="420"
            rx={100 + i * 110}
            ry={20 + i * 35}
            stroke="#CCFF00"
            strokeWidth="1"
            fill="none"
            opacity={0.4 - i * 0.04}
          />
        ))}
      </g>

      {/* Giant Central Celestial Ring Sphere */}
      <g transform="translate(720, 420)">
        {/* Core Planet */}
        <circle cx="0" cy="0" r="180" fill="#090D18" stroke="url(#neonBeam)" strokeWidth="3" />
        <ellipse cx="0" cy="0" rx="360" ry="110" transform="rotate(-24)" stroke="url(#neonBeam)" strokeWidth="6" fill="none" opacity="0.9" />
        <ellipse cx="0" cy="0" rx="310" ry="90" transform="rotate(-24)" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="12 8" fill="none" opacity="0.6" />

        {/* Orbiting Celestial Moons */}
        <circle cx="-240" cy="-140" r="28" fill="#CCFF00" />
        <circle cx="260" cy="110" r="16" fill="#00F0FF" />
      </g>

      {/* Astral Twin Blades Silhouettes (Anime Motif) */}
      <g transform="translate(720, 400)">
        <path d="M -160 220 L 0 -190 L 15 -170 L -140 230 Z" fill="#CCFF00" opacity="0.85" />
        <path d="M 160 220 L 0 -190 L -15 -170 L 140 230 Z" fill="#8B5CF6" opacity="0.85" />
      </g>

      {/* Cyberpunk Coordinates Overlay */}
      <text x="60" y="820" fill="rgba(255,255,255,0.4)" fontFamily="monospace" fontSize="13" letterSpacing="4">
        SYS.LOC: ORBIT_04 // ALPHA SECTOR // 240GSM_420GSM
      </text>
      <text x="1380" y="820" textAnchor="end" fill="#CCFF00" fontFamily="monospace" fontSize="13" letterSpacing="5">
        FINEVERSE CREATOR STUDIOS // NOCTURNAL EDITION
      </text>
    </svg>
  );
};

/**
 * Drop 04 "Sisters Revenge" Spotlight Banner
 */
export const DropSpotlightBannerSVG: React.FC<BannerProps> = ({
  className = "w-full h-full object-cover",
}) => {
  return (
    <svg viewBox="0 0 1200 600" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="600" fill="#080A12" />
      <radialGradient id="dropAura" cx="70%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#25164E" />
        <stop offset="100%" stopColor="#080A12" />
      </radialGradient>
      <rect width="1200" height="600" fill="url(#dropAura)" />

      {/* Planetary System Silhouette */}
      <circle cx="850" cy="300" r="190" fill="#0A0F1F" stroke="#CCFF00" strokeWidth="2.5" />
      <ellipse cx="850" cy="300" rx="340" ry="100" transform="rotate(-20 850 300)" stroke="#00F0FF" strokeWidth="4" fill="none" />

      {/* Manga Speed Lines Accent */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1={500 + i * 40}
          y1="0"
          x2={400 + i * 35}
          y2="600"
          stroke="rgba(204,255,0,0.06)"
          strokeWidth="3"
        />
      ))}

      {/* Limited Edition Typography */}
      <text x="80" y="210" fill="#CCFF00" fontFamily="monospace" fontSize="18" letterSpacing="6">
        CHAPTER IV // LIMITED TO 500 PIECES
      </text>
      <text x="80" y="280" fill="#FFFFFF" fontFamily="'Impact', sans-serif" fontSize="64" letterSpacing="3">
        SISTERS REVENGE
      </text>
      <text x="80" y="340" fill="#A4B4DE" fontFamily="sans-serif" fontSize="18" letterSpacing="2">
        240 GSM Combed Compact Tees • 420 GSM French Terry Hoodies
      </text>
      <rect x="80" y="380" width="160" height="38" rx="4" fill="#CCFF00" />
      <text x="160" y="405" textAnchor="middle" fill="#050508" fontFamily="'Impact', sans-serif" fontSize="16" letterSpacing="2">
        EXPLORE DROP
      </text>
    </svg>
  );
};

/**
 * Category Card Graphic Tiles
 */
export const CategoryTileSVG: React.FC<{ categorySlug: string; className?: string }> = ({
  categorySlug,
  className = "w-full h-full object-cover",
}) => {
  const isHoodie = categorySlug.includes("hoodie");
  const isAccessory = categorySlug.includes("accessories") || categorySlug.includes("headwear");
  const isDrop = categorySlug.includes("drop");

  const title = isDrop
    ? "DROP 04: SISTERS REVENGE"
    : isHoodie
    ? "HEAVYWEIGHT HOODIES"
    : isAccessory
    ? "TACTICAL & ACCESSORIES"
    : "OVERSIZED TEES";

  const sub = isDrop
    ? "LIMITED NUMBERED PIECES"
    : isHoodie
    ? "420 GSM FRENCH TERRY"
    : isAccessory
    ? "FLIGHT TAGS & CAPS"
    : "240 GSM BIO-SILICON SINGLE JERSEY";

  return (
    <svg viewBox="0 0 600 750" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="750" fill="#090C16" />
      
      {/* Dynamic Graphic Background */}
      <circle cx="300" cy="350" r="180" fill={isHoodie ? "#1C1236" : "#0F1A2A"} stroke={isHoodie ? "#8B5CF6" : "#CCFF00"} strokeWidth="2" strokeDasharray="8 6" />
      <ellipse cx="300" cy="350" rx="260" ry="80" transform="rotate(-18 300 350)" stroke={isHoodie ? "#CCFF00" : "#00F0FF"} strokeWidth="3" fill="none" />

      {/* Category Monogram Icon */}
      <text x="300" y="380" textAnchor="middle" fill="rgba(255,255,255,0.15)" fontFamily="'Impact', sans-serif" fontSize="160">
        {isHoodie ? "420" : isAccessory ? "TAG" : "240"}
      </text>

      {/* Label Overlay */}
      <rect x="30" y="620" width="540" height="95" rx="6" fill="rgba(5, 7, 12, 0.9)" stroke="rgba(255,255,255,0.1)" />
      <text x="50" y="660" fill="#FFFFFF" fontFamily="'Impact', sans-serif" fontSize="24" letterSpacing="2">
        {title}
      </text>
      <text x="50" y="690" fill="#CCFF00" fontFamily="monospace" fontSize="12" letterSpacing="3">
        {sub}
      </text>
    </svg>
  );
};
