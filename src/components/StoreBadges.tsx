import { COMPANY } from '@/lib/site'
import type { Locale } from '@/lib/seo.config'
import { cn } from '@/lib/utils'

// Ligações para a app TimeEasier nas lojas (URLs em site.ts).
export default function StoreBadges({ locale, className }: { locale: Locale; className?: string }) {
  const pre = locale === 'pt' ? 'TimeEasier na' : 'TimeEasier on'
  const badge = 'flex min-h-[48px] items-center gap-2.5 rounded-ctl bg-black px-3.5 py-2 text-white ring-1 ring-white/25 transition-transform hover:-translate-y-0.5'
  return (
    <ul className={cn('flex flex-wrap gap-3', className)}>
      <li>
        <a href={COMPANY.apps.ios} target="_blank" rel="noopener noreferrer" className={badge}>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
            <path d="M16.37 12.64c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.47.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.76 2.28-1.6 2.78-.41 6.9 1.15 9.16.77 1.1 1.68 2.34 2.87 2.3 1.15-.05 1.59-.75 2.98-.75 1.39 0 1.78.75 3 .72 1.24-.02 2.02-1.12 2.78-2.23.87-1.28 1.23-2.52 1.25-2.59-.03-.01-2.4-.92-2.44-3.67zM14.1 5.9c.63-.77 1.06-1.83.94-2.9-.91.04-2.02.61-2.67 1.37-.58.67-1.09 1.76-.96 2.8 1.02.08 2.06-.52 2.69-1.27z" />
          </svg>
          <span className="leading-tight">
            <span className="block text-[11px] text-white/75">{pre}</span>
            <span className="block text-[15px] font-semibold">App Store</span>
          </span>
        </a>
      </li>
      <li>
        <a href={COMPANY.apps.android} target="_blank" rel="noopener noreferrer" className={badge}>
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
            <path d="M4.2 2.6l9.9 9.4-9.9 9.4c-.3-.2-.5-.6-.5-1V3.6c0-.4.2-.8.5-1z" fill="#34A853" />
            <path d="M17.4 8.9L14.1 12l-9.9-9.4c.3-.3.8-.3 1.2-.1l12 6.4z" fill="#4285F4" />
            <path d="M17.4 15.1L5.4 21.5c-.4.2-.9.2-1.2-.1l9.9-9.4 3.3 3.1z" fill="#EA4335" />
            <path d="M20.3 10.5c.8.4.8 1.6 0 2.1l-2.9 1.5L14.1 12l3.3-3.1 2.9 1.6z" fill="#FBBC04" />
          </svg>
          <span className="leading-tight">
            <span className="block text-[11px] text-white/75">{pre}</span>
            <span className="block text-[15px] font-semibold">Google Play</span>
          </span>
        </a>
      </li>
    </ul>
  )
}
