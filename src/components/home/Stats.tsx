'use client'

import { useEffect, useRef, useState } from 'react'
import { useSeenOnce } from '@/components/motion/usePlayback'

type Stat = { value: number | null; suffix: string; label: string }

// Contadores que sobem uma única vez quando entram no ecrã. Sem número confirmado mostram
// [CONFIRMAR] (nunca um número inventado). Sem JS ou com "reduzir movimento", o valor final.
export default function Stats({ items, note }: { items: Stat[]; note?: string }) {
  const ref = useRef<HTMLDListElement>(null)
  const seen = useSeenOnce(ref, 0.5)
  return (
    <div>
      <dl ref={ref} className="grid gap-6 sm:grid-cols-3">
        {items.map((s) => (
          <div key={s.label} className="flex flex-col border-t-2 border-tinta pt-3">
            <dt className="mt-2 text-small font-semibold text-grafite">{s.label}</dt>
            <dd className="t-data order-first text-[2.25rem] font-medium leading-none">
              {s.value == null ? '[CONFIRMAR]' : <Count to={s.value} run={seen} suffix={s.suffix} />}
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
