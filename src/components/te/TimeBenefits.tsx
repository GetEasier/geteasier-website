'use client'

import type { ReactNode } from 'react'
import ScrollStory from '@/components/demos/ScrollStory'
import FaceCheck from '@/components/checkin/FaceCheck'
import { StatusIcon } from '@/components/checkin/Badge'
import type { Locale } from '@/lib/seo.config'
import { cn } from '@/lib/utils'

// TimeEasier: o que muda na empresa, contado ao descer (ScrollStory). Dados de exemplo.

const T = {
  pt: {
    title: 'O que muda com o TimeEasier',
    intro: 'Do primeiro registo do dia ao relatório do fim do mês.',
    steps: [
      { title: 'Picagem pelo rosto, à entrada', text: 'O colaborador toca no tablet e o rosto confirma quem é. Acabam as folhas de ponto e as picagens pelo colega.' },
      { title: 'Quem trabalha fora regista na app', text: 'Na obra, no cliente ou na estrada: a entrada fica com a hora e o local onde foi feita.' },
      { title: 'Férias e ausências num só mapa', text: 'Vê quem está de férias ou ausente antes de organizar a semana.' },
      { title: 'O responsável aprova a sua equipa', text: 'Cada chefe de equipa revê os registos das suas pessoas e aprova-os.' },
      { title: 'Documentos com alerta de validade', text: 'Contratos, recibos e formações de cada pessoa num só sítio. Recebe um aviso antes de um documento expirar.' },
      { title: 'O fim do mês sem contas à mão', text: 'O relatório de horas de cada colaborador sai pronto, de acordo com o Art. 202.º do Código do Trabalho.' },
    ],
    app: { place: 'Av. Central', action: 'Entrada registada' },
    holidays: { month: 'Outubro', people: ['Ana S.', 'Rui M.', 'Carla P.', 'Hugo T.'], vac: 'Férias', abs: 'Ausência' },
    approve: { title: 'Registos da equipa', pending: 'Pendente', ok: 'Aprovado' },
    docs: { who: 'Rui M.', items: ['Contrato de trabalho', 'Recibo de setembro', 'Formação'], ok: 'Válido', soon: 'Expira em 12 dias' },
    report: { title: 'Relatório mensal · setembro', done: 'Pronto a exportar' },
  },
  en: {
    title: 'What changes with TimeEasier',
    intro: 'From the first clock-in of the day to the month-end report.',
    steps: [
      { title: 'Clocking in by face, at the entrance', text: 'The employee taps the tablet and their face confirms who they are. No more paper timesheets or clocking in for a colleague.' },
      { title: 'People working away clock in on the app', text: 'On site, at a client or on the road: each entry keeps the time and the place it was made.' },
      { title: 'Holidays and absences on one map', text: 'See who is on holiday or away before planning the week.' },
      { title: 'Team leaders approve their team', text: 'Each team leader reviews their people’s records and approves them.' },
      { title: 'Documents with expiry alerts', text: 'Contracts, payslips and training records for each person in one place. You get a warning before a document expires.' },
      { title: 'Month end without manual sums', text: 'Each employee’s hours report comes out ready, in line with Article 202 of the Portuguese Labour Code.' },
    ],
    app: { place: 'Av. Central', action: 'Clock-in recorded' },
    holidays: { month: 'October', people: ['Ana S.', 'Rui M.', 'Carla P.', 'Hugo T.'], vac: 'Holiday', abs: 'Absence' },
    approve: { title: 'Team records', pending: 'Pending', ok: 'Approved' },
    docs: { who: 'Rui M.', items: ['Employment contract', 'September payslip', 'Training'], ok: 'Valid', soon: 'Expires in 12 days' },
    report: { title: 'Monthly report · September', done: 'Ready to export' },
  },
}

type Dict = (typeof T)['pt']

