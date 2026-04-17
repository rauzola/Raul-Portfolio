import { ImageResponse } from "next/og";

export const alt = "Raul Sigoli - Full-Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #05080e 0%, #0b1220 58%, #101a2f 100%)",
          color: "#dce7f2",
          padding: "56px 64px",
          position: "relative",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at top right, rgba(0, 207, 234, 0.22), transparent 36%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                letterSpacing: 5,
                textTransform: "uppercase",
                color: "#607a93",
              }}
            >
              Raul Sigoli
            </div>

            <div
              style={{
                display: "flex",
                maxWidth: 840,
                fontSize: 68,
                lineHeight: 1.05,
                fontWeight: 800,
              }}
            >
              Websites, technical SEO and custom systems with direct communication.
            </div>

            <div
              style={{
                display: "flex",
                maxWidth: 820,
                fontSize: 28,
                lineHeight: 1.35,
                color: "#9cb2c7",
              }}
            >
              Full-Stack Developer based in Maringa, PR building conversion-focused sites and tailored digital products.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 22px",
                borderRadius: 999,
                border: "1px solid rgba(0, 207, 234, 0.24)",
                background: "rgba(0, 207, 234, 0.08)",
                color: "#00cfea",
                fontSize: 22,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: "#0aeeb5",
                }}
              />
              Available for new projects
            </div>

            <div style={{ display: "flex", fontSize: 24, color: "#607a93" }}>raulsigolidev.com</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
