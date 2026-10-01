import Image from 'next/image'
import Link from 'next/link'
import SiteShell from '@/components/site/SiteShell'
import Breadcrumbs from '@/components/site/Breadcrumbs'
import ContactBand from '@/components/ui/ContactBand'
import ProductMini from '@/components/home/ProductMini'
import { products } from '@/content/products'
import { common } from '@/content/common'
import { home } from '@/content/home'
import { plans } from '@/content/plans'
import { PRODUCT_IDS, href, type Locale, type ProductId } from '@/lib/seo.config'
import { PRODUCT_THEME } from '@/lib/product-theme'
import { cn } from '@/lib/utils'

// Quatro funcionalidades de cada produto mostradas no cartão (índices em `features`, iguais em PT e EN).
const HIGHLIGHTS: Record<ProductId, number[]> = {
  timeEasier: [1, 2, 4, 8],
  constructionEasier: [1, 2, 4, 5],
  stockEasier: [2, 5, 3, 4],
  woodEasier: [0, 1, 2, 3],
}

const Check = ({ className }: { className?: string }) => (
  <svg aria-hidden="true" viewBox="0 0 16 16" className={cn('h-4 w-4 shrink-0', className)} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.5 8.5l3 3 6-7" />
  </svg>
)

const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 16 16" className="ml-1.5 inline-block h-4 w-4 align-[-2px] transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
)

export default function ProductsPage({ locale }: { locale: Locale }) {
  const p = products[locale]
  const c = common[locale]
  const open = home[locale].products.open

  return (
    <SiteShell pageId="products" locale={locale}>
      {/* Hero escuro como o do início; ao lado, um ecrã pequeno de cada produto */}
      <section className="hero-brand overflow-x-clip text-white">
        <div className="wrap pb-14 pt-8 md:pb-20 md:pt-10">
          <div className="[&_[aria-current]]:text-white [&_a]:decoration-white/30 [&_a:hover]:text-white [&_nav]:text-white/70">
            <Breadcrumbs pageId="products" locale={locale} />
          </div>
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]">
            <div>
              <h1 className="t-h1 max-w-[20ch]">{p.indexH1}</h1>
              <p className="mt-5 max-w-[40ch] text-lead text-white/80">{p.indexLead}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={`${href('contact', locale)}?assunto=planos`} className="btn bg-ciano text-tinta hover:bg-white">
                  {locale === 'pt' ? 'Pedir ajuda para escolher' : 'Ask for help choosing'}
                </Link>
                <Link href={href('plans', locale)} className="btn-on-dark">
                  {c.cta.plans}
                </Link>
              </div>
            </div>
            <ul aria-hidden="true" className="grid grid-cols-2 gap-4 max-sm:hidden lg:pb-8">
              {PRODUCT_IDS.map((id, i) => {
                const item = p.items[id]
                return (
                  <li
                    key={id}
                    className={cn(
                      'rounded-frame p-4 shadow-[0_24px_50px_-28px_rgba(0,0,0,.6)]',
                      PRODUCT_THEME[id].tint,
                      i % 2 === 1 && 'lg:translate-y-8',
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <Image src={item.icon} alt="" width={32} height={32} className="h-7 w-7 object-contain" />
                      <span className={cn('text-small font-bold', PRODUCT_THEME[id].text)}>{item.name}</span>
                    </span>
                    <ProductMini id={id} locale={locale} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Um cartão por produto: o que é numa linha e quatro coisas que faz */}
      <section aria-label={p.indexH1} className="py-14 md:py-20">
        <ul className="wrap grid gap-5 md:grid-cols-2">
          {PRODUCT_IDS.map((id) => {
            const item = p.items[id]
            const theme = PRODUCT_THEME[id]
            return (
              <li key={id} className="reveal-panel">
                <Link
                  href={href(id, locale)}
                  className={cn(
                    'group relative flex h-full flex-col overflow-hidden rounded-frame p-7 transition-shadow hover:shadow-[0_20px_50px_-24px_rgba(6,8,60,.45)] md:p-8',
                    theme.tint,
                  )}
                >
                  <Image
                    src={item.icon}
                    alt=""
                    width={220}
                    height={200}
                    className="pointer-events-none absolute -bottom-8 -right-6 h-40 w-auto opacity-15 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-3 md:h-48"
                  />
                  <span className="flex flex-wrap items-center gap-3">
                    <Image src={item.icon} alt="" width={48} height={48} className="h-11 w-11 object-contain" />
                    <h2 className={cn('text-h3 font-bold', theme.text)}>{item.name}</h2>
                    {id === 'constructionEasier' && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-small font-semibold text-produto-time">
                        <Image src={p.items.timeEasier.icon} alt="" width={16} height={16} className="h-4 w-4 object-contain" />
                        {p.indexIncludes}
                      </span>
                    )}
                  </span>
                  <p className="mt-4 text-lead font-semibold">{item.short}</p>
                  <ul className="relative mt-5 flex flex-wrap gap-2">
                    {HIGHLIGHTS[id].map((n) => (
                      <li key={n} className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1.5 text-small font-medium shadow-[0_4px_12px_-8px_rgba(6,8,60,.35)]">
                        <Check className={theme.text} />
                        {item.features[n].term}
                      </li>
                    ))}
                  </ul>
                  <span className={cn('relative mt-auto block pt-8 font-semibold underline decoration-2 underline-offset-4', theme.text)}>
                    {open(item.name).replace(item.name, '')}
                    <span className="whitespace-nowrap">
                      {item.name}
                      <Arrow />
                    </span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Planos e software à medida: dois cartões compactos em vez de dois parágrafos */}
        <div className="wrap mt-5 grid gap-5 md:grid-cols-2">
          <Link href={href('plans', locale)} className="group flex flex-col gap-4 rounded-frame border border-linha bg-white p-7 transition-shadow hover:shadow-[0_20px_50px_-24px_rgba(6,8,60,.35)] sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-small text-grafite">{p.plansLine}</p>
              <p className="mt-1 font-bold">{p.plansTitle}</p>
              <span className="mt-3 flex gap-2" aria-hidden="true">
                {plans[locale].plans.map((name, i) => (
                  <span key={name} className={cn('rounded-full px-3 py-1 text-small font-semibold', i === 0 && 'bg-linha/60 text-tinta', i === 1 && 'bg-azul/10 text-azul', i === 2 && 'bg-tinta text-white')}>
                    {name}
                  </span>
                ))}
              </span>
            </div>
            <span className="link whitespace-nowrap font-semibold">
              {p.plansLink}
              <Arrow />
            </span>
          </Link>
          <Link href={href('customSoftware', locale)} className="hero-brand group flex flex-col gap-4 rounded-frame p-7 text-white transition-shadow hover:shadow-[0_20px_50px_-24px_rgba(6,8,60,.6)] sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-bold">{p.customTitle}</p>
              <p className="mt-1 max-w-[40ch] text-small text-white/75">{p.indexSame}</p>
            </div>
            <span className="whitespace-nowrap font-semibold text-ciano underline decoration-2 underline-offset-4">
              {p.indexSameLink}
              <Arrow />
            </span>
          </Link>
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
