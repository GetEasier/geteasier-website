'use client'

import { useEffect, useRef } from 'react'
import { loadGsap, reducedMotion } from '@/motion/gsap'
import './custom-beams.css'

type Item = { title: string; text: string }

// Software à medida no início: um impulso de luz sai do monitor da fotografia e corre por um feixe
// até cada cartão; quando chega, o contorno do cartão acende e o ícone anima (o browser carrega, o
// telemóvel recebe uma notificação, os dados passam de uma caixa para a outra). Dá duas voltas e
// pára; ao passar o rato num cartão, repete só esse. No telemóvel não há feixes, só os cartões a
// acender um a um. Só transform, opacity e stroke-dashoffset, e nada corre fora do ecrã nem com
// "reduzir movimento".
const SCENES = [
  <svg key="web" viewBox="0 0 40 32" className="mb-scene" fill="none">
    <rect x="2" y="3" width="36" height="26" rx="4" stroke="currentColor" strokeWidth="2" />
    <path d="M2 9.5h36" stroke="currentColor" strokeWidth="2" />
    <rect className="s-row" x="7" y="14" width="18" height="3" rx="1.5" fill="currentColor" />
    <rect className="s-row" x="7" y="20" width="12" height="3" rx="1.5" fill="currentColor" opacity=".7" />
    <rect className="s-bar" x="28" y="17" width="5" height="8" rx="1" fill="currentColor" />
  </svg>,
  <svg key="app" viewBox="0 0 40 32" className="mb-scene" fill="none">
    <rect x="12" y="1.5" width="16" height="29" rx="4" stroke="currentColor" strokeWidth="2" />
    <rect className="s-note" x="14.5" y="6" width="11" height="6" rx="2" fill="currentColor" />
    <path className="s-check" d="M16.5 20.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" pathLength="1" />
  </svg>,
  <svg key="int" viewBox="0 0 40 32" className="mb-scene" fill="none">
    <rect x="2" y="10" width="11" height="11" rx="3" stroke="currentColor" strokeWidth="2" />
    <rect className="s-dest" x="27" y="10" width="11" height="11" rx="3" stroke="currentColor" strokeWidth="2" />
    <path d="M14 15.5h12" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2.5" opacity=".6" />
    <circle className="s-dot" cx="15" cy="15.5" r="2.4" fill="currentColor" />
  </svg>,
]

/** Ponto de partida dos feixes: o ecrã do monitor na fotografia (fração da largura e da altura). */
const SOURCE = { x: 0.86, y: 0.56 }

