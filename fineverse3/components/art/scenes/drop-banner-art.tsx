import type { DropId } from "@/types/drop";
import { ArtSvg, PLANET_DARK, PlanetGlyph, PrintText, Sparkle } from "../primitives";
import { SceneBackdrop } from "./scene-backdrop";

interface BannerProps {
  uid: string;
  label: string;
}

function DropBadge({ text }: { text: string }) {
  return (
    <g>
      <rect x={90} y={80} width={250} height={70} rx={35} fill="#C6FF3D" />
      <PrintText x={215} y={130} size={50} length={190} fill="#060A15">
        {text}
      </PrintText>
    </g>
  );
}

function Drop04Banner({ uid, label }: BannerProps) {
  return (
    <ArtSvg viewBox="0 0 1600 800" label={label}>
      <SceneBackdrop
        uid={uid}
        width={1600}
        height={800}
        from="#2A0E5C"
        to="#060A15"
        glow="#7C3AED"
        glowX={0.8}
        glowY={0.5}
      />
      <PlanetGlyph
        id={`${uid}-planet`}
        cx={1280}
        cy={400}
        r={210}
        light="#C4B5FD"
        mid="#6D3AD6"
        dark={PLANET_DARK}
        ring="#C6FF3D"
        tilt={-16}
      />
      <DropBadge text="DROP 04" />
      <PrintText x={450} y={360} size={210} length={720} fill="#F4F6FC">
        SISTERS
      </PrintText>
      <PrintText x={600} y={620} size={250} length={1020} fill="#C6FF3D">
        REVENGE
      </PrintText>
      <Sparkle x={1010} y={120} size={40} fill="#F4F6FC" />
    </ArtSvg>
  );
}

function Drop03Banner({ uid, label }: BannerProps) {
  const radii = [120, 200, 280, 360];
  return (
    <ArtSvg viewBox="0 0 1600 800" label={label}>
      <SceneBackdrop
        uid={uid}
        width={1600}
        height={800}
        from="#0A1A3A"
        to="#060A15"
        glow="#20C4C5"
        glowX={0.78}
        glowY={0.5}
      />
      {radii.map((radius) => (
        <circle
          key={radius}
          cx={1250}
          cy={400}
          r={radius}
          fill="none"
          stroke="#F4F6FC"
          strokeOpacity={0.16}
          strokeWidth={2.5}
        />
      ))}
      <circle cx={1250} cy={400} r={50} fill="#C6FF3D" />
      <circle cx={1370} cy={400} r={12} fill="#F4F6FC" />
      <DropBadge text="DROP 03" />
      <PrintText x={590} y={560} size={230} length={1000} fill="#F4F6FC">
        ORBIT ZERO
      </PrintText>
    </ArtSvg>
  );
}

function Drop05Banner({ uid, label }: BannerProps) {
  const bars = [
    { y: 200, width: 700 },
    { y: 290, width: 900 },
    { y: 380, width: 500 },
  ];
  return (
    <ArtSvg viewBox="0 0 1600 800" label={label}>
      <SceneBackdrop
        uid={uid}
        width={1600}
        height={800}
        from="#14141F"
        to="#060A15"
        glow="#C6FF3D"
        glowX={0.5}
        glowY={0.6}
        starCount={30}
      />
      <defs>
        <pattern id={`${uid}-scan`} width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="3" fill="#C6FF3D" fillOpacity="0.05" />
        </pattern>
      </defs>
      <rect width={1600} height={800} fill={`url(#${uid}-scan)`} />
      <DropBadge text="DROP 05" />
      {bars.map((bar) => (
        <rect
          key={bar.y}
          x={90}
          y={bar.y}
          width={bar.width}
          height={60}
          rx={6}
          fill="#000000"
          stroke="#C6FF3D"
          strokeOpacity={0.5}
          strokeWidth={2}
        />
      ))}
      <PrintText x={540} y={710} size={190} length={900} fill="#C6FF3D">
        CLASSIFIED
      </PrintText>
      <Sparkle x={1360} y={300} size={60} fill="#C6FF3D" opacity={0.8} />
    </ArtSvg>
  );
}

interface DropBannerArtProps {
  uid: string;
  drop: DropId;
  label: string;
}

/** 1600 x 800 (2:1). */
export function DropBannerArt({ uid, drop, label }: DropBannerArtProps) {
  switch (drop) {
    case "drop-03":
      return <Drop03Banner uid={uid} label={label} />;
    case "drop-04":
      return <Drop04Banner uid={uid} label={label} />;
    case "drop-05":
      return <Drop05Banner uid={uid} label={label} />;
  }
}