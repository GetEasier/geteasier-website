'use client'

import { useEffect, useRef, useState } from 'react'
import PauseButton from '@/components/motion/PauseButton'
import { usePlayback } from '@/components/motion/usePlayback'
import { LOOP_PAUSE } from '@/motion/tokens'
import { cn } from '@/lib/utils'

export type BuildLabels = {
  summary: string
  steps: readonly string[]
  sample: string
  noteKicker: string
  note: string
  url: string
  appTitle: string
  newBtn: string
  nav: readonly string[]
  kpis: readonly (readonly string[])[]
  chart: string
  list: string
  tests: string
  integrations: readonly string[]
  deployed: string
  deployedText: string
  pause: string
  play: string
}

// Hero do início: como fazemos software à medida, em quatro passos que se veem acontecer.
// 0 ideia (a aplicação ainda é um esboço tracejado e há um post-it com o pedido) · 1 desenho
// (os blocos ganham cor e o gráfico sobe) · 2 código (o editor escreve as linhas e os testes
// passam) · 3 entrega (a mesma aplicação no telemóvel, ligada ao ERP, aos salários e à faturação).
// Tudo em HTML e CSS (transform, opacity, clip-path). O ciclo pausa fora do ecrã, com a aba
// escondida e com o botão. Sem JavaScript ou com "reduzir movimento" fica no estado final.
const HOLD = [2200, 2300, 2600, LOOP_PAUSE + 2200]
const LAST = HOLD.length - 1
const BARS = [0.45, 0.62, 0.5, 0.78, 0.66, 0.9, 0.82]