export default function CustomBeams({
  items,
  photo,
  intro,
  footer,
}: {
  items: Item[]
  photo: React.ReactNode
  intro: React.ReactNode
  footer: React.ReactNode
}) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || reducedMotion()) return
    const cleanups: (() => void)[] = []
    let cancelled = false
    const cards = Array.from(el.querySelectorAll<HTMLElement>('.mb-card'))
    const svg = el.querySelector<SVGSVGElement>('.mb-beams')!
    const media = el.querySelector<HTMLElement>('[data-gate]')!
    const wide = window.matchMedia('(min-width: 1024px)')

    // Luz que segue o rato dentro do cartão: só variáveis CSS, uma vez por frame.
    cards.forEach((card) => {
      let raf = 0
      const move = (e: PointerEvent) => {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(() => {
          const r = card.getBoundingClientRect()
          card.style.setProperty('--mx', `${e.clientX - r.left}px`)
          card.style.setProperty('--my', `${e.clientY - r.top}px`)
        })
      }
      card.addEventListener('pointermove', move)
      cleanups.push(() => card.removeEventListener('pointermove', move))
    })

    // Os feixes ligam o monitor à margem esquerda de cada cartão (só em ecrã largo).
    const draw = () => {
      if (!wide.matches) return
      const box = el.getBoundingClientRect()
      const m = media.getBoundingClientRect()
      const sx = m.left - box.left + m.width * SOURCE.x
      const sy = m.top - box.top + m.height * SOURCE.y
      svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`)
      svg.classList.add('is-ready')
      const dot = svg.querySelector('.mb-src')!
      dot.setAttribute('cx', String(sx))
      dot.setAttribute('cy', String(sy))
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect()
        const ex = r.left - box.left
        const ey = r.top - box.top + r.height / 2
        const mid = (sx + ex) / 2
        const d = `M${sx},${sy} C${mid},${sy} ${mid},${ey} ${ex},${ey}`
        svg.querySelectorAll(`[data-beam="${i}"]`).forEach((p) => p.setAttribute('d', d))
      })
    }
    draw()
    const ro = new ResizeObserver(draw)
    ro.observe(el)
    cleanups.push(() => ro.disconnect())

    const hit = (card: HTMLElement) => {
      cards.forEach((o) => o.classList.remove('is-hit'))
      void card.offsetWidth
      card.classList.add('is-hit')
    }

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return
      const ctx = gsap.context(() => {
        const pulses = gsap.utils.toArray<SVGPathElement>('.mb-pulse', svg)
        const travel = (i: number, duration: number) =>
          gsap.fromTo(pulses[i], { strokeDashoffset: 24 }, { strokeDashoffset: -100, duration, ease: 'power1.in' })

        // Duas voltas pelos três cartões e depois pára.
        const STEP = 1.5
        const tl = gsap.timeline({ paused: true, repeat: 1, repeatDelay: 0.6 })
        cards.forEach((c, i) => {
          const at = i * STEP
          if (wide.matches) {
            tl.add(draw, at)
            tl.add(travel(i, 0.9), at)
          }
          tl.add(() => hit(c), at + (wide.matches ? 0.75 : 0))
        })
        tl.add(() => cards.forEach((o) => o.classList.remove('is-hit')), cards.length * STEP + 0.3)
        ScrollTrigger.create({ trigger: el.querySelector('.mb-cards'), start: 'top 70%', once: true, onEnter: () => tl.play() })
        // Fora do ecrã fica em pausa.
        ScrollTrigger.create({
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (s) => (s.isActive ? tl.progress() > 0 && tl.progress() < 1 && tl.resume() : tl.pause()),
        })

        cards.forEach((c, i) => {
          let t = 0
          const fire = () => {
            if (tl.isActive()) return
            window.clearTimeout(t)
            cards.forEach((o) => o.classList.remove('is-hit'))
            if (wide.matches) {
              draw()
              travel(i, 0.7)
            }
            t = window.setTimeout(() => hit(c), wide.matches ? 550 : 0)
          }
          const off = () => {
            if (tl.isActive()) return
            window.clearTimeout(t)
            c.classList.remove('is-hit')
          }
          c.addEventListener('pointerenter', fire)
          c.addEventListener('pointerleave', off)
          cleanups.push(() => {
            window.clearTimeout(t)
            c.removeEventListener('pointerenter', fire)
            c.removeEventListener('pointerleave', off)
          })
        })
      }, el)
      cleanups.push(() => ctx.revert())
    })

    return () => {
      cancelled = true
      cleanups.forEach((f) => f())
    }
  }, [])

  return (
    <div ref={root} className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
      <svg className="mb-beams" aria-hidden="true">
        <defs>
          <linearGradient id="mb-grad" x1="0" x2="1">
            <stop offset="0" stopColor="#18ddba" />
            <stop offset="1" stopColor="#1b54b8" />
          </linearGradient>
        </defs>
        {items.map((_, i) => (
          <g key={i}>
            <path data-beam={i} className="mb-rail" />
            <path data-beam={i} className="mb-pulse" pathLength={100} />
          </g>
        ))}
        <circle className="mb-src" r="6" />
      </svg>
      <div data-gate>{photo}</div>
      <div data-gate-text>
        {intro}
        <ul className="mb-cards mt-7 grid gap-3">
          {items.map((item, i) => (
            <li key={item.title} className="mb-card medida-card" data-kind={i}>
              <span className="mb-ring" aria-hidden="true" />
              <span aria-hidden="true" className="medida-icon mb-tile">
                {SCENES[i]}
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold leading-snug">{item.title}</h3>
                <p className="mt-1 text-small text-grafite">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
        {footer}
      </div>
    </div>
  )
}
