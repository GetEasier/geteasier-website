'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import ScrollWord from './ScrollWord'

// "O que muda com o produto", contado ao descer. Em desktop o ecrã fica fixo à esquerda e muda
// conforme o passo que está a meio do ecrã; cada ecrã anima ao ficar ativo (atributo data-anim,
// transições em globals.css, classes .tb-*). Em telemóvel, sem JavaScript ou com "reduzir
// movimento", cada passo mostra o seu ecrã por baixo do texto, no estado final.
// Os ecrãs são decorativos (aria-hidden); o texto dos passos é o conteúdo.

type Props = {
  headingId: string
  title: string
  intro: string
  steps: { title: string; text: string }[]
  /** Fundo do painel dos ecrãs (classe Tailwind) e cor do ponto ativo. */
  tint: string
  accent: string
  screen: (i: number, on: boolean) => ReactNode
  /** O título de cada passo monta-se letra a letra ao descer (ScrollWord). */
  animateSteps?: boolean
}

export default function ScrollStory({ headingId, title, intro, steps, tint, accent, screen, animateSteps }: Props) {
  const [active, setActive] = useState(-1)
  const items = useRef<(HTMLLIElement | null)[]>([])

  // O passo ativo é o que atravessa a faixa a meio do ecrã.
  useEffect(() => {
    // Com "reduzir movimento" não há passo ativo: tudo fica no estado final.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i))
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    items.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const shown = Math.max(active, 0)

  return (
    <div className={cn('tb', animateSteps && 'overflow-x-clip')} style={{ ['--tb-accent' as string]: accent }}>
      <div className="max-w-prose">
        <h2 id={headingId} className="t-h2">
          {title}
        </h2>
        <p className="mt-3 text-lead text-grafite">{intro}</p>
      </div>

      <div className="tb-grid mt-10">
        {/* Ecrã fixo (desktop com movimento): todos os ecrãs empilhados, só o ativo visível */}
        <div aria-hidden="true" className="tb-sticky hidden lg:block">
          <div className={cn('sticky top-[calc(var(--header-h)+3rem)] grid h-[min(30rem,calc(100vh-var(--header-h)-6rem))] place-items-center overflow-hidden rounded-[28px] p-8', tint)}>
            {steps.map((s, i) => (
              <div key={s.title} className="tb-screen col-start-1 row-start-1 grid h-full w-full place-items-center" data-on={i === shown || undefined}>
                <div className="contents" data-anim={i === active || undefined}>
                  {screen(i, i === active)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <ol className="tb-steps relative">
          {steps.map((s, i) => (
            <li
              key={s.title}
              ref={(el) => {
                items.current[i] = el
              }}
              data-i={i}
              data-on={i === shown || undefined}
              className="tb-step"
            >
              <span aria-hidden="true" className="tb-dot" />
              {animateSteps ? <ScrollWord as="h3" text={s.title} className="t-h3" /> : <h3 className="t-h3">{s.title}</h3>}
              <p className="mt-2 max-w-[42ch] text-grafite">{s.text}</p>
              {/* Ecrã por baixo do texto (telemóvel, sem JS, reduzir movimento) */}
              <div aria-hidden="true" className={cn('tb-inline mt-6 grid place-items-center rounded-[22px] p-6', tint)}>
                <div className="contents" data-anim={active < 0 || i <= active || undefined}>
                  {screen(i, active < 0 || i <= active)}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
