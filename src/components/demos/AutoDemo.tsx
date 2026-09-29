'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  steps: string[]
  labels: { pause: string; play: string; step: string; list: string }
  accent: string
  children: ReactNode
}

// Demo que avança sozinha, passo a passo, enquanto está visível no ecrã.
// Tem pausa (movimento com mais de 5 s) e botões para cada passo. Com "reduzir movimento",
// ou sem JavaScript, fica parada no último passo, que mostra toda a informação.
// O texto de todos os passos está numa lista para leitores de ecrã; a parte visual é aria-hidden.
export default function AutoDemo({ steps, labels, accent, children }: Props) {
  const last = steps.length - 1
  const [step, setStep] = useState(last)
  const [playing, setPlaying] = useState(true)
  const [visible, setVisible] = useState(false)
  const [motionOk, setMotionOk] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: no-preference)')
    const onChange = () => setMotionOk(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 })
    if (ref.current) io.observe(ref.current)
    return () => {
      mq.removeEventListener('change', onChange)
      io.disconnect()
    }
  }, [])

  const running = playing && visible && motionOk
  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => setStep((s) => (s + 1) % steps.length), 2800)
    return () => window.clearInterval(id)
  }, [running, steps.length])

  return (
    <div ref={ref}>
      <ol className="sr-only" aria-label={labels.list}>
        {steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      <div className="demo" data-step={step} aria-hidden="true" style={{ "--accent": accent } as React.CSSProperties}>
        {children}
      </div>
      <p aria-hidden="true" className="mt-4 min-h-[3.2em] max-w-prose text-small text-grafite">
        <span className="t-data mr-2" style={{ color: accent }}>
          {String(step + 1).padStart(2, '0')}
        </span>
        {steps[step]}
      </p>
      <div className="mt-3 flex items-center gap-2">
        {steps.map((s, i) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setStep(i)
              setPlaying(false)
            }}
            aria-label={`${labels.step} ${i + 1}`}
            aria-current={i === step ? 'step' : undefined}
            className="grid h-8 w-8 place-items-center rounded-full"
          >
            <span
              className={cn('block h-2.5 rounded-full transition-all duration-300', i === step ? 'w-6' : 'w-2.5 bg-linha')}
              style={i === step ? { backgroundColor: accent } : undefined}
            />
          </button>
        ))}
        {motionOk && (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-pressed={!playing}
            className="ml-auto flex min-h-[32px] items-center gap-2 rounded-full px-3 text-small font-medium text-grafite ring-1 ring-linha hover:bg-white"
          >
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor" aria-hidden="true">
              {playing ? <path d="M2 1h3v10H2zM7 1h3v10H7z" /> : <path d="M2 1l9 5-9 5z" />}
            </svg>
            {playing ? labels.pause : labels.play}
          </button>
        )}
      </div>
    </div>
  )
}
