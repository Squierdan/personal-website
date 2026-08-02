import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  /* Se probó `experimental.optimizePackageImports: ["lucide-react"]` y se
     quitó: medido con dos builds limpias, 813 KB con y 813 KB sin. Turbopack ya
     hace ese tree-shaking por su cuenta, así que el flag no aportaba nada y
     activar una opción experimental que no mejora nada es riesgo regalado. */
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
