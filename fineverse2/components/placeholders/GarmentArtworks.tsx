import React from "react";

interface GarmentProps {
  color?: string; // "pitch-black" | "acid-volt" | "cosmic-violet" | "acid-neon"
  view?: "front" | "back" | "detail";
  className?: string;
  artworkTitle?: string;
}

/**
 * High-definition vector artwork for Oversized Tees.
 * Accurately represents 240 GSM boxy drop-shoulder streetwear cut.
 */
export const OversizedTeeSVG: React.FC<GarmentProps> = ({
  color = "pitch-black",
  view = "front",
  className = "w-full h-full object-contain",
  artworkTitle = "SISTERS REVENGE",
}) => {
  const isAcid = color === "acid-volt";
  const garmentBase = isAcid ? "#CCFF00" : "#0D1017";
  const shadowColor = isAcid ? "#A0CC00" : "#05070A";
  const collarColor = isAcid ? "#B5E600" : "#080B10";
  const textColor = isAcid ? "#050508" : "#CCFF00";
  const secondaryArt = isAcid ? "#0D1017" : "#8B5CF6";
  const accentNeon = isAcid ? "#00F0FF" : "#CCFF00";

  if (view === "detail") {
    return (
      <svg viewBox="0 0 800 1000" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="1000" fill="#06080E" />
        {/* Fabric Macro Texture Pattern */}
        <defs>
          <pattern id="knitPattern" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 0 4 Q 4 0 8 4 Q 4 8 0 4" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
          </pattern>
          <linearGradient id="detailGrad" x1="0" y1="0" x2="800" y2="1000" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={garmentBase} />
            <stop offset="100%" stopColor={shadowColor} />
          </linearGradient>
        </defs>

        {/* Garment Section Macro */}
        <path d="M -50 0 L 850 0 L 850 650 Q 400 750 -50 650 Z" fill="url(#detailGrad)" />
        <rect width="800" height="1000" fill="url(#knitPattern)" opacity="0.6" />

        {/* 1x1 Heavy Ribbed Collar Section */}
        <path d="M 150 0 Q 400 220 650 0 L 630 0 Q 400 180 170 0 Z" fill={collarColor} stroke="#CCFF00" strokeWidth="1" strokeOpacity="0.4" />
        {/* Rib Lines */}
        {Array.from({ length: 30 }).map((_, i) => (
          <line
            key={i}
            x1={180 + i * 15}
            y1={10 + Math.sin(i * 0.1) * 20}
            x2={175 + i * 15}
            y2={90 + Math.sin(i * 0.1) * 40}
            stroke={isAcid ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.12)"}
            strokeWidth="2"
          />
        ))}

        {/* Printed High-Density Discharge Graphic Macro */}
        <g transform="translate(180, 420)">
          <rect x="0" y="0" width="440" height="260" rx="4" fill="rgba(0,0,0,0.5)" stroke={textColor} strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="220" y="70" textAnchor="middle" fill={textColor} fontFamily="'Impact', sans-serif" fontSize="48" letterSpacing="4">
            FINEVERSE
          </text>
          <text x="220" y="110" textAnchor="middle" fill="#FFFFFF" fontFamily="monospace" fontSize="16" letterSpacing="6">
            240 GSM // COMPACT COMBED
          </text>
          <text x="220" y="145" textAnchor="middle" fill={accentNeon} fontFamily="monospace" fontSize="13" letterSpacing="3">
            ZERO SHRINKAGE BIO-SILICON FINISH
          </text>
          <line x1="60" y1="180" x2="380" y2="180" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <text x="220" y="215" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontFamily="monospace" fontSize="12" letterSpacing="5">
            AUTHENTIC SPECIMEN CERTIFICATE
          </text>
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 800 1000" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`teeGlow-${color}-${view}`} cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor={isAcid ? "rgba(204,255,0,0.15)" : "rgba(139,92,246,0.12)"} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id={`teeShade-${color}`} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor={garmentBase} />
          <stop offset="100%" stopColor={shadowColor} />
        </linearGradient>
      </defs>

      {/* Background Soft Aura */}
      <rect width="800" height="1000" fill="#05070C" />
      <circle cx="400" cy="500" r="350" fill={`url(#teeGlow-${color}-${view})`} />

      {/* Main Boxy Garment Body Silhouette (Oversized Drop-Shoulder) */}
      <g id="garmentBody">
        {/* Shadow Drop Under Sleeves */}
        <path d="M 110 370 L 170 380 L 170 820 L 110 820 Z" fill="#030406" opacity="0.6" />
        <path d="M 690 370 L 630 380 L 630 820 L 690 820 Z" fill="#030406" opacity="0.6" />

        {/* T-Shirt Silhouette */}
        <path
          d="
            M 310 120 
            Q 400 160 490 120 
            L 670 200 
            L 740 370 
            L 625 410 
            L 615 370 
            L 615 840 
            Q 400 855 185 840 
            L 185 370 
            L 175 410 
            L 60 370 
            L 130 200 
            Z
          "
          fill={`url(#teeShade-${color})`}
          stroke={isAcid ? "#A5D600" : "#1B2236"}
          strokeWidth="2.5"
        />

        {/* Side Seams & Drape Folds */}
        <path d="M 195 380 Q 205 600 190 835" stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none" />
        <path d="M 605 380 Q 595 600 610 835" stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none" />
        <path d="M 360 840 Q 400 820 440 840" stroke="rgba(0,0,0,0.4)" strokeWidth="3" fill="none" />

        {/* Heavy Ribbed Collar */}
        {view === "front" ? (
          <path
            d="M 310 120 Q 400 190 490 120 Q 400 150 310 120 Z"
            fill={collarColor}
            stroke={isAcid ? "#88B300" : "#2A3452"}
            strokeWidth="2"
          />
        ) : (
          <path
            d="M 310 120 Q 400 135 490 120 Q 400 145 310 120 Z"
            fill={collarColor}
            stroke={isAcid ? "#88B300" : "#2A3452"}
            strokeWidth="2"
          />
        )}

        {/* Sleeve Hem Stitching */}
        <line x1="75" y1="350" x2="160" y2="390" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="725" y1="350" x2="640" y2="390" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Bottom Hem Stitching */}
        <path d="M 190 825 Q 400 840 610 825" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
      </g>

      {/* GRAPHIC PRINTS */}
      {view === "front" ? (
        /* Front View: Left Chest Cyber Kanji & Minimalist FINEVERSE Orbit */
        <g transform="translate(250, 260)">
          <circle cx="35" cy="35" r="22" stroke={textColor} strokeWidth="2.5" fill="none" />
          <ellipse cx="35" cy="35" rx="36" ry="12" stroke={secondaryArt} strokeWidth="1.5" transform="rotate(-20 35 35)" fill="none" />
          <circle cx="28" cy="28" r="6" fill={textColor} />
          
          <text x="80" y="32" fill={textColor} fontFamily="'Impact', sans-serif" fontSize="22" letterSpacing="3">
            FINEVERSE
          </text>
          <text x="80" y="48" fill={isAcid ? "#050508" : "#A4B4DE"} fontFamily="monospace" fontSize="9" letterSpacing="4">
            CHAPTER IV // 2026
          </text>
          <text x="80" y="60" fill={accentNeon} fontFamily="monospace" fontSize="8" letterSpacing="1">
            240 GSM HEAVYWEIGHT
          </text>
        </g>
      ) : (
        /* Back View: Expansive Anime Cosmic Graphic "SISTERS REVENGE" */
        <g id="backArtwork" transform="translate(210, 230)">
          {/* Back Art Box */}
          <rect x="0" y="0" width="380" height="490" rx="6" fill="rgba(3, 5, 10, 0.75)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

          {/* Halftone / Celestial Grid inside artwork */}
          <circle cx="190" cy="200" r="140" fill={isAcid ? "rgba(0,0,0,0.15)" : "rgba(139,92,246,0.15)"} />
          <ellipse cx="190" cy="200" rx="170" ry="50" transform="rotate(-15 190 200)" stroke={textColor} strokeWidth="2" strokeDasharray="6 4" fill="none" />
          
          {/* Astral Twin Blades (Stylized Anime Vector Silhouettes) */}
          <path d="M 120 340 L 220 90 L 230 100 L 130 350 Z" fill={textColor} />
          <path d="M 260 340 L 160 90 L 150 100 L 250 350 Z" fill={secondaryArt} opacity="0.9" />
          <circle cx="190" cy="190" r="16" fill={accentNeon} />

          {/* Japanese Katakana Header */}
          <text x="190" y="45" textAnchor="middle" fill={accentNeon} fontFamily="sans-serif" fontWeight="900" fontSize="18" letterSpacing="8">
            シスターズ・リベンジ
          </text>

          {/* Main Title Typography */}
          <text x="190" y="90" textAnchor="middle" fill={textColor} fontFamily="'Impact', sans-serif" fontSize="42" letterSpacing="3">
            {artworkTitle}
          </text>

          {/* Celestial Planet Sphere */}
          <circle cx="190" cy="380" r="45" fill={isAcid ? "#0D1017" : "#0A0D18"} stroke={textColor} strokeWidth="2" />
          <ellipse cx="190" cy="380" rx="70" ry="18" stroke={secondaryArt} strokeWidth="2" fill="none" />

          {/* Footer Coordinates & Spec */}
          <text x="190" y="450" textAnchor="middle" fill={isAcid ? "#050508" : "#CBD5F1"} fontFamily="monospace" fontSize="10" letterSpacing="3">
            RA 05h 35m // DEC -05° 23' // 420LY
          </text>
          <text x="190" y="470" textAnchor="middle" fill={textColor} fontFamily="monospace" fontSize="9" letterSpacing="4">
            LIMITED EDITION DROP 04
          </text>
        </g>
      )}

      {/* Numbered Hem Tag for Limited Drops */}
      <rect x="200" y="810" width="36" height="24" rx="2" fill="#000000" stroke={textColor} strokeWidth="1" />
      <text x="218" y="825" textAnchor="middle" fill={textColor} fontFamily="monospace" fontSize="7" fontWeight="bold">
        #04
      </text>
    </svg>
  );
};

