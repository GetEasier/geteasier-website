'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { CustomSoftwareDict } from '@/content/custom-software'

// Arquitetura de um sistema de gestão genérico em forma de placa de circuito, montada ao scroll: cada
// passo do texto acende uma camada (canais → acesso → serviços → dados e eventos → integrações →
// operação), e as pistas acesas passam a ter impulsos de luz a correr. O painel (passos + diagrama) fica preso ao ecrã enquanto se desce a pista, e o progresso
// dentro dela escolhe a camada; no telemóvel só se vê o passo atual, com pontos de progresso.
// Sem JavaScript fica tudo aceso; com "reduzir movimento" acende sem traçado nem impulsos.

type Props = {
  t: Pick<CustomSoftwareDict, 'arch' | 'archLabels' | 'archFigure'>
  icons: Record<string, ReactNode>
}

const ALL = 6

// Placa de circuito (viewBox 600 × 540): cada peça é um chip com pinos e ícone, ligado aos outros por
// pistas com curvas a 45°. Por cada pista acesa corre um impulso de luz (stroke-dashoffset), só enquanto
// a placa está no ecrã e parado durante o scroll.
type Chip = { x: number; y: number; w: number; h: number }
const CH: Chip[] = [24, 168, 312, 456].map((x) => ({ x, y: 22, w: 120, h: 44 }))
const ACC: Chip = { x: 150, y: 116, w: 300, h: 48 }
const SV: Chip[] = [24, 136, 248, 360, 472].map((x) => ({ x, y: 214, w: 104, h: 44 }))
const BUS: Chip = { x: 24, y: 300, w: 552, h: 26 }
const DB: Chip[] = [
  { x: 24, y: 372, w: 114, h: 44 },
  { x: 146, y: 372, w: 96, h: 44 },
  { x: 250, y: 372, w: 86, h: 44 },
]
const IN: Chip[] = [
  { x: 352, y: 360, w: 108, h: 40 },
  { x: 468, y: 360, w: 108, h: 40 },
  { x: 352, y: 412, w: 108, h: 40 },
  { x: 468, y: 412, w: 108, h: 40 },
]
const cx = (c: Chip) => c.x + c.w / 2

// Pista ortogonal de (x1,y1) a (x2,y2): desce, vira a 45°, segue na horizontal e volta a descer.
function trace(x1: number, y1: number, x2: number, y2: number, ym = (y1 + y2) / 2) {
  const dx = x2 - x1
  if (Math.abs(dx) < 1) return `M${x1} ${y1}V${y2}`
  const r = Math.min(10, Math.abs(dx) / 2, (y2 - y1) / 2)
  const sx = Math.sign(dx)
  return `M${x1} ${y1}V${ym - r}L${x1 + sx * r} ${ym}H${x2 - sx * r}L${x2} ${ym + r}V${y2}`
}

const ACC_PINS_TOP = [180, 250, 350, 420]
const ACC_PINS_BOTTOM = [190, 250, 300, 350, 410]
const TRACES: { layer: number; d: string }[] = [
  ...CH.map((c, i) => ({ layer: 2, d: trace(cx(c), c.y + c.h, ACC_PINS_TOP[i], ACC.y, 92) })),
  ...SV.map((c, i) => ({ layer: 3, d: trace(ACC_PINS_BOTTOM[i], ACC.y + ACC.h, cx(c), c.y, 190) })),
  ...SV.map((c) => ({ layer: 4, d: `M${cx(c)} ${c.y + c.h}V${BUS.y}` })),
  ...DB.map((c) => ({ layer: 4, d: `M${cx(c)} ${BUS.y + BUS.h}V${c.y}` })),
  ...IN.slice(0, 2).map((c) => ({ layer: 5, d: `M${cx(c)} ${BUS.y + BUS.h}V${c.y}` })),
  ...IN.slice(2).map((c) => ({ layer: 5, d: `M${cx(c)} ${c.y - 12}V${c.y}` })),
]

