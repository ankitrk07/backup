import type { AvatarVariant } from "@/types/image";
import { ArtSvg, PlanetGlyph, Sparkle } from "../primitives";

const BACKGROUNDS: Record<AvatarVariant, { from: string; to: string }> = {
  orbit: { from: "#0E2A4A", to: "#060A15" },
  comet: { from: "#3B1B8F", to: "#0B1024" },
  nebula: { from: "#1B1146", to: "#060A15" },
  pulsar: { from: "#C6FF3D", to: "#20C4C5" },
};

function AvatarGlyph({ uid, variant }: { uid: string; variant: AvatarVariant }) {
  switch (variant) {
    case "orbit":
      return (
        <PlanetGlyph
          id={`${uid}-planet`}
          cx={80}
          cy={80}
          r={34}
          light="#7FE9EA"
          mid="#20C4C5"
          dark="#164C6E"
          ring="#F4F6FC"
          tilt={-16}
        />
      );
    case "comet":
      return (
        <g>
          <path d="M 36 124 L 98 62" stroke="#C6FF3D" strokeWidth={12} strokeLinecap="round" strokeOpacity={0.55} />
          <path d="M 52 128 L 108 72" stroke="#F4F6FC" strokeWidth={5} strokeLinecap="round" strokeOpacity={0.5} />
          <Sparkle x={106} y={56} size={34} fill="#F4F6FC" />
          <circle cx={42} cy={44} r={3} fill="#C6FF3D" />
        </g>
      );
    case "nebula":
      return (
        <g fill="none" strokeLinecap="round">
          <path
            d="M 40 96 C 36 52 96 38 116 70 C 132 98 96 124 74 108 C 56 94 70 72 88 80"
            stroke="#C6FF3D"
            strokeWidth={8}
          />
          <path
            d="M 48 104 C 44 64 92 52 108 76"
            stroke="#A78BFA"
            strokeWidth={5}
            strokeOpacity={0.9}
          />
          <circle cx={86} cy={84} r={7} fill="#F4F6FC" stroke="none" />
        </g>
      );
    case "pulsar":
      return (
        <g fill="none" stroke="#060A15" strokeWidth={6}>
          <circle cx={80} cy={80} r={46} strokeOpacity={0.35} />
          <circle cx={80} cy={80} r={30} strokeOpacity={0.6} />
          <circle cx={80} cy={80} r={14} fill="#060A15" stroke="none" />
        </g>
      );
  }
}

interface AvatarArtProps {
  uid: string;
  variant: AvatarVariant;
  label: string;
}

/** 160 x 160 (1:1). Rounded by CSS where it is used. */
export function AvatarArt({ uid, variant, label }: AvatarArtProps) {
  const background = BACKGROUNDS[variant];
  return (
    <ArtSvg viewBox="0 0 160 160" label={label}>
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={background.from} />
          <stop offset="1" stopColor={background.to} />
        </linearGradient>
      </defs>
      <rect width={160} height={160} fill={`url(#${uid}-bg)`} />
      <AvatarGlyph uid={uid} variant={variant} />
    </ArtSvg>
  );
}