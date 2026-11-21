'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/seo.config';
import { FlagIcon } from './FlagIcon';

export type LangOption = {
  locale: Locale;
  code: string;
  name: string;
  href: string;
  current: boolean;
};

export default function LanguageFlagDropdown({
  langs,
  currentLocale,
  hint,
}: {
  langs: LangOption[];
  currentLocale: Locale;
  hint: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onOutside);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onOutside);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={hint}
        title={hint}
        aria-expanded={open}
        className="inline-flex min-h-[44px] items-center gap-1.5 rounded-ctl px-2.5 text-grafite transition-colors hover:bg-papel hover:text-tinta"
      >
        <FlagIcon code={currentLocale} />
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 flex flex-col gap-1 rounded-xl border border-linha bg-white p-1.5 shadow-xl">
          {langs.map((l) => (
            <Link
              key={l.locale}
              href={l.href}
              hrefLang={l.code}
              lang={l.code}
              title={l.name}
              aria-label={l.name}
              aria-current={l.current ? 'true' : undefined}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-center rounded-lg p-2 transition-colors ${
                l.current ? 'bg-azul/10 ring-1 ring-azul/40' : 'hover:bg-papel'
              }`}
            >
              <FlagIcon code={l.locale} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
