"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { openCommandPalette } from "@/components/command-palette";
import { useActiveSection } from "@/hooks/use-active-section";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { site } from "@/lib/site";

const SECTION_IDS = ["about", "skills", "experience", "services", "contact"];

export function Navbar() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  /**
   * ⚠️ SIN ESTO, EL MENÚ MÓVIL NO SE CIERRA NUNCA. NO LO QUITES.
   * --------------------------------------------------------------------------
   * Mismo fallo que en la paleta de comandos, y aquí era todavía peor. Con
   * «reducir movimiento» activo, `AnimatePresence` no llega a desmontar el
   * menú porque la animación de salida nunca termina — y como este panel lleva
   * `data-reveal`, la red de seguridad de `globals.css`
   * (`[data-reveal] { opacity: 1 !important }`) lo forzaba a quedarse
   * COMPLETAMENTE VISIBLE, no transparente.
   *
   * Medido en el build de producción: tras pulsar la X, el menú seguía en el
   * DOM con `opacity: 1`, tapando la página entera a pantalla completa. En un
   * móvil eso deja el sitio inservible hasta recargar.
   *
   * Es el punto ciego de la red del §4.11: resuelve que el contenido no se
   * quede invisible al ENTRAR, y por eso mismo agrava que no se quede visible
   * al SALIR. Sin `exit`, `AnimatePresence` desmonta en el acto y las dos
   * cosas quedan bien.
   */
  const reducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  const links = [
    { id: "about", label: t.nav.about },
    { id: "skills", label: t.nav.skills },
    { id: "experience", label: t.nav.work },
    { id: "services", label: t.nav.services },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Indicador de progreso de lectura */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="scroll-progress h-[2px] bg-accent"
      />

      {/* Fondo casi opaco en vez de `backdrop-blur`: la barra es visible
          durante todo el scroll, y desenfocar lo que pasa por detrás obliga al
          compositor a rehacer ese desenfoque en cada fotograma. */}
      <div className="border-b border-border bg-bg/95">
        <nav
          aria-label="Principal"
          className="mx-auto flex h-14 w-full max-w-6xl items-center gap-4 px-5 sm:px-8 lg:px-12"
        >
          {/* Marca: prompt de terminal en lugar de un logotipo genérico */}
          <a
            href="#top"
            className="group -my-2 flex shrink-0 items-center gap-2 py-2 font-mono text-sm"
          >
            {/* `group-hover:scale-110`: el cuadro ya invertía sus colores al
                pasar el cursor, pero un cambio de color puro no se siente
                como una respuesta, se siente como un estado. Añadir el
                crecimiento hace que se lea como un gesto en marcha y no como
                un interruptor. */}
            <span
              aria-hidden
              className="grid h-6 w-6 place-items-center border border-accent text-data font-bold text-accent transition-[transform,background-color,color] duration-[var(--dur-micro)] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:bg-accent group-hover:text-[var(--accent-fg)]"
            >
              {site.handle.charAt(0).toUpperCase()}
            </span>
            <span className="hidden text-fg-muted sm:inline">
              {site.handle}
              <span className="text-fg-subtle">@web</span>
              <span className="text-accent">:~$</span>
            </span>
          </a>

          {/* Enlaces de escritorio */}
          <ul className="ml-auto hidden items-center gap-1 md:flex">
            {links.map((link, index) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  {/* El subrayado activo lo dibuja `.nav-link::after` en CSS,
                      enganchado al `aria-current` que el enlace ya llevaba por
                      accesibilidad. Ver la nota en globals.css. */}
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? "true" : undefined}
                    /* `whitespace-nowrap`: en español las etiquetas son más
                       largas —«sobre-mí», «experiencia», «habilidades»— y al
                       cambiar de idioma «01 sobre-mí» partía en dos líneas.
                       Eso estiraba la altura del enlace, y con él la fila
                       entera de navegación, así que TODA la barra daba un salto
                       vertical al pulsar --lang. Con el texto en una sola línea
                       el flex sólo se reparte a lo ancho y no salta nada. */
                    className={`nav-link relative flex items-center gap-1.5 whitespace-nowrap px-3 py-2 font-mono text-xs transition-colors ${
                      isActive ? "text-accent" : "text-fg-muted hover:text-fg"
                    }`}
                  >
                    <span className="text-data text-fg-subtle">
                      0{index + 1}
                    </span>
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* `shrink-0`: sin él, las etiquetas largas del español comprimían este
              grupo hasta partir el texto de los conmutadores. */}
          <div className="ml-auto flex shrink-0 items-center gap-2 md:ml-2">
            {/* Disparador de la paleta de comandos */}
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label={t.ui.openPalette}
              className="press hidden h-8 items-center gap-2 whitespace-nowrap border border-border-strong px-2.5 font-mono text-data text-fg-muted hover:border-accent hover:text-accent sm:flex"
            >
              <Search className="h-3.5 w-3.5" />
              <kbd className="text-fg-subtle">⌘K</kbd>
            </button>

            <div className="hidden items-center gap-2 sm:flex">
              <LanguageToggle />
              <ThemeToggle />
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t.ui.menu}
              className="press inline-flex h-11 w-11 items-center justify-center border border-border-strong text-fg-muted hover:border-accent hover:text-accent md:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </div>

      {/* Menú móvil a pantalla completa */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-50 bg-bg md:hidden"
            // `data-reveal` engancha la red de seguridad de movimiento
            // reducido de globals.css: sin ella el menú se quedaría en
            // `opacity: 0` y no se podría navegar en móvil.
            data-reveal
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-14 items-center justify-between border-b border-border px-5">
              <span className="font-mono text-sm text-fg-muted">
                {site.handle}
                <span className="text-accent">:~$</span> menu
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label={t.ui.close}
                className="press inline-flex h-11 w-11 items-center justify-center border border-border-strong text-fg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ul className="px-5 py-4">
              {links.map((link, index) => (
                <li key={link.id} className="border-b border-border">
                  <a
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-3 py-5 font-mono text-2xl text-fg"
                  >
                    <span className="text-xs text-accent">0{index + 1}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 px-5">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
