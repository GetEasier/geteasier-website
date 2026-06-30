'use client'

import { useState } from 'react'
import { ChevronDown, Check, Minus } from 'lucide-react'
import Image from 'next/image'

type Country = 'PT' | 'BE'

interface FeatureRow {
  name: string
  base: boolean
  avancado: boolean
  premium: boolean
  beOnly?: boolean
}

interface Module {
  id: string
  label: string
  color: string
  fixedAnnual?: boolean
  features: FeatureRow[]
}

const MODULES: Module[] = [
  {
    id: 'time',
    label: 'TimeEasier',
    color: '#3B6FB5',
    features: [
      { name: 'Ficha e lista de colaboradores', base: true, avancado: true, premium: true },
      { name: 'Mapa de férias', base: true, avancado: true, premium: true },
      { name: 'Gestão de ausências', base: true, avancado: true, premium: true },
      { name: 'Registo de ponto na app (iOS / Android)', base: true, avancado: true, premium: true },
      { name: 'Controlo de horas por colaborador', base: true, avancado: true, premium: true },
      { name: 'Vários tipos de horário (isenção, pago à hora, fixo...)', base: true, avancado: true, premium: true },
      { name: 'Relatório mensal de horas (Art. 202.º CT / ACT)', base: true, avancado: true, premium: true },
      { name: 'Departamentos', base: true, avancado: true, premium: true },
      { name: 'Categorias de colaboradores', base: false, avancado: true, premium: true },
      { name: 'Gestão documental de colaboradores', base: false, avancado: true, premium: true },
      { name: 'Gestão de formações de colaboradores', base: false, avancado: true, premium: true },
      { name: 'Alertas de documentos expirados', base: false, avancado: true, premium: true },
      { name: 'Geolocalização', base: false, avancado: true, premium: true },
      { name: 'Aprovação de registos pelo responsável', base: false, avancado: true, premium: true },
      { name: 'Controlo de horas extra', base: false, avancado: true, premium: true },
      { name: 'Desativação automática de colaboradores', base: false, avancado: true, premium: true },
      { name: 'Exportação para processamento salarial', base: false, avancado: false, premium: true },
      { name: 'Integração com ERP', base: false, avancado: false, premium: true },
      { name: 'Dashboard com KPIs', base: false, avancado: false, premium: true },
      { name: 'Gestor dedicado', base: false, avancado: false, premium: true },
    ],
  },
  {
    id: 'construction',
    label: 'ConstructionEasier',
    color: '#2E8B57',
    features: [
      { name: 'Todas as funcionalidades do TimeEasier (plano correspondente)', base: true, avancado: true, premium: true },
      { name: 'Lista de obras', base: true, avancado: true, premium: true },
      { name: 'Localização de colaboradores por obra', base: true, avancado: true, premium: true },
      { name: 'Permissão Encarregado de Obra', base: true, avancado: true, premium: true },
      { name: 'Custo por colaborador', base: true, avancado: true, premium: true },
      { name: 'Subempreiteiros', base: false, avancado: true, premium: true },
      { name: 'Gestão documental de subempreiteiros', base: false, avancado: true, premium: true },
      { name: 'Permissões "Diretor de Obra", "TSST" e "Encarregado Geral"', base: false, avancado: true, premium: true },
      { name: 'Alertas de entrada de colaborador em obra', base: false, avancado: true, premium: true },
      { name: 'Progressão de carreira do colaborador', base: false, avancado: true, premium: true },
      { name: 'Auto de obra automático', base: false, avancado: true, premium: true },
      { name: 'Dashboard central para análise estratégica', base: false, avancado: true, premium: true },
      { name: 'Gestão de despesas de alojamento de colaboradores', base: false, avancado: true, premium: true },
      { name: 'Implementação e integração com ERP', base: false, avancado: false, premium: true },
      { name: 'Inserção facilitada de colaboradores e subempreiteiros', base: false, avancado: false, premium: true },
      { name: 'Integração com Check-In-At-Work', base: false, avancado: false, premium: true, beOnly: true },
    ],
  },
  {
    id: 'stock',
    label: 'StockEasier',
    color: '#A41E22',
    features: [
      { name: 'Registo de entradas e saídas de consumíveis', base: true, avancado: true, premium: true },
      { name: 'Monitorização contínua dos níveis de stock', base: true, avancado: true, premium: true },
      { name: 'Gestão por categorias e locais de armazenamento', base: true, avancado: true, premium: true },
      { name: 'Acesso simultâneo multi-utilizador', base: true, avancado: true, premium: true },
      { name: 'Alertas automáticos de reposição', base: false, avancado: true, premium: true },
      { name: 'Histórico completo de movimentos e consumos', base: false, avancado: true, premium: true },
      { name: 'Relatório de EPIs por colaborador', base: false, avancado: true, premium: true },
      { name: 'Relatórios avançados e exportações', base: false, avancado: false, premium: true },
    ],
  },
  {
    id: 'wood',
    label: 'WoodEasier',
    color: '#8B5A2B',
    fixedAnnual: true,
    features: [
      { name: 'Passaportes de madeiras tratadas', base: true, avancado: true, premium: true },
      { name: 'Rastreabilidade de lotes de madeira', base: true, avancado: true, premium: true },
      { name: 'Gestão documental de tratamentos', base: true, avancado: true, premium: true },
      { name: 'Relatórios de conformidade', base: true, avancado: true, premium: true },
    ],
  },
]

