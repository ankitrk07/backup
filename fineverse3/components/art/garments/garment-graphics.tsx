import type { GarmentPalette } from "@/lib/colors";
import type { GraphicId } from "@/types/image";
import { PLANET_DARK, PlanetGlyph, PrintText, Sparkle } from "../primitives";

interface GraphicArtProps {
  graphic: GraphicId;
  palette: GarmentPalette;
  uid: string;
}

/**
 * Print artwork, drawn centred on (0,0) inside roughly a 400 x 300 box.
 * Callers position and scale it with a transform.
 */
export function GraphicArt({ graphic, palette, uid }: GraphicArtProps) {
  const { ink, inkSoft, accent } = palette;

  switch (graphic) {
    case "sisters-revenge":
      return (
        <g>
          <PrintText y={-34} size={124} length={392} fill={ink}>
            SISTERS
          </PrintText>
          <path d="M -196 -14 L 196 -26" stroke={accent} strokeWidth={7} strokeLinecap="round" />
          <PrintText y={104} size={150} length={392} fill={accent}>
            REVENGE
          </PrintText>
          <PrintText y={140} size={22} length={190} fill={inkSoft}>
            FINEVERSE
          </PrintText>
          <Sparkle x={-186} y={-130} size={18} fill={accent} />
          <Sparkle x={178} y={-126} size={12} fill={ink} />
        </g>
      );

    case "planet-x":
      return (
        <g>
          <path
            d="M -92 -132 L 92 52 M 92 -132 L -92 52"
            stroke={inkSoft}
            strokeWidth={16}
            strokeLinecap="round"
            strokeOpacity={0.7}
            fill="none"
          />
          <PlanetGlyph
            id={`${uid}-px`}
            cx={0}
            cy={-40}
            r={60}
            light={accent}
            mid={accent}
            dark={PLANET_DARK}
            ring={ink}
            tilt={-18}
          />
          <PrintText y={128} size={104} length={380} fill={ink}>
            PLANET X
          </PrintText>
        </g>
      );

    case "wear-the-universe":
      return (
        <g>
          <ellipse
            cx={0}
            cy={-30}
            rx={192}
            ry={58}
            transform="rotate(-9 0 -30)"
            fill="none"
            stroke={inkSoft}
            strokeWidth={3}
            strokeDasharray="1 11"
            strokeLinecap="round"
          />
          <circle cx={150} cy={-87} r={13} fill={accent} />
          <PrintText y={-6} size={86} length={300} fill={ink}>
            WEAR THE
          </PrintText>
          <PrintText y={112} size={142} length={392} fill={accent}>
            UNIVERSE
          </PrintText>
          <Sparkle x={-176} y={-96} size={16} fill={ink} />
        </g>
      );

    case "logo-mark":
      return (
        <g>
          <PlanetGlyph
            id={`${uid}-lm`}
            cx={0}
            cy={-34}
            r={66}
            light={accent}
            mid={accent}
            dark={PLANET_DARK}
            ring={ink}
            tilt={-16}
          />
          <circle cx={-118} cy={-120} r={9} fill={ink} />
          <circle cx={120} cy={-110} r={6} fill={accent} />
          <PrintText y={118} size={72} length={340} fill={ink}>
            FINEVERSE
          </PrintText>
        </g>
      );

    case "nebula-drift":
      return (
        <g>
          <g transform="translate(0 -42) scale(0.92)">
            <path
              d="M -120 20 C -120 -90 40 -120 100 -50 C 150 10 90 90 10 80 C -50 72 -60 10 -10 0 C 25 -6 40 30 15 40"
              fill="none"
              stroke={accent}
              strokeWidth={11}
              strokeLinecap="round"
            />
            <path
              d="M -120 20 C -120 -90 40 -120 100 -50 C 150 10 90 90 10 80 C -50 72 -60 10 -10 0 C 25 -6 40 30 15 40"
              fill="none"
              stroke={ink}
              strokeWidth={4}
              strokeLinecap="round"
              strokeOpacity={0.8}
              transform="rotate(8)"
            />
            <circle cx={8} cy={24} r={14} fill={ink} />
          </g>
          <PrintText y={138} size={74} length={380} fill={ink}>
            NEBULA DRIFT
          </PrintText>
          <Sparkle x={-176} y={-110} size={16} fill={accent} />
          <Sparkle x={172} y={-120} size={12} fill={ink} />
        </g>
      );

    case "orbit-zero":
      return (
        <g>
          <circle cx={0} cy={-34} r={26} fill={accent} />
          <circle cx={0} cy={-34} r={62} fill="none" stroke={ink} strokeWidth={4} />
          <circle
            cx={0}
            cy={-34}
            r={98}
            fill="none"
            stroke={inkSoft}
            strokeWidth={3}
            strokeDasharray="3 10"
            strokeLinecap="round"
          />
          <circle cx={62} cy={-34} r={8} fill={ink} />
          <circle cx={-69} cy={-103} r={9} fill={accent} />
          <PrintText y={128} size={100} length={392} fill={ink}>
            ORBIT ZERO
          </PrintText>
        </g>
      );

    case "stardust":
      return (
        <g>
          <Sparkle x={0} y={-62} size={64} fill={accent} />
          <Sparkle x={-110} y={-90} size={28} fill={ink} />
          <Sparkle x={112} y={-100} size={34} fill={ink} />
          <Sparkle x={-150} y={-20} size={14} fill={accent} />
          <Sparkle x={150} y={-14} size={16} fill={accent} />
          <PrintText y={96} size={128} length={392} fill={ink}>
            STARDUST
          </PrintText>
          <PrintText y={134} size={22} length={190} fill={inkSoft}>
            FINEVERSE
          </PrintText>
        </g>
      );

    case "none":
    default:
      return null;
  }
}