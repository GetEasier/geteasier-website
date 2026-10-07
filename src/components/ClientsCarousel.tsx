'use client';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
export default function ClientsCarousel({clients}: {clients: {image:string;alt:string}[]}) {
 const {t} = useLanguage();
 return <section id="clients" className="py-10 md:py-12"><p className="text-center text-slate-500 text-sm font-medium mb-7">{t('clients.trustedBy')}</p><div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-5 md:gap-x-12">{clients.map(client=><Image key={client.alt} src={client.image} alt={client.alt} width={140} height={80} className="object-contain w-24 md:w-32 h-16 opacity-75 hover:opacity-100 transition-opacity"/>)}</div></section>;
}
