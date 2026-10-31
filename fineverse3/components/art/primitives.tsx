import type { CSSProperties, ReactNode } from "react";
import type { GraphicId } from "@/types/image";
import type { ColorId, ProductView } from "@/types/product";

export interface GarmentArtProps {
  /** Unique, deterministic prefix for every SVG id inside this artwork. */
  uid: string;
  color: ColorId;
  view: ProductView;
  graphic: GraphicId;
  /** Accessible name, becomes the SVG aria-label. */
  label: string;
}

export const ART_FONT: CSSProperties = {
  fontFamily: "var(--font-display), Anton, Impact, 'Arial Black', sans-serif",
  fontWeight: 400,
};

/** Dark end of every planet gradient. */
export const PLANET_DARK = "#120C2E";

const round = (value: number, digits = 1): number => {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
};

export function hashString(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** Small seeded PRNG so server and client produce identical artwork. */
export function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface ArtSvgProps {
  viewBox: string;
  label: string;
  children: ReactNode;
}

export function ArtSvg({ viewBox, label, children }: ArtSvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid slice"
      className="block h-full w-full"
    >
      {children}
    </svg>
  );
}

interface StarFieldProps {
  seed: number;
  count: number;
  width: number;
  height: number;
  maxRadius?: number;
}

export function StarField({ seed, count, width, height, maxRadius = 2 }: StarFieldProps) {
  const rand = mulberry32(seed);
  const colors = ["#FFFFFF", "#FFFFFF", "#C6FF3D", "#A78BFA"];
  const stars = Array.from({ length: count }, () => ({
    x: round(rand() * width),
    y: round(rand() * height),
    r: round(0.7 + rand() * (maxRadius - 0.7)),
    o: round(0.3 + rand() * 0.6, 2),
    c: colors[Math.floor(rand() * colors.length)],
  }));

  return (
    <g>
      {stars.map((star, index) => (
        <circle key={index} cx={star.x} cy={star.y} r={star.r} fill={star.c} fillOpacity={star.o} />
      ))}
    </g>
  );
}

interface SparkleProps {
  x: number;
  y: number;
  size: number;
  fill: string;
  opacity?: number;
  stroke?: string;
  strokeWidth?: number;
}

/** Four-point comic sparkle. */
export function Sparkle({ x, y, size, fill, opacity = 1, stroke, strokeWidth }: SparkleProps) {
  const d = [
    `M ${x} ${y - size}`,
    `Q ${x} ${y} ${x + size} ${y}`,
    `Q ${x} ${y} ${x} ${y + size}`,
    `Q ${x} ${y} ${x - size} ${y}`,
    `Q ${x} ${y} ${x} ${y - size} Z`,
  ].join(" ");
  return (
    <path
      d={d}
      fill={fill}
      fillOpacity={opacity}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
  );
}

interface PlanetGlyphProps {
  /** unique gradient id */
  id: string;
  cx: number;
  cy: number;
  r: number;
  light: string;
  mid: string;
  dark: string;
  /** ring colour, omit for a planet without a ring */
  ring?: string;
  tilt?: number;
}

export function PlanetGlyph({ id, cx, cy, r, light, mid, dark, ring, tilt = -18 }: PlanetGlyphProps) {
  const rx = round(r * 1.85);
  const ry = round(r * 0.46);
  const strokeWidth = Math.max(2, round(r * 0.13));
  const top = `M ${round(cx - rx)} ${cy} A ${rx} ${ry} 0 0 1 ${round(cx + rx)} ${cy}`;
  const bottom = `M ${round(cx - rx)} ${cy} A ${rx} ${ry} 0 0 0 ${round(cx + rx)} ${cy}`;

  return (
    <g>
      <defs>
        <radialGradient id={id} cx="0.35" cy="0.3" r="0.85">
          <stop offset="0" stopColor={light} />
          <stop offset="0.55" stopColor={mid} />
          <stop offset="1" stopColor={dark} />
        </radialGradient>
      </defs>
      {ring ? (
        <g transform={`rotate(${tilt} ${cx} ${cy})`}>
          <path d={top} fill="none" stroke={ring} strokeWidth={strokeWidth} strokeOpacity={0.55} />
        </g>
      ) : null}
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id})`} />
      {ring ? (
        <g transform={`rotate(${tilt} ${cx} ${cy})`}>
          <path d={bottom} fill="none" stroke={ring} strokeWidth={strokeWidth} strokeLinecap="round" />
        </g>
      ) : null}
    </g>
  );
}

interface PrintTextProps {
  y: number;
  size: number;
  /** exact rendered width, so fonts never overflow the garment */
  length: number;
  fill: string;
  x?: number;
  children: string;
}

export function PrintText({ y, size, length, fill, x = 0, children }: PrintTextProps) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize={size}
      fill={fill}
      textLength={length}
      lengthAdjust="spacingAndGlyphs"
      style={ART_FONT}
    >
      {children}
    </text>
  );
}

/** Subtle woven-fabric lines. Place inside <defs>. */
export function FabricTexture({ id, color }: { id: string; color: string }) {
  return (
    <pattern id={id} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
      <line x1="0" y1="0" x2="0" y2="8" stroke={color} strokeOpacity="0.12" strokeWidth="1.4" />
    </pattern>
  );
}

interface BarcodeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  seed: number;
  fill: string;
}

export function Barcode({ x, y, width, height, seed, fill }: BarcodeProps) {
  const rand = mulberry32(seed);
  const bars: Array<{ x: number; w: number }> = [];
  let cursor = 0;
  while (cursor < width) {
    const barWidth = 2 + Math.floor(rand() * 4);
    if (cursor + barWidth > width) break;
    if (rand() > 0.28) bars.push({ x: cursor, w: barWidth });
    cursor += barWidth + 2;
  }

  return (
    <g transform={`translate(${x} ${y})`}>
      {bars.map((bar, index) => (
        <rect key={index} x={bar.x} y={0} width={bar.w} height={height} fill={fill} />
      ))}
    </g>
  );
}

interface ProductBackdropProps {
  uid: string;
  /** glow colour behind the product */
  accent: string;
}

/** Cosmic stage behind every product shot, 800 x 1000. */
export function ProductBackdrop({ uid, accent }: ProductBackdropProps) {
  return (
    <g>
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0E1530" />
          <stop offset="1" stopColor="#060A15" />
        </linearGradient>
        <radialGradient id={`${uid}-glow`} cx="0.5" cy="0.47" r="0.55">
          <stop offset="0" stopColor={accent} stopOpacity="0.28" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <pattern id={`${uid}-dots`} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.4" fill="#FFFFFF" fillOpacity="0.06" />
        </pattern>
      </defs>
      <rect width="800" height="1000" fill={`url(#${uid}-bg)`} />
      <rect width="800" height="1000" fill={`url(#${uid}-glow)`} />
      <rect width="800" height="1000" fill={`url(#${uid}-dots)`} />
      <StarField seed={hashString(uid)} count={24} width={800} height={1000} />
      <circle cx="668" cy="140" r="56" fill="#16204A" />
      <circle cx="652" cy="126" r="50" fill="#1E2B5E" />
      <ellipse cx="400" cy="912" rx="250" ry="24" fill="#000000" fillOpacity="0.5" />
    </g>
  );
}