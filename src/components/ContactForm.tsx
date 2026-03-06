'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
// import { Button } from './ui/button';
import { Button } from "@/components/ui/moving-border";
import MaxWidthWrapper from './MaxWidthWrapper';
import { Separator } from './ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { SiWhatsapp } from '@icons-pack/react-simple-icons';
import { useToast } from './ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const { t } = useLanguage();
  const { register, handleSubmit } = useForm<FormData>();
  const { toast } = useToast();

  function onSubmit(data: FormData) {
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      reply_to: data.email,
      message: data.message,
    };

    emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        toast({
          title: t('contact.form.success.title'),
          description: t('contact.form.success.description'),
        })
      }, () => {
        toast({
          title: t('contact.form.error.title'),
          description: t('contact.form.error.description'),
        })
      });
  }


  return (
    <Card className='w-full max-w-[700px] mx-auto relative'>
      <CardHeader className='px-4 sm:px-6 pb-4 sm:pb-6'>
        <CardTitle className='text-xl sm:text-2xl md:text-3xl mb-2'>{t('contact.form.title')}</CardTitle>
        <CardDescription className='text-sm sm:text-base'>
          {t('contact.form.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className='px-4 sm:px-6 pb-4 sm:pb-6'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4 sm:space-y-5'
        >
          <div className='space-y-2'>
            <Label htmlFor='name' className='text-sm sm:text-base font-medium'>{t('contact.form.name')}</Label>
            <Input
              type='text'
              placeholder={t('contact.form.namePlaceholder')}
              className='w-full h-11 sm:h-12 text-sm sm:text-base'
              {...register('name', { required: true })}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email' className='text-sm sm:text-base font-medium'>{t('contact.form.email')}</Label>
            <Input
              type='email'
              placeholder={t('contact.form.emailPlaceholder')}
              className='w-full h-11 sm:h-12 text-sm sm:text-base'
              {...register('email', { required: true })}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='message' className='text-sm sm:text-base font-medium'>{t('contact.form.message')}</Label>
            <Textarea
              placeholder={t('contact.form.messagePlaceholder')}
              className='w-full min-h-[120px] sm:min-h-[140px] text-sm sm:text-base resize-none'
              {...register('message', { required: true })}
            />
          </div>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-2'>
            <Button 
              type='submit' 
              variant="default"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] text-sm sm:text-base"
            >
              {t('contact.form.send')}
            </Button>
            <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-center sm:text-left'>
              <span className='text-xs sm:text-sm text-gray-600 dark:text-gray-400'>
                {t('contact.form.whatsapp')}
              </span>
              <a 
                href='https://wa.me/351914223323' 
                target='_blank' 
                rel='noopener noreferrer'
                className='flex items-center justify-center sm:justify-start gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base transition-colors'
              >
                <SiWhatsapp className='w-5 h-5 sm:w-6 sm:h-6' /> 
                <span>+351 914 223 323</span>
              </a>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
