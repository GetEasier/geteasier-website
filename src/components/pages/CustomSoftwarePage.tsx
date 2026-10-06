import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import Breadcrumbs from '@/components/site/Breadcrumbs'
import Faq from '@/components/ui/Faq'
import ModulesHero from '@/components/custom/ModulesHero'
import ArchitectureScroll from '@/components/custom/ArchitectureScroll'
import BuildBento from '@/components/custom/BuildBento'
import { ARCH_ICONS, PROCESS_ICONS } from '@/components/custom/icons'
import '@/components/custom/custom-software.css'
import { customSoftware } from '@/content/custom-software'
import { common } from '@/content/common'
import { href, type Locale } from '@/lib/seo.config'
import { CinematicGroup, CinematicText } from '@/components/interactions/CinematicText'

// Software à medida (revisão de 01/10): hero da marca com uma aplicação a ganhar módulos, cartões
// em mosaico com mini ilustrações, etapas sem números, arquitetura genérica montada ao scroll e
// perguntas frequentes. Sem tecnologia nem testemunho, a pedido do Alexandre. O convite final é o do rodapé.

export default function CustomSoftwarePage({ locale }: { locale: Locale }) {
  const t = customSoftware[locale]
  const c = common[locale]
  const contact = `${href('contact', locale)}?assunto=projeto`
  const faqLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }).replace(/</g, '\\u003c')

  return (
    <SiteShell pageId="customSoftware" locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqLd }} />

      <div className="cs-page">
        <section className="cs-hero hero-brand overflow-x-clip text-white">
          <div className="wrap pb-14 pt-8 md:pb-20 md:pt-10">
            <Breadcrumbs pageId="customSoftware" locale={locale} />
            <div className="mt-10 grid items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]">
              <div>
                <CinematicText as="h1" className="t-h1 max-w-[20ch]">{t.h1}</CinematicText>
                <CinematicText as="p" delay={0.55} stagger={0.03} blur={16} className="mt-6 max-w-[44ch] text-lead text-white/80">
                  {t.lead[0]}
                </CinematicText>
                <CinematicGroup delay={0.95} stagger={0.08} className="mt-8 flex flex-wrap gap-3">
                  <Link href={contact} className="btn bg-ciano text-tinta hover:bg-white">
                    {c.cta.project}
                  </Link>
                  <a href="#arquitetura" className="btn-on-dark">
                    {t.heroArch}
                  </a>
                </CinematicGroup>
              </div>
              <ModulesHero t={t.hero} />
            </div>
          </div>
        </section>

        <section id="o-que-construimos" aria-labelledby="o-que-construimos-titulo" className="py-16 md:py-24">
          <div className="wrap">
            <h2 id="o-que-construimos-titulo" className="t-h2">
              {t.buildTitle}
            </h2>
            <BuildBento t={t} contact={contact} />
          </div>
        </section>

        <section id="como-trabalhamos" aria-labelledby="como-trabalhamos-titulo" className="bg-white py-16 md:py-24">
          <div className="wrap">
            <h2 id="como-trabalhamos-titulo" className="t-h2">
              {t.processTitle}
            </h2>
            <ol className="cs-steps mt-10 grid gap-4 md:grid-cols-5 md:gap-5">
              {t.process.map((s, i) => (
                <li key={s.term} className="reveal-panel cs-step flex gap-4 md:block md:text-center" data-c={i}>
                  <span className="cs-icon">{PROCESS_ICONS[i]}</span>
                  <span className="block md:mt-4">
                    <span className="block font-semibold leading-snug">{s.term}</span>
                    <span className="mt-1 block text-small text-grafite">{s.desc}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="arquitetura" aria-labelledby="arquitetura-titulo" className="hero-brand pb-10 pt-16 text-white md:pt-24">
          <div className="wrap">
            <h2 id="arquitetura-titulo" className="t-h2 max-w-[30ch]">
              {t.archTitle}
            </h2>
            <p className="mt-4 max-w-prose text-lead text-white/80">{t.archIntro}</p>
            <ArchitectureScroll t={t} icons={ARCH_ICONS} />
          </div>
        </section>

  
  
        <section id="perguntas" aria-labelledby="perguntas-titulo" className="py-16 md:py-24">
          <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
            <div>
              <h2 id="perguntas-titulo" className="t-h2">
                {t.faqTitle}
              </h2>
              <p className="mt-4 text-lead text-grafite">{t.faqText}</p>
              <Link href={contact} className="btn-primary mt-6">
                {c.cta.project}
              </Link>
            </div>
            <Faq items={t.faq} />
          </div>
        </section>
      </div>
    </SiteShell>
  )
}
