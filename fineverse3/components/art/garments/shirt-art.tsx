import { getPalette } from "@/lib/colors";
import {
  ART_FONT,
  ArtSvg,
  FabricTexture,
  ProductBackdrop,
  type GarmentArtProps,
} from "../primitives";
import { GraphicArt } from "./garment-graphics";

type ShirtVariant = "regular" | "oversized";
type Side = "front" | "back";

interface ShirtShape {
  body: (neckControlY: number) => string;
  neckLeft: number;
  neckRight: number;
  neckTop: number;
  neckFront: number;
  neckBack: number;
  tagY: number;
  seams: string[];
  cuffs: string[];
  folds: string[];
  hem: string;
  /** which side carries the big print */
  mainSide: Side;
  main: { cx: number; cy: number; scale: number; zoom: number };
  /** small brand mark printed on the other side */
  mark: { cx: number; cy: number; scale: number };
}

const SHAPES: Record<ShirtVariant, ShirtShape> = {
  regular: {
    body: (ny) =>
      `M 330 150 L 215 185 L 95 335 L 170 395 L 245 330 L 245 850 Q 400 872 555 850 L 555 330 L 630 395 L 705 335 L 585 185 L 470 150 Q 400 ${ny} 330 150 Z`,
    neckLeft: 330,
    neckRight: 470,
    neckTop: 150,
    neckFront: 215,
    neckBack: 176,
    tagY: 186,
    seams: ["M 215 185 L 247 332", "M 585 185 L 553 332"],
    cuffs: ["M 109 318 L 184 378", "M 691 318 L 616 378"],
    folds: ["M 300 480 Q 320 620 292 760", "M 500 500 Q 480 640 508 780"],
    hem: "M 248 833 Q 400 855 552 833",
    mainSide: "front",
    main: { cx: 400, cy: 520, scale: 0.72, zoom: 2.2 },
    mark: { cx: 400, cy: 300, scale: 0.26 },
  },
  oversized: {
    body: (ny) =>
      `M 320 140 L 170 175 L 40 360 L 130 430 L 210 350 L 195 880 Q 400 905 605 880 L 590 350 L 670 430 L 760 360 L 630 175 L 480 140 Q 400 ${ny} 320 140 Z`,
    neckLeft: 320,
    neckRight: 480,
    neckTop: 140,
    neckFront: 205,
    neckBack: 170,
    tagY: 172,
    seams: ["M 170 175 L 212 352", "M 630 175 L 588 352"],
    cuffs: ["M 54 340 L 144 410", "M 746 340 L 656 410"],
    folds: ["M 270 480 Q 292 640 262 800", "M 540 470 Q 520 640 548 810"],
    hem: "M 199 862 Q 400 887 601 862",
    mainSide: "back",
    main: { cx: 400, cy: 480, scale: 0.92, zoom: 1.75 },
    mark: { cx: 505, cy: 335, scale: 0.2 },
  },
};

interface ShirtArtProps extends GarmentArtProps {
  variant: ShirtVariant;
}

export function ShirtArt({ variant, uid, color, view, graphic, label }: ShirtArtProps) {
  const palette = getPalette(color);
  const shape = SHAPES[variant];
  const zoomed = view === "detail";
  const side: Side = view === "back" ? "back" : view === "front" ? "front" : shape.mainSide;
  const isMainSide = side === shape.mainSide;
  const neckControl = side === "front" ? shape.neckFront : shape.neckBack;
  const bodyPath = shape.body(neckControl);
  const collarPath = `M ${shape.neckLeft} ${shape.neckTop} Q 400 ${neckControl} ${shape.neckRight} ${shape.neckTop}`;

  const fabricId = `${uid}-fabric`;
  const clipId = `${uid}-clip`;
  const textureId = `${uid}-tex`;

  const { cx, cy, scale, zoom } = shape.main;
  const zoomTransform = zoomed
    ? `translate(400 500) scale(${zoom}) translate(${-cx} ${-cy})`
    : undefined;

  const print = isMainSide ? { cx, cy, scale, graphic } : { ...shape.mark, graphic: "logo-mark" as const };

  return (
    <ArtSvg viewBox="0 0 800 1000" label={label}>
      <ProductBackdrop uid={uid} accent={palette.accent} />
      <defs>
        <linearGradient id={fabricId} x1="0" y1="0" x2="0.25" y2="1">
          <stop offset="0" stopColor={palette.highlight} />
          <stop offset="0.45" stopColor={palette.body} />
          <stop offset="1" stopColor={palette.shade} />
        </linearGradient>
        <clipPath id={clipId}>
          <path d={bodyPath} />
        </clipPath>
        <FabricTexture id={textureId} color={palette.rim} />
      </defs>

      <g transform={zoomTransform}>
        <path
          d={bodyPath}
          fill={`url(#${fabricId})`}
          stroke={palette.rim}
          strokeOpacity={0.55}
          strokeWidth={2}
          strokeLinejoin="round"
        />
        {zoomed ? (
          <rect
            width={800}
            height={1000}
            fill={`url(#${textureId})`}
            clipPath={`url(#${clipId})`}
          />
        ) : null}

        {shape.folds.map((d) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke={palette.shade}
            strokeOpacity={0.45}
            strokeWidth={3}
            strokeLinecap="round"
          />
        ))}
        {shape.seams.map((d) => (
          <path key={d} d={d} fill="none" stroke={palette.shade} strokeOpacity={0.7} strokeWidth={3} />
        ))}
        {shape.cuffs.map((d) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke={palette.rim}
            strokeOpacity={0.45}
            strokeWidth={2}
            strokeDasharray="6 7"
          />
        ))}
        <path
          d={shape.hem}
          fill="none"
          stroke={palette.rim}
          strokeOpacity={0.45}
          strokeWidth={2}
          strokeDasharray="6 7"
        />

        <path d={collarPath} fill="none" stroke={palette.shade} strokeWidth={16} strokeLinecap="round" />
        <path
          d={collarPath}
          fill="none"
          stroke={palette.rim}
          strokeOpacity={0.45}
          strokeWidth={2}
          strokeLinecap="round"
        />

        {side === "back" ? (
          <g>
            <rect x={380} y={shape.tagY} width={40} height={22} rx={3} fill="#F4F6FC" />
            <text
              x={400}
              y={shape.tagY + 16}
              textAnchor="middle"
              fontSize={14}
              fill="#0B0E17"
              style={ART_FONT}
            >
              FV
            </text>
          </g>
        ) : null}

        <g transform={`translate(${print.cx} ${print.cy}) scale(${print.scale})`}>
          <GraphicArt graphic={print.graphic} palette={palette} uid={`${uid}-print`} />
        </g>
      </g>
    </ArtSvg>
  );
}