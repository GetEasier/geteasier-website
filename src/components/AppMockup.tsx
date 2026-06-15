'use client'

const HERO_PRODUCTS = [
  { name: 'TimeEasier', color: '#4285F4' },
  { name: 'ConstructionEasier', color: '#34A853' },
  { name: 'StockEasier', color: '#EA4335' },
  { name: 'WoodEasier', color: '#D4A574' },
]

const CHART_BARS = [42, 68, 50, 85, 60, 92, 74, 55, 80, 66]

function WindowTopBar({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-100 bg-gray-50/80">
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
      </div>
      <div className="flex-1 flex justify-center">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-gray-200 text-[10px] text-gray-500 font-medium">
          <svg className="w-2.5 h-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          {label}
        </div>
      </div>
      <div className="w-8" />
    </div>
  )
}

function StatCard({ color, value, barWidth }: { color: string; value: string; barWidth: string }) {
  return (
    <div className="rounded-lg border border-gray-100 bg-white p-2 md:p-2.5 space-y-1.5 shadow-sm">
      <div
        className="w-5 h-5 md:w-6 md:h-6 rounded-md flex items-center justify-center"
        style={{ backgroundColor: `${color}1f` }}
      >
        <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-sm" style={{ backgroundColor: color }} />
      </div>
      <p className="text-xs md:text-sm font-bold text-gray-900 leading-none">{value}</p>
      <div className="h-1.5 rounded-full bg-gray-100" style={{ width: barWidth }} />
    </div>
  )
}

/**
 * Mockup de dashboard multi-produto para o hero da homepage,
 * com pílulas flutuantes dos produtos à volta da janela.
 */
export function HeroMockup() {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Glow decorativo atrás da janela */}
      <div className="absolute -inset-6 bg-gradient-to-tr from-blue-200/60 via-blue-100/40 to-transparent rounded-[2rem] blur-2xl pointer-events-none" />

      <div className="relative rounded-2xl border border-gray-200/80 bg-white shadow-2xl shadow-blue-900/10 overflow-hidden">
        <WindowTopBar label="app.geteasier.pt" />
        <div className="flex">
          {/* Sidebar com os 4 produtos */}
          <div className="hidden sm:flex w-40 flex-col gap-1 border-r border-gray-100 p-3 bg-gray-50/50">
            <div className="flex items-center gap-2 px-2 py-1.5 mb-2">
              <span className="w-5 h-5 rounded-md bg-gradient-to-br from-blue-600 to-blue-800" />
              <span className="text-[11px] font-bold text-gray-900">GetEasier</span>
            </div>
            {HERO_PRODUCTS.map((product, idx) => (
              <div
                key={product.name}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg ${idx === 0 ? 'bg-white shadow-sm border border-gray-100' : ''}`}
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: product.color }} />
                <span className={`text-[10px] font-medium truncate ${idx === 0 ? 'text-gray-900' : 'text-gray-400'}`}>
                  {product.name}
                </span>
              </div>
            ))}
          </div>

          {/* Área principal */}
          <div className="flex-1 p-3 md:p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs md:text-sm font-bold text-gray-900 leading-none">Dashboard</p>
                <div className="h-1.5 w-16 rounded-full bg-gray-100" />
              </div>
              <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700" />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <StatCard color="#4285F4" value="128h" barWidth="70%" />
              <StatCard color="#34A853" value="98%" barWidth="55%" />
              <StatCard color="#EA4335" value="24" barWidth="80%" />
            </div>

            {/* Gráfico de barras */}
            <div className="rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="h-1.5 w-14 rounded-full bg-gray-200" />
                <div className="h-1.5 w-8 rounded-full bg-gray-100" />
              </div>
              <div className="flex items-end gap-1.5 h-16 md:h-20">
                {CHART_BARS.map((height, idx) => (
                  <div
                    key={idx}
                    className="flex-1 rounded-t-sm"
                    style={{
                      height: `${height}%`,
                      backgroundColor: HERO_PRODUCTS[idx % HERO_PRODUCTS.length].color,
                      opacity: idx % 2 === 0 ? 0.85 : 0.45,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pílulas flutuantes dos produtos */}
      <div className="absolute -top-4 -left-2 md:-left-8 animate-float">
        <ProductPill name="TimeEasier" color="#4285F4" />
      </div>
      <div className="absolute -bottom-4 -right-2 md:-right-6 animate-float [animation-delay:1.5s]">
        <ProductPill name="WoodEasier" color="#D4A574" />
      </div>
      <div className="absolute top-1/2 -right-3 md:-right-10 animate-float [animation-delay:3s]">
        <ProductPill name="StockEasier" color="#EA4335" />
      </div>
    </div>
  )
}

function ProductPill({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white shadow-lg border border-gray-100 px-3 py-1.5">
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-xs font-semibold text-gray-800 whitespace-nowrap">{name}</span>
    </div>
  )
}

interface ProductMockupProps {
  name: string
  color: string
  className?: string
}

/**
 * Janela de aplicação estilizada na cor do produto — usada na secção
 * de produtos da homepage e nos heros das páginas de produto.
 */
export function ProductMockup({ name, color, className }: ProductMockupProps) {
  return (
    <div className={`w-full h-full flex items-center justify-center p-4 md:p-8 ${className ?? ''}`}>
      <div className="w-full max-w-lg rounded-xl md:rounded-2xl border border-gray-200/80 bg-white shadow-xl overflow-hidden">
        <WindowTopBar label={name} />
        <div className="flex">
          {/* Sidebar */}
          <div className="hidden sm:flex w-28 md:w-32 flex-col gap-1 border-r border-gray-100 p-2.5 bg-gray-50/50">
            <div className="flex items-center gap-1.5 px-1.5 py-1 mb-1.5">
              <span className="w-4 h-4 rounded" style={{ backgroundColor: color }} />
              <div className="h-1.5 flex-1 rounded-full bg-gray-200" />
            </div>
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-1.5 py-1.5 rounded-md"
                style={idx === 0 ? { backgroundColor: `${color}14` } : undefined}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: idx === 0 ? color : '#d1d5db' }}
                />
                <div
                  className="h-1.5 rounded-full"
                  style={{
                    width: `${70 - idx * 10}%`,
                    backgroundColor: idx === 0 ? `${color}66` : '#e5e7eb',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Área principal */}
          <div className="flex-1 p-3 md:p-4 space-y-2.5 md:space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs md:text-sm font-bold leading-none" style={{ color }}>{name}</p>
              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full" style={{ backgroundColor: `${color}33` }} />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {['68%', '54%', '82%'].map((barWidth, idx) => (
                <div key={idx} className="rounded-lg border border-gray-100 bg-white p-2 space-y-1.5 shadow-sm">
                  <span className="block w-4 h-4 md:w-5 md:h-5 rounded-md" style={{ backgroundColor: `${color}1f` }} />
                  <div className="h-2 rounded-full bg-gray-800/80" style={{ width: barWidth }} />
                  <div className="h-1.5 w-full rounded-full bg-gray-100" />
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-gray-100 bg-white p-2.5 md:p-3 shadow-sm space-y-2">
              {[88, 64, 42].map((progress, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${color}1f` }}
                  >
                    <svg className="w-2 h-2" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: color, opacity: 0.7 }} />
                  </div>
                  <span className="text-[9px] md:text-[10px] font-semibold text-gray-500 w-7 text-right">{progress}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
