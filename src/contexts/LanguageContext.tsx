"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';
import pt from '@/translations/pt.json';
import en from '@/translations/en.json';
type Language = 'pt' | 'en';
const dictionaries = { pt, en };
const LanguageContext = createContext<{language: Language; setLanguage: (lang: Language) => void; t: (key: string) => string} | undefined>(undefined);
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pt');
  useEffect(() => {
    try { const saved = localStorage.getItem('language'); if (saved === 'en' || saved === 'pt') setLanguageState(saved); } catch {}
  }, []);
  useEffect(() => { document.documentElement.lang = language === 'pt' ? 'pt-PT' : 'en'; }, [language]);
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try { localStorage.setItem('language', lang); } catch {}
  };
  const t = (key: string): string => {
    const value = key.split('.').reduce<unknown>((value, part) => value && typeof value === 'object' ? (value as Record<string, unknown>)[part] : undefined, dictionaries[language]);
    return typeof value === 'string' ? value : key;
  };
  return <LanguageContext.Provider value={{language, setLanguage, t}}><MotionConfig reducedMotion="user">{children}</MotionConfig></LanguageContext.Provider>;
}
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}
