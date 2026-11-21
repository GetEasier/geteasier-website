import type { Locale } from '@/lib/seo.config';

export function FlagIcon({ code, className = 'h-3.5 w-5' }: { code: Locale; className?: string }) {
  const cls = `${className} shrink-0 rounded-[2px] shadow-sm ring-1 ring-black/10`;
  switch (code) {
    case 'pt':
      return (
        <svg viewBox="0 0 24 16" className={cls} aria-hidden="true">
          <rect width="9.6" height="16" fill="#006600" />
          <rect x="9.6" width="14.4" height="16" fill="#FF0000" />
          <circle cx="9.6" cy="8" r="3.4" fill="#FFCC00" />
          <circle cx="9.6" cy="8" r="2.2" fill="#FFFFFF" stroke="#003399" strokeWidth="0.6" />
        </svg>
      );
    case 'en':
      return (
        <svg viewBox="0 0 24 16" className={cls} aria-hidden="true">
          <rect width="24" height="16" fill="#012169" />
          <path d="M0 0L24 16M24 0L0 16" stroke="#FFFFFF" strokeWidth="2.8" />
          <path d="M0 0L24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1.4" />
          <path d="M12 0V16M0 8H24" stroke="#FFFFFF" strokeWidth="4.4" />
          <path d="M12 0V16M0 8H24" stroke="#C8102E" strokeWidth="2.6" />
        </svg>
      );
    case 'nl':
      return (
        <svg viewBox="0 0 24 16" className={cls} aria-hidden="true">
          <rect width="24" height="5.33" fill="#AE1C28" />
          <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
          <rect y="10.67" width="24" height="5.33" fill="#21468B" />
        </svg>
      );
    case 'es':
      return (
        <svg viewBox="0 0 24 16" className={cls} aria-hidden="true">
          <rect width="24" height="4" fill="#AA151B" />
          <rect y="4" width="24" height="8" fill="#F1BF00" />
          <rect y="12" width="24" height="4" fill="#AA151B" />
        </svg>
      );
    case 'fr':
      return (
        <svg viewBox="0 0 24 16" className={cls} aria-hidden="true">
          <rect width="8" height="16" fill="#002395" />
          <rect x="8" width="8" height="16" fill="#FFFFFF" />
          <rect x="16" width="8" height="16" fill="#ED2939" />
        </svg>
      );
  }
}
