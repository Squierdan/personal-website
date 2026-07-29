# personal-website

Sitio personal y portafolio de **Elian Caizapanta** — ingeniero de software
especializado en seguridad de la información.
Bilingüe (ES/EN), tema claro/oscuro, responsivo, con una interfaz de estética
*engineering terminal*.

**En producción:** <https://personal-website-blush-three-41.vercel.app>

> **Empieza aquí:** [`DEPLOY.md`](./DEPLOY.md) — cómo ejecutarlo en tu computadora
> y publicarlo gratis en internet, paso a paso.
> Si vas a pedirle cambios a una IA, dale [`AI_CONTEXT.md`](./AI_CONTEXT.md).

---

## Stack

| Capa | Tecnología | Por qué |
|---|---|---|
| Framework | **Next.js 16** (App Router) | Estándar de facto en React; render estático, rutas de metadatos, optimización automática |
| Lenguaje | **TypeScript 5** | Errores detectados antes de ejecutar; el diccionario ES/EN está tipado y no puede desincronizarse |
| Estilos | **Tailwind CSS v4** | Sin CSS muerto, tokens de diseño en variables CSS nativas |
| Animación | **Framer Motion 12** | Animaciones declarativas con soporte de `prefers-reduced-motion` |
| Tema | **next-themes** | Claro/oscuro sin parpadeo en la carga inicial |
| Iconos | **lucide-react** | SVG tree-shakeable, sin fuentes de iconos |
| Tipografía | **Fontsource** (Inter + JetBrains Mono) | Auto-alojada: cero peticiones a Google, cero CLS, builds offline |

## Ejecutar localmente

```bash
npm install
npm run dev      # http://localhost:3000
```

Otros comandos:

```bash
npm run build    # build de producción
npm run start    # sirve el build de producción
npm run lint     # ESLint
npx tsc --noEmit # comprobación de tipos
```

## Estructura

```
src/
├── app/
│   ├── layout.tsx      Fuentes, metadatos SEO, JSON-LD, providers
│   ├── page.tsx        Composición de la página (orden de secciones)
│   ├── globals.css     ★ SISTEMA DE DISEÑO: paleta, tokens, utilidades
│   ├── sitemap.ts      /sitemap.xml generado
│   ├── opengraph-image.png  Previsualización al compartir el enlace
│   └── robots.ts       /robots.txt generado
├── components/
│   ├── navbar.tsx           Barra fija + progreso de scroll + menú móvil
│   ├── footer.tsx           Pie con barra de estado tipo vim
│   ├── command-palette.tsx  Paleta de comandos ⌘K
│   ├── theme-toggle.tsx     Conmutador claro/oscuro
│   ├── language-toggle.tsx  Conmutador ES/EN
│   ├── providers/           ThemeProvider + LanguageProvider
│   ├── sections/            hero · about · services · experience · contact
│   └── ui/                  section · reveal · icons
├── hooks/              use-active-section · use-typewriter · use-clock · use-mounted
├── i18n/
│   ├── config.ts       Idiomas soportados
│   └── dictionary.ts   ★ TODOS LOS TEXTOS (ES + EN)
└── lib/
    ├── site.ts         ★ TUS DATOS (nombre, email, redes, URL)
    └── content.ts      ★ SERVICIOS, EXPERIENCIA, STACK Y CERTIFICACIONES
```

Los archivos marcados con ★ son los únicos que necesitas tocar para
personalizar el sitio. Ver [`AI_CONTEXT.md`](./AI_CONTEXT.md) para el detalle.

## Decisiones de diseño

**Paleta (colorimetría).** Base neutra fría (matiz ~220°, saturación mínima)
para lecturas largas sin fatiga. Acento primario verde primavera (~155°) —
el "fósforo" del terminal, desaturado para que se lea profesional y no retro.
Los secundarios son el **split-complementario** del acento: ámbar (~38°) y
azul eléctrico (~215°). El esquema split-complementario da contraste sin el
choque agresivo del complementario puro y permite jerarquía semántica:
verde = acción, azul = enlace, ámbar = dato / énfasis.
El modo claro **no** es el oscuro invertido: usa blanco cálido tipo papel para
compensar la temperatura fría del texto, y acentos más oscuros para mantener
contraste AA (≥ 4.5:1).

**Interacción.** Paleta de comandos (⌘K / Ctrl+K), atajos `T` (tema) y `L`
(idioma), seguimiento de sección activa con `IntersectionObserver`,
portafolio como índice tabular expandible en lugar de rejilla de tarjetas.

**Accesibilidad.** HTML semántico, enlace "skip to content", foco visible,
`aria-*` en controles interactivos, contraste AA y respeto total a
`prefers-reduced-motion`.

## Licencia

Código bajo MIT. El contenido (textos, proyectos, imágenes) es propiedad del autor.
