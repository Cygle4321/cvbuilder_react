import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CV Builder - Créateur de CV Professionnel en Ligne",
    short_name: "CV Builder",
    description: "Créez un CV moderne, professionnel et percutant en quelques minutes avec téléchargement gratuit en PDF.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4f46e5",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
