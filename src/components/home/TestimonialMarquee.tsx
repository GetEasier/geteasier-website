'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { usePlayback } from '@/components/motion/usePlayback'
import { TESTIMONIALS } from '@/content/home'

// Testemunhos numa faixa que anda devagar na horizontal, com as pontas a desvanecer. Para com o rato
// ou o foco em cima (para se conseguir ler), fora do ecrã e com a aba escondida.
// Sem JS ou com "reduzir movimento", os três ficam numa grelha parada.
export default function TestimonialMarquee() {
  const root = useRef<HTMLDivElement>(null)
  const { running } = usePlayback(root)
  const n = TESTIMONIALS.length

  return (
    <div ref={root} className="testemunhos-faixa" data-run={running || undefined}>
      <div className="tf-viewport wrap">
        <div className="tf-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="tf-set" aria-hidden={copy === 1 || undefined}>
              {[...TESTIMONIALS, ...TESTIMONIALS].map((q, i) => (
                <li key={`${q.name}-${i}`} className="testemunho-card" data-kind={i % n} aria-hidden={i >= n || undefined}>
                  <figure className="flex h-full flex-col">
                    <svg aria-hidden="true" viewBox="0 0 48 36" className="testemunho-aspas h-7 w-auto self-start" fill="currentColor">
                      <path d="M0 36V22C0 9.6 6.2 2.3 18.6 0l2 5.2C13.5 7 10 11 9.6 17H19v19H0zm27 0V22C27 9.6 33.2 2.3 45.6 0l2 5.2C40.5 7 37 11 36.6 17H46v19H27z" />
                    </svg>
                    <blockquote lang="pt-PT" className="mt-5 text-[1.0625rem] font-medium leading-relaxed">
                      <p>{q.quote}</p>
                    </blockquote>
                    <figcaption className="mt-auto flex items-center gap-3 pt-7">
                      <Image src={q.photo} alt="" width={48} height={48} className="h-12 w-12 rounded-full object-cover ring-2 ring-white" />
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{q.name}</span>
                        <span className="block text-small text-grafite">{q.company}</span>
                      </span>
                      <span className="grid h-11 shrink-0 place-items-center rounded-full bg-white px-3 shadow-[0_8px_20px_-14px_rgba(6,8,60,.5)]">
                        <Image src={q.logo} alt="" width={96} height={40} className="max-h-7 w-auto object-contain" />
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}
