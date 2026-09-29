'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { TESTIMONIALS } from '@/content/home'
import PauseButton from '@/components/motion/PauseButton'
import { usePlayback } from '@/components/motion/usePlayback'
import { cn } from '@/lib/utils'

type Labels = { prev: string; next: string; pause: string; play: string; of: string }

const ADVANCE = 9000
const noop = () => () => {}

// Testemunhos reais, um de cada vez. Avança sozinho de 9 em 9 s com botão de pausa (WCAG 2.2.2),
// pára com o rato ou o foco em cima, fora do ecrã e depois de a pessoa usar as setas.
// Sem JS, os três aparecem em lista.
export default function TestimonialCarousel({ labels, lang }: { labels: Labels; lang: 'pt' | 'en' }) {
  const root = useRef<HTMLDivElement>(null)
  const { running, paused, setPaused } = usePlayback(root)
  const [i, setI] = useState(0)
  const [hover, setHover] = useState(false)
  // true só no cliente, depois da hidratação (sem JS os testemunhos ficam em lista).
  const js = useSyncExternalStore(noop, () => true, () => false)
  const n = TESTIMONIALS.length

  useEffect(() => {
    if (!running || hover) return
    const id = window.setTimeout(() => setI((v) => (v + 1) % n), ADVANCE)
    return () => window.clearTimeout(id)
  }, [running, hover, i, n])

  const go = (d: number) => {
    setPaused(true)
    setI((v) => (v + d + n) % n)
  }

  return (
    <div
      ref={root}
      role="region"
      aria-roledescription={lang === 'pt' ? 'carrossel' : 'carousel'}
      aria-label={lang === 'pt' ? 'Testemunhos de clientes' : 'Client testimonials'}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="testemunhos"
    >
      <ul className={cn(js ? 'testemunhos-stack' : 'grid gap-10')} aria-live={running && !hover ? 'off' : 'polite'}>
        {TESTIMONIALS.map((t, k) => (
          <li key={t.name} className="testemunho" data-on={!js || k === i ? '' : undefined} aria-hidden={js && k !== i ? true : undefined}>
            <figure>
              <blockquote lang="pt-PT" className="max-w-[46ch] text-[1.375rem] font-medium leading-snug md:text-[1.625rem]">
                <p>{t.quote}</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4">
                <Image src={t.photo} alt="" width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
                <span className="min-w-0">
                  <span className="block font-semibold">{t.name}</span>
                  <span className="block text-small text-grafite">{t.company}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      {js && (
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => go(-1)} className="carrossel-btn" aria-label={labels.prev}>
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M10 3L5 8l5 5" />
            </svg>
          </button>
          <button type="button" onClick={() => go(1)} className="carrossel-btn" aria-label={labels.next}>
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 3l5 5-5 5" />
            </svg>
          </button>
          <span className="px-2 text-small font-semibold text-grafite">{labels.of.replace('{i}', String(i + 1)).replace('{n}', String(n))}</span>
          <PauseButton paused={paused} onToggle={() => setPaused(!paused)} labels={labels} className="ml-auto" />
        </div>
      )}
      {lang === 'en' && <p className="mt-6 text-small text-grafite">Quoted in the original Portuguese.</p>}
    </div>
  )
}
