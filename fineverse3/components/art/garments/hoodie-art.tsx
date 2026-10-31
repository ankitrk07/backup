import { getPalette } from "@/lib/colors";
import { ArtSvg, FabricTexture, ProductBackdrop, type GarmentArtProps } from "../primitives";
import { GraphicArt } from "./garment-graphics";

const bodyPath = (neckControl: number) =>
  `M 300 170 L 190 215 L 105 520 L 70 800 L 160 815 L 215 560 L 220 880 Q 400 905 580 880 L 585 560 L 640 815 L 730 800 L 695 520 L 610 215 L 500 170 Q 400 ${neckControl} 300 170 Z`;

const HOOD_BEHIND = "M 288 205 C 262 68 538 68 512 205 Q 400 255 288 205 Z";
const HOOD_OPENING = "M 318 178 C 322 108 478 108 482 178 Q 400 234 318 178 Z";
const HOOD_BACK = "M 292 175 C 236 58 564 58 508 175 C 546 262 462 334 400 338 C 338 334 254 262 292 175 Z";

const POCKET = "M 262 640 L 538 640 L 578 800 Q 400 822 222 800 Z";
const HEM_BAND = "M 222 850 Q 400 872 578 850 L 580 880 Q 400 905 220 880 Z";
const CUFFS = [
  "M 76 765 L 164 781 L 160 815 L 70 800 Z",
  "M 724 765 L 636 781 L 640 815 L 730 800 Z",
];
const SLEEVE_SEAMS = ["M 192 220 Q 205 400 217 560", "M 608 220 Q 595 400 583 560"];
const FOLDS = ["M 300 420 Q 318 560 296 700", "M 502 430 Q 486 560 506 700"];

export function HoodieArt({ uid, color, view, graphic, label }: GarmentArtProps) {
  const palette = getPalette(color);
  const zoomed = view === "detail";
  const isBack = view === "back";
  const body = bodyPath(isBack ? 200 : 236);

  const fabricId = `${uid}-fabric`;
  const clipId = `${uid}-clip`;
  const textureId = `${uid}-tex`;

  const mainCenter = { cx: 400, cy: 470, scale: 0.58 };
  const zoomTransform = zoomed
    ? `translate(400 500) scale(2.1) translate(${-mainCenter.cx} ${-mainCenter.cy})`
    : undefined;

  const showMain = !isBack;
  const print = showMain
    ? { ...mainCenter, graphic }
    : { cx: 400, cy: 412, scale: 0.28, graphic: "logo-mark" as const };

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
          <path d={body} />
        </clipPath>
        <FabricTexture id={textureId} color={palette.rim} />
      </defs>

      <g transform={zoomTransform}>
        {!isBack ? (
          <path
            d={HOOD_BEHIND}
            fill={`url(#${fabricId})`}
            stroke={palette.rim}
            strokeOpacity={0.5}
            strokeWidth={2}
            strokeLinejoin="round"
          />
        ) : null}

        <path
          d={body}
          fill={`url(#${fabricId})`}
          stroke={palette.rim}
          strokeOpacity={0.55}
          strokeWidth={2}
          strokeLinejoin="round"
        />
        {zoomed ? (
          <rect width={800} height={1000} fill={`url(#${textureId})`} clipPath={`url(#${clipId})`} />
        ) : null}

        {FOLDS.map((d) => (
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
        {SLEEVE_SEAMS.map((d) => (
          <path key={d} d={d} fill="none" stroke={palette.shade} strokeOpacity={0.7} strokeWidth={3} />
        ))}
        {CUFFS.map((d) => (
          <path
            key={d}
            d={d}
            fill={palette.shade}
            stroke={palette.rim}
            strokeOpacity={0.4}
            strokeWidth={2}
            strokeLinejoin="round"
          />
        ))}
        <path
          d={HEM_BAND}
          fill={palette.shade}
          stroke={palette.rim}
          strokeOpacity={0.4}
          strokeWidth={2}
          strokeLinejoin="round"
        />

        {isBack ? (
          <g>
            <path
              d={HOOD_BACK}
              fill={`url(#${fabricId})`}
              stroke={palette.rim}
              strokeOpacity={0.55}
              strokeWidth={2}
              strokeLinejoin="round"
            />
            <path
              d="M 400 66 L 400 336"
              fill="none"
              stroke={palette.shade}
              strokeOpacity={0.7}
              strokeWidth={3}
            />
          </g>
        ) : (
          <g>
            <path d={HOOD_OPENING} fill="#05070D" fillOpacity={0.78} />
            <path
              d={HOOD_OPENING}
              fill="none"
              stroke={palette.rim}
              strokeOpacity={0.4}
              strokeWidth={2}
            />
            <path
              d="M 362 226 Q 356 290 352 345"
              fill="none"
              stroke={palette.inkSoft}
              strokeWidth={5}
              strokeLinecap="round"
            />
            <path
              d="M 438 226 Q 444 290 448 345"
              fill="none"
              stroke={palette.inkSoft}
              strokeWidth={5}
              strokeLinecap="round"
            />
            <circle cx={352} cy={349} r={7} fill={palette.accent} />
            <circle cx={448} cy={349} r={7} fill={palette.accent} />

            <path
              d={POCKET}
              fill={palette.body}
              fillOpacity={0.55}
              stroke={palette.rim}
              strokeOpacity={0.5}
              strokeWidth={2}
              strokeLinejoin="round"
            />
            <path
              d="M 262 646 L 300 742 M 538 646 L 500 742"
              fill="none"
              stroke={palette.shade}
              strokeWidth={3}
              strokeLinecap="round"
              strokeOpacity={0.8}
            />
          </g>
        )}

        <g transform={`translate(${print.cx} ${print.cy}) scale(${print.scale})`}>
          <GraphicArt graphic={print.graphic} palette={palette} uid={`${uid}-print`} />
        </g>
      </g>
    </ArtSvg>
  );
}