import { ArtSvg, PLANET_DARK, PlanetGlyph, PrintText, Sparkle } from "../primitives";
import { SceneBackdrop } from "./scene-backdrop";

interface SceneProps {
  uid: string;
  label: string;
}

/** 1200 x 1500 (4:5). Hero artwork. */
export function HeroArt({ uid, label }: SceneProps) {
  const clipId = `${uid}-pclip`;

  return (
    <ArtSvg viewBox="0 0 1200 1500" label={label}>
      <SceneBackdrop
        uid={uid}
        width={1200}
        height={1500}
        from="#101A45"
        to="#060A15"
        glow="#7C3AED"
        glowX={0.62}
        glowY={0.38}
        starCount={90}
      />
      <defs>
        <pattern id={`${uid}-burst`} width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="6" cy="6" r="3.2" fill="#C6FF3D" />
        </pattern>
        <clipPath id={clipId}>
          <circle cx="700" cy="600" r="320" />
        </clipPath>
      </defs>

      <circle cx="190" cy="1040" r="300" fill={`url(#${uid}-burst)`} fillOpacity="0.22" />
      <path d="M -40 330 L 560 130 L 600 210 L -40 440 Z" fill="#7C3AED" fillOpacity="0.22" />
      <path d="M 640 40 L 1240 -60 L 1240 20 L 700 120 Z" fill="#C6FF3D" fillOpacity="0.14" />

      <PlanetGlyph
        id={`${uid}-planet`}
        cx={700}
        cy={600}
        r={320}
        light="#7FE9EA"
        mid="#20C4C5"
        dark="#0F2F55"
        ring="#C6FF3D"
        tilt={-18}
      />
      <g clipPath={`url(#${clipId})`}>
        <ellipse
          cx="700"
          cy="470"
          rx="380"
          ry="34"
          transform="rotate(-18 700 600)"
          fill="#FFFFFF"
          fillOpacity="0.07"
        />
        <ellipse
          cx="700"
          cy="720"
          rx="380"
          ry="46"
          transform="rotate(-18 700 600)"
          fill="#06223F"
          fillOpacity="0.28"
        />
        <circle cx="560" cy="500" r="42" fill="#0F2F55" fillOpacity="0.28" />
        <circle cx="820" cy="700" r="28" fill="#0F2F55" fillOpacity="0.28" />
      </g>

      <PlanetGlyph
        id={`${uid}-moon`}
        cx={230}
        cy={410}
        r={62}
        light="#C4B5FD"
        mid="#7C3AED"
        dark={PLANET_DARK}
      />
      <PlanetGlyph
        id={`${uid}-dot`}
        cx={1040}
        cy={1010}
        r={40}
        light="#E1FF8F"
        mid="#C6FF3D"
        dark="#5E7A12"
      />
      <Sparkle x={1010} y={190} size={46} fill="#F4F6FC" />
      <Sparkle x={140} y={820} size={30} fill="#C6FF3D" />
      <Sparkle x={1110} y={760} size={22} fill="#A78BFA" />

      <PrintText x={330} y={118} size={40} length={500} fill="#C6FF3D">
        COSMIC ANIME STREETWEAR
      </PrintText>
      <PrintText x={600} y={1200} size={150} length={800} fill="#F4F6FC">
        WEAR THE
      </PrintText>
      <PrintText x={600} y={1440} size={290} length={1040} fill="#C6FF3D">
        UNIVERSE
      </PrintText>
    </ArtSvg>
  );
}