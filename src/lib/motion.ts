import type { Variants } from "framer-motion";

/**
 * ============================================================================
 *  VOCABULARIO DE MOVIMIENTO
 * ============================================================================
 *  Un único sitio donde viven duración, curva y variantes. Antes cada
 *  componente repetía la misma variante (`opacity 0→1, y 16→0, 0.5s`) veinte
 *  veces: el movimiento era una capa de pintura, no información.
 *
 *  Reglas que sigue este módulo:
 *   · Cada animación expresa una causa-efecto, no decora.
 *   · Sólo `transform` y `opacity` — nunca width/height/top/left, que obligan
 *     al navegador a recalcular el layout en cada fotograma.
 *   · La salida es más rápida que la entrada (~65 %): así la interfaz se siente
 *     receptiva en vez de lenta.
 *   · Todo degrada con `prefers-reduced-motion`, y la garantía es declarativa:
 *     vive en `globals.css`, no en JavaScript. Ver §4.7 y §4.9 de AI_CONTEXT.md.
 * ============================================================================
 */

/** Curva de entrada. Desacelera al llegar: el objeto "aterriza". */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Curva de salida. Acelera al irse: el objeto "se va". */
export const EASE_IN = [0.55, 0, 1, 0.45] as const;

/**
 * Escala de duración, en segundos. Tres valores y ni uno más: en cuanto hay
 * siete duraciones distintas la página pierde el pulso común.
 */
export const DUR = {
  /** Respuesta a un gesto: hover, foco, pulsación. */
  micro: 0.16,
  /** Transición estándar: aparición, cambio de estado. */
  base: 0.28,
  /** Momento orquestado: el arranque del hero, un panel que se abre. */
  slow: 0.44,
} as const;

/** Desfase entre hijos de una lista. Por debajo de 30 ms no se percibe. */
export const STAGGER = 0.045;

/**
 * Física de resorte, reservada a momentos INTERACTIVOS — nunca a apariciones.
 *
 * El resto del vocabulario es `duration` + `EASE_OUT`: una curva fija que
 * siempre tarda lo mismo, adecuada para algo estructural como un párrafo
 * apareciendo al hacer scroll, donde la precisión importa más que la gracia.
 * Un resorte se comporta distinto: la duración depende de la distancia y
 * puede pasarse de largo antes de asentarse, que es exactamente lo que hace
 * sentir "vivo" un gesto de respuesta directa —abrir la paleta de comandos,
 * deslizar el cursor de selección— pero leería como impreciso si gobernara
 * un párrafo entero revelándose.
 *
 * Dos perfiles y ni uno más, por la misma razón que hay tres duraciones y no
 * siete: `snappy` para lo que el usuario dispara con una tecla o un clic y
 * espera ver resuelto ya (la paleta, su cursor de selección); `soft` para
 * telón de fondo que no debe competir por atención.
 */
export const SPRING = {
  snappy: { type: "spring", stiffness: 420, damping: 32, mass: 0.9 } as const,
  soft: { type: "spring", stiffness: 260, damping: 28, mass: 1 } as const,
};

/* -------------------------------------------------------------------------- */
/*  VARIANTES                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Aparición estándar. El desplazamiento es corto (10 px) a propósito: lo que
 * comunica la entrada es el momento en que ocurre, no la distancia recorrida.
 */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE_OUT },
  },
};

/**
 * `riseIn` con retardo.
 *
 * Tiene que construir la variante completa y no basta con pasar
 * `transition={{ delay }}` al componente: en Framer Motion la transición
 * declarada **dentro de una variante** tiene precedencia sobre la prop
 * `transition` del componente, así que un `delay` suelto se ignora en silencio.
 */
export function riseInDelayed(delay: number): Variants {
  return {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DUR.base, ease: EASE_OUT, delay },
    },
  };
}

/**
 * Contenedor que reparte la entrada de sus hijos en el tiempo. Se usa con
 * `riseIn` en cada hijo: la lista se construye de arriba abajo en vez de
 * materializarse entera de golpe.
 */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER, delayChildren: 0.04 },
  },
};

/**
 * Regla de 1 px que se dibuja desde su origen. Es el gesto de un plano
 * técnico construyéndose, y es la animación más barata que existe: `scaleX`
 * se resuelve en el compositor sin tocar el layout.
 */
export const ruleDraw: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: DUR.slow, ease: EASE_OUT },
  },
};

/**
 * Secuencia de arranque del hero. Un solo momento coreografiado vale más que
 * veinte efectos dispersos, así que este es el único sitio de la página con
 * una cadena de retardos explícita.
 *
 * `step` devuelve la transición del paso n de la secuencia.
 */
export function bootStep(step: number) {
  return {
    duration: DUR.slow,
    delay: 0.06 + step * 0.075,
    ease: EASE_OUT,
  } as const;
}

/** Variante compartida por todos los pasos del arranque. */
export const bootItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};
