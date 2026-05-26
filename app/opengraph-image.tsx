import { ImageResponse } from "next/og";

export const alt = "Aziz Saburov — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          position: "relative",
        }}
      >
        {/* Gold glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -100,
            width: 600,
            height: 600,
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(232,200,122,0.18), transparent 70%)",
            display: "flex",
          }}
        />

        {/* Monogram badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "linear-gradient(135deg, #e8c87a, #c9a24f)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 800,
              color: "#0a0a0a",
            }}
          >
            AS
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#888",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </div>
        </div>

        {/* Name */}
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            background: "linear-gradient(135deg, #fff 0%, #e8c87a 60%, #c9a24f 100%)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 20,
          }}
        >
          Aziz Saburov
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            fontSize: 38,
            color: "#d0d0d0",
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          Full-Stack Developer · AI Specialist
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#888",
          }}
        >
          Websites · Telegram Bots · AI Solutions
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 8,
            background: "linear-gradient(90deg, #e8c87a, #c9a24f, transparent)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
