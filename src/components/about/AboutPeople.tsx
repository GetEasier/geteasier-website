'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import TeamLive from '@/components/home/TeamLive'
import { TEAM, about } from '@/content/about'
import type { Locale } from '@/lib/seo.config'
import s from './AboutPeople.module.css'

// Sobre: uma linha por co-fundador. Ao entrar no ecrã a fotografia abre de baixo para cima, o nome
// sobe, o "cartão de código" escreve-se linha a linha com o cursor a piscar no fim. Com o
// rato, a fotografia inclina-se como no início. Sem JS ou com "reduzir movimento", fica tudo visível.
export default function AboutPeople({ locale }: { locale: Locale }) {
  const t = about[locale]
  const root = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const list = root.current
    if (!list || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rows = Array.from(list.querySelectorAll<HTMLElement>('[data-person]'))
    const below = rows.filter((row) => row.getBoundingClientRect().top > window.innerHeight * 0.85)
    below.forEach((row) => row.setAttribute('data-armed', ''))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.setAttribute('data-in', '')
          io.unobserve(e.target)
        })
      },
      { rootMargin: '0px 0px -20% 0px' },
    )
    below.forEach((row) => io.observe(row))
    return () => io.disconnect()
  }, [])

  return (
    <ul ref={root} data-team-live="" className="mt-12 space-y-16 md:space-y-24">
      <TeamLive />
      {TEAM.map((m, i) => {
        const p = t.people[i]
        const id = m.name.split(' ')[0].normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
        return (
          <li key={m.name} data-person="" className={`${s.row} grid items-center gap-8 md:gap-14 ${i % 2 ? 'md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]' : 'md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]'}`}>
            <div className={`${s.photo} ${i % 2 ? 'md:order-2' : ''}`}>
              <div className="team-card relative overflow-hidden" style={{ ['--k' as string]: i }}>
                <Image src={m.photo} alt={m.name} width={480} height={600} sizes="(min-width: 768px) 38vw, 100vw" className="aspect-[4/5] w-full object-cover object-top" />
                <span className="team-chip">
                  <i aria-hidden="true" />
                  {t.founder}
                </span>
              </div>
            </div>
            <div className={i % 2 ? 'md:order-1' : ''}>
              <h3 className={`${s.name} text-[2rem] font-bold leading-tight tracking-[-0.02em] md:text-[2.5rem]`}>{m.name}</h3>
              <p className={`${s.name} team-role`} style={{ transitionDelay: '300ms' }}>
                {t.roles[m.role]}
              </p>
              <p className={`${s.name} mt-5 max-w-[46ch] text-lead text-white/80`} style={{ transitionDelay: '400ms' }}>
                {p.bio}
              </p>
              <pre className={`${s.code} mt-7`} aria-hidden="true">
                <span className={s.line} style={{ ['--i' as string]: 0 }}>
                  <b>const</b> {id} = {'{'}
                </span>
                <span className={s.line} style={{ ['--i' as string]: 1 }}>
                  {'  '}
                  {t.codeKeys.role}: <em>&apos;{t.roles[m.role]}&apos;</em>,
                </span>
                <span className={s.line} style={{ ['--i' as string]: 2 }}>
                  {'  '}
                  {t.codeKeys.focus}: [{p.focus.map((f, k) => (
                    <em key={f}>
                      &apos;{f}&apos;{k < p.focus.length - 1 ? ', ' : ''}
                    </em>
                  ))}],
                </span>
                <span className={s.line} style={{ ['--i' as string]: 3 }}>
                  {'}'}
                  <i className={s.caret} />
                </span>
              </pre>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
