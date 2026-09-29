import type { Locale } from '@/lib/seo.config'
import { Browser, Card, SampleTag, Tick } from './SceneParts'

// Cena única do WoodEasier: um lote da receção à expedição, num só ecrã.
// Lote, quantidades e horas fictícios.
const T = {
  pt: {
    nav: ['Painel', 'Lotes', 'Tratamentos', 'Passaportes', 'Relatórios'],
    title: 'Lote L-0142',
    stages: ['Receção', 'Tratamento', 'Passaporte', 'Expedição'],
    lotTitle: 'Receção do lote',
    lot: [
      ['Lote', 'L-0142'],
      ['Material', 'Paletes 1200 × 800'],
      ['Quantidade', '240'],
      ['Receção', '08:40'],
    ],
    register: 'Registar lote',
    treatment: 'Temperatura no núcleo',
    duration: '30 min',
    passport: 'Passaporte de madeira tratada',
    passportRows: [
      ['Lote', 'L-0142'],
      ['Tratamento', 'HT · 56 °C · 30 min'],
      ['Emitido', '11:32'],
    ],
    generate: 'Gerar passaporte',
    history: 'Histórico do lote',
    ship: 'Expedir',
    report: 'Relatório DGAV',
    ready: 'pronto',
    sample: 'dados de exemplo',
  },
  en: {
    nav: ['Dashboard', 'Batches', 'Treatments', 'Passports', 'Reports'],
    title: 'Batch L-0142',
    stages: ['Intake', 'Treatment', 'Passport', 'Dispatch'],
    lotTitle: 'Batch intake',
    lot: [
      ['Batch', 'L-0142'],
      ['Material', 'Pallets 1200 × 800'],
      ['Quantity', '240'],
      ['Intake', '08:40'],
    ],
    register: 'Record batch',
    treatment: 'Core temperature',
    duration: '30 min',
    passport: 'Treated timber passport',
    passportRows: [
      ['Batch', 'L-0142'],
      ['Treatment', 'HT · 56 °C · 30 min'],
      ['Issued', '11:32'],
    ],
    generate: 'Generate passport',
    history: 'Batch history',
    ship: 'Dispatch',
    report: 'DGAV report',
    ready: 'ready',
    sample: 'sample data',
  },
}

const TIMES = ['08:40', '10:45', '11:32', '15:05']

function Rows({ rows, on }: { rows: string[][]; on?: string }) {
  return (
    <dl>
      {rows.map(([k, v], i) => (
        <div key={k} data-on={on} data-pop style={{ animationDelay: `${0.2 + i * 0.12}s` }} className="grid grid-cols-[8rem_1fr] gap-3 border-t border-linha py-2">
          <dt className="text-grafite">{k}</dt>
          <dd className="t-data text-tinta">{v}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function WoodEasierScene({ locale }: { locale: Locale }) {
  const t = T[locale]
  return (
    <>
      <Browser title="app.geteasier.pt" nav={t.nav} active={1} className="left-0 top-5 h-[720px] w-[1200px]">
        <div className="flex items-center justify-between">
          <p className="text-[20px] font-bold text-tinta">{t.title}</p>
          <ol className="flex gap-2">
            {t.stages.map((s, i) => (
              <li key={s} data-hi={String(i)} className="flex items-center gap-2 rounded-full border border-linha bg-white px-3 py-1.5 text-[14px]">
                <span className="demo-stack">
                  <span data-on={[0, 1, 2, 3].filter((n) => n < i).join(' ')} className="t-data text-grafite">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span data-on={[0, 1, 2, 3].filter((n) => n >= i).join(' ')} data-pop className="text-estado-valido">
                    <Tick />
                  </span>
                </span>
                <span className="font-semibold text-tinta">{s}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-5">
          <Card focus="0" className="h-[285px] shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold text-tinta">{t.lotTitle}</p>
              <span data-click="0" className="rounded-lg bg-[var(--accent)] px-3 py-1.5 text-[14px] font-semibold text-white">
                {t.register}
              </span>
            </div>
            <Rows rows={t.lot} on="0 1 2 3" />
          </Card>

          <Card focus="1" title={t.treatment} className="h-[285px] shadow-sm">
            <svg viewBox="0 0 360 170" className="h-auto w-full" fill="none" style={{ fontFamily: 'var(--font-plex-mono), monospace' }}>
              <path d="M40 16v130h310" stroke="#06083C" strokeWidth="1" />
              <path d="M40 44h310" stroke="#4A5263" strokeWidth="1" strokeDasharray="4 4" />
              <g data-on="1 2 3">
                <path data-draw pathLength={1} d="M40 140C90 138 130 50 170 44h120c20 0 32 50 60 80" stroke="var(--accent)" strokeWidth="3" />
              </g>
              <path d="M170 30v-6h120v6" stroke="#06083C" strokeWidth="1" />
              <text x="230" y="16" textAnchor="middle" fontSize="12" fill="#06083C">
                {t.duration}
              </text>
              <text x="34" y="48" textAnchor="end" fontSize="12" fill="#4A5263">
                56 °C
              </text>
              <text x="40" y="164" fontSize="12" fill="#4A5263">
                09:10
              </text>
              <text x="350" y="164" textAnchor="end" fontSize="12" fill="#4A5263">
                10:45
              </text>
            </svg>
          </Card>

          <Card focus="2" className="h-[285px] shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold text-tinta">{t.passport}</p>
              <span data-click="2" className="rounded-lg border border-tinta/70 bg-white px-3 py-1.5 text-[14px] font-semibold text-tinta">
                {t.generate}
              </span>
            </div>
            <div className="demo-stack">
              <div data-on="0 1" className="mt-2 space-y-3">
                <span className="block h-4 w-3/4 rounded bg-papel" />
                <span className="block h-4 w-2/3 rounded bg-papel" />
                <span className="block h-4 w-1/2 rounded bg-papel" />
              </div>
              <div data-on="2 3" data-pop className="rounded-xl border-2 border-[var(--accent)] bg-[var(--accent)]/5 p-3">
                <Rows rows={t.passportRows} />
              </div>
            </div>
          </Card>

          <Card focus="3" className="h-[285px] shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold text-tinta">{t.history}</p>
              <span data-click="3" className="rounded-lg bg-[var(--accent)] px-3 py-1.5 text-[14px] font-semibold text-white">
                {t.ship}
              </span>
            </div>
            <ul>
              {t.stages.map((s, i) => (
                <li
                  key={s}
                  data-on={[0, 1, 2, 3].filter((n) => n >= i).join(' ')}
                  data-pop
                  className="flex justify-between border-t border-linha py-2"
                >
                  <span className="text-tinta">{s}</span>
                  <span className="t-data text-tinta">{TIMES[i]}</span>
                </li>
              ))}
            </ul>
            <p data-on="3" data-pop data-later style={{ '--later': '0.8s' } as React.CSSProperties} className="mt-2 flex items-center gap-2 font-semibold text-estado-valido">
              <Tick />
              {t.report} · {t.ready}
            </p>
          </Card>
        </div>
      </Browser>

      <SampleTag text={t.sample} />
    </>
  )
}
