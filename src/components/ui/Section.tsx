import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  id?: string
  title: string
  intro?: string
  children: ReactNode
  className?: string
  dark?: boolean
  headingLevel?: 'h2' | 'h3'
}

// Secção com filete no topo e régua de cota à esquerda. Sem cartões nem fundos alternados.
export default function Section({ id, title, intro, children, className, dark, headingLevel = 'h2' }: Props) {
  const H = headingLevel
  const headingId = id ? `${id}-titulo` : undefined
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(dark ? 'bg-tinta text-white' : 'border-t border-linha', 'py-16 md:py-24', className)}
    >
      <div className="wrap">
        <div className={cn(!dark && 'ruled')}>
          <H id={headingId} className="t-h2 max-w-[28ch]">
            {title}
          </H>
          {intro && <p className={cn('mt-4 max-w-prose text-lead', dark ? 'text-white/80' : 'text-grafite')}>{intro}</p>}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
