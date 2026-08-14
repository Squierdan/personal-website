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
Una sola página con seis secciones ancladas, bilingüe (ES/EN), tema claro/oscuro.

El contenido es REAL, tomado de su CV: pasantías en MARCSEAL S.A. y Coris del
Ecuador, rol en Marino Robalino LLC, publicación indexada del protocolo Nested-C
en Annals of Telecommunications (Springer), y 15 certificaciones. No inventes
proyectos, métricas, años de experiencia ni tecnologías que no estén en
`src/lib/content.ts`: este sitio lo leen reclutadores que contrastan con LinkedIn.
No hay backend, no hay base de datos y no hay CMS: **todo el contenido está en
archivos TypeScript**. El sitio se prerenderiza como estático.

**Sobre el texto:** ninguna cadena visible explica de dónde sale el dato ni le
dice al visitante lo que ya ve. Se eliminaron «tal como está declarado en el
CV», «tecnologías declaradas en el CV», «formación continua en seguridad, redes
y sistemas» y «filtra para explorar». Una etiqueta etiqueta; no justifica su
propia procedencia.

**Objetivo de diseño:** interfaz de "engineering terminal". Deliberadamente
**no** es el patrón habitual de portafolio generado por IA (hero con degradado,
rejilla de tarjetas con glassmorphism, iconos de colores). Si vas a añadir
componentes, mantén ese lenguaje: monoespaciada, reglas de 1 px, índices
numéricos, sin sombras difusas ni bordes muy redondeados.

## 2. Stack y versiones

