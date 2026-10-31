import type { CollectionSlug } from "@/types/collection";
import { ArtSvg, PLANET_DARK, PlanetGlyph, PrintText, Sparkle } from "../primitives";
import { SceneBackdrop } from "./scene-backdrop";

interface BannerProps {
  uid: string;
  label: string;
}

function SistersRevengeBanner({ uid, label }: BannerProps) {
  return (
    <ArtSvg viewBox="0 0 1600 900" label={label}>
      <SceneBackdrop
        uid={uid}
        width={1600}
        height={900}
        from="#2A0E5C"
        to="#060A15"
        glow="#7C3AED"
        glowX={0.78}
        glowY={0.45}
      />
      <PlanetGlyph
        id={`${uid}-planet`}
        cx={1270}
        cy={470}
        r={240}
        light="#C4B5FD"
        mid="#6D3AD6"
        dark={PLANET_DARK}
        ring="#C6FF3D"
        tilt={-16}
      />
      <path d="M 90 452 L 900 440" stroke="#C6FF3D" strokeWidth={10} strokeLinecap="round" />
      <PrintText x={420} y={400} size={230} length={660} fill="#F4F6FC">
        SISTERS
      </PrintText>
      <PrintText x={560} y={680} size={270} length={940} fill="#C6FF3D">
        REVENGE
      </PrintText>
      <Sparkle x={1010} y={150} size={44} fill="#F4F6FC" />
      <Sparkle x={140} y={810} size={26} fill="#C6FF3D" />
    </ArtSvg>
  );
}

function PlanetXBanner({ uid, label }: BannerProps) {
  return (
    <ArtSvg viewBox="0 0 1600 900" label={label}>
      <SceneBackdrop
        uid={uid}
        width={1600}
        height={900}
        from="#0B2A4A"
        to="#060A15"
        glow="#20C4C5"
        glowX={0.75}
        glowY={0.45}
      />
      <path
        d="M 120 120 L 560 780 M 560 120 L 120 780"
        stroke="#7C3AED"
        strokeWidth={90}
        strokeLinecap="round"
        strokeOpacity={0.35}
        fill="none"
      />
      <PlanetGlyph
        id={`${uid}-planet`}
        cx={1230}
        cy={430}
        r={230}
        light="#7FE9EA"
        mid="#20C4C5"
        dark="#164C6E"
        ring="#C6FF3D"
        tilt={-18}
      />
      <PrintText x={520} y={560} size={300} length={860} fill="#F4F6FC">
        PLANET X
      </PrintText>
      <PrintText x={330} y={690} size={54} length={480} fill="#C6FF3D">
        RINGED PLANET SERIES
      </PrintText>
      <Sparkle x={1450} y={130} size={36} fill="#F4F6FC" />
    </ArtSvg>
  );
}

function EssentialsBanner({ uid, label }: BannerProps) {
  const radii = [120, 200, 280, 360];
  return (
    <ArtSvg viewBox="0 0 1600 900" label={label}>
      <SceneBackdrop
        uid={uid}
        width={1600}
        height={900}
        from="#1B2340"
        to="#060A15"
        glow="#C6FF3D"
        glowX={0.8}
        glowY={0.5}
      />
      {radii.map((radius) => (
        <circle
          key={radius}
          cx={1230}
          cy={450}
          r={radius}
          fill="none"
          stroke="#F4F6FC"
          strokeOpacity={0.14}
          strokeWidth={2}
        />
      ))}
      {radii.map((radius, index) => (
        <circle
          key={`dot-${radius}`}
          cx={1230 + radius * Math.cos(index * 1.3)}
          cy={450 + radius * Math.sin(index * 1.3)}
          r={11}
          fill={index % 2 === 0 ? "#C6FF3D" : "#A78BFA"}
        />
      ))}
      <PlanetGlyph
        id={`${uid}-planet`}
        cx={1230}
        cy={450}
        r={70}
        light="#E1FF8F"
        mid="#C6FF3D"
        dark="#5E7A12"
      />
      <PrintText x={420} y={330} size={64} length={640} fill="#C6FF3D">
        EVERYDAY FINEVERSE
      </PrintText>
      <PrintText x={555} y={620} size={300} length={930} fill="#E9E4D8">
        ESSENTIALS
      </PrintText>
    </ArtSvg>
  );
}

function OrbitZeroBanner({ uid, label }: BannerProps) {
  const radii = [150, 240, 330, 420];
  return (
    <ArtSvg viewBox="0 0 1600 900" label={label}>
      <SceneBackdrop
        uid={uid}
        width={1600}
        height={900}
        from="#0A1A3A"
        to="#060A15"
        glow="#20C4C5"
        glowX={0.5}
        glowY={0.5}
      />
      {radii.map((radius, index) => (
        <circle
          key={radius}
          cx={800}
          cy={450}
          r={radius}
          fill="none"
          stroke="#F4F6FC"
          strokeOpacity={0.18}
          strokeWidth={2.5}
          strokeDasharray={index === radii.length - 1 ? "4 14" : undefined}
          strokeLinecap="round"
        />
      ))}
      <circle cx={800} cy={450} r={56} fill="#C6FF3D" />
      <circle cx={950} cy={450} r={14} fill="#F4F6FC" />
      <circle cx={560} cy={246} r={16} fill="#C6FF3D" />
      <circle cx={1100} cy={690} r={12} fill="#A78BFA" />
      <PrintText x={800} y={560} size={300} length={1160} fill="#F4F6FC">
        ORBIT ZERO
      </PrintText>
    </ArtSvg>
  );
}

interface CollectionBannerArtProps {
  uid: string;
  collection: CollectionSlug;
  label: string;
}

/** 1600 x 900 (16:9). */
export function CollectionBannerArt({ uid, collection, label }: CollectionBannerArtProps) {
  switch (collection) {
    case "sisters-revenge":
      return <SistersRevengeBanner uid={uid} label={label} />;
    case "planet-x":
      return <PlanetXBanner uid={uid} label={label} />;
    case "essentials":
      return <EssentialsBanner uid={uid} label={label} />;
    case "orbit-zero":
      return <OrbitZeroBanner uid={uid} label={label} />;
  }
}