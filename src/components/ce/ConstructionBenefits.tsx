'use client'

import type { ReactNode } from 'react'
import ScrollStory from '@/components/demos/ScrollStory'
import { StatusIcon } from '@/components/checkin/Badge'
import type { Locale } from '@/lib/seo.config'
import { cn } from '@/lib/utils'

// ConstructionEasier: as funcionalidades contadas ao descer (ScrollStory), uma por passo.
// Só funcionalidades já publicadas no site; dados de exemplo e empresas fictícias.

const T = {
  pt: {
    title: 'O que muda com o ConstructionEasier',
    intro: 'Da lista de obras ao auto de obra, tudo o que a direção e a obra precisam no mesmo sítio.',
    steps: [
      { title: 'Todas as obras num só painel', text: 'Obras em curso, a preparar e concluídas, cada uma com o seu estado e progresso. A administração vê tudo sem pedir relatórios.' },
      { title: 'Quem está em cada obra, agora', text: 'A lista de quem está a trabalhar em cada obra, com a hora de entrada e a empresa. O responsável recebe um alerta a cada entrada.' },
      { title: 'Subempreiteiros e as suas equipas', text: 'Cada empresa subempreiteira com os seus trabalhadores, por obra. Sabe sempre quem trabalha para quem.' },
      { title: 'Documentos em dia, por trabalhador', text: 'Válido, a expirar ou em falta: o estado dos documentos de cada pessoa e de cada empresa, antes de entrarem na obra.' },
      { title: 'Cada função vê o que precisa', text: 'Encarregado de Obra, Diretor de Obra, TSST e Encarregado Geral, cada um com as permissões certas.' },
      { title: 'O custo real de cada obra', text: 'Materiais e mão de obra somados por obra e por colaborador, para saber onde está o dinheiro.' },
      { title: 'Auto de obra sem papelada', text: 'O auto de obra é gerado automaticamente, com os documentos e anexos organizados por obra.' },
    ],
    sites: [
      ['Obra Marvila', 'Em curso', 0.72],
      ['Obra Rua das Flores', 'Em curso', 0.41],
      ['Obra Alcântara', 'A preparar', 0.08],
    ] as [string, string, number][],
    now: 'A trabalhar agora · Obra Marvila',
    people: [
      ['Rui Marques', 'Construções Marvila', '07:42'],
      ['Hugo Tavares', 'Cofragens Tejo', '07:58'],
      ['Paulo Sá', 'Eletro Douro', '08:05'],
    ],
    toast: 'Tiago F. entrou na obra',
    companies: [
      ['Construções Marvila', 'Própria', 14],
      ['Cofragens Tejo', 'Subempreiteiro', 9],
      ['Eletro Douro', 'Subempreiteiro', 6],
    ] as [string, string, number][],
    workers: 'trabalhadores',
    docs: 'Documentos dos trabalhadores',
    docRows: [
      ['Rui Marques', 'ok', 'Tudo válido'],
      ['Hugo Tavares', 'soon', 'Seguro expira em 9 dias'],
      ['Paulo Sá', 'missing', 'Falta 1 documento'],
    ] as [string, 'ok' | 'soon' | 'missing', string][],
    roles: ['Encarregado de Obra', 'Diretor de Obra', 'TSST', 'Encarregado Geral'],
    areas: ['Presenças', 'Documentos', 'Custos'],
    access: [
      [1, 1, 0],
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1],
    ],
    cost: 'Custo da obra · Marvila',
    materials: 'Materiais',
    labour: 'Mão de obra',
    report: 'Auto de obra n.º 7',
    month: 'Obra Marvila · setembro',
    generated: 'Gerado automaticamente',
    attachments: '12 anexos',
  },
  en: {
    title: 'What changes with ConstructionEasier',
    intro: 'From the list of sites to the progress report, everything management and the site need in one place.',
    steps: [
      { title: 'Every site on one dashboard', text: 'Sites in progress, being prepared and finished, each with its status and progress. Management sees it all without asking for reports.' },
      { title: 'Who is on each site, right now', text: 'The list of who is working on each site, with entry time and company. The person in charge gets an alert at each entry.' },
      { title: 'Subcontractors and their teams', text: 'Each subcontractor with its workers, per site. You always know who works for whom.' },
      { title: 'Documents up to date, per worker', text: 'Valid, expiring or missing: the status of each person’s and each company’s documents, before they go on site.' },
      { title: 'Each role sees what it needs', text: 'Site foreman, site manager, health and safety officer and general foreman, each with the right permissions.' },
      { title: 'The real cost of each site', text: 'Materials and labour added up per site and per employee, so you know where the money goes.' },
      { title: 'Progress reports without paperwork', text: 'The progress report (auto de obra) is generated automatically, with documents and attachments organised per site.' },
    ],
    sites: [
      ['Marvila site', 'In progress', 0.72],
      ['Rua das Flores site', 'In progress', 0.41],
      ['Alcântara site', 'Being prepared', 0.08],
    ] as [string, string, number][],
    now: 'Working now · Marvila site',
    people: [
      ['Rui Marques', 'Construções Marvila', '07:42'],
      ['Hugo Tavares', 'Cofragens Tejo', '07:58'],
      ['Paulo Sá', 'Eletro Douro', '08:05'],
    ],
    toast: 'Tiago F. entered the site',
    companies: [
      ['Construções Marvila', 'Own company', 14],
      ['Cofragens Tejo', 'Subcontractor', 9],
      ['Eletro Douro', 'Subcontractor', 6],
    ] as [string, string, number][],
    workers: 'workers',
    docs: 'Worker documents',
    docRows: [
      ['Rui Marques', 'ok', 'All valid'],
      ['Hugo Tavares', 'soon', 'Insurance expires in 9 days'],
      ['Paulo Sá', 'missing', '1 document missing'],
    ] as [string, 'ok' | 'soon' | 'missing', string][],
    roles: ['Site foreman', 'Site manager', 'H&S officer', 'General foreman'],
    areas: ['Attendance', 'Documents', 'Costs'],
    access: [
      [1, 1, 0],
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1],
    ],
    cost: 'Site cost · Marvila',
    materials: 'Materials',
    labour: 'Labour',
    report: 'Progress report no. 7',
    month: 'Marvila site · September',
    generated: 'Generated automatically',
    attachments: '12 attachments',
  },
}

