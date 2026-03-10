'use client'

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import { Button } from "@/components/ui/moving-border";
import AnimationFadeUp from "@/components/animation/fade-up";
import ContactForm from "@/components/ContactForm";
import { useLanguage } from "@/contexts/LanguageContext";
import YouTube, { YouTubeProps } from "react-youtube";

export default function WoodEasierPage() {
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
                    background: `linear-gradient(135deg, #D4A57420 0%, #D4A57410 100%)`
                  }}
                >
                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold" style={{ color: "#D4A574" }}>
                    WoodEasier
                  </span>
                </div>
              </div>
            </AnimationFadeUp>
            
            {/* Text Content */}
            <AnimationFadeUp delay={0.2} duration={0.6} once className="w-full order-last lg:order-first">
              <div className="space-y-4 md:space-y-6">
                <div className="inline-block">
                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold" style={{ color: "#D4A574" }}>
                    WoodEasier
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {t('productPages.woodEasier.hero.title')}
                </h1>
                <div className="space-y-3 md:space-y-4">
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                    {t('productPages.woodEasier.hero.description1')}
                  </p>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                    {t('productPages.woodEasier.hero.description2')}
                  </p>
                </div>
              </div>
            </AnimationFadeUp>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Vídeo */}
      <section className="py-8 md:py-12 bg-white">
        <MaxWidthWrapper className="px-4 md:px-0">
          <AnimationFadeUp delay={0.1} duration={0.5} once>
            <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden bg-gray-100 shadow-lg">
              <YouTube
                videoId="BKbbl5TJGko"
                className="absolute inset-0 w-full h-full flex justify-center items-center"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                opts={{
                  width: '100%',
                  height: '100%',
                  playerVars: { autoplay: 0 },
                }}
              />
            </div>
          </AnimationFadeUp>
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
              {t('productPages.features.subtitle.woodEasier')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
            <AnimationFadeUp delay={0.1} duration={0.5} once>
              <div className="group relative p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-white border border-gray-200/60 hover:border-[#D4A574]/60 hover:shadow-lg md:hover:shadow-2xl hover:shadow-[#D4A574]/10 transition-all duration-300 hover:-translate-y-0.5 md:hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-[#D4A574]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-[#D4A574] to-[#B8946A] flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-[#B8946A] transition-colors duration-300">{t('productPages.woodEasier.features.quickRecord.title')}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('productPages.woodEasier.features.quickRecord.description')}</p>
                </div>
              </div>
            </AnimationFadeUp>
            <AnimationFadeUp delay={0.15} duration={0.5} once>
              <div className="group relative p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-white border border-gray-200/60 hover:border-[#D4A574]/60 hover:shadow-lg md:hover:shadow-2xl hover:shadow-[#D4A574]/10 transition-all duration-300 hover:-translate-y-0.5 md:hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-[#D4A574]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-[#D4A574] to-[#B8946A] flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-[#B8946A] transition-colors duration-300">{t('productPages.woodEasier.features.automaticEmission.title')}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('productPages.woodEasier.features.automaticEmission.description')}</p>
                </div>
              </div>
            </AnimationFadeUp>
            <AnimationFadeUp delay={0.2} duration={0.5} once>
              <div className="group relative p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-white border border-gray-200/60 hover:border-[#D4A574]/60 hover:shadow-lg md:hover:shadow-2xl hover:shadow-[#D4A574]/10 transition-all duration-300 hover:-translate-y-0.5 md:hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-[#D4A574]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-[#D4A574] to-[#B8946A] flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-[#B8946A] transition-colors duration-300">{t('productPages.woodEasier.features.integralTraceability.title')}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('productPages.woodEasier.features.integralTraceability.description')}</p>
                </div>
              </div>
            </AnimationFadeUp>
            <AnimationFadeUp delay={0.25} duration={0.5} once>
              <div className="group relative p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-white border border-gray-200/60 hover:border-[#D4A574]/60 hover:shadow-lg md:hover:shadow-2xl hover:shadow-[#D4A574]/10 transition-all duration-300 hover:-translate-y-0.5 md:hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-[#D4A574]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-[#D4A574] to-[#B8946A] flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-[#B8946A] transition-colors duration-300">{t('productPages.woodEasier.features.treatmentManagement.title')}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('productPages.woodEasier.features.treatmentManagement.description')}</p>
                </div>
              </div>
            </AnimationFadeUp>
            <AnimationFadeUp delay={0.3} duration={0.5} once>
              <div className="group relative p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-white border border-gray-200/60 hover:border-[#D4A574]/60 hover:shadow-lg md:hover:shadow-2xl hover:shadow-[#D4A574]/10 transition-all duration-300 hover:-translate-y-0.5 md:hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-[#D4A574]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-[#D4A574] to-[#B8946A] flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-[#B8946A] transition-colors duration-300">{t('productPages.woodEasier.features.clearCommunication.title')}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('productPages.woodEasier.features.clearCommunication.description')}</p>
                </div>
              </div>
            </AnimationFadeUp>
            <AnimationFadeUp delay={0.35} duration={0.5} once>
              <div className="group relative p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-white border border-gray-200/60 hover:border-[#D4A574]/60 hover:shadow-lg md:hover:shadow-2xl hover:shadow-[#D4A574]/10 transition-all duration-300 hover:-translate-y-0.5 md:hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 bg-gradient-to-br from-[#D4A574]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-[#D4A574] to-[#B8946A] flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-[#B8946A] transition-colors duration-300">{t('productPages.woodEasier.features.auditPreparation.title')}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{t('productPages.woodEasier.features.auditPreparation.description')}</p>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8">{t('productPages.contact.woodEasier')}</h2>
            <ContactForm />
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}

