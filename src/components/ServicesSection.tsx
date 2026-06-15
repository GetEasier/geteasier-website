'use client'

import { Code2, Boxes, LifeBuoy } from 'lucide-react'
import { Link as ScrollLink } from 'react-scroll'
import MaxWidthWrapper from './MaxWidthWrapper'
import AnimationFadeUp from '@/components/animation/fade-up'
import { useLanguage } from '@/contexts/LanguageContext'

const PRODUCT_DOTS = [
  { name: 'TimeEasier', color: '#4285F4' },
  { name: 'ConstructionEasier', color: '#34A853' },
  { name: 'StockEasier', color: '#EA4335' },
  { name: 'WoodEasier', color: '#D4A574' },
]

export default function ServicesSection() {
  const { t } = useLanguage()

  const services = [
    {
      key: 'custom',
      icon: Code2,
      gradient: 'from-blue-500 to-blue-700',
      scrollTo: 'contact',
    },
    {
      key: 'products',
      icon: Boxes,
      gradient: 'from-violet-500 to-violet-700',
      scrollTo: 'products-list',
    },
    {
      key: 'support',
      icon: LifeBuoy,
      gradient: 'from-cyan-500 to-cyan-700',
      scrollTo: 'contact',
    },
  ]

  return (
    <section className="w-full py-16 md:py-20" id="services">
      <MaxWidthWrapper>
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16 px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            {t('services.title')}
          </h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-8 px-4 items-stretch">
          {services.map((service, idx) => (
            <AnimationFadeUp key={service.key} delay={0.1 + idx * 0.1} duration={0.5} once className="h-full">
              <ScrollLink to={service.scrollTo} smooth offset={-80} className="block h-full cursor-pointer touch-manipulation">
                <div className="group relative h-full flex flex-col rounded-2xl border border-gray-200/80 bg-white p-6 md:p-8 shadow-sm lg:hover:shadow-xl lg:hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 shadow-lg lg:group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                    {t(`services.${service.key}.title`)}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed flex-1">
                    {t(`services.${service.key}.description`)}
                  </p>
                  {service.key === 'products' && (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-5 sm:flex sm:flex-wrap">
                      {PRODUCT_DOTS.map((product) => (
                        <span key={product.name} className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: product.color }} />
                          <span className="truncate">{product.name}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollLink>
            </AnimationFadeUp>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
