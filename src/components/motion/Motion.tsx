'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

type Gsap = typeof import('gsap').gsap
type ST = typeof import('gsap/ScrollTrigger').ScrollTrigger

// Animação do site. Carrega GSAP + ScrollTrigger só depois de a página estar pronta e só
// sem "reduzir movimento". Tudo o que anima já está completo e legível sem isto.
// 1. A planta do início desenha-se uma vez (menos de 3 s).
// 2. Nas páginas de produto (ecrã largo), a demo fica fixa e o scroll avança os passos.
// 3. No caso de estudo, o diagrama acende as partes à medida que o texto passa.

let heroPlayed = false
const HEADER_OFFSET = 100

function hero(gsap: Gsap) {
  const svg = document.querySelector<SVGSVGElement>('[data-planta] svg')
  if (!svg || heroPlayed) return
  heroPlayed = true

  const draw = svg.querySelectorAll<SVGGeometryElement>('.planta-traco path, .planta-traco rect, .planta-fluxo path:not([stroke-dasharray])')
  draw.forEach((el) => {
    const len = el.getTotalLength()
    gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })
  })
  const flows = svg.querySelectorAll('.planta-fluxo path:not([stroke-dasharray])')
  const traco = [...draw].filter((el) => !el.closest('.planta-fluxo'))

  gsap
    .timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        gsap.set(draw, { clearProps: 'strokeDasharray,strokeDashoffset' })
      },
    })
    .to(traco, { strokeDashoffset: 0, duration: 0.8, stagger: 0.06 })
    .from(svg.querySelectorAll('text:not(.planta-registo text)'), { opacity: 0, duration: 0.4, stagger: 0.05 }, '-=0.5')
    .from(svg.querySelectorAll('.planta-cota'), { opacity: 0, duration: 0.4 }, '<')
    .from(svg.querySelectorAll('.planta-rosto circle'), { opacity: 0, scale: 0, transformOrigin: '50% 50%', duration: 0.25, stagger: 0.015 }, '-=0.2')
    .from(svg.querySelector('.planta-sinal'), { scale: 0, transformOrigin: '50% 50%', duration: 0.3, ease: 'back.out(3)' })
    .to(flows, { strokeDashoffset: 0, duration: 0.5, stagger: 0.25, ease: 'power1.inOut' })
    .from(svg.querySelectorAll('.planta-fluxo path[stroke-dasharray]'), { opacity: 0, duration: 0.3 }, '<')
    .from(svg.querySelector('.planta-registo'), { opacity: 0, y: 10, duration: 0.4 })
}

function demos(ScrollTrigger: ST) {
  document.querySelectorAll<HTMLElement>('[data-demo]').forEach((el) => {
    const buttons = el.querySelectorAll('ol button')
    const n = buttons.length
    const send = (i: number) => el.dispatchEvent(new CustomEvent('demo:step', { detail: i }))

    if (el.offsetHeight < window.innerHeight - HEADER_OFFSET - 40) {
      // Cabe no ecrã: fica fixo enquanto o scroll percorre os passos.
      ScrollTrigger.create({
        trigger: el,
        start: `top top+=${HEADER_OFFSET}`,
        end: `+=${Math.round(n * window.innerHeight * 0.4)}`,
        pin: true,
        onUpdate: (self) => send(Math.min(n - 1, Math.floor(self.progress * n))),
      })
    } else {
      // Ecrã baixo: cada passo ativa-se quando passa pelo meio do ecrã.
      buttons.forEach((b, i) => {
        ScrollTrigger.create({ trigger: b, start: 'top 55%', onEnter: () => send(i), onEnterBack: () => send(i) })
      })
    }
  })
}

function architecture(ScrollTrigger: ST, wide: boolean) {
  const figure = document.querySelector('[data-arch]')
  if (!figure) return
  const nodes = [...figure.querySelectorAll<SVGGElement>('[data-node]')]
  const steps = [...document.querySelectorAll<HTMLElement>('[data-arch-step]')]
  const light = (key: string, on: boolean) => {
    figure.querySelector(`[data-node="${key}"]`)?.classList.toggle('is-on', on)
    document.querySelector(`[data-arch-step="${key}"]`)?.classList.toggle('is-on', on)
  }

  if (wide) {
    steps.forEach((li) => {
      const key = li.dataset.archStep ?? ''
      ScrollTrigger.create({ trigger: li, start: 'top 60%', onEnter: () => light(key, true), onLeaveBack: () => light(key, false) })
    })
  } else {
    // No telemóvel o diagrama vem depois do texto: acende por partes enquanto atravessa o ecrã.
    ScrollTrigger.create({
      trigger: figure,
      start: 'top 85%',
      end: 'bottom 45%',
      onUpdate: (self) => {
        const count = Math.round(self.progress * nodes.length)
        nodes.forEach((g, i) => light(g.dataset.node ?? '', i < count))
      },
    })
  }
}

export default function Motion() {
  const pathname = usePathname()

  useEffect(() => {
    const html = document.documentElement
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      html.classList.remove('motion-pending')
      return
    }

    let revert: (() => void) | undefined
    let cancelled = false

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return
        gsap.registerPlugin(ScrollTrigger)
        const mm = gsap.matchMedia()
        mm.add(
          { wide: '(min-width: 1024px)', narrow: '(max-width: 1023.98px)', motion: '(prefers-reduced-motion: no-preference)' },
          (ctx) => {
            const { wide, motion } = ctx.conditions as { wide: boolean; motion: boolean }
            if (!motion) return
            hero(gsap)
            html.classList.remove('motion-pending')
            if (wide) demos(ScrollTrigger)
            architecture(ScrollTrigger, wide)
          },
        )
        revert = () => mm.revert()
      })
      .catch(() => html.classList.remove('motion-pending'))

    return () => {
      cancelled = true
      revert?.()
    }
  }, [pathname])

  return null
}
