import type { Locale } from '@/lib/seo.config'
import DemoWindow, { Bell, Check, Cross, Warn } from './DemoWindow'

// Obras, pessoas e empresas fictícias. Os estados dos documentos têm ícone e texto, não só cor.
const T = {
  pt: {
    window: 'ConstructionEasier',
    sites: 'Obras',
    siteList: ['Rua das Flores', 'Av. Central', 'Quinta do Vale'],
    present: 'Presentes agora',
    cols: ['Nome', 'Empresa', 'Entrada'],
    own: 'Própria',
    subA: 'Subempreiteiro A',
    subB: 'Subempreiteiro B',
    companies: 'Empresas na obra',
    workers: (n: number) => `${n} trabalhadores`,
    trades: ['Cofragens', 'Eletricidade'],
    docs: 'Documentos',
    valid: 'Válido',
    expiring: 'A expirar',
    missing: 'Em falta',
    alertSite: 'Rua das Flores',
  },
  en: {
    window: 'ConstructionEasier',
    sites: 'Sites',
    siteList: ['Rua das Flores', 'Av. Central', 'Quinta do Vale'],
    present: 'On site now',
    cols: ['Name', 'Company', 'In'],
    own: 'Own staff',
    subA: 'Subcontractor A',
    subB: 'Subcontractor B',
    companies: 'Companies on site',
    workers: (n: number) => `${n} workers`,
    trades: ['Formwork', 'Electrical'],
    docs: 'Documents',
    valid: 'Valid',
    expiring: 'Expiring',
    missing: 'Missing',
    alertSite: 'Rua das Flores',
  },
}

export default function ConstructionEasierDemo({ locale }: { locale: Locale }) {
  const t = T[locale]
  const people = [
    { name: 'Rui M.', co: t.own, time: '07:58' },
    { name: 'Nuno R.', co: t.subA, time: '08:02' },
    { name: 'Hugo T.', co: t.subA, time: '08:05' },
    { name: 'Sara L.', co: t.subB, time: '08:11' },
  ]
  const docs = [
    { name: 'Nuno R.', co: t.subA, state: 'valid' as const },
    { name: 'Hugo T.', co: t.subA, state: 'expiring' as const },
    { name: 'Sara L.', co: t.subB, state: 'missing' as const },
  ]
  const STATE = {
    valid: { label: t.valid, cls: 'text-estado-valido', Icon: Check },
    expiring: { label: t.expiring, cls: 'text-estado-aviso', Icon: Warn },
    missing: { label: t.missing, cls: 'text-estado-erro', Icon: Cross },
  }

  return (
    <DemoWindow locale={locale} title={t.window}>
      <div className="grid gap-4 sm:grid-cols-[9rem_minmax(0,1fr)]">
        <div>
          <p className="t-data text-grafite">{t.sites}</p>
          <ul className="mt-2 flex gap-2 overflow-hidden sm:block sm:space-y-1">
            {t.siteList.map((s, i) => (
              <li
                key={s}
                className={
                  i === 0
                    ? 'shrink-0 rounded border-l-2 border-azul bg-white px-2 py-1.5 font-semibold'
                    : 'shrink-0 px-2 py-1.5 text-grafite'
                }
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative min-w-0">
          <div className="demo-stack">
            <div data-on="0 3" data-screen>
              <p className="font-semibold">{t.present}</p>
              <div className="mt-3 border-t border-linha">
                <div className="t-data grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_3.4rem] gap-2 px-2 py-2 text-grafite">
                  {t.cols.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
                {people.map((p) => (
                  <div key={p.name} data-row className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_3.4rem] gap-2 border-t border-linha px-2 py-2">
                    <span className="truncate font-semibold">{p.name}</span>
                    <span className="truncate text-grafite">{p.co}</span>
                    <span className="t-data">{p.time}</span>
                  </div>
                ))}
                <div data-on="3" data-hi="3" data-pop className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_3.4rem] gap-2 rounded border-t border-linha px-2 py-2">
                  <span className="truncate font-semibold">Tiago F.</span>
                  <span className="truncate text-grafite">{t.own}</span>
                  <span className="t-data">08:14</span>
                </div>
              </div>
            </div>

            <div data-on="1" data-screen>
              <p className="font-semibold">{t.companies}</p>
              <ul className="mt-3 border-t border-linha">
                <li className="flex items-baseline justify-between gap-3 border-b border-linha px-2 py-3">
                  <span className="font-semibold">{t.own}</span>
                  <span className="t-data text-grafite">{t.workers(6)}</span>
                </li>
                {[t.subA, t.subB].map((co, i) => (
                  <li key={co} data-hi="1" className="flex items-baseline justify-between gap-3 rounded border-b border-linha px-2 py-3">
                    <span>
                      <span className="block font-semibold">{co}</span>
                      <span className="block text-grafite">{t.trades[i]}</span>
                    </span>
                    <span className="t-data text-grafite">{t.workers(i === 0 ? 4 : 2)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div data-on="2" data-screen>
              <p className="font-semibold">{t.docs}</p>
              <ul className="mt-3 border-t border-linha">
                {docs.map((d) => {
                  const s = STATE[d.state]
                  return (
                    <li key={d.name} className="flex items-center justify-between gap-3 border-b border-linha px-2 py-3">
                      <span className="min-w-0">
                        <span className="block truncate font-semibold">{d.name}</span>
                        <span className="block truncate text-grafite">{d.co}</span>
                      </span>
                      <span className={`flex shrink-0 items-center gap-1.5 font-semibold ${s.cls}`}>
                        <s.Icon />
                        {s.label}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          <div
            data-on="3"
            data-pop
            className="absolute -top-1 right-0 flex items-center gap-2 rounded-ctl border border-tinta bg-white px-3 py-2 shadow-[0_2px_0_#06083C]"
          >
            <Bell className="text-azul" />
            <span className="t-data">08:14</span>
            <span className="font-semibold">Tiago F.</span>
            <span className="hidden text-grafite md:inline">· {t.alertSite}</span>
          </div>
        </div>
      </div>
    </DemoWindow>
  )
}
