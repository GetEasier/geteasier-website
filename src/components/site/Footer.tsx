import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/components/Logo'
import { MAIN_NAV, PRODUCT_IDS, href, route, type Locale } from '@/lib/seo.config'
import { COMPANY } from '@/lib/site'
import { common } from '@/content/common'

// Rodapé: fundo da marca com grelha, um convite a falar (fora do início e dos contactos, que já
// acabam num cartão de contacto), colunas de ligações, redes em ícones e os apoios. Clicar nos
// logótipos dos apoios descarrega a ficha do projeto.
export default function Footer({ locale, cta = true }: { locale: Locale; cta?: boolean }) {
  const t = common[locale]
  const colTitle = 'mb-4 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ciano'
  const linkCls = 'footer-link text-white/75 hover:text-white'

  return (
    <footer className="footer-brand relative overflow-hidden text-white">
      <div className="wrap relative">
        {cta && (
          <div className="footer-cta mt-14 flex flex-col gap-6 rounded-[28px] p-7 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <p className="t-h3">{t.footer.ctaTitle}</p>
              <p className="mt-2 max-w-[48ch] text-white/75">{t.footer.ctaText}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link href={`${href('contact', locale)}?assunto=projeto`} className="btn bg-ciano text-tinta hover:bg-white">
                {t.cta.project}
              </Link>
              <a href={COMPANY.whatsapp.href} className="btn-on-dark" target="_blank" rel="noopener noreferrer">
                {t.cta.whatsapp}
              </a>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr]">
          <div className="col-span-2 max-w-sm lg:col-span-1">
            <Link href={href('home', locale)} aria-label={t.nav.home} className="inline-block text-white">
              <Logo idPrefix="logo-footer" className="h-9 w-auto" />
            </Link>
            <p className="mt-5 text-small leading-relaxed text-white/75">{t.footer.tagline}</p>
            <ul className="mt-6 flex gap-2.5" aria-label={t.footer.social}>
              {COMPANY.socials.map((s) => (
                <li key={s.name}>
                  <a href={s.href} className="footer-social" rel="noopener noreferrer" target="_blank" aria-label={s.name}>
                    {SOCIAL_ICONS[s.name]}
                  </a>
                </li>
              ))}
            </ul>
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

          <div className="col-span-2 lg:col-span-1">
            <h2 className={colTitle}>{t.footer.contact}</h2>
            <ul className="space-y-4 text-small">
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="contact-ico">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 13.5l.9-2.7A5.5 5.5 0 1 1 5.6 12.9z" />
                  </svg>
                </span>
                <span>
                  <span className="block text-white/55">{t.footer.whatsapp}</span>
                  <a href={COMPANY.whatsapp.href} className="font-semibold text-white hover:text-ciano" rel="noopener noreferrer" target="_blank">
                    {COMPANY.whatsapp.display}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="contact-ico">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 14.5s5-4.3 5-8.2A5 5 0 0 0 3 6.3c0 3.9 5 8.2 5 8.2z" />
                    <circle cx="8" cy="6.3" r="1.8" />
                  </svg>
                </span>
                <span className="text-white/75">
                  {COMPANY.address.street}
                  <br />
                  {COMPANY.address.postalCode} {COMPANY.address.locality}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-7">
          <a href={COMPANY.funding.pdf} download className="footer-funding" title={t.footer.fundingDownload}>
            <Image
              src={COMPANY.funding.logo}
              alt={`${t.footer.fundingAlt}. ${t.footer.fundingDownload}`}
              width={4925}
              height={711}
              sizes="400px"
              className="h-10 w-auto max-w-full md:h-12"
            />
          </a>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-small text-white/60 md:flex-row md:items-center md:justify-between">
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
            {t.footer.legalOnlyPt && <p className="mt-2 text-white/60">{t.footer.legalOnlyPt}</p>}
          </nav>
        </div>
      </div>

      {/* O símbolo da marca em grande, quase invisível, a sair pelo canto */}
      <svg aria-hidden="true" viewBox="0 0 118 82" className="footer-mark">
        <polygon points="55.3,81.76 14.43,40.9 55.32,0.01 40.89,0.01 0,40.9 40.87,81.76" />
        <polygon points="117.83,40.89 102.15,56.57 76.96,81.76 62.53,81.76 103.4,40.89 97.9,35.39 112.33,35.39" />
        <polygon points="117.83,40.89 112.35,46.37 50.34,46.37 50.34,35.39 112.33,35.39" />
        <polygon points="87.7,25.19 62.5,0 76.93,0 102.13,25.19" />
      </svg>
    </footer>
  )
}

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4v11H3zM9.5 9.5h3.8v1.6h.05c.53-1 1.83-2 3.77-2 4.03 0 4.78 2.6 4.78 6v5.4h-4v-4.8c0-1.15-.02-2.62-1.6-2.62-1.6 0-1.85 1.25-1.85 2.54v4.88h-4z" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.86.25-1.45 1.5-1.45h1.55V4.47A20 20 0 0 0 14.3 4.3c-2.2 0-3.8 1.35-3.8 3.85v2.35H8v3h2.5V21z" />
    </svg>
  ),
}
