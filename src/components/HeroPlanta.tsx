// Momento assinatura: planta de linhas de um sistema real (tablet na obra → servidor → obras).
// Estático e completo por defeito; a animação só acrescenta o traçado. Usado em software à medida.

import type { Locale } from '@/lib/seo.config'

const TEXT = {
  pt: {
    labels: { gate: 'portaria', tablet: 'tablet', server: 'servidor · API', siteA: 'Rua das Flores', siteB: 'Av. Central', recordName: 'Rui M.', recordSite: 'Rua das Flores' },
    caption:
      'Desenho de um sistema: o tablet na portaria de uma obra envia um registo ao servidor, que o associa à obra certa. O registo mostra 07:58, Rui M., Rua das Flores. Dados fictícios.',
  },
  en: {
    labels: { gate: 'site gate', tablet: 'tablet', server: 'server · API', siteA: 'Rua das Flores', siteB: 'Av. Central', recordName: 'Rui M.', recordSite: 'Rua das Flores' },
    caption:
      'Drawing of a system: the tablet at a construction site gate sends a record to the server, which links it to the right site. The record shows 07:58, Rui M., Rua das Flores. Fictitious data.',
  },
}

export default function HeroPlanta({ locale }: { locale: Locale }) {
  const { labels, caption } = TEXT[locale]
  return (
    <figure className="relative" data-planta>
      <svg viewBox="0 0 560 440" className="h-auto w-full" aria-hidden="true" focusable="false">
        <defs>
          <pattern id="planta-grelha" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="#C9D1DE" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="560" height="440" fill="url(#planta-grelha)" opacity="0.7" />

        <g fill="none" stroke="#06083C" strokeWidth="1.5" strokeLinejoin="round" className="planta-traco">
          {/* Portaria com tablet */}
          <path d="M30 150h140v130H30z" />
          <path d="M30 150l20-22h140l-20 22M190 128v130l-20 22" strokeWidth="1" />
          <rect x="62" y="176" width="76" height="58" rx="5" />
          {/* Servidor */}
          <path d="M250 170h110v90H250z" />
          <path d="M250 200h110M250 230h110" strokeWidth="1" />
          {/* Obras */}
          <path d="M430 96h104v78H430z" />
          <path d="M430 96l52-30 52 30" strokeWidth="1" />
          <path d="M430 276h104v78H430z" />
          <path d="M430 276l52-30 52 30" strokeWidth="1" />
        </g>

        {/* Malha abstrata de um rosto no tablet: pontos, não uma fotografia */}
        <g fill="#06083C" className="planta-rosto">
          {[
            [100, 188], [92, 191], [108, 191], [86, 197], [114, 197], [84, 205], [116, 205], [86, 213], [114, 213],
            [92, 220], [108, 220], [100, 223], [94, 202], [106, 202], [100, 208], [96, 215], [104, 215],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.6" />
          ))}
        </g>

        {/* Fluxos */}
        <g fill="none" stroke="#1B54B8" strokeWidth="2" className="planta-fluxo">
          <path id="fluxo-principal" d="M170 215H250" />
          <path d="M360 215h35V135h35" />
          <path d="M360 215h35v100h35" strokeDasharray="4 5" stroke="#4A5263" strokeWidth="1.5" />
        </g>

        {/* Cotas */}
        <g stroke="#4A5263" strokeWidth="1" className="planta-cota">
          <path d="M30 318v14M170 318v14M30 325h140" />
          <path d="M250 140v14M360 140v14M250 147h110" />
        </g>

        <g style={{ fontFamily: 'var(--font-plex-mono), monospace' }} fill="#4A5263" fontSize="12">
          <text x="30" y="300">{labels.gate}</text>
          <text x="62" y="252">{labels.tablet}</text>
          <text x="266" y="282">{labels.server}</text>
          <text x="430" y="194">{labels.siteA}</text>
          <text x="430" y="374">{labels.siteB}</text>
        </g>

        {/* Registo: o que o sistema guardou */}
        <g className="planta-registo">
          <path d="M256 260v122" fill="none" stroke="#1B54B8" strokeWidth="1" strokeDasharray="3 4" />
          <g transform="translate(30 382)">
            <rect width="298" height="44" rx="4" fill="#fff" stroke="#06083C" strokeWidth="1.5" />
            <rect width="6" height="44" fill="#0F7A5C" />
            <path d="M22 22l5 5 10-11" fill="none" stroke="#0F7A5C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <text x="50" y="27" style={{ fontFamily: 'var(--font-plex-mono), monospace' }} fontSize="14" fontWeight="500" fill="#06083C">
              07:58
            </text>
            <text x="100" y="27" style={{ fontFamily: 'var(--font-plex-mono), monospace' }} fontSize="13" fill="#06083C">
              {labels.recordName} · {labels.recordSite}
            </text>
          </g>
        </g>

        <circle cx="170" cy="215" r="5" fill="#18DDBA" stroke="#06083C" strokeWidth="1" className="planta-sinal" />
      </svg>
      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  )
}
