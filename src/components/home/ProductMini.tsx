import type { ProductId, Locale } from '@/lib/seo.config'
import { StatusIcon } from '@/components/checkin/Badge'

// Ecrã pequeno de cada produto no início. Cada um tem duas fases (antes / depois) e muda uma vez
// quando o painel entra no ecrã (classe .is-on posta pelo HomeMotion); ao passar o rato repete.
// Sem JS fica no estado "depois". Dados de exemplo.
const T = {
  pt: {
    time: { before: 'A reconhecer rosto', after: 'Presença registada' },
    obras: { doc: 'Seguro da Cofragens Tejo', before: 'Em falta', after: 'Válido até dezembro' },
    stock: { item: 'Luvas de proteção', out: 'Saída de 6 pares para Hugo Tavares', alert: 'Abaixo do mínimo: repor' },
    wood: { lot: 'Lote L-114', before: 'Em tratamento', after: 'Expedido com passaporte' },
  },
  en: {
    time: { before: 'Recognising face', after: 'Attendance recorded' },
    obras: { doc: 'Cofragens Tejo insurance', before: 'Missing', after: 'Valid until December' },
    stock: { item: 'Safety gloves', out: '6 pairs handed to Hugo Tavares', alert: 'Below minimum: reorder' },
    wood: { lot: 'Lot L-114', before: 'Being treated', after: 'Shipped with passport' },
  },
}

export default function ProductMini({ id, locale }: { id: ProductId; locale: Locale }) {
  const t = T[locale]
  if (id === 'timeEasier')
    return (
      <div className="mini mini-time" aria-hidden="true">
        <span className="mini-swap">
          <span className="mini-a">{t.time.before}</span>
          <span className="mini-b">
            Olá, Rui! <span className="text-[#7BE3B8]">{t.time.after}</span> <span className="t-data">07:42</span>
          </span>
        </span>
      </div>
    )
  if (id === 'constructionEasier')
    return (
      <div className="mini" aria-hidden="true">
        <p className="font-semibold">{t.obras.doc}</p>
        <span className="mini-swap mt-1">
          <span className="mini-a flex items-center gap-1.5 text-estado-erro">
            <StatusIcon status="missing" />
            {t.obras.before}
          </span>
          <span className="mini-b flex items-center gap-1.5 text-estado-valido">
            <StatusIcon status="ok" />
            {t.obras.after}
          </span>
        </span>
      </div>
    )
  if (id === 'stockEasier')
    return (
      <div className="mini" aria-hidden="true">
        <p className="flex justify-between font-semibold">
          {t.stock.item}
          <span className="mini-swap t-data">
            <span className="mini-a">24</span>
            <span className="mini-b">18</span>
          </span>
        </p>
        <span className="mini-bar mt-2 block h-1.5 bg-linha">
          <span className="block h-full origin-left bg-produto-stock" />
        </span>
        <span className="mini-swap mt-2 text-[13px]">
          <span className="mini-a text-grafite">{t.stock.out}</span>
          <span className="mini-b flex items-center gap-1.5 font-semibold text-estado-aviso">
            <StatusIcon status="soon" />
            {t.stock.alert}
          </span>
        </span>
      </div>
    )
  return (
    <div className="mini" aria-hidden="true">
      <p className="font-semibold">{t.wood.lot}</p>
      <span className="mini-swap mt-1">
        <span className="mini-a text-grafite">{t.wood.before}</span>
        <span className="mini-b flex items-center gap-1.5 text-estado-valido">
          <StatusIcon status="ok" />
          {t.wood.after}
        </span>
      </span>
    </div>
  )
}
