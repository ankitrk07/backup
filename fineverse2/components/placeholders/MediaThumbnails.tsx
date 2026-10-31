import React from "react";

interface MediaProps {
  className?: string;
  title?: string;
  authorName?: string;
}

/**
 * YouTube Creator Facade Thumbnail
 */
export const YouTubeThumbnailSVG: React.FC<MediaProps> = ({
  className = "w-full h-full object-cover",
  title = "DESIGNING DROP 04: THE 'SISTERS REVENGE' STREETWEAR DROP",
}) => {
  return (
    <svg viewBox="0 0 1280 720" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ytGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1B1238" />
          <stop offset="70%" stopColor="#080A12" />
          <stop offset="100%" stopColor="#040508" />
        </radialGradient>
      </defs>

      <rect width="1280" height="720" fill="url(#ytGrad)" />

      {/* Cyber Grid & Video Backdrop */}
      <g opacity="0.25">
        {Array.from({ length: 16 }).map((_, i) => (
          <line key={i} x1="0" y1={i * 50} x2="1280" y2={i * 50} stroke="#8B5CF6" strokeWidth="1" />
        ))}
        {Array.from({ length: 26 }).map((_, i) => (
          <line key={i} x1={i * 50} y1="0" x2={i * 50} y2="720" stroke="#8B5CF6" strokeWidth="1" />
        ))}
      </g>

      {/* Behind The Scenes Graphics */}
      <circle cx="940" cy="360" r="220" fill="#0C1020" stroke="#CCFF00" strokeWidth="3" />
      <ellipse cx="940" cy="360" rx="360" ry="110" transform="rotate(-25 940 360)" stroke="#00F0FF" strokeWidth="4" fill="none" />
      
      {/* Big Creator Badge */}
      <rect x="80" y="80" width="220" height="42" rx="4" fill="#CCFF00" />
      <text x="190" y="107" textAnchor="middle" fill="#050508" fontFamily="'Impact', sans-serif" fontSize="18" letterSpacing="3">
        FINEVERSE LABS
      </text>

      {/* Title Text */}
      <text x="80" y="440" fill="#FFFFFF" fontFamily="'Impact', sans-serif" fontSize="56" letterSpacing="2">
        HOW WE MADE
      </text>
      <text x="80" y="510" fill="#CCFF00" fontFamily="'Impact', sans-serif" fontSize="56" letterSpacing="2">
        DROP 04 "SISTERS REVENGE"
      </text>
      <text x="80" y="560" fill="#A4B4DE" fontFamily="monospace" fontSize="20" letterSpacing="4">
        240 GSM SAMPLING // DISCHARGE PRINTS // STUDIO VLOG
      </text>

      {/* Play Button Overlay */}
      <circle cx="640" cy="360" r="54" fill="rgba(204,255,0,0.9)" />
      <path d="M 630 335 L 665 360 L 630 385 Z" fill="#050508" />
    </svg>
  );
};

/**
 * Testimonial Creator Avatar SVG Component
 */
export const AvatarSVG: React.FC<{ authorName: string; className?: string }> = ({
  authorName,
  className = "w-12 h-12 rounded-full",
}) => {
  // Deterministic color selection based on name
  const isAarav = authorName.includes("Aarav");
  const isTanvi = authorName.includes("Tanvi");
  const isRohan = authorName.includes("Rohan");
  const accent = isAarav ? "#CCFF00" : isTanvi ? "#8B5CF6" : isRohan ? "#00F0FF" : "#FF0055";

  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#0E121E" stroke={accent} strokeWidth="3" />
      {/* Stylized Anime Streetwear Silhouette Avatar */}
      <circle cx="50" cy="40" r="20" fill="#1C2336" />
      <path d="M 22 84 C 24 64, 40 58, 50 58 C 60 58, 76 64, 78 84 Z" fill="#1C2336" />
      {/* Cosmic Eyewear / Streetwear Mask Accent */}
      <rect x="36" y="36" width="28" height="8" rx="2" fill={accent} />
    </svg>
  );
};
