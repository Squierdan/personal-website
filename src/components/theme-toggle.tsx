"use client";

import { useTheme } from "next-themes";
import { useLanguage } from "@/components/providers/language-provider";
import { useMounted } from "@/hooks/use-mounted";

/**
 * Alterna claro/oscuro. Se presenta como una bandera de línea de comandos
 * (`--theme=dark`) en lugar del típico icono de sol/luna.
 */
export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { t } = useLanguage();
  const mounted = useMounted();

  const current = (theme === "system" ? resolvedTheme : theme) ?? "dark";
  const isDark = current === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? t.ui.themeLight : t.ui.themeDark}
      title={isDark ? t.ui.themeLight : t.ui.themeDark}
      className="group inline-flex h-8 items-center gap-1.5 border border-border px-2.5 font-mono text-[11px] text-fg-muted transition-colors hover:border-accent hover:text-accent"
    >
      <span className="text-fg-subtle group-hover:text-accent">--theme=</span>
      <span className="min-w-[34px] text-left text-fg">
        {mounted ? (isDark ? "dark" : "light") : " "}
      </span>
      {compact ? null : (
        <span
          aria-hidden
          className="h-2 w-2 border border-current"
          style={{ background: isDark ? "transparent" : "currentColor" }}
        />
      )}
    </button>
  );
}
