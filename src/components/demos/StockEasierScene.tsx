import type { CSSProperties } from 'react'
import type { Locale } from '@/lib/seo.config'
import { Warn } from './DemoWindow'
import { Browser, Card, Phone, SampleTag, Tick } from './SceneParts'

// Cena única do StockEasier: artigo no browser e entrega registada no telemóvel.
// Quantidades e nomes fictícios. Escala do stock: 0 a 200 pares; nível de reposição: 30.
const T = {
  pt: {
    nav: ['Painel', 'Artigos', 'Movimentos', 'Colaboradores', 'Relatórios'],
    item: 'Luvas de proteção',
    meta: 'EPI · Armazém · par',
    stock: 'Em stock',
    min: 'mínimo 30',
    entry: '+ Entrada',
    inMove: 'Entrada · fornecedor',
    outMove: 'Entrega · Carla P.',
    alerts: 'Alertas',
    none: 'Sem alertas',
    reorder: 'Repor luvas de proteção',
    reorderText: '28 pares, abaixo do mínimo de 30',
    history: 'Consumo por mês',
    months: ['abr', 'mai', 'jun', 'jul', 'ago', 'set'],
    give: 'Registar entrega',
    fields: [
      ['Artigo', 'Luvas de proteção'],
      ['Colaborador', 'Carla P.'],
      ['Quantidade', '1'],
    ],
    confirm: 'Confirmar',
    done: 'Entrega registada',
    sample: 'dados de exemplo',
  },
  en: {
    nav: ['Dashboard', 'Items', 'Movements', 'Employees', 'Reports'],
    item: 'Protective gloves',
    meta: 'PPE · Warehouse · pair',
    stock: 'In stock',
    min: 'minimum 30',
    entry: '+ Stock in',
    inMove: 'In · supplier',
    outMove: 'Issued · Carla P.',
    alerts: 'Alerts',
    none: 'No alerts',
    reorder: 'Reorder protective gloves',
    reorderText: '28 pairs, below the minimum of 30',
    history: 'Use per month',
    months: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    give: 'Record hand-out',
    fields: [
      ['Item', 'Protective gloves'],
      ['Employee', 'Carla P.'],
      ['Quantity', '1'],
    ],
    confirm: 'Confirm',
    done: 'Hand-out recorded',
    sample: 'sample data',
  },
}

const USE = [62, 71, 58, 80, 66, 74]

export default function StockEasierScene({ locale }: { locale: Locale }) {
  const t = T[locale]
  const bar = { '--w0': '70%', '--w1': '69.5%', '--w2': '14%', '--w3': '14%' } as CSSProperties

  return (
    <>
      <Browser title="app.geteasier.pt" nav={t.nav} active={1} className="left-0 top-5 h-[720px] w-[830px]">
        <Card focus="0" className="shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[19px] font-bold text-tinta">{t.item}</p>
              <p className="t-data text-[13px] text-grafite">{t.meta}</p>
            </div>
            <div className="text-right">
              <p className="t-data text-[13px] text-grafite">{t.stock}</p>
              <p className="demo-stack justify-items-end font-mono text-[34px] font-medium leading-tight text-tinta">
                <span data-on="0" data-pop>
                  140
                </span>
                <span data-on="1" data-pop>
                  139
                </span>
                <span data-on="2 3" data-pop className="text-estado-aviso">
                  28
                </span>
              </p>
            </div>
          </div>
          <div className="relative mt-3 h-4 rounded-full bg-papel" style={bar}>
            <div data-w className="h-full rounded-full bg-[var(--accent)]" />
            <div className="absolute -bottom-1.5 -top-1.5 left-[15%] w-0.5 bg-tinta" />
          </div>
          <div className="mt-1 flex items-center justify-between">
            <p className="t-data pl-[15%] text-[13px] text-grafite">{t.min}</p>
            <span data-click="0" className="mt-3 rounded-lg bg-[var(--accent)] px-4 py-2 font-semibold text-white">
              {t.entry}
            </span>
          </div>
          <ul className="mt-3">
            <li data-on="0 1 2 3" data-pop className="flex justify-between border-t border-linha px-1 py-2.5">
              <span className="text-tinta">{t.inMove}</span>
              <span className="t-data font-semibold text-estado-valido">+100</span>
            </li>
            <li data-on="1 2 3" data-pop data-hi="1" className="flex justify-between rounded border-t border-linha px-1 py-2.5">
              <span className="text-tinta">{t.outMove}</span>
              <span className="t-data font-semibold text-tinta">−1</span>
            </li>
          </ul>
        </Card>

        <div className="mt-4 grid grid-cols-[1fr_1.3fr] gap-4">
          <Card focus="2" title={t.alerts} className="shadow-sm">
            <div className="demo-stack">
              <p data-on="0 1" className="rounded-lg bg-papel px-3 py-4 text-center text-grafite">
                {t.none}
              </p>
              <div data-on="2 3" data-pop className="flex items-start gap-2 rounded-lg border-2 border-estado-aviso bg-estado-aviso/5 p-3">
                <Warn className="mt-0.5 h-5 w-5 text-estado-aviso" />
                <span>
                  <span className="block font-semibold text-tinta">{t.reorder}</span>
                  <span className="block text-[13px] text-grafite">{t.reorderText}</span>
                </span>
              </div>
            </div>
          </Card>

          <Card focus="3" title={t.history} className="shadow-sm">
            <div className="grid h-36 grid-cols-6 items-end gap-3 border-b-2 border-tinta/70">
              {USE.map((v, i) => (
                <span key={t.months[i]} className="flex h-full flex-col justify-end">
                  <span className="t-data text-center text-[12px] text-tinta">{v}</span>
                  <span
                    data-grow="3"
                    className="mt-1 block origin-bottom rounded-t bg-[var(--accent)]"
                    style={{ height: `${v}%`, animationDelay: `${i * 0.1}s` }}
                  />
                </span>
              ))}
            </div>
            <div className="t-data mt-1 grid grid-cols-6 gap-3 text-center text-[12px] text-grafite">
              {t.months.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </Card>
        </div>
      </Browser>

      {/* Telemóvel no armazém: entrega de EPI */}
      <Phone className="left-[880px] top-[70px] h-[560px] w-[290px]">
        <div data-focus="1" className="absolute inset-0 px-5 pb-5 pt-10">
          <p className="text-[18px] font-bold text-tinta">{t.give}</p>
          <div className="mt-4 space-y-3">
            {t.fields.map(([k, v]) => (
              <div key={k}>
                <p className="text-[12px] text-grafite">{k}</p>
                <p className="mt-1 rounded-lg border border-linha bg-papel px-3 py-2.5 font-semibold text-tinta">{v}</p>
              </div>
            ))}
          </div>
          <div className="demo-stack mt-6">
            <span data-on="0 2 3" data-click="1" className="rounded-xl bg-[var(--accent)] py-3 text-center font-semibold text-white">
              {t.confirm}
            </span>
            <span data-on="1" data-pop className="flex items-center justify-center gap-1.5 rounded-xl bg-estado-valido/10 py-3 font-semibold text-estado-valido">
              <Tick />
              {t.done}
            </span>
          </div>
        </div>
      </Phone>

      <SampleTag text={t.sample} />
    </>
  )
}
