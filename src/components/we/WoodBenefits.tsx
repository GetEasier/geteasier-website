'use client'

import type { ReactNode } from 'react'
import ScrollStory from '@/components/demos/ScrollStory'
import { StatusIcon } from '@/components/checkin/Badge'
import type { Locale } from '@/lib/seo.config'

// WoodEasier: o percurso de um lote, contado ao descer (ScrollStory). Dados de exemplo.

const T = {
  pt: {
    title: 'O que muda com o WoodEasier',
    intro: 'Um lote de madeira, da receção à expedição.',
    steps: [
      { title: 'Cada lote registado à chegada', text: 'A madeira entra e fica um lote com o material e a quantidade. Sem cadernos nem folhas soltas.' },
      { title: 'O tratamento fica registado', text: 'A temperatura e a duração de cada tratamento ficam guardadas no lote.' },
      { title: 'O passaporte sai do lote', text: 'Com o tratamento feito, o WoodEasier gera o passaporte da madeira tratada.' },
      { title: 'A DGAV sem correrias', text: 'Os relatórios e comprovativos saem prontos e, numa inspeção, o histórico de cada lote está à mão.' },
    ],
    lot: 'Lote L-0142',
    fields: [
      ['Material', 'Paletes 1200 × 800'],
      ['Quantidade', '240'],
      ['Entrada', '29 set · 08:12'],
    ],
    received: 'Rececionado',
    treatment: 'Tratamento térmico',
    minutes: 'min',
    passport: 'Passaporte',
    generated: 'Gerado',
    reports: [
      ['Relatório para a DGAV', 'Pronto'],
      ['Comprovativos de tratamento', '12'],
      ['Histórico do lote', 'Completo'],
    ],
  },
  en: {
    title: 'What changes with WoodEasier',
    intro: 'One timber lot, from arrival to shipping.',
    steps: [
      { title: 'Every lot recorded on arrival', text: 'Timber comes in and becomes a lot with its material and quantity. No notebooks or loose sheets.' },
      { title: 'The treatment is on record', text: 'Each treatment’s temperature and duration are stored with the lot.' },
      { title: 'The passport comes from the lot', text: 'Once treated, WoodEasier generates the treated timber passport.' },
      { title: 'DGAV without the rush', text: 'Reports and certificates come out ready and, at an inspection, each lot’s history is at hand.' },
    ],
    lot: 'Lot L-0142',
    fields: [
      ['Material', 'Pallets 1200 × 800'],
      ['Quantity', '240'],
      ['Arrival', '29 Sep · 08:12'],
    ],
    received: 'Received',
    treatment: 'Heat treatment',
    minutes: 'min',
    passport: 'Passport',
    generated: 'Generated',
    reports: [
      ['Report for DGAV', 'Ready'],
      ['Treatment certificates', '12'],
      ['Lot history', 'Complete'],
    ],
  },
}

type Dict = (typeof T)['pt']

const card = 'w-full max-w-[25rem] rounded-2xl bg-white p-5 shadow-[0_30px_60px_-30px_rgba(6,8,60,.5)]'

function Screen({ i, t }: { i: number; t: Dict }): ReactNode {
  if (i === 0)
    return (
      <div className={card}>
        <p className="flex items-center justify-between font-bold">
          {t.lot}
          <span className="tb-done inline-flex items-center gap-1.5 rounded-full bg-[#E3F4EC] px-2.5 py-1 text-data font-bold text-estado-valido">
            <StatusIcon status="ok" />
            {t.received}
          </span>
        </p>
        <dl className="mt-3 divide-y divide-linha">
          {t.fields.map(([k, v], n) => (
            <div key={k} className="tb-rise flex justify-between py-2.5 text-small" style={{ transitionDelay: `${150 + n * 180}ms` }}>
              <dt className="text-grafite">{k}</dt>
              <dd className="font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    )
  if (i === 1)
    return (
      <div className={card}>
        <p className="flex items-center justify-between font-bold">
          {t.treatment}
          <span className="t-data text-produto-wood">{t.lot.split(' ')[1]}</span>
        </p>
        <svg viewBox="0 0 300 144" className="mt-3 w-full" fill="none" aria-hidden="true">
          <path d="M20 120h270" stroke="#C9D1DE" />
          <path d="M20 40h270" stroke="#4A5263" strokeDasharray="4 4" />
          <text x="290" y="32" textAnchor="end" fontSize="13" fontWeight="700" fill="#7A3E1C">56 °C</text>
          <path className="tb-draw" pathLength={1} d="M20 118C60 116 80 44 120 40h120c18 0 30 40 50 70" stroke="#7A3E1C" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M120 126h120M120 122v8M240 122v8" stroke="#4A5263" strokeWidth="1" />
          <text x="180" y="139" textAnchor="middle" fontSize="11" fill="#4A5263">30 {t.minutes}</text>
        </svg>
      </div>
    )
  if (i === 2)
    return (
      <div className="tb-done relative w-full max-w-[17rem] rounded-2xl border-t-[6px] border-produto-wood bg-white p-5 shadow-[0_30px_60px_-30px_rgba(6,8,60,.5)]">
        <p className="text-data uppercase tracking-wide text-grafite">{t.passport}</p>
        <p className="mt-1 font-bold">{t.lot}</p>
        <div className="mt-4 flex items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block h-2 w-28 rounded-full bg-tinta/15" />
            <span className="block h-2 w-20 rounded-full bg-tinta/15" />
            <span className="block h-2 w-24 rounded-full bg-tinta/15" />
          </div>
          <span className="grid h-16 w-16 grid-cols-5 gap-0.5 rounded-md border border-linha p-1">
            {Array.from({ length: 25 }, (_, k) => (
              <span key={k} className={(k * 7 + 3) % 3 ? 'bg-tinta' : 'bg-white'} />
            ))}
          </span>
        </div>
        <span className="tb-alert absolute -right-3 -top-3 inline-flex items-center gap-1 rounded-full bg-estado-valido px-3 py-1 text-data font-bold text-white shadow-md">
          ✓ {t.generated}
        </span>
      </div>
    )
  return (
    <div className={card}>
      <p className="font-bold">DGAV</p>
      <ul className="mt-3 divide-y divide-linha">
        {t.reports.map(([name, state], k) => (
          <li key={name} className="tb-rise flex items-center gap-3 py-3 text-small" style={{ transitionDelay: `${150 + k * 220}ms` }}>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-produto-wood" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 3H6v18h12V7zM14 3v4h4M9 14l2 2 4-4" />
            </svg>
            <span className="flex-1 font-semibold">{name}</span>
            <span className="inline-flex items-center gap-1.5 text-data font-semibold text-estado-valido">
              <StatusIcon status="ok" />
              {state}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function WoodBenefits({ locale }: { locale: Locale }) {
  const t = T[locale]
  return (
    <ScrollStory
      headingId="beneficios-titulo"
      title={t.title}
      intro={t.intro}
      steps={t.steps}
      tint="bg-produto-wood-claro"
      accent="#7A3E1C"
      screen={(i) => <Screen i={i} t={t} />}
    />
  )
}
