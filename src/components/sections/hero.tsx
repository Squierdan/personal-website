"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useClock } from "@/hooks/use-clock";
import { bootItem, bootStep } from "@/lib/motion";
import { work } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * ============================================================================
 *  HERO — PORTADA EDITORIAL
 * ============================================================================
 *  La página se abre como la portada de una revista técnica: cabecera, titular,
 *  entradilla y, debajo, **el artículo destacado**. Y aquí el artículo destacado
 *  es literal: la publicación revisada por pares en Annals of Telecommunications
 *  (Springer Nature), como primer autor.
 *
 *  Por qué ahí y no en la sección 03: es el dato más difícil de conseguir de
 *  todo el CV y el que ningún otro candidato de su nivel va a tener. Estaba
 *  enterrado a tres pantallas de scroll, donde un reclutador que hojea no llega.
 *  Un titular no se guarda para la página cinco.
 *
 *  El bloque lee la publicación de `content.ts` —no la reescribe— así que hay
 *  una sola fuente de verdad: añadir un segundo artículo con
 *  `category: "research"` cambia el titular solo, y la sección 03 sigue
 *  mostrando el detalle completo sin que nada se duplique a mano.
 *
 *  SIN retrato-hash, sin `❯ whoami`, sin tecleo automático. Eran tres gestos
 *  que pedían ser descifrados antes de decir nada, y la portada de un dossier
 *  no juega a las adivinanzas: dice quién eres, qué haces y qué has publicado.
 * ============================================================================
 */
export function Hero() {
  const { t, locale } = useLanguage();
  const clock = useClock(site.timezone);

  /** El titular sale de los datos, no de una copia escrita a mano. */
  const lead = work.find((item) => item.category === "research");

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

        {/* ------------------------------------------------ Artículo destacado */}
        {lead ? (
          <motion.article
            data-reveal
            initial="hidden"
            animate="visible"
            variants={bootItem}
            transition={bootStep(3)}
            className="mt-12 border-t border-border pt-8 sm:mt-14"
          >
            {/* El rótulo va en ámbar, que en este sistema es el color del
                énfasis. Es la única credencial de la portada que lo lleva. */}
            <p className="label text-[var(--amber)]">
              {t.hero.leadEyebrow} / {t.work.firstAuthor} /{" "}
              {lead.period[locale]}
            </p>

            <h2 className="mt-4 max-w-3xl text-balance font-medium leading-[1.1] tracking-[-0.02em] text-[length:var(--step-lead)]">
              {lead.title[locale]}
            </h2>

            <p className="mt-3 font-mono text-ui text-fg-muted">{lead.org}</p>

            {lead.link ? (
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href={lead.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-11 items-center gap-2 border border-[var(--amber)] px-4 font-mono text-ui text-[var(--amber)] transition-colors hover:bg-amber/10"
                >
                  {lead.linkLabel?.[locale]}
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 transition-transform duration-[var(--dur-base)] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                {/* El DOI escrito: es el identificador con el que se verifica
                    la publicación en cualquier índice, no sólo el destino del
                    enlace. Un reclutador que contrasta lo copia de aquí. */}
                <p className="break-all font-mono text-data text-fg-subtle">
                  {lead.link.replace(/^https?:\/\/(www\.)?/, "")}
                </p>
              </div>
            ) : null}
          </motion.article>
        ) : null}

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
            className="group inline-flex h-11 items-center gap-2 bg-accent px-5 font-mono text-ui font-medium text-[var(--accent-fg)]"
          >
            {t.hero.ctaPrimary}
            <ArrowUpRight
              aria-hidden
              className="h-4 w-4 transition-transform duration-[var(--dur-base)] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
          <a
            href="#contact"
            className="inline-flex h-11 items-center gap-2 border border-border-strong px-5 font-mono text-ui text-fg transition-colors hover:border-accent hover:text-accent"
          >
            {t.hero.ctaSecondary}
          </a>
          <a
            href={site.cv[locale]}
            download
            className="inline-flex h-11 items-center gap-2 px-2 font-mono text-ui text-fg-muted transition-colors hover:text-accent"
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
          {t.hero.stats.map((stat, index) => (
            <div key={index} className="bg-bg py-5 pr-4">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-mono text-3xl font-semibold leading-none tabular-nums text-fg sm:text-4xl">
                {stat.value}
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