export default function BuildHero({ t }: { t: BuildLabels }) {
  const root = useRef<HTMLDivElement>(null)
  const { running, paused, setPaused } = usePlayback(root)
  const [step, setStep] = useState(LAST)
  const [leaving, setLeaving] = useState(false)
  const started = useRef(false)

  useEffect(() => {
    if (running && !started.current) {
      started.current = true
      setStep(0)
    }
  }, [running])

  useEffect(() => {
    if (!running || !started.current) return
    const id = window.setTimeout(() => {
      if (step < LAST) return setStep(step + 1)
      setLeaving(true)
      window.setTimeout(() => {
        setLeaving(false)
        setStep(0)
      }, 480)
    }, HOLD[step])
    return () => window.clearTimeout(id)
  }, [step, running])

  return (
    <div ref={root} className="build" data-step={step} data-leaving={leaving || undefined}>
      <p className="sr-only">{t.summary}</p>

      <ol aria-hidden="true" className="build-steps">
        {t.steps.map((s, i) => (
          <li key={s} data-on={step >= i || undefined} data-now={step === i || undefined}>
            <span className="build-step-n">{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>

      <div aria-hidden="true" className="build-stage">
        <div className="build-canvas">
          {/* A aplicação: começa como esboço e ganha cor */}
          <div className="b-win">
            <div className="b-bar">
              <span className="b-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="b-url">{t.url}</span>
              <span className="b-sample">{t.sample}</span>
            </div>
            <div className="b-body">
              <div className="b-side bx" style={{ ['--i' as string]: 0 }}>
                <span className="b-logo" />
                {t.nav.map((n, i) => (
                  <span key={n} className={cn('b-nav', i === 1 && 'is-on')}>
                    {n}
                  </span>
                ))}
              </div>
              <div className="b-main">
                <div className="b-head">
                  <span className="b-title bx" style={{ ['--i' as string]: 1 }}>
                    {t.appTitle}
                  </span>
                  <span className="b-btn bx" style={{ ['--i' as string]: 2 }}>
                    + {t.newBtn}
                  </span>
                </div>
                <div className="b-kpis">
                  {t.kpis.map(([v, l], i) => (
                    <div key={l} className={cn('b-kpi bx', `k${i}`)} style={{ ['--i' as string]: 3 + i }}>
                      <b>{v}</b>
                      <span>{l}</span>
                    </div>
                  ))}
                </div>
                <div className="b-row">
                  <div className="b-card b-chart bx" style={{ ['--i' as string]: 6 }}>
                    <span className="b-card-t">{t.chart}</span>
                    <span className="b-bars">
                      {BARS.map((h, i) => (
                        <i key={i} style={{ ['--h' as string]: h, ['--j' as string]: i }} />
                      ))}
                    </span>
                  </div>
                  <div className="b-card b-list bx" style={{ ['--i' as string]: 7 }}>
                    <span className="b-card-t">{t.list}</span>
                    {['ok', 'ok', 'wait'].map((s, i) => (
                      <span key={i} className="b-li">
                        <i className={cn('b-li-dot', s === 'wait' && 'is-wait')} />
                        <i className="b-li-l" style={{ width: `${[70, 55, 62][i]}%` }} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 0: o pedido do cliente num post-it */}
          <div className="b-note">
            <span className="b-note-k">{t.noteKicker}</span>
            {t.note}
          </div>

          {/* 2: o código */}
          <div className="b-code">
            <span className="b-code-bar">
              <i />
              <i />
              <i />
            </span>
            <code>
              <span className="cl" style={{ ['--l' as string]: 0 }}>
                <em className="k">const</em> encomendas = <em className="k">await</em> api.<em className="f">get</em>(<em className="s">&apos;/encomendas&apos;</em>)
              </span>
              <span className="cl" style={{ ['--l' as string]: 1 }}>
                &lt;<em className="tg">Painel</em> titulo=<em className="s">&quot;{t.appTitle}&quot;</em>&gt;
              </span>
              <span className="cl ind" style={{ ['--l' as string]: 2 }}>
                &lt;<em className="tg">Indicadores</em> dados={'{'}encomendas{'}'} /&gt;
              </span>
              <span className="cl ind" style={{ ['--l' as string]: 3 }}>
                &lt;<em className="tg">Grafico</em> tipo=<em className="s">&quot;barras&quot;</em> /&gt;
              </span>
              <span className="cl" style={{ ['--l' as string]: 4 }}>
                &lt;/<em className="tg">Painel</em>&gt;
              </span>
            </code>
            <span className="b-tests">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.5 8.5l3 3 6-7" />
              </svg>
              {t.tests}
            </span>
          </div>

          {/* 3: a mesma aplicação no telemóvel */}
          <div className="b-phone">
            <span className="b-phone-notch" />
            <span className="b-phone-t">{t.appTitle}</span>
            <span className="b-phone-kpi">
              <b>{t.kpis[0][0]}</b>
              {t.kpis[0][1]}
            </span>
            <span className="b-phone-bars">
              {BARS.slice(2).map((h, i) => (
                <i key={i} style={{ ['--h' as string]: h }} />
              ))}
            </span>
            {[0, 1, 2].map((i) => (
              <span key={i} className="b-phone-li">
                <i />
                <i style={{ width: `${[64, 48, 56][i]}%` }} />
              </span>
            ))}
          </div>

          {/* 3: integrações */}
          <ul className="b-ints">
            {t.integrations.map((name, i) => (
              <li key={name} style={{ ['--k' as string]: i }}>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 8h6M9 5.5L11.5 8 9 10.5M7 5.5L4.5 8 7 10.5" />
                </svg>
                {name}
              </li>
            ))}
          </ul>

          {/* 3: publicado */}
          <div className="b-toast">
            <span className="b-toast-i">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.5 8.5l3 3 6-7" />
              </svg>
            </span>
            <span>
              <b>{t.deployed}</b>
              <span>{t.deployedText}</span>
            </span>
          </div>
        </div>
      </div>

      <PauseButton paused={paused} onToggle={() => setPaused(!paused)} labels={t} dark className="build-pause mt-2" />
    </div>
  )
}
