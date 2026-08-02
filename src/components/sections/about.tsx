"use client";

import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";

/**
 * ============================================================================
 *  01 · PERFIL
 * ============================================================================
 *  Sólo quién es: prosa, formación y cómo trabaja.
 *
 *  El stack y las certificaciones vivían aquí, al final, después de cuatro
 *  párrafos —o sea, justo lo que Elian quiere que se vea, colocado donde menos
 *  se ve—. Se han movido a su propia sección 02, que además les da sitio para
 *  el nivel de dominio y el agrupado por año que aquí no cabían.
 * ============================================================================
 */
export function About() {
  const { t } = useLanguage();

  return (
    <Section id="about">
      <SectionHeading
        index={t.about.index}
        eyebrow={t.about.eyebrow}
        title={t.about.title}
      />

      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div>
          {/* Texto presentado como archivo abierto, con gutter de líneas.
              Los párrafos entran escalonados: el texto se compone de arriba
              abajo, que es el orden en que se lee. */}
          <RevealGroup className="border-l border-border pl-5 sm:pl-7">
            {t.about.paragraphs.map((paragraph, index) => (
              <RevealItem key={index} className="relative mb-6 last:mb-0">
                <span
                  aria-hidden
                  className="absolute -left-5 top-1 select-none font-mono text-data tabular-nums text-fg-subtle/70 sm:-left-7"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-body text-fg-muted">{paragraph}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Formación académica */}
          <Reveal>
            <h3 className="label mt-[var(--space-block)]">
              {t.about.educationTitle}
            </h3>
          </Reveal>
          <RevealGroup
            as="ul"
            className="mt-[var(--space-stack)] divide-y divide-border border-y border-border"
          >
            {/* `key` por índice y NUNCA por el texto.
                `key={item.degree}` parecía más honesto, pero `degree` viene del
                diccionario: al cambiar de idioma la clave pasaba de «Software
                Engineering» a «Ingeniería de Software», React desmontaba las
                filas y montaba otras nuevas, y las nuevas arrancan en
                `opacity: 0` esperando al observador de scroll. Combinado con el
                `content-visibility: auto` que había en globals.css, ese
                observador no llegaba a dispararse y la lista se quedaba en
                blanco. La lista es fija y ordenada: el índice ES su identidad. */}
            {t.about.education.map((item, index) => (
              <RevealItem
                as="li"
                key={index}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3.5"
              >
                <span>
                  <span className="block text-ui font-medium text-fg">
                    {item.degree}
                  </span>
                  <span className="mt-0.5 block font-mono text-data text-accent">
                    {item.school}
                  </span>
                </span>
                <span className="font-mono text-data tabular-nums text-fg-subtle">
                  {item.period}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Principios de trabajo */}
        <div>
          <Reveal>
            <h3 className="label">{t.about.principlesTitle}</h3>
          </Reveal>
          <RevealGroup
            as="ul"
            className="mt-[var(--space-stack)] divide-y divide-border border-y border-border"
          >
            {/* Mismo motivo que en formación: `principle.title` está traducido
                y como `key` remontaba la lista entera al cambiar de idioma. */}
            {t.about.principles.map((principle, index) => (
              <RevealItem as="li" key={index} className="py-4">
                <div className="flex items-baseline gap-3">
                  {/* `shrink-0`: la regla global `* { min-width: 0 }` de
                      globals.css deja que un hijo de flex se encoja por debajo
                      de su contenido. Sin esto el numeral medía 13 px y se
                      pintaban 7, o sea «0» y media «1» — peor en español, donde
                      el título de al lado es más largo y aprieta más. */}
                  <span className="shrink-0 font-mono text-data tabular-nums text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="text-ui font-medium text-fg">
                      {principle.title}
                    </h4>
                    <p className="mt-1 text-meta text-fg-muted">
                      {principle.body}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>

    </Section>
  );
}
