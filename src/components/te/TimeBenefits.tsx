'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import FaceCheck from '@/components/checkin/FaceCheck'
import { StatusIcon } from '@/components/checkin/Badge'
import type { Locale } from '@/lib/seo.config'
import { cn } from '@/lib/utils'

// TimeEasier: o que muda na empresa, contado ao descer. Em desktop o ecrã fica fixo à esquerda
// e muda conforme o passo que está a meio do ecrã; cada ecrã tem uma pequena animação ao entrar.
// Em telemóvel, sem JavaScript ou com "reduzir movimento", cada passo mostra o seu ecrã por baixo
// do texto e tudo fica no estado final. Dados de exemplo; os ecrãs são decorativos (aria-hidden).

const T = {
  pt: {
    title: 'O que muda com o TimeEasier',
    intro: 'Do primeiro registo do dia ao relatório do fim do mês.',
    steps: [
      { title: 'Picagem pelo rosto, à entrada', text: 'O colaborador toca no tablet e o rosto confirma quem é. Acabam as folhas de ponto e as picagens pelo colega.' },
      { title: 'Quem trabalha fora regista na app', text: 'Na obra, no cliente ou na estrada: a entrada fica com a hora e o local onde foi feita.' },
      { title: 'Férias e ausências num só mapa', text: 'Vê quem está de férias ou ausente antes de organizar a semana.' },
      { title: 'O responsável aprova a sua equipa', text: 'Cada chefe de equipa revê os registos das suas pessoas e aprova-os.' },
      { title: 'O fim do mês sem contas à mão', text: 'O relatório de horas de cada colaborador sai pronto, de acordo com o Art. 202.º do Código do Trabalho.' },
    ],
    app: { place: 'Av. Central', action: 'Entrada registada' },
    holidays: { month: 'Outubro', people: ['Ana S.', 'Rui M.', 'Carla P.', 'Hugo T.'], vac: 'Férias', abs: 'Ausência' },
    approve: { title: 'Registos da equipa', pending: 'Pendente', ok: 'Aprovado' },
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
      { title: 'Month end without manual sums', text: 'Each employee’s hours report comes out ready, in line with Article 202 of the Portuguese Labour Code.' },
    ],
    app: { place: 'Av. Central', action: 'Clock-in recorded' },
    holidays: { month: 'October', people: ['Ana S.', 'Rui M.', 'Carla P.', 'Hugo T.'], vac: 'Holiday', abs: 'Absence' },
    approve: { title: 'Team records', pending: 'Pending', ok: 'Approved' },
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
  const [active, setActive] = useState(-1)
  const steps = useRef<(HTMLLIElement | null)[]>([])

  // O passo ativo é o que atravessa a faixa a meio do ecrã.
  useEffect(() => {
    // Com "reduzir movimento" não há passo ativo: tudo fica no estado final.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i))
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    steps.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const shown = Math.max(active, 0)

  return (
    <div className="tb" data-js={active >= 0 || undefined}>
      <div className="max-w-prose">
        <h2 id="beneficios-titulo" className="t-h2">
          {t.title}
        </h2>
        <p className="mt-3 text-lead text-grafite">{t.intro}</p>
      </div>

      <div className="tb-grid mt-10">
        {/* Ecrã fixo (desktop com movimento): todos os ecrãs empilhados, só o ativo visível */}
        <div aria-hidden="true" className="tb-sticky hidden lg:block">
          <div className="sticky top-[calc(var(--header-h)+3rem)] grid h-[min(30rem,calc(100vh-var(--header-h)-6rem))] place-items-center overflow-hidden rounded-[28px] bg-produto-time-claro p-8">
            {t.steps.map((s, i) => (
              <div key={s.title} className="tb-screen col-start-1 row-start-1 grid h-full w-full place-items-center" data-on={i === shown || undefined}>
                <div className="contents" data-anim={i === active || undefined}>
                  <Screen i={i} on={i === active} t={t} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <ol className="tb-steps relative">
          {t.steps.map((s, i) => (
            <li
              key={s.title}
              ref={(el) => {
                steps.current[i] = el
              }}
              data-i={i}
              data-on={i === shown || undefined}
              className="tb-step"
            >
              <span aria-hidden="true" className="tb-dot" />
              <h3 className="t-h3">{s.title}</h3>
              <p className="mt-2 max-w-[42ch] text-grafite">{s.text}</p>
              {/* Ecrã por baixo do texto (telemóvel, sem JS, reduzir movimento) */}
              <div aria-hidden="true" className="tb-inline mt-6 grid place-items-center rounded-[22px] bg-produto-time-claro p-6">
                <div className="contents" data-anim={active < 0 || i <= active || undefined}>
                  <Screen i={i} on={active < 0 || i <= active} t={t} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
