'use client'

import { useState } from 'react'
import { useTabs } from '@/components/motion/useTabs'
import type { ConstructionDict } from '@/content/construction'

// Por perfil: a dor e o que ganha, em duas frases. Troca com crossfade de 150 ms.
export default function Profiles({ t }: { t: ConstructionDict['profiles'] }) {
  const [active, setActive] = useState(0)
  const { tab, panel } = useTabs('perfis', t.items.length, active, setActive)
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
      <div role="tablist" aria-label={t.label} aria-orientation="vertical" className="flex flex-col border-l border-caixa">
        {t.items.map((p, i) => (
          <button key={p.tab} {...tab(i)} onClick={() => setActive(i)} className="tab-btn tab-btn-v">
            {p.tab}
          </button>
        ))}
      </div>
      <div className="tab-stack is-quick">
        {t.items.map((p, i) => (
          <div key={p.tab} {...panel(i)} className="grid gap-6 outline-none sm:grid-cols-2">
            <div className="border-t-4 border-estado-erro bg-white p-6">
              <p className="text-small font-semibold text-grafite">{t.pain}</p>
              <p className="mt-2 text-lead">{p.pain}</p>
            </div>
            <div className="border-t-4 border-estado-valido bg-white p-6">
              <p className="text-small font-semibold text-grafite">{t.gain}</p>
              <p className="mt-2 text-lead">{p.gain}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
