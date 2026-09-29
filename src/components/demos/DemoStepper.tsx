'use client'

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  id: string
  steps: string[]
  listLabel: string
  children: ReactNode
}

// Passos em texto (equivalente acessível) a controlar a demo visual ao lado.
// Sem JavaScript, a demo fica no último passo, com toda a informação visível.
// A animação ao scroll (Fase 4) muda de passo com o evento 'demo:step' no contentor.
export default function DemoStepper({ id, steps, listLabel, children }: Props) {
  const last = steps.length - 1
  const [step, setStep] = useState(last)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    // Se a demo ainda está abaixo do ecrã, começa no primeiro passo para ser vista a avançar.
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && entry.boundingClientRect.top > 0) setStep(0)
      io.disconnect()
    })
    io.observe(root)

    const onStep = (e: Event) => {
      const n = (e as CustomEvent<number>).detail
      if (Number.isInteger(n)) setStep(Math.max(0, Math.min(last, n)))
    }
    root.addEventListener('demo:step', onStep)
    return () => {
      io.disconnect()
      root.removeEventListener('demo:step', onStep)
    }
  }, [last])

  function go(n: number) {
    const next = (n + steps.length) % steps.length
    setStep(next)
    buttons.current[next]?.focus()
  }

  function onKeyDown(e: KeyboardEvent<HTMLOListElement>) {
    const keys: Record<string, number> = { ArrowDown: step + 1, ArrowRight: step + 1, ArrowUp: step - 1, ArrowLeft: step - 1, Home: 0, End: last }
    if (!(e.key in keys)) return
    e.preventDefault()
    go(keys[e.key])
  }

  return (
    <div ref={rootRef} data-demo={id} className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
      <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:order-2">
        <div className="demo" data-step={step} aria-hidden="true">
          {children}
        </div>
      </div>
      <ol aria-label={listLabel} onKeyDown={onKeyDown} className="border-t border-linha lg:order-1">
        {steps.map((text, i) => (
          <li key={text} className="border-b border-linha">
            <button
              ref={(el) => {
                buttons.current[i] = el
              }}
              type="button"
              aria-current={i === step ? 'step' : undefined}
              onClick={() => setStep(i)}
              className={cn(
                'grid w-full grid-cols-[3rem_minmax(0,1fr)] gap-2 border-l-2 py-5 pl-4 pr-2 text-left transition-colors',
                i === step ? 'border-azul bg-white' : 'border-transparent hover:bg-white/60',
              )}
            >
              <span className={cn('t-data', i === step ? 'text-azul' : 'text-grafite')} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="max-w-prose">{text}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