/**
 * High-definition vector artwork for Heavyweight Hoodies (420 GSM).
 */
export const HeavyweightHoodieSVG: React.FC<GarmentProps> = ({
  color = "pitch-black",
  view = "front",
  className = "w-full h-full object-contain",
  artworkTitle = "PLANET X",
}) => {
  const isViolet = color === "cosmic-violet";
  const garmentBase = isViolet ? "#1A1035" : "#0C0E14";
  const shadowColor = isViolet ? "#0F0824" : "#05060A";
  const textColor = isViolet ? "#CCFF00" : "#8B5CF6";
  const accentNeon = isViolet ? "#00F0FF" : "#CCFF00";

  if (view === "detail") {
    return (
      <svg viewBox="0 0 800 1000" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="1000" fill="#07090F" />
        <defs>
          <pattern id="loopbackTerry" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M 2 6 Q 6 1 10 6 Q 6 11 2 6" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.2" />
          </pattern>
        </defs>

        <rect x="50" y="50" width="700" height="900" rx="8" fill={garmentBase} stroke="rgba(255,255,255,0.1)" />
        <rect x="50" y="50" width="700" height="900" fill="url(#loopbackTerry)" opacity="0.8" />

        {/* 3D Embroidered Emblem Detail */}
        <g transform="translate(250, 360)">
          <circle cx="150" cy="120" r="80" fill="rgba(0,0,0,0.5)" stroke={textColor} strokeWidth="3" />
          <ellipse cx="150" cy="120" rx="120" ry="35" transform="rotate(-25 150 120)" stroke={accentNeon} strokeWidth="4" fill="none" />
          <circle cx="150" cy="120" r="25" fill={textColor} />
          <text x="150" y="240" textAnchor="middle" fill="#FFFFFF" fontFamily="'Impact', sans-serif" fontSize="28" letterSpacing="4">
            420 GSM FRENCH TERRY
          </text>
          <text x="150" y="270" textAnchor="middle" fill={accentNeon} fontFamily="monospace" fontSize="13" letterSpacing="4">
            HEAVY LOOPBACK INTERIOR
          </text>
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 800 1000" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`hoodieGlow-${color}`} cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor={isViolet ? "rgba(139,92,246,0.2)" : "rgba(204,255,0,0.1)"} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      <rect width="800" height="1000" fill="#05070C" />
      <circle cx="400" cy="500" r="360" fill={`url(#hoodieGlow-${color})`} />

      {/* Heavyweight Hoodie Silhouette */}
      <g id="hoodieBody">
        {/* Sleeves & Main Body */}
        <path
          d="
            M 270 180 
            L 120 220 
            L 30 460 
            L 110 500 
            L 170 380 
            L 170 820 
            Q 400 835 630 820 
            L 630 380 
            L 690 500 
            L 770 460 
            L 680 220 
            L 530 180 
            Z
          "
          fill={garmentBase}
          stroke={isViolet ? "#3F2680" : "#1E2438"}
          strokeWidth="3"
        />

        {/* Double-Layer Structured Hood (No cheap drawstrings) */}
        <path
          d="
            M 270 180 
            C 250 80, 310 40, 400 40 
            C 490 40, 550 80, 530 180 
            C 490 220, 310 220, 270 180 
            Z
          "
          fill={shadowColor}
          stroke={isViolet ? "#5433AB" : "#28324E"}
          strokeWidth="2.5"
        />
        {/* Hood Inner Cross-Over Collar */}
        <path d="M 330 170 Q 400 230 470 170" stroke={accentNeon} strokeWidth="2" fill="none" opacity="0.6" />

        {/* Kangaroo Pocket */}
        {view === "front" && (
          <path
            d="
              M 250 560 
              L 550 560 
              L 580 720 
              L 220 720 
              Z
            "
            fill={shadowColor}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="2"
          />
        )}

        {/* Deep Rib Hem & Cuffs */}
        <rect x="170" y="800" width="460" height="40" fill={shadowColor} stroke="rgba(255,255,255,0.06)" />
        <line x1="170" y1="800" x2="630" y2="800" stroke={textColor} strokeWidth="1" strokeDasharray="6 4" opacity="0.4" />
      </g>

      {/* PRINTS */}
      {view === "front" ? (
        <g transform="translate(320, 320)">
          <circle cx="80" cy="80" r="45" fill="none" stroke={textColor} strokeWidth="3" />
          <ellipse cx="80" cy="80" rx="75" ry="22" stroke={accentNeon} strokeWidth="2.5" transform="rotate(-20 80 80)" fill="none" />
          <circle cx="80" cy="80" r="14" fill={textColor} />
          <text x="80" y="165" textAnchor="middle" fill="#FFFFFF" fontFamily="'Impact', sans-serif" fontSize="24" letterSpacing="4">
            FINEVERSE
          </text>
          <text x="80" y="188" textAnchor="middle" fill={accentNeon} fontFamily="monospace" fontSize="10" letterSpacing="3">
            420 GSM FRENCH TERRY
          </text>
        </g>
      ) : (
        <g transform="translate(200, 240)">
          {/* Back Full Scale Graphic */}
          <rect x="0" y="0" width="400" height="460" rx="8" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.12)" />
          
          <text x="200" y="60" textAnchor="middle" fill={textColor} fontFamily="'Impact', sans-serif" fontSize="48" letterSpacing="4">
            {artworkTitle}
          </text>
          <text x="200" y="90" textAnchor="middle" fill={accentNeon} fontFamily="monospace" fontSize="12" letterSpacing="6">
            CHAPTER IV // ORBITAL EXPEDITION
          </text>

          {/* Planetary Matrix Graphic */}
          <circle cx="200" cy="230" r="85" fill={isViolet ? "#281552" : "#0D111D"} stroke={textColor} strokeWidth="3" />
          <ellipse cx="200" cy="230" rx="150" ry="45" transform="rotate(-24 200 230)" stroke={accentNeon} strokeWidth="3" fill="none" />
          <circle cx="160" cy="190" r="12" fill={textColor} />
          
          <text x="200" y="380" textAnchor="middle" fill="#FFFFFF" fontFamily="monospace" fontSize="11" letterSpacing="4">
            CORD: 12.449.88 // SECTOR 09
          </text>
          <text x="200" y="410" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontFamily="monospace" fontSize="9" letterSpacing="3">
            FINEVERSE NOCTURNAL MERCH LABS
          </text>
        </g>
      )}
    </svg>
  );
};

