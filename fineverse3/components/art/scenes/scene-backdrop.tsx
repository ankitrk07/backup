import { StarField, hashString } from "../primitives";

interface SceneBackdropProps {
  uid: string;
  width: number;
  height: number;
  from: string;
  to: string;
  glow: string;
  /** glow centre as a 0..1 fraction of the canvas */
  glowX?: number;
  glowY?: number;
  starCount?: number;
  halftone?: boolean;
}

/** Shared cosmic stage for every non-product scene. */
export function SceneBackdrop({
  uid,
  width,
  height,
  from,
  to,
  glow,
  glowX = 0.7,
  glowY = 0.4,
  starCount = 60,
  halftone = true,
}: SceneBackdropProps) {
  return (
    <g>
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <radialGradient id={`${uid}-glow`} cx={glowX} cy={glowY} r="0.6">
          <stop offset="0" stopColor={glow} stopOpacity="0.4" />
          <stop offset="1" stopColor={glow} stopOpacity="0" />
        </radialGradient>
        <pattern id={`${uid}-dots`} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1.6" fill="#FFFFFF" fillOpacity="0.07" />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#${uid}-bg)`} />
      <rect width={width} height={height} fill={`url(#${uid}-glow)`} />
      {halftone ? <rect width={width} height={height} fill={`url(#${uid}-dots)`} /> : null}
      <StarField
        seed={hashString(uid)}
        count={starCount}
        width={width}
        height={height}
        maxRadius={2.4}
      />
    </g>
  );
}