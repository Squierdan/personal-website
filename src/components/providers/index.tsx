"use client";

import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./language-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    /*
     * `enableSystem={false}` es deliberado: el sitio abre SIEMPRE en oscuro,
     * aunque el sistema operativo del visitante esté en claro. El conmutador
     * --theme sigue disponible y la elección se guarda en el navegador.
     */
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
