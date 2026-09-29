'use client'

import { useState } from 'react'
import type { Locale } from '@/lib/seo.config'
import { cn } from '@/lib/utils'
import { Bell, Check, FaceMesh, Pin } from '@/components/demos/DemoWindow'

// Montra do início: o tablet na obra identifica uma pessoa, a obra na aplicação web recebe-a e
// chega o aviso ao responsável. Animação em CSS, em ciclo de 9 s, com botão de pausa
// (mais de 5 s de movimento, WCAG 2.2.2). Com "reduzir movimento" fica parada no estado final.
// Nomes, horas e empresas fictícios.

const T = {
  pt: {
    window: 'ConstructionEasier',
    site: 'Obra Rua das Flores',
    present: 'Presentes agora',
    own: 'Própria',
    subA: 'Subempreiteiro A',
    subB: 'Subempreiteiro B',
    gate: 'Portaria',
    sample: 'dados de exemplo',
    pause: 'Pausar a animação',
    play: 'Retomar a animação',
    label:
      'Ilustração animada: um colaborador identifica-se pelo rosto no tablet da obra, aparece na lista de presentes da aplicação web e o responsável recebe um aviso. Dados de exemplo.',
    month: 'Horas este mês',
  },
  en: {
    window: 'ConstructionEasier',
    site: 'Rua das Flores site',
    present: 'On site now',
    own: 'Own staff',
    subA: 'Subcontractor A',
    subB: 'Subcontractor B',
    gate: 'Gate',
    sample: 'sample data',
    pause: 'Pause the animation',
    play: 'Play the animation',
    label:
      'Animated illustration: a worker identifies themselves by face on the site tablet, appears in the web app’s on-site list and the manager gets a notification. Sample data.',
    month: 'Hours this month',
  },
}

export default function HeroShowcase({ locale }: { locale: Locale }) {
  const t = T[locale]
  const [paused, setPaused] = useState(false)
  const rows = [
    { name: 'Rui M.', co: t.own, chip: 'bg-azul/10 text-azul', time: '07:58' },
    { name: 'Nuno R.', co: t.subA, chip: 'bg-produto-obras-claro text-produto-obras', time: '08:02' },
    { name: 'Sara L.', co: t.subB, chip: 'bg-produto-wood-claro text-produto-wood', time: '08:11' },
  ]

  return (
    <div className="relative">
      <div role="img" aria-label={t.label} className={cn('showcase relative pb-56 pt-12', paused && 'is-paused')}>
        {/* Aplicação web */}
        <div className="ml-auto w-full overflow-hidden rounded-frame bg-white text-tinta shadow-[0_24px_60px_-20px_rgba(0,0,0,.55)] sm:w-[94%]">
          <div className="flex items-center gap-2 border-b border-linha px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-2 truncate text-small font-semibold">{t.window}</span>
            <span className="t-data ml-auto shrink-0 text-grafite">{t.sample}</span>
          </div>
          <div className="p-4 pb-20 text-small sm:p-5 sm:pb-16">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-semibold">{t.site}</p>
              <p className="t-data text-grafite">{t.present}</p>
            </div>
            <ul className="mt-3 space-y-2">
              {rows.map((r) => (
                <li key={r.name} className="flex items-center gap-3 rounded-ctl bg-papel px-3 py-2">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-tinta/10 text-[11px] font-bold">
                    {r.name.slice(0, 1)}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-semibold">{r.name}</span>
                  <span className={cn('hidden shrink-0 rounded-full px-2 py-0.5 text-[12px] font-semibold sm:inline', r.chip)}>{r.co}</span>
                  <span className="t-data shrink-0">{r.time}</span>
                </li>
              ))}
              <li className="sc-row flex items-center gap-3 rounded-ctl bg-ciano/15 px-3 py-2 ring-2 ring-ciano">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ciano/40 text-[11px] font-bold">T</span>
                <span className="min-w-0 flex-1 truncate font-semibold">Tiago F.</span>
                <span className="hidden shrink-0 rounded-full bg-azul/10 px-2 py-0.5 text-[12px] font-semibold text-azul sm:inline">{t.own}</span>
                <span className="t-data shrink-0">08:14</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Tablet na portaria */}
        <div className="absolute bottom-0 left-0 w-[46%] max-w-[210px] rounded-[18px] bg-[#0B0E2E] p-2 shadow-[0_20px_50px_-15px_rgba(0,0,0,.7)] ring-1 ring-white/15">
          <div className="rounded-xl bg-[#11164A] p-2.5 text-white">
            <div className="t-data flex justify-between text-[11px] text-white/70">
              <span>{t.gate}</span>
              <span>08:14</span>
            </div>
            <div className="relative mt-2 aspect-square overflow-hidden rounded-lg border border-white/15">
              <FaceMesh className="absolute inset-2 text-ciano" />
              <span className="sc-scan absolute inset-x-0 top-0 h-0.5 bg-ciano shadow-[0_0_12px_2px_#18DDBA]" />
            </div>
            <div lang="pt-PT" className="sc-chip mt-2 rounded-md bg-white px-2 py-1.5 text-center text-tinta">
              <p className="text-[13px] font-bold leading-tight">Olá, Tiago!</p>
              <p className="flex items-center justify-center gap-1 text-[11px] font-semibold text-estado-valido">
                <Check className="h-3 w-3" />
                Presença registada
              </p>
            </div>
          </div>
        </div>

        {/* Telemóvel com a app */}
        <div className="absolute bottom-24 right-4 w-[30%] max-w-[140px] rounded-[20px] bg-[#0B0E2E] p-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,.7)] ring-1 ring-white/15">
          <div className="rounded-[15px] bg-white px-2.5 pb-3 pt-4 text-tinta">
            <p className="text-[10px] font-semibold text-produto-time">TimeEasier</p>
            <p className="t-data mt-1 text-[20px] font-medium leading-none">08:14</p>
            <p className="mt-1.5 flex items-center gap-1 text-[10px] text-grafite">
              <Pin className="h-3 w-3" />
              Av. Central
            </p>
            <p className="mt-3 text-[10px] text-grafite">{t.month}</p>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-linha">
              <span className="sc-bar block h-full rounded-full bg-gradient-to-r from-azul to-ciano" />
            </div>
          </div>
        </div>

        {/* Aviso ao responsável */}
        <div className="sc-toast absolute left-0 top-0 z-10 flex items-center gap-2 rounded-ctl bg-white px-3 py-2 text-small text-tinta shadow-[0_12px_30px_-10px_rgba(0,0,0,.5)] sm:left-[6%]">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-ciano/20 text-azul">
            <Bell />
          </span>
          <span className="t-data">08:14</span>
          <span className="font-semibold">Tiago F.</span>
          <span className="hidden text-grafite sm:inline">· Rua das Flores</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        className="showcase-toggle ml-auto mt-4 flex min-h-[32px] items-center gap-2 rounded-full bg-white/10 px-3 text-[13px] font-medium text-white ring-1 ring-white/25 hover:bg-white/20"
      >
        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor" aria-hidden="true">
          {paused ? <path d="M2 1l9 5-9 5z" /> : <path d="M2 1h3v10H2zM7 1h3v10H7z" />}
        </svg>
        {paused ? t.play : t.pause}
      </button>
    </div>
  )
}
