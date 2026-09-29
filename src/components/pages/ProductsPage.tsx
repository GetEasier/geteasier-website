import Image from 'next/image'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import PageHeader from '@/components/ui/PageHeader'
import ContactBand from '@/components/ui/ContactBand'
import { products } from '@/content/products'
import { common } from '@/content/common'
import { PRODUCT_IDS, href, type Locale } from '@/lib/seo.config'

export default function ProductsPage({ locale }: { locale: Locale }) {
  const p = products[locale]
  const c = common[locale]
  return (
    <SiteShell pageId="products" locale={locale}>
      <PageHeader pageId="products" locale={locale} title={p.indexH1} lead={[p.indexLead]} />

      <section aria-label={p.indexH1} className="border-t border-linha">
        <ul className="wrap">
          {PRODUCT_IDS.map((id) => {
            const item = p.items[id]
            return (
              <li key={id} className="grid gap-6 border-b border-linha py-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12">
                <div>
                  <Image src={item.logo.src} alt="" width={item.logo.width} height={item.logo.height} sizes="240px" className="h-9 w-auto" />
                  <h2 className="t-h3 mt-5">
                    <Link href={href(id, locale)} className="hover:text-azul hover:underline">
                      {item.name}: {item.short}
                    </Link>
                  </h2>
                </div>
                <div>
                  <p className="max-w-prose text-grafite">{item.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
                    <li>
                      <Link href={href(id, locale)} className="link">
                        {locale === 'pt' ? `Como funciona o ${item.name}` : `How ${item.name} works`}
                      </Link>
                    </li>
                    <li>
                      <Link href={`${href('contact', locale)}?assunto=${item.demoSubject}`} className="link">
                        {c.cta.demo(item.name)}
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="wrap grid gap-8 py-14 md:grid-cols-2">
          <p className="max-w-prose">
            {p.plansLine}{' '}
            <Link href={href('plans', locale)} className="link">
              {p.plansLink}
            </Link>
          </p>
          <p className="max-w-prose">
            {p.indexSame}{' '}
            <Link href={href('customSoftware', locale)} className="link">
              {p.indexSameLink}
            </Link>
          </p>
        </div>
      </section>

      <ContactBand
        locale={locale}
        title={locale === 'pt' ? 'Ajudamos a escolher o produto e o plano' : 'We can help you choose a product and plan'}
        text={locale === 'pt' ? 'Diga-nos o que quer controlar e quantas pessoas tem. Indicamos o produto e o plano que fazem sentido.' : 'Tell us what you want to keep track of and how many people you have. We will point you to the right product and plan.'}
        subject="planos"
        cta={locale === 'pt' ? 'Pedir ajuda para escolher' : 'Ask for help choosing'}
      />
    </SiteShell>
  )
}
