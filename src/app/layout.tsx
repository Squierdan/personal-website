import type { Metadata, Viewport } from "next";

/*
 * Fuentes auto-alojadas con Fontsource (no se hace ninguna petición a Google
 * Fonts en build ni en runtime): mejor privacidad, cero CLS y builds que
 * funcionan sin acceso a internet.
 *
 * DOS VOCES, Y CADA UNA TIENE UN TRABAJO (ver §4.6 de AI_CONTEXT.md):
 *   · JetBrains Mono → la voz del instrumento: etiquetas, comandos, cifras,
 *     lecturas de estado, cabeceras de tabla, el nombre del hero.
 *   · IBM Plex Sans  → la voz humana: titulares de sección y prosa. NADA más.
 *
 * Por qué Plex y no Inter: Plex se encargó como tipografía de la documentación
 * de sistemas técnicos y empresariales de IBM, que es exactamente el registro
 * de esta página. Sus astas acampanadas y sus curvas escuadradas conviven con
 * el esqueleto mecánico de JetBrains Mono sin que ninguna de las dos finja ser
 * la otra, y la base neutra cálida de la paleta (#0c0c0b, no un azulado
 * #0a0a0f) le sienta mejor que la neutralidad de Inter. Inter es además el
 * valor por defecto de todo portafolio de desarrollador que existe.
 */
import "@fontsource-variable/ibm-plex-sans";
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
