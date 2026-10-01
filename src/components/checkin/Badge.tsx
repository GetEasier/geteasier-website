import { cn } from '@/lib/utils'

export type DocStatus = 'ok' | 'soon' | 'missing'

// O crachá: o objeto de assinatura do site. Tem o furo da mola no topo e é o mesmo cartão no
// hero, no feed e nos separadores (é ele que transita entre vistas, data-flip-id="cracha").
export default function Badge({
  name,
  company,
  role,
  status,
  statusText,
  time,
  flipId,
  className,
  size = 'md',
}: {
  name: string
  company: string
  role?: string
  status?: DocStatus
  statusText?: string
  time?: string
  flipId?: string
  className?: string
  size?: 'sm' | 'md'
}) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
  return (
    <div data-flip-id={flipId} className={cn('cracha relative bg-white text-tinta', size === 'sm' ? 'cracha-sm' : 'cracha-md', className)}>
      <span aria-hidden="true" className="cracha-furo" />
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="cracha-foto grid shrink-0 place-items-center font-bold">
          {initials}
        </span>
        <span className="min-w-0 flex-1">
          <span className={cn('block font-semibold leading-tight', size === 'sm' ? 'break-words' : 'truncate')}>{name}</span>
          <span className={cn('block text-[13px] leading-snug text-grafite', size === 'sm' ? 'break-words' : 'truncate')}>
            {company}
            {role ? `, ${role}` : ''}
          </span>
        </span>
        {time && <span className="t-data shrink-0 text-[13px] text-tinta">{time}</span>}
      </div>
      {status && statusText && (
        <p className={cn('cracha-estado mt-2.5 flex items-center gap-1.5 text-[13px] font-semibold', `is-${status}`)}>
          <StatusIcon status={status} />
          {statusText}
        </p>
      )}
    </div>
  )
}

export function StatusIcon({ status, className }: { status: DocStatus; className?: string }) {
  // Estado nunca só por cor: forma diferente para cada um.
  if (status === 'ok')
    return (
      <svg viewBox="0 0 16 16" className={cn('h-4 w-4 shrink-0', className)} aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill="currentColor" />
        <path d="M4.8 8.2l2.1 2.1 4.3-4.5" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  if (status === 'soon')
    return (
      <svg viewBox="0 0 16 16" className={cn('h-4 w-4 shrink-0', className)} aria-hidden="true">
        <path d="M8 1.2l7 12.6H1z" fill="#F5B400" stroke="#8F5400" strokeWidth="1" strokeLinejoin="round" />
        <path d="M8 6v3.6M8 11.4v.4" stroke="#06083C" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  return (
    <svg viewBox="0 0 16 16" className={cn('h-4 w-4 shrink-0', className)} aria-hidden="true">
      <rect x="1.5" y="1.5" width="13" height="13" rx="2" fill="currentColor" />
      <path d="M5.2 5.2l5.6 5.6M10.8 5.2l-5.6 5.6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
