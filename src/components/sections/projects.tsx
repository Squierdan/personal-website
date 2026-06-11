"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/social-icons";
import { useLanguage } from "@/components/providers/language-provider";
import { Section, SectionHeading } from "@/components/ui/section";
import { projects } from "@/lib/content";

export function Projects() {
  const { t, locale } = useLanguage();
  const [active, setActive] = useState<string>("all");

  const categories = useMemo(() => {
    const unique = new Map<string, string>();
    for (const project of projects) {
      unique.set(project.category.en, project.category[locale]);
    }
    return Array.from(unique, ([key, label]) => ({ key, label }));
  }, [locale]);

  const filtered = projects.filter(
    (project) => active === "all" || project.category.en === active,
  );

  return (
    <Section id="projects" className="bg-background-elevated">
      <SectionHeading
        eyebrow={t.projects.eyebrow}
        title={t.projects.title}
        subtitle={t.projects.subtitle}
      />

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        <FilterButton
          active={active === "all"}
          onClick={() => setActive("all")}
          label={t.projects.filterAll}
        />
        {categories.map((category) => (
          <FilterButton
            key={category.key}
            active={active === category.key}
            onClick={() => setActive(category.key)}
            label={category.label}
          />
        ))}
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.article
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="surface group flex flex-col overflow-hidden rounded-2xl"
            >
              <div
                className="relative flex h-40 items-center justify-center overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${project.accent}22, ${project.accent}05)`,
                }}
              >
                <span
                  className="text-4xl font-black opacity-30 transition-transform duration-500 group-hover:scale-110"
                  style={{ color: project.accent }}
                >
                  {project.title
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </span>
                <span
                  className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                  style={{
                    background: `${project.accent}22`,
                    color: project.accent,
                  }}
                >
                  {project.category[locale]}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {project.description[locale]}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center gap-4 border-t border-border pt-4 text-sm font-medium">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-foreground transition-colors hover:text-accent"
                    >
                      {t.projects.viewLive}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : null}
                  {project.repoUrl ? (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-muted transition-colors hover:text-accent"
                    >
                      <GithubIcon className="h-4 w-4" />
                      {t.projects.viewCode}
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}

function FilterButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "bg-accent text-white"
          : "surface text-muted hover:border-accent hover:text-accent"
      }`}
    >
      {label}
    </button>
  );
}
