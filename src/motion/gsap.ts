// Carrega o GSAP e os plugins só quando são precisos (import dinâmico), para não pesar no
// primeiro carregamento. Uma única promessa partilhada por todos os componentes.

type Core = typeof import('gsap').gsap
type ST = typeof import('gsap/ScrollTrigger').ScrollTrigger
type FlipT = typeof import('gsap/Flip').Flip

export type Kit = { gsap: Core; ScrollTrigger: ST; Flip: FlipT }

let kit: Promise<Kit> | null = null

export function loadGsap(): Promise<Kit> {
  kit ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger'), import('gsap/Flip')]).then(
    ([{ gsap }, { ScrollTrigger }, { Flip }]) => {
      gsap.registerPlugin(ScrollTrigger, Flip)
      return { gsap, ScrollTrigger, Flip }
    },
  )
  return kit
}

export function reducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Elemento ainda abaixo do ecrã: só esses ficam escondidos à espera de entrar. */
export function belowFold(el: Element, ratio = 0.9) {
  return el.getBoundingClientRect().top > window.innerHeight * ratio
}
