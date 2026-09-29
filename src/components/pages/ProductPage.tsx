import Image from 'next/image'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import Breadcrumbs from '@/components/site/Breadcrumbs'
import Section from '@/components/ui/Section'
import RelatedLinks from '@/components/ui/RelatedLinks'
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

// Capturas reais da aplicação, já publicadas no site anterior.
const SCREENSHOTS: Partial<Record<ProductId, { src: string; width: number; height: number }>> = {
  stockEasier: { src: '/images/products/stock-easier.png', width: 2537, height: 1265 },
  woodEasier: { src: '/images/products/wood-easier.jpeg', width: 433, height: 290 },
}

export default function ProductPage({ id, locale }: { id: ProductId; locale: Locale }) {
  const p = products[locale]
  const item = p.items[id]
  const c = common[locale]
  const theme = PRODUCT_THEME[id]
  const demo = c.cta.demo(item.name)
  const Scene = SCENES[id]
  const shot = SCREENSHOTS[id]
  const pt = locale === 'pt'
  const labels = {
    pause: pt ? 'Pausar' : 'Pause',
    play: pt ? 'Continuar' : 'Play',
    step: pt ? 'Ver o passo' : 'Show step',
    list: item.stepsTitle,
  }

  return (
    <SiteShell pageId={id} locale={locale}>
      <section className={cn('relative overflow-hidden', theme.tint)}>
        <Image
          src={item.icon}
          alt=""
          width={460}
          height={400}
          className="pointer-events-none absolute -left-24 -top-16 h-80 w-auto opacity-[0.07]"
        />
        <div className="wrap relative pb-16 pt-8 md:pb-24 md:pt-10">
          <Breadcrumbs pageId={id} locale={locale} />
          <div className="mt-10 grid gap-x-12 gap-y-6 lg:grid-cols-2 lg:items-end">
            <div>
              <Image
                src={item.logo.src}
                alt={item.name}
                width={item.logo.width}
                height={item.logo.height}
                priority
                sizes="260px"
                className="h-10 w-auto md:h-12"
              />
              <h1 className="t-h1 mt-6 max-w-[18ch]">{item.h1}</h1>
            </div>
            <div>
              <p className="max-w-prose text-lead text-grafite">{item.lead[0]}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href={`${href('contact', locale)}?assunto=${item.demoSubject}`} className={cn('btn text-white hover:opacity-90', theme.solid)}>
                  {demo}
                </Link>
                <Link href={`${href('plans', locale)}#${item.planAnchor}`} className="btn-secondary">
                  {c.cta.plans}
                </Link>
                {id === 'woodEasier' && (
                  <Image src="/images/products/DGAV-Approved.png" alt="DGAV" width={629} height={461} className="h-14 w-auto" />
                )}
              </div>
              {id === 'timeEasier' && <StoreBadges locale={locale} className="mt-6" />}
            </div>
          </div>
          <div className="mt-12 min-w-0">
            <CameraDemo steps={item.steps} labels={labels} accent={theme.app} width={1200} height={760}>
              <Scene locale={locale} />
            </CameraDemo>
          </div>
        </div>
      </section>

      <Section id="funcionalidades" title={item.featuresTitle}>
        <ProductFeatures id={id} locale={locale} />
        <p className="mt-10">
          <Link href={`${href('plans', locale)}#${item.planAnchor}`} className="link">
            {p.planIncluded}
          </Link>
        </p>
      </Section>

      {shot && (
        <section aria-labelledby="por-dentro-titulo" className="bg-white py-16 md:py-24">
          <div className="wrap">
            <h2 id="por-dentro-titulo" className="t-h2">
              {pt ? `O ${item.name} por dentro` : `Inside ${item.name}`}
            </h2>
            <div className="reveal-photo mt-10 overflow-hidden rounded-frame border border-linha bg-papel shadow-[0_30px_70px_-30px_rgba(6,8,60,.45)]">
              <div className="flex gap-2 border-b border-linha bg-white px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              </div>
              <Image
                src={shot.src}
                alt={pt ? `Ecrã do ${item.name}` : `${item.name} screen`}
                width={shot.width}
                height={shot.height}
                sizes="(min-width: 1240px) 1180px, 100vw"
                className={cn('mx-auto h-auto', shot.width < 800 ? 'w-auto max-w-full' : 'w-full')}
              />
            </div>
          </div>
        </section>
      )}

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

      <RelatedLinks title={p.relatedTitle} links={item.related} locale={locale} />

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
