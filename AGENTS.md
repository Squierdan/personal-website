# AGENTS.md

Lee **[AI_CONTEXT.md](./AI_CONTEXT.md)** antes de modificar nada: contiene la
arquitectura, las convenciones obligatorias (bilingüismo, tokens de color,
cliente/servidor, hidratación) y las trampas conocidas de ESLint.

Comprobaciones obligatorias antes de dar por terminado un cambio:

```bash
npm run lint        # sin errores
npx tsc --noEmit    # sin errores
npm run build       # debe compilar
```

Reglas rápidas:

- Ninguna cadena visible se escribe en un componente: va en `src/i18n/dictionary.ts`, en `es` y `en`.
- Nunca uses colores literales de Tailwind; usa los tokens (`text-fg-muted`, `bg-accent`, `border-border`…).
- Cualquier componente con hooks o Framer Motion necesita `"use client";`.
- No llames a `setState` de forma síncrona dentro de un `useEffect` (la regla `react-hooks/set-state-in-effect` rompe el build).
