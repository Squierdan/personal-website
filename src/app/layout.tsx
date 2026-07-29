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
  "Portafolio y sitio personal de un ingeniero de software especializado en productos web modernos con Next.js, TypeScript y arquitecturas escalables.";

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
    "software engineer",
    "ingeniero de software",
    "desarrollador web",
    "full stack",
    "Next.js",
    "React",
    "TypeScript",
    "portafolio",
    site.name,
  ],
  alternates: {
    canonical: site.url,
    languages: { es: site.url, en: site.url },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: ["en_US"],
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0c0f" },
  ],
};

/** Datos estructurados para que Google entienda de quién es el sitio. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: site.location },
  sameAs: Object.values(site.socials).filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
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
