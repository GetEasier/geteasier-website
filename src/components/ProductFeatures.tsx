import type { ReactNode } from 'react'
import { products } from '@/content/products'
import type { Locale, ProductId } from '@/lib/seo.config'
import { PRODUCT_THEME } from '@/lib/product-theme'
import { cn } from '@/lib/utils'
import { FaceMesh } from '@/components/demos/DemoWindow'

// Funcionalidades em cartões: três em destaque com uma pequena ilustração do ecrã,
// as restantes em cartões com um ícone próprio. As ilustrações são decorativas (aria-hidden)
// e usam dados de exemplo; o texto de cada cartão é a funcionalidade publicada.

type Icon = keyof typeof ICON_PATHS

const ICON_PATHS = {
  clock: 'M12 7v5l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  face: 'M8 3H5a2 2 0 00-2 2v3M16 3h3a2 2 0 012 2v3M8 21H5a2 2 0 01-2-2v-3M16 21h3a2 2 0 002-2v-3M9 10v1M15 10v1M9.5 15.5a3.5 3.5 0 005 0',
  pin: 'M12 21s7-6.2 7-11.5a7 7 0 00-14 0C5 14.8 12 21 12 21zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  sun: 'M12 16a4 4 0 100-8 4 4 0 000 8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  plusClock: 'M13 3.1A9 9 0 1020.9 11M12 7v5l3 2M19 2v6M16 5h6',
  approve: 'M9 12l2 2 4-4M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6z',
  doc: 'M14 3H6v18h12V7zM14 3v4h4M9 12h6M9 16h6',
  chart: 'M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6',
  plug: 'M9 3v5M15 3v5M6 8h12v3a6 6 0 01-12 0zM12 17v4',
  building: 'M4 21V8l8-5 8 5v13M9 21v-6h6v6M4 21h16',
  users: 'M9 11a4 4 0 100-8 4 4 0 000 8zM2 21v-1a6 6 0 0112 0v1M16 3.5a4 4 0 010 7M22 21v-1a6 6 0 00-4-5.6',
  key: 'M15 9a4 4 0 11-2.6-3.7L21 13.9V17h-3v2h-2v2h-3v-3.1l-3.4-3.4',
  euro: 'M17 6.5A7 7 0 007 12a7 7 0 0010 5.5M4 10h9M4 14h9',
  fileCheck: 'M14 3H6v18h12V7zM14 3v4h4M9 14l2 2 4-4',
  folder: 'M3 6h6l2 2h10v12H3z',
  home: 'M3 11l9-8 9 8M5 9.5V21h14V9.5M10 21v-6h4v6',
  dashboard: 'M4 4h7v9H4zM13 4h7v5h-7zM13 11h7v9h-7zM4 15h7v5H4z',
  box: 'M3 7l9-4 9 4-9 4zM3 7v10l9 4 9-4V7M12 11v10',
  gauge: 'M4 18a8 8 0 1116 0M12 18l4-6M4 18h16',
  bell: 'M6 16V11a6 6 0 0112 0v5l2 2H4zM10 21a2 2 0 004 0',
  history: 'M3 12a9 9 0 103-6.7M3 4v4h4M12 8v4l3 2',
  tag: 'M3 12V3h9l9 9-9 9zM7.5 7.5h.01',
  userBox: 'M8 10a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM2 20v-1a6 6 0 0110-4.5M14 14h8v7h-8zM14 17h8',
  devices: 'M3 5h13v10H3zM1 19h17M18 9h5v11h-5z',
  download: 'M12 3v12M7 10l5 5 5-5M4 21h16',
  layers: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17l9 5 9-5',
  thermo: 'M10 13.5V5a2 2 0 014 0v8.5a4 4 0 11-4 0zM12 9v7',
  passport: 'M5 3h14v18H5zM12 13a3 3 0 100-6 3 3 0 000 6zM9 17h6',
  stamp: 'M9 3h6v5l2 4H7l2-4zM5 12h14v4H5zM5 20h14',
  route: 'M6 19a2 2 0 100-4 2 2 0 000 4zM18 9a2 2 0 100-4 2 2 0 000 4zM8 17h7a3 3 0 000-6H9a3 3 0 010-6h7',
  factory: 'M3 21V10l6 4v-4l6 4V4h6v17zM3 21h18',
  search: 'M11 18a7 7 0 100-14 7 7 0 000 14zM21 21l-5-5',
} as const

