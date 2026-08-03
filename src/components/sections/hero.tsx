"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { CountUp } from "@/components/ui/count-up";
import { useClock } from "@/hooks/use-clock";
import { bootItem, bootStep, riseIn, stagger } from "@/lib/motion";
import { headlineStack } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * ============================================================================
 *  HERO — PORTADA EDITORIAL
 * ============================================================================
 *  Cabecera, nombre, entradilla, con qué trabaja y las cifras. En ese orden,
 *  que es el de las preguntas que hace quien está contratando: quién eres, qué
 *  haces, con qué herramientas y cuánto has acreditado.
 *
 *  ⚠️ AQUÍ ESTUVO LA PUBLICACIÓN DE SPRINGER COMO TITULAR, Y SE MOVIÓ.
 *  El artículo ocupaba este sitio con la insignia «primer autor» en ámbar.
 *  Elian lo corrigió: su aporte fue la redacción y algunas ideas para el
 *  algoritmo, dentro de un equipo de ocho. Presentarlo como titular decía de él
 *  más de lo que hizo, y eso en un perfil que un reclutador va a contrastar con
 *  el DOI es el peor sitio donde inflar nada. Ahora vive en la sección 03,
 *  declarado con precisión, y la portada la ocupa lo que sí sostiene: las
 *  herramientas, la experiencia y las quince certificaciones.
 *
 *  SIN retrato-hash, sin `❯ whoami`, sin tecleo automático: tres gestos que
 *  pedían ser descifrados antes de decir nada.
 * ============================================================================
 */
