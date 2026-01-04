
import Image from "next/image";
import Youtube from 'react-youtube'
import AnimationFadeRight from "@/components/animation/fade-right";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/moving-border";
import { BackgroundBeams } from "@/components/ui/background-beams";
import AnimationFadeUp from "@/components/animation/fade-up";
import ContactUsCta from "@/components/ContactUsCta";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Quote } from "lucide-react";
import ClientsCarousel from "@/components/ClientsCarousel";
import BackToTop from "@/components/BackToTop";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import PresentationVideo from "@/components/PresentationVideo";

const TESTIMONIALS = [
  {
    avatarSrc: "/images/testimonials/helder-rocha-avatar.jpeg",
    avatarFallback: "HR",
    quote:
      "Podemos considerar a GetEasier como um parceiro que agiliza o nosso dia a dia, sempre dispostos a ajudar e a melhorar. Ou seja, o Parceiro certo em qualquer empresa.",
    name: "Hélder Rocha",
    title: "Granitos do Norte, lda",
  },
  {
    avatarSrc: "/images/testimonials/diogo-silva-avatar.jpeg",
    avatarFallback: "DS",
    quote: `O WoodEasier simplifica o nosso quotidiano. Com esta aplicação, conseguimos reduzir para menos de metade o tempo que antes precisávamos para gerir todos os passaportes de madeiras tratadas. Além disso, é importante salientar a disponibilidade de toda a equipa para prestar qualquer apoio necessário.`,
    name: "Diogo Silva",
    title: "Granitos Irmãos Peixoto, lda",
  },
  {
    avatarSrc: "/images/testimonials/ds-seguros.jpeg",
    avatarFallback: "PP",
    quote: `A forma como lidaram com todo o processo fez nos ficar muito satisfeitos com o serviço e o resultado final. Ouviram as nossas ideias e foram sempre de encontro a elas e mais além.
            A geteasier torna mesmo os processo mais fáceis. Obrigado pelo vosso trabalho e dedicação`,
    name: "Paulo Pinto",
    title: "Poder Imobiliário",
  },
];


const CLIENTS_CARDS = [
  {
    image: "/images/home/clients/granitos-norte-logo.jpeg",
    alt: "Granitos do Norte, lda",
  },
  {
    image: "/images/home/clients/granitos-peixoto-logo.jpeg",
    alt: "Granitos Irmãos Peixoto, lda",
  },
  {
    image: "/images/home/clients/poder-imobiliario-logo.jpeg",
    alt: "Poder Imobiliário",
  },
  {
    image: "/images/home/clients/impernor.jpeg",
    alt: "Impernor",
  },
  {
    image: "/images/home/clients/futuro-alternativo-logo.jpeg",
    alt: "Futuro Alternativo",
  }
]


