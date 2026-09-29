'use client'

import { cn } from '@/lib/utils'

// Botão de pausa de tudo o que se mexe sozinho mais de 5 s (WCAG 2.2.2).
// Escondido com "reduzir movimento", porque aí nada se mexe.
export default function PauseButton({
  paused,
  onToggle,
  labels,
  className,
  dark,
}: {
  paused: boolean
  onToggle: () => void
  labels: { pause: string; play: string }
  className?: string
  dark?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={paused}
      className={cn(
        'motion-only inline-flex min-h-[44px] items-center gap-2 rounded-ctl px-3 text-small font-semibold transition-colors duration-150',
        dark ? 'text-white/85 hover:bg-white/10 hover:text-white' : 'text-grafite hover:bg-tinta/5 hover:text-tinta',
        className,
      )}
    >
      <svg viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor" aria-hidden="true">
        {paused ? <path d="M2 1l9 5-9 5z" /> : <path d="M2 1h3v10H2zM7 1h3v10H7z" />}
      </svg>
      {paused ? labels.play : labels.pause}
    </button>
  )
}
