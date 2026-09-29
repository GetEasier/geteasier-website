import Image from 'next/image'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import PageHeader from '@/components/ui/PageHeader'
import Section from '@/components/ui/Section'
import SpecList from '@/components/ui/SpecList'
import RelatedLinks from '@/components/ui/RelatedLinks'
import ContactBand from '@/components/ui/ContactBand'
import Testimonials from '@/components/Testimonials'
import YouTubeFacade from '@/components/YouTubeFacade'
import { products } from '@/content/products'
import { common } from '@/content/common'
import { href, type Locale, type ProductId } from '@/lib/seo.config'
import DemoStepper from '@/components/demos/DemoStepper'
import TimeEasierDemo from '@/components/demos/TimeEasierDemo'
import ConstructionEasierDemo from '@/components/demos/ConstructionEasierDemo'
import StockEasierDemo from '@/components/demos/StockEasierDemo'
import WoodEasierDemo from '@/components/demos/WoodEasierDemo'

const DEMOS: Record<ProductId, (p: { locale: Locale }) => React.ReactNode> = {
  timeEasier: TimeEasierDemo,
  constructionEasier: ConstructionEasierDemo,
  stockEasier: StockEasierDemo,
  woodEasier: WoodEasierDemo,
}

export default function ProductPage({ id, locale }: { id: ProductId; locale: Locale }) {
  const p = products[locale]
  const item = p.items[id]
  const c = common[locale]
  const demo = c.cta.demo(item.name)
  const Demo = DEMOS[id]

  return (
    <SiteShell pageId={id} locale={locale}>
      <PageHeader
        pageId={id}
        locale={locale}
        title={item.h1}
        lead={item.lead}
        before={
          <Image
            src={item.logo.src}
            alt={item.name}
            width={item.logo.width}
            height={item.logo.height}
            priority
            sizes="240px"
            className="h-9 w-auto md:h-11"
          />
        }
      >
        <Link href={`${href('contact', locale)}?assunto=${item.demoSubject}`} className="btn-primary">
          {demo}
        </Link>
        <Link href={`${href('plans', locale)}#${item.planAnchor}`} className="btn-secondary">
          {c.cta.plans}
        </Link>
      </PageHeader>

      <Section id="como-funciona" title={item.stepsTitle} intro={item.stepsIntro}>
        <DemoStepper id={id} steps={item.steps} listLabel={locale === 'pt' ? 'Passos da demonstração' : 'Demo steps'}>
          <Demo locale={locale} />
        </DemoStepper>
      </Section>

      <Section id="funcionalidades" title={item.featuresTitle}>
        <SpecList items={item.features} />
        <p className="mt-8">
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

      <RelatedLinks title={p.relatedTitle} links={item.related} locale={locale} />

      <ContactBand
        locale={locale}
        title={locale === 'pt' ? `Ver o ${item.name} a funcionar` : `See ${item.name} in action`}
        text={locale === 'pt' ? 'Mostramos o produto com dados de exemplo e respondemos às perguntas da sua equipa.' : 'We show you the product with sample data and answer your team’s questions.'}
        subject={item.demoSubject}
        cta={demo}
      />
    </SiteShell>
  )
}
