import Link from 'next/link'
import type { CustomSoftwareDict } from '@/content/custom-software'
import { ARROW, BUILD_ICONS } from './icons'

// O que construímos, em mosaico: cada tipo de trabalho com uma mini ilustração do que entregamos
// (painel de gestão, app de tarefas, integrações a circular, várias empresas, suporte). Só HTML,
// SVG e CSS; com "reduzir movimento" fica tudo parado.
const AREAS = ['web', 'mobile', 'int', 'tenants', 'support'] as const
const BARS = [0.45, 0.62, 0.5, 0.78, 0.66, 0.9, 0.82, 0.7]
const NODES = [
  [40, 28],
  [220, 28],
  [40, 122],
  [220, 122],
]

type Props = {
  t: Pick<CustomSoftwareDict, 'build' | 'buildCta' | 'mocks'>
  contact: string
}

export default function BuildBento({ t, contact }: Props) {
  const m = t.mocks
  const mocks = [
    <div key="web" className="bm-web">
      <span className="bm-side">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="bm-main">
        <span className="bm-kpis">
          <b />
          <b />
          <b />
        </span>
        <span className="bm-bars">
          {BARS.map((h, i) => (
            <i key={i} style={{ ['--h' as string]: h, animationDelay: `${i * 0.18}s` }} />
          ))}
        </span>
      </span>
    </div>,
    <div key="mobile" className="bm-phone">
      <span className="bm-notch" />
      <span className="bm-phone-title">{m.mobile.title}</span>
      {m.mobile.items.map((item, i) => (
        <span key={item} className="bm-task" data-done={i < 2 || undefined}>
          <span className="bm-check" />
          {item}
        </span>
      ))}
      <span className="bm-phone-btn">{m.mobile.done}</span>
    </div>,
    <svg key="int" viewBox="0 0 260 150" className="bm-int" aria-hidden="true">
      {NODES.map(([x, y], i) => (
        <path key={i} id={`bm-l${i}`} d={`M${x} ${y} L130 75`} className="bm-int-link" />
      ))}
      {NODES.map((_, i) => (
        <circle key={i} r="3.5" className="bm-int-dot">
          <animateMotion dur="2.4s" begin={`${i * 0.6}s`} repeatCount="indefinite" keyPoints={i % 2 ? '1;0' : '0;1'} keyTimes="0;1" calcMode="linear">
            <mpath href={`#bm-l${i}`} />
          </animateMotion>
        </circle>
      ))}
      <rect x="78" y="58" width="104" height="34" rx="10" className="bm-int-core" />
      <text x="130" y="79" textAnchor="middle" className="bm-int-core-text">
        {m.integrations.center}
      </text>
      {NODES.map(([x, y], i) => (
        <g key={m.integrations.nodes[i]}>
          <rect x={x - 34} y={y - 13} width="68" height="26" rx="13" className="bm-int-node" />
          <text x={x} y={y + 4} textAnchor="middle" className="bm-int-text">
            {m.integrations.nodes[i]}
          </text>
        </g>
      ))}
    </svg>,
    <div key="tenants" className="bm-tenants">
      {m.tenants.map((name, i) => (
        <span key={name} className="bm-tenant" data-c={i}>
          <b>{name}</b>
          <i />
          <i />
        </span>
      ))}
    </div>,
    <div key="support" className="bm-chat">
      <span className="bm-bubble bm-bubble-q">{m.support[0]}</span>
      <span className="bm-bubble bm-bubble-a">{m.support[1]}</span>
    </div>,
  ]

  return (
    <ul className="bento mt-10">
      {t.build.map((item, i) => (
        <li key={item.term} className="reveal-panel bento-card" data-c={i} data-area={AREAS[i]}>
          <div className="relative flex items-start gap-4">
            <span className="cs-icon">{BUILD_ICONS[i]}</span>
            <div className="min-w-0">
              <h3 className="font-semibold leading-snug">{item.term}</h3>
              <p className="mt-1 text-small text-grafite">{item.desc}</p>
            </div>
          </div>
          <div aria-hidden="true" className="bento-mock">
            {mocks[i]}
          </div>
        </li>
      ))}
      <li className="reveal-panel" data-area="cta">
        <Link href={contact} className="bento-card bento-cta h-full">
          <span className="relative flex items-start gap-4">
            <span className="cs-icon">{ARROW}</span>
            <span className="min-w-0">
              <span className="block text-lead font-semibold leading-snug">{t.buildCta.term}</span>
              <span className="mt-1 block text-small text-white/80">{t.buildCta.desc}</span>
            </span>
          </span>
        </Link>
      </li>
    </ul>
  )
}
