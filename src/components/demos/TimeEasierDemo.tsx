import type { Locale } from '@/lib/seo.config'
import DemoWindow, { Check, FaceMesh, Pin } from './DemoWindow'

// Nomes, horas e locais fictícios. Os textos do tablet são os da app real (ficheiros de tradução do staging),
// em português também na versão inglesa do site, como aparecem no produto.
const T = {
  pt: {
    window: 'TimeEasier',
    gate: 'Portaria',
    today: 'Registos de hoje',
    cols: ['Colaborador', 'Hora', 'Aprov.'],
    tablet: 'Tablet · Portaria',
    app: 'App · Av. Central',
    report: 'Relatório de horas · setembro',
    repCols: ['Colaborador', 'Horas', 'Extra'],
    export: 'Exportar',
  },
  en: {
    window: 'TimeEasier',
    gate: 'Gate',
    today: 'Today’s records',
    cols: ['Employee', 'Time', 'OK'],
    tablet: 'Tablet · Gate',
    app: 'App · Av. Central',
    report: 'Hours report · September',
    repCols: ['Employee', 'Hours', 'Overtime'],
    export: 'Export',
  },
}

const ROW = 'grid grid-cols-[minmax(0,1fr)_3.4rem_3.4rem] items-center gap-2 rounded px-2 py-2'

export default function TimeEasierDemo({ locale }: { locale: Locale }) {
  const t = T[locale]
  const rows = [
    { name: 'Ana S.', time: '07:52', where: t.tablet, app: false, on: undefined, hi: undefined },
    { name: 'Rui M.', time: '07:58', where: t.tablet, app: false, on: '1 2', hi: '1' },
    { name: 'Carla P.', time: '08:03', where: t.app, app: true, on: undefined, hi: undefined },
  ]

  return (
    <DemoWindow locale={locale} title={t.window}>
      <div className="grid gap-4 sm:grid-cols-[12rem_minmax(0,1fr)]">
        {/* Tablet no local */}
        <div className="mx-auto w-full max-w-[12rem] rounded-[14px] sm:max-w-[13rem] bg-tinta p-2">
          <div className="rounded-lg border border-white/15 p-3 text-white">
            <div className="t-data flex justify-between text-white/75">
              <span>{t.gate}</span>
              <span>07:58</span>
            </div>
            <div className="relative mx-auto mt-3 aspect-[5/6] w-full rounded-md border border-white/20">
              <FaceMesh className="absolute inset-x-1 top-3 text-ciano" />
              <div data-on="0" className="absolute inset-2">
                <span className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-ciano" />
                <span className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-ciano" />
                <span className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-ciano" />
                <span className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-ciano" />
              </div>
            </div>
            <div lang="pt-PT" className="demo-stack mt-3">
              <div data-on="0" data-pop className="text-center">
                <p className="text-small font-semibold">A reconhecer rosto</p>
                <p className="text-[12px] text-white/70">Mantém-te quieto.</p>
              </div>
              <div data-on="1 2 3" data-pop className="rounded bg-white px-2 py-1.5 text-center text-tinta">
                <p className="text-small font-bold">Olá, Rui!</p>
                <p className="flex items-center justify-center gap-1 text-[12px] font-semibold text-estado-valido">
                  <Check className="h-3.5 w-3.5" />
                  Presença registada
                </p>
                <span className="t-data mt-1 inline-block rounded-full bg-papel px-2 text-[12px]">07:58</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gestão */}
        <div className="demo-stack min-w-0">
          <div data-on="0 1 2" data-screen>
            <p className="font-semibold">{t.today}</p>
            <div className="mt-3 border-t border-linha">
              <div className={`${ROW} t-data text-grafite`}>
                {t.cols.map((c) => (
                  <span key={c} className="truncate">
                    {c}
                  </span>
                ))}
              </div>
              {rows.map((r) => (
                <div key={r.name} data-row data-on={r.on} data-hi={r.hi} className={`${ROW} border-t border-linha`}>
                  <span className="min-w-0">
                    <span className="block truncate font-semibold">{r.name}</span>
                    <span className="flex min-w-0 items-center gap-1 text-grafite">
                      {r.app && <Pin />}
                      <span className="truncate">{r.where}</span>
                    </span>
                  </span>
                  <span className="t-data">{r.time}</span>
                  <span className="demo-stack justify-items-center">
                    <span data-on="0 1" className="text-grafite">
                      –
                    </span>
                    <span data-on="2" data-pop className="text-estado-valido">
                      <Check />
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div data-on="3" data-screen>
            <p className="font-semibold">{t.report}</p>
            <div className="mt-3 border-t border-linha">
              <div className="t-data grid grid-cols-[minmax(0,1fr)_4.5rem_4.5rem] gap-2 px-2 py-2 text-grafite">
                {t.repCols.map((c) => (
                  <span key={c} className="truncate">
                    {c}
                  </span>
                ))}
              </div>
              {[
                ['Ana S.', '168:00', '0:00'],
                ['Rui M.', '171:30', '3:30'],
                ['Carla P.', '160:00', '0:00'],
              ].map(([n, h, x]) => (
                <div key={n} data-row className="grid grid-cols-[minmax(0,1fr)_4.5rem_4.5rem] gap-2 border-t border-linha px-2 py-2">
                  <span className="truncate font-semibold">{n}</span>
                  <span className="t-data">{h}</span>
                  <span className="t-data">{x}</span>
                </div>
              ))}
            </div>
            <span className="mt-4 inline-flex rounded-ctl border border-tinta/80 px-3 py-1.5 font-semibold">{t.export}</span>
          </div>
        </div>
      </div>
    </DemoWindow>
  )
}