```
Next.js 16.3.0      App Router · Turbopack · React 19.2.4
TypeScript 5        modo strict
Tailwind CSS v4     configuración en CSS (@theme inline), NO tailwind.config.js
Framer Motion 12
next-themes 0.4     tema por clase (.dark)
lucide-react        iconos
Fontsource          IBM Plex Sans Variable + JetBrains Mono Variable (auto-alojadas)
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
| `src/lib/content.ts` | Servicios, experiencia/investigación, habilidades con nivel, instrumental, idiomas y certificaciones. **Todo sale del CV de `public/`**: si actualizas el PDF, revisa que estos datos sigan coincidiendo |

### Archivos de diseño — edita con cuidado

| Archivo | Contiene |
|---|---|
| `src/app/globals.css` | Paleta, escala tipográfica, ritmo vertical, tokens de Tailwind y de movimiento, utilidades (`.label`, `.press`, `.spotlight`, `.nav-link`, `.term`, `.caret`, `.grid-lines`, `.accent-glow`, `.scan-row`, `.stencil`, `.corner-marks`, `.link-underline`) |
| `src/lib/motion.ts` | **Vocabulario de movimiento**: duraciones, curvas y variantes de Framer Motion. Todo el movimiento del sitio sale de aquí |
| `src/app/layout.tsx` | Fuentes, metadatos SEO, JSON-LD, skip link |
| `next.config.ts` | Cabeceras de seguridad, incluida la CSP. **Si añades un recurso externo** (una fuente de Google, un script de analítica, una imagen de otro dominio) la CSP lo bloqueará hasta que lo declares ahí |

### Componentes

```
components/navbar.tsx          Fija · progreso de scroll · sección activa · menú móvil
components/footer.tsx          Pie + barra de estado tipo vim
components/command-palette.tsx Paleta ⌘K + atajos globales T / L
components/theme-toggle.tsx    Presentado como bandera --theme=dark
components/language-toggle.tsx Presentado como bandera --lang=es
components/providers/          ThemeProvider (next-themes) + LanguageProvider (contexto propio)
components/sections/*.tsx      hero · about · skills · experience · services · contact
components/ui/meter.tsx        Medidor de nivel. LEE SU CABECERA antes de tocarlo
components/ui/count-up.tsx     Contador que renderiza el valor final desde el primer frame
components/ui/section.tsx      <Section> y <SectionHeading> (numeral de plancha + regla + título)
components/ui/reveal.tsx       <Reveal> · <RevealGroup>/<RevealItem> · <RevealRule>
components/ui/icons.tsx        GitHub · LinkedIn · X
components/ui/spotlight-card.tsx  Foco que sigue al cursor en las celdas de rejilla
hooks/use-active-section.ts    IntersectionObserver
hooks/use-prefers-reduced-motion.ts  Preferencia de movimiento. LEE SU CABECERA: sirve para `exit`, no para `initial`
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

> ⚠️ **Ningún campo visible puede ser `string` ni `string[]`.** Es la fuga más
> difícil de ver, porque TypeScript no se queja: un `string[]` compila
> perfectamente y simplemente muestra el mismo texto en los dos idiomas. Así
> llegaron a producción dieciocho cadenas en español dentro de la versión
> inglesa —los chips de servicios («Remediación», «Informes», «Políticas»,
> «Auditoría»), el stack de cada experiencia y los nombres de nueve
> certificaciones—, en un sitio cuyo público son reclutadores internacionales.
> `keywords`, `stack`, `name` de certificación y los items del instrumental son
> todos `Localized[]`.
>
> Los nombres propios se repiten idénticos en ambos idiomas a propósito:
> «Escuela Politécnica Nacional», «Coris del Ecuador», React, Nessus, Git.
> Traducir una marca o una institución sería peor que no traducirla.
>
> **Cómo detectarlo**, en la consola con el sitio en inglés:
>
> ```js
> [...document.querySelector('main').querySelectorAll('*')]
>   .filter(e => e.children.length === 0 && /[áéíóúñ¿¡]/i.test(e.textContent))
>   .map(e => e.textContent.trim())
> ```
>
> Sólo deberían salir nombres propios.

### 4.2 Colores
Nunca uses colores literales de Tailwind (`text-slate-500`, `bg-gray-900`).
Usa siempre los tokens semánticos, que cambian solos con el tema:

```
bg-bg · bg-bg-elevated · bg-bg-sunken
text-fg · text-fg-muted · text-fg-subtle
border-border · border-border-strong
text-accent · bg-accent · bg-accent-soft · bg-meter-off · text-[var(--accent-fg)]
text-link · text-[var(--amber)]
```

Si necesitas un color nuevo, añádelo en `:root` **y** en `.dark`, y expórtalo
en el bloque `@theme inline`. Verifica contraste ≥ 4.5:1 en ambos temas.

Contrastes medidos y verificados (no los bajes sin volver a medir):

| Par | Claro | Oscuro | Mínimo |
|---|---|---|---|
| `--fg` sobre `--bg` | 16.64:1 | 15.85:1 | 4.5:1 (AA) |
| `--fg-muted` sobre `--bg` | 7.10:1 | 6.52:1 | 4.5:1 (AA) |
| `--fg-subtle` sobre `--bg` | 5.54:1 | 5.56:1 | 4.5:1 (AA) |
| `--accent` sobre `--bg` | 5.41:1 | 10.16:1 | 4.5:1 (AA) |
| `--amber` sobre `--bg` | 4.83:1 | 9.71:1 | 4.5:1 (AA) |
| `--link` sobre `--bg` | 5.75:1 | 7.56:1 | 4.5:1 (AA) |
| `--border-strong` sobre `--bg` | 3.11:1 | 3.47:1 | 3:1 (WCAG 1.4.11) |
| `--border` sobre `--bg` | 1.68:1 | 1.40:1 | — (filete visible) |
| `--meter-off` sobre `--bg` | 1.61:1 | 1.67:1 | — (celda vacía visible) |

> ⚠️ **Los filetes no son decoración en este diseño, son la estructura.**
> `--border` dibuja la rejilla de servicios, los separadores de la tabla de
> experiencia, el marco de cada certificación y el borde de todas las secciones.
> Estuvo en 1.23:1 en claro —invisible— y el modo claro perdía literalmente su
> estructura. No lo bajes de ~1.6:1 en claro ni de ~1.4:1 en oscuro.
>
> `--meter-off` existe por lo mismo: era `accent/20` y medía 1.01:1 en oscuro,
> así que la celda vacía del medidor no se veía y la escala de cinco dejaba de
> leerse como una escala. Un hueco tiene que verse tanto como un lleno.

`--border` es el filete estructural: rejillas, separadores y marcos de sección.
Cualquier control **interactivo** cuyo borde sea su única señal de afordancia
—campos de formulario, botones de icono, CTA secundario, chips de la portada—
usa `border-border-strong`, que es el que cumple el 3:1 de WCAG 1.4.11.

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
difiera entre servidor y cliente (la hora del hero, el tema resuelto), usa
`useMounted()` y renderiza un marcador neutro mientras `mounted === false`.

### 4.5 ESLint — la trampa más frecuente
La regla `react-hooks/set-state-in-effect` está activa y **falla el build**.
No llames a `setState` de forma síncrona en el cuerpo de un `useEffect`.
Envuélvelo en un `setTimeout`/`setInterval`, o usa `useSyncExternalStore`
(ver `hooks/use-clock.ts` como referencia).

### 4.6 Tipografía — dos voces, y cada una tiene un trabajo

El sitio tiene **exactamente dos familias**, y la elección entre ellas no es
estética: dice qué clase de cosa estás escribiendo.

| Familia | Rol | Dónde |
|---|---|---|
| **JetBrains Mono** (`font-mono`) | La voz del instrumento | Etiquetas, comandos, cifras, lecturas de estado, cabeceras de tabla, chips, numerales, el nombre del hero |
| **IBM Plex Sans** (por defecto en `body`) | La voz humana | Titulares de sección y prosa. **Nada más** |

Si dudas de cuál usar, pregúntate si lo que escribes es *un dato que la máquina
reporta* (mono) o *una frase que una persona redactó* (sans).

> Por qué Plex y no Inter: Plex se encargó como tipografía de la documentación de
> sistemas técnicos y empresariales de IBM, que es el registro de esta página.
> Convive con el esqueleto mecánico de JetBrains Mono sin que ninguna finja ser
> la otra, y la base neutra **cálida** de la paleta (`#0c0c0b`, no un azulado
> `#0a0a0f`) le sienta mejor que la neutralidad de Inter. Inter es además el
> valor por defecto de todo portafolio de desarrollador que existe: era la única
> pieza genérica que quedaba en un diseño construido a propósito para no
> parecerse a los demás.

#### Escala tipográfica — no escribas tamaños a mano

Había trece tamaños en uso (10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 24, 30,
32 px) elegidos uno por uno en cada componente, y tres de ellos —10, 11 y 12 px—
hacían el mismo trabajo: etiquetar un dato. Eso no es una escala.

Ahora hay cuatro utilidades para interfaz y texto, declaradas en `globals.css`:

```
text-data   11px   toda etiqueta, chip, lectura, cabecera de tabla · SIEMPRE mono
text-meta   13px   prosa secundaria: certificaciones, stack, resúmenes
text-ui     15px   botones, navegación, campos de formulario, subtítulos
text-body   17px   los párrafos que alguien se va a sentar a leer
```

más tres pasos de titular con `clamp()`, que se consumen como
`text-[length:var(--step-h3)]`, `--step-h2` y `--step-display`.

**No añadas `text-[13px]` ni `text-sm` nuevos.** Si un tamaño no encaja en la
escala, el problema es casi siempre la jerarquía y no el tamaño.

Para el rótulo de instrumento existe la utilidad **`.label`**, que empaqueta
mono + 11 px + versalitas + tracking + `--fg-subtle`. Esa cadena estaba escrita
a mano veintitantas veces y no siempre igual. Úsala en vez de repetirla.

> ⚠️ `.label` vive dentro de `@layer components`, y tiene que seguir ahí. Es la
> misma trampa de capas que el bloque `*` de §4.2: suelta, pisaría `text-accent`,
> `text-fg` o cualquier utilidad de color de Tailwind en todo elemento que las
> combinara.

#### Ritmo vertical

`--space-block` (4 / 5 rem) entre bloques mayores y `--space-stack` (1,25 rem)
entre un subtítulo y su lista. Se consumen como `mt-[var(--space-block)]`. Antes
eran dieciséis `mt-*` elegidos a ojo.

### 4.7 Accesibilidad
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
móvil. No lo pongas en la barra de progreso de scroll:
esas animan `scaleX`/`scale` legítimamente y la regla las rompería.

Aparte, `useDigest` consulta la preferencia con `usePrefersReducedMotion` porque
tiene que decidir *si* ejecuta la avalancha, no sólo a qué velocidad: con la
preferencia activa devuelve el digest final directamente.

### 4.8 Movimiento

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
- **El peso visual se gasta en la portada.** El titular, la entradilla y el
  artículo destacado; de ahí para abajo la página se mantiene callada a
  propósito.

Utilidades relacionadas: `.scan-row` (barrido de escáner sobre una fila
interactiva, sustituye al antiguo `.row-hover`) y `.stencil` (numeral de plancha
en contorno).

> ⚠️ **`color-mix()` no interpola en una transición.** Si animas
> `background-color` con un valor `color-mix(in srgb, var(--x) N%, transparent)`,
> el navegador deja la transición congelada en el valor inicial. Usa un color
> sólido y anima `opacity`, que además va al compositor.

> ⚠️ **`min-h-*` no genera CSS en este proyecto.** `min-h-9` no produce ninguna
> regla (`min-height` queda en `auto`). Usa `h-9` con `inline-flex items-center`,
> que es lo que ya emplea el resto del sitio.

### 4.9 Persistencia: qué se recuerda y qué no

| | ¿Se guarda? | Visitante nuevo |
|---|---|---|
| **Idioma** | **No** | Siempre inglés |
| **Tema** | Sí (`localStorage.theme`) | Siempre oscuro |

El idioma no persiste porque este sitio es un enlace que se comparte: si Elian
dejaba su móvil en español y se lo enseñaba a alguien, esa persona lo veía en
español. El tema sí persiste porque claro/oscuro es confort visual y a veces
accesibilidad — reiniciarlo cada visita obligaría a quien necesita el modo claro
a volver a elegirlo siempre.

**El tema NO se alinea con el sistema operativo, y es deliberado.** Para
cambiarlo: `defaultTheme="system"` + `enableSystem` en `providers/index.tsx`.
Antes de hacerlo, el matiz que importa: `prefers-color-scheme` devuelve `light`
tanto para «quiero claro» como para «no he elegido nada», y la mayoría de
sistemas vienen en claro de fábrica, así que alinearlo significa que la mayoría
de visitantes verían el sitio en claro. **No existe** la combinación «oscuro
salvo que el sistema pida claro explícitamente»: el navegador no distingue esos
dos casos.

> Medido: `enableSystem` a secas, sin tocar `defaultTheme`, no hace nada — un
> visitante nuevo con el sistema en claro seguía viendo oscuro, porque
> next-themes usa `defaultTheme` mientras no haya nada guardado.

### 4.10 No exageres las credenciales — la regla del alcance declarado

El artículo de Springer llegó a ser el titular de la portada, con la insignia
«primer autor» en ámbar. Elian lo corrigió: su aporte fue **la redacción y
algunas ideas para el algoritmo**, dentro de un equipo de ocho autores. Ahora es
una fila más de la sección 03, con el alcance escrito.

La razón no es modestia, es aritmética de credibilidad: el DOI está a un clic, y
un reclutador que abra el paper y vea la distancia entre lo que prometía la web
y lo que dice el artículo deja de creerse **también** la parte sólida —los tres
roles, las quince certificaciones, el nivel de las herramientas—. Inflar la
credencial más llamativa cuesta las demás.

De ahí sale la regla que aplica a todo dato nuevo de este sitio:

- **Un medidor es una afirmación cuantitativa.** Sólo se pinta si el CV declara
  el nivel. `skills` lleva nivel; `toolkit` no lleva y por eso son etiquetas.
- **Las cifras se cuentan, no se escriben.** Salen de `counts` en `content.ts`.
- **Ante la duda, declara menos.** Es recuperable; lo contrario no.

> ⚠️ No devuelvas la publicación a la portada ni reintroduzcas «primer autor»
> sin que Elian lo pida explícitamente.

### 4.11 Contenido invisible — el fallo más caro de este sitio

Las apariciones arrancan en `opacity: 0` y sólo las sube el JavaScript cuando un
IntersectionObserver dispara. **Cada vez que algo impide que ese observador
dispare, el contenido no se degrada: desaparece.** Ha pasado tres veces por tres
causas distintas, así que trátalo como una clase de fallo, no como un bug.

| Causa | Síntoma | Estado |
|---|---|---|
| `prefers-reduced-motion` | Framer deja el elemento en `initial` | Red en `globals.css` (§4.7) |
| Sin JavaScript | Nada sube la opacidad nunca | Red `@media (scripting: none)` |
| `content-visibility: auto` | El observador no ve contenido omitido | **Regla eliminada** |
| `key` traducida en un `.map()` | Cambiar de idioma remonta y reinicia a `opacity: 0` | Reglas abajo |

**Regla 1 — `content-visibility: auto` está prohibido mientras las apariciones
dependan de un observador.** Ahorraba ~10 ms de layout y costaba secciones
enteras en blanco. Si lo recuperas, primero cambia el sistema de apariciones.

**Regla 2 — nunca uses una cadena traducida como `key`.** Al cambiar de idioma
la clave cambia, React desmonta y monta de cero, y lo nuevo arranca invisible.

```tsx
// MAL: la clave cambia al cambiar de idioma
{t.about.principles.map((p) => <RevealItem key={p.title} …>)}
// BIEN: la lista es fija y ordenada, el índice ES su identidad
{t.about.principles.map((p, i) => <RevealItem key={i} …>)}
// BIEN también: un campo que no se traduce
{work.map((item) => <li key={item.org + item.title.en} …>)}
```

Esto era exactamente el bug de «al cambiar a español se queda una sección en
blanco»: sólo se veía hacia el español porque el sitio abre en inglés y nadie
hace el cambio al revés.

**Cómo comprobarlo antes de entregar** — en la consola del navegador, a 375 px,
tras recorrer la página entera en español:

```js
[...document.querySelectorAll('main *')]
  .filter(el => parseFloat(getComputedStyle(el).opacity) < 0.9
             && el.getBoundingClientRect().height > 0).length   // tiene que dar 0
```

### 4.12 Movimiento reducido: reducir MOVIMIENTO, no eliminar la respuesta

`prefers-reduced-motion` pide quitar lo que provoca mareo —desplazamientos,
escalados, parallax, giros—. **No pide dejar la interfaz muda.** Una transición
de color o de opacidad no dispara ningún trastorno vestibular, y tanto WCAG como
Apple la recomiendan como el *sustituto* del gesto.

Este sitio lo tuvo mal calibrado y el resultado fue una interfaz sin ninguna
respuesta para esos visitantes: ni tinte al pasar el cursor, ni foco en las
tarjetas, ni cambio al pulsar. Tres causas sumadas:

| Causa | Efecto |
|---|---|
| `transition-duration: 0.001ms !important` sobre `*` | Apagaba **todas** las transiciones, también las de color |
| `.spotlight-glow { display: none }` | El foco de las tarjetas desaparecía entero |
| `.press:hover { transform: none }` | Sin escalado y sin nada que lo sustituyera |

**La regla:** con la preferencia activa, cambia el TIPO de respuesta, no la
elimines.

- En vez de matar `transition-duration`, acota `transition-property` a lo
  seguro (`opacity, color, background-color, border-color, fill, stroke,
  filter, box-shadow`). Las transiciones de `transform` dejan de ejecutarse
  solas y las de color siguen vivas.
- El barrido de `.press` usa `scaleX`; con la preferencia se sustituye por el
  mismo tinte apareciendo por opacidad, sin desplazarse.
- El foco de `.spotlight` no se oculta: deja de **seguir** al cursor —eso es lo
  que era movimiento— y se queda quieto en el centro apareciendo por opacidad.
- Las animaciones por keyframes sí se apagan enteras: ahí no hay matiz.

> Sólo se oculta el foco por completo en `(hover: none), (pointer: coarse)`,
> donde no hay cursor que seguir ni hover que responder.

### 4.13 `AnimatePresence` + movimiento reducido — el contrario del §4.11

El §4.11 trata el contenido que se queda **invisible al entrar**. Éste es su
reflejo exacto: contenido que se queda **visible al salir**, y es peor, porque
lo que queda montado son capas a pantalla completa que interceptan clics.

Con «reducir movimiento» activo, Framer Motion suprime la animación de salida y
**nunca dispara su callback de finalización**, así que `AnimatePresence` espera
para siempre y no desmonta al hijo. El estado de React sí cambia —medido: el
efecto que bloquea el scroll del body se limpia bien— pero el nodo sigue en el
DOM.

Medido en el build de producción, antes del arreglo:

| Elemento | Síntoma | Gravedad |
|---|---|---|
| Paleta ⌘K | Backdrop `fixed inset-0 z-[100]` con `opacity: 0`. La opacidad **no** desactiva el hit-testing | Página entera sin poder pulsar nada tras abrir ⌘K una vez |
| Menú móvil | Se quedaba con `opacity: 1` porque lleva `data-reveal`, y la red del §4.11 lo forzaba a ser visible | Sitio tapado por completo en móvil |
| Tabla de experiencia | Las filas descartadas no desaparecían | El filtro parecía roto |

> ⚠️ **La red del §4.11 agrava este fallo, no lo arregla.**
> `[data-reveal] { opacity: 1 !important }` existe para que nada se quede
> invisible al entrar — y por eso mismo obliga a un elemento que está saliendo
> a permanecer completamente visible.

**La regla:** todo `exit` de un elemento bajo `AnimatePresence` se condiciona.
Sin `exit`, `AnimatePresence` no tiene nada que esperar y desmonta en el acto.

```tsx
const reducedMotion = usePrefersReducedMotion();
<motion.div exit={reducedMotion ? undefined : { opacity: 0 }} />
```

**Y el caso hermano: `initial` que anima `height`.** El detalle desplegable de
la sección 03 se quedaba en `height: 0; opacity: 0` con el texto dentro —
pulsar «+» no mostraba nada—. La red CSS no servía: sólo corrige `opacity`, no
`height`. Se arregla con `initial={reducedMotion ? false : {…}}`, que hace que
Framer renderice directamente en el estado final.

> **¿No dice el §4.11 que condicionar `initial` con un hook NO funciona?**
> Dice que no funciona **en las apariciones de scroll**, porque se montan
> durante la hidratación, cuando el hook todavía devuelve el snapshot de
> servidor (`false`). Un panel que se monta **al hacer clic** es otro caso: para
> entonces el hook ya devuelve el valor real del navegador. La distinción es
> *cuándo monta el elemento*, no la prop.

El hook está en `hooks/use-prefers-reduced-motion.ts` y usa
`useSyncExternalStore` para no chocar con la regla de ESLint del §4.5.

**Cómo comprobarlo** — con «reducir movimiento» activo en el sistema: abre y
cierra ⌘K, abre y cierra el menú móvil, filtra la tabla de experiencia y
despliega y pliega una fila. Las cuatro cosas tienen que volver a su sitio.

### 4.14 Flex + la regla global `min-width: 0`

`@layer base { * { min-width: 0 } }` (§4.2) deja que **cualquier** hijo de un
flex se encoja por debajo de su contenido. Todo elemento de ancho fijo dentro de
un flex —numerales, iconos, insignias— necesita `shrink-0` explícito.

Sin él, los numerales `01`–`04` de la sección 01 medían 13 px y se pintaban 7:
se veía «0» y media «1». Se notaba más en español, donde el texto contiguo es
más largo y aprieta más. Para detectarlo, `scrollWidth > clientWidth` en
elementos hoja delata cualquier recorte de este tipo.

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

Los ids de sección actuales son: `top`, `about`, `skills`, `experience`,
`services`, `contact`. Están duplicados en `navbar.tsx` (`SECTION_IDS` + `links`) y en
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
- **cambiar a español EN EL MÓVIL y recorrer la página entera**: ninguna
  sección puede quedarse en blanco (ver §4.11)
- activar «reducir movimiento» en el sistema: el barrido de las filas no debe
  ejecutarse y ningún bloque puede quedarse invisible

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

**Hecho en el rediseño tipográfico y de ritmo:** contrato de dos voces con
IBM Plex Sans en lugar de Inter (ver §4.6), escala tipográfica de cuatro pasos
que sustituye a trece tamaños ad-hoc, utilidad `.label` en `@layer components`,
tokens de ritmo vertical, servicios reconvertidos de pila de seis bloques a
matriz de capacidades de dos columnas, certificaciones alineadas en registro con
filetes que cruzan las columnas (y sin los trece checks redundantes), lecturas
del hero integradas dentro de la placa como pie del instrumento, y cifras del
hero derivadas de `counts` en `content.ts`.

**Hecho en el rediseño editorial (portada como titular):** se retira el
retrato-hash SHA-256 y con él `use-digest` y `use-prefers-reduced-motion`; se
retira el tecleo automático y `use-typewriter`; el hero se recompone como
portada de revista técnica —cabecera, nombre, entradilla y **la publicación de
Springer como artículo destacado**, leída de `content.ts` para que haya una sola
fuente de verdad—; pasos tipográficos `--step-deck` y `--step-lead` con la
jerarquía medida y monótona (84 → 44 → 36 → 22 → 17 en escritorio); y las tres
correcciones de contenido invisible de §4.11 y §4.12.

> **Por qué se fue el retrato-hash.** Era una rejilla de 8×8 donde cada celda era
> un dígito del SHA-256 de la identidad. Estaba bien construido y bien
> argumentado, y aun así se quitó: el propio dueño del sitio preguntó para qué
> servía. Un elemento que necesita un párrafo de explicación para justificarse no
> está comunicando, está pidiendo que lo descifren, y en una portada que tiene 30
> segundos para convencer a un reclutador eso es espacio gastado. La lección para
> quien siga: en este sitio, prefiere el dato verificable al gesto ingenioso.

**Hecho en el rebalanceo hacia habilidades:** la publicación baja de titular de
portada a fila de la sección 03 con su alcance declarado (§4.9); nueva sección
02 «Habilidades y certificaciones» con nivel de dominio, instrumental, idiomas y
las quince certificaciones agrupadas por año; el orden pasa a perfil ·
habilidades · experiencia · servicios · contacto, con la prueba por delante de
la oferta; tira de tecnologías y contador en la portada; datos nuevos leídos del
CV (niveles, inglés C1 y las dos certificaciones que faltaban).

**Hecho al actualizar el CV a la versión ATS de 2026:** PDFs reemplazados
(1,5 MB → 34 KB, texto seleccionable y legible por ATS); los medidores bajan de
diez a **seis**, que son los únicos niveles que declara el CV nuevo —Python,
Java, HTML·CSS·JS y Azure los perdieron y se movieron al instrumental—; el
instrumental se reorganiza según las categorías del CV y gana Azure, PostgreSQL,
React, Next.js, Spring Boot, Django y DevOps; los items del instrumental pasan
de `string` a `Localized`, que corrige un fallo real —la versión en inglés
mostraba «Criptografía», «Automatización» y «Migración de bases de datos» en
español—; y la tercera cifra del hero pasa a contar el stack completo.

> ⚠️ **Al actualizar el CV, comprueba SIEMPRE los niveles.** Es lo que más
> silenciosamente se desincroniza: el sitio siguió afirmando «Python — experto»
> después de que el CV dejara de decirlo, y el PDF que lo desmiente está a un
> clic en la misma página. Ver §4.10.

**Pendiente (requiere datos o decisiones del usuario):**

1. **No hay sección de proyectos, y es el hueco más grande que queda.** Un
   portafolio de ingeniería sin trabajo mostrable se apoya entero en el CV. Se
   revisó `github.com/Squierdan` para construirla con datos reales y no hay
   repositorios presentables (`ParaDianita`, `CEC-Pyhton`, un fork y el propio
   sitio). **No inventes proyectos para rellenarla** (§1): hace falta que el
   usuario aporte 2–4 trabajos reales —título, problema, qué hizo, stack, enlace
   o captura—. Con eso, la sección natural es un índice numerado como el de la
   tabla de roles, insertado como `03` y desplazando trayectoria y contacto.
2. ~~Certificaciones descuadradas.~~ **Resuelto:** eran quince en el CV y trece
   en el array. Añadidas las dos de Platzi que faltaban (abril 2025).
3. **Correo de contacto en Hotmail.** `site.email` es `daniel_caiz@hotmail.com`.
   Para un perfil de seguridad de la información un dominio propio o Gmail
   proyecta mejor; decisión del usuario.
4. **Formulario sin backend.** Compone un `mailto:`. Ver receta en §5.
5. **Teléfono.** Deliberadamente NO publicado (está en el CV, pero exponerlo en
   una web pública atrae spam). Añadirlo solo si el usuario lo pide.
6. **Dominio propio.** Hoy usa el subdominio `.vercel.app`. Si se compra uno,
   actualizar `site.url` y volver a desplegar.
7. **Sin tests.** No hay Vitest ni Playwright configurados.
8. **Imagen OG estática.** Está en `src/app/opengraph-image.png` (PNG generado a
   mano, 1200×630). Si cambia el nombre o el rol, hay que regenerarla.
