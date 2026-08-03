"use client";

import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Meter } from "@/components/ui/meter";
import { useLanguage } from "@/components/providers/language-provider";
import {
  certificationsByYear,
  counts,
  languages,
  skills,
  toolkit,
} from "@/lib/content";

/**
 * ============================================================================
 *  HABILIDADES Y CERTIFICACIONES
 * ============================================================================
 *  Sección nueva, y es la que ahora carga con el peso de la página.
 *
 *  Antes, lo que Elian quiere que se vea —lo que sabe hacer y lo que ha
 *  certificado— vivía enterrado como dos sub-bloques al final de la sección 01,
 *  después de cuatro párrafos de prosa, mientras la portada la ocupaba un
 *  artículo en el que su aporte fue la redacción. Estaba al revés.
 *
 *  Tres bloques, de más a menos concreto:
 *   1. Herramientas CON nivel declarado en el CV, con medidor.
 *   2. El resto del instrumental, sin puntuar: son etiquetas, no medidores.
 *   3. Las quince certificaciones, agrupadas por año.
 *
 *  El agrupado por año no es decorativo: nueve de las quince son de 2025. Sin
 *  agrupar, eso es una lista larga; agrupado, es una trayectoria que acelera, y
 *  se lee sin que nadie tenga que escribirlo en una frase de relleno.
 * ============================================================================
 */
export function Skills() {
  const { t, locale } = useLanguage();

  return (
    <Section id="skills">
      <SectionHeading
        index={t.skills.index}
        eyebrow={t.skills.eyebrow}
        title={t.skills.title}
      />

      {/* ------------------------------------------- 1 · Con nivel declarado */}
      <Reveal>
        <h3 className="label">{t.skills.ratedTitle}</h3>
      </Reveal>

      <RevealGroup className="mt-[var(--space-stack)] grid gap-px border border-border bg-border sm:grid-cols-2">
        {skills.map((group) => (
          <RevealItem key={group.id} className="bg-bg p-5 sm:p-6">
            <p className="font-mono text-data text-accent">
              {group.group[locale]}/
            </p>

            <ul className="mt-4 space-y-3">
              {group.items.map((skill) => (
                <li
                  key={skill.name}
                  className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1"
                >
                  <span className="text-ui text-fg">{skill.name}</span>
                  <Meter
                    level={skill.level}
                    label={t.skills.levels[skill.level]}
                  />
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* ------------------------------------------------ 2 · Sin puntuar */}
      <Reveal>
        <h3 className="label mt-[var(--space-block)]">
          {t.skills.toolkitTitle}
        </h3>
      </Reveal>
      <RevealGroup className="mt-[var(--space-stack)] grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
        {toolkit.map((group) => (
          <RevealItem key={group.id}>
            <p className="font-mono text-data text-accent">
              {group.group[locale]}/
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="border border-border px-2 py-1 font-mono text-data text-fg-muted transition-colors duration-[var(--dur-micro)] hover:border-border-strong hover:text-fg"
                >
                  {item}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* --------------------------------------------------- 3 · Idiomas */}
      <Reveal>
        <h3 className="label mt-[var(--space-block)]">
          {t.skills.languagesTitle}
        </h3>
      </Reveal>
      <RevealGroup
        as="ul"
        className="mt-[var(--space-stack)] flex flex-wrap gap-px border border-border bg-border"
      >
        {languages.map((language) => (
          <RevealItem
            as="li"
            key={language.id}
            className="flex-1 bg-bg px-5 py-4"
          >
            <span className="block text-ui text-fg">
              {language.name[locale]}
            </span>
            <span className="mt-1 block font-mono text-data text-accent">
              {language.level[locale]}
            </span>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* --------------------------------------------- 4 · Certificaciones */}
      <Reveal>
        <div className="mt-[var(--space-block)] flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="label">{t.skills.certificationsTitle}</h3>
          <span className="font-mono text-data tabular-nums text-accent">
            {counts.certifications}
          </span>
        </div>
      </Reveal>

      <div className="mt-[var(--space-stack)] border-t border-border">
        {certificationsByYear.map((bucket) => (
          <div
            key={bucket.year}
            /* `4rem` y `gap-x-5` en vez de `5rem` y `gap-x-8`: la columna del
               año más el hueco dejaban 112 px de aire entre «2025» y el primer
               nombre de certificación, y con quince filas eso se lee como si la
               lista estuviera empujada hacia la derecha en vez de colgando del
               año. El año cabe de sobra en 4rem —son cuatro cifras tabulares—. */
            className="grid gap-x-5 border-b border-border py-6 sm:grid-cols-[4rem_1fr]"
          >
            {/* El año, con su recuento. La columna de años convierte la lista
                en una cronología sin necesidad de dibujar un eje. */}
            <Reveal>
              <p className="font-mono text-2xl font-semibold tabular-nums leading-none text-fg">
                {bucket.year}
              </p>
              {/* Sólo la cifra, sin la palabra.
                  «10 certificaciones» necesitaba 119 px en una columna de 64:
                  envolvía, y su segunda línea caía a la altura de los nombres,
                  que es lo que se veía como texto superpuesto. Ensanchar la
                  columna devolvería el problema contrario —la lista empujada a
                  la derecha—, así que lo que sobra es la palabra: la sección ya
                  se titula «Certificaciones» y repetirla cuatro veces más no
                  añade nada. La frase completa sigue existiendo para lectores
                  de pantalla. */}
              <p className="label mt-1.5 tabular-nums">
                <span aria-hidden>{bucket.items.length}</span>
                <span className="sr-only">
                  {bucket.items.length}{" "}
                  {bucket.items.length === 1
                    ? t.skills.certUnitOne
                    : t.skills.certUnitMany}
                </span>
              </p>
            </Reveal>

            <RevealGroup as="ul" className="mt-4 space-y-2.5 sm:mt-0">
              {bucket.items.map((cert) => (
                <RevealItem
                  as="li"
                  key={cert.name}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5"
                >
                  <span className="text-meta leading-snug text-fg">
                    {cert.name}
                  </span>
                  <span className="font-mono text-data text-fg-subtle">
                    {cert.issuer}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        ))}
      </div>
    </Section>
  );
}
