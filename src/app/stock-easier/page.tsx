'use client'

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import { Button } from "@/components/ui/moving-border";
import AnimationFadeUp from "@/components/animation/fade-up";
import ContactForm from "@/components/ContactForm";
import { useLanguage } from "@/contexts/LanguageContext";

export default function StockEasierPage() {
  const { t } = useLanguage();
  return (
    <div className="px-0 relative z-0 bg-white">
      {/* Hero Section - Mobile Optimized */}
      <section className="relative min-h-[auto] flex items-center pt-24 md:pt-32 pb-12 md:pb-20 bg-gradient-to-b from-blue-100 to-white">
        <MaxWidthWrapper className="relative z-10 w-full px-4 md:px-0">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
            {/* Visual Card - Mobile First, appears first on mobile */}
            <AnimationFadeUp delay={0.1} duration={0.6} once className="w-full order-first lg:order-last">
              <div className="relative h-[200px] sm:h-[250px] md:h-[350px] lg:h-[450px] rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl">
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, #EA433520 0%, #EA433510 100%)`
                  }}
                >
                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold" style={{ color: "#EA4335" }}>
                    StockEasier
                  </span>
                </div>
              </div>
            </AnimationFadeUp>
            
            {/* Text Content */}
            <AnimationFadeUp delay={0.2} duration={0.6} once className="w-full order-last lg:order-first">
              <div className="space-y-4 md:space-y-6">
                <div className="inline-block">
                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold" style={{ color: "#EA4335" }}>
                    StockEasier
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {t('productPages.stockEasier.hero.title')}
                </h1>
                <div className="space-y-3 md:space-y-4">
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                    {t('productPages.stockEasier.hero.description1')}
                  </p>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                    {t('productPages.stockEasier.hero.description2')}
                  </p>
                </div>
              </div>
            </AnimationFadeUp>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Features Section - Mobile Optimized */}
      <section className="py-12 md:py-20 lg:py-24 bg-gradient-to-b from-white via-gray-50/30 to-white">
        <MaxWidthWrapper className="px-4 md:px-0">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              {t('productPages.features.title')}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              {t('productPages.features.subtitle.stockEasier')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
            <AnimationFadeUp delay={0.1} duration={0.5} once>
              <div className="group relative p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-white border border-gray-200/60 hover:border-red-300/60 hover:shadow-lg md:hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 hover:-translate-y-0.5 md:hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-red-600 transition-colors duration-300">{t('productPages.stockEasier.features.movementRecord.title')}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('productPages.stockEasier.features.movementRecord.description')}</p>
                </div>
              </div>
            </AnimationFadeUp>
            <AnimationFadeUp delay={0.15} duration={0.5} once>
              <div className="group relative p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-white border border-gray-200/60 hover:border-red-300/60 hover:shadow-lg md:hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 hover:-translate-y-0.5 md:hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-red-600 transition-colors duration-300">{t('productPages.stockEasier.features.continuousMonitoring.title')}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('productPages.stockEasier.features.continuousMonitoring.description')}</p>
                </div>
              </div>
            </AnimationFadeUp>
            <AnimationFadeUp delay={0.2} duration={0.5} once>
              <div className="group relative p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-white border border-gray-200/60 hover:border-red-300/60 hover:shadow-lg md:hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 hover:-translate-y-0.5 md:hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-red-600 transition-colors duration-300">{t('productPages.stockEasier.features.automaticAlerts.title')}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('productPages.stockEasier.features.automaticAlerts.description')}</p>
                </div>
              </div>
            </AnimationFadeUp>
            <AnimationFadeUp delay={0.25} duration={0.5} once>
              <div className="group relative p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-white border border-gray-200/60 hover:border-red-300/60 hover:shadow-lg md:hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 hover:-translate-y-0.5 md:hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-red-600 transition-colors duration-300">{t('productPages.stockEasier.features.completeHistory.title')}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('productPages.stockEasier.features.completeHistory.description')}</p>
                </div>
              </div>
            </AnimationFadeUp>
            <AnimationFadeUp delay={0.3} duration={0.5} once>
              <div className="group relative p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-white border border-gray-200/60 hover:border-red-300/60 hover:shadow-lg md:hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 hover:-translate-y-0.5 md:hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-red-600 transition-colors duration-300">{t('productPages.stockEasier.features.categoryManagement.title')}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('productPages.stockEasier.features.categoryManagement.description')}</p>
                </div>
              </div>
            </AnimationFadeUp>
            <AnimationFadeUp delay={0.35} duration={0.5} once>
              <div className="group relative p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-white border border-gray-200/60 hover:border-red-300/60 hover:shadow-lg md:hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 hover:-translate-y-0.5 md:hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-red-600 transition-colors duration-300">{t('productPages.stockEasier.features.epiReport.title')}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('productPages.stockEasier.features.epiReport.description')}</p>
                </div>
              </div>
            </AnimationFadeUp>
            <AnimationFadeUp delay={0.4} duration={0.5} once>
              <div className="group relative p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-white border border-gray-200/60 hover:border-red-300/60 hover:shadow-lg md:hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 hover:-translate-y-0.5 md:hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-red-600 transition-colors duration-300">{t('productPages.stockEasier.features.simultaneousAccess.title')}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('productPages.stockEasier.features.simultaneousAccess.description')}</p>
                </div>
              </div>
            </AnimationFadeUp>
            <AnimationFadeUp delay={0.45} duration={0.5} once>
              <div className="group relative p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-white border border-gray-200/60 hover:border-red-300/60 hover:shadow-lg md:hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 hover:-translate-y-0.5 md:hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-red-600 transition-colors duration-300">{t('productPages.stockEasier.features.intuitiveInterface.title')}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('productPages.stockEasier.features.intuitiveInterface.description')}</p>
                </div>
              </div>
            </AnimationFadeUp>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Contact Section - Mobile Optimized */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <MaxWidthWrapper className="px-4 md:px-0">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8">{t('productPages.contact.stockEasier')}</h2>
            <ContactForm />
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}

