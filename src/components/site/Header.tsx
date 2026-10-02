import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/components/Logo'
import MobileMenu from './MobileMenu'
import HeaderScroll from './HeaderScroll'
import { MAIN_NAV, PRODUCT_IDS, ROUTES, breadcrumbTrail, href, route, type Locale, type PageId } from '@/lib/seo.config'
import { common } from '@/content/common'
import { products as productsContent } from '@/content/products'

type Props = { pageId: PageId | null; locale: Locale }

/** Página na outra língua; se não existir tradução, a página inicial da outra língua. */
export function alternateHref(pageId: PageId | null, locale: Locale) {
  const other: Locale = locale === 'pt' ? 'en' : 'pt'
  if (!pageId) return href('home', other)
  const r = ROUTES[pageId]
  if (other === 'en' && !r.en) return href('home', 'en')
  return href(pageId, other)
}

export default function Header({ pageId, locale }: Props) {
  const t = common[locale]
  // Uma página que está no menu marca só o seu item (Planos é filha de Produtos no breadcrumb,
  // mas não deve sublinhar Produtos); as outras marcam o antepassado que está no menu.
  const inNav = pageId != null && (MAIN_NAV as readonly string[]).includes(pageId)
  const activeIds = new Set(pageId ? (inNav ? [pageId] : breadcrumbTrail(pageId, locale).map((c) => c.id)) : [])
  // "Início" só fica marcado na própria página inicial (é pai de todas as outras).
  const items = MAIN_NAV.map((id) => ({
    id,
    label: route(id, locale).breadcrumb,
    path: href(id, locale),
    active: id === 'home' ? pageId === 'home' : activeIds.has(id),
  }))
  const other = locale === 'pt' ? 'en' : 'pt'

  return (
    <header className="site-header sticky top-0 z-50 h-[var(--header-h)]">
      <span aria-hidden="true" className="header-panel border-b border-linha bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/85" />
      <span aria-hidden="true" className="header-progress" />
      <div className="header-inner wrap flex h-full items-center justify-between gap-6">
        <Link href={href('home', locale)} className="-m-2 p-2 text-tinta" aria-label={t.nav.home}>
          <Logo idPrefix="logo-header" className="h-7 w-auto md:h-8" />
        </Link>

        <nav aria-label={t.nav.label} className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-7">
            {items.map((item) => (
              <li key={item.id} className={item.id === 'products' ? 'nav-drop' : undefined}>
                <Link
                  href={item.path}
                  aria-current={item.active ? 'page' : undefined}
                  className="relative inline-flex items-center gap-1 py-2 font-medium text-tinta after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:origin-left after:scale-x-0 after:bg-azul after:transition-transform hover:after:scale-x-100 aria-[current=page]:after:scale-x-100"
                >
                  {item.label}
                  {item.id === 'products' && (
                    <svg aria-hidden="true" viewBox="0 0 16 16" className="nav-chevron h-3.5 w-3.5">
                      <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </Link>
                {/* Produtos abre com o rato ou o foco por cima: os quatro produtos à mão (só CSS). */}
                {item.id === 'products' && (
                  <div className="nav-panel">
                    <div className="nav-panel-card">
                      <ul className="grid grid-cols-2 gap-1.5">
                        {PRODUCT_IDS.map((id) => {
                          const p = productsContent[locale].items[id]
                          return (
                            <li key={id}>
                              <Link href={href(id, locale)} aria-current={pageId === id ? 'page' : undefined} className="nav-product">
                                <Image src={p.icon} alt="" width={40} height={40} className="h-10 w-10 shrink-0 object-contain" />
                                <span className="min-w-0">
                                  <span className="block font-semibold text-tinta">{p.name}</span>
                                  <span className="mt-0.5 block text-[0.8125rem] leading-snug text-grafite">{p.short}</span>
                                </span>
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                      <Link href={item.path} className="nav-panel-all">
                        {t.nav.allProducts}
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href={alternateHref(pageId, locale)}
            hrefLang={other === 'pt' ? 'pt-PT' : 'en'}
            lang={other === 'pt' ? 'pt-PT' : 'en'}
            className="inline-flex min-h-[44px] items-center rounded-ctl px-2 text-small font-semibold text-grafite hover:text-tinta"
            title={t.lang.hint}
          >
            <span aria-hidden="true">{t.lang.short}</span>
            <span className="sr-only">{t.lang.switchTo}</span>
          </Link>
          <Link href={`${href('contact', locale)}?assunto=projeto`} className="btn-primary min-h-[44px] py-2.5">
            {t.nav.cta}
          </Link>
        </div>

        <MobileMenu
          labels={{ menu: t.nav.menu, close: t.nav.close, nav: t.nav.label, cta: t.nav.cta, langTitle: t.nav.langTitle, products: t.footer.products }}
          items={items}
          products={PRODUCT_IDS.map((id) => ({
            id,
            name: productsContent[locale].items[id].name,
            icon: productsContent[locale].items[id].icon,
            path: href(id, locale),
            active: pageId === id,
          }))}
          ctaHref={`${href('contact', locale)}?assunto=projeto`}
          langs={(['pt', 'en'] as const).map((l) => ({
            code: l === 'pt' ? 'pt-PT' : 'en',
            short: l.toUpperCase(),
            name: l === 'pt' ? 'Português' : 'English',
            href: l === locale ? href(pageId ?? 'home', locale) : alternateHref(pageId, locale),
            current: l === locale,
          }))}
        />
      </div>
      <HeaderScroll />
    </header>
  )
}
