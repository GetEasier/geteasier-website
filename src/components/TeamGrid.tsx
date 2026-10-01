import Image from 'next/image'
import { TEAM, about } from '@/content/about'
import type { Locale } from '@/lib/seo.config'
import { cn } from '@/lib/utils'
import TeamLive from '@/components/home/TeamLive'

// Fotografias da equipa. No início (lively) cada cartão inclina-se para o rato, com uma luz que o
// segue e um contorno de luz; as fotografias deslizam a velocidades diferentes (parallax).
export default function TeamGrid({
  locale,
  className,
  dark,
  parallax,
  lively,
}: {
  locale: Locale
  className?: string
  dark?: boolean
  parallax?: boolean
  lively?: boolean
}) {
  const roles = about[locale].roles
  const founder = about[locale].founder
  return (
    <ul data-team={parallax ? '' : undefined} data-team-live={lively ? '' : undefined} className={cn('grid gap-6 sm:grid-cols-3', className)}>
      {lively && <TeamLive />}
      {TEAM.map((m, i) => (
        <li key={m.name} className={cn(!parallax && 'reveal-photo', 'group relative')}>
          <div className={cn('relative overflow-hidden rounded-frame', lively && 'team-card')} style={lively ? { ['--k' as string]: i } : undefined}>
            <Image
              src={m.photo}
              alt={m.name}
              width={480}
              height={600}
              sizes="(min-width: 640px) 30vw, 100vw"
              className="aspect-[4/5] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
            />
            {lively ? (
              <>
                <span className="team-chip">
                  <i aria-hidden="true" />
                  {founder}
                </span>
                <span aria-hidden="true" className="team-index">
                  0{i + 1}
                </span>
                <div className="team-info">
                  <p className="team-name">{m.name}</p>
                  <p className="team-role">{roles[m.role]}</p>
                </div>
              </>
            ) : (
              <div className={cn('absolute inset-x-0 bottom-0 bg-gradient-to-t from-tinta/90 via-tinta/40 to-transparent p-5 pt-16', dark ? 'text-white' : 'text-white')}>
                <p className="text-lead font-semibold">{m.name}</p>
                <p className="text-small text-white/85">
                  {founder} · {roles[m.role]}
                </p>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
