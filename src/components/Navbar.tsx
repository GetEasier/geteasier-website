'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';
const products = [['TimeEasier','time-easier'], ['ConstructionEasier','construction-easier'], ['StockEasier','stock-easier'], ['WoodEasier','wood-easier']];
export default function Navbar() {
 const {t, language} = useLanguage(); const pt = language === 'pt';
 const [open,setOpen] = useState(false); const [scrolled,setScrolled] = useState(false);
 const pathname = usePathname(); const root = useRef<HTMLElement>(null); const toggle = useRef<HTMLButtonElement>(null);
 useEffect(() => {setOpen(false); root.current?.querySelectorAll('details[open]').forEach(el => el.removeAttribute('open'));},[pathname]);
 useEffect(() => {const scroll = () => setScrolled(window.scrollY > 20); scroll(); window.addEventListener('scroll',scroll,{passive:true}); return () => window.removeEventListener('scroll',scroll);},[]);
 useEffect(() => {
   const close = (event: KeyboardEvent) => {
    if(event.key !== 'Escape') return;
    const expanded = root.current?.querySelector<HTMLDetailsElement>('details[open]');
    const mobileOpen = toggle.current?.getAttribute('aria-expanded') === 'true';
    if (!expanded && !mobileOpen) return;
    setOpen(false);
    root.current?.querySelectorAll('details[open]').forEach(el => el.removeAttribute('open'));
    if (mobileOpen) toggle.current?.focus();
    else expanded?.querySelector('summary')?.focus();
   };
   const outside = (event: MouseEvent) => {if(!root.current?.contains(event.target as Node)) {setOpen(false); root.current?.querySelectorAll('details[open]').forEach(el => el.removeAttribute('open'));}};
   document.addEventListener('keydown',close); document.addEventListener('click',outside);
   return () => {document.removeEventListener('keydown',close); document.removeEventListener('click',outside);};
 },[]);
 const links = <><Link href="/desenvolvimento-a-medida">{t('nav.services')}</Link><details className="relative group"><summary className="cursor-pointer list-none flex items-center gap-1">{t('nav.products')}<ChevronDown size={15} className="group-open:rotate-180 transition-transform"/></summary><div className="lg:absolute lg:top-full lg:left-0 pt-3"><div className="bg-white border border-slate-200 rounded-xl p-2 lg:shadow-xl min-w-[230px]">{products.map(([name,slug])=><Link className="block px-3 py-3 hover:bg-blue-50 rounded-lg text-slate-800" key={slug} href={`/${slug}`} onClick={()=>root.current?.querySelectorAll('details[open]').forEach(el=>el.removeAttribute('open'))}>{name}</Link>)}</div></div></details><Link href="/#case-study">{pt ? 'Resultados' : 'Results'}</Link><Link href="/#team">{t('nav.about')}</Link></>;
 return <header ref={root} className={`fixed top-0 inset-x-0 z-50 border-b transition-colors duration-300 ${scrolled || open ? 'bg-white/95 border-slate-200 shadow-sm' : 'bg-white/80 border-transparent'}`}>
  <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:bg-white focus:p-3">{pt ? 'Saltar para o conteúdo' : 'Skip to content'}</a>
  <div className="max-w-7xl mx-auto px-5 md:px-8 h-20 flex items-center justify-between gap-5">
   <Link href="/" aria-label="GetEasier — início" className="font-semibold text-2xl tracking-tight text-slate-900 flex items-center gap-2"><Image src="/logo-dark.svg" alt="GetEasier" width={175} height={52} priority className="w-36 sm:w-44 h-auto"/></Link>
   <nav aria-label={pt ? 'Navegação principal' : 'Main navigation'} className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">{links}</nav>
   <div className="flex items-center gap-2"><LanguageSelector/><Link href="/#contact" className="ge-button hidden lg:inline-flex text-sm">{t('hero.ctaPrimary')}</Link><button ref={toggle} type="button" className="lg:hidden p-3" aria-label={open ? (pt ? 'Fechar menu' : 'Close menu') : (pt ? 'Abrir menu' : 'Open menu')} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)}>{open ? <X/> : <Menu/>}</button></div>
  </div>
  <nav id="mobile-navigation" hidden={!open} aria-label={pt ? 'Navegação móvel' : 'Mobile navigation'} onClick={event => {if((event.target as HTMLElement).closest('a')) setOpen(false);}} className="lg:hidden max-h-[calc(100dvh-5rem)] overflow-y-auto px-6 pb-6 space-y-5 text-base font-semibold [&>a]:block">{links}<Link className="ge-button" href="/#contact">{t('nav.contact')}</Link></nav>
 </header>;
}
