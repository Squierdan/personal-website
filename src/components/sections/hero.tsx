"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useTypewriter } from "@/hooks/use-typewriter";
import { useMounted } from "@/hooks/use-mounted";
import { useClock } from "@/hooks/use-clock";
import { site } from "@/lib/site";

export function Hero() {
  const { t, locale } = useLanguage();
  const mounted = useMounted();
  const clock = useClock(site.timezone);
  const role = useTypewriter(site.role, 55, 700);

  const fade = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-36 lg:px-12"
    >
      {/* Capas de fondo: retícula técnica + halo del acento + grano */}
      <div aria-hidden className="grid-lines absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="accent-glow absolute left-1/2 top-0 -z-10 h-[520px] w-[820px] -translate-x-1/2"
      />
      <div
        aria-hidden
        className="noise pointer-events-none absolute inset-0 -z-10"
      />

      <div className="mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        {/* ------------------------------------------------------ Columna 1 */}
        <div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fade}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 border border-border bg-bg-elevated/60 px-3 py-1.5 font-mono text-[11px] text-fg-muted"
          >
            <span className="relative flex h-2 w-2">
              {site.available ? (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              ) : null}
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{
                  background: site.available ? "var(--accent)" : "var(--amber)",
                }}
              />
            </span>
            {site.available ? t.hero.status.available : t.hero.status.busy}
          </motion.div>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fade}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-8 font-mono text-sm text-fg-subtle"
          >
            <span className="text-accent">❯</span> {t.hero.cmdWhoami}
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fade}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="mt-2 text-balance font-mono text-[2.6rem] font-bold leading-[0.95] tracking-tighter sm:text-6xl lg:text-7xl"
          >
            {site.name}
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fade}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mt-6 font-mono text-sm text-fg-subtle"
          >
            <span className="text-accent">❯</span> {t.hero.cmdRole}
          </motion.p>

          <p className="mt-2 font-mono text-lg text-accent sm:text-2xl">
            {mounted ? role.output : site.role}
            {mounted && !role.done ? <span className="caret" /> : null}
          </p>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fade}
            transition={{ duration: 0.5, delay: 0.34 }}
            className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-fg-muted sm:text-lg"
          >
            {t.hero.intro}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fade}
            transition={{ duration: 0.5, delay: 0.42 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex h-11 items-center gap-2 bg-accent px-5 font-mono text-sm font-medium text-[var(--accent-fg)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              {t.hero.ctaPrimary}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex h-11 items-center gap-2 border border-border-strong px-5 font-mono text-sm text-fg transition-colors hover:border-accent hover:text-accent"
            >
              {t.hero.ctaSecondary}
            </a>
          </motion.div>

          {/* Métricas */}
          <motion.dl
            initial="hidden"
            animate="visible"
            variants={fade}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-14 grid max-w-lg grid-cols-3 divide-x divide-border border-y border-border"
          >
            {t.hero.stats.map((stat) => (
              <div key={stat.label} className="px-4 py-4 first:pl-0">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-mono text-2xl font-bold text-fg sm:text-3xl">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-xs leading-snug text-fg-subtle">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ------------------------------------------------------ Columna 2 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="corner-marks"
        >
          <div className="term scanlines relative overflow-hidden">
            {/* Barra de título de la ventana */}
            <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </span>
              <span className="ml-2 truncate font-mono text-[11px] text-fg-subtle">
                ~/{site.handle}/profile.ts
              </span>
              <span className="ml-auto font-mono text-[11px] tabular-nums text-fg-subtle">
                {clock || "--:--:--"}
              </span>
            </div>

            {/* Bloque de código con numeración de líneas */}
            <pre className="overflow-x-auto px-3 py-4 font-mono text-[12.5px] leading-6 sm:text-[13px]">
              <code>
                {[
                  [
                    <span key="a" className="text-[var(--link)]">
                      export const
                    </span>,
                    " engineer = {",
                  ],
                  ["  name: ", <Str key="b">{site.name}</Str>, ","],
                  ["  role: ", <Str key="c">{site.role}</Str>, ","],
                  ["  based: ", <Str key="d">{site.location}</Str>, ","],
                  [
                    "  focus: [",
                    <Str key="e">web</Str>,
                    ", ",
                    <Str key="f">apis</Str>,
                    ", ",
                    <Str key="g">infra</Str>,
                    "],",
                  ],
                  [
                    "  languages: [",
                    <Str key="h">es</Str>,
                    ", ",
                    <Str key="i">en</Str>,
                    "],",
                  ],
                  [
                    "  available: ",
                    <span key="j" className="text-[var(--amber)]">
                      {String(site.available)}
                    </span>,
                    ",",
                  ],
                  ["};"],
                ].map((line, index) => (
                  <span key={index} className="grid grid-cols-[2ch_1fr] gap-3">
                    <span className="select-none text-right text-fg-subtle/60">
                      {index + 1}
                    </span>
                    <span className="text-fg-muted">{line}</span>
                  </span>
                ))}
                <span className="grid grid-cols-[2ch_1fr] gap-3">
                  <span className="select-none text-right text-fg-subtle/60">
                    9
                  </span>
                  <span>
                    <span className="text-accent">❯</span>{" "}
                    <span className="caret" />
                  </span>
                </span>
              </code>
            </pre>

            {/* Pie de la ventana */}
            <div className="flex items-center justify-between border-t border-border px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
              <span>utf-8 · typescript</span>
              <span>{locale === "es" ? "es-EC" : "en-US"}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Indicación de scroll */}
      <motion.a
        href="#about"
        aria-hidden
        tabIndex={-1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="mx-auto mt-16 hidden w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-fg-subtle lg:flex"
      >
        <ArrowDown className="h-3 w-3 animate-bounce" />
        {t.hero.scrollHint}
      </motion.a>
    </section>
  );
}

/** Literal de cadena coloreado dentro del bloque de código. */
function Str({ children }: { children: React.ReactNode }) {
  return <span className="text-accent">&quot;{children}&quot;</span>;
}
