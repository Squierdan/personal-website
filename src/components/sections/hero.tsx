"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { HashPortrait } from "@/components/ui/hash-portrait";
import { useTypewriter } from "@/hooks/use-typewriter";
import { useMounted } from "@/hooks/use-mounted";
import { useClock } from "@/hooks/use-clock";
import { bootItem, bootStep } from "@/lib/motion";
import { site } from "@/lib/site";

/**
 * ============================================================================
 *  HERO
 * ============================================================================
 *  Es el único sitio de la página con una secuencia de retardos explícita: un
 *  momento coreografiado —el arranque de un sistema— en vez de veinte efectos
 *  dispersos. El orden no es estético, es de lectura: estado → nombre → rol →
 *  qué hace → qué puedes hacer tú → cifras.
 *
 *  La placa de identidad entra en el paso 2 y no al final, a propósito: su
 *  avalancha dura ~0,6 s y tiene que verse ocurriendo. Se fija justo cuando el
 *  rol empieza a teclearse, así que el relevo se lee como una consecuencia —
 *  identidad verificada, entonces el rol.
 * ============================================================================
 */
export function Hero() {
  const { t, locale } = useLanguage();
  const mounted = useMounted();
  const clock = useClock(site.timezone);
  const role = useTypewriter(site.role, 55, 700);

  /** Cadena de la que se deriva la huella. Cambia si cambia la identidad. */
  const identity = `${site.name}:${site.role}:${site.handle}:${site.location}`;

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-36 lg:px-12"
    >
      {/* Capas de fondo: retícula técnica + halo del acento */}
      <div aria-hidden className="grid-lines absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="accent-glow absolute left-1/2 top-0 -z-10 h-[520px] w-[820px] -translate-x-1/2"
      />

      <div className="mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        {/* ------------------------------------------------------ Columna 1 */}
        <div>
          <motion.div
            data-reveal
            initial="hidden"
            animate="visible"
            variants={bootItem}
            transition={bootStep(0)}
            className="inline-flex items-center gap-2 border border-border bg-bg-elevated/60 px-3 py-1.5 font-mono text-[11px] text-fg-muted"
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{
                background: site.available ? "var(--accent)" : "var(--amber)",
              }}
            />
            {site.available ? t.hero.status.available : t.hero.status.busy}
          </motion.div>

          <motion.p
            data-reveal
            initial="hidden"
            animate="visible"
            variants={bootItem}
            transition={bootStep(1)}
            className="mt-8 font-mono text-sm text-fg-subtle"
          >
            <span className="text-accent">❯</span> {t.hero.cmdWhoami}
          </motion.p>

          <motion.h1
            data-reveal
            initial="hidden"
            animate="visible"
            variants={bootItem}
            transition={bootStep(2)}
            className="mt-2 text-balance font-mono font-bold leading-[0.92] tracking-[-0.045em] text-[length:var(--step-display)]"
          >
            {site.name}
          </motion.h1>

          <motion.p
            data-reveal
            initial="hidden"
            animate="visible"
            variants={bootItem}
            transition={bootStep(3)}
            className="mt-6 font-mono text-sm text-fg-subtle"
          >
            <span className="text-accent">❯</span> {t.hero.cmdRole}
          </motion.p>

          <p className="mt-2 font-mono text-lg text-accent sm:text-2xl">
            {mounted ? role.output : site.role}
            {mounted && !role.done ? <span className="caret" /> : null}
          </p>

          <motion.p
            data-reveal
            initial="hidden"
            animate="visible"
            variants={bootItem}
            transition={bootStep(5)}
            className="mt-8 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg"
          >
            {t.hero.intro}
          </motion.p>

          <motion.div
            data-reveal
            initial="hidden"
            animate="visible"
            variants={bootItem}
            transition={bootStep(6)}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#experience"
              className="group inline-flex h-11 items-center gap-2 bg-accent px-5 font-mono text-sm font-medium text-[var(--accent-fg)]"
            >
              {t.hero.ctaPrimary}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-[var(--dur-base)] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex h-11 items-center gap-2 border border-border-strong px-5 font-mono text-sm text-fg transition-colors hover:border-accent hover:text-accent"
            >
              {t.hero.ctaSecondary}
            </a>
            {/* Descarga del CV: un reclutador espera encontrarla en el primer
                pantallazo. Se sirve el PDF del idioma activo. */}
            <a
              href={site.cv[locale]}
              download
              className="inline-flex h-11 items-center gap-2 px-2 font-mono text-sm text-fg-muted transition-colors hover:text-accent"
            >
              <Download className="h-4 w-4" />
              <span className="link-underline">{t.hero.ctaCv}</span>
            </a>
          </motion.div>

          {/* Métricas. La publicación indexada va en ámbar: es la credencial
              que distingue este perfil del de cualquier otro junior, y el
              ámbar es el color de énfasis del sistema. */}
          <motion.dl
            data-reveal
            initial="hidden"
            animate="visible"
            variants={bootItem}
            transition={bootStep(7)}
            className="mt-14 grid max-w-lg grid-cols-3 divide-x divide-border border-y border-border"
          >
            {t.hero.stats.map((stat, index) => (
              <div key={stat.label} className="px-4 py-4 first:pl-0">
                <dt className="sr-only">{stat.label}</dt>
                <dd
                  className={`font-mono text-2xl font-bold tabular-nums sm:text-3xl ${
                    index === 1 ? "text-[var(--amber)]" : "text-fg"
                  }`}
                >
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
          data-reveal
          initial="hidden"
          animate="visible"
          variants={bootItem}
          transition={bootStep(2)}
        >
          <HashPortrait
            input={identity}
            label={t.hero.hashLabel}
            verifyLabel={t.hero.hashVerify}
            verifiedLabel={t.hero.hashVerified}
            computingLabel={t.hero.hashComputing}
            legend={t.hero.hashLegend}
          />

          {/* Franja de instrumento: los datos que antes vivían en la barra de
              título de la ventana de terminal. */}
          <div className="mx-auto mt-3 flex w-full max-w-[420px] flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-wider text-fg-subtle lg:mx-0 lg:max-w-none">
            <span>{site.location}</span>
            <span aria-hidden>·</span>
            <span>{site.timezone.split("/")[1]}</span>
            <span aria-hidden>·</span>
            <span className="tabular-nums">{clock || "--:--:--"}</span>
            <span aria-hidden>·</span>
            <span>{locale === "es" ? "es-ec" : "en-us"}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
