import type { Locale } from '@/lib/seo.config'
import DemoWindow, { Check } from './DemoWindow'

// Lote, quantidades e horas fictícios.
const T = {
  pt: {
    window: 'WoodEasier · Lote L-0142',
    stages: ['Receção', 'Tratamento', 'Passaporte', 'Expedição'],
    lot: [
      ['Lote', 'L-0142'],
      ['Material', 'Paletes 1200 × 800'],
      ['Quantidade', '240'],
      ['Receção', '08:40'],
    ],
    treatment: 'Temperatura no núcleo',
    duration: '30 min',
    passport: 'Passaporte de madeira tratada',
    passportRows: [
      ['Lote', 'L-0142'],
      ['Tratamento', 'HT · 56 °C · 30 min'],
      ['Emitido', '11:32'],
    ],
    history: 'Histórico do lote',
    report: 'Relatório DGAV',
    ready: 'pronto',
  },
  en: {
    window: 'WoodEasier · Batch L-0142',
    stages: ['Intake', 'Treatment', 'Passport', 'Dispatch'],
    lot: [
      ['Batch', 'L-0142'],
      ['Material', 'Pallets 1200 × 800'],
      ['Quantity', '240'],
      ['Intake', '08:40'],
    ],
    treatment: 'Core temperature',
    duration: '30 min',
    passport: 'Treated timber passport',
    passportRows: [
      ['Batch', 'L-0142'],
      ['Treatment', 'HT · 56 °C · 30 min'],
      ['Issued', '11:32'],
    ],
    history: 'Batch history',
    report: 'DGAV report',
    ready: 'ready',
  },
}

const TIMES = ['08:40', '10:45', '11:32', '15:05']

function Rows({ rows }: { rows: string[][] }) {
  return (
    <dl className="border-t border-linha">
      {rows.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[7rem_minmax(0,1fr)] gap-3 border-b border-linha px-2 py-2">
          <dt className="text-grafite">{k}</dt>
          <dd className="t-data truncate">{v}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function WoodEasierDemo({ locale }: { locale: Locale }) {
  const t = T[locale]
  return (
    <DemoWindow locale={locale} title={t.window}>
      <ol className="grid grid-cols-4 gap-1.5">
        {t.stages.map((s, i) => (
          <li key={s} data-hi={String(i)} className="rounded border-t-2 border-tinta px-1.5 pb-1.5 pt-2">
            <span className="flex items-center gap-1">
              <span className="demo-stack">
                <span data-on={[0, 1, 2, 3].filter((n) => n <= i).join(' ')} className="t-data text-grafite">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {i < 3 && (
                  <span data-on={[0, 1, 2, 3].filter((n) => n > i).join(' ')} className="text-estado-valido">
                    <Check />
                  </span>
                )}
              </span>
            </span>
            <span className="mt-1 block truncate font-semibold [font-stretch:72%] sm:[font-stretch:100%]">{s}</span>
          </li>
        ))}
      </ol>

      <div className="demo-stack mt-5">
        <div data-on="0">
          <Rows rows={t.lot} />
        </div>

        <div data-on="1">
          <p className="font-semibold">{t.treatment}</p>
          <svg viewBox="0 0 360 140" className="mt-2 h-auto w-full" fill="none" style={{ fontFamily: 'var(--font-plex-mono), monospace' }}>
            <path d="M52 16v100h300" stroke="#06083C" strokeWidth="1" />
            <path d="M52 40h300" stroke="#4A5263" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M52 110C100 108 140 46 180 40h120c20 0 32 40 52 60" stroke="#1B54B8" strokeWidth="2.5" />
            <path d="M180 26v-6h120v6" stroke="#06083C" strokeWidth="1" />
            <text x="240" y="14" textAnchor="middle" fontSize="11" fill="#06083C">
              {t.duration}
            </text>
            <text x="46" y="44" textAnchor="end" fontSize="11" fill="#4A5263">
              56 °C
            </text>
            <text x="52" y="134" fontSize="11" fill="#4A5263">
              09:10
            </text>
            <text x="352" y="134" textAnchor="end" fontSize="11" fill="#4A5263">
              10:45
            </text>
          </svg>
        </div>

        <div data-on="2">
          <div className="rounded-ctl border border-tinta bg-white p-4">
            <p className="font-semibold">{t.passport}</p>
            <div className="mt-3">
              <Rows rows={t.passportRows} />
            </div>
          </div>
        </div>

        <div data-on="3">
          <p className="font-semibold">{t.history}</p>
          <ul className="mt-2 border-t border-linha">
            {t.stages.map((s, i) => (
              <li key={s} className="flex justify-between gap-3 border-b border-linha px-2 py-2">
                <span>{s}</span>
                <span className="t-data">{TIMES[i]}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 flex items-center gap-2 font-semibold">
            <Check className="text-estado-valido" />
            {t.report}
            <span className="t-data font-normal text-grafite">· {t.ready}</span>
          </p>
        </div>
      </div>
    </DemoWindow>
  )
}
