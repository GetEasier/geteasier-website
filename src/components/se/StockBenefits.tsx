'use client'

import type { ReactNode } from 'react'
import ScrollStory from '@/components/demos/ScrollStory'
import { StatusIcon } from '@/components/checkin/Badge'
import type { Locale } from '@/lib/seo.config'

// StockEasier: o que muda no armazém, contado ao descer (ScrollStory). Dados de exemplo.

const T = {
  pt: {
    title: 'O que muda com o StockEasier',
    intro: 'Da caixa que chega ao armazém ao consumo de cada mês.',
    steps: [
      { title: 'Entradas registadas num instante', text: 'Chega uma caixa de luvas: dá entrada e o stock sobe logo. Sem folhas de cálculo para atualizar.' },
      { title: 'Cada entrega fica com nome', text: 'Sabe que EPIs entregou a cada colaborador e quando. O registo fica no histórico dessa pessoa.' },
      { title: 'O aviso chega antes de faltar', text: 'Quando um artigo chega ao nível mínimo, o StockEasier avisa. Menos compras de urgência.' },
      { title: 'Quanto se gasta em cada mês', text: 'O histórico mostra o consumo de cada artigo, mês a mês, para comprar a quantidade certa.' },
    ],
    item: 'Luvas de proteção',
    meta: 'EPI · Armazém · par',
    inStock: 'Em stock',
    entry: 'Entrada · fornecedor',
    today: 'Entregas de hoje',
    deliveries: [
      ['Carla P.', 'Luvas de proteção', '1 par'],
      ['Hugo T.', 'Capacete', '1'],
      ['Rui M.', 'Botas de segurança', '1 par'],
    ],
    min: 'Mínimo 30',
    alert: 'Repor luvas de proteção',
    alertText: '18 pares, abaixo do mínimo de 30',
    monthly: 'Consumo por mês',
    months: ['abr', 'mai', 'jun', 'jul', 'ago', 'set'],
  },
  en: {
    title: 'What changes with StockEasier',
    intro: 'From the box that arrives at the warehouse to each month’s consumption.',
    steps: [
      { title: 'Stock-ins recorded in seconds', text: 'A box of gloves arrives: record it and the stock goes up straight away. No spreadsheets to update.' },
      { title: 'Every hand-out has a name', text: 'Know which PPE you gave each employee and when. It stays in that person’s history.' },
      { title: 'The warning comes before you run out', text: 'When an item reaches its minimum level, StockEasier warns you. Fewer urgent purchases.' },
      { title: 'How much you use each month', text: 'The history shows each item’s consumption, month by month, so you buy the right amount.' },
    ],
    item: 'Safety gloves',
    meta: 'PPE · Warehouse · pair',
    inStock: 'In stock',
    entry: 'Stock-in · supplier',
    today: 'Today’s hand-outs',
    deliveries: [
      ['Carla P.', 'Safety gloves', '1 pair'],
      ['Hugo T.', 'Helmet', '1'],
      ['Rui M.', 'Safety boots', '1 pair'],
    ],
    min: 'Minimum 30',
    alert: 'Reorder safety gloves',
    alertText: '18 pairs, below the minimum of 30',
    monthly: 'Monthly consumption',
    months: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  },
}

type Dict = (typeof T)['pt']

const card = 'w-full max-w-[25rem] rounded-2xl bg-white p-5 shadow-[0_30px_60px_-30px_rgba(6,8,60,.5)]'

function Screen({ i, t }: { i: number; t: Dict }): ReactNode {
  if (i === 0)
    return (
      <div className={card}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-bold">{t.item}</p>
            <p className="text-data text-grafite">{t.meta}</p>
          </div>
          <div className="text-right">
            <p className="text-data uppercase text-grafite">{t.inStock}</p>
            <p className="tb-state grid text-[2rem] font-semibold leading-none text-produto-stock">
              <span className="tb-a" style={{ transitionDelay: '600ms' }}>28</span>
              <span className="tb-b" style={{ transitionDelay: '600ms' }}>128</span>
            </p>
          </div>
        </div>
        <p className="tb-alert mt-5 flex items-center justify-between rounded-xl bg-[#E3F4EC] px-3 py-2.5 text-small">
          <span className="font-semibold">{t.entry}</span>
          <span className="t-data font-bold text-estado-valido">+100</span>
        </p>
      </div>
    )
  if (i === 1)
    return (
      <div className={card}>
        <p className="font-bold">{t.today}</p>
        <ul className="mt-3 divide-y divide-linha">
          {t.deliveries.map(([who, what, qty], k) => (
            <li key={who} className="tb-rise flex items-center gap-3 py-3" style={{ transitionDelay: `${200 + k * 250}ms` }}>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-produto-stock-claro text-data font-bold text-produto-stock">{who[0]}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-small font-semibold">{who}</span>
                <span className="block text-data text-grafite">{what}</span>
              </span>
              <span className="t-data">{qty}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  if (i === 2)
    return (
      <div className={card}>
        <p className="flex items-baseline justify-between font-bold">
          {t.item}
          <span className="tb-state grid t-data text-produto-stock">
            <span className="tb-a">46</span>
            <span className="tb-b">18</span>
          </span>
        </p>
        <div className="relative mt-4">
          <span className="block h-3 rounded-full bg-papel">
            <span className="tb-shrink block h-full w-[46%] origin-left rounded-full bg-produto-stock" />
          </span>
          <span className="absolute -bottom-1.5 -top-1.5 left-[30%] w-0.5 bg-tinta" />
          <p className="mt-2 pl-[calc(30%+8px)] text-data text-grafite">{t.min}</p>
        </div>
        <p className="tb-done mt-4 flex items-start gap-2 rounded-xl border-2 border-estado-aviso bg-[#FFF8E6] p-3 text-small">
          <StatusIcon status="soon" className="mt-0.5 text-estado-aviso" />
          <span>
            <span className="block font-bold text-estado-aviso">{t.alert}</span>
            <span className="block text-grafite">{t.alertText}</span>
          </span>
        </p>
      </div>
    )
  return (
    <div className={card}>
      <p className="font-bold">{t.monthly}</p>
      <div className="mt-4 flex h-40 items-end gap-3 border-b border-linha">
        {[62, 71, 58, 80, 66, 74].map((v, k) => (
          <span key={k} className="flex flex-1 flex-col items-center justify-end gap-1 self-stretch">
            <span className="t-data text-[11px] text-grafite">{v}</span>
            <span className="tb-grow block w-full origin-bottom rounded-t-md bg-produto-stock" style={{ height: `${v}%`, transitionDelay: `${k * 90}ms` }} />
          </span>
        ))}
      </div>
      <div className="mt-1.5 flex gap-3">
        {t.months.map((m) => (
          <span key={m} className="flex-1 text-center text-data text-grafite">
            {m}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function StockBenefits({ locale }: { locale: Locale }) {
  const t = T[locale]
  return (
    <ScrollStory
      headingId="beneficios-titulo"
      title={t.title}
      intro={t.intro}
      steps={t.steps}
      tint="bg-produto-stock-claro"
      accent="#A51F2D"
      screen={(i) => <Screen i={i} t={t} />}
    />
  )
}
