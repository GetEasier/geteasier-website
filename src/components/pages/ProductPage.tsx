import Image from 'next/image'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import Breadcrumbs from '@/components/site/Breadcrumbs'
import Section from '@/components/ui/Section'
import ChaosToControl from '@/components/home/ChaosToControl'
import ContactBand from '@/components/ui/ContactBand'
import ProductFeatures from '@/components/ProductFeatures'
import Testimonials from '@/components/Testimonials'
import YouTubeFacade from '@/components/YouTubeFacade'
import StoreBadges from '@/components/StoreBadges'
import CameraDemo from '@/components/demos/CameraDemo'
import TimeEasierScene from '@/components/demos/TimeEasierScene'
import ConstructionEasierScene from '@/components/demos/ConstructionEasierScene'
import StockEasierScene from '@/components/demos/StockEasierScene'
import WoodEasierScene from '@/components/demos/WoodEasierScene'
import ModesDemo from '@/components/ce/ModesDemo'
import Profiles from '@/components/ce/Profiles'
import TimeBenefits from '@/components/te/TimeBenefits'
import StockBenefits from '@/components/se/StockBenefits'
import WoodBenefits from '@/components/we/WoodBenefits'
import Faq from '@/components/ui/Faq'
import { construction } from '@/content/construction'
import { products } from '@/content/products'
import { common } from '@/content/common'
import { href, type Locale, type ProductId } from '@/lib/seo.config'
import { PRODUCT_THEME } from '@/lib/product-theme'
import { cn } from '@/lib/utils'

// Demo numa só cena, com a câmara a aproximar-se de cada parte (CameraDemo).
const SCENES: Record<ProductId, (p: { locale: Locale }) => React.ReactNode> = {
  timeEasier: TimeEasierScene,
  constructionEasier: ConstructionEasierScene,
  stockEasier: StockEasierScene,
  woodEasier: WoodEasierScene,
}

// "O que muda com o produto", contado ao descer (o ConstructionEasier tem as suas secções próprias).
const BENEFITS: Partial<Record<ProductId, (p: { locale: Locale }) => React.ReactNode>> = {
  timeEasier: TimeBenefits,
  stockEasier: StockBenefits,
  woodEasier: WoodBenefits,
}

