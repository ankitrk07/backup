import { ART_FONT, ArtSvg, PlanetGlyph } from "./primitives";

const TEAL = "#20C4C5";
const TEAL_LIGHT = "#7FE9EA";
const TEAL_DARK = "#164C6E";

function LogoShapes() {
  return (
    <g>
      <path
        d="M 126 96 A 52 52 0 0 1 100 124"
        fill="none"
        stroke="#E5484D"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <PlanetGlyph
        id="fv-logo-planet"
        cx={80}
        cy={64}
        r={30}
        light={TEAL_LIGHT}
        mid={TEAL}
        dark={TEAL_DARK}
        ring="#3BC3C9"
        tilt={-14}
      />
      <circle cx={36} cy={34} r={4} fill={TEAL_LIGHT} />
      <circle cx={126} cy={40} r={3} fill="#3BC3C9" />
      <text
        x={80}
        y={142}
        textAnchor="middle"
        fontSize={17}
        fill="#CFE7EA"
        textLength={104}
        lengthAdjust="spacingAndGlyphs"
        style={ART_FONT}
      >
        FINEVERSE
      </text>
    </g>
  );
}

/** Transparent logo for inline use (header, footer). Decorative, so pair it with visible text. */
export function LogoGlyph({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 160"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <LogoShapes />
    </svg>
  );
}

/** Logo with its dark background, used when the logo is an image slot. */
export function LogoMarkArt({ label }: { label: string }) {
  return (
    <ArtSvg viewBox="0 0 160 160" label={label}>
      <rect width={160} height={160} fill="#060A15" />
      <LogoShapes />
    </ArtSvg>
  );
}