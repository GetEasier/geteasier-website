'use client'

import { useEffect, useRef, useState } from 'react'
import { useSeenOnce } from '@/components/motion/usePlayback'
import { cn } from '@/lib/utils'

type Stat = { value: number | null; suffix: string; label: string }

// Contadores que sobem uma única vez quando entram no ecrã. Sem número confirmado mostram
// [CONFIRMAR] (nunca um número inventado). Sem JS ou com "reduzir movimento", o valor final.
// Tiles: um bloco de cor por número, nas cores dos produtos (início).
const TILES = ['bg-produto-time-claro text-produto-time', 'bg-produto-obras-claro text-produto-obras', 'bg-produto-stock-claro text-produto-stock']

export default function Stats({ items, note, tiles }: { items: Stat[]; note?: string; tiles?: boolean }) {
  const ref = useRef<HTMLDListElement>(null)
  const seen = useSeenOnce(ref, 0.5)
  return (
    <div>
      <dl ref={ref} className={cn('grid sm:grid-cols-3', tiles ? 'gap-3 lg:grid-cols-1' : 'gap-6')}>
        {items.map((s, i) => (
          <div key={s.label} className={cn('flex flex-col', tiles ? cn('rounded-frame p-5', TILES[i % TILES.length]) : 'border-t-2 border-tinta pt-3')}>
            <dt className={cn('mt-2 text-small font-semibold', tiles ? 'text-tinta' : 'text-grafite')}>{s.label}</dt>
            <dd className="t-data order-first text-[2.25rem] font-medium leading-none">
              {s.value == null ? (
                <span className="inline-block rounded-full border border-dashed border-current px-3 py-1 text-small font-semibold">[CONFIRMAR]</span>
              ) : (
                <Count to={s.value} run={seen} suffix={s.suffix} />
              )}
            </dd>
          </div>
        ))}
      </dl>
      {note && <p className="mt-4 text-small text-grafite">{note}</p>}
    </div>
  )
}

export function Count({ to, run, suffix = '', duration = 1200 }: { to: number; run: boolean; suffix?: string; duration?: number }) {
  const [n, setN] = useState(to)
  const done = useRef(false)
  // Com movimento, começa em zero até entrar no ecrã; sem JS fica o valor final.
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setN((v) => (done.current ? v : 0))
  }, [])
  useEffect(() => {
    if (!run || done.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    done.current = true
    let raf = 0
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, to, duration])
  return (
    <>
      <span aria-hidden="true">
        {n.toLocaleString('pt-PT')}
        {suffix}
      </span>
      <span className="sr-only">
        {to.toLocaleString('pt-PT')}
        {suffix}
      </span>
    </>
  )
}
