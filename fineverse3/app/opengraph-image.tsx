import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name}: ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 96px",
          color: "#F4F6FC",
          background: "linear-gradient(135deg, #1B1146 0%, #060A15 62%)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 8,
              color: "#C6FF3D",
            }}
          >
            COSMIC ANIME STREETWEAR
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 148,
              fontWeight: 900,
              lineHeight: 1,
              marginTop: 18,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 54,
              fontWeight: 800,
              color: "#C6FF3D",
              marginTop: 14,
            }}
          >
            {siteConfig.tagline.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", position: "relative", width: 460, height: 460 }}>
          <div
            style={{
              position: "absolute",
              left: 90,
              top: 90,
              width: 280,
              height: 280,
              borderRadius: 140,
              background: "linear-gradient(135deg, #7FE9EA 0%, #20C4C5 55%, #164C6E 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 10,
              top: 170,
              width: 440,
              height: 120,
              borderRadius: 60,
              border: "10px solid #C6FF3D",
              transform: "rotate(-18deg)",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}