// Os cinco ecrãs. `on` diz se o ecrã está ativo (anima ao passar a true).
function Screen({ i, on, t }: { i: number; on: boolean; t: Dict }): ReactNode {
  if (i === 0)
    return (
      <div className="mx-auto h-[20rem] w-full max-w-[16rem] rounded-[26px] bg-tinta p-3 shadow-[0_30px_60px_-30px_rgba(6,8,60,.7)]">
        <div className="h-full rounded-[18px] bg-gradient-to-b from-[#3e4f8e] to-[#2d3d78] px-4 pb-4 pt-3">
          <FaceCheck state={on ? 'ok' : 'scan'} time="07:58" />
        </div>
      </div>
    )
  if (i === 1)
    return (
      <div className="mx-auto w-full max-w-[15rem] rounded-[30px] border-[6px] border-tinta bg-white p-3 shadow-[0_30px_60px_-30px_rgba(6,8,60,.7)]">
        <span className="mx-auto block h-4 w-16 rounded-full bg-tinta" />
        <p className="mt-3 text-small font-bold">TimeEasier</p>
        <div className="tb-map relative mt-2 h-36 overflow-hidden rounded-xl bg-produto-time-claro">
          <span className="absolute inset-y-0 left-[42%] w-2 bg-white" />
          <span className="absolute inset-x-0 top-[55%] h-2 bg-white" />
          <span className="absolute -inset-y-4 left-[62%] w-2 rotate-[24deg] bg-white" />
          <span className="tb-pin absolute left-[42%] top-[55%] -ml-3 -mt-8 grid h-8 w-6 place-items-start justify-center">
            <svg viewBox="0 0 24 32" className="h-8 w-6 text-azul" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.4 0 0 5.2 0 11.7 0 20.5 12 32 12 32s12-11.5 12-20.3C24 5.2 18.6 0 12 0zm0 16a4.3 4.3 0 110-8.6 4.3 4.3 0 010 8.6z" />
            </svg>
          </span>
          <span className="tb-ping absolute left-[42%] top-[55%] -ml-4 -mt-4 h-8 w-8 rounded-full border-2 border-azul" />
        </div>
        <p className="mt-2 text-data text-grafite">{t.app.place} · 08:03</p>
        <p className={cn('tb-swap mt-2 flex h-11 items-center justify-center gap-1.5 rounded-xl text-small font-bold text-white transition-colors duration-500', on ? 'bg-estado-valido' : 'bg-azul')}>
          {on && <StatusIcon status="ok" />}
          {on ? t.app.action : 'Registar entrada'}
        </p>
      </div>
    )
  if (i === 2) {
    // Dias marcados por pessoa: [início, fim, tipo]
    const marks: [number, number, 'v' | 'a'][] = [
      [5, 9, 'v'],
      [12, 12, 'a'],
      [14, 18, 'v'],
      [2, 3, 'a'],
    ]
    return (
      <div className="w-full max-w-[25rem] rounded-2xl bg-white p-5 shadow-[0_30px_60px_-30px_rgba(6,8,60,.5)]">
        <p className="flex items-center justify-between font-bold">
          {t.holidays.month}
          <span className="flex gap-3 text-data font-medium text-grafite">
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-produto-time" />{t.holidays.vac}</span>
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-estado-sinal" />{t.holidays.abs}</span>
          </span>
        </p>
        <div className="mt-4 space-y-2.5">
          {t.holidays.people.map((name, r) => (
            <div key={name} className="flex items-center gap-3">
              <span className="w-16 shrink-0 text-data font-semibold">{name}</span>
              <span className="grid flex-1 grid-cols-[repeat(20,minmax(0,1fr))] gap-[3px]">
                {Array.from({ length: 20 }, (_, d) => {
                  const [a, b, kind] = marks[r]
                  const hit = d >= a && d <= b
                  return (
                    <span
                      key={d}
                      className={cn('tb-day aspect-[1/1.6] rounded-[3px]', hit ? (kind === 'v' ? 'bg-produto-time' : 'bg-estado-sinal') : 'bg-papel')}
                      style={hit ? { transitionDelay: `${r * 120 + (d - a) * 40}ms` } : undefined}
                      data-hit={hit || undefined}
                    />
                  )
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  if (i === 3)
    return (
      <div className="w-full max-w-[25rem] rounded-2xl bg-white p-5 shadow-[0_30px_60px_-30px_rgba(6,8,60,.5)]">
        <p className="font-bold">{t.approve.title}</p>
        <ul className="mt-3 divide-y divide-linha">
          {[
            ['Ana S.', '07:52'],
            ['Rui M.', '07:58'],
            ['Carla P.', '08:03'],
          ].map(([n, h], k) => (
            <li key={n} className="flex items-center gap-3 py-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-produto-time-claro text-data font-bold text-produto-time">{n[0]}</span>
              <span className="flex-1 text-small font-semibold">{n}</span>
              <span className="t-data text-grafite">{h}</span>
              <span className="tb-state grid w-[6.5rem] text-right text-data font-bold">
                <span className="tb-a rounded-full bg-[#FFF4D6] px-2.5 py-1 text-center text-estado-aviso" style={{ transitionDelay: `${300 + k * 350}ms` }}>
                  {t.approve.pending}
                </span>
                <span className="tb-b rounded-full bg-[#E3F4EC] px-2.5 py-1 text-center text-estado-valido" style={{ transitionDelay: `${300 + k * 350}ms` }}>
                  ✓ {t.approve.ok}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    )
  if (i === 4)
    return (
      <div className="w-full max-w-[25rem] rounded-2xl bg-white p-5 shadow-[0_30px_60px_-30px_rgba(6,8,60,.5)]">
        <p className="flex items-center gap-3 font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-produto-time-claro text-data font-bold text-produto-time">R</span>
          {t.docs.who}
        </p>
        <ul className="mt-3 divide-y divide-linha">
          {t.docs.items.map((d, k) => {
            const soon = k === 2
            return (
              <li key={d} className="flex items-center gap-3 py-3 text-small">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-produto-time" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 3H6v18h12V7zM14 3v4h4M9 12h6M9 16h6" />
                </svg>
                <span className="flex-1 font-semibold">{d}</span>
                {soon ? (
                  <span className="tb-alert inline-flex shrink-0 items-center whitespace-nowrap gap-1.5 rounded-full bg-[#FFF4D6] px-2.5 py-1 text-data font-bold text-estado-aviso">
                    <StatusIcon status="soon" />
                    {t.docs.soon}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-data font-semibold text-estado-valido">
                    <StatusIcon status="ok" />
                    {t.docs.ok}
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    )
  return (
    <div className="w-full max-w-[25rem] rounded-2xl bg-white p-5 shadow-[0_30px_60px_-30px_rgba(6,8,60,.5)]">
      <p className="font-bold">{t.report.title}</p>
      <div className="mt-4 space-y-3">
        {[
          ['Ana S.', '168:00', 0.94],
          ['Rui M.', '171:30', 0.97],
          ['Carla P.', '160:00', 0.9],
          ['Hugo T.', '152:00', 0.86],
        ].map(([n, h, w], k) => (
          <div key={n as string} className="flex items-center gap-3 text-small">
            <span className="w-16 shrink-0 font-semibold">{n}</span>
            <span className="h-2 flex-1 rounded-full bg-papel">
              <span className="tb-bar block h-full origin-left rounded-full bg-produto-time" style={{ width: `${(w as number) * 100}%`, transitionDelay: `${k * 120}ms` }} />
            </span>
            <span className="t-data w-12 text-right">{h}</span>
          </div>
        ))}
      </div>
      <p className="tb-done mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#E3F4EC] px-3 py-1.5 text-small font-bold text-estado-valido">
        <StatusIcon status="ok" />
        {t.report.done}
      </p>
    </div>
  )
}

export default function TimeBenefits({ locale }: { locale: Locale }) {
  const t = T[locale]
  return (
    <ScrollStory
      headingId="beneficios-titulo"
      title={t.title}
      intro={t.intro}
      steps={t.steps}
      tint="bg-produto-time-claro"
      accent="#3B5FA8"
      animateSteps
      screen={(i, on) => <Screen i={i} on={on} t={t} />}
    />
  )
}