// Ícones de 16 × 16 em traço (tipo lucide), desenhados dentro dos chips.
const I: Record<string, string> = {
  web: 'M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M1.5 8h13M8 1.5c1.8 1.9 2.6 4 2.6 6.5S9.8 12.6 8 14.5C6.2 12.6 5.4 10.5 5.4 8S6.2 3.4 8 1.5',
  app: 'M5 1.5h6a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1M7.2 12.2h1.6',
  portal: 'M6 7.2a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8M1.5 13.5c.5-2.4 2.2-3.7 4.5-3.7s4 1.3 4.5 3.7M10.8 2.6a2.4 2.4 0 0 1 0 4.4M12.3 9.9c1.2.5 1.9 1.7 2.2 3.6',
  kiosk: 'M2.5 2.5h11v8h-11zM6 13.5h4M8 10.5v3',
  shield: 'M8 1.5 13 3.5v4c0 3.2-2.1 5.6-5 7-2.9-1.4-5-3.8-5-7v-4zM5.8 8l1.6 1.6L10.4 6.6',
  orders: 'M2 2.5h2l1.6 7.5h6.9L14 5H4.6M6.5 13a1 1 0 1 0 0-.1M11.5 13a1 1 0 1 0 0-.1',
  invoice: 'M3.5 1.5h6l3 3v10h-9zM6 8h4.5M6 11h3',
  stock: 'M8 1.5l6 3v7l-6 3-6-3v-7zM2 4.5l6 3 6-3M8 7.5v7',
  hr: 'M8 7.2a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2M3 14c.6-2.6 2.5-4 5-4s4.4 1.4 5 4',
  approve: 'M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M5.3 8.2l1.8 1.8 3.6-3.8',
  db: 'M8 1.8c3 0 5.5.9 5.5 2s-2.5 2-5.5 2-5.5-.9-5.5-2 2.5-2 5.5-2M2.5 3.8v8.4c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2V3.8M2.5 8c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2',
  files: 'M2 4.5h4l1.5 1.5H14v7.5H2z',
  cache: 'M9 1.5 3.5 9H8l-1 5.5L12.5 7H8z',
  erp: 'M2.5 14.5v-9l4 2.5v-2.5l4 2.5V3.5h3v11z',
  bank: 'M2 6 8 2.5 14 6zM3.5 6.5v5.5M6.5 6.5v5.5M9.5 6.5v5.5M12.5 6.5v5.5M2 14h12',
  tax: 'M3.5 1.5h9v13l-2-1.3-2.5 1.3-2.5-1.3-2 1.3zM6 5.5h4M6 8.5h4',
  mail: 'M2 3.5h12v9H2zM2 4l6 4.5L14 4',
}
const ICON_KEYS = {
  channels: ['web', 'app', 'portal', 'kiosk'],
  services: ['orders', 'invoice', 'stock', 'hr', 'approve'],
  data: ['db', 'files', 'cache'],
  integrations: ['erp', 'bank', 'tax', 'mail'],
}

function ChipEl({ c, label, icon, small, kind }: { c: Chip; label: string; icon?: string; small?: boolean; kind?: string }) {
  const pins = Math.max(2, Math.floor(c.w / 22))
  const gap = c.w / (pins + 1)
  const iconX = icon ? 8 : 0
  return (
    <g transform={`translate(${c.x} ${c.y})`} className={cn('cb-chip', kind && `cb-${kind}`)}>
      {Array.from({ length: pins }, (_, i) => (
        <g key={i} className="cb-pins">
          <rect x={gap * (i + 1) - 2} y={-4} width="4" height="4" rx="1" />
          <rect x={gap * (i + 1) - 2} y={c.h} width="4" height="4" rx="1" />
        </g>
      ))}
      <rect width={c.w} height={c.h} rx="8" className="cb-body" />
      <rect width={c.w} height={c.h} rx="8" className="cb-edge" />
      {icon && (
        <g transform={`translate(${iconX} ${c.h / 2 - 8})`}>
          <rect x="-3" y="-3" width="22" height="22" rx="6" className="cb-icon-bg" />
          <path d={I[icon]} className="cb-icon" />
        </g>
      )}
      <text x={icon ? iconX + 23 : c.w / 2} y={c.h / 2 + 4.5} textAnchor={icon ? 'start' : 'middle'} className={cn('arch-label', small && 'cb-label')}>
        {label}
      </text>
    </g>
  )
}

