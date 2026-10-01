'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { CustomSoftwareDict } from '@/content/custom-software'

// Arquitetura de um sistema de gestão genérico, montada ao scroll: cada passo do texto acende uma
// camada do diagrama (canais → acesso → serviços → dados e eventos → integrações → operação). As
// linhas desenham-se, e a partir dos dados há pedidos a circular dos canais até à base de dados e
// ao ERP. O diagrama fica preso ao ecrã (ao lado no computador, em cima no telemóvel) enquanto o
// texto passa. Sem JavaScript fica tudo aceso; com "reduzir movimento" acende sem traçado nem pedidos.

type Props = { t: Pick<CustomSoftwareDict, 'arch' | 'archLabels' | 'archFigure'>; icons: Record<string, ReactNode> }

const ALL = 6

// Coordenadas do diagrama (viewBox 600 × 540)
const CH_X = [30, 170, 310, 450]
const SV_X = [30, 141, 252, 363, 474]
const DB_X = [70, 160, 250]
const IN = [
  [320, 350],
  [455, 350],
  [320, 405],
  [455, 405],
]
const PACKETS = [
  'M90 78 V138 H78 V296 H70 V350',
  'M230 78 V138 H189 V296 H377 V350',
  'M510 78 V138 H411 V296 H160 V350',
  'M370 78 V138 H522 V296 H512 V350',
]

export default function ArchitectureScroll({ t, icons }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const figure = useRef<HTMLDivElement>(null)
  const [stage, setStage] = useState(ALL)

  useEffect(() => {
    const el = root.current
    const fig = figure.current
    if (!el || !fig) return
    const steps = [...el.querySelectorAll<HTMLElement>('[data-arch-item]')]
    const wide = window.matchMedia('(min-width: 1024px)')
    let raf = 0
    const update = () => {
      raf = 0
      const vh = window.innerHeight
      // Linha de leitura: a 60 % do ecrã no computador; no telemóvel, a três quartos do espaço que o diagrama deixa livre.
      const line = wide.matches ? vh * 0.6 : fig.getBoundingClientRect().bottom + (vh - fig.getBoundingClientRect().bottom) * 0.75
      setStage(steps.filter((s) => s.getBoundingClientRect().top < line).length)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const L = t.archLabels
  const layer = (n: number) => cn('arch-layer', stage >= n && 'is-on', stage === n && 'is-current')

  return (
    <div ref={root} className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
      <div ref={figure} className="cs-arch-sticky lg:order-2">
        <figure className="cs-arch" data-stage={stage}>
          <svg viewBox="0 0 600 540" className="h-auto w-full" aria-hidden="true" focusable="false">
            {/* 6 · Operação: moldura à volta de tudo */}
            <g className={layer(6)}>
              <rect x="8" y="8" width="584" height="524" rx="18" pathLength="1" className="arch-frame" />
              <g className="arch-ops">
                {[0, 1, 2].map((i) => (
                  <circle key={i} cx={36 + i * 14} cy="505" r="4" className="arch-dot" style={{ animationDelay: `${i * 0.4}s` }} />
                ))}
                <text x="80" y="509" className="arch-label arch-small">
                  {L.ops}
                </text>
              </g>
            </g>

            {/* Ligações (desenhadas antes das caixas) */}
            <g className={layer(2)}>
              {CH_X.map((x) => (
                <path key={x} d={`M${x + 60} 78V118`} pathLength="1" className="arch-link" />
              ))}
            </g>
            <g className={layer(3)}>
              {SV_X.map((x) => (
                <path key={x} d={`M${x + 48} 158V198`} pathLength="1" className="arch-link" />
              ))}
            </g>
            <g className={layer(4)}>
              {SV_X.map((x) => (
                <path key={x} d={`M${x + 48} 246V284`} pathLength="1" className="arch-link" />
              ))}
              {DB_X.map((x) => (
                <path key={x} d={`M${x} 308V350`} pathLength="1" className="arch-link" />
              ))}
            </g>
            <g className={layer(5)}>
              <path d="M377 308V350M512 308V350M377 390V405M512 390V405" pathLength="1" className="arch-link" />
            </g>

            {/* 1 · Canais */}
            <g className={layer(1)}>
              {L.channels.map((label, i) => (
                <g key={label}>
                  <rect x={CH_X[i]} y="30" width="120" height="48" rx="10" pathLength="1" className="arch-box" />
                  <text x={CH_X[i] + 60} y="59" textAnchor="middle" className="arch-label">
                    {label}
                  </text>
                </g>
              ))}
            </g>

            {/* 2 · Acesso */}
            <g className={layer(2)}>
              <rect x="30" y="118" width="540" height="40" rx="10" pathLength="1" className="arch-box arch-box-accent" />
              <text x="300" y="143" textAnchor="middle" className="arch-label">
                {L.access}
              </text>
            </g>

            {/* 3 · Serviços */}
            <g className={layer(3)}>
              {L.services.map((label, i) => (
                <g key={label}>
                  <rect x={SV_X[i]} y="198" width="96" height="48" rx="10" pathLength="1" className="arch-box" />
                  <text x={SV_X[i] + 48} y="227" textAnchor="middle" className="arch-label arch-small">
                    {label}
                  </text>
                </g>
              ))}
            </g>

            {/* 4 · Dados e eventos */}
            <g className={layer(4)}>
              <rect x="30" y="284" width="540" height="24" rx="12" pathLength="1" className="arch-box arch-bus" />
              <text x="300" y="300" textAnchor="middle" className="arch-label arch-small arch-muted">
                {L.bus}
              </text>
              {DB_X.map((x, i) => (
                <g key={x}>
                  <path
                    d={`M${x - 30} 358 a30 8 0 0 0 60 0 a30 8 0 0 0 -60 0 v44 a30 8 0 0 0 60 0 v-44`}
                    pathLength="1"
                    className="arch-box"
                  />
                  <text x={x} y="432" textAnchor="middle" className="arch-label arch-small">
                    {L.data[i]}
                  </text>
                </g>
              ))}
            </g>

            {/* 5 · Integrações */}
            <g className={layer(5)}>
              {IN.map(([x, y], i) => (
                <g key={L.integrations[i]}>
                  <rect x={x} y={y} width="115" height="40" rx="10" pathLength="1" className="arch-box arch-box-ext" />
                  <text x={x + 57.5} y={y + 25} textAnchor="middle" className="arch-label arch-small">
                    {L.integrations[i]}
                  </text>
                </g>
              ))}
            </g>

            {/* Pedidos a circular, depois de haver dados */}
            <g className={cn('arch-packets', stage >= 4 && 'is-on')}>
              {PACKETS.map((d, i) => (
                <circle key={d} r="4.5" className="arch-packet" style={{ offsetPath: `path('${d}')`, animationDelay: `${i * 0.7}s` }} />
              ))}
            </g>
          </svg>
          <figcaption className="sr-only">{t.archFigure}</figcaption>
        </figure>
      </div>

      <ol className="cs-arch-steps lg:order-1">
        {t.arch.map((item, i) => (
          <li key={item.key} data-arch-item className={cn('cs-proof-item', stage === i + 1 && 'is-on')} data-c={i % 5}>
            <span className="cs-icon">{icons[item.key]}</span>
            <div className="min-w-0">
              <h3 className="font-semibold leading-snug">{item.term}</h3>
              <p className="mt-0.5 text-small text-white/75">{item.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
