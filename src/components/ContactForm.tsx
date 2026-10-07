'use client';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { sendContactEmail } from '@/lib/send-email';
import Link from 'next/link';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Loader2, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
export type FormData = {name:string; email:string; message:string; interest:string; website:string};
export default function ContactForm({product}: {product?:string}) {
 const {t,language} = useLanguage(); const pt=language==='pt';
 const {register,handleSubmit,reset,formState:{errors,isSubmitting}}=useForm<FormData>({defaultValues:{interest:product ? 'demo' : 'custom'}});
 const [status,setStatus]=useState<'idle'|'success'|'error'>('idle'); const inFlight=useRef(false);
 const required=pt?'Preencha este campo.':'Please complete this field.';
 async function onSubmit(data:FormData) {
  if(inFlight.current || data.website) return;
  inFlight.current=true; setStatus('idle');
  try {
   await sendContactEmail(data, product);
   setStatus('success'); reset();
  } catch {setStatus('error');} finally {inFlight.current=false;}
 }
 return <Card className="w-full max-w-[700px] mx-auto border-slate-200 shadow-sm"><CardContent className="p-6 sm:p-8">
  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5" aria-label={pt?'Pedido de contacto':'Contact request'} aria-busy={isSubmitting}>
   <div className="grid sm:grid-cols-2 gap-5">
    <div className="space-y-2"><Label htmlFor="contact-name">{t('contact.form.name')} *</Label><Input id="contact-name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name?'name-error':undefined} {...register('name',{required,validate:v=>!!v.trim()||required,maxLength:{value:120,message:pt?'Use até 120 caracteres.':'Use up to 120 characters.'}})}/>{errors.name&&<p id="name-error" role="alert" className="text-sm text-red-700">{errors.name.message}</p>}</div>
    <div className="space-y-2"><Label htmlFor="contact-email">Email *</Label><Input id="contact-email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email?'email-error':undefined} {...register('email',{required,pattern:{value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,message:pt?'Introduza um email válido.':'Enter a valid email address.'}})}/>{errors.email&&<p id="email-error" role="alert" className="text-sm text-red-700">{errors.email.message}</p>}</div>
   </div>
   <div className="space-y-2"><Label htmlFor="contact-interest">{pt?'Em que podemos ajudar?':'How can we help?'}</Label><select id="contact-interest" {...register('interest')} className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-base"><option value="custom">{pt?'Desenvolvimento à medida':'Custom development'}</option><option value="demo">{pt?'Demonstração de produto':'Product demonstration'}{product?` — ${product}`:''}</option><option value="other">{pt?'Outro assunto':'Something else'}</option></select></div>
   <div className="space-y-2"><Label htmlFor="contact-message">{t('contact.form.message')} *</Label><Textarea id="contact-message" placeholder={t('contact.form.messagePlaceholder')} aria-invalid={!!errors.message} aria-describedby={errors.message?'message-error':undefined} className="min-h-[140px] text-base" {...register('message',{required,validate:v=>!!v.trim()||required,maxLength:{value:5000,message:pt?'Use até 5000 caracteres.':'Use up to 5000 characters.'}})}/>{errors.message&&<p id="message-error" role="alert" className="text-sm text-red-700">{errors.message.message}</p>}</div>
   <div hidden aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" tabIndex={-1} autoComplete="off" {...register('website')}/></div>
   <p className="text-sm text-slate-500">{pt?'* Campos obrigatórios. Os dados serão usados para responder ao seu pedido.':'* Required fields. Your details will be used to respond to your request.'} <Link href="/privacy-policy" className="underline underline-offset-2">{pt?'Política de privacidade':'Privacy policy'}</Link>.</p>
   <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between"><Button disabled={isSubmitting} type="submit" className="ge-button h-auto">{isSubmitting?<Loader2 className="animate-spin" size={18}/>:<ArrowRight size={18}/>} {isSubmitting?(pt?'A enviar…':'Sending…'):(pt?'Enviar pedido':'Send request')}</Button><a href="https://wa.me/351914223323" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-700">WhatsApp · +351 914 223 323</a></div>
   <div aria-live="polite" aria-atomic="true">{status==='success'&&<p className="rounded-lg bg-emerald-50 p-4 text-emerald-800">{pt?'Obrigado! Recebemos o seu pedido. Vamos analisá-lo e entrar em contacto para conversar sobre os próximos passos.':'Thank you! We received your request. We will review it and get in touch to discuss the next steps.'}</p>}{status==='error'&&<p role="alert" className="rounded-lg bg-red-50 p-4 text-red-800">{pt?'Não foi possível enviar. Os seus dados foram mantidos: tente novamente ou contacte-nos pelo WhatsApp.':'We could not send your request. Your entries have been kept: please try again or contact us on WhatsApp.'}</p>}</div>
  </form>
 </CardContent></Card>;
}
