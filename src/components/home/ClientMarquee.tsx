'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { useMarquee } from '@/components/motion/useMarquee'
import { usePlayback } from '@/components/motion/usePlayback'
import { CLIENTS } from '@/content/home'

// Clientes: os logótipos passam devagar numa faixa contínua, com as pontas a desvanecer, e também se
// deslizam à mão (useMarquee). Para com o rato ou o foco em cima, fora do ecrã e com a aba escondida. Sem JS ou com
// "reduzir movimento", os cinco ficam numa grelha parada.
export default function ClientMarquee({ title }: { title: string }) {
  const root = useRef<HTMLDivElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const { running } = usePlayback(root)
  useMarquee(viewport, track, { seconds: 38, running })

  return (
    <div ref={root} className="clientes">
      <div className="flex items-center justify-center gap-3">
        <h2 id="clientes-titulo" className="text-center text-small font-semibold uppercase tracking-[0.08em] text-grafite">
          {title}
        </h2>
      </div>
      <div ref={viewport} className="clientes-viewport mt-7">
        <div ref={track} className="clientes-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="clientes-set" aria-hidden={copy === 1 || undefined}>
              {[...CLIENTS, ...CLIENTS].map((client, i) => (
                <li key={`${client.name}-${i}`} className="clientes-tile" aria-hidden={i >= CLIENTS.length || undefined}>
                  {client.logo ? (
                    <Image src={client.logo} alt={copy === 0 && i < CLIENTS.length ? client.name : ''} width={160} height={64} className="max-h-14 w-auto object-contain" />
                  ) : (
                    <span className="clientes-nome">
                      <span className="block text-[1.05rem] font-semibold leading-tight tracking-[-0.01em] text-tinta">{client.name}</span>
                      {client.sub && <span className="mt-1 block text-[0.72rem] leading-snug text-grafite">{client.sub}</span>}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}
