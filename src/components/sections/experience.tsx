"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { DUR, EASE_OUT } from "@/lib/motion";
import {
  categoryLabels,
  work,
  workCategories,
  type WorkCategory,
} from "@/lib/content";

type Filter = WorkCategory | "all";

/**
 * ============================================================================
 *  TRAYECTORIA
 * ============================================================================
 *  Un único índice tabular expandible: se lee más rápido que una rejilla de
 *  tarjetas y escala a decenas de entradas.
 *
 *  ⚠️ LA PUBLICACIÓN YA NO TIENE BLOQUE DESTACADO.
 *  Tenía uno propio arriba, en ámbar, con la insignia «primer autor». Elian
 *  corrigió el alcance de su aporte —redacción y algunas ideas para el
 *  algoritmo, en un equipo de ocho—, así que ahora es una fila más, con su
 *  categoría «investigación» y el DOI al desplegarla. Sigue estando y sigue
 *  siendo verificable; lo que se retiró es el énfasis, no el dato.
 *
 *  Los filtros se generan sólo con las categorías que existen de verdad entre
 *  las entradas, así que nunca aparece un filtro que devuelve una tabla vacía.
 * ============================================================================
 */
export function Experience() {
  const { t, locale } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  /* Mismo motivo que en la paleta y el menú móvil: con «reducir movimiento»
     `AnimatePresence` no desmonta al hijo porque la salida nunca termina. Aquí
     el síntoma sería una tabla que no filtra —las filas descartadas seguirían
     visibles— y un detalle desplegado que no se puede volver a plegar. */
  const reducedMotion = usePrefersReducedMotion();

  /* Sin separar investigación del resto: la publicación es una entrada más de
     la trayectoria, no un bloque destacado. Ver la nota de `content.ts`. */
  const roles = work;

  const visible = useMemo(
    () =>
      filter === "all"
        ? roles
        : roles.filter((item) => item.category === filter),
    [filter, roles],
  );

  /** Sólo las categorías presentes entre los roles: sin filtros que no filtran. */
  const filters: Filter[] = [
    "all",
    ...workCategories.filter((category) =>
      roles.some((item) => item.category === category),
    ),
  ];

  return (
    <Section id="experience">
      <SectionHeading
        index={t.work.index}
        eyebrow={t.work.eyebrow}
        title={t.work.title}
      />

      {/* ------------------------------------------------ Roles profesionales */}
      <Reveal>
        <h3 className="label">
          {t.work.rolesTitle}
        </h3>
      </Reveal>

      {/* Filtros presentados como banderas de comando */}
      <Reveal>
        <div
          role="tablist"
          aria-label={t.work.rolesTitle}
          className="mb-8 mt-5 flex flex-wrap items-center gap-2"
        >
          {filters.map((value) => {
            const isActive = filter === value;
            const label =
              value === "all" ? t.work.filterAll : categoryLabels[value][locale];
            return (
              <button
                key={value}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setFilter(value);
                  setOpenId(null);
                }}
                className={`press inline-flex h-9 items-center border px-3 font-mono text-data ${
                  isActive
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-border text-fg-muted hover:border-border-strong hover:text-fg"
                }`}
              >
                --filter={label}
              </button>
            );
          })}
          <span className="ml-auto font-mono text-data tabular-nums text-fg-subtle">
            {String(visible.length).padStart(2, "0")} /{" "}
            {String(roles.length).padStart(2, "0")}
          </span>
        </div>
      </Reveal>

      {/* Cabecera de la "tabla" */}
      <div className="hidden grid-cols-[2.5rem_1fr_11rem_9rem_2rem] gap-4 border-y border-border px-1 py-2 label lg:grid">
        <span>#</span>
        <span>{t.work.colName}</span>
        <span>{t.work.colStack}</span>
        <span>{t.work.colYear}</span>
        <span />
      </div>

      <ul className="border-b border-border">
        {/* Sin `mode="popLayout"` ni la prop `layout`: ambos obligan a medir
            la posición de cada hermano en cada fotograma (layout continuo).
            Basta con animar opacidad y desplazamiento, que van al compositor. */}
        <AnimatePresence initial={false}>
          {visible.map((item, index) => {
            const key = item.org + item.title.en;
            const isOpen = openId === key;
            return (
              <motion.li
                key={key}
                // `data-reveal`: red de seguridad de movimiento reducido, ver
                // la nota en `ui/reveal.tsx` y en globals.css.
                data-reveal
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: DUR.base, ease: EASE_OUT }}
                className="border-t border-border lg:first:border-t-0"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : key)}
                  aria-expanded={isOpen}
                  className="scan-row grid w-full grid-cols-[2.5rem_1fr_2rem] items-center gap-4 px-1 py-5 text-left lg:grid-cols-[2.5rem_1fr_11rem_9rem_2rem]"
                >
                  <span className="pl-3 font-mono text-data tabular-nums text-fg-subtle">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0">
                    {/* Sin `truncate`: los cargos y las organizaciones son
                        largos, y en 375 px se cortaban a media palabra.
                        Envolver es preferible a truncar cuando el texto es la
                        información, no una etiqueta. */}
                    <span className="block text-base font-medium leading-snug tracking-tight text-fg sm:text-lg">
                      {item.title[locale]}
                    </span>
                    <span className="mt-1 block font-mono text-data text-accent">
                      {item.org}
                    </span>
                    {/* El resumen de una línea: la tabla tiene que decir algo
                        antes de que el visitante despliegue nada. */}
                    <span className="mt-1.5 block text-sm leading-snug text-fg-muted">
                      {item.summary[locale]}
                    </span>
                    <span className="mt-1 block truncate font-mono text-data text-fg-subtle lg:hidden">
                      {item.period[locale]}
                    </span>
                  </span>

                  <span className="hidden truncate font-mono text-data text-fg-subtle lg:block">
                    {categoryLabels[item.category][locale]}
                  </span>

                  <span className="hidden font-mono text-data text-fg-subtle lg:block">
                    {item.period[locale]}
                  </span>

                  <span
                    aria-hidden
                    className={`justify-self-end font-mono text-sm transition-transform duration-[var(--dur-base)] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "rotate-45 text-accent" : "text-fg-subtle"
                    }`}
                  >
                    +
                  </span>
                </button>

                {/* Detalle expandible */}
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      /* `initial={false}` con movimiento reducido: Framer
                         renderiza directamente en el estado `animate` sin
                         animar. Sin esto, suprimía la animación y dejaba el
                         panel en su `initial` —medido: `height: 0; opacity: 0`
                         con el texto dentro—, así que pulsar «+» no mostraba
                         nada en absoluto.

                         Aquí SÍ es seguro condicionar `initial` con un hook,
                         al contrario que en las apariciones de scroll (§4.11):
                         este panel se monta al hacer clic, mucho después de la
                         hidratación, cuando el hook ya devuelve el valor real.
                         La red CSS de `[data-reveal]` tampoco servía como
                         alternativa: sólo corrige `opacity`, no `height`. */
                      initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: DUR.slow, ease: EASE_OUT }}
                      className="overflow-hidden"
                    >
                      <div className="border-l-2 border-accent/40 py-2 pl-6 pr-1 lg:ml-[2.5rem]">
                        <p className="max-w-3xl text-sm leading-relaxed text-fg-muted">
                          {item.detail[locale]}
                        </p>

                        <ul className="mt-4 flex flex-wrap gap-2">
                          {item.stack.map((tag) => (
                            <li
                              key={tag}
                              className="border border-border px-2 py-0.5 font-mono text-data text-fg-subtle"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>

                        {item.link ? (
                          <div className="mt-5 pb-5">
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 border border-accent bg-accent-soft px-3 py-1.5 font-mono text-data text-accent transition-colors hover:bg-accent hover:text-[var(--accent-fg)]"
                            >
                              <ArrowUpRight className="h-3.5 w-3.5" />
                              {item.linkLabel?.[locale] ?? item.link}
                            </a>
                          </div>
                        ) : (
                          <div className="pb-5" />
                        )}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      {visible.length === 0 ? (
        <p className="py-10 text-center font-mono text-sm text-fg-subtle">
          {t.work.empty}
        </p>
      ) : null}
    </Section>
  );
}
