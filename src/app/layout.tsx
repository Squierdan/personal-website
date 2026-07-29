import type { Metadata, Viewport } from "next";

/*
 * Fuentes auto-alojadas con Fontsource (no se hace ninguna petición a Google
 * Fonts en build ni en runtime): mejor privacidad, cero CLS y builds que
 * funcionan sin acceso a internet.
 *   · Inter          → texto de lectura
 *   · JetBrains Mono → voz principal de la marca (interfaz "terminal")
 */
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { Providers } from "@/components/providers";
import { site } from "@/lib/site";

const description =
  "Elian Caizapanta — software engineer specialising in information security: vulnerability management, ISO/IEC 27001, pentesting and systems administration. Published in Annals of Telecommunications.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "seguridad informática",
    "information security",
    "ciberseguridad",
    "ISO 27001",
    "gestión de vulnerabilidades",
    "pentesting",
    "ingeniero de software",
    "software engineer",
    "Ecuador",
    "Quito",
    site.name,
  ],
  alternates: {
    canonical: site.url,
    languages: { en: site.url, es: site.url, "x-default": site.url },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_ES"],
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  /* El sitio abre siempre en oscuro, así que la barra del navegador móvil
     debe coincidir desde el primer frame y no parpadear en blanco. */
  themeColor: "#0c0c0b",
  colorScheme: "dark light",
};

/** Datos estructurados para que Google entienda de quién es el sitio. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: "SquierDan",
  jobTitle: site.role,
  description,
  url: site.url,
  email: `mailto:${site.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Quito",
    addressCountry: "EC",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Escuela Politécnica Nacional",
  },
  knowsAbout: [
    "Information Security",
    "ISO/IEC 27001",
    "Vulnerability Management",
    "Penetration Testing",
    "Linux",
    "Software Engineering",
  ],
  knowsLanguage: ["es", "en"],
  sameAs: [
    site.socials.github,
    site.socials.linkedin,
    site.publicationDoi,
  ].filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full"
    >
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Enlace de salto para navegación por teclado */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:border focus:border-accent focus:bg-bg focus:px-4 focus:py-2 focus:font-mono focus:text-sm"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
