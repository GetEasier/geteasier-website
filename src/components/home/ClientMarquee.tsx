'use client'

import Image from 'next/image'
import { useRef } from 'react'
import PauseButton from '@/components/motion/PauseButton'
import { usePlayback } from '@/components/motion/usePlayback'
import { CLIENTS } from '@/content/home'

// Clientes: os logótipos passam devagar numa faixa contínua, com as pontas a desvanecer. Para com o
// rato ou o foco em cima, fora do ecrã, com a aba escondida e com o botão (WCAG 2.2.2). Sem JS ou com
// "reduzir movimento", os cinco ficam numa grelha parada.
export default function ClientMarquee({ title, labels }: { title: string; labels: { pause: string; play: string } }) {
  const root = useRef<HTMLDivElement>(null)
  const { running, paused, setPaused } = usePlayback(root)

  return (
    <div ref={root} className="clientes" data-run={running || undefined}>
      <div className="flex items-center justify-center gap-3">
        <h2 id="clientes-titulo" className="text-center text-small font-semibold uppercase tracking-[0.08em] text-grafite">
          {title}
        </h2>
      </div>
      <div className="clientes-viewport mt-7">
        <div className="clientes-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="clientes-set" aria-hidden={copy === 1 || undefined}>
              {[...CLIENTS, ...CLIENTS].map((client, i) => (
                <li key={`${client.name}-${i}`} className="clientes-tile" aria-hidden={i >= CLIENTS.length || undefined}>
                  <Image src={client.logo} alt={copy === 0 && i < CLIENTS.length ? client.name : ''} width={160} height={64} className="max-h-14 w-auto object-contain" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="mt-3 flex justify-center">
        <PauseButton paused={paused} onToggle={() => setPaused(!paused)} labels={labels} />
      </div>
    </div>
  )
}
