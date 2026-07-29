# AI_CONTEXT.md

> **Para el asistente de IA que continúe este proyecto.**
> Lee este archivo completo antes de tocar código. Contiene las convenciones,
> las trampas conocidas y el mapa de decisiones ya tomadas.
> **Para el usuario:** copia y pega este archivo (o pídele a la IA que lo lea)
> al empezar una sesión nueva.

---

## 1. Qué es este proyecto

Sitio personal + portafolio de **Elian Caizapanta** (alias `SquierDan`),
ingeniero de software especializado en **seguridad de la información**.
Una sola página con cinco secciones ancladas, bilingüe (ES/EN), tema claro/oscuro.

El contenido es REAL, tomado de su CV: pasantías en MARCSEAL S.A. y Coris del
Ecuador, rol en Marino Robalino LLC, publicación indexada del protocolo Nested-C
en Annals of Telecommunications (Springer), y 13 certificaciones. No inventes
proyectos, métricas, años de experiencia ni tecnologías que no estén en
`src/lib/content.ts`: este sitio lo leen reclutadores que contrastan con LinkedIn.
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
| `src/lib/content.ts` | Servicios, experiencia/investigación (+ categorías), stack y certificaciones |

### Archivos de diseño — edita con cuidado

| Archivo | Contiene |
|---|---|
| `src/app/globals.css` | Paleta, tokens de Tailwind, tokens de movimiento, utilidades (`.term`, `.caret`, `.grid-lines`, `.accent-glow`, `.scan-row`, `.stencil`, `.corner-marks`, `.link-underline`) |
| `src/lib/motion.ts` | **Vocabulario de movimiento**: duraciones, curvas y variantes de Framer Motion. Todo el movimiento del sitio sale de aquí |
| `src/app/layout.tsx` | Fuentes, metadatos SEO, JSON-LD, skip link |

### Componentes