const ICONS: Record<ProductId, Icon[]> = {
  timeEasier: ['clock', 'face', 'pin', 'calendar', 'sun', 'plusClock', 'approve', 'doc', 'chart', 'plug'],
  constructionEasier: ['building', 'pin', 'users', 'key', 'euro', 'fileCheck', 'folder', 'home', 'dashboard', 'clock'],
  stockEasier: ['box', 'gauge', 'bell', 'history', 'tag', 'userBox', 'devices', 'download'],
  woodEasier: ['layers', 'thermo', 'passport', 'stamp', 'route', 'factory', 'search'],
}

// Índices (na lista de funcionalidades) das três em destaque.
const HIGHLIGHTS: Record<ProductId, number[]> = {
  timeEasier: [1, 4, 8],
  constructionEasier: [0, 2, 4],
  stockEasier: [1, 2, 5],
  woodEasier: [1, 2, 3],
}

function FeatureIcon({ name, className }: { name: Icon; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('h-6 w-6', className)} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICON_PATHS[name]} />
    </svg>
  )
}

const bar = (w: string, c: string) => <span className={cn('block h-2 rounded-full', c)} style={{ width: w }} />

// Pequenos ecrãs, um por funcionalidade em destaque. Chave: `${produto}-${índice}`.
function illustration(key: string, hex: string, pt: boolean): ReactNode {
  const accent = { backgroundColor: hex }
  const color = { color: hex }
  switch (key) {
    case 'timeEasier-1':
      return (
        <div className="mx-auto w-32 rounded-xl bg-tinta p-2 shadow-lg">
          <div className="relative aspect-square rounded-lg border border-white/15">
            <FaceMesh className="feat-scan-face absolute inset-2 text-ciano" />
            <span className="feat-scan absolute inset-x-2 top-2 h-0.5 rounded bg-ciano shadow-[0_0_10px_#6CD3E6]" />
          </div>
          <p className="mt-2 rounded bg-white py-1 text-center text-[11px] font-bold text-tinta">✓ 07:58</p>
        </div>
      )
    case 'timeEasier-4': {
      const off = [9, 10, 11, 12, 13]
      return (
        <div className="grid w-44 grid-cols-7 gap-1">
          {Array.from({ length: 21 }, (_, i) => (
            <span
              key={i}
              className={cn('aspect-square rounded-[4px]', off.includes(i) ? 'feat-pop' : 'bg-white')}
              style={off.includes(i) ? { ...accent, animationDelay: `${(i - 9) * 90}ms` } : undefined}
            />
          ))}
        </div>
      )
    }
    case 'timeEasier-8':
      return (
        <div className="flex h-24 w-44 items-end gap-2 border-b-2 border-tinta/70 px-1">
          {[70, 88, 62, 95, 80, 74].map((h, i) => (
            <span key={i} className="feat-grow flex-1 rounded-t-[3px]" style={{ ...accent, height: `${h}%`, animationDelay: `${i * 80}ms` }} />
          ))}
        </div>
      )
    case 'constructionEasier-0':
      return (
        <div className="w-48 space-y-2.5">
          {['82%', '45%', '100%'].map((w, i) => (
            <div key={w} className="rounded-md bg-white p-2 shadow-sm">
              {bar(['60%', '72%', '50%'][i], 'bg-tinta/15')}
              <span className="mt-1.5 block h-1.5 rounded-full bg-linha">
                <span className="feat-bar block h-full rounded-full" style={{ ...accent, width: w, animationDelay: `${i * 120}ms` }} />
              </span>
            </div>
          ))}
        </div>
      )
    case 'constructionEasier-2':
      return (
        <div className="w-48 space-y-2">
          {[
            ['bg-estado-valido', '✓'],
            ['bg-estado-aviso', '!'],
            ['bg-estado-valido', '✓'],
          ].map(([c, s], i) => (
            <div key={i} className="feat-rise flex items-center gap-2 rounded-md bg-white p-2 shadow-sm" style={{ animationDelay: `${i * 120}ms` }}>
              <span className="h-6 w-6 rounded-full" style={accent} />
              <span className="flex-1">{bar(['70%', '55%', '80%'][i], 'bg-tinta/15')}</span>
              <span className={cn('grid h-5 w-5 place-items-center rounded-full text-[11px] font-bold text-white', c)}>{s}</span>
            </div>
          ))}
        </div>
      )
    case 'constructionEasier-4':
      return (
        <div className="w-48 space-y-3">
          {[
            [pt ? 'Materiais' : 'Materials', '64%'],
            [pt ? 'Mão de obra' : 'Labour', '36%'],
          ].map(([l, w], i) => (
            <div key={l}>
              <span className="text-[11px] font-semibold text-tinta">{l}</span>
              <span className="mt-1 block h-3 rounded-full bg-white">
                <span className="feat-bar block h-full rounded-full" style={{ backgroundColor: i ? '#6CD3E6' : hex, width: w, animationDelay: `${i * 150}ms` }} />
              </span>
            </div>
          ))}
          <p className="text-right text-lg font-bold" style={color}>€</p>
        </div>
      )
    case 'stockEasier-1':
      return (
        <div className="w-48">
          <div className="relative h-4 rounded-full bg-white">
            <span className="feat-bar block h-full rounded-full" style={{ ...accent, width: '70%' }} />
            <span className="absolute -bottom-1 -top-1 left-[15%] w-0.5 bg-tinta" />
          </div>
          <div className="mt-3 flex justify-between">
            {[40, 70, 25].map((v, i) => (
              <span key={i} className="grid h-12 w-12 place-items-end rounded-md bg-white p-1 shadow-sm">
                <span className="feat-grow w-full rounded-sm" style={{ backgroundColor: v < 30 ? '#D98A00' : hex, height: `${v}%`, animationDelay: `${i * 100}ms` }} />
              </span>
            ))}
          </div>
        </div>
      )
    case 'stockEasier-2':
      return (
        <div className="feat-pop flex w-48 items-center gap-2 rounded-lg border-2 border-estado-aviso bg-white p-3 shadow-md">
          <FeatureIcon name="bell" className="feat-ring text-estado-aviso" />
          <span className="flex-1 space-y-1.5">
            {bar('85%', 'bg-tinta/20')}
            {bar('55%', 'bg-tinta/10')}
          </span>
        </div>
      )
    case 'stockEasier-5':
      return (
        <div className="w-48 space-y-2">
          {[3, 2, 4].map((n, i) => (
            <div key={i} className="feat-rise flex items-center gap-2 rounded-md bg-white p-2 shadow-sm" style={{ animationDelay: `${i * 120}ms` }}>
              <span className="h-6 w-6 rounded-full bg-tinta/15" />
              <span className="flex flex-1 gap-1">
                {Array.from({ length: n }, (_, k) => (
                  <span key={k} className="h-3 w-3 rounded-sm" style={accent} />
                ))}
              </span>
            </div>
          ))}
        </div>
      )
    case 'woodEasier-1':
      return (
        <svg viewBox="0 0 200 100" className="w-48" fill="none">
          <path d="M10 90h180" stroke="#06083C" strokeOpacity=".5" />
          <path d="M10 30h180" stroke="#4A5263" strokeDasharray="4 4" />
          <path className="feat-draw" pathLength={1} d="M10 88C40 86 60 32 90 30h60c14 0 24 30 40 44" stroke={hex} strokeWidth="3" strokeLinecap="round" />
          <text x="186" y="24" textAnchor="end" fontSize="11" fill="#06083C" fontWeight="600">56 °C</text>
        </svg>
      )
    case 'woodEasier-2':
      return (
        <div className="feat-pop w-40 rounded-lg border border-tinta/20 bg-white p-3 shadow-md">
          <span className="block h-2 w-16 rounded-full" style={accent} />
          <div className="mt-3 space-y-1.5">
            {bar('90%', 'bg-tinta/15')}
            {bar('70%', 'bg-tinta/15')}
            {bar('80%', 'bg-tinta/15')}
          </div>
          <div className="mt-3 grid grid-cols-6 gap-0.5">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} className={cn('aspect-square', (i * 7) % 3 ? 'bg-tinta' : 'bg-white')} />
            ))}
          </div>
        </div>
      )
    case 'woodEasier-3':
      return (
        <div className="relative w-36">
          <div className="rounded-lg bg-white p-3 shadow-md">
            <p className="text-[11px] font-bold text-tinta">DGAV</p>
            <div className="mt-2 space-y-1.5">
              {bar('90%', 'bg-tinta/15')}
              {bar('75%', 'bg-tinta/15')}
              {bar('85%', 'bg-tinta/15')}
              {bar('60%', 'bg-tinta/15')}
            </div>
          </div>
          <span className="feat-pop absolute -bottom-3 -right-3 grid h-10 w-10 place-items-center rounded-full bg-estado-valido text-lg font-bold text-white shadow-md">✓</span>
        </div>
      )
    default:
      return null
  }
}

