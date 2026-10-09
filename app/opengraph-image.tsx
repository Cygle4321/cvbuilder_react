import { ImageResponse } from "next/og";

export const alt = "CV Builder - Créez votre CV Professionnel en Ligne";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          color: "white",
          padding: "40px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              fontStyle: "italic",
              letterSpacing: "-2px",
            }}
          >
            CV<span style={{ color: "#818cf8" }}>Builder</span>
          </div>
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "16px",
            color: "#f8fafc",
          }}
        >
          Créez votre CV Professionnel & Moderne en Ligne
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          Prévisualisation instantanée • 29 Thèmes personnalisables • Modèles Classic & Modern • Export PDF A4 Gratuit
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
