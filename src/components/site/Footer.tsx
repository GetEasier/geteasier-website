import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { MAIN_NAV, PRODUCT_IDS, href, route, type Locale } from '@/lib/seo.config'
import { COMPANY } from '@/lib/site'
import { common } from '@/content/common'

export default function Footer({ locale }: { locale: Locale }) {
  const t = common[locale]
  const colTitle = 'mb-4 font-semibold text-white'
  const linkCls = 'text-white/80 underline-offset-4 hover:text-white hover:underline'

  return (
    <footer className="bg-tinta text-white">
      <div className="wrap grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Link href={href('home', locale)} aria-label={t.nav.home} className="inline-block text-white">
            <Logo idPrefix="logo-footer" className="h-8 w-auto" />
          </Link>
          <p className="mt-4 text-small text-white/80">{t.footer.tagline}</p>
          <p className="mt-4 text-small">
            <span className="text-white/80">{t.footer.whatsapp}: </span>
            <a href={COMPANY.whatsapp.href} className={linkCls} rel="noopener noreferrer" target="_blank">
              {COMPANY.whatsapp.display}
            </a>
          </p>
        </div>

        <nav aria-labelledby="footer-company">
          <h2 id="footer-company" className={colTitle}>
            {t.footer.company}
          </h2>
          <ul className="space-y-2.5 text-small">
            {MAIN_NAV.filter((id) => id !== 'products').map((id) => (
              <li key={id}>
                <Link href={href(id, locale)} className={linkCls}>
                  {route(id, locale).breadcrumb}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-products">
          <h2 id="footer-products" className={colTitle}>
            {t.footer.products}
          </h2>
          <ul className="space-y-2.5 text-small">
            <li>
              <Link href={href('products', locale)} className={linkCls}>
                {route('products', locale).breadcrumb}
              </Link>
            </li>
            {PRODUCT_IDS.map((id) => (
              <li key={id}>
                <Link href={href(id, locale)} className={linkCls}>
                  {route(id, locale).breadcrumb}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={colTitle}>{t.footer.social}</h2>
          <ul className="space-y-2.5 text-small">
            {COMPANY.socials.map((s) => (
              <li key={s.name}>
                <a href={s.href} className={linkCls} rel="noopener noreferrer" target="_blank">
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="wrap border-t border-white/15 py-6">
        <a
          href={COMPANY.funding.pdf}
          download
          className="inline-block rounded-ctl bg-white p-2"
          title={t.footer.fundingDownload}
        >
          <Image
            src={COMPANY.funding.logo}
            alt={`${t.footer.fundingAlt}. ${t.footer.fundingDownload}`}
            width={4925}
            height={711}
            sizes="320px"
            className="h-10 w-auto md:h-11"
          />
        </a>
      </div>

      <div className="wrap flex flex-col gap-4 border-t border-white/15 py-6 text-small text-white/80 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {COMPANY.name}, {COMPANY.legalName}. {t.footer.rights}
        </p>
        <nav aria-label={t.footer.legal}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href={href('terms', 'pt')} hrefLang="pt-PT" className={linkCls}>
                {route('terms', 'pt').breadcrumb}
              </Link>
            </li>
            <li>
              <Link href={href('privacy', 'pt')} hrefLang="pt-PT" className={linkCls}>
                {route('privacy', 'pt').breadcrumb}
              </Link>
            </li>
            <li>
              <Link href={`${href('privacy', 'pt')}#cookies`} hrefLang="pt-PT" className={linkCls}>
                {t.footer.cookies}
              </Link>
            </li>
          </ul>
          {t.footer.legalOnlyPt && <p className="mt-2 text-white/70">{t.footer.legalOnlyPt}</p>}
        </nav>
      </div>
    </footer>
  )
}