const MODULE_LOGOS: Record<string, string> = {
  time: '/images/products/icons/time-easier.png',
  construction: '/images/products/icons/construction-easier.png',
  stock: '/images/products/icons/stock-easier.png',
  wood: '/images/products/icons/wood-easier.png',
}

const COLS = 'grid-cols-[1fr_52px_60px_60px] sm:grid-cols-[1fr_72px_88px_88px]'

function FeatureMark({ value }: { value: boolean }) {
  if (value) return <Check className="w-4 h-4 text-emerald-500 mx-auto" strokeWidth={2.5} />
  return <Minus className="w-3.5 h-3.5 text-gray-200 mx-auto" />
}

export default function PlanosPage() {
  const [country, setCountry] = useState<Country>('PT')
  const [openModules, setOpenModules] = useState<Set<string>>(new Set())

  const toggleModule = (id: string) => {
    setOpenModules(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="min-h-screen bg-white pb-16">

      {/* Hero */}
      <section
        className="relative flex items-center pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden"
        style={{ background: 'linear-gradient(to bottom, rgb(191,219,254) 0%, rgb(219,234,254) 5rem, rgb(255,255,255) 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none bg-grid-blue-700/[0.04]"
          style={{
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 35%, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 35%, black 30%, transparent 75%)',
          }}
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Planos e Módulos
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto mb-10">
            Toque num módulo para ver as funcionalidades de cada plano.
          </p>

          {/* Floating product logo pills */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {MODULES.map(mod => (
              <button
                key={mod.id}
                onClick={() => {
                  setOpenModules(prev => {
                    const next = new Set(prev)
                    if (next.has(mod.id)) next.delete(mod.id)
                    else next.add(mod.id)
                    return next
                  })
                  setTimeout(() => {
                    document.getElementById(`module-${mod.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }, 50)
                }}
                className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200 rounded-2xl px-4 py-2.5"
              >
                <div
                  className="w-7 h-7 rounded-lg overflow-hidden flex-shrink-0 bg-white"
                  style={{ boxShadow: `0 1px 4px ${mod.color}35` }}
                >
                  <Image src={MODULE_LOGOS[mod.id]} alt={mod.label} width={28} height={28} className="w-full h-full object-contain" />
                </div>
                <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">{mod.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-3 sm:px-4 mt-6 sm:mt-8">

        {/* Country toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            {(['PT', 'BE'] as Country[]).map(c => (
              <button
                key={c}
                onClick={() => setCountry(c)}
                className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  country === c ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                }`}
              >
                <span>{c === 'PT' ? '🇵🇹' : '🇧🇪'}</span>
                <span>{c === 'PT' ? 'Portugal' : 'Bélgica'}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Matrix card */}
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">

          {/* Plan header */}
          <div className={`grid ${COLS} bg-gray-950 px-3 sm:px-5`}>
            <div className="py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Módulos
            </div>
            {/* Base */}
            <div className="flex flex-col items-center justify-center py-4 border-l border-gray-800">
              <span className="text-xs sm:text-sm font-bold text-gray-400">Base</span>
            </div>
            {/* Avançado */}
            <div className="flex flex-col items-center justify-center py-4 border-l border-gray-800 bg-teal-950/40">
              <span className="text-xs sm:text-sm font-bold text-teal-400">Avanç.</span>
              <span className="text-[9px] text-teal-600 uppercase tracking-wide hidden sm:block mt-0.5">popular</span>
            </div>
            {/* Premium */}
            <div className="flex flex-col items-center justify-center py-4 border-l border-gray-800 bg-white/[0.03]">
              <span className="text-xs sm:text-sm font-bold text-white">Premium</span>
            </div>
          </div>

          {/* Modules */}
          {MODULES.map((mod, idx) => {
            const isOpen = openModules.has(mod.id)
            const isFirst = idx === 0

            return (
              <div key={mod.id} id={`module-${mod.id}`} className={`${!isFirst ? 'border-t border-gray-100' : ''}`}>

                {/* Module row */}
                <button
                  onClick={() => toggleModule(mod.id)}
                  className={`w-full grid ${COLS} px-3 sm:px-5 py-3.5 sm:py-4 items-center transition-colors duration-150 ${
                    isOpen ? 'bg-gray-50' : 'bg-white hover:bg-gray-50/70 active:bg-gray-100'
                  }`}
                  style={isOpen ? { borderLeft: `3px solid ${mod.color}` } : { borderLeft: '3px solid transparent' }}
                >
                  {/* Logo + name */}
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 text-left">
                    <div
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden flex-shrink-0 bg-white"
                      style={{ boxShadow: `0 1px 6px ${mod.color}30` }}
                    >
                      <Image src={MODULE_LOGOS[mod.id]} alt={mod.label} width={36} height={36} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-semibold text-xs sm:text-sm text-gray-900 leading-tight">{mod.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 flex-shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? '-rotate-180' : ''}`}
                      />
                    </div>
                  </div>

                  {/* Plan marks */}
                  {mod.fixedAnnual ? (
                    <div className="col-span-3 text-center text-[10px] sm:text-xs text-gray-400 font-medium tracking-wide uppercase">
                      Plano único
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-center border-l border-gray-100">
                        <Check className="w-4 h-4 text-emerald-500" strokeWidth={2.5} />
                      </div>
                      <div className="flex justify-center border-l border-gray-100">
                        <Check className="w-4 h-4 text-emerald-500" strokeWidth={2.5} />
                      </div>
                      <div className="flex justify-center border-l border-gray-100">
                        <Check className="w-4 h-4 text-emerald-500" strokeWidth={2.5} />
                      </div>
                    </>
                  )}
                </button>

                {/* Feature list */}
                {isOpen && (
                  <div
                    className="border-t border-gray-100"
                    style={{ borderLeft: `3px solid ${mod.color}` }}
                  >
                    {mod.features.map((feat, fi) => {
                      if (feat.beOnly && country !== 'BE') return null
                      return (
                        <div
                          key={fi}
                          className={`grid ${COLS} px-3 sm:px-5 py-2.5 items-center ${fi % 2 === 0 ? 'bg-gray-50/60' : 'bg-white'}`}
                        >
                          <div className="text-[11px] sm:text-xs text-gray-600 leading-snug pr-2">
                            {feat.name}
                            {feat.beOnly && <span className="ml-1 text-[10px] text-blue-400">🇧🇪</span>}
                          </div>
                          <div className="flex justify-center border-l border-gray-100/80">
                            <FeatureMark value={feat.base} />
                          </div>
                          <div className="flex justify-center border-l border-gray-100/80">
                            <FeatureMark value={feat.avancado} />
                          </div>
                          <div className="flex justify-center border-l border-gray-100/80">
                            <FeatureMark value={feat.premium} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}

          {/* Footnote */}
          <div className="px-4 sm:px-5 py-3.5 border-t border-gray-100 bg-gray-50">
            <p className="text-[10px] sm:text-xs text-gray-400 leading-relaxed">
              Mínimo de 25 colaboradores nos módulos por colaborador. O ConstructionEasier inclui todas as funcionalidades do TimeEasier no plano correspondente. Acresce IVA à taxa legal em vigor.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
