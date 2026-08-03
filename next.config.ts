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
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
          },
          /* Aísla la pestaña de cualquier ventana que la haya abierto: sin esto,
             una página que abriera este sitio con `window.open` conserva una
             referencia al objeto `window`. */
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          /*
           * Content-Security-Policy — la que faltaba.
           *
           * Qué aporta en un sitio estático sin backend: el riesgo no es que
           * alguien "entre" —no hay dónde entrar—, sino que un script acabe
           * ejecutándose en la página y exfiltre a otro servidor. Eso puede
           * pasar por una dependencia npm comprometida, que es el vector real
           * de un sitio como este. Con `default-src 'self'`, ese script puede
           * ejecutarse pero **no puede enviar nada a ningún sitio**, ni cargar
           * recursos externos.
           *
           * ⚠️ `'unsafe-inline'` en `script-src` es necesario y no se puede
           * quitar hoy: next-themes inyecta un script en línea que aplica el
           * tema antes del primer pintado —es lo que evita el destello blanco—
           * y el JSON-LD de `layout.tsx` también va en línea. La alternativa
           * son nonces, que exigen renderizado dinámico y romperían el
           * prerenderizado estático de las nueve rutas. Aun con `unsafe-inline`
           * el origen sigue acotado a `'self'`, que es lo que corta la
           * exfiltración.
           *
           * `frame-ancestors 'none'` es el equivalente moderno de
           * X-Frame-Options y lo sustituye en navegadores actuales; se mantiene
           * el X-Frame-Options de arriba para los que aún no lo soportan.
           */
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data:",
              "font-src 'self'",
              "connect-src 'self'",
              // El formulario compone un `mailto:`, así que hace falta permitirlo
              "form-action 'self' mailto:",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "object-src 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
