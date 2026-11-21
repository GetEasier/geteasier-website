'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { COUNTRIES, PRIORITY_COUNTRY_CODES, type CountryOption } from '@/data/countries';

export type QrLanguage = 'pt' | 'en' | 'nl' | 'es' | 'fr';

interface CountrySelectProps {
  id?: string;
  value: string;
  onChange: (code: string) => void;
  lang: QrLanguage;
  hasError?: boolean;
}

const COUNTRY_SELECT_COPY: Record<
  QrLanguage,
  { placeholder: string; search: string; clear: string; empty: string; listLabel: string }
> = {
  pt: {
    placeholder: 'Selecione o país…',
    search: 'Pesquisar país…',
    clear: 'Limpar pesquisa',
    empty: 'Nenhum país encontrado.',
    listLabel: 'Países',
  },
  en: {
    placeholder: 'Select country…',
    search: 'Search country…',
    clear: 'Clear search',
    empty: 'No country found.',
    listLabel: 'Countries',
  },
  nl: {
    placeholder: 'Selecteer land…',
    search: 'Zoek land…',
    clear: 'Zoekopdracht wissen',
    empty: 'Geen land gevonden.',
    listLabel: 'Landen',
  },
  es: {
    placeholder: 'Selecciona un país…',
    search: 'Buscar país…',
    clear: 'Limpiar búsqueda',
    empty: 'No se encontró ningún país.',
    listLabel: 'Países',
  },
  fr: {
    placeholder: 'Sélectionnez le pays…',
    search: 'Rechercher un pays…',
    clear: 'Effacer la recherche',
    empty: 'Aucun pays trouvé.',
    listLabel: 'Pays',
  },
};

function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function getLocalizedCountryName(country: CountryOption, lang: QrLanguage): string {
  if (lang === 'pt') return country.pt;
  if (lang === 'en') return country.en;
  try {
    const display = new Intl.DisplayNames([lang], { type: 'region' });
    return display.of(country.code) || country.en;
  } catch {
    return country.en;
  }
}

export default function CountrySelect({
  id = 'qr-country',
  value,
  onChange,
  lang,
  hasError,
}: CountrySelectProps) {
  const copy = COUNTRY_SELECT_COPY[lang];
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const closeDropdown = () => {
    setOpen(false);
    setQuery('');
  };

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDropdown();
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => searchRef.current?.focus(), 40);
    return () => clearTimeout(timer);
  }, [open]);

  const selectedCountry = useMemo(
    () => COUNTRIES.find((c) => c.code === value),
    [value]
  );

  const { priorityCountries, otherCountries, filteredCountries } = useMemo(() => {
    const priorityMap = new Map(COUNTRIES.map((c) => [c.code, c]));
    const priority = PRIORITY_COUNTRY_CODES.map((code) => priorityMap.get(code)).filter(
      (c): c is CountryOption => Boolean(c)
    );
    const prioritySet = new Set(PRIORITY_COUNTRY_CODES);
    const others = COUNTRIES.filter((c) => !prioritySet.has(c.code)).sort((a, b) =>
      getLocalizedCountryName(a, lang).localeCompare(getLocalizedCountryName(b, lang), lang)
    );

    const q = normalizeText(query.trim());
    const filtered = q
      ? [...priority, ...others].filter(
          (c) =>
            normalizeText(getLocalizedCountryName(c, lang)).includes(q) ||
            normalizeText(c.pt).includes(q) ||
            normalizeText(c.en).includes(q) ||
            c.code.toLowerCase() === q
        )
      : [];

    return { priorityCountries: priority, otherCountries: others, filteredCountries: filtered };
  }, [lang, query]);

  const selectCountry = (code: string) => {
    onChange(code);
    closeDropdown();
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => (open ? closeDropdown() : setOpen(true))}
        className={`flex h-12 w-full items-center rounded-2xl border bg-papel/60 pl-10 pr-10 text-left text-body transition-all ${
          open
            ? 'border-azul ring-2 ring-azul/25'
            : hasError
            ? 'border-estado-erro'
            : 'border-linha hover:border-grafite/60'
        }`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-grafite"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
        <span className={`truncate ${selectedCountry ? 'text-tinta' : 'text-grafite/70'}`}>
          {selectedCountry ? getLocalizedCountryName(selectedCountry, lang) : copy.placeholder}
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={`absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-grafite transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        >
          <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute bottom-full left-0 right-0 z-50 mb-2 overflow-hidden rounded-2xl border border-linha bg-white shadow-xl">
          <div className="border-b border-linha/60 bg-papel/70 p-2">
            <div className="relative flex items-center">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="pointer-events-none absolute left-3 h-4 w-4 text-grafite"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={copy.search}
                className="h-10 w-full rounded-xl border border-linha bg-white pl-9 pr-8 text-small text-tinta placeholder:text-grafite/70 focus:border-azul focus:outline-none focus:ring-2 focus:ring-azul/25"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label={copy.clear}
                  className="absolute right-2.5 p-1 text-grafite hover:text-tinta"
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                    <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <ul
            role="listbox"
            aria-label={copy.listLabel}
            className="max-h-56 space-y-0.5 overflow-y-auto p-1.5"
          >
            {query.trim() ? (
              filteredCountries.length > 0 ? (
                filteredCountries.map((c) => {
                  const isSelected = c.code === value;
                  return (
                    <li key={c.code}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => selectCountry(c.code)}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-small transition-colors ${
                          isSelected ? 'bg-azul/10 font-semibold text-azul' : 'text-tinta hover:bg-papel'
                        }`}
                      >
                        <span>{getLocalizedCountryName(c, lang)}</span>
                        {isSelected && <span className="text-xs font-bold text-azul">✓</span>}
                      </button>
                    </li>
                  );
                })
              ) : (
                <li className="px-3 py-6 text-center text-small text-grafite">{copy.empty}</li>
              )
            ) : (
              <>
                {priorityCountries.map((c) => {
                  const isSelected = c.code === value;
                  return (
                    <li key={c.code}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => selectCountry(c.code)}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-small transition-colors ${
                          isSelected ? 'bg-azul/10 font-semibold text-azul' : 'text-tinta hover:bg-papel'
                        }`}
                      >
                        <span>{getLocalizedCountryName(c, lang)}</span>
                        {isSelected && <span className="text-xs font-bold text-azul">✓</span>}
                      </button>
                    </li>
                  );
                })}
                <li aria-hidden="true" className="my-1.5 border-t border-linha/60" />
                {otherCountries.map((c) => {
                  const isSelected = c.code === value;
                  return (
                    <li key={c.code}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => selectCountry(c.code)}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-small transition-colors ${
                          isSelected ? 'bg-azul/10 font-semibold text-azul' : 'text-tinta hover:bg-papel'
                        }`}
                      >
                        <span>{getLocalizedCountryName(c, lang)}</span>
                        {isSelected && <span className="text-xs font-bold text-azul">✓</span>}
                      </button>
                    </li>
                  );
                })}
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
