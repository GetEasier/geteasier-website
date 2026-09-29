'use client'

import { useEffect } from 'react'
import { belowFold, loadGsap, reducedMotion } from '@/motion/gsap'
import { DUR, EASE, STAGGER } from '@/motion/tokens'

// Efeitos ao descer no início, um diferente por secção (DESIGN_NOTES.md):
// clientes passam de cinzento a cor, a fotografia do software à medida abre como um portão,
// os painéis dos produtos sobem como uma persiana e o ecrã de cada um muda de estado, e as
// fotografias da equipa deslizam a velocidades diferentes. O hero, o caos ao controlo, os
// testemunhos e as perguntas têm o seu próprio componente. Nada disto corre com "reduzir movimento".
export default function HomeMotion() {
  useEffect(() => {
    if (reducedMotion()) return
    let revert: (() => void) | undefined
    let cancelled = false
    const cleanups: (() => void)[] = []

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return
      const mm = gsap.matchMedia()
      mm.add({ wide: '(min-width: 1024px)', narrow: '(max-width: 1023.98px)' }, (ctx) => {
        const { wide } = ctx.conditions as { wide: boolean }

        // Clientes: os logótipos ganham cor um a um, uma vez (o cinzento inicial vem do CSS .motion-ok).
        const logos = gsap.utils.toArray<HTMLElement>('[data-client-logo]')
        if (logos.length) {
          ScrollTrigger.create({
            trigger: logos[0].closest('ul'),
            start: 'top 85%',
            once: true,
            onEnter: () =>
              gsap.to(logos, { filter: 'grayscale(0)', opacity: 1, duration: DUR.reveal, stagger: STAGGER * 2, ease: EASE.entrada, delay: 0.3 }),
          })
        }

        // Software à medida: a fotografia abre da esquerda para a direita, ligada ao scroll, e o texto
        // acompanha com um atraso curto (só deslocação, sem baixar o contraste).
        const gate = document.querySelector<HTMLElement>('[data-gate]')
        if (gate) {
          gsap.fromTo(
            gate,
            { clipPath: 'inset(0% 100% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: gate, start: 'top 85%', end: 'top 35%', scrub: 0.5 } },
          )
          const text = document.querySelector('[data-gate-text]')
          if (text)
            gsap.fromTo(
              text.children,
              { x: 28 },
              { x: 0, ease: 'none', stagger: 0.08, scrollTrigger: { trigger: gate, start: 'top 75%', end: 'top 30%', scrub: 0.5 } },
            )
        }

        // Produtos: cada painel sobe como uma persiana e o ecrã dele muda de estado uma vez.
        const list = document.querySelector<HTMLElement>('.produtos-mini')
        if (list) {
          const panels = gsap.utils.toArray<HTMLElement>('.produto-painel', list)
          list.classList.add('is-armed')
          const hidden = panels.filter((p) => belowFold(p))
          gsap.set(hidden, { clipPath: 'inset(100% 0% 0% 0%)' })
          panels.filter((p) => !hidden.includes(p)).forEach((p, i) => window.setTimeout(() => p.classList.add('is-on'), 700 + i * 250))
          ScrollTrigger.batch(hidden, {
            start: 'top 85%',
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: DUR.reveal * 1.4,
                ease: EASE.entrada,
                stagger: 0.12,
                clearProps: 'clipPath',
                onComplete: () => batch.forEach((p) => p.classList.add('is-on')),
              }),
          })
          // Ao passar o rato, o ecrã repete a mudança.
          panels.forEach((p) => {
            let t = 0
            const replay = () => {
              if (!p.classList.contains('is-on')) return
              p.classList.remove('is-on')
              window.clearTimeout(t)
              t = window.setTimeout(() => p.classList.add('is-on'), 450)
            }
            p.addEventListener('pointerenter', replay)
            cleanups.push(() => p.removeEventListener('pointerenter', replay))
          })
          cleanups.push(() => {
            list.classList.remove('is-armed')
            panels.forEach((p) => p.classList.remove('is-on'))
          })
        }

        // Equipa: as fotografias deslizam a velocidades ligeiramente diferentes (só desktop).
        if (wide) {
          const photos = gsap.utils.toArray<HTMLElement>('[data-team] li')
          const speed = [-6, 5, -10]
          photos.forEach((el, i) => {
            gsap.fromTo(
              el,
              { yPercent: -speed[i % speed.length] },
              { yPercent: speed[i % speed.length], ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } },
            )
          })
        }
      })
      revert = () => mm.revert()
    })

    return () => {
      cancelled = true
      revert?.()
      cleanups.forEach((f) => f())
    }
  }, [])

  return null
}
