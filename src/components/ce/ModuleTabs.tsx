'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import Kiosk from '@/components/checkin/Kiosk'
import FaceCheck from '@/components/checkin/FaceCheck'
import Badge, { StatusIcon, type DocStatus } from '@/components/checkin/Badge'
import PauseButton from '@/components/motion/PauseButton'
import { usePlayback } from '@/components/motion/usePlayback'
import { useTabs } from '@/components/motion/useTabs'
import type { ConstructionDict } from '@/content/construction'
import { loadGsap, reducedMotion, type Kit } from '@/motion/gsap'
import { DUR, EASE, TAB_ADVANCE } from '@/motion/tokens'

type T = ConstructionDict['modules']

// Cinco módulos em separadores com avanço automático (6 s, barra de progresso). Pára com o rato
// ou o foco em cima, fora do ecrã, com a aba escondida, com o botão de pausa e de vez depois de a
// pessoa escolher um separador. A troca é um crossfade com escala 0,98 → 1 e o crachá do Rui,
// presente em todas as vistas, desloca-se de uma para a outra (Flip).
export default function ModuleTabs({ t, ctaHref }: { t: T; ctaHref: string }) {
  const root = useRef<HTMLDivElement>(null)
  const kit = useRef<Kit | null>(null)
  const flip = useRef<ReturnType<Kit['Flip']['getState']> | null>(null)
  const { running, paused, setPaused } = usePlayback(root)
  const [active, setActive] = useState(0)
  const [hold, setHold] = useState(false)
  const [chosen, setChosen] = useState(false)
  const n = t.items.length

  useEffect(() => {
    if (!reducedMotion()) loadGsap().then((k) => (kit.current = k))
  }, [])

  const go = (i: number) => {
    const k = kit.current
    const from = root.current?.querySelector('[data-on] [data-flip-id="cracha"]')
    if (k && from) flip.current = k.Flip.getState(from)
    setActive(i)
  }
  useEffect(() => {
    const k = kit.current
    const state = flip.current
    const to = root.current?.querySelector(`#modulos-panel-${active} [data-flip-id="cracha"]`)
    if (!k || !state || !to) return
    flip.current = null
    k.Flip.from(state, { targets: to, duration: DUR.ui * 1.8, ease: EASE.estado, scale: true })
  }, [active])

  const { tab, panel } = useTabs('modulos', n, active, (i) => {
    setChosen(true)
    go(i)
  })
  const auto = running && !hold && !chosen

  return (
    <div
      ref={root}
      onPointerEnter={() => setHold(true)}
      onPointerLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHold(false)}
    >
      <div role="tablist" aria-label={t.label} className="flex overflow-x-auto border-b border-caixa [scrollbar-width:none]">
        {t.items.map((m, i) => (
          <button
            key={m.tab}
            {...tab(i)}
            onClick={() => {
              setChosen(true)
              go(i)
            }}
            className="tab-btn shrink-0"
          >
            {m.tab}
            {i === active && !chosen && (
              <span
                key={active}
                aria-hidden="true"
                className={`tab-progress motion-only ${running ? 'is-running' : ''} ${auto ? '' : 'is-paused'}`}
                style={{ ['--advance' as string]: `${TAB_ADVANCE}ms` }}
                onAnimationEnd={() => go((active + 1) % n)}
              />
            )}
          </button>
        ))}
      </div>
      <div className="tab-stack mt-8">
        {t.items.map((m, i) => (
          <div key={m.tab} {...panel(i)} className="grid gap-8 outline-none lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center">
            <div>
              <h3 className="t-h3">{m.title}</h3>
              <p className="mt-3 max-w-[40ch] text-lead text-grafite">{m.text}</p>
              <Link href={ctaHref} className="btn-primary mt-6">
                {t.cta}
              </Link>
            </div>
            <div aria-hidden="true" className="min-h-[19rem] border border-caixa bg-betao p-5 sm:p-8">
              <Mockup i={i} t={t} />
            </div>
          </div>
        ))}
      </div>
      {!chosen && <PauseButton paused={paused} onToggle={() => setPaused(!paused)} labels={t} className="mt-4" />}
    </div>
  )
}

function Rui({ status, text }: { status?: DocStatus; text?: string }) {
  return (
    <Badge name="Rui Marques" company="Cofragens Tejo" time="07:42" status={status} statusText={text} size="sm" flipId="cracha" className="max-w-[17rem]" />
  )
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border border-caixa bg-white p-4 text-small">
      <p className="font-semibold">{title}</p>
      <div className="mt-2">{children}</div>
    </div>
  )
}

function Mockup({ i, t }: { i: number; t: T }) {
  if (i === 0)
    return (
      <div className="grid gap-4 sm:grid-cols-2 sm:items-start">
        <Rui />
        <Panel title={t.gate.title}>
          <ul>
            {t.gate.rows.map(([k, v]) => (
              <li key={v} className="flex justify-between border-b border-caixa py-1.5 last:border-0">
                {k}
                <span className="t-data">{v}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    )
  if (i === 1)
    return (
      <div className="grid items-center gap-4 sm:grid-cols-[10rem_1fr]">
        <Kiosk className="max-w-[10rem]">
          <FaceCheck state="ok" />
        </Kiosk>
        <Rui status="ok" text={t.verified} />
      </div>
    )
  if (i === 2)
    return (
      <div className="grid gap-4">
        <Rui />
        <Panel title={t.docNote}>
          <div className="grid grid-cols-4 gap-2 text-center">
            {t.docCols.map((c, k) => {
              const s: DocStatus = k === 2 ? 'soon' : k === 3 ? 'missing' : 'ok'
              return (
                <div key={c} className="border border-caixa py-2">
                  <p className="font-semibold">{c}</p>
                  <StatusIcon status={s} className={`mx-auto mt-1 ${s === 'ok' ? 'text-estado-valido' : 'text-estado-erro'}`} />
                </div>
              )
            })}
          </div>
        </Panel>
      </div>
    )
  if (i === 3)
    return (
      <div className="grid gap-4 sm:grid-cols-2 sm:items-start">
        <Panel title={t.site}>
          <ul>
            {t.companies.map((c) => (
              <li key={c.name} className="flex justify-between gap-3 border-b border-caixa py-1.5 last:border-0">
                {c.name}
                <span className="t-data">{c.n}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Rui />
      </div>
    )
  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:items-start">
      <Rui />
      <Panel title={t.report.title}>
        <ul>
          {t.report.rows.map(([k, v]) => (
            <li key={k} className="flex justify-between border-b border-caixa py-1.5 last:border-0">
              {k}
              <span className="t-data">{v}</span>
            </li>
          ))}
        </ul>
        <span className="mt-3 inline-block rounded-[4px] bg-produto-obras px-3 py-1.5 font-semibold text-white">{t.report.export}</span>
      </Panel>
    </div>
  )
}
