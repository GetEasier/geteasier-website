'use client';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimationFadeUp from './animation/fade-up';
import MaxWidthWrapper from './MaxWidthWrapper';

export function ProcessSection() {
  const {language} = useLanguage();
  const pt = language === 'pt';
  const steps = pt ? [
    ['Perceber', 'Começamos pelo seu processo, pelas pessoas que o utilizam e pelo que precisa de mudar.'],
    ['Desenhar', 'Definimos a solução, as prioridades e o âmbito do projeto consigo.'],
    ['Desenvolver', 'Construímos e validamos a solução consigo, para ajustar o que for necessário.'],
    ['Acompanhar', 'Apoiamos a implementação e a evolução do software à medida que o negócio cresce.'],
  ] : [
    ['Understand', 'We start with your process, the people using it and what needs to change.'],
    ['Design', 'Together, we define the solution, priorities and project scope.'],
    ['Build', 'We build and validate the solution with you, making adjustments along the way.'],
    ['Support', 'We support implementation and software evolution as your business grows.'],
  ];
  return <section className="bg-slate-950 text-white py-16 md:py-24" id="process">
    <MaxWidthWrapper className="px-6 md:px-12">
      <AnimationFadeUp><div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div><p className="text-blue-300 text-sm font-semibold mb-3">{pt ? 'COMO TRABALHAMOS' : 'HOW WE WORK'}</p><h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-lg">{pt ? 'Próximos da sua equipa. Em cada etapa.' : 'Close to your team. At every stage.'}</h2></div>
        <Link href="/desenvolvimento-a-medida" className="text-blue-200 inline-flex gap-2 items-center font-medium">{pt ? 'Conhecer o nosso serviço' : 'Explore our service'}<ArrowUpRight size={20}/></Link>
      </div></AnimationFadeUp>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">{steps.map(([title, description], i) => <AnimationFadeUp key={title} delay={i * .05}><div className="border-t border-slate-700 pt-6"><span className="text-blue-300 text-sm font-mono">0{i+1}</span><h3 className="text-xl font-semibold mt-4 mb-3">{title}</h3><p className="text-slate-300 leading-relaxed text-base">{description}</p></div></AnimationFadeUp>)}</div>
    </MaxWidthWrapper>
  </section>;
}
export function CaseStudySection() {
 const {language} = useLanguage(); const pt = language === 'pt';
 return <section className="py-14 md:py-20" id="case-study"><AnimationFadeUp><div className="grid md:grid-cols-[.85fr_1.15fr] rounded-3xl overflow-hidden border border-blue-100 bg-blue-50/50">
   <div className="bg-blue-700 text-white p-8 md:p-12 flex flex-col justify-center"><p className="text-blue-100 text-sm font-semibold mb-8">{pt ? 'DESENVOLVIMENTO À MEDIDA · NA PRÁTICA' : 'CUSTOM DEVELOPMENT · IN PRACTICE'}</p><p className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">{pt ? 'Processos mais simples. Equipas mais eficazes.' : 'Simpler processes. More effective teams.'}</p><p className="mt-5 text-blue-100 leading-relaxed">{pt ? 'É esse o resultado que procuramos em cada solução que desenvolvemos.' : 'That is the result we look for in every solution we build.'}</p></div>
   <div className="p-8 md:p-12"><p className="text-sm text-blue-700 font-semibold mb-3">{pt ? 'O nosso compromisso' : 'Our commitment'}</p><h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">{pt ? 'Tecnologia que acompanha a forma como a sua empresa trabalha.' : 'Technology that fits the way your business works.'}</h2>
   <p className="text-slate-600 leading-relaxed mb-4">{pt ? 'Começamos por compreender o trabalho real: onde se perde tempo, onde surgem erros e que informação falta no momento de decidir.' : 'We start by understanding the real work: where time is lost, where errors happen and what information is missing when decisions are made.'}</p>
   <p className="text-slate-600 leading-relaxed mb-6">{pt ? 'Depois construímos uma solução clara, testada com a sua equipa e preparada para evoluir consigo.' : 'Then we build a clear solution, tested with your team and ready to evolve with you.'}</p>
   <Link href="/desenvolvimento-a-medida" className="font-semibold text-blue-700 inline-flex gap-2 items-center">{pt ? 'Conhecer o desenvolvimento à medida' : 'Explore custom development'}<ArrowRight size={18}/></Link></div>
 </div></AnimationFadeUp></section>;
}
