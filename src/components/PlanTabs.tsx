'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Tab = { id: string; label: string; icon: string; hex: string }

// Separadores de produto na página de planos. Os ids (#time, #construction, #stock, #wood) são
// as âncoras antigas da página, por isso um link com #stock abre o separador certo.
// Sem JavaScript, o <noscript> mostra todos os painéis, um a seguir ao outro.
export default function PlanTabs({ tabs, panels, label }: { tabs: Tab[]; panels: ReactNode[]; label: string }) {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const fromHash = () => {
      const i = tabs.findIndex((t) => `#${t.id}` === window.location.hash)
      if (i >= 0) setActive(i)
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [tabs])

  const select = (i: number, focus = false) => {
    setActive(i)
    window.history.replaceState(null, '', `#${tabs[i].id}`)
    if (focus) refs.current[i]?.focus()
  }

  const onKey = (e: KeyboardEvent) => {
    const n = tabs.length
    const next = { ArrowRight: active + 1, ArrowLeft: active - 1 + n, Home: 0, End: n - 1 }[e.key]
    if (next === undefined) return
    e.preventDefault()
    select(next % n, true)
  }

  return (
    <div>
      <noscript>
        <style>{'.plan-panel[hidden]{display:block!important}.plan-tabs{display:none!important}'}</style>
      </noscript>
      <div role="tablist" aria-label={label} onKeyDown={onKey} className="plan-tabs grid grid-cols-2 gap-2 rounded-frame bg-white p-2 shadow-[0_18px_40px_-28px_rgba(6,8,60,.45)] md:grid-cols-4">
        {tabs.map((t, i) => {
          const on = i === active
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={on}
              aria-controls={t.id}
              tabIndex={on ? 0 : -1}
              onClick={() => select(i)}
              className={cn(
                'flex min-h-[52px] items-center justify-center gap-2 rounded-ctl px-3 font-semibold transition-colors duration-300',
                on ? 'text-white' : 'text-tinta hover:bg-papel',
              )}
              style={on ? { backgroundColor: t.hex } : undefined}
            >
              <span className={cn('grid h-7 w-7 place-items-center rounded-md', on && 'bg-white')}>
                <Image src={t.icon} alt="" width={24} height={24} className="h-5 w-5 object-contain" />
              </span>
              {t.label}
            </button>
          )
        })}
      </div>
      {panels.map((p, i) => (
        <div
          key={tabs[i].id}
          id={tabs[i].id}
          role="tabpanel"
          aria-labelledby={`tab-${tabs[i].id}`}
          hidden={i !== active}
          className="plan-panel scroll-mt-28 pt-10"
        >
          {p}
        </div>
      ))}
    </div>
  )
}