export default function Home() {
  return (
    <div className="px-0 relative z-0 " id="home" >
      <BackToTop />
      <BackgroundGradientAnimation containerClassName="-top-16" >

      </BackgroundGradientAnimation>
      <MaxWidthWrapper className="absolute inset-0 lg:top-20"  >
        <div className="mt-0 lg:mt-28 md:mt-0 flex flex-col md:grid grid-flow-col grid-cols-1 grid-rows-2 md:grid-rows-1  md:grid-cols-2 gap-0" >
          <div className="flex flex-col gap-4 items-center justify-center md:justify-start md:items-start py-16 ">
            <h1
              className="text-7xl text-shadow-lg shadow-slate-100/35 font-bold dark:text-white text-black"
            >
              <span>Simplifique </span>
              <br />
              <span>a gestão da</span>
              <br />
              <span>sua empresa</span>
            </h1>
            <p className="text-center mt-12 lg:mt-0 md:text-left text-lg text-muted-foreground dark:text-white max-w-[600px]">
              Facilitamos a gestão de processos empresariais com soluções digitais intuitivas.
              <br />
              Desde o rastreamento de materiais até à gestão de stocks, estamos aqui para simplificar a sua rotina.
            </p>
            <Button
              className="bg-white dark:bg-slate-900 font-medium text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              <ContactUsCta />
            </Button>
          </div>
          {/* <AnimationFadeRight
            delay={0.2}
            duration={0.5}
            once
            className="flex lg:justify-center lg:items-center pb-0 lg:pb-12">
            <Image src="/images/home/team-get-easier.jpeg" alt="hero image"
              className="rounded-xl object-cover object-center h-[300px] md:h-full w-full"
              width={500}
              height={500} />
          </AnimationFadeRight> */}
          <PresentationVideo />
        </div>

      </MaxWidthWrapper>
      <article className="mt-[45vh]  lg:-mt-20" id="products" >
        <MaxWidthWrapper>
          {/* <div className="w-full flex items-center justify-center">
            <PresentationVideo />
          </div> */}
          <ClientsCarousel clients={CLIENTS_CARDS} />
          <section className="w-full flex flex-col justify-center relative items-center py-16 px-8" id="about">
            <div className="w-[100vw] h-[100%] bg-[#1B80B9]/25 absolute top-0 transform  -z-1 -skew-y-3  " />
            <h3 className="text-4xl md:text-6xl text-center font-bold pb-12 relative z-10 ">
              Produtos
            </h3>
            <div className="w-full flex flex-col gap-32">
              <Carousel className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl relative h-full"
                opts={{
                  align: "center",
                  loop: true,
                }}
              >
                <CarouselContent className="h-full md:min-h-[550px]">
                  <CarouselItem
                    className="md:basis-1/2 h-full"
                  >
                    <AnimationFadeUp
                      delay={0.2}
                      duration={0.5}
                      once
                    >
                      <Card className="h-full">
                        <CardContent className="pt-5">
                          <Image
                            src="/images/products/wood-easier.jpeg"
                            alt="wood-easier"
                            width={500}
                            height={800}
                            className="object-cover object-left-top relative w-full h-full  "
                          />
                          <CardHeader>
                            <CardTitle>
                              WoodEasier
                            </CardTitle>
                            <CardDescription>
                              O WoodEasier é um software projetado para simplificar a gestão dos passaportes de madeira tratada, especialmente em indústrias que lidam com paletes e outros produtos de madeira.
                              Ele oferece recursos para rastrear a origem da madeira, verificar a conformidade com regulamentações e fichas de inspeção fitossanitária da DGAV.
                            </CardDescription>
                          </CardHeader>
                        </CardContent>
                      </Card>
                    </AnimationFadeUp>
                  </CarouselItem>
                  <CarouselItem
                    className="md:basis-1/2 h-full"
                  >
                    <AnimationFadeUp
                      delay={0.4}
                      duration={0.5}
                      once
                    >
                      <Card className="h-full min-h-[550px]">
                        <CardContent className="pt-5 h-full">
                          <Image
                            src="/images/products/stock-easier.png"
                            alt="stock-easier"
                            width={500}
                            height={800}
                            className="object-cover object-center min-h-[300px] w-full h-full"
                          />
                          <CardHeader>
                            <CardTitle>
                              StockEasier
                            </CardTitle>
                            <CardDescription>
                              O StockEasier é um software intuitivo que simplifica a gestão de stocks, permitindo um controlo eficiente dos materiais consumíveis.
                            </CardDescription>
                          </CardHeader>
                        </CardContent>
                      </Card>
                    </AnimationFadeUp>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="max-md:absolute max-md:-bottom-12 max-md:right-10 max-md:left-auto max-md:top-auto md:hidden" />
                <CarouselNext className="max-md:absolute max-md:-bottom-12 max-md:right-0 max-md:left-auto max-md:top-auto md:hidden" />
              </Carousel>
            </div>
          </section>

          <section className="w-full flex flex-col justify-center relative items-center py-16 md:pt-16" id="testimonials">
            <Image src="/images/artifacts/bg-blue-ellipse.png" alt="testimonials background"
              className="absolute -bottom-24 -right-32 z-0 opacity-40"
              width={800} height={800} objectFit="cover" />
            <h3 className="text-4xl text-center font-bold py-6  ">
              O que dizem os nossos <span className="bg-clip-text text-transparent bg-gradient-to-b from-sky-500 to-blue-900">clientes</span>
            </h3>
            <div className="h-[30rem] my-2 w-full rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden">
              <Carousel className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl relative"
                opts={{
                  align: "center",
                  loop: true,
                }}
              >
                <CarouselContent>
                  {
                    TESTIMONIALS.map((testimonial, idx) => (
                      <CarouselItem
                        key={idx}
                        className="md:basis-1/2 lg:basis-2/4 h-full"
                      >
                        <li
                          className="w-full list-none relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-200 px-8 py-6 min-h-[300px] h-[100%] "
                          style={{
                            background:
                              "linear-gradient(180deg, var(--white), var(--white)",
                          }}
                          key={testimonial.name}
                        >
                          <blockquote className="flex flex-col justify-between h-full">
                            <div
                              aria-hidden="true"
                              className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                            ></div>
                            <Quote className="w-3 h-3" />
                            <span className=" relative z-20 text-sm leading-[1.6]  font-normal">
                              {testimonial.quote}
                            </span>
                            <Quote className="w-3 h-3 transform rotate-180 self-end" />
                            <div className="relative z-20 mt-6 flex flex-row items-center gap-2">
                              <Image
                                className="flex h-16 w-16 items-center justify-center rounded-full bg-muted"
                                src={testimonial.avatarSrc}
                                alt={testimonial.name}
                                width={20}
                                height={20}
                              />
                              <span className="flex flex-col gap-1">
                                <span className=" text-sm leading-[1.6]  font-normal">
                                  {testimonial.name}
                                </span>
                                <span className=" text-sm leading-[1.6]  font-normal text-muted-foreground">
                                  {testimonial.title}
                                </span>
                              </span>
                            </div>
                          </blockquote>
                        </li>
                      </CarouselItem>
                    ))

                  }
                </CarouselContent>
                <CarouselPrevious className="max-md:absolute max-md:-bottom-10 max-md:right-20 max-md:left-auto max-md:top-auto" />
                <CarouselNext className="max-md:absolute max-md:-bottom-10 max-md:right-10 max-md:left-auto max-md:top-auto" />
              </Carousel>
              <div className="pt-16">
                <Button
                  className="bg-white dark:bg-slate-900 font-medium text-black dark:text-white border-neutral-200 dark:border-slate-800"
                >
                  <ContactUsCta />
                </Button>
              </div>
            </div>
          </section>
          <section className="w-full flex flex-col justify-center relative items-center py-16 px-8" id="about">
            <div className="w-[100vw] h-[100%] bg-[#003566] absolute top-0 transform  -z-1 -skew-y-3  " />
            <h3 className="text-4xl md:text-6xl text-center text-white font-bold py-6 relative z-10 ">
              A Equipa
            </h3>
            <div className="w-full sm:w-[70%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 py-16 px-8">
              <AnimationFadeUp
                delay={0.2}
                duration={0.5}
                once
                className="flex flex-col justify-center items-center relative overflow-hidden rounded-xl  bg-gray-50 z-0 h-[500px]"
              >
                <div className="absolute inset-0 bg-center dark:bg-black"></div>
                <div className="group relative m-0 flex h-full w-full rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg">
                  <div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                    <Image
                      src="/images/team/geteasier-1.jpeg"
                      alt="Alexandre Barreto"
                      fill
                      objectFit="cover"
                      className="object-cover object-center rounded-xl animate-fade-in block h-full w-full scale-100 transform opacity-100 transition duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                    <h1 className="text-2xl font-bold text-white shadow-xl">Alexandre Barreto</h1>
                    <h1 className="text-sm text-white shadow-xl">Desenvolvimento</h1>
                  </div>
                </div>
              </AnimationFadeUp>
              <AnimationFadeUp
                delay={0.4}
                duration={0.5}
                once
                className="flex flex-col justify-center items-center relative overflow-hidden rounded-xl  bg-gray-50 z-0 h-[500px]"
              >
                <div className="absolute inset-0 bg-center dark:bg-black"></div>
                <div className="group relative m-0 flex h-full w-full rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg">
                  <div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                    <Image
                      src="/images/team/geteasier-2.jpeg"
                      alt="product category image"
                      fill
                      objectFit="cover"
                      className="object-cover object-center rounded-xl animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                    <h1 className="text-2xl font-bold text-white shadow-xl">Nelson Luís</h1>
                    <h1 className="text-sm text-white shadow-xl">Desenvolvimento</h1>
                  </div>
                </div>
              </AnimationFadeUp>
              <AnimationFadeUp
                delay={0.6}
                duration={0.5}
                once
                className="flex flex-col justify-center items-center relative overflow-hidden rounded-xl  bg-gray-50 z-0 h-[500px]"
              >
                <div className="absolute inset-0 bg-center dark:bg-black"></div>
                <div className="group relative m-0 flex h-full w-full rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg">
                  <div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                    <Image
                      src="/images/team/geteasier-3.jpeg"
                      alt="product category image"
                      fill
                      objectFit="cover"
                      className="object-cover object-center rounded-xl animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                    <h1 className="text-2xl font-bold text-white shadow-xl">Rui Peixoto</h1>
                    <h1 className="text-sm text-white shadow-xl">Gestor de Produto</h1>
                  </div>
                </div>
              </AnimationFadeUp>
            </div>
          </section>


          <h3 className=" text-4xl md:text-6xl text-center font-bold py-6 pt-20 bg-clip-text text-transparent bg-gradient-to-b from-sky-500 to-blue-900 " id="contact">
            Contacte-nos
          </h3>
          <div className="w-full flex items-center justify-center relative py-16" >
            <BackgroundBeams />
            <AnimationFadeUp
              delay={0.2}
              duration={0.5}
              once
              className="w-full relative flex justify-center px-6">
              <ContactForm />
            </AnimationFadeUp>
          </div>
        </MaxWidthWrapper>
      </article>
    </div >
  )
}
