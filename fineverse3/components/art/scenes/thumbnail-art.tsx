import type { ReactNode } from "react";
import type { ThumbnailVariant } from "@/types/image";
import { ART_FONT, ArtSvg, PLANET_DARK, PlanetGlyph, Sparkle } from "../primitives";
import { SceneBackdrop } from "./scene-backdrop";

interface ThumbTextProps {
  x: number;
  y: number;
  size: number;
  length: number;
  fill: string;
  children: ReactNode;
}

/** Outlined text, YouTube-thumbnail style. */
function ThumbText({ x, y, size, length, fill, children }: ThumbTextProps) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize={size}
      fill={fill}
      stroke="#060A15"
      strokeWidth={size * 0.12}
      strokeLinejoin="round"
      paintOrder="stroke"
      textLength={length}
      lengthAdjust="spacingAndGlyphs"
      style={ART_FONT}
    >
      {children}
    </text>
  );
}

interface ThumbProps {
  uid: string;
  label: string;
}

function DropRevealThumb({ uid, label }: ThumbProps) {
  return (
    <ArtSvg viewBox="0 0 1280 720" label={label}>
      <SceneBackdrop
        uid={uid}
        width={1280}
        height={720}
        from="#2A0E5C"
        to="#060A15"
        glow="#C6FF3D"
        glowX={0.8}
        glowY={0.4}
        starCount={50}
      />
      <PlanetGlyph
        id={`${uid}-planet`}
        cx={1010}
        cy={310}
        r={170}
        light="#C4B5FD"
        mid="#6D3AD6"
        dark={PLANET_DARK}
        ring="#C6FF3D"
        tilt={-16}
      />
      <Sparkle x={1170} y={110} size={58} fill="#C6FF3D" />
      <ThumbText x={420} y={300} size={200} length={700} fill="#C6FF3D">
        NEW DROP
      </ThumbText>
      <ThumbText x={470} y={500} size={150} length={800} fill="#F4F6FC">
        SISTERS REVENGE
      </ThumbText>
      <path
        d="M 300 620 C 480 680 700 640 820 540"
        fill="none"
        stroke="#C6FF3D"
        strokeWidth={22}
        strokeLinecap="round"
      />
      <polygon
        points="790,520 890,450 880,570"
        fill="#C6FF3D"
        stroke="#060A15"
        strokeWidth={6}
        strokeLinejoin="round"
      />
    </ArtSvg>
  );
}

function BehindThePrintThumb({ uid, label }: ThumbProps) {
  return (
    <ArtSvg viewBox="0 0 1280 720" label={label}>
      <SceneBackdrop
        uid={uid}
        width={1280}
        height={720}
        from="#0B2A4A"
        to="#060A15"
        glow="#7C3AED"
        glowX={0.78}
        glowY={0.5}
        starCount={40}
      />
      <defs>
        <pattern id={`${uid}-ht`} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="2.4" fill="#0B1024" fillOpacity="0.16" />
        </pattern>
      </defs>
      <ThumbText x={400} y={250} size={190} length={640} fill="#F4F6FC">
        BEHIND
      </ThumbText>
      <ThumbText x={440} y={470} size={190} length={720} fill="#C6FF3D">
        THE PRINT
      </ThumbText>
      <g transform="rotate(6 980 380)">
        <rect x={790} y={130} width={380} height={500} rx={26} fill="#E9E4D8" />
        <rect x={790} y={130} width={380} height={500} rx={26} fill={`url(#${uid}-ht)`} />
        <Sparkle x={980} y={380} size={130} fill="#6D3AD6" />
        <Sparkle x={1090} y={210} size={34} fill="#0B1024" />
        <ellipse
          cx={980}
          cy={380}
          rx={170}
          ry={190}
          fill="none"
          stroke="#FF6B81"
          strokeWidth={14}
          strokeLinecap="round"
        />
      </g>
    </ArtSvg>
  );
}

function UnboxingThumb({ uid, label }: ThumbProps) {
  return (
    <ArtSvg viewBox="0 0 1280 720" label={label}>
      <SceneBackdrop
        uid={uid}
        width={1280}
        height={720}
        from="#1B1146"
        to="#060A15"
        glow="#C6FF3D"
        glowX={0.75}
        glowY={0.5}
        starCount={50}
      />
      <polygon points="950,170 1130,270 950,370 770,270" fill="#C6FF3D" />
      <polygon points="770,270 950,370 950,600 770,500" fill="#6D3AD6" />
      <polygon points="950,370 1130,270 1130,500 950,600" fill="#4E24A8" />
      <path d="M 860 220 L 1040 320" stroke="#060A15" strokeOpacity={0.35} strokeWidth={26} />
      <Sparkle x={860} y={440} size={30} fill="#C6FF3D" />
      <Sparkle x={1170} y={150} size={50} fill="#F4F6FC" />
      <Sparkle x={700} y={140} size={26} fill="#C6FF3D" />
      <ThumbText x={410} y={380} size={230} length={700} fill="#F4F6FC">
        UNBOXING
      </ThumbText>
      <ThumbText x={360} y={570} size={150} length={600} fill="#C6FF3D">
        THE DROP
      </ThumbText>
    </ArtSvg>
  );
}

interface ThumbnailArtProps {
  uid: string;
  variant: ThumbnailVariant;
  label: string;
}

/** 1280 x 720 (16:9). */
export function ThumbnailArt({ uid, variant, label }: ThumbnailArtProps) {
  switch (variant) {
    case "drop-reveal":
      return <DropRevealThumb uid={uid} label={label} />;
    case "behind-the-print":
      return <BehindThePrintThumb uid={uid} label={label} />;
    case "unboxing":
      return <UnboxingThumb uid={uid} label={label} />;
  }
}