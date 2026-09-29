import type { CSSProperties } from 'react'
import type { Locale } from '@/lib/seo.config'
import { FaceMesh, Pin } from './DemoWindow'
import { Browser, Card, Phone, SampleTag, Tablet, Tick } from './SceneParts'

// Cena única do TimeEasier: gestão no browser, tablet na portaria e app no telemóvel.
// Nomes, horas e locais fictícios. Os textos do tablet são os da app real, em português também na versão inglesa.
const T = {
  pt: {
    nav: ['Painel', 'Colaboradores', 'Registos', 'Ausências', 'Relatórios'],
    today: 'Registos de hoje',
    approveAll: 'Aprovar',
    pending: 'Pendente',
    approved: 'Aprovado',
    report: 'Relatório de horas · setembro',
    export: 'Exportar',
    exported: 'Exportado',
    gate: 'Portaria',
    tablet: 'Tablet · Portaria',
    app: 'App · Av. Central',
    clockIn: 'Registar entrada',
    done: 'Entrada registada',
    sample: 'dados de exemplo',
  },
  en: {
    nav: ['Dashboard', 'Employees', 'Records', 'Absences', 'Reports'],
    today: 'Today’s records',
    approveAll: 'Approve',
    pending: 'Pending',
    approved: 'Approved',
    report: 'Hours report · September',
    export: 'Export',
    exported: 'Exported',
    gate: 'Gate',
    tablet: 'Tablet · Gate',
    app: 'App · Av. Central',
    clockIn: 'Clock in',
    done: 'Clocked in',
    sample: 'sample data',
  },
}

const later = (s: number) => ({ '--later': `${s}s` }) as CSSProperties

