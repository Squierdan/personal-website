"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Code2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import {
  categoryLabels,
  projectCategories,
  projects,
  type ProjectCategory,
} from "@/lib/content";

type Filter = ProjectCategory | "all";

/**
 * Portafolio como índice tabular expandible en lugar de la típica rejilla de
 * tarjetas: se lee más rápido, escala a decenas de proyectos y permite mostrar
 * el detalle sin salir de la página.
 */
export function Projects() {
  const { t, locale } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );

  const filters: Filter[] = ["all", ...projectCategories];

  return (
    <Section id="projects">
      <SectionHeading
        index={t.projects.index}
        eyebrow={t.projects.eyebrow}
        title={t.projects.title}
        subtitle={t.projects.subtitle}
      />

      {/* Filtros presentados como banderas de comando */}
      <Reveal>
        <div
          role="tablist"
          aria-label={t.projects.eyebrow}
          className="mb-8 flex flex-wrap items-center gap-2"
        >
          {filters.map((value) => {
            const isActive = filter === value;
            const label =
              value === "all"
                ? t.projects.filterAll
                : categoryLabels[value][locale];
            return (
              <button
                key={value}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setFilter(value);
                  setOpenId(null);
                }}
                className={`border px-3 py-1.5 font-mono text-[11px] transition-colors ${
                  isActive
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-border text-fg-muted hover:border-border-strong hover:text-fg"
                }`}
              >
                --filter={label}
              </button>
            );
          })}
          <span className="ml-auto font-mono text-[11px] text-fg-subtle">
            {String(visible.length).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </Reveal>

      {/* Cabecera de la "tabla" */}
      <div className="hidden grid-cols-[2.5rem_1fr_14rem_4rem_2rem] gap-4 border-y border-border px-1 py-2 font-mono text-[10px] uppercase tracking-widest text-fg-subtle lg:grid">
        <span>#</span>
        <span>{t.projects.colName}</span>
        <span>{t.projects.colStack}</span>
        <span>{t.projects.colYear}</span>
        <span />
      </div>

      <ul className="border-b border-border lg:border-t-0">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((project, index) => {
            const isOpen = openId === project.title;
            return (
              <motion.li
                key={project.title}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="border-t border-border first:border-t lg:first:border-t-0"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : project.title)}
                  aria-expanded={isOpen}
                  className="row-hover grid w-full grid-cols-[2.5rem_1fr_2rem] items-center gap-4 px-1 py-5 text-left lg:grid-cols-[2.5rem_1fr_14rem_4rem_2rem]"
                >
                  <span className="font-mono text-[11px] text-fg-subtle">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-base font-medium tracking-tight text-fg sm:text-lg">
                        {project.title}
                      </span>
                      {project.featured ? (
                        <span className="shrink-0 border border-accent/40 px-1.5 py-px font-mono text-[9px] uppercase tracking-wider text-accent">
                          ★
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-1 block truncate text-sm text-fg-muted">
                      {project.summary[locale]}
                    </span>
                  </span>

                  <span className="hidden truncate font-mono text-[11px] text-fg-subtle lg:block">
                    {project.stack.slice(0, 3).join(" · ")}
                  </span>

                  <span className="hidden font-mono text-[11px] tabular-nums text-fg-subtle lg:block">
                    {project.year}
                  </span>

                  <span
                    aria-hidden
                    className={`justify-self-end font-mono text-sm text-fg-subtle transition-transform duration-300 ${
                      isOpen ? "rotate-45 text-accent" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {/* Detalle expandible */}
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <div className="border-l-2 border-accent/40 py-2 pl-6 pr-1 lg:ml-[2.5rem]">
                        <p className="max-w-2xl text-pretty text-sm leading-relaxed text-fg-muted">
                          {project.detail[locale]}
                        </p>

                        <ul className="mt-4 flex flex-wrap gap-2">
                          {project.stack.map((tech) => (
                            <li
                              key={tech}
                              className="border border-border px-2 py-0.5 font-mono text-[11px] text-fg-subtle"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-5 flex flex-wrap gap-3 pb-5">
                          {project.repoUrl ? (
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 font-mono text-[11px] text-fg-muted transition-colors hover:border-accent hover:text-accent"
                            >
                              <Code2 className="h-3.5 w-3.5" />
                              {t.projects.viewCode}
                            </a>
                          ) : null}
                          {project.liveUrl ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 border border-accent bg-accent-soft px-3 py-1.5 font-mono text-[11px] text-accent transition-colors hover:bg-accent hover:text-[var(--accent-fg)]"
                            >
                              <ArrowUpRight className="h-3.5 w-3.5" />
                              {t.projects.viewLive}
                            </a>
                          ) : null}
                        </div>
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
          {t.projects.empty}
        </p>
      ) : null}
    </Section>
  );
}
