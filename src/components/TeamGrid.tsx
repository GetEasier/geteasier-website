import Image from 'next/image'
import { TEAM, about } from '@/content/about'
import type { Locale } from '@/lib/seo.config'
import { cn } from '@/lib/utils'

export default function TeamGrid({ locale, className, dark, parallax }: { locale: Locale; className?: string; dark?: boolean; parallax?: boolean }) {
  const roles = about[locale].roles
  return (
    <ul data-team={parallax ? '' : undefined} className={cn('grid gap-6 sm:grid-cols-3', className)}>
      {TEAM.map((m) => (
        <li key={m.name} className={cn(!parallax && 'reveal-photo', 'group relative overflow-hidden rounded-frame')}>
          <Image
            src={m.photo}
            alt={m.name}
            width={480}
            height={600}
            sizes="(min-width: 640px) 30vw, 100vw"
            className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className={cn('absolute inset-x-0 bottom-0 bg-gradient-to-t from-tinta/90 via-tinta/40 to-transparent p-5 pt-16', dark ? 'text-white' : 'text-white')}>
            <p className="text-lead font-semibold">{m.name}</p>
            <p className="text-small text-white/85">{roles[m.role]}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