export default function TimeEasierScene({ locale }: { locale: Locale }) {
  const t = T[locale]
  const rows = [
    { name: 'Ana S.', time: '07:52', where: t.tablet, on: undefined, app: false },
    { name: 'Rui M.', time: '07:58', where: t.tablet, on: '0 1 2 3', app: false },
    { name: 'Carla P.', time: '08:03', where: t.app, on: '1 2 3', app: true },
  ]
  const hours = [
    ['Ana S.', '168:00', 96],
    ['Rui M.', '171:30', 100],
    ['Carla P.', '160:00', 91],
  ] as const

  return (
    <>
      <Browser title="app.geteasier.pt" nav={t.nav} active={2} className="left-0 top-5 h-[720px] w-[790px]">
        <Card focus="2" className="shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[17px] font-semibold text-tinta">{t.today}</p>
            <span data-click="2" className="rounded-lg bg-[var(--accent)] px-4 py-2 font-semibold text-white">
              {t.approveAll}
            </span>
          </div>
          {rows.map((r) => (
            <div key={r.name} data-on={r.on} data-pop className="flex items-center gap-3 border-t border-linha py-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-papel text-[13px] font-semibold text-tinta">
                {r.name.slice(0, 1)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-tinta">{r.name}</span>
                <span className="flex items-center gap-1 text-[13px] text-grafite">
                  {r.app && <Pin />}
                  {r.where}
                </span>
              </span>
              <span className="t-data w-16 text-tinta">{r.time}</span>
              <span className="demo-stack w-28 justify-items-end">
                <span data-on="0 1" className="rounded-full bg-papel px-3 py-1 text-[13px] text-grafite">
                  {t.pending}
                </span>
                <span data-on="2 3" data-pop className="flex items-center gap-1 rounded-full bg-estado-valido/10 px-3 py-1 text-[13px] font-semibold text-estado-valido">
                  <Tick className="h-3.5 w-3.5" />
                  {t.approved}
                </span>
              </span>
            </div>
          ))}
        </Card>

        <Card focus="3" className="mt-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[17px] font-semibold text-tinta">{t.report}</p>
            <span className="demo-stack justify-items-end">
              <span data-on="0 1 2" data-click="3" className="rounded-lg border border-tinta/70 bg-white px-4 py-2 font-semibold text-tinta">
                {t.export}
              </span>
              <span data-on="3" data-pop className="flex items-center gap-1 rounded-lg bg-estado-valido px-4 py-2 font-semibold text-white">
                <Tick />
                {t.exported}
              </span>
            </span>
          </div>
          {hours.map(([n, h, w]) => (
            <div key={n} className="flex items-center gap-3 border-t border-linha py-2.5">
              <span className="w-24 font-semibold text-tinta">{n}</span>
              <span className="h-2.5 flex-1 rounded-full bg-papel">
                <span className="block h-full rounded-full bg-[var(--accent)]" style={{ width: `${w}%` }} />
              </span>
              <span className="t-data w-16 text-right text-tinta">{h}</span>
            </div>
          ))}
        </Card>
      </Browser>

      {/* Tablet na portaria */}
      <Tablet className="left-[830px] top-5 h-[430px] w-[350px]">
        <div data-focus="0" className="absolute inset-0 p-5">
          <div className="t-data flex justify-between text-[14px] text-white/70">
            <span>{t.gate}</span>
            <span>07:58</span>
          </div>
          <div lang="pt-PT" className="demo-stack mt-4 h-[330px]">
            <div data-on="1 2 3" className="flex flex-col items-center justify-center text-center">
              <span data-click="0" className="grid h-28 w-28 place-items-center rounded-full border-2 border-ciano/60 bg-ciano/10">
                <FaceMesh className="w-20 text-ciano" />
              </span>
              <p className="mt-5 text-[22px] font-bold">Toca para registar</p>
              <p className="mt-1 text-[14px] text-white/70">Reconhecimento facial em segundos</p>
              <span className="mt-4 rounded-full border border-white/30 px-4 py-1.5 text-[14px]">Entrar com PIN</span>
            </div>
            <div data-on="0" data-fade-out style={later(1.6)} className="flex flex-col items-center justify-center text-center">
              <span className="relative h-40 w-36 overflow-hidden rounded-2xl border border-ciano/50">
                <FaceMesh className="absolute inset-3 text-ciano" />
                <span data-scan className="absolute inset-x-2 top-2 h-0.5 rounded bg-ciano shadow-[0_0_12px_#6CD3E6]" />
              </span>
              <p className="mt-5 text-[18px] font-semibold">A reconhecer rosto</p>
              <p className="text-[14px] text-white/70">Mantém-te quieto.</p>
            </div>
            <div data-on="0" data-pop data-later style={later(1.8)} className="flex flex-col items-center justify-center">
              <div className="w-full rounded-2xl bg-white px-5 py-6 text-center text-tinta">
                <p className="text-[26px] font-bold">Olá, Rui!</p>
                <p className="mt-2 flex items-center justify-center gap-1.5 text-[16px] font-semibold text-estado-valido">
                  <Tick />
                  Presença registada
                </p>
                <span className="t-data mt-3 inline-block rounded-full bg-papel px-3 py-1 text-[15px]">07:58</span>
              </div>
            </div>
          </div>
        </div>
      </Tablet>

      {/* App no telemóvel */}
      <Phone className="left-[905px] top-[462px] h-[290px] w-[240px]">
        <div data-focus="1" className="absolute inset-0 px-4 pb-4 pt-9">
          <p className="font-semibold text-tinta">TimeEasier</p>
          <div className="relative mt-2 h-[92px] overflow-hidden rounded-xl bg-[#E8EEF9]">
            <svg viewBox="0 0 200 92" className="absolute inset-0 h-full w-full" fill="none" stroke="#C9D5EC" strokeWidth="6">
              <path d="M-10 60h220M60-10v120M150-10l-40 120" />
            </svg>
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full text-[var(--accent)]">
              <Pin className="h-7 w-7" />
            </span>
          </div>
          <p className="mt-2 flex items-center gap-1 text-[13px] text-grafite">Av. Central</p>
          <div className="demo-stack mt-2">
            <span data-on="0 2 3" data-click="1" className="rounded-xl bg-[var(--accent)] py-2.5 text-center font-semibold text-white">
              {t.clockIn}
            </span>
            <span data-on="1" data-pop className="flex items-center justify-center gap-1.5 rounded-xl bg-estado-valido/10 py-2.5 font-semibold text-estado-valido">
              <Tick />
              {t.done} · 08:03
            </span>
          </div>
        </div>
      </Phone>

      <SampleTag text={t.sample} />
    </>
  )
}