export default function ArchitectureScroll({ t, icons }: Props) {
  const track = useRef<HTMLDivElement>(null)
  const [stage, setStage] = useState(ALL)

  useEffect(() => {
    const el = track.current
    if (!el) return
    // Os impulsos de luz só correm com a placa no ecrã.
    const fig = el.querySelector('.cs-arch')
    let raf = 0
    const update = () => {
      raf = 0
      // Progresso dentro da pista: 0 quando o painel fica preso, 1 quando se solta.
      const pin = el.firstElementChild as HTMLElement
      const r = el.getBoundingClientRect()
      const top = parseFloat(getComputedStyle(pin).top) || 0
      const run = r.height - pin.offsetHeight
      const p = run > 0 ? (top - r.top) / run : 1
      setStage(p < -0.02 ? 0 : Math.min(ALL, Math.floor(Math.max(0, p) * ALL) + 1))
    }
    // Durante o scroll os impulsos param (o browser só tem de pintar a placa quando ela muda) e
    // retomam 200 ms depois de parar.
    let idle = 0
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
      fig?.classList.add('is-scrolling')
      window.clearTimeout(idle)
      idle = window.setTimeout(() => fig?.classList.remove('is-scrolling'), 200)
    }
    const io = new IntersectionObserver(([e]) => fig?.classList.toggle('is-live', e.isIntersecting))
    if (fig) io.observe(fig)
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      io.disconnect()
      window.clearTimeout(idle)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const L = t.archLabels
  const layer = (n: number) => cn('arch-layer', stage >= n && 'is-on', stage === n && 'is-current')
  const layers = [
    CH.map((c, i) => <ChipEl key={i} c={c} label={L.channels[i]} icon={ICON_KEYS.channels[i]} small />),
    <ChipEl key="acc" c={ACC} label={L.access} icon="shield" small kind="accent" />,
    SV.map((c, i) => <ChipEl key={i} c={c} label={L.services[i]} icon={ICON_KEYS.services[i]} small />),
    <>
      <g transform={`translate(${BUS.x} ${BUS.y})`} className="cb-chip cb-bus">
        <rect width={BUS.w} height={BUS.h} rx="13" className="cb-body" />
        <rect width={BUS.w} height={BUS.h} rx="13" className="cb-edge" />
        <path d={`M16 ${BUS.h / 2}H${BUS.w - 16}`} pathLength="100" className="cb-bus-flow" />
        <text x={BUS.w / 2} y={BUS.h / 2 + 4} textAnchor="middle" className="arch-label arch-small arch-muted">
          {L.bus}
        </text>
      </g>
      {DB.map((c, i) => (
        <ChipEl key={i} c={c} label={L.data[i]} icon={ICON_KEYS.data[i]} small />
      ))}
    </>,
    IN.map((c, i) => <ChipEl key={i} c={c} label={L.integrations[i]} icon={ICON_KEYS.integrations[i]} small kind="ext" />),
    <>
      <rect x="6" y="6" width="588" height="528" rx="16" className="arch-frame" />
      <g transform="translate(24 486)" className="cb-chip cb-ops">
        <rect width="552" height="32" rx="10" className="cb-body" />
        <rect width="552" height="32" rx="10" className="cb-edge" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={18 + i * 13} cy="16" r="3.5" className="arch-dot" style={{ animationDelay: `${i * 0.4}s` }} />
        ))}
        <text x="66" y="20.5" className="arch-label arch-small">
          {L.ops}
        </text>
      </g>
    </>,
  ]

  return (
    <div ref={track} className="cs-arch-track">
      <div className="cs-arch-pin">
        <div className="lg:order-2">
          <figure className="cs-arch" data-stage={stage}>
            {/* Cada camada é um SVG próprio por cima da base: ao acender só muda a opacidade desse plano,
                que o browser compõe sem repintar a placa (o scroll fica fluido mesmo em telemóveis lentos). */}
            <div className="cb-board" aria-hidden="true">
              <svg viewBox="0 0 600 540" focusable="false">
                <defs>
                  <pattern id="cb-vias" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="12" cy="12" r="1" className="cb-via" />
                  </pattern>
                </defs>
                <rect width="600" height="540" rx="14" fill="url(#cb-vias)" />
                {TRACES.map((tr, i) => (
                  <path key={i} d={tr.d} className="cb-trace-base" />
                ))}
              </svg>
              {layers.map((content, i) => (
                <svg key={i} viewBox="0 0 600 540" focusable="false" className={layer(i + 1)}>
                  {TRACES.map((tr, j) =>
                    tr.layer === i + 1 ? (
                      <g key={j}>
                        <path d={tr.d} className="cb-trace" />
                        <path d={tr.d} pathLength="100" className="cb-pulse" style={{ animationDelay: `${(j * 0.37) % 2.2}s` }} />
                      </g>
                    ) : null,
                  )}
                  {content}
                </svg>
              ))}
            </div>
            <figcaption className="sr-only">{t.archFigure}</figcaption>
          </figure>
        </div>

        <div className="lg:order-1">
          <ol className="cs-arch-steps">
            {t.arch.map((item, i) => (
              <li
                key={item.key}
                data-arch-item
                className={cn('cs-proof-item', Math.max(stage, 1) === i + 1 && 'is-on', stage > i + 1 && 'is-done')}
                data-c={i % 5}
              >
                <span className="cs-icon">{icons[item.key]}</span>
                <div className="min-w-0">
                  <h3 className="font-semibold leading-snug">{item.term}</h3>
                  <p className="mt-0.5 text-small text-white/75">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <ol aria-hidden="true" className="cs-arch-dots">
            {t.arch.map((item, i) => (
              <li key={item.key} className={cn(stage >= i + 1 && 'is-on')} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
