import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a1206 0%, #0a0a0a 100%)",
          borderRadius: 7,
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: "-0.05em",
            background: "linear-gradient(135deg, #e8c87a, #c9a24f)",
            backgroundClip: "text",
            color: "transparent",
            display: "flex",
          }}
        >
          AS
        </div>
      </div>
    ),
    { ...size }
  );
}
