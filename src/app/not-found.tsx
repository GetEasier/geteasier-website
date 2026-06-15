'use client'

import Link from 'next/link'
import { ArrowRight, Home, Boxes } from 'lucide-react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { useLanguage } from '@/contexts/LanguageContext'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-[70vh] pt-28 pb-20 overflow-hidden"
      style={{
        background:
          'linear-gradient(to bottom, rgb(191, 219, 254) 0%, rgb(219, 234, 254) 6rem, rgb(255, 255, 255) 100%)',
      }}
    >
      <div
        className="absolute inset-0 bg-grid-blue-700/[0.04] pointer-events-none"
        style={{
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)',
        }}
      />

      <MaxWidthWrapper className="relative z-10 w-full">
        <div className="max-w-xl mx-auto text-center px-4">
          <p className="text-7xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent mb-4">
            {t('notFound.code')}
          </p>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            {t('notFound.title')}
          </h1>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
            {t('notFound.description')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold text-base shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              <Home className="w-4 h-4" />
              {t('notFound.backHome')}
            </Link>
            <Link
              href="/#products-list"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white text-gray-800 font-semibold text-base border border-gray-200 shadow-sm hover:border-blue-300 hover:text-blue-700 hover:shadow-md transition-all duration-200"
            >
              <Boxes className="w-4 h-4" />
              {t('notFound.viewProducts')}
            </Link>
          </div>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-1.5 mt-6 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            {t('notFound.contact')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