/**
 * Tactical Flight Tag (Accessory) Vector Component.
 */
export const TacticalFlightTagSVG: React.FC<GarmentProps> = ({
  color = "acid-neon",
  view = "front",
  className = "w-full h-full object-contain",
}) => {
  const isAcid = color === "acid-neon";
  const strapColor = isAcid ? "#CCFF00" : "#8B5CF6";
  const strapText = isAcid ? "#050508" : "#FFFFFF";

  return (
    <svg viewBox="0 0 800 1000" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="1000" fill="#05070C" />
      <g transform="translate(340, 100)">
        {/* Metal Carabiner Clip (Gunmetal Alloy) */}
        <path d="M 60 40 Q 60 0 30 0 Q 0 0 0 40 L 0 160 Q 0 200 30 200 Q 60 200 60 160 Z" fill="#14171F" stroke="#363E52" strokeWidth="8" />
        <rect x="18" y="70" width="24" height="60" rx="4" fill="#0A0C12" stroke="#505C78" strokeWidth="2" />
        {/* Keyring */}
        <circle cx="30" cy="220" r="30" stroke="#48536C" strokeWidth="7" fill="none" />

        {/* Woven Jacquard Ribbon */}
        <g transform="translate(-10, 260)">
          <rect x="0" y="0" width="80" height="540" rx="4" fill={strapColor} stroke="#000000" strokeWidth="3" />
          <line x1="8" y1="0" x2="8" y2="540" stroke="rgba(0,0,0,0.2)" strokeWidth="2" strokeDasharray="6 4" />
          <line x1="72" y1="0" x2="72" y2="540" stroke="rgba(0,0,0,0.2)" strokeWidth="2" strokeDasharray="6 4" />

          {/* Vertical Japanese & Streetwear Typography */}
          <text
            x="-270"
            y="48"
            transform="rotate(-90)"
            fill={strapText}
            fontFamily="'Impact', sans-serif"
            fontSize="32"
            letterSpacing="6"
          >
            {view === "front" ? "REMOVE BEFORE VOID" : "FINEVERSE // DROP 04"}
          </text>
        </g>
      </g>
    </svg>
  );
};

