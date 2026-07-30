"use client";

import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { certifications, stack } from "@/lib/content";

export function About() {
  const { t, locale } = useLanguage();

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
            {t.about.education.map((item) => (
              <RevealItem
                as="li"
                key={item.degree}
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
            {t.about.principles.map((principle, index) => (
              <RevealItem as="li" key={principle.title} className="py-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-data tabular-nums text-accent">
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

      {/* Stack agrupado por dominio */}
      <Reveal>
        <h3 className="label mt-[var(--space-block)]">{t.about.skillsTitle}</h3>
      </Reveal>
      <RevealGroup className="mt-[var(--space-stack)] grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {stack.map((group) => (
          <RevealItem key={group.group.en} className="bg-bg p-5">
            <p className="font-mono text-data text-accent">
              {group.group[locale]}/
            </p>
            <ul className="mt-3 space-y-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="font-mono text-meta text-fg-muted transition-colors duration-[var(--dur-micro)] hover:text-fg"
                >
                  <span aria-hidden className="mr-2 text-fg-subtle/60">
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* ------------------------------------------------- Certificaciones
          Registro alineado, no un muro de tarjetas.

          Antes era una rejilla de tres columnas donde cada item se dibujaba su
          propio borde inferior. Como los nombres tienen largos distintos, las
          alturas de fila diferían y las reglas de las tres columnas no
          coincidían nunca: trece filetes a trece alturas distintas. En una
          estética de instrumento la alineación **es** el argumento, así que
          ahora los filetes son el hueco de la rejilla (`gap-px`) y cruzan las
          dos columnas a la misma altura.

          También se han quitado los trece iconos de check. Estar en la lista ya
          era la afirmación: el check la repetía trece veces y gastaba el color
          de acento en confirmar algo que nadie había puesto en duda. El acento
          se reserva ahora para el año, que es el dato que de verdad se compara.

          El año va a la derecha, en cifras tabulares: los ocho «2025»
          consecutivos se apilan en una columna recta y la ráfaga de formación
          reciente se lee de un vistazo, sin necesidad de agruparlos ni de
          escribirlo. */}
      <Reveal>
        <div className="mt-[var(--space-block)] flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="label">{t.about.certificationsTitle}</h3>
          <span className="font-mono text-data tabular-nums text-accent">
            {String(certifications.length).padStart(2, "0")}
          </span>
          <p className="text-meta text-fg-subtle">
            {t.about.certificationsNote}
          </p>
        </div>
      </Reveal>
      <RevealGroup
        as="ul"
        className="mt-[var(--space-stack)] grid gap-px border border-border bg-border lg:grid-cols-2"
      >
        {certifications.map((cert) => (
          <RevealItem
            as="li"
            key={cert.name}
            className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 bg-bg px-4 py-3"
          >
            <span className="min-w-0">
              <span className="block text-meta leading-snug text-fg">
                {cert.name}
              </span>
              <span className="mt-0.5 block font-mono text-data text-fg-subtle">
                {cert.issuer}
              </span>
            </span>
            <span className="font-mono text-data tabular-nums text-accent">
              {cert.year}
            </span>
          </RevealItem>
        ))}

        {/* Celda de relleno cuando el número de certificaciones es impar.
            Sin ella, el hueco que deja la última fila en la segunda columna
            no lo tapa ninguna celda `bg-bg` y se ve el `bg-border` del
            contenedor: un rectángulo sólido del color del filete, del alto de
            una fila. Con trece entradas ocurría; con catorce no, así que
            depende del contenido y tiene que resolverse solo. */}
        {certifications.length % 2 === 1 ? (
          <li aria-hidden className="hidden bg-bg lg:block" />
        ) : null}
      </RevealGroup>
    </Section>
  );
}