```
components/navbar.tsx          Fija · progreso de scroll · sección activa · menú móvil
components/footer.tsx          Pie + barra de estado tipo vim
components/command-palette.tsx Paleta ⌘K + atajos globales T / L
components/theme-toggle.tsx    Presentado como bandera --theme=dark
components/language-toggle.tsx Presentado como bandera --lang=es
components/providers/          ThemeProvider (next-themes) + LanguageProvider (contexto propio)
components/sections/*.tsx      hero · about · services · experience · contact
components/ui/section.tsx      <Section> y <SectionHeading> (numeral de plancha + regla + título)
components/ui/hash-portrait.tsx  FIRMA del sitio: la placa SHA-256 del hero
components/ui/reveal.tsx       <Reveal> · <RevealGroup>/<RevealItem> · <RevealRule>
components/ui/icons.tsx        GitHub · LinkedIn · X
hooks/use-active-section.ts    IntersectionObserver
hooks/use-typewriter.ts        Efecto de tecleo (respeta reduced-motion)
hooks/use-clock.ts             Reloj vía useSyncExternalStore
hooks/use-mounted.ts           Bandera de hidratación
hooks/use-digest.ts            SHA-256 + secuencia de avalancha de la placa
hooks/use-prefers-reduced-motion.ts  Preferencia de movimiento, reactiva
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

Contrastes medidos y verificados (no los bajes sin volver a medir):

| Par | Claro | Oscuro | Mínimo |
|---|---|---|---|
| `--fg-muted` sobre `--bg` | 7.10:1 | 6.52:1 | 4.5:1 (AA) |
| `--fg-subtle` sobre `--bg` | 4.72:1 | 4.73:1 | 4.5:1 (AA) |
| `--border-strong` sobre `--bg` | 3.11:1 | 3.47:1 | 3:1 (WCAG 1.4.11) |

`--border` es sólo para reglas y separadores decorativos. Cualquier control
interactivo cuyo borde sea su única señal de afordancia (campos de formulario,
botones de icono, CTA secundario) usa `border-border-strong`.

> ⚠️ **Trampa de capas CSS.** La regla `* { border-color: … }` vive dentro de
> `@layer base`. Tiene que seguir ahí: en la cascada de capas, lo que está
> **fuera** de toda capa gana a lo que está dentro, sin importar la
> especificidad. Con ese `*` sin capa, un selector de especificidad 0 pisaba
> todas las utilidades `border-*` de Tailwind (que viven en `@layer utilities`)
> y **ningún borde de color del sitio se pintaba**. Si sacas ese bloque de
> `@layer base`, `border-accent` deja de funcionar en todo el proyecto.

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
Los controles necesitan `aria-label`. Mantén el orden de encabezados (`h1` solo
en el hero, sin saltar niveles).

#### `prefers-reduced-motion` — bug crítico que ya existía, y su arreglo

Framer Motion detecta esta preferencia **por su cuenta** y suprime las
animaciones de `transform`. Cuando lo hace, deja el elemento en su estado
`initial`, que en todas las apariciones de este sitio es `opacity: 0`.

> ⚠️ **Consecuencia medida:** para cualquier visitante con «reducir movimiento»
> activado en su sistema, el hero entero y todas las filas de servicios se
> renderizaban **invisibles** (en el DOM, con `opacity: 0`). Afectaba también al
> menú móvil, que no se podía abrir. Es un fallo que arrastraba el diseño
> anterior, con el mismo patrón `initial="hidden" animate="visible"`.

**Condicionar la prop `initial` en React NO lo arregla.** `initial` se lee una
única vez al montar, y en el render de hidratación el hook de la preferencia
todavía devuelve `false` (usa el snapshot de servidor), así que Framer fija
`hidden` y nunca vuelve a mirarlo. Se intentó y no funciona.
`<MotionConfig reducedMotion="user">` tampoco: el elemento seguía en `hidden`.

La solución es declarativa y vive en `globals.css`, dentro del bloque
`@media (prefers-reduced-motion: reduce)`:

```css
[data-reveal] {
  opacity: 1 !important;
  transform: none !important;
}
```

Un `!important` de hoja de estilos gana a un estilo inline sin `!important`, así
que se impone a lo que escriba Framer, en esta versión y en las futuras.

**Contrato: todo elemento de Framer Motion que parta de `opacity: 0` tiene que
llevar `data-reveal`.** Ya lo llevan los cuatro componentes de `ui/reveal.tsx`,
los ocho pasos del arranque del hero, las filas de la tabla de roles y el menú
móvil. No lo pongas en la barra de progreso de scroll ni en la placa del hero:
esas animan `scaleX`/`scale` legítimamente y la regla las rompería.

Aparte, `useDigest` consulta la preferencia con `usePrefersReducedMotion` porque
tiene que decidir *si* ejecuta la avalancha, no sólo a qué velocidad: con la
preferencia activa devuelve el digest final directamente.

### 4.7 Movimiento

**No escribas duraciones ni curvas a mano.** Salen de `src/lib/motion.ts` (JS) y
de las variables `--dur-micro` / `--dur-base` / `--dur-slow` / `--ease-out`
(CSS). Los dos sitios tienen los mismos valores para que la página comparta un
pulso. Tres duraciones y ni una más.

Reglas del sistema:

- **Cada animación expresa una causa-efecto.** Si no comunica nada, va fuera.
  Por eso se eliminaron el `animate-ping` del punto de disponibilidad, la flecha
  con `animate-bounce` y el `→` de la lista de servicios (sugería un enlace que
  no existía).
- **Sólo `transform` y `opacity`.** Nunca `width`, `height`, `top`, `left` ni
  `padding`: obligan a recalcular el layout en cada fotograma.
- **Un solo momento coreografiado**, el arranque del hero (`bootStep`). Es el
  único sitio con una cadena de retardos explícita. En el resto de la página se
  usa `<RevealGroup>` + `<RevealItem>`, que reparte la entrada desde el
  contenedor: no calcules `delay` a mano por hijo.
- **La firma es la placa del hero.** El peso visual se gasta ahí y en el bloque
  de publicación; todo lo demás se mantiene callado a propósito.

Utilidades relacionadas: `.scan-row` (barrido de escáner sobre una fila
interactiva, sustituye al antiguo `.row-hover`) y `.stencil` (numeral de plancha
en contorno).

> ⚠️ **`color-mix()` no interpola en una transición.** Si animas
> `background-color` con un valor `color-mix(in srgb, var(--x) N%, transparent)`,
> el navegador deja la transición congelada en el valor inicial (medido: las 64
> celdas de la placa se quedaban en 0,08 con el `style` inline correcto). Usa un
> color sólido y anima `opacity`, que además va al compositor.

> ⚠️ **`min-h-*` no genera CSS en este proyecto.** `min-h-9` no produce ninguna
> regla (`min-height` queda en `auto`). Usa `h-9` con `inline-flex items-center`,
> que es lo que ya emplea el resto del sitio.

## 5. Recetas frecuentes

**Añadir una entrada de experiencia** → nuevo objeto en `work` de
`src/lib/content.ts`. Si usas una categoría nueva, añádela a `workCategories`
**y** a `categoryLabels`; el filtro se genera solo. Las entradas se muestran en
el orden del array (lo más relevante primero, no estrictamente cronológico).

La sección 03 reparte `work` en dos bloques según la categoría, y el reparto es
automático:

- `category === "research"` → **bloque de publicación** arriba, desplegado, en
  ámbar, con el detalle completo y el DOI a la vista. Añadir otro artículo lo
  coloca ahí solo.
- cualquier otra categoría → **tabla de roles**, plegable. Los botones de filtro
  se generan sólo con las categorías que existen entre los roles, así que nunca
  aparece un filtro que devuelve una tabla vacía.

El campo `summary` **sí se renderiza** (línea visible en la fila plegada);
`detail` es lo que aparece al desplegar. No existe un campo `featured`: la
jerarquía la dan el bloque de publicación y el orden del array.

**Añadir una certificación** → nuevo objeto en `certifications`. Se renderiza en
la sección 01 automáticamente.

**Añadir una sección nueva**
1. Crear `src/components/sections/mi-seccion.tsx` con `"use client"`.
2. Envolver en `<Section id="mi-seccion">` + `<SectionHeading index="05" … />`.
3. Añadir textos en `dictionary.ts` (ambos idiomas).
4. Renderizarla en `src/app/page.tsx`.
5. Añadir `"mi-seccion"` a `SECTION_IDS` y a `links` en `navbar.tsx`.
6. Añadir la entrada de navegación en `command-palette.tsx`.

Los ids de sección actuales son: `top`, `about`, `services`, `experience`,
`contact`. Están duplicados en `navbar.tsx` (`SECTION_IDS` + `links`) y en
`command-palette.tsx`; si cambias uno, cambia los tres sitios.

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
- comprobar que la placa del hero recorre la avalancha y termina en `verificado`,
  y que el botón de recalcular la vuelve a ejecutar
- activar «reducir movimiento» en el sistema: la placa debe aparecer ya fijada y
  el barrido de las filas no debe ejecutarse

## 7. Estado actual y pendientes conocidos

**Hecho:** rediseño con estética terminal, paleta split-complementaria, paleta
de comandos ⌘K, atajos de teclado, tabla de experiencia expandible, servicios
como lista de comandos, sección de certificaciones y formación, SEO + JSON-LD
(`Person` con `alumniOf` y `knowsAbout`) + sitemap + robots, imagen Open Graph
estática, cabeceras de seguridad, fuentes auto-alojadas, contenido real del CV
en ES/EN, desplegado en Vercel con `site.url` correcto. Lint, tipos y build en
verde.

**Hecho en el rediseño de movimiento y jerarquía:** vocabulario de movimiento
centralizado en `src/lib/motion.ts` + tokens CSS, secuencia de arranque
orquestada en el hero, placa de identidad SHA-256 como firma del sitio,
publicación destacada fuera de la tabla, numerales de plancha en contorno,
barrido de escáner en las filas, contraste AA verificado en ambos temas,
`border-strong` a 3:1 en controles, objetivos táctiles ampliados, y corrección
del bug de capas CSS que anulaba todos los bordes de color.

**Pendiente (requiere datos o decisiones del usuario):**

1. **Formulario sin backend.** Compone un `mailto:`. Ver receta en §5.
3. **Teléfono.** Deliberadamente NO publicado (está en el CV, pero exponerlo en
   una web pública atrae spam). Añadirlo solo si el usuario lo pide.
4. **Dominio propio.** Hoy usa el subdominio `.vercel.app`. Si se compra uno,
   actualizar `site.url` y volver a desplegar.
5. **Sin tests.** No hay Vitest ni Playwright configurados.
6. **Imagen OG estática.** Está en `src/app/opengraph-image.png` (PNG generado a
   mano, 1200×630). Si cambia el nombre o el rol, hay que regenerarla.
