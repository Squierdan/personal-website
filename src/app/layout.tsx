import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://personal-website.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Elian Caizapanta — Software Engineer",
    template: "%s · Elian Caizapanta",
  },
  description:
    "Personal website and portfolio of Elian Caizapanta, software engineer building modern, scalable and human-centered web products.",
  keywords: [
    "software engineer",
    "ingeniero de software",
    "web developer",
    "portfolio",
    "Next.js",
    "React",
    "TypeScript",
  ],
  authors: [{ name: "Elian Caizapanta" }],
  openGraph: {
    type: "website",
    title: "Elian Caizapanta — Software Engineer",
    description:
      "Personal website and portfolio of Elian Caizapanta, software engineer.",
    url: siteUrl,
    siteName: "Elian Caizapanta",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elian Caizapanta — Software Engineer",
    description:
      "Personal website and portfolio of Elian Caizapanta, software engineer.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
