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
  clockIn: string
  clockedIn: string
  pipeline: readonly string[]
  integrations: readonly string[]
  deployed: string
  deployedText: string
  arch: {
    title: string
    clients: readonly string[]
    api: string
    apiSub: string
    services: readonly string[]
    db: string
    integrations: string
  }
  pause: string
  play: string
}

// Hero do início: como fazemos software à medida, em quatro passos que se veem acontecer, com uma
// aplicação de assiduidade como exemplo. 0 ideia (a aplicação ainda é um esboço tracejado e há um
// post-it com o pedido) · 1 arquitetura (o diagrama desenha-se e os pedidos circulam das aplicações
// à API, aos serviços e à base de dados) · 2 código (o editor escreve as linhas, os testes passam e
// a aplicação ganha cor) · 3 entrega (a mesma aplicação no telemóvel, ligada ao ERP e aos salários).
// Tudo em HTML e CSS (transform, opacity, clip-path). O ciclo pausa fora do ecrã, com a aba
// escondida e com o botão. Sem JavaScript ou com "reduzir movimento" fica no estado final.
const HOLD = [2200, 3800, 3800, LOOP_PAUSE + 2600]
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
    <div
      ref={root}
      className="build"
      data-step={step}
      data-run={running || undefined}
      data-leaving={leaving || undefined}
      style={{ ['--hold' as string]: `${HOLD[step]}ms` }}
    >
      <p className="sr-only">{t.summary}</p>

      <ol aria-hidden="true" className="build-steps">
        {t.steps.map((s, i) => (
          <li key={s} data-on={step >= i || undefined} data-now={step === i || undefined}>
            <span className="build-step-n">{i + 1}</span>
            {s}
            <span key={step === i ? `run-${step}` : 'idle'} className="build-step-bar" />
          </li>
        ))}
      </ol>

      <div aria-hidden="true" className="build-stage">
        <div className="build-canvas">
          <span className="b-spot" />
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
                    {t.newBtn}
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
                    {['07:52', '08:14', '07:58'].map((h, i) => (
                      <span key={h} className="b-li">
                        <i className={cn('b-li-dot', i === 1 && 'is-wait')} />
                        <i className="b-li-l" style={{ width: `${[40, 30, 36][i]}%` }} />
                        <span className="b-li-t">{h}</span>
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

          {/* 1: a arquitetura */}
          <Arch t={t.arch} live={step === 1} />

          {/* 2: o código */}
          <div className="b-code b-glow">
            <span className="b-code-bar">
              <i />
              <i />
              <i />
            </span>
            <code>
              <span className="cl" style={{ ['--l' as string]: 0 }}>
                <em className="k">await</em> api.<em className="f">post</em>(<em className="s">&apos;/registos&apos;</em>, {'{'} tipo: <em className="s">&apos;entrada&apos;</em> {'}'})
              </span>
              <span className="cl" style={{ ['--l' as string]: 1 }}>
                &lt;<em className="tg">Painel</em> titulo=<em className="s">&quot;{t.appTitle}&quot;</em>&gt;
              </span>
              <span className="cl ind" style={{ ['--l' as string]: 2 }}>
                &lt;<em className="tg">Presencas</em> hoje={'{'}registos{'}'} /&gt;
              </span>
              <span className="cl ind" style={{ ['--l' as string]: 3 }}>
                &lt;<em className="tg">Grafico</em> tipo=<em className="s">&quot;horas&quot;</em> /&gt;
              </span>
              <span className="cl" style={{ ['--l' as string]: 4 }}>
                &lt;/<em className="tg">Painel</em>&gt;
                <i className="b-caret" />
              </span>
            </code>
            <span className="b-pipe">
              {t.pipeline.map((p, i) => (
                <span key={p} className="b-pipe-s" style={{ ['--p' as string]: i }}>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3.5 8.5l3 3 6-7" />
                  </svg>
                  {p}
                </span>
              ))}
              <span className="b-pipe-bar" />
            </span>
          </div>

          {/* 3: a mesma aplicação no telemóvel */}
          <div className="b-phone">
            <span className="b-phone-notch" />
            <span className="b-phone-t">{t.appTitle}</span>
            <span className="b-phone-kpi">
              <b className="b-swap">
                <span>{t.kpis[0][0]}</span>
                <span>{Number(t.kpis[0][0]) + 1}</span>
              </b>
              {t.kpis[0][1]}
            </span>
            <span className="b-phone-btn b-swap">
              <span>{t.clockIn}</span>
              <span>{t.clockedIn}</span>
              <i className="b-ripple" />
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

          {/* 3: o cursor toca em "Registar entrada" */}
          <svg className="b-cursor" viewBox="0 0 24 24">
            <path d="M5 3l14 8-6 1.6L10 19z" fill="#fff" stroke="#06083c" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>

          {/* 3: publicado */}
          <div className="b-toast">
            <span className="b-toast-bar" />
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

// Diagrama da arquitetura em SVG (escala com a peça). Os pedidos circulam como pontos ao longo das
// ligações, só enquanto o passo da arquitetura está no ecrã.
const ROWS = [43, 165, 287]
const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const m = (x1 + x2) / 2
  return `M${x1} ${y1}C${m} ${y1} ${m} ${y2} ${x2} ${y2}`
}
const EDGES = [
  ...ROWS.map((y) => ({ d: curve(126, y, 196, 165), g: 0 })),
  ...ROWS.map((y) => ({ d: curve(304, 165, 370, y), g: 1 })),
  { d: curve(486, 43, 516, 92), g: 2 },
  { d: curve(486, 165, 516, 122), g: 2 },
  { d: curve(486, 287, 508, 287), g: 2 },
]

const LAT = [
  { x: 160, y: 104, ms: '18 ms', g: 0.8 },
  { x: 336, y: 104, ms: '6 ms', g: 1.3 },
]

function Arch({ t, live }: { t: BuildLabels['arch']; live: boolean }) {
  return (
    <div className="b-arch b-glow">
      <span className="b-arch-t">{t.title}</span>
      <svg viewBox="0 0 600 330" className="b-arch-svg">
        <defs>
          <linearGradient id="b-api" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1b54b8" />
            <stop offset="1" stopColor="#0f8f8a" />
          </linearGradient>
        </defs>
        {EDGES.map((e, i) => (
          <path key={i} d={e.d} pathLength={1} className="b-edge" style={{ ['--g' as string]: e.g }} />
        ))}
        {EDGES.map((e, i) => (
          <path key={`f${i}`} d={e.d} className="b-flow" style={{ ['--g' as string]: e.g }} />
        ))}
        <g className="b-rings">
          <rect x="196" y="117" width="108" height="96" rx="16" />
          <rect x="196" y="117" width="108" height="96" rx="16" />
        </g>
        {LAT.map((l) => (
          <g key={l.ms} className="b-lat" style={{ ['--g' as string]: l.g }}>
            <rect x={l.x - 22} y={l.y - 10} width="44" height="18" rx="9" />
            <text x={l.x} y={l.y + 3} textAnchor="middle">
              {l.ms}
            </text>
          </g>
        ))}
        {t.clients.map((c, i) => (
          <g key={c} className="b-node" style={{ ['--g' as string]: 0 }}>
            <rect x="6" y={ROWS[i] - 23} width="120" height="46" rx="12" />
            <ClientIcon kind={i} x={22} y={ROWS[i]} />
            <text x="44" y={ROWS[i] + 5}>
              {c}
            </text>
          </g>
        ))}
        <g className="b-node b-node-api" style={{ ['--g' as string]: 0.5 }}>
          <rect x="196" y="117" width="108" height="96" rx="16" />
          <text x="250" y="160" textAnchor="middle" className="b-api-t">
            {t.api}
          </text>
          <text x="250" y="182" textAnchor="middle" className="b-sub">
            {t.apiSub}
          </text>
        </g>
        {t.services.map((c, i) => (
          <g key={c} className="b-node" style={{ ['--g' as string]: 1 }}>
            <rect x="370" y={ROWS[i] - 23} width="116" height="46" rx="12" />
            <rect x="384" y={ROWS[i] - 6} width="12" height="12" rx="3" className="b-svc-i" />
            <text x="406" y={ROWS[i] + 5}>
              {c}
            </text>
          </g>
        ))}
        <g className="b-node" style={{ ['--g' as string]: 1.6 }}>
          <path d="M516 62v76c0 9 17 15 38 15s38-6 38-15V62" className="b-db" />
          <ellipse cx="554" cy="62" rx="38" ry="14" className="b-db" />
          <path d="M516 88c0 9 17 15 38 15s38-6 38-15M516 113c0 9 17 15 38 15s38-6 38-15" className="b-db-l" />
          <text x="554" y="176" textAnchor="middle" className="b-sub b-sub-l">
            {t.db}
          </text>
        </g>
        <g className="b-node b-node-int" style={{ ['--g' as string]: 1.6 }}>
          <rect x="508" y="264" width="88" height="46" rx="12" />
          <text x="552" y="292" textAnchor="middle" className="b-int-t">
            {t.integrations}
          </text>
        </g>
        {live &&
          EDGES.map((e, i) => (
            <circle key={i} r="4" className="b-pkt">
              <animateMotion dur="1.6s" begin={`${0.9 + e.g * 0.45 + (i % 3) * 0.25}s`} repeatCount="indefinite" path={e.d} />
            </circle>
          ))}
      </svg>
    </div>
  )
}

function ClientIcon({ kind, x, y }: { kind: number; x: number; y: number }) {
  if (kind === 0)
    return (
      <g className="b-ci">
        <rect x={x - 8} y={y - 7} width="16" height="11" rx="2" />
        <path d={`M${x - 4} ${y + 8}h8`} />
      </g>
    )
  if (kind === 1)
    return (
      <g className="b-ci">
        <rect x={x - 5} y={y - 9} width="10" height="18" rx="2.5" />
      </g>
    )
  return (
    <g className="b-ci">
      <rect x={x - 8} y={y - 9} width="16" height="18" rx="2.5" />
      <circle cx={x} cy={y - 2} r="3" />
    </g>
  )
}