export function Hero() {
  const { t, locale } = useLanguage();
  const clock = useClock(site.timezone);

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden px-5 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-36 lg:px-12"
    >
      <div aria-hidden className="grid-lines absolute inset-0 -z-10" />

      <div className="mx-auto w-full max-w-5xl">
        {/* ------------------------------------------------------- Cabecera */}
        <motion.div
          data-reveal
          initial="hidden"
          animate="visible"
          variants={bootItem}
          transition={bootStep(0)}
          className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border pb-4"
        >
          <span className="label">{site.location}</span>
          <span aria-hidden className="label">
            /
          </span>
          <span className="label">{t.hero.discipline}</span>

          <span className="ml-auto inline-flex items-center gap-2">
            <span
              aria-hidden
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{
                background: site.available ? "var(--accent)" : "var(--amber)",
              }}
            />
            <span className="font-mono text-data text-fg-muted">
              {site.available ? t.hero.status.available : t.hero.status.busy}
            </span>
          </span>
        </motion.div>

        {/* --------------------------------------------------------- Titular */}
        <motion.h1
          data-reveal
          initial="hidden"
          animate="visible"
          variants={bootItem}
          transition={bootStep(1)}
          className="mt-10 text-balance font-semibold leading-[0.95] tracking-[-0.035em] text-[length:var(--step-display)] sm:mt-12"
        >
          {site.name}
        </motion.h1>

        {/* Entradilla. Un cuerpo por encima del texto de lectura y por debajo
            del titular: es el escalón que le falta a la mayoría de portadas. */}
        <motion.p
          data-reveal
          initial="hidden"
          animate="visible"
          variants={bootItem}
          transition={bootStep(2)}
          className="mt-6 max-w-2xl text-pretty leading-[1.55] text-fg-muted text-[length:var(--step-deck)]"
        >
          {t.hero.intro}
        </motion.p>

        {/* ------------------------------------------------------ Tira de stack
            La respuesta de un vistazo a «¿con qué trabajas?», que es la primera
            pregunta de cualquiera que esté contratando. Ocupa el sitio donde
            antes estaba el artículo destacado: la publicación se movió a la
            sección 03, con su aporte declarado con precisión, porque presentarla
            como titular decía de Elian más de lo que hizo.

            Entra escalonada, una etiqueta tras otra. Es el único movimiento
            coreografiado que queda además del arranque, y dura lo que tarda el
            ojo en recorrer la fila. */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          transition={{ delayChildren: 0.42 }}
          className="mt-12 border-t border-border pt-7 sm:mt-14"
        >
          <motion.p data-reveal variants={riseIn} className="label">
            {t.hero.stackLabel}
          </motion.p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {headlineStack.map((item) => (
              <motion.li
                key={item}
                data-reveal
                variants={riseIn}
                className="border border-border-strong px-2.5 py-1 font-mono text-data text-fg transition-colors duration-[var(--dur-micro)] hover:border-accent hover:text-accent"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* ------------------------------------------------------- Llamadas */}
        <motion.div
          data-reveal
          initial="hidden"
          animate="visible"
          variants={bootItem}
          transition={bootStep(4)}
          className="mt-12 flex flex-wrap items-center gap-3"
        >
          <a
            href="#experience"
            className="press press-solid group inline-flex h-11 items-center gap-2 bg-accent px-5 font-mono text-ui font-medium text-[var(--accent-fg)]"
          >
            {t.hero.ctaPrimary}
            <ArrowUpRight
              aria-hidden
              className="h-4 w-4 transition-transform duration-[var(--dur-base)] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
          <a
            href="#contact"
            className="press inline-flex h-11 items-center gap-2 border border-border-strong px-5 font-mono text-ui text-fg hover:border-accent hover:text-accent"
          >
            {t.hero.ctaSecondary}
          </a>
          <a
            href={site.cv[locale]}
            download
            className="press inline-flex h-11 items-center gap-2 px-2 font-mono text-ui text-fg-muted hover:text-accent"
          >
            <Download aria-hidden className="h-4 w-4" />
            <span className="link-underline">{t.hero.ctaCv}</span>
          </a>
        </motion.div>

        {/* ---------------------------------------------------------- Cifras
            Pie de portada. Las tres cifras salen de `counts` en content.ts, así
            que no pueden contradecir a las listas de más abajo. */}
        <motion.dl
          data-reveal
          initial="hidden"
          animate="visible"
          variants={bootItem}
          transition={bootStep(5)}
          className="mt-14 grid grid-cols-3 gap-px border-y border-border bg-border sm:mt-16"
        >
          {/* `key={index}` y no `key={stat.label}`: la etiqueta está traducida
              y como clave remontaría las tres cifras al cambiar de idioma. */}
          {/* Reparto dentro de cada celda, con `first:pl-0` para que el primer
              número siga alineado con el titular de arriba. Antes sólo había
              `pr-4`: el contenido de las celdas 2 y 3 arrancaba pegado al
              filete izquierdo y la etiqueta larga de la tercera llegaba casi al
              borde derecho, así que la fila se leía descentrada.

              El padding es responsivo y no fijo: a 375 px la celda mide 111 px,
              y con `px-5` quedaban 71 px útiles para una etiqueta cuya palabra
              más larga —«herramientas»— necesita 78. Se cortaba. Con `px-3` en
              móvil quedan 87 y entra holgada. */}
          {t.hero.stats.map((stat, index) => (
            <div key={index} className="bg-bg px-3 py-5 first:pl-0 sm:px-5">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-mono text-3xl font-semibold leading-none tabular-nums text-fg sm:text-4xl">
                <CountUp value={Number(stat.value)} />
              </dd>
              <dd className="mt-2 text-meta leading-snug text-fg-subtle">
                {stat.label}
              </dd>
            </div>
          ))}
        </motion.dl>

        {/* Pie de cabecera vivo: zona y hora local. Es el único dato de la
            portada que cambia solo, y dice si escribes a alguien despierto. */}
        <motion.p
          data-reveal
          initial="hidden"
          animate="visible"
          variants={bootItem}
          transition={bootStep(6)}
          className="label mt-5 flex flex-wrap items-center gap-x-3 gap-y-1"
        >
          <span>{site.timezone}</span>
          <span aria-hidden>·</span>
          <span className="tabular-nums">{clock || "--:--:--"}</span>
        </motion.p>
      </div>
    </section>
  );
}
