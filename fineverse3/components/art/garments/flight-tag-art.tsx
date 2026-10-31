import { getPalette } from "@/lib/colors";
import {
  ArtSvg,
  Barcode,
  FabricTexture,
  PrintText,
  ProductBackdrop,
  hashString,
  type GarmentArtProps,
} from "../primitives";
import { GraphicArt } from "./garment-graphics";

const TAG_BODY =
  "M 260 250 L 540 250 Q 580 250 580 290 L 580 760 Q 580 800 540 800 L 260 800 Q 220 800 220 760 L 220 290 Q 220 250 260 250 Z";
const STRAP = "M 360 255 C 330 90 470 90 440 255";

export function FlightTagArt({ uid, color, view, graphic, label }: GarmentArtProps) {
  const palette = getPalette(color);
  const isBack = view === "back";
  const zoomed = view === "detail";

  const fabricId = `${uid}-fabric`;
  const clipId = `${uid}-clip`;
  const textureId = `${uid}-tex`;
  const strapColor = palette.accent;
  const zoomTransform = zoomed ? "translate(400 500) scale(2.1) translate(-400 -310)" : undefined;

  return (
    <ArtSvg viewBox="0 0 800 1000" label={label}>
      <ProductBackdrop uid={uid} accent={palette.accent} />
      <defs>
        <linearGradient id={fabricId} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor={palette.highlight} />
          <stop offset="0.5" stopColor={palette.body} />
          <stop offset="1" stopColor={palette.shade} />
        </linearGradient>
        <clipPath id={clipId}>
          <path d={TAG_BODY} />
        </clipPath>
        <FabricTexture id={textureId} color={palette.rim} />
      </defs>

      <g transform={zoomTransform}>
        <path d={STRAP} fill="none" stroke={strapColor} strokeWidth={22} strokeLinecap="round" />
        <path
          d={STRAP}
          fill="none"
          stroke="#000000"
          strokeOpacity={0.25}
          strokeWidth={22}
          strokeLinecap="round"
          strokeDasharray="2 10"
        />

        <path
          d={TAG_BODY}
          fill={`url(#${fabricId})`}
          stroke={palette.rim}
          strokeOpacity={0.6}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
        {zoomed ? (
          <rect width={800} height={1000} fill={`url(#${textureId})`} clipPath={`url(#${clipId})`} />
        ) : null}
        <rect
          x={240}
          y={270}
          width={320}
          height={510}
          rx={22}
          fill="none"
          stroke={palette.inkSoft}
          strokeOpacity={0.5}
          strokeWidth={2}
          strokeDasharray="8 8"
        />

        <circle cx={400} cy={305} r={26} fill="#060A15" stroke={palette.rim} strokeOpacity={0.7} strokeWidth={3} />

        {!isBack ? (
          <g>
            <PrintText x={400} y={392} size={52} length={230} fill={palette.ink}>
              FLIGHT TAG
            </PrintText>
            <path d="M 270 412 L 530 412" stroke={palette.ink} strokeOpacity={0.5} strokeWidth={2} />
            <g transform="translate(400 545) scale(0.6)">
              <GraphicArt graphic={graphic} palette={palette} uid={`${uid}-print`} />
            </g>
            <Barcode
              x={290}
              y={660}
              width={220}
              height={70}
              seed={hashString(uid)}
              fill={palette.ink}
            />
            <PrintText x={400} y={766} size={18} length={250} fill={palette.inkSoft}>
              FINEVERSE • WEAR THE UNIVERSE
            </PrintText>
          </g>
        ) : (
          <g>
            <PrintText x={400} y={430} size={82} length={270} fill={palette.ink}>
              WEAR THE
            </PrintText>
            <PrintText x={400} y={520} size={82} length={270} fill={palette.ink}>
              UNIVERSE
            </PrintText>
            <path d="M 270 548 L 530 548" stroke={palette.ink} strokeOpacity={0.5} strokeWidth={2} />
            <Barcode
              x={270}
              y={585}
              width={260}
              height={120}
              seed={hashString(`${uid}-back`)}
              fill={palette.ink}
            />
            <PrintText x={400} y={766} size={18} length={250} fill={palette.inkSoft}>
              FINEVERSE • WEAR THE UNIVERSE
            </PrintText>
          </g>
        )}
      </g>
    </ArtSvg>
  );
}