'use client'

import { useEffect, useRef, useState } from 'react'
import Kiosk from '@/components/checkin/Kiosk'
import FaceCheck, { type FaceState } from '@/components/checkin/FaceCheck'
import Badge from '@/components/checkin/Badge'
import PauseButton from '@/components/motion/PauseButton'
import { usePlayback } from '@/components/motion/usePlayback'
import type { ConstructionDict } from '@/content/construction'
import { loadGsap, reducedMotion, type Kit } from '@/motion/gsap'
import { DUR, EASE, LOOP_PAUSE } from '@/motion/tokens'
import { cn } from '@/lib/utils'

type T = ConstructionDict['gateFeed']
type Person = { name: string; company: string; time: string }

const OWN = 'Construções Marvila'
// Pessoas fictícias. As três primeiras já estão na obra; as outras chegam pela portaria.
const START: Person[] = [
  { name: 'Carla Nunes', company: OWN, time: '07:31' },
  { name: 'Paulo Sá', company: 'Eletro Douro', time: '07:36' },
  { name: 'Tiago Ferreira', company: OWN, time: '07:38' },
]
const ARRIVALS: Person[] = [
  { name: 'Rui Marques', company: 'Cofragens Tejo', time: '07:42' },
  { name: 'Ana Figueiredo', company: 'Eletro Douro', time: '07:55' },
  { name: 'Hugo Tavares', company: 'Cofragens Tejo', time: '07:58' },
]
const COMPANIES = [OWN, 'Cofragens Tejo', 'Eletro Douro']
const FACE_STEPS: [FaceState, number][] = [
  ['wait', 1300],
  ['scan', 2300],
  ['ok', LOOP_PAUSE],
]

// Quiosque na portaria e feed "A Trabalhar Agora" lado a lado: cada rosto reconhecido entra no
// topo da lista (Flip), o contador sobe e o filtro por empresa reorganiza a lista (Flip).
// Pausa fora do ecrã, com a aba escondida e com o botão. Sem JS ou com "reduzir movimento",
// a lista fica com todas as pessoas e o tablet no estado final.
export default function GateFeed({ t, withKiosk = true }: { t: T; withKiosk?: boolean }) {
  const root = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const kit = useRef<Kit | null>(null)
  const { running, paused, setPaused } = usePlayback(root)
  const [people, setPeople] = useState<Person[]>(() => [...ARRIVALS].reverse().concat(START))
  const [filter, setFilter] = useState<string | null>(null)
  const [face, setFace] = useState(0)
  const [next, setNext] = useState(-1)

  useEffect(() => {
    if (reducedMotion()) return
    loadGsap().then((k) => (kit.current = k))
  }, [])

  // Flip: guarda as posições antes da mudança e anima depois de o React atualizar.
  const flipState = useRef<ReturnType<Kit['Flip']['getState']> | null>(null)
  const snapshot = () => {
    const Flip = kit.current?.Flip
    if (Flip && list.current) flipState.current = Flip.getState(list.current.querySelectorAll('[data-flip-id]'))
  }
  useEffect(() => {
    const k = kit.current
    const state = flipState.current
    if (!k || !state || !list.current) return
    flipState.current = null
    k.Flip.from(state, {
      targets: list.current.querySelectorAll('[data-flip-id]'),
      duration: DUR.ui * 1.6,
      ease: EASE.estado,
      absolute: true,
      onEnter: (els) => k.gsap.fromTo(els, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: DUR.reveal, ease: EASE.entrada }),
      onLeave: (els) => k.gsap.to(els, { opacity: 0, duration: DUR.micro }),
    })
  }, [people, filter])

  // Com movimento, a demonstração começa com os três que já estavam na obra.
  const started = useRef(false)
  useEffect(() => {
    if (!running || started.current || !withKiosk) return
    started.current = true
    setPeople(START)
    setNext(0)
    setFace(0)
  }, [running, withKiosk])

  useEffect(() => {
    if (!running || next < 0 || !withKiosk) return
    const id = window.setTimeout(() => {
      if (face < FACE_STEPS.length - 1) {
        const f = face + 1
        setFace(f)
        if (FACE_STEPS[f][0] === 'ok') {
          snapshot()
          setPeople((p) => [ARRIVALS[next], ...p])
        }
        return
      }
      if (next === ARRIVALS.length - 1) {
        snapshot()
        setPeople(START)
        setNext(0)
      } else setNext(next + 1)
      setFace(0)
    }, FACE_STEPS[face][1])
    return () => window.clearTimeout(id)
  }, [running, face, next, withKiosk])

  const current = next >= 0 ? ARRIVALS[next] : ARRIVALS[ARRIVALS.length - 1]
  const faceState: FaceState = next >= 0 ? FACE_STEPS[face][0] : 'ok'
  const shown = filter ? people.filter((p) => p.company === filter) : people
  const choose = (c: string | null) => {
    snapshot()
    setFilter(c)
  }

  return (
    <div ref={root} className={cn('grid gap-8', withKiosk && 'lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-start')}>
      {withKiosk && (
        <div>
          <p className="sr-only">{t.summary}</p>
          <div aria-hidden="true">
            <Kiosk className="max-w-[15rem]" label={t.kiosk}>
              <FaceCheck state={faceState} name={current.name.split(' ')[0]} time={current.time} />
            </Kiosk>
          </div>
        </div>
      )}
      <div className="border border-caixa bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-caixa px-4 py-3">
          <p className="font-semibold">{t.feed}</p>
          <p className="text-small font-semibold text-estado-valido" aria-live="polite">
            {t.present.replace('{n}', String(shown.length))}
          </p>
        </div>
        <div role="group" aria-label={t.filter} className="flex flex-wrap gap-1 border-b border-caixa px-3 py-2">
          {[null, ...COMPANIES].map((c) => (
            <button
              key={c ?? 'all'}
              type="button"
              aria-pressed={filter === c}
              onClick={() => choose(c)}
              className="min-h-[36px] rounded-[4px] px-3 text-small font-semibold text-grafite transition-colors duration-150 hover:text-tinta aria-pressed:bg-tinta aria-pressed:text-white"
            >
              {c ?? t.all}
            </button>
          ))}
        </div>
        <ul ref={list} className="grid gap-2 p-3 sm:grid-cols-2">
          {shown.map((p) => (
            <li key={p.name} data-flip-id={p.name}>
              <Badge name={p.name} company={p.company} time={p.time} size="sm" />
            </li>
          ))}
        </ul>
        {withKiosk && (
          <div className="flex justify-end border-t border-caixa px-2">
            <PauseButton paused={paused} onToggle={() => setPaused(!paused)} labels={t} />
          </div>
        )}
      </div>
    </div>
  )
}
