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

export type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
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
          title: "Email enviado com sucesso",
          description: "Obrigado por entrar em contacto connosco.",
        })
      }, () => {
        toast({
          title: "Erro ao enviar email",
          description: "Por favor tente novamente mais tarde.",
        })
      });
  }


  return (
    // <MaxWidthWrapper className='flex justify-center'>
    <Card className='w-[700px] relative'>
      <CardHeader>
        <CardTitle>Vamos falar</CardTitle>
        <CardDescription >
          Preencha o formulário e entraremos em contacto consigo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='mb-5 space-y-3'>
            <Label htmlFor='name'>Nome</Label>
            <Input
              type='text'
              placeholder='Nome'
              {...register('name', { required: true })}
            />
          </div>
          <div className='mb-5 space-y-3'>
            <Label htmlFor='email'>Email</Label>
            <Input
              type='email'
              placeholder='exemplo@domain.com'
              {...register('email', { required: true })}
            />
          </div>
          <div className='mb-5 space-y-3'>
            <Label htmlFor='message'>Mensagem</Label>
            <Textarea
              placeholder='Escreva aqui a sua mensagem'
              {...register('message', { required: true })}
            />
          </div>
          <div className='flex justify-between items-center gap-4'>
            <Button type='submit' variant="default"
              className="bg-white dark:bg-slate-900 font-medium text-black dark:text-white border-neutral-200 dark:border-slate-800" >
              Enviar
            </Button>
            {/* <Button type='submit' variant='default'>Enviar</Button> */}
            <span className='text-sm text-neutral-500 dark:text-neutral-400'>
              Ou contacte-nos através do WhatsApp
              <span className='flex gap-2 items-center'><SiWhatsapp className='w-6 h-6' /> +351 914 223 323 </span>
            </span>
          </div>
        </form>
      </CardContent>
    </Card>
    // </MaxWidthWrapper >
  );
};
