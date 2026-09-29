import Link from 'next/link'
import Logo from '@/components/Logo'
import MobileMenu from './MobileMenu'
import HeaderScroll from './HeaderScroll'
import { MAIN_NAV, ROUTES, breadcrumbTrail, href, route, type Locale, type PageId } from '@/lib/seo.config'
import { common } from '@/content/common'

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
  const activeIds = new Set(pageId ? breadcrumbTrail(pageId, locale).map((c) => c.id) : [])
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
      <span aria-hidden="true" className="header-panel border-b border-linha bg-papel/95 backdrop-blur-[2px] supports-[backdrop-filter]:bg-papel/90" />
      <span aria-hidden="true" className="header-progress" />
      <div className="header-inner wrap flex h-full items-center justify-between gap-6">
        <Link href={href('home', locale)} className="-m-2 p-2 text-tinta" aria-label={t.nav.home}>
          <Logo idPrefix="logo-header" className="h-7 w-auto md:h-8" />
        </Link>

        <nav aria-label={t.nav.label} className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-7">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.path}
                  aria-current={item.active ? 'page' : undefined}
                  className="relative py-2 font-medium text-tinta after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:origin-left after:scale-x-0 after:bg-azul after:transition-transform hover:after:scale-x-100 aria-[current=page]:after:scale-x-100"
                >
                  {item.label}
                </Link>
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
          labels={{ menu: t.nav.menu, close: t.nav.close, nav: t.nav.label, cta: t.nav.cta, lang: t.lang.switchTo, langHint: t.lang.hint }}
          items={items}
          ctaHref={`${href('contact', locale)}?assunto=projeto`}
          langHref={alternateHref(pageId, locale)}
          langCode={other === 'pt' ? 'pt-PT' : 'en'}
        />
      </div>
      <HeaderScroll />
    </header>
  )
}