/**
 * Constellation Cargo Dad Cap Vector Component.
 */
export const CargoCapSVG: React.FC<GarmentProps> = ({
  className = "w-full h-full object-contain",
  view = "front",
}) => {
  return (
    <svg viewBox="0 0 800 1000" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="1000" fill="#05070C" />
      <g transform="translate(150, 320)">
        {/* Crown 6-Panel Structure */}
        <path
          d="
            M 50 260 
            C 60 80, 200 20, 250 20 
            C 300 20, 440 80, 450 260 
            Z
          "
          fill="#11141E"
          stroke="#262D42"
          strokeWidth="4"
        />
        {/* Panel Seams */}
        <line x1="250" y1="20" x2="250" y2="260" stroke="#080A10" strokeWidth="3" />
        <path d="M 250 20 Q 150 140 100 260" stroke="#080A10" strokeWidth="2" />
        <path d="M 250 20 Q 350 140 400 260" stroke="#080A10" strokeWidth="2" />

        {/* Top Button */}
        <circle cx="250" cy="20" r="14" fill="#080A10" stroke="#262D42" strokeWidth="2" />

        {/* Curved Brim */}
        <path
          d="
            M 20 260 
            C 100 360, 400 360, 480 260 
            C 440 240, 60 240, 20 260 
            Z
          "
          fill="#0B0D14"
          stroke="#262D42"
          strokeWidth="3"
        />

        {/* Embroidered Planet Crest (Front) */}
        {view === "front" && (
          <g transform="translate(200, 110)">
            <circle cx="50" cy="50" r="30" fill="none" stroke="#CCFF00" strokeWidth="3" />
            <ellipse cx="50" cy="50" rx="55" ry="16" transform="rotate(-20 50 50)" stroke="#00F0FF" strokeWidth="2.5" fill="none" />
            <circle cx="50" cy="50" r="9" fill="#CCFF00" />
            <text x="50" y="105" textAnchor="middle" fill="#FFFFFF" fontFamily="monospace" fontSize="9" letterSpacing="3">
              FINEVERSE
            </text>
          </g>
        )}
      </g>
    </svg>
  );
};
