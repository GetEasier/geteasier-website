import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/content/products'
import { home } from '@/content/home'
import { PRODUCT_IDS, href, type Locale } from '@/lib/seo.config'
import { PRODUCT_THEME } from '@/lib/product-theme'
import { cn } from '@/lib/utils'
import ProductMini from '@/components/home/ProductMini'

// Um painel por produto, na cor do logótipo. O painel inteiro é clicável.
export default function ProductPanels({
  locale,
  headingLevel = 'h2',
  className,
  long,
  mini,
}: {
  locale: Locale
  headingLevel?: 'h2' | 'h3'
  className?: string
  long?: boolean
  /** Ecrã pequeno de cada produto, que muda de estado ao entrar (início). */
  mini?: boolean
}) {
  const p = products[locale]
  const open = home[locale].products.open
  const H = headingLevel
  return (
    <ul className={cn('grid gap-5 md:grid-cols-2', mini && 'produtos-mini lg:grid-cols-4', className)}>
      {PRODUCT_IDS.map((id) => {
        const item = p.items[id]
        const theme = PRODUCT_THEME[id]
        return (
          <li key={id} className={mini ? 'produto-painel' : 'reveal-panel'}>
            <Link
              href={href(id, locale)}
              className={cn(
                'group relative flex h-full min-h-[15rem] flex-col overflow-hidden rounded-frame p-7 transition-shadow hover:shadow-[0_20px_50px_-24px_rgba(6,8,60,.45)] md:p-8',
                theme.tint,
              )}
            >
              <Image
                src={item.icon}
                alt=""
                width={220}
                height={200}
                className="pointer-events-none absolute -bottom-8 -right-6 h-40 w-auto opacity-20 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-3 md:h-48"
              />
              <span className="flex items-center gap-3">
                <Image src={item.icon} alt="" width={48} height={48} className="h-11 w-11 object-contain" />
                <H className={cn('text-h3 font-bold', theme.text)}>{item.name}</H>
              </span>
              <p className="mt-4 max-w-[34ch] text-lead font-medium">{item.short}</p>
              {long && <p className="mt-2 max-w-[44ch] text-grafite">{item.summary}</p>}
              {mini && <ProductMini id={id} locale={locale} />}
              <span className={cn('mt-auto inline-flex items-center gap-2 pt-8 font-semibold underline decoration-2 underline-offset-4', theme.text)}>
                {open(item.name)}
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
