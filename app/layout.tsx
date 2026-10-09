import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cvbuilder.app";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#4f46e5" },
    { media: "(prefers-color-scheme: dark)", color: "#1e1b4b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CV Builder - Créez et Téléchargez votre CV Gratuitement en PDF",
    template: "%s | CV Builder",
  },
  description:
    "Créez un CV moderne, professionnel et percutant en quelques minutes. Prévisualisation en temps réel, personnalisation complète (29 thèmes, modèles Classic & Modern) et export immédiat en PDF gratuit.",
  applicationName: "CV Builder",
  authors: [{ name: "CV Builder Team" }],
  generator: "Next.js",
  keywords: [
    "cv builder",
    "créateur de cv",
    "créer un cv en ligne",
    "faire un cv gratuit",
    "modèle de cv",
    "cv pdf gratuit",
    "générateur de cv",
    "curriculum vitae en ligne",
    "cv moderne",
    "cv professionnel",
    "télécharger cv pdf",
    "resume builder",
    "free resume maker",
  ],
  referrer: "origin-when-cross-origin",
  creator: "CV Builder",
  publisher: "CV Builder",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CV Builder - Créez votre CV Professionnel et Moderne en Ligne",
    description:
      "Concevez facilement un CV d'exception avec aperçu en temps réel, thèmes sur-mesure et téléchargement PDF instantané et gratuit.",
    url: siteUrl,
    siteName: "CV Builder",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CV Builder - Créez votre CV Professionnel en Ligne",
    description:
      "Concevez facilement un CV d'exception avec aperçu en temps réel, thèmes sur-mesure et export PDF gratuit.",
    creator: "@cvbuilder",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  category: "productivity",
  classification: "Outil en ligne de création de CV et recrutement",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CV Builder",
    url: siteUrl,
    description:
      "Application web gratuite pour créer, personnaliser et télécharger des CV modernes et professionnels au format PDF.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    featureList: [
      "Édition interactive en temps réel",
      "Prévisualisation adaptative sur mobile et desktop",
      "Téléchargement PDF instantané au format A4",
      "29 thèmes graphiques personnalisables",
      "Modèles Classic et Modern",
      "Réorganisation facile par glisser-déposer (Drag and Drop)",
      "Sauvegarde automatique locale sécurisée",
    ],
  };

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
