# AI_CONTEXT.md

> **Para el asistente de IA que continúe este proyecto.**
> Lee este archivo completo antes de tocar código. Contiene las convenciones,
> las trampas conocidas y el mapa de decisiones ya tomadas.
> **Para el usuario:** copia y pega este archivo (o pídele a la IA que lo lea)
> al empezar una sesión nueva.

---

## 1. Qué es este proyecto

Sitio personal + portafolio de un ingeniero de software. Una sola página con
cinco secciones ancladas, bilingüe (ES/EN), con tema claro/oscuro.
No hay backend, no hay base de datos y no hay CMS: **todo el contenido está en
archivos TypeScript**. El sitio se prerenderiza como estático.

**Objetivo de diseño:** interfaz de "engineering terminal". Deliberadamente
**no** es el patrón habitual de portafolio generado por IA (hero con degradado,
rejilla de tarjetas con glassmorphism, iconos de colores). Si vas a añadir
componentes, mantén ese lenguaje: monoespaciada, reglas de 1 px, índices
numéricos, sin sombras difusas ni bordes muy redondeados.

## 2. Stack y versiones

```
Next.js 16.2.9      App Router · Turbopack · React 19.2.4
TypeScript 5        modo strict
Tailwind CSS v4     configuración en CSS (@theme inline), NO tailwind.config.js
Framer Motion 12
next-themes 0.4     tema por clase (.dark)
lucide-react        iconos
Fontsource          Inter Variable + JetBrains Mono Variable (auto-alojadas)
ESLint 9            eslint-config-next (flat config en eslint.config.mjs)
```

**Importante sobre Tailwind v4:** no existe `tailwind.config.js`. Los tokens se
declaran en `src/app/globals.css` dentro de `@theme inline`. El modo oscuro usa
`@custom-variant dark (&:where(.dark, .dark *))`, no la opción `darkMode`.

## 3. Mapa de archivos

### Archivos de contenido — edítalos libremente

| Archivo | Contiene |
|---|---|
| `src/lib/site.ts` | Datos personales: nombre, handle, rol, email, redes, URL, zona horaria, disponibilidad |
| `src/i18n/dictionary.ts` | **Todas** las cadenas visibles, en `es` y `en` |
| `src/lib/content.ts` | Servicios, proyectos (+ categorías) y stack |

### Archivos de diseño — edita con cuidado

| Archivo | Contiene |
|---|---|
| `src/app/globals.css` | Paleta, tokens de Tailwind, utilidades (`.term`, `.caret`, `.grid-lines`, `.scanlines`, `.noise`, `.row-hover`, `.corner-marks`, `.link-underline`) |
| `src/app/layout.tsx` | Fuentes, metadatos SEO, JSON-LD, skip link |

### Componentes

```
components/navbar.tsx          Fija · progreso de scroll · sección activa · menú móvil
components/footer.tsx          Pie + barra de estado tipo vim
components/command-palette.tsx Paleta ⌘K + atajos globales T / L
components/theme-toggle.tsx    Presentado como bandera --theme=dark
components/language-toggle.tsx Presentado como bandera --lang=es
components/providers/          ThemeProvider (next-themes) + LanguageProvider (contexto propio)
components/sections/*.tsx      hero · about · services · projects · contact
components/ui/section.tsx      <Section> y <SectionHeading> (índice + regla + título)
components/ui/reveal.tsx       Aparición al hacer scroll
components/ui/icons.tsx        GitHub · LinkedIn · X
hooks/use-active-section.ts    IntersectionObserver
hooks/use-typewriter.ts        Efecto de tecleo (respeta reduced-motion)
hooks/use-clock.ts             Reloj vía useSyncExternalStore
hooks/use-mounted.ts           Bandera de hidratación
```

## 4. Reglas obligatorias

### 4.1 Bilingüismo
Toda cadena visible va en `src/i18n/dictionary.ts`, **nunca** escrita
directamente en un componente. El tipo `Dictionary` obliga a que `es` y `en`
tengan exactamente las mismas claves: si añades una en `es`, TypeScript falla
hasta que la añadas en `en`. Consumo:

```tsx
"use client";
import { useLanguage } from "@/components/providers/language-provider";
const { t, locale, toggleLocale } = useLanguage();
```

Para contenido de `content.ts`, que es `Localized = Record<Locale, string>`:
`service.title[locale]`.

### 4.2 Colores
Nunca uses colores literales de Tailwind (`text-slate-500`, `bg-gray-900`).
Usa siempre los tokens semánticos, que cambian solos con el tema:

```
bg-bg · bg-bg-elevated · bg-bg-sunken
text-fg · text-fg-muted · text-fg-subtle
border-border · border-border-strong
text-accent · bg-accent · bg-accent-soft · text-[var(--accent-fg)]
text-link · text-[var(--amber)]
```