type Dict = (typeof T)['pt']

const card = 'w-full max-w-[26rem] rounded-2xl bg-white p-5 shadow-[0_30px_60px_-30px_rgba(6,8,60,.5)]'
const tone = { ok: 'text-estado-valido', soon: 'text-estado-aviso', missing: 'text-estado-erro' }

function Screen({ i, t }: { i: number; t: Dict }): ReactNode {
  if (i === 0)
    return (
      <div className={card}>
        <ul className="space-y-3">
          {t.sites.map(([name, state, p], k) => (
            <li key={name} className="tb-rise rounded-xl border border-linha p-3" style={{ transitionDelay: `${100 + k * 150}ms` }}>
              <p className="flex items-center justify-between text-small">
                <span className="font-bold">{name}</span>
                <span className={cn('rounded-full px-2 py-0.5 text-data font-semibold', p > 0.1 ? 'bg-produto-obras-claro text-produto-obras' : 'bg-papel text-grafite')}>{state}</span>
              </p>
              <span className="mt-2 block h-2 rounded-full bg-papel">
                <span className="tb-bar block h-full origin-left rounded-full bg-produto-obras" style={{ width: `${p * 100}%`, transitionDelay: `${300 + k * 150}ms` }} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    )
  if (i === 1)
    return (
      <div className="relative w-full max-w-[26rem]">
        <div className={card}>
          <p className="flex items-center justify-between font-bold">
            {t.now}
            <span className="grid h-6 min-w-[1.5rem] place-items-center rounded-full bg-produto-obras px-1.5 text-data text-white">4</span>
          </p>
          <ul className="mt-3 divide-y divide-linha">
            {t.people.map(([n, c, h], k) => (
              <li key={n} className="tb-rise flex items-center gap-3 py-2.5" style={{ transitionDelay: `${100 + k * 150}ms` }}>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-produto-obras-claro text-data font-bold text-produto-obras">{n[0]}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-small font-semibold">{n}</span>
                  <span className="block text-data text-grafite">{c}</span>
                </span>
                <span className="t-data">{h}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="tb-alert absolute -bottom-5 right-4 flex items-center gap-2 rounded-xl bg-tinta px-3.5 py-2.5 text-small font-semibold text-white shadow-lg">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 text-ciano" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 16V11a6 6 0 0112 0v5l2 2H4zM10 21a2 2 0 004 0" />
          </svg>
          {t.toast} · 08:14
        </p>
      </div>
    )
  if (i === 2)
    return (
      <div className={card}>
        <ul className="space-y-3">
          {t.companies.map(([name, kind, n], k) => (
            <li key={name} className="tb-rise flex items-center gap-3" style={{ transitionDelay: `${100 + k * 160}ms` }}>
              <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl text-small font-bold', k === 0 ? 'bg-produto-obras text-white' : 'bg-produto-obras-claro text-produto-obras')}>
                {name
                  .split(' ')
                  .map((w) => w[0])
                  .join('')}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-small font-bold">{name}</span>
                <span className="block text-data text-grafite">{kind}</span>
              </span>
              <span className="flex -space-x-2 max-sm:hidden" aria-hidden="true">
                {Array.from({ length: 3 }, (_, a) => (
                  <span key={a} className="h-6 w-6 rounded-full border-2 border-white bg-produto-obras/30" />
                ))}
              </span>
              <span className="shrink-0 whitespace-nowrap text-right text-data text-grafite">
                <b className="text-tinta">{n}</b> {t.workers}
              </span>
            </li>
          ))}
        </ul>
      </div>
    )
  if (i === 3)
    return (
      <div className={card}>
        <p className="font-bold">{t.docs}</p>
        <ul className="mt-3 divide-y divide-linha">
          {t.docRows.map(([n, s, label], k) => (
            <li key={n} className="flex items-center gap-3 py-3">
              <span className="flex-1 text-small font-semibold">{n}</span>
              <span className={cn('tb-alert inline-flex items-center gap-1.5 text-[13px] font-bold', tone[s])} style={{ transitionDelay: `${250 + k * 250}ms` }}>
                <StatusIcon status={s} />
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    )
  if (i === 4)
    return (
      <div className={card}>
        <div className="grid grid-cols-[minmax(0,1fr)_repeat(3,4rem)] max-sm:text-[10px] sm:grid-cols-[minmax(0,1fr)_repeat(3,4.75rem)] items-center gap-y-2 text-[11px]">
          <span />
          {t.areas.map((a) => (
            <span key={a} className="text-center font-semibold text-grafite">
              {a}
            </span>
          ))}
          {t.roles.map((r, k) => (
            <div key={r} className="contents">
              <span className="text-small font-semibold">{r}</span>
              {t.access[k].map((on, a) => (
                <span key={a} className="grid place-items-center">
                  <span
                    className={cn('tb-day grid h-7 w-7 place-items-center rounded-lg', on ? 'bg-produto-obras text-white' : 'bg-papel text-linha')}
                    data-hit={on ? true : undefined}
                    style={on ? { transitionDelay: `${k * 120 + a * 60}ms` } : undefined}
                  >
                    {on ? '✓' : '–'}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  if (i === 5)
    return (
      <div className={card}>
        <p className="font-bold">{t.cost}</p>
        <p className="mt-1 text-[2rem] font-semibold leading-none text-produto-obras">€ 48 200</p>
        <div className="mt-4 flex h-4 overflow-hidden rounded-full bg-papel">
          <span className="tb-bar block h-full origin-left bg-produto-obras" style={{ width: '64%' }} />
          <span className="tb-bar block h-full origin-left bg-ciano" style={{ width: '36%', transitionDelay: '500ms' }} />
        </div>
        <div className="mt-3 flex flex-wrap justify-between gap-x-4 gap-y-1 text-small">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-produto-obras" />
            {t.materials} <b>€ 30 850</b>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-ciano" />
            {t.labour} <b>€ 17 350</b>
          </span>
        </div>
      </div>
    )
  return (
    <div className="relative w-full max-w-[18rem]">
      <div className="tb-done rounded-2xl border-t-[6px] border-produto-obras bg-white p-5 shadow-[0_30px_60px_-30px_rgba(6,8,60,.5)]">
        <p className="font-bold">{t.report}</p>
        <p className="text-data text-grafite">{t.month}</p>
        <div className="mt-4 space-y-2">
          {['90%', '75%', '85%', '60%', '80%'].map((w, k) => (
            <span key={k} className="block h-2 rounded-full bg-tinta/10" style={{ width: w }} />
          ))}
        </div>
        <p className="mt-4 flex items-center gap-1.5 text-data text-grafite">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11l-8.5 8.5a5 5 0 01-7-7L14 4a3.5 3.5 0 015 5l-8.5 8.5a2 2 0 01-3-3L15 7" />
          </svg>
          {t.attachments}
        </p>
      </div>
      <span className="tb-alert absolute -right-3 -top-3 inline-flex items-center gap-1 rounded-full bg-estado-valido px-3 py-1 text-data font-bold text-white shadow-md">✓ {t.generated}</span>
    </div>
  )
}

export default function ConstructionBenefits({ locale }: { locale: Locale }) {
  const t = T[locale]
  return (
    <ScrollStory
      headingId="beneficios-titulo"
      title={t.title}
      intro={t.intro}
      steps={t.steps}
      tint="bg-produto-obras-claro"
      accent="#1E7A45"
      screen={(i) => <Screen i={i} t={t} />}
    />
  )
}
