'use client'

import { useEffect, useRef, useState } from 'react'
import FaceCheck, { type FaceState } from './FaceCheck'
import Kiosk from './Kiosk'
import Badge, { StatusIcon } from './Badge'
import PauseButton from '@/components/motion/PauseButton'
import { usePlayback } from '@/components/motion/usePlayback'
import { LOOP_PAUSE } from '@/motion/tokens'
import { cn } from '@/lib/utils'

export type CheckInLabels = {
  summary: string
  detected: string
  company: string
  role: string
  verified: string
  verifiedText: string
  entry: string
  alert: string
  alertText: string
  pause: string
  play: string
}

// O momento memorável do site: um trabalhador chega à portaria, o tablet reconhece-o, a entrada
// fica registada e chega um aviso de documentação. Quatro widgets em HTML contam a história
// por ordem à volta da caixa do tablet. O ciclo repete devagar, pausa fora do ecrã, com a aba
// escondida e com o botão. Sem JavaScript ou com "reduzir movimento" fica no estado final.
//
// Passos: 0 espera · 1 a reconhecer (crachá detetado) · 2 rosto verificado · 3 entrada registada · 4 aviso.
const HOLD = [1400, 2300, 1500, 1500, LOOP_PAUSE + 1200]
const LAST = HOLD.length - 1
const FACE: FaceState[] = ['wait', 'scan', 'ok', 'ok', 'ok']

export default function CheckInHero({ t }: { t: CheckInLabels }) {
  const root = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const { running, reduced, paused, setPaused } = usePlayback(root)
  const [step, setStep] = useState(LAST)
  const [leaving, setLeaving] = useState(false)
  const started = useRef(false)

  // Arranca do início na primeira vez que pode animar.
  useEffect(() => {
    if (running && !started.current) {
      started.current = true
      setStep(0)
    }
  }, [running])

  useEffect(() => {
    if (!running || !started.current) return
    const id = window.setTimeout(() => {
      if (step < LAST) return setStep(step + 1)
      // Fim do ciclo: os widgets saem juntos e o tablet volta à espera.
      setLeaving(true)
      window.setTimeout(() => {
        setLeaving(false)
        setStep(0)
      }, 420)
    }, HOLD[step])
    return () => window.clearTimeout(id)
  }, [step, running])

  // Parallax subtil ao ponteiro, só em desktop com rato e sem "reduzir movimento" (máx. 6 px).
  useEffect(() => {
    const el = stage.current
    if (!el || reduced || !window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches) return
    let raf = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1))
        const y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1))
        el.style.setProperty('--px', x.toFixed(3))
        el.style.setProperty('--py', y.toFixed(3))
      })
    }
    const host = el.closest('section') ?? el
    host.addEventListener('pointermove', onMove as EventListener)
    return () => {
      cancelAnimationFrame(raf)
      host.removeEventListener('pointermove', onMove as EventListener)
    }
  }, [reduced])

  const face = FACE[step]

  return (
    <div ref={root} className="checkin" data-step={step} data-leaving={leaving || undefined}>
      <p className="sr-only">{t.summary}</p>
      <div ref={stage} aria-hidden="true" className="checkin-stage relative">
        <Kiosk className="checkin-kiosk">
          <FaceCheck state={face} name="Rui" time="07:42" />
        </Kiosk>

        <ol className="checkin-widgets">
          <li className="w" data-n="1" data-side="left" style={{ ['--d' as string]: 1 }}>
            <div className="w-par">
              <div className="w-card">
                <p className="w-kicker">{t.detected}</p>
                <Badge name="Rui Marques" company={t.company} role={t.role} size="sm" className="mt-2" />
              </div>
            </div>
          </li>
          <li className="w" data-n="2" data-side="right" style={{ ['--d' as string]: 0.7 }}>
            <div className="w-par">
              <div className="w-card flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-estado-valido text-white">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3.5 8.5l3 3 6-7" />
                  </svg>
                </span>
                <span>
                  <span className="block font-semibold leading-tight">{t.verified}</span>
                  <span className="block text-[13px] text-grafite">{t.verifiedText}</span>
                </span>
              </div>
            </div>
          </li>
          <li className="w" data-n="3" data-side="right" style={{ ['--d' as string]: 1.1 }}>
            <div className="w-par">
              <div className="w-card w-entry">
                <p className="font-semibold leading-snug">{t.entry}</p>
              </div>
            </div>
          </li>
          <li className="w" data-n="4" data-side="left" style={{ ['--d' as string]: 0.85 }}>
            <div className="w-par">
              <div className="w-card w-alert flex gap-3">
                <StatusIcon status="soon" className="mt-0.5" />
                <span>
                  <span className="block font-semibold leading-snug">{t.alert}</span>
                  <span className="block text-[13px] text-grafite">{t.alertText}</span>
                </span>
              </div>
            </div>
          </li>
        </ol>
      </div>
      <PauseButton paused={paused} onToggle={() => setPaused(!paused)} labels={t} className={cn('checkin-pause mt-2')} />
    </div>
  )
}
