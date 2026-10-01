'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { TESTIMONIALS } from '@/content/home'
import { usePlayback } from '@/components/motion/usePlayback'
import { cn } from '@/lib/utils'

type Labels = { prev: string; next: string; pause: string; play: string; of: string }

const ADVANCE = 9000
const noop = () => () => {}

// Testemunhos reais, um de cada vez. Avança sozinho de 9 em 9 s com botão de pausa (WCAG 2.2.2),
// pára com o rato ou o foco em cima, fora do ecrã e depois de a pessoa usar as setas.
// Sem JS, os três aparecem em lista.
export default function TestimonialCarousel({ labels, lang, dark }: { labels: Labels; lang: 'pt' | 'en'; dark?: boolean }) {
  const root = useRef<HTMLDivElement>(null)
  const { running, setPaused } = usePlayback(root)
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
      className={cn('testemunhos', dark && 'carrossel-dark')}
    >
      <ul className={cn(js ? 'testemunhos-stack' : 'grid gap-10')} aria-live={running && !hover ? 'off' : 'polite'}>
        {TESTIMONIALS.map((t, k) => (
          <li key={t.name} className="testemunho" data-on={!js || k === i ? '' : undefined} aria-hidden={js && k !== i ? true : undefined}>
            <figure>
              <svg aria-hidden="true" viewBox="0 0 48 36" className={cn('mb-5 h-8 w-auto md:h-10', dark ? 'text-ciano' : 'text-azul')} fill="currentColor">
                <path d="M0 36V22C0 9.6 6.2 2.3 18.6 0l2 5.2C13.5 7 10 11 9.6 17H19v19H0zm27 0V22C27 9.6 33.2 2.3 45.6 0l2 5.2C40.5 7 37 11 36.6 17H46v19H27z" />
              </svg>
              <blockquote lang="pt-PT" className="max-w-[46ch] text-[1.375rem] font-medium leading-snug md:text-[1.625rem]">
                <p>{t.quote}</p>
              </blockquote>
              <figcaption className="mt-8 flex flex-wrap items-center gap-4">
                <Image src={t.photo} alt="" width={56} height={56} className={cn('h-14 w-14 rounded-full object-cover', dark && 'ring-2 ring-white/30')} />
                <span className="min-w-0">
                  <span className="block font-semibold">{t.name}</span>
                  <span className={cn('block text-small', dark ? 'text-white/70' : 'text-grafite')}>{t.company}</span>
                </span>
                {dark && (
                  <span className="ml-auto grid h-14 place-items-center rounded-full bg-white px-5 max-sm:hidden">
                    <Image src={t.logo} alt="" width={120} height={48} className="max-h-10 w-auto object-contain" />
                  </span>
                )}
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
          <span className={cn('px-2 text-small font-semibold', dark ? 'text-white/70' : 'text-grafite')}>{labels.of.replace('{i}', String(i + 1)).replace('{n}', String(n))}</span>
        </div>
      )}
      {lang === 'en' && <p className={cn('mt-6 text-small', dark ? 'text-white/70' : 'text-grafite')}>Quoted in the original Portuguese.</p>}
    </div>
  )
}