Si necesitas un color nuevo, añádelo en `:root` **y** en `.dark`, y expórtalo
en el bloque `@theme inline`. Verifica contraste ≥ 4.5:1 en ambos temas.

### 4.3 Cliente vs servidor
`layout.tsx`, `page.tsx`, `sitemap.ts`, `robots.ts` y `ui/section.tsx` son
Server Components. Todo lo que use hooks, `useLanguage`, `useTheme` o Framer
Motion **debe** llevar `"use client";` en la primera línea.

### 4.4 Hidratación
El idioma y el tema se resuelven en el cliente. Para cualquier valor que
difiera entre servidor y cliente (hora, tema resuelto, texto tecleado), usa
`useMounted()` y renderiza un marcador neutro mientras `mounted === false`.

### 4.5 ESLint — la trampa más frecuente
La regla `react-hooks/set-state-in-effect` está activa y **falla el build**.
No llames a `setState` de forma síncrona en el cuerpo de un `useEffect`.
Envuélvelo en un `setTimeout`/`setInterval`, o usa `useSyncExternalStore`
(ver `hooks/use-clock.ts` como referencia).

### 4.6 Accesibilidad
Toda animación debe degradarse con `prefers-reduced-motion` (ya cubierto
globalmente en `globals.css`, pero compruébalo en animaciones nuevas de Framer
Motion). Los controles necesitan `aria-label`. Mantén el orden de encabezados
(`h1` solo en el hero).

## 5. Recetas frecuentes

**Añadir un proyecto** → nuevo objeto en `projects` de `src/lib/content.ts`.
Si usas una categoría nueva, añádela a `projectCategories` **y** a
`categoryLabels`; el filtro se genera solo.

**Añadir una sección nueva**
1. Crear `src/components/sections/mi-seccion.tsx` con `"use client"`.
2. Envolver en `<Section id="mi-seccion">` + `<SectionHeading index="05" … />`.
3. Añadir textos en `dictionary.ts` (ambos idiomas).
4. Renderizarla en `src/app/page.tsx`.
5. Añadir `"mi-seccion"` a `SECTION_IDS` y a `links` en `navbar.tsx`.
6. Añadir la entrada de navegación en `command-palette.tsx`.

**Cambiar la paleta** → edita `--accent` en `:root` y en `.dark` de
`globals.css`. Mantén el esquema split-complementario: si mueves el acento
X grados, mueve `--amber` y `--link` los mismos grados.

**Añadir un tercer idioma** → añádelo a `locales` en `src/i18n/config.ts`,
a `localeNames`, al objeto `dictionaries`, y a cada `Localized` de
`content.ts`. TypeScript te irá señalando todo lo que falte.

**Formulario de contacto con backend real** → hoy `handleSubmit` en
`sections/contact.tsx` compone un `mailto:`. Para recibir los mensajes por API:
crea `src/app/api/contact/route.ts` (Route Handler POST), sustituye el
`window.location.href` por un `fetch("/api/contact", …)`, y añade las variables
de entorno en Vercel (Settings → Environment Variables). Servicios sugeridos:
Resend o Formspree.

## 6. Verificación antes de entregar

```bash
npm run lint        # debe salir sin errores
npx tsc --noEmit    # debe salir sin errores
npm run build       # debe compilar y prerenderizar 6 rutas
```

Revisión manual mínima:

- alternar tema claro/oscuro y comprobar contraste en ambos
- alternar ES/EN y comprobar que no queda texto sin traducir
- abrir la paleta con ⌘K / Ctrl+K y navegar con flechas + Enter
- probar a 360 px, 768 px y 1440 px de ancho
- navegar toda la página solo con Tab y comprobar que el foco es visible

## 7. Estado actual y pendientes conocidos

**Hecho:** rediseño completo con estética terminal, paleta split-complementaria,
paleta de comandos ⌘K, atajos de teclado, portafolio tabular expandible,
servicios como lista de comandos, SEO + JSON-LD + sitemap + robots, cabeceras de
seguridad en `next.config.ts`, fuentes auto-alojadas, lint y build en verde.

**Pendiente (requiere datos o decisiones del usuario):**

1. **Contenido real.** `site.ts` y `content.ts` son placeholders (marcados con
   `<-- EDITAR`). Proyectos, métricas del hero y LinkedIn son de ejemplo.
2. **`site.url`.** Apunta a una URL de Vercel supuesta. Debe actualizarse tras
   el primer despliegue o el SEO y Open Graph quedarán mal.
3. **Imagen Open Graph.** No existe `opengraph-image.tsx`. Al compartir el
   enlace no se ve previsualización. Se puede generar con `next/og`.
4. **Foto o avatar.** El hero no tiene retrato; es una decisión estética
   abierta.
5. **Formulario sin backend.** Ver receta en §5.
6. **Sin tests.** No hay Vitest ni Playwright configurados.
