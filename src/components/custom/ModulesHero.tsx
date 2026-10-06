'use client'

import { useEffect, useRef, useState } from 'react'
import { usePlayback } from '@/components/motion/usePlayback'
import { LOOP_PAUSE } from '@/motion/tokens'
import type { CustomSoftwareDict } from '@/content/custom-software'
import { BUILD_ICONS } from './icons'

// Hero de software à medida: uma aplicação de gestão ganha módulos um a um. Cada módulo entra a voar
// para a barra lateral e o ecrã principal mostra-o a funcionar (encomendas, uma aprovação, equipas,
// uma fatura enviada, relatórios). Tudo em HTML e CSS. O ciclo pausa fora do ecrã e com a aba
// escondida; sem JavaScript ou com "reduzir movimento" fica no estado final, com todos os módulos.
const HOLD = [2600, 2800, 2600, 2800, LOOP_PAUSE + 2600]
const LAST = HOLD.length - 1
const BARS = [0.42, 0.58, 0.5, 0.72, 0.64, 0.86, 0.8]
const MOD_ICONS = [
  BUILD_ICONS[0],
  <svg key="ok" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>,
  <svg key="team" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 19c.8-3 3.1-4.6 6-4.6s5.2 1.6 6 4.6M16 4.8a3.2 3.2 0 0 1 0 6.2M18 14.6c1.6.6 2.6 2 3 4.4" />
  </svg>,
  <svg key="inv" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h9l4 4v14H6z" />
    <path d="M9 12h7M9 16h5" />
  </svg>,
  <svg key="chart" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  </svg>,
]

export default function ModulesHero({ t }: { t: CustomSoftwareDict['hero'] }) {
  const root = useRef<HTMLDivElement>(null)
  const { running } = usePlayback(root)
  const [step, setStep] = useState(LAST)
  const started = useRef(false)

  useEffect(() => {
    if (running && !started.current) {
      started.current = true
      setStep(0)
    }
  }, [running])

  useEffect(() => {
    if (!running || !started.current) return
    const id = window.setTimeout(() => setStep(step < LAST ? step + 1 : 0), HOLD[step])
    return () => window.clearTimeout(id)
  }, [step, running])

  return (
    <div ref={root} className="mh" data-run={running || undefined}>
      <p className="sr-only">{t.caption}</p>
      <div aria-hidden="true" className="mh-win">
        <div className="mh-bar">
          <span className="mh-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="mh-url">{t.url}</span>
        </div>
        <div className="mh-body">
          <ul className="mh-side">
            {t.modules.map((m, i) => (
              <li key={m} className="mh-mod" data-c={i} data-in={i <= step || undefined} data-new={(running && i === step) || undefined} data-now={i === step || undefined}>
                <span className="mh-mod-icon">{MOD_ICONS[i]}</span>
                <span className="mh-mod-label">{m}</span>
              </li>
            ))}
          </ul>

          <div className="mh-main">
            {/* 0 · Encomendas */}
            <section className="mh-panel" data-on={step === 0 || undefined}>
              <p className="mh-title">{t.modules[0]}</p>
              <ul className="mt-3 grid gap-2">
                {t.orders.map(([n, who, status], i) => (
                  <li key={n} className="mh-row" style={{ animationDelay: `${150 + i * 120}ms` }}>
                    <span className="mh-mono">{n}</span>
                    <span className="min-w-0 flex-1 truncate">{who}</span>
                    <span className="mh-pill" data-s={i}>
                      {status}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 1 · Aprovação */}
            <section className="mh-panel" data-on={step === 1 || undefined}>
              <p className="mh-title">{t.approval.title}</p>
              <div className="mh-card mt-3">
                <p className="mh-big">{t.approval.value}</p>
                <p className="mh-sub">{t.approval.who}</p>
                <span className="mh-approve">
                  <span className="mh-approve-a">{t.approval.approve}</span>
                  <span className="mh-approve-b">✓ {t.approval.approved}</span>
                </span>
              </div>
            </section>

            {/* 2 · Equipas */}
            <section className="mh-panel" data-on={step === 2 || undefined}>
              <p className="mh-title">{t.teams.title}</p>
              <ul className="mt-3 grid gap-2.5">
                {t.teams.items.map((item, i) => (
                  <li key={item} className="mh-team" style={{ animationDelay: `${150 + i * 120}ms` }}>
                    <span className="mh-avatar" data-c={i} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate">{item}</span>
                      <span className="mh-progress">
                        <i style={{ ['--w' as string]: `${[78, 52, 91][i]}%` }} />
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 3 · Fatura */}
            <section className="mh-panel" data-on={step === 3 || undefined}>
              <p className="mh-title">{t.invoice.title}</p>
              <div className="mh-card mt-3">
                <p className="mh-sub">{t.invoice.client}</p>
                <span className="mh-lines">
                  <i />
                  <i />
                  <i />
                </span>
                <p className="mh-big mt-2">{t.invoice.total}</p>
                <span className="mh-stamp">✓ {t.invoice.sent}</span>
              </div>
            </section>

            {/* 4 · Relatórios */}
            <section className="mh-panel" data-on={step === 4 || undefined}>
              <p className="mh-title">{t.reports.title}</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {t.reports.kpis.map(([k, v], i) => (
                  <span key={k} className="mh-kpi" data-c={i}>
                    <span className="mh-sub">{k}</span>
                    <span className="mh-big">{v}</span>
                  </span>
                ))}
              </div>
              <span className="mh-chart">
                {BARS.map((h, i) => (
                  <i key={i} style={{ ['--h' as string]: h, animationDelay: `${200 + i * 70}ms` }} />
                ))}
              </span>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
