"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/providers/language-provider";
import { site } from "@/lib/site";

/** Evento global para abrir la paleta desde cualquier botón del sitio. */
export const OPEN_PALETTE_EVENT = "open-command-palette";

export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent(OPEN_PALETTE_EVENT));
}

type Command = {
  id: string;
  label: string;
  group: string;
  hint?: string;
  run: () => void;
};

/**
 * Paleta de comandos (⌘K / Ctrl+K).
 * Permite navegar, alternar tema e idioma y abrir enlaces sin tocar el ratón:
 * una interacción que un ingeniero espera encontrar y que casi ningún sitio
 * personal implementa.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const { t, toggleLocale } = useLanguage();
  const { setTheme, resolvedTheme } = useTheme();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setCursor(0);
  }, []);

  const go = useCallback(
    (hash: string) => {
      close();
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    },
    [close],
  );

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = [
      { id: "top", label: t.footer.backToTop, hash: "top" },
      { id: "about", label: t.nav.about, hash: "about" },
      { id: "services", label: t.nav.services, hash: "services" },
      { id: "projects", label: t.nav.projects, hash: "projects" },
      { id: "contact", label: t.nav.contact, hash: "contact" },
    ].map(({ id, label, hash }) => ({
      id,
      label,
      group: t.ui.paletteNav,
      hint: `#${hash}`,
      run: () => go(hash),
    }));

    const actions: Command[] = [
      {
        id: "theme",
        label: t.ui.actionToggleTheme,
        group: t.ui.paletteActions,
        hint: "T",
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      {
        id: "lang",
        label: t.ui.actionToggleLang,
        group: t.ui.paletteActions,
        hint: "L",
        run: () => toggleLocale(),
      },
      {
        id: "copy-email",
        label: t.ui.actionCopyEmail,
        group: t.ui.paletteActions,
        hint: site.email,
        run: () => {
          void navigator.clipboard.writeText(site.email);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1800);
        },
      },
    ];

    const links: Command[] = Object.entries(site.socials)
      .filter(([, url]) => Boolean(url))
      .map(([key, url]) => ({
        id: `link-${key}`,
        label: key === "x" ? "X / Twitter" : key,
        group: t.ui.paletteLinks,
        hint: "↗",
        run: () => window.open(url, "_blank", "noopener,noreferrer"),
      }));

    return [...nav, ...actions, ...links];
  }, [t, go, setTheme, resolvedTheme, toggleLocale]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((command) =>
      `${command.label} ${command.group} ${command.hint ?? ""}`
        .toLowerCase()
        .includes(q),
    );
  }, [commands, query]);

  /* Atajos globales: ⌘K abre; T y L actúan fuera de campos de texto. */
  useEffect(() => {
    const isTypingTarget = (target: EventTarget | null) => {
      const el = target as HTMLElement | null;
      if (!el) return false;
      return (
        el.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName)
      );
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
        return;
      }
      if (event.key === "Escape") {
        close();
        return;
      }
      if (open || isTypingTarget(event.target) || event.metaKey || event.ctrlKey)
        return;
      if (event.key.toLowerCase() === "t") {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }
      if (event.key.toLowerCase() === "l") {
        toggleLocale();
      }
    };

    const onOpen = () => setOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, [open, close, setTheme, resolvedTheme, toggleLocale]);

  /* Bloquea el scroll del fondo y enfoca el campo al abrir. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = previous;
      cancelAnimationFrame(raf);
    };
  }, [open]);

  const onListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setCursor((c) => (c + 1) % Math.max(results.length, 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setCursor((c) => (c - 1 + results.length) % Math.max(results.length, 1));
    }
    if (event.key === "Enter") {
      event.preventDefault();
      results[cursor]?.run();
      if (results[cursor]?.group === t.ui.paletteNav) close();
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="palette"
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
        >
          <button
            type="button"
            aria-label={t.ui.close}
            onClick={close}
            className="absolute inset-0 cursor-default bg-bg-sunken/80 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.ui.openPalette}
            className="term relative w-full max-w-xl overflow-hidden"
            initial={{ y: -12, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onKeyDown={onListKeyDown}
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span aria-hidden className="font-mono text-sm text-accent">
                ❯
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setCursor(0);
                }}
                placeholder={t.ui.palettePlaceholder}
                className="w-full bg-transparent font-mono text-sm text-fg outline-none placeholder:text-fg-subtle"
              />
              <kbd className="hidden border border-border px-1.5 py-0.5 font-mono text-[10px] text-fg-subtle sm:block">
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto py-2">
              {results.length === 0 ? (
                <p className="px-4 py-6 text-center font-mono text-xs text-fg-subtle">
                  {t.ui.paletteEmpty}
                </p>
              ) : (
                results.map((command, index) => {
                  const showGroup = command.group !== lastGroup;
                  lastGroup = command.group;
                  return (
                    <div key={command.id}>
                      {showGroup ? (
                        <p className="px-4 pb-1 pt-3 font-mono text-[10px] uppercase tracking-widest text-fg-subtle">
                          {command.group}
                        </p>
                      ) : null}
                      <button
                        type="button"
                        onMouseEnter={() => setCursor(index)}
                        onClick={() => {
                          command.run();
                          if (command.group === t.ui.paletteNav) close();
                        }}
                        className={`flex w-full items-center justify-between gap-3 px-4 py-2 text-left font-mono text-sm transition-colors ${
                          index === cursor
                            ? "bg-accent-soft text-accent"
                            : "text-fg-muted"
                        }`}
                      >
                        <span className="truncate">{command.label}</span>
                        <span className="shrink-0 text-[10px] text-fg-subtle">
                          {command.id === "copy-email" && copied
                            ? t.contact.copied
                            : command.hint}
                        </span>
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            <div className="flex items-center gap-4 border-t border-border px-4 py-2 font-mono text-[10px] text-fg-subtle">
              <span>↑↓ {t.ui.paletteNav.toLowerCase()}</span>
              <span>↵ enter</span>
              <span className="ml-auto">⌘K</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
