import { ImageResponse } from "next/og";

export const alt = "Aziz Saburov — Premium Web Developer & AI Solutions";
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
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#080808",
          position: "relative",
        }}
      >
        {/* Faint grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(232,200,122,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(232,200,122,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Cinematic glows */}
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -160,
            width: 720,
            height: 720,
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(232,200,122,0.22), transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            left: -160,
            width: 560,
            height: 560,
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(232,200,122,0.10), transparent 70%)",
            display: "flex",
          }}
        />

        {/* Top row — monogram + label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
            position: "relative",
          }}
        >
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 20,
              background: "linear-gradient(135deg, #e8c87a, #c9a24f)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 800,
              color: "#0a0a0a",
              boxShadow: "0 12px 40px rgba(232,200,122,0.35)",
            }}
          >
            AS
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#9a9a9a",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </div>
        </div>

        {/* Center — name + tagline */}
        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              background: "linear-gradient(135deg, #ffffff 0%, #e8c87a 55%, #c9a24f 100%)",
              backgroundClip: "text",
              color: "transparent",
              lineHeight: 1.05,
            }}
          >
            Aziz Saburov
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 40,
              color: "#e8c87a",
              fontWeight: 600,
              marginTop: 18,
              letterSpacing: "-0.01em",
            }}
          >
            Premium Web Developer &amp; AI Solutions
          </div>

          {/* Chips */}
          <div style={{ display: "flex", gap: 14, marginTop: 30 }}>
            {["Websites", "Telegram Bots", "AI Agents", "UI/UX"].map((c) => (
              <div
                key={c}
                style={{
                  display: "flex",
                  fontSize: 22,
                  color: "#cfcfcf",
                  padding: "10px 22px",
                  borderRadius: 9999,
                  border: "1px solid rgba(232,200,122,0.30)",
                  background: "rgba(232,200,122,0.06)",
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom — domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            position: "relative",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 9999,
              background: "#22c55e",
              display: "flex",
            }}
          />
          <div style={{ display: "flex", fontSize: 26, color: "#cdcdcd", fontWeight: 600 }}>
            saburov.site
          </div>
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
