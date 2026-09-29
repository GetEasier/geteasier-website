'use client'

import { useEffect, useState } from 'react'
import type { ConstructionDict } from '@/content/construction'

type Doc = ConstructionDict['modes']['doc']

// Leitura de documento [CONFIRMAR]: cartão ID-1 genérico, cinzento, sem brasão nem o desenho
// do Cartão de Cidadão, com dados claramente fictícios. O feixe passa, os campos destacam-se e
// preenchem a ficha um a um. Corre uma vez por escolha (run muda) e com "reduzir movimento" mostra
// o resultado. Sem vista JSON (acessório retirado na Fase 1).
export default function DocRead({ t, run }: { t: Doc; run: number }) {
  const [state, setState] = useState<'idle' | 'scan' | 'done'>('done')

  useEffect(() => {
    if (!run || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const z = window.setTimeout(() => setState('idle'), 0)
    const a = window.setTimeout(() => setState('scan'), 300)
    const b = window.setTimeout(() => setState('done'), 1700)
    return () => {
      window.clearTimeout(z)
      window.clearTimeout(a)
      window.clearTimeout(b)
    }
  }, [run])

  return (
    <div className="doc grid items-center gap-6 sm:grid-cols-2" data-state={state}>
      <div className="doc-card relative overflow-hidden" aria-hidden="true">
        <div className="flex items-center justify-between text-[12px] font-semibold text-tinta/70">
          <span>{t.card}</span>
          <span>{t.sample}</span>
        </div>
        <div className="mt-3 flex gap-3">
          <span className="doc-photo shrink-0" />
          <dl className="grid min-w-0 gap-1.5 text-[12px]">
            {t.fields.map((f, i) => (
              <div key={f.k} className="doc-field" style={{ ['--i' as string]: i }}>
                <dt className="text-tinta/60">{f.k}</dt>
                <dd className="t-data truncate font-medium">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <span className="doc-beam" />
      </div>
      <div className="doc-form border border-caixa bg-white p-4">
        <p className="font-semibold">{t.form}</p>
        <dl className="mt-3 grid gap-2 text-small">
          {t.fields.map((f, i) => (
            <div key={f.k} className="grid grid-cols-[8.5rem_1fr] items-center gap-2">
              <dt className="text-grafite">{f.k}</dt>
              <dd className="doc-input t-data border-b border-caixa pb-1" style={{ ['--i' as string]: i }}>
                <span>{f.v}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
