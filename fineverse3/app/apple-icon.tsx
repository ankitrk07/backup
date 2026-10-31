import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#060A15",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 45,
            top: 45,
            width: 90,
            height: 90,
            borderRadius: 45,
            background: "linear-gradient(135deg, #7FE9EA 0%, #20C4C5 55%, #164C6E 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 15,
            top: 75,
            width: 150,
            height: 30,
            borderRadius: 15,
            border: "5px solid #C6FF3D",
            transform: "rotate(-18deg)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}