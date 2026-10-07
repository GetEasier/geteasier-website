'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Code2, Smartphone, Workflow } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import MaxWidthWrapper from './MaxWidthWrapper';
import AnimationFadeUp from './animation/fade-up';
import ContactForm from './ContactForm';
import { ProcessSection, CaseStudySection } from './CompanyStory';
export default function CustomDevelopment(){
 const {language}=useLanguage(); const pt=language==='pt';
 const services=pt?[
  ['Aplicações web','Centralize informação, substitua tarefas manuais e dê à sua equipa ferramentas adaptadas ao trabalho real.'],
  ['Aplicações mobile','Leve os processos até às pessoas, no escritório, em obra ou no terreno.'],
  ['Integrações e automação','Ligue os seus sistemas e reduza a repetição de tarefas e a introdução manual de dados.'],
 ]:[['Web applications','Centralise information, replace manual tasks and give your team tools that fit their work.'],['Mobile applications','Bring your processes to people, in the office, on site or in the field.'],['Integrations and automation','Connect your systems and reduce repetitive tasks and manual data entry.']];
 const icons=[Code2,Smartphone,Workflow];
 return <>
 <section className="pt-32 md:pt-40 pb-16 md:pb-24 bg-gradient-to-b from-blue-50 to-white"><MaxWidthWrapper className="px-6 md:px-12"><div className="grid lg:grid-cols-[1.1fr_.9fr] gap-12 items-center"><AnimationFadeUp><p className="text-blue-700 text-sm font-semibold mb-5">{pt?'DESENVOLVIMENTO À MEDIDA':'CUSTOM DEVELOPMENT'}</p><h1 className="text-4xl md:text-6xl leading-[1.08] tracking-tight font-bold text-slate-900">{pt?'O seu processo merece o software certo.':'Your process deserves the right software.'}</h1><p className="text-lg text-slate-600 leading-relaxed mt-6 mb-8">{pt?'Quando as ferramentas disponíveis já não acompanham o seu trabalho, criamos uma solução à volta da sua empresa. Do levantamento de necessidades à implementação e evolução.':'When off-the-shelf tools no longer fit your work, we build a solution around your business. From understanding your needs to implementation and ongoing development.'}</p><a href="#project-contact" className="ge-button">{pt?'Vamos falar do seu projeto':'Let’s discuss your project'}<ArrowRight size={18}/></a></AnimationFadeUp><AnimationFadeUp delay={.1}><Image src="/images/home/team-get-easier.jpeg" alt={pt?'Equipa GetEasier':'GetEasier team'} width={900} height={700} priority className="rounded-2xl w-full aspect-[4/3] object-cover"/><p className="text-sm text-slate-500 mt-4">{pt?'Uma equipa próxima, do primeiro contacto à próxima versão.':'A team by your side, from the first conversation to the next release.'}</p></AnimationFadeUp></div></MaxWidthWrapper></section>
 <section className="py-14 md:py-20"><MaxWidthWrapper className="px-6 md:px-12"><h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">{pt?'O que podemos construir consigo':'What we can build with you'}</h2><div className="grid md:grid-cols-3 gap-8">{services.map(([title,text],i)=>{const Icon=icons[i];return <AnimationFadeUp key={title} delay={i*.05}><Icon className="text-blue-600 mb-5" size={28}/><h3 className="text-xl font-semibold mb-3">{title}</h3><p className="text-base leading-relaxed text-slate-600">{text}</p></AnimationFadeUp>})}</div></MaxWidthWrapper></section>
 <ProcessSection/><MaxWidthWrapper className="px-6 md:px-12"><CaseStudySection/></MaxWidthWrapper>
 <section className="bg-slate-50 py-16 md:py-24" id="project-contact"><MaxWidthWrapper className="px-6 md:px-12"><div className="grid lg:grid-cols-[.8fr_1.2fr] gap-10 items-start"><div><h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">{pt?'Que desafio tem em mãos?':'What challenge are you facing?'}</h2><p className="text-slate-600 text-lg leading-relaxed">{pt?'Não precisa de chegar com uma especificação técnica. Conte-nos como trabalha hoje e o que gostaria de melhorar.':'You don’t need a technical specification. Tell us how you work today and what you would like to improve.'}</p><p className="mt-6 text-slate-600 leading-relaxed">{pt?'Depois do contacto, conversamos sobre as necessidades, o âmbito e os próximos passos. O acompanhamento e a manutenção são definidos de acordo com cada projeto.':'After you contact us, we discuss your needs, the scope and the next steps. Support and maintenance are agreed for each project.'}</p><Link href="/#products-list" className="inline-block mt-6 text-blue-700 font-semibold">{pt?'Procura uma solução pronta a usar?':'Looking for a ready-to-use solution?'}</Link></div><ContactForm/></div></MaxWidthWrapper></section>
 </>;
}
