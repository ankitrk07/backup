import { getPalette, type GarmentPalette } from "@/lib/colors";
import {
  ArtSvg,
  Barcode,
  PlanetGlyph,
  PrintText,
  ProductBackdrop,
  Sparkle,
  hashString,
  type GarmentArtProps,
} from "../primitives";

const WHITE = "#F4F6FC";
const NAVY = "#0B1024";
const CREST = "M -110 -120 L 110 -120 L 110 20 Q 110 100 0 140 Q -110 100 -110 20 Z";

function PlanetSticker({ uid, palette }: { uid: string; palette: GarmentPalette }) {
  return (
    <g>
      <circle r={142} fill={WHITE} />
      <circle r={128} fill={NAVY} />
      <circle cx={-80} cy={-78} r={2.5} fill="#FFFFFF" />
      <circle cx={84} cy={-70} r={2} fill="#FFFFFF" />
      <circle cx={-96} cy={30} r={2} fill={palette.accent} />
      <circle cx={92} cy={46} r={3} fill="#A78BFA" />
      <PlanetGlyph
        id={`${uid}-ps`}
        cx={0}
        cy={-14}
        r={58}
        light="#7FE9EA"
        mid="#20C4C5"
        dark="#164C6E"
        ring={WHITE}
        tilt={-16}
      />
      <PrintText y={98} size={40} length={170} fill={palette.accent}>
        PLANET X
      </PrintText>
    </g>
  );
}

function SparkleSticker({ palette }: { palette: GarmentPalette }) {
  return (
    <g>
      <Sparkle x={0} y={0} size={136} fill={WHITE} stroke={WHITE} strokeWidth={22} />
      <Sparkle x={0} y={0} size={122} fill={palette.accent} />
    </g>
  );
}

function SloganSticker({ palette }: { palette: GarmentPalette }) {
  return (
    <g>
      <rect x={-175} y={-55} width={350} height={110} rx={26} fill={WHITE} />
      <rect x={-163} y={-43} width={326} height={86} rx={18} fill={NAVY} />
      <PrintText y={16} size={50} length={290} fill={palette.accent}>
        WEAR THE UNIVERSE
      </PrintText>
    </g>
  );
}

function CrestSticker({ palette }: { palette: GarmentPalette }) {
  return (
    <g>
      <path d={CREST} fill={WHITE} stroke={WHITE} strokeWidth={14} strokeLinejoin="round" />
      <path d={CREST} fill="#6D3AD6" transform="scale(0.93)" />
      <PrintText y={-30} size={50} length={170} fill={WHITE}>
        SISTERS
      </PrintText>
      <PrintText y={30} size={50} length={170} fill={palette.accent}>
        REVENGE
      </PrintText>
      <Sparkle x={0} y={88} size={16} fill={WHITE} />
    </g>
  );
}

function StickerSheetFront({ uid, palette }: { uid: string; palette: GarmentPalette }) {
  return (
    <g>
      <g transform="translate(285 380) rotate(-10)">
        <PlanetSticker uid={uid} palette={palette} />
      </g>
      <g transform="translate(575 300) rotate(8)">
        <SparkleSticker palette={palette} />
      </g>
      <g transform="translate(430 640) rotate(-7)">
        <SloganSticker palette={palette} />
      </g>
      <g transform="translate(610 800) rotate(9) scale(0.8)">
        <CrestSticker palette={palette} />
      </g>
      <g transform="translate(205 800) rotate(-12) scale(0.5)">
        <SparkleSticker palette={palette} />
      </g>
    </g>
  );
}

function StickerSheetBack({ uid }: { uid: string }) {
  const paper = "#E9E4D8";
  const line = "#B9B2A0";
  return (
    <g transform="translate(400 520) rotate(-4)">
      <rect x={-290} y={-380} width={580} height={760} rx={36} fill={paper} />
      {[0, 1, 2, 3, 4, 5, 6].map((row) => (
        <PrintText key={row} y={-300 + row * 100} size={40} length={480} fill="#CFC8B8">
          FINEVERSE · WEAR THE UNIVERSE
        </PrintText>
      ))}
      <circle cx={-110} cy={-170} r={118} fill="none" stroke={line} strokeWidth={3} strokeDasharray="10 8" />
      <rect x={-20} y={-60} width={290} height={100} rx={24} fill="none" stroke={line} strokeWidth={3} strokeDasharray="10 8" />
      <rect x={-250} y={20} width={210} height={210} rx={30} fill="none" stroke={line} strokeWidth={3} strokeDasharray="10 8" />
      <Barcode x={-120} y={270} width={240} height={70} seed={hashString(uid)} fill="#2B3347" />
    </g>
  );
}

export function StickerPackArt({ uid, color, view, label }: GarmentArtProps) {
  const palette = getPalette(color);

  return (
    <ArtSvg viewBox="0 0 800 1000" label={label}>
      <ProductBackdrop uid={uid} accent={palette.accent} />
      {view === "front" ? <StickerSheetFront uid={uid} palette={palette} /> : null}
      {view === "back" ? <StickerSheetBack uid={uid} /> : null}
      {view === "detail" ? (
        <g transform="translate(400 500) rotate(-6) scale(2.5)">
          <PlanetSticker uid={uid} palette={palette} />
        </g>
      ) : null}
    </ArtSvg>
  );
}