export default function ProductPage({ id, locale }: { id: ProductId; locale: Locale }) {
  const p = products[locale]
  const item = p.items[id]
  const c = common[locale]
  const theme = PRODUCT_THEME[id]
  const demo = c.cta.demo(item.name)
  const Scene = SCENES[id]
  const Benefits = BENEFITS[id]
  const pt = locale === 'pt'
  const labels = {
    pause: pt ? 'Pausar' : 'Pause',
    play: pt ? 'Continuar' : 'Play',
    step: pt ? 'Ver o passo' : 'Show step',
    list: item.stepsTitle,
  }

  return (
    <SiteShell pageId={id} locale={locale}>
      {/* Hero escuro com a luz da cor do produto (como o do início); a demo fica a meio caminho entre o hero e a página */}
      <section
        className="relative overflow-hidden bg-tinta text-white"
        style={{
          backgroundImage: `radial-gradient(60% 80% at 85% 10%, ${theme.hex}cc, transparent 70%), radial-gradient(40% 60% at 0% 100%, rgba(24, 221, 186, 0.14), transparent 70%)`,
        }}
      >
        <div className="wrap relative pb-40 pt-8 md:pb-56 md:pt-10">
          <div className="[&_[aria-current]]:text-white [&_a]:decoration-white/30 [&_a:hover]:text-white [&_nav]:text-white/70">
            <Breadcrumbs pageId={id} locale={locale} />
          </div>
          <div className="mt-10 grid gap-x-12 gap-y-6 lg:grid-cols-2 lg:items-end">
            <div>
              <span className="inline-flex rounded-full bg-white px-4 py-2 shadow-[0_10px_30px_-12px_rgba(0,0,0,.5)]">
                <Image
                  src={item.logo.src}
                  alt={item.name}
                  width={item.logo.width}
                  height={item.logo.height}
                  priority
                  sizes="240px"
                  className={cn('w-auto', id === 'constructionEasier' || id === 'stockEasier' ? 'h-9 md:h-11' : 'h-7 md:h-8')}
                />
              </span>
              <h1 className="t-h1 mt-6 max-w-[18ch]">{item.h1}</h1>
            </div>
            <div>
              <p className="max-w-prose text-lead text-white/80">{item.lead[0]}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href={`${href('contact', locale)}?assunto=${item.demoSubject}`} className="btn bg-ciano text-tinta hover:bg-white">
                  {demo}
                </Link>
                <Link href={`${href('plans', locale)}#${item.planAnchor}`} className="btn-on-dark">
                  {c.cta.plans}
                </Link>
                {id === 'woodEasier' && (
                  <span className="rounded-ctl bg-white p-1.5">
                    <Image src="/images/products/DGAV-Approved.png" alt="DGAV" width={629} height={461} className="h-12 w-auto" />
                  </span>
                )}
              </div>
              {id === 'timeEasier' && <StoreBadges locale={locale} className="mt-6" />}
            </div>
          </div>
        </div>
      </section>
      <div className="wrap relative -mt-28 min-w-0 pb-12 md:-mt-44 md:pb-16">
        <CameraDemo steps={item.steps} labels={labels} accent={theme.app} width={1200} height={760}>
          <Scene locale={locale} />
        </CameraDemo>
      </div>

      {id === 'constructionEasier' && <ConstructionSections locale={locale} />}

      {Benefits && (
        <section aria-labelledby="beneficios-titulo" className="pb-16 md:pb-24">
          <div className="wrap">
            <Benefits locale={locale} />
          </div>
        </section>
      )}

      <Section id="funcionalidades" title={item.featuresTitle}>
        <ProductFeatures id={id} locale={locale} />
        <p className="mt-10">
          <Link href={`${href('plans', locale)}#${item.planAnchor}`} className="link">
            {p.planIncluded}
          </Link>
        </p>
      </Section>

      {id === 'woodEasier' && (
        <>
          <Section id="video" title={p.videoTitle}>
            <YouTubeFacade videoId="BKbbl5TJGko" label={p.videoButton} note={p.videoNote} />
          </Section>
          <Section id="quem-usa" title={p.testimonialTitle}>
            <Testimonials locale={locale} only="Diogo Silva" />
          </Section>
        </>
      )}

      {id === 'constructionEasier' && (
        <Section id="perguntas" title={construction[locale].faqTitle}>
          <div className="max-w-3xl">
            <Faq items={construction[locale].faq} />
          </div>
        </Section>
      )}


      <ContactBand
        locale={locale}
        title={pt ? `Ver o ${item.name} a funcionar` : `See ${item.name} in action`}
        text={pt ? 'Mostramos o produto com dados de exemplo e respondemos às perguntas da sua equipa.' : 'We show you the product with sample data and answer your team’s questions.'}
        subject={item.demoSubject}
        cta={demo}
      />
    </SiteShell>
  )
}

// Página do ConstructionEasier: do caos ao controlo, demo com modos, perfis e perguntas.
function ConstructionSections({ locale }: { locale: Locale }) {
  const t = construction[locale]
  return (
    <>
      {/* A manhã na obra antes e depois (veio do início, que agora conta a versão genérica) */}
      <section aria-labelledby="caos-titulo" className="overflow-x-clip bg-betao py-16 md:py-24">
        <div className="wrap">
          <ChaosToControl t={t.chaos} headingId="caos-titulo" />
        </div>
      </section>
      <Section id="entrada" title={t.modes.title}>
        <ModesDemo t={t.modes} feed={t.gateFeed} />
      </Section>
      <Section id="perfis" title={t.profiles.title}>
        <Profiles t={t.profiles} />
      </Section>
    </>
  )
}
