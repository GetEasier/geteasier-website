'use client'

import { useEffect, useRef, useState } from 'react'
import Kiosk from './Kiosk'
import FaceCheck, { type FaceState } from './FaceCheck'
import { usePlayback } from '@/components/motion/usePlayback'
import { LOOP_PAUSE } from '@/motion/tokens'

const STEPS: [FaceState, number][] = [
  ['wait', 1600],
  ['scan', 2300],
  ['ok', LOOP_PAUSE + 800],
]

// Quiosque em loop: espera, a reconhecer, "Presença registada", volta à espera. Pausa fora do
// ecrã, com a aba escondida e com o botão; com "reduzir movimento" fica no estado final.
export default function KioskLoop({ labels, label }: { labels: { pause: string; play: string; summary: string }; label?: string }) {
  const root = useRef<HTMLDivElement>(null)
  const { running } = usePlayback(root)
  const [i, setI] = useState(2)
  useEffect(() => {
    if (!running) return
    const id = window.setTimeout(() => setI((v) => (v + 1) % STEPS.length), STEPS[i][1])
    return () => window.clearTimeout(id)
  }, [running, i])
  return (
    <div ref={root}>
      <p className="sr-only">{labels.summary}</p>
      <div aria-hidden="true">
        <Kiosk className="max-w-[15rem]" label={label}>
          <FaceCheck state={STEPS[i][0]} />
        </Kiosk>
      </div>
    </div>
  )
}
