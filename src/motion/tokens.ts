// Motion tokens (docs em DESIGN_NOTES.md). Os mesmos valores existem como CSS custom properties
// em globals.css (--dur-*, --ease-*). Durações em segundos, como o GSAP as usa.

export const DUR = {
  /** hover, focus, toggle */
  micro: 0.15,
  /** separadores, acordeão, troca de modo */
  ui: 0.28,
  /** entradas ao scroll (poucas) */
  reveal: 0.6,
  /** passos do check-in e do caos ao controlo */
  narrativa: 1.2,
} as const

/** Saídas são mais rápidas do que as entradas: 70 % da entrada correspondente. */
export const exit = (d: number) => Math.round(d * 0.7 * 1000) / 1000

/** Atraso entre elementos de apoio (40–80 ms). */
export const STAGGER = 0.06

// cubic-bezier(0.16, 1, 0.3, 1) é o expo.out e cubic-bezier(0.65, 0, 0.35, 1) é o power2.inOut
// (cúbica simétrica), por isso não é preciso o CustomEase.
export const EASE = {
  entrada: 'expo.out',
  estado: 'power2.inOut',
  /** O único salto do site: a confirmação do reconhecimento facial. */
  confirma: 'back.out(1.6)',
} as const

/** Tempo parado no estado final antes de um loop recomeçar (ms). */
export const LOOP_PAUSE = 2400

/** Separadores com avanço automático (ms). */
export const TAB_ADVANCE = 6000
