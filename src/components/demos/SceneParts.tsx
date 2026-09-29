import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Peças das cenas das demos (coordenadas de desenho em px; a cena inteira é escalada).

export function Browser({
  title,
  nav,
  active,
  className,
  children,
}: {
  title: string
  nav: string[]
  active: number
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('absolute flex flex-col overflow-hidden rounded-[14px] border border-tinta/15 bg-white shadow-[0_24px_60px_-30px_rgba(6,8,60,.5)]', className)}>
      <div className="flex items-center gap-2 border-b border-linha bg-papel px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        <span className="ml-4 rounded-md bg-white px-3 py-1 text-[13px] text-grafite">{title}</span>
      </div>
      <div className="flex min-h-0 flex-1">
        <nav className="w-[170px] shrink-0 border-r border-linha bg-papel/60 p-3 text-[15px]">
          {nav.map((n, i) => (
            <span
              key={n}
              className={cn('mb-1 block rounded-lg px-3 py-2', i === active ? 'bg-white font-semibold text-tinta shadow-sm' : 'text-grafite')}
              style={i === active ? { boxShadow: 'inset 3px 0 0 var(--accent)' } : undefined}
            >
              {n}
            </span>
          ))}
        </nav>
        <div className="relative min-w-0 flex-1 p-5 text-[15px]">{children}</div>
      </div>
    </div>
  )
}

export function Tablet({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('absolute rounded-[28px] bg-tinta p-3 shadow-[0_30px_60px_-30px_rgba(6,8,60,.8)]', className)}>
      <div className="relative h-full overflow-hidden rounded-[18px] border border-white/10 text-white">{children}</div>
    </div>
  )
}

export function Phone({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('absolute rounded-[34px] border-[7px] border-tinta bg-white shadow-[0_30px_60px_-30px_rgba(6,8,60,.8)]', className)}>
      <span className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-tinta" />
      <div className="relative h-full overflow-hidden rounded-[26px] px-4 pb-4 pt-9 text-[14px]">{children}</div>
    </div>
  )
}

export function Card({ title, className, children, focus }: { title?: string; className?: string; children: ReactNode; focus?: string }) {
  return (
    <div data-focus={focus} className={cn('rounded-xl border border-linha bg-white p-4', className)}>
      {title && <p className="mb-3 font-semibold text-tinta">{title}</p>}
      {children}
    </div>
  )
}

export function Tick({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={cn('h-4 w-4 shrink-0', className)} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5l3.2 3L13 4.5" />
    </svg>
  )
}

export function SampleTag({ text }: { text: string }) {
  return <span className="t-data absolute bottom-3 left-4 rounded bg-white/90 px-2 py-0.5 text-[12px] text-grafite">{text}</span>
}