export default function ProductFeatures({ id, locale }: { id: ProductId; locale: Locale }) {
  const item = products[locale].items[id]
  const theme = PRODUCT_THEME[id]
  const icons = ICONS[id]
  const highlights = HIGHLIGHTS[id]
  const rest = item.features.map((f, i) => ({ f, i })).filter(({ i }) => !highlights.includes(i))

  return (
    <div>
      <ul className="grid gap-5 md:grid-cols-3">
        {highlights.map((i) => {
          const f = item.features[i]
          return (
            <li key={f.term} className="feat-card reveal-panel overflow-hidden rounded-frame border border-linha bg-white shadow-[0_18px_40px_-28px_rgba(6,8,60,.45)] transition-transform duration-300 hover:-translate-y-1">
              <div aria-hidden="true" className={cn('grid h-40 place-items-center overflow-hidden', theme.tint)}>
                {illustration(`${id}-${i}`, theme.hex, locale === 'pt')}
              </div>
              <div className="p-5">
                <h3 className="flex items-center gap-2 text-lead font-semibold">
                  <FeatureIcon name={icons[i]} className={cn('h-5 w-5', theme.text)} />
                  {f.term}
                </h3>
                <p className="mt-1.5 text-small text-grafite">{f.desc}</p>
              </div>
            </li>
          )
        })}
      </ul>

      {/* As restantes em cartões compactos: ícone ao lado do texto */}
      <ul className={cn('mt-5 grid gap-3 sm:grid-cols-2', rest.length % 3 === 0 || rest.length === 5 ? 'lg:grid-cols-3' : 'lg:grid-cols-4')}>
        {rest.map(({ f, i }) => (
          <li
            key={f.term}
            className="reveal-panel group flex items-start gap-3.5 rounded-frame border border-linha bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-28px_rgba(6,8,60,.45)]"
          >
            <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-ctl transition-transform duration-300 group-hover:scale-110', theme.tint, theme.text)}>
              <FeatureIcon name={icons[i]} className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h3 className="font-semibold leading-snug">{f.term}</h3>
              <p className="mt-0.5 text-small text-grafite">{f.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
