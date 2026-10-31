import { getPalette } from "@/lib/colors";
import {
  ART_FONT,
  ArtSvg,
  FabricTexture,
  ProductBackdrop,
  type GarmentArtProps,
} from "../primitives";
import { GraphicArt } from "./garment-graphics";

const CROWN_FRONT = "M 175 590 C 165 330 260 235 400 235 C 540 235 635 330 625 590 Z";
const CROWN_BACK = "M 175 600 C 165 340 260 240 400 240 C 540 240 635 340 625 600 Q 400 655 175 600 Z";
const BRIM = "M 130 600 Q 400 520 670 600 Q 740 680 650 735 Q 400 830 150 735 Q 60 680 130 600 Z";

const SEAMS_FRONT = [
  "M 400 240 L 400 590",
  "M 400 240 C 300 300 265 430 262 590",
  "M 400 240 C 500 300 535 430 538 590",
];
const SEAMS_BACK = [
  "M 400 245 L 400 600",
  "M 400 245 C 300 305 262 440 258 600",
  "M 400 245 C 500 305 538 440 542 600",
];

export function CapArt({ uid, color, view, graphic, label }: GarmentArtProps) {
  const palette = getPalette(color);
  const isBack = view === "back";
  const zoomed = view === "detail";

  const fabricId = `${uid}-fabric`;
  const clipId = `${uid}-clip`;
  const textureId = `${uid}-tex`;
  const crown = isBack ? CROWN_BACK : CROWN_FRONT;
  const seams = isBack ? SEAMS_BACK : SEAMS_FRONT;

  const zoomTransform = zoomed ? "translate(400 500) scale(2.1) translate(-400 -440)" : undefined;

  return (
    <ArtSvg viewBox="0 0 800 1000" label={label}>
      <ProductBackdrop uid={uid} accent={palette.accent} />
      <defs>
        <linearGradient id={fabricId} x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0" stopColor={palette.highlight} />
          <stop offset="0.5" stopColor={palette.body} />
          <stop offset="1" stopColor={palette.shade} />
        </linearGradient>
        <clipPath id={clipId}>
          <path d={crown} />
        </clipPath>
        <FabricTexture id={textureId} color={palette.rim} />
      </defs>

      <g transform={zoomTransform}>
        {!isBack ? (
          <g>
            <path
              d={BRIM}
              fill={palette.shade}
              stroke={palette.rim}
              strokeOpacity={0.55}
              strokeWidth={2}
              strokeLinejoin="round"
            />
            <path
              d="M 190 655 Q 400 580 610 655"
              fill="none"
              stroke={palette.rim}
              strokeOpacity={0.4}
              strokeWidth={2}
              strokeDasharray="6 7"
            />
            <path
              d="M 215 690 Q 400 625 585 690"
              fill="none"
              stroke={palette.rim}
              strokeOpacity={0.3}
              strokeWidth={2}
              strokeDasharray="6 7"
            />
          </g>
        ) : null}

        <path
          d={crown}
          fill={`url(#${fabricId})`}
          stroke={palette.rim}
          strokeOpacity={0.55}
          strokeWidth={2}
          strokeLinejoin="round"
        />
        {zoomed ? (
          <rect width={800} height={1000} fill={`url(#${textureId})`} clipPath={`url(#${clipId})`} />
        ) : null}

        {seams.map((d) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke={palette.shade}
            strokeOpacity={0.75}
            strokeWidth={3}
            strokeLinecap="round"
          />
        ))}
        <circle cx={400} cy={isBack ? 245 : 240} r={11} fill={palette.shade} stroke={palette.rim} strokeOpacity={0.5} />
        <circle cx={338} cy={330} r={5} fill={palette.shade} />
        <circle cx={462} cy={330} r={5} fill={palette.shade} />

        {!isBack ? (
          <g transform="translate(400 440) scale(0.46)">
            <GraphicArt graphic={graphic} palette={palette} uid={`${uid}-print`} />
          </g>
        ) : (
          <g>
            <text
              x={400}
              y={506}
              textAnchor="middle"
              fontSize={34}
              fill={palette.inkSoft}
              textLength={170}
              lengthAdjust="spacingAndGlyphs"
              style={ART_FONT}
            >
              FINEVERSE
            </text>
            <rect
              x={300}
              y={548}
              width={200}
              height={52}
              rx={8}
              fill={palette.shade}
              stroke={palette.rim}
              strokeOpacity={0.45}
            />
            <circle cx={330} cy={574} r={5} fill={palette.body} />
            <circle cx={362} cy={574} r={5} fill={palette.body} />
            <circle cx={394} cy={574} r={5} fill={palette.body} />
            <rect x={446} y={560} width={34} height={28} rx={5} fill={palette.accent} />
          </g>
        )}
      </g>
    </ArtSvg>
  );
}