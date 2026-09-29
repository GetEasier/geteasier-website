import Link from 'next/link'
import { breadcrumbTrail, type Locale, type PageId } from '@/lib/seo.config'
import { common } from '@/content/common'

export default function Breadcrumbs({ pageId, locale }: { pageId: PageId; locale: Locale }) {
  const trail = breadcrumbTrail(pageId, locale)
  return (
    <nav aria-label={common[locale].breadcrumbs} className="t-data text-grafite">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((item, i) => {
          const last = i === trail.length - 1
          return (
            <li key={item.id} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-tinta">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.path} className="underline decoration-linha underline-offset-4 hover:text-tinta hover:decoration-tinta">
                    {item.label}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
