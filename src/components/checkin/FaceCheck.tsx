import { cn } from '@/lib/utils'

export type FaceState = 'wait' | 'scan' | 'ok' | 'error'

// Micro-demo do reconhecimento facial, igual ao ecrã do tablet real (textos do staging, 29/09).
// Rosto geométrico em SVG, nunca uma fotografia. O estado vem do atributo data-state e as
// transições estão em globals.css (.fc): moldura de deteção, linha de scan, pontos que se ligam
// e o check com o único salto do site. Com "reduzir movimento" troca de estado sem movimento.
// Os textos do tablet ficam em português também na versão inglesa (é o que o ecrã mostra).

// Pontos de referência do rosto (coordenadas do viewBox 200 × 220).
const PTS: [number, number][] = [
  [100, 40], [72, 52], [128, 52], [58, 82], [142, 82], [78, 96], [122, 96],
  [100, 112], [88, 134], [112, 134], [100, 150], [66, 130], [134, 130], [100, 176],
]
// Ligações entre pontos (índices em PTS).
const LINKS = [
  [0, 1], [0, 2], [1, 3], [2, 4], [1, 5], [2, 6], [5, 7], [6, 7], [5, 6],
  [7, 8], [7, 9], [8, 10], [9, 10], [3, 11], [4, 12], [11, 8], [12, 9], [11, 13], [12, 13], [10, 13],
]
const MESH = LINKS.map(([a, b]) => `M${PTS[a][0]} ${PTS[a][1]}L${PTS[b][0]} ${PTS[b][1]}`).join('')

export default function FaceCheck({
  state,
  name = 'Rui',
  time = '07:42',
  compact,
  className,
}: {
  state: FaceState
  name?: string
  time?: string
  /** Sem a linha de texto de baixo (ecrãs muito pequenos). */
  compact?: boolean
  className?: string
}) {
  return (
    <div lang="pt-PT" data-state={state} className={cn('fc flex h-full flex-col text-white', className)} aria-hidden="true">
      {!compact && <p className="t-data text-center text-[13px] text-white/70">{time}</p>}
      <div className="relative min-h-0 flex-1">
        <svg viewBox="0 0 200 220" className="absolute inset-0 h-full w-full" fill="none">
          {/* Moldura de deteção: quatro cantos */}
          <g className="fc-frame" strokeWidth="4" strokeLinecap="round">
            <path pathLength={1} d="M24 56V28h28" />
            <path pathLength={1} d="M148 28h28v28" />
            <path pathLength={1} d="M176 164v28h-28" />
            <path pathLength={1} d="M52 192H24v-28" />
          </g>
          {/* Rosto: contorno e traços, finos */}
          <g className="fc-face" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round">
            <path d="M100 26L66 38 50 70 52 110 64 146 84 172 100 180 116 172 136 146 148 110 150 70 134 38z" />
            <path d="M70 88q10-6 20 0M110 88q10-6 20 0M100 96v30l-8 6M86 152q14 8 28 0" />
          </g>
          <path className="fc-mesh" pathLength={1} d={MESH} strokeWidth="1" />
          <g className="fc-pts">
            {PTS.map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="2.6" style={{ ['--i' as string]: i }} />
            ))}
          </g>
          {/* Confirmação */}
          <g className="fc-ok">
            <circle cx="160" cy="176" r="22" />
            <path pathLength={1} d="M150 176l7 7 13-14" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <g className="fc-err">
            <circle cx="160" cy="176" r="22" />
            <path d="M152 168l16 16M168 168l-16 16" strokeWidth="4.5" strokeLinecap="round" />
          </g>
        </svg>
        <span className="fc-scan" />
      </div>
      {!compact && (
        <div className="fc-text relative mt-2 h-[3.25rem] text-center">
          <p className="fc-line" data-for="wait">
            <span className="block text-[15px] font-bold leading-tight">Toca para registar</span>
            <span className="mt-1 block text-[13px] text-white/75">Entrar com PIN</span>
          </p>
          <p className="fc-line" data-for="scan">
            <span className="block text-[15px] font-bold leading-tight">A reconhecer rosto</span>
            <span className="mt-1 block text-[13px] text-white/75">Mantém-te quieto.</span>
          </p>
          <p className="fc-line" data-for="ok">
            <span className="block text-[15px] font-bold leading-tight">Olá, {name}!</span>
            <span className="mt-1 block text-[13px] font-semibold text-[#7BE3B8]">Presença registada</span>
          </p>
          <p className="fc-line" data-for="error">
            <span className="block text-[15px] font-bold leading-tight">Colaborador não encontrado!</span>
            <span className="mt-1 block text-[13px] text-white/75">Entrar com PIN</span>
          </p>
        </div>
      )}
    </div>
  )
}
