'use client';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
export default function BackToTop() {
 const [visible,setVisible] = useState(false); const {language} = useLanguage();
 useEffect(()=>{const scroll=()=>setVisible(window.scrollY>700);scroll();window.addEventListener('scroll',scroll,{passive:true});return()=>window.removeEventListener('scroll',scroll);},[]);
 return visible ? <a href="#home" aria-label={language==='pt'?'Voltar ao início':'Back to top'} className="fixed bottom-5 right-5 z-40 rounded-full p-3 bg-blue-700 text-white shadow-lg hover:bg-blue-800 transition-colors"><ArrowUp size={22}/></a> : null;
}
