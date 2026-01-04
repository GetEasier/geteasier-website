"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import AnimationFadeUp from "@/components/animation/fade-up";
import TypeWriterText from "@/components/animation/typewriter-text";
import { Button, buttonVariants } from "@/components/ui/button";
import useScrollProgress from "@/hooks/useScrollProgress";
import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  const { scrollRef, scrollProgress } = useScrollProgress();
  return (
    <>
      <div className="bg-hero-gradient absolute w-screen z-0 h-[800px] -translate-y-20 rounded-bl-[80px]" >
        <div className="absolute bottom-0 right-0 z-1 w-[50%] h-[80%]  ">
          <Image
            className="rounded-tl-[60px] hidden sm:block"
            src="/images/home/hero-home.jpg"
            alt="hero"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <MaxWidthWrapper>
        <div className="py-56 text-center flex flex-col justify-center  items-center max-w-full sm:text-left sm:items-left sm:max-w-lg sm:justify-start">
          <AnimationFadeUp
            once
            delay={0}
            duration={0.3}
          >
            <h1 className="text-4xl font-bold tracking-tight text-muted sm:text-6xl  ">
              Acelere o  <span className="text-primary">crescimento</span>{' '}
              do seu negócio.
            </h1>
          </AnimationFadeUp>
          <AnimationFadeUp
            once
            delay={0.1}
            duration={0.3}
          >
            <p className="mt-6 text-lg max-w-prose text-muted">
              Tecnologia de ponta para atingir os  objetivos do seu negócio mais rápido.
            </p>
          </AnimationFadeUp>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-start sm:w-full gap-4 mt-6">
            <AnimationFadeUp
              once
              delay={0.2}
              duration={0.3}
            >
              <Link
                href="/products"
                className={buttonVariants({ size: 'xl' })}>
                Começa agora
              </Link>
            </AnimationFadeUp>
            <AnimationFadeUp
              once
              delay={0.3}
              duration={0.3}
            >
              <Link
                href="/products"
                className={buttonVariants({ size: 'xl', variant: 'secondary' })}>
                Como funciona
              </Link>
            </AnimationFadeUp>
          </div>
        </div>

        <section className="pt-2" ref={scrollRef}>
          <h2 className="text-5xl font-bold text-center w-full flex-col flex justify-center items-center gap-2 lg:flex-row">
            <span>Inovação Digital para o</span>
            <TypeWriterText
              baseText="Sucesso"
            />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12">
            <div className="relative  overflow-hidden h-[450px] group-hover:opacity-75">
              <Image
                src="/images/home/strategy.jpg"
                alt="product category image"
                fill
                objectFit="cover"
                className="object-cover object-center"
                style={{ transform: `translateY(-${scrollProgress * 100}px)` }}
              />
            </div>
            <div className="flex flex-col justify-center items-start">
              <h3 className="text-4xl font-bold pb-6 ">Descubra a diferença</h3>
              <p className="mt-4 text-lg pb-8 text-muted-foreground">
                Somos uma equipa apaixonada pela criação de soluções digitais inovadoras que impulsionam o sucesso do seu negócio.
                Combinamos tecnologia de ponta com uma pitada de criatividade para ajudar empresas de todos os tamanhos a alcançar os seus objetivos.
              </p>
              <p className="mt-4 text-lg pb-8 text-muted-foreground">
                Explore as infinitas possibilidades conosco.
              </p>
              <Link
                href="/products"
                className={buttonVariants({ size: 'sm', variant: 'link' })}>
                Saiba mais
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="pt-32">
          <h2 className="text-4xl font-bold text-center w-full flex justify-center items-center gap-2 pb-16">
            Transforme seu Negócio com Software de Alto Desempenho
          </h2>
          <div className="flex justify-center items-center sm:align-bottom sm:justify-evenly sm:items-baseline flex-col sm:flex-row gap-8 sm:gap-2 pt-12">
            <AnimationFadeUp
              once
              delay={0.1}
              duration={0.5}
              className="flex flex-col justify-center items-center w-full sm:w-unset sm:items-start"
            >
              <Image
                className="rounded-3xl object-cover object-center"
                src="/images/home/development.jpeg"
                alt="product category image"
                width={250}
                height={350}
                objectFit="cover"
              />
              <h3 className="text-xl font-bold pt-2 ">Desenvolvimento de Software</h3>
            </AnimationFadeUp>
            <AnimationFadeUp
              once
              delay={0.2}
              duration={0.5}
              className="flex flex-col justify-center items-center w-full sm:w-unset sm:items-start"
            >
              <Image
                className="rounded-3xl object-cover object-center"
                src="/images/home/consulting.jpeg"
                alt="product category image"
                width={250}
                height={350}
                objectFit="cover"
              />
              <h3 className="text-xl font-bold pt-2 ">Consultoria</h3>
            </AnimationFadeUp>
            <AnimationFadeUp
              once
              delay={0.3}
              duration={0.5}
              className="flex flex-col justify-center items-center w-full sm:w-unset sm:items-start sm:max-w-[200px]"
            >
              <Image
                className="rounded-3xl  object-center"
                src="/images/home/strategy.webp"
                alt="product category image"
                width={250}
                height={150}
                objectFit="cover"
                objectPosition="center"
              />
              <h3 className="text-xl font-bold pt-2 ">Estratégia Digital</h3>
            </AnimationFadeUp>
          </div>
        </section>



      </MaxWidthWrapper>
    </>
  );
}
