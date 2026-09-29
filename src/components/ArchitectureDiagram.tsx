import type { Locale } from '@/lib/seo.config'

// Diagrama de arquitetura da plataforma TimeEasier/ConstructionEasier.
// Cada grupo tem data-node igual à chave do texto que o explica (a Fase 4 acende-os ao scroll).

const L = {
  pt: {
    tablet: ['Tablet', 'no local'],
    app: ['App', 'iOS e Android'],
    web: ['Aplicação', 'web'],
    api: 'API',
    tenants: ['Empresa A', 'Empresa B', 'Empresa C'],
    data: 'dados separados por empresa',
    bio: ['Identificação', 'pelo rosto'],
    integ: ['ERP, salários,', 'sistemas públicos'],
    infra: ['CI/CD e', 'observabilidade'],
  },
  en: {
    tablet: ['Tablet', 'on site'],
    app: ['App', 'iOS and Android'],
    web: ['Web', 'application'],
    api: 'API',
    tenants: ['Company A', 'Company B', 'Company C'],
    data: 'data kept apart per company',
    bio: ['Face', 'identification'],
    integ: ['ERP, payroll,', 'public systems'],
    infra: ['CI/CD and', 'observability'],
  },
}

function Box({ x, y, w, h, lines }: { x: number; y: number; w: number; h: number; lines: string[] }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="3" className="arch-box" />
      {lines.map((line, i) => (
        <text key={line} x={x + 14} y={y + 24 + i * 17} className="arch-text">
          {line}
        </text>
      ))}
    </g>
  )
}

export default function ArchitectureDiagram({ locale, caption }: { locale: Locale; caption: string }) {
  const t = L[locale]
  return (
    <figure data-arch>
      <svg viewBox="0 0 520 402" className="h-auto w-full" aria-hidden="true" focusable="false">
        <style>{`
          .arch-box{fill:none;stroke:rgba(255,255,255,.55);stroke-width:1.4}
          .arch-text{fill:#fff;font-family:var(--font-plex-mono),monospace;font-size:12px}
          .arch-line{fill:none;stroke:rgba(255,255,255,.45);stroke-width:1.4}
          [data-node].is-on .arch-box{stroke:#18DDBA;stroke-width:2}
          [data-node].is-on .arch-line{stroke:#18DDBA}
        `}</style>

        <g data-node="clients">
          <Box x={10} y={10} w={150} h={62} lines={t.tablet} />
          <Box x={185} y={10} w={150} h={62} lines={t.app} />
          <Box x={360} y={10} w={150} h={62} lines={t.web} />
          <path className="arch-line" d="M85 72v48M260 72v48M435 72v48" />
        </g>

        <g data-node="tenants">
          <rect x="10" y="120" width="500" height="150" rx="3" className="arch-box" />
          <text x="24" y="146" className="arch-text">
            {t.api}
          </text>
          <text x="496" y="146" className="arch-text" textAnchor="end" opacity="0.75">
            {t.data}
          </text>
          {t.tenants.map((name, i) => (
            <g key={name}>
              <rect x={24 + i * 162} y={162} width={148} height={40} rx="2" className="arch-box" />
              <text x={36 + i * 162} y={187} className="arch-text">
                {name}
              </text>
              <path className="arch-line" d={`M${98 + i * 162} 202v18`} />
              <ellipse cx={98 + i * 162} cy={226} rx="26" ry="6" className="arch-box" />
              <path className="arch-line" d={`M${72 + i * 162} 226v20a26 6 0 0 0 52 0v-20`} />
            </g>
          ))}
        </g>

        <g data-node="biometrics">
          <path className="arch-line" d="M85 270v60" />
          <Box x={10} y={330} w={150} h={62} lines={t.bio} />
        </g>
        <g data-node="integrations">
          <path className="arch-line" d="M260 270v60" />
          <Box x={185} y={330} w={150} h={62} lines={t.integ} />
        </g>
        <g data-node="infra">
          <path className="arch-line" d="M435 270v60" />
          <Box x={360} y={330} w={150} h={62} lines={t.infra} />
        </g>

      </svg>
      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  )
}
