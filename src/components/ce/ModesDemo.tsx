'use client'

import { useEffect, useState } from 'react'
import Kiosk from '@/components/checkin/Kiosk'
import FaceCheck, { type FaceState } from '@/components/checkin/FaceCheck'
import DocRead from './DocRead'
import GateFeed from './GateFeed'
import { useTabs } from '@/components/motion/useTabs'
import type { ConstructionDict } from '@/content/construction'

type T = ConstructionDict

// "O que acontece à entrada da obra": três modos, cada um com a sua micro-demo, que corre uma vez
// por escolha. A troca é uma transição de estado (o painel que sai encolhe e desvanece, o novo
// entra), nunca um corte seco.
export default function ModesDemo({ t, feed }: { t: T['modes']; feed: T['gateFeed'] }) {
  const [active, setActive] = useState(0)
  const [run, setRun] = useState(0)
  const { tab, panel } = useTabs('modos', t.items.length, active, (i) => {
    setActive(i)
    setRun((r) => r + 1)
  })

  return (
    <div>
      <div role="tablist" aria-label={t.label} className="flex flex-wrap border-b border-caixa">
        {t.items.map((m, i) => (
          <button key={m.id} {...tab(i)} onClick={() => (setActive(i), setRun((r) => r + 1))} className="tab-btn">
            {m.tab}
          </button>
        ))}
      </div>
      <div className="tab-stack mt-8">
        {t.items.map((m, i) => (
          <div key={m.id} {...panel(i)} className="grid gap-8 outline-none lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:items-center">
            <div>
              {i === 0 && <FaceOnce run={active === 0 ? run : -1} />}
              {i === 1 && <DocRead t={t.doc} run={active === 1 ? run : 0} />}
              {i === 2 && <GateFeed t={feed} withKiosk={false} />}
            </div>
            <div>
              <p className="text-lead">{m.text}</p>
              <p className="mt-3 text-grafite">{m.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Reconhecimento uma vez: espera, a reconhecer, reconhecido.
function FaceOnce({ run }: { run: number }) {
  const [state, setState] = useState<FaceState>('ok')
  useEffect(() => {
    if (run < 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const z = window.setTimeout(() => setState('wait'), 0)
    const a = window.setTimeout(() => setState('scan'), 700)
    const b = window.setTimeout(() => setState('ok'), 3000)
    return () => {
      window.clearTimeout(z)
      window.clearTimeout(a)
      window.clearTimeout(b)
    }
  }, [run])
  return (
    <div aria-hidden="true">
      <Kiosk className="max-w-[14rem]">
        <FaceCheck state={state} />
      </Kiosk>
    </div>
  )
}
