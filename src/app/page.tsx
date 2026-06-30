"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import ContactForm from "@/components/ContactForm";
import { BackgroundBeams } from "@/components/ui/background-beams";
import AnimationFadeUp from "@/components/animation/fade-up";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Quote, ArrowRight } from "lucide-react";
import ClientsCarousel from "@/components/ClientsCarousel";
import ProductTabsCarousel from "@/components/ProductTabsCarousel";
import ProductMockupsCarousel from "@/components/ProductMockupsCarousel";
import BackToTop from "@/components/BackToTop";
import ServicesSection from "@/components/ServicesSection";
import TeamSection from "@/components/TeamSection";
import { HeroMockup, ProductMockup } from "@/components/AppMockup";
import { useLanguage } from "@/contexts/LanguageContext";
import InstagramCarousel from "@/components/InstagramCarousel";

const TESTIMONIALS = [
  {
    avatarSrc: "/images/testimonials/helder-rocha-avatar.jpeg",
    avatarFallback: "HR",
    quote:
      "Podemos considerar a GetEasier como um parceiro que agiliza o nosso dia a dia, sempre dispostos a ajudar e a melhorar. Ou seja, o Parceiro certo em qualquer empresa.",
    name: "Hélder Rocha",
    title: "Granitos do Norte, lda",
    role: "Gestor",
    logo: "/images/home/clients/logo_gnt.jpeg",
    employees: "50-100",
  },
  {
    avatarSrc: "/images/testimonials/diogo-silva-avatar.jpeg",
    avatarFallback: "DS",
    quote: `O WoodEasier simplifica o nosso quotidiano. Com esta aplicação, conseguimos reduzir para menos de metade o tempo que antes precisávamos para gerir todos os passaportes de madeiras tratadas. Além disso, é importante salientar a disponibilidade de toda a equipa para prestar qualquer apoio necessário.`,
    name: "Diogo Silva",
    title: "Granitos Irmãos Peixoto, lda",
    role: "Gestor",
    logo: "/images/home/clients/logo_peixotos.jpeg",
    employees: "50-100",
  },
  {
    avatarSrc: "/images/testimonials/ds-seguros.jpeg",
    avatarFallback: "CM",
    quote: `Na minha ótica, a GetEasier chegou para se afirmar no mercado. Equipa super competente e que vai de encontro às necessidades e objetivos do cliente. Com o WoodEasier encurtamos o tempo dispendido na nossa metodologia de rastreabilidade das nossas madeiras.`,
    name: "Catarina Moreira",
    title: "Pardais",
    role: "Gestor",
    logo: "/images/home/clients/logo_pardais.jpeg",
    employees: "100-150",
  },
];


const CLIENTS_CARDS = [
  {
    image: "/images/home/clients/logo_gnt.jpeg",
    alt: "Granitos do Norte, lda",
  },
  {
    image: "/images/home/clients/logo_peixotos.jpeg",
    alt: "Granitos Irmãos Peixoto, lda",
  },
  {
    image: "/images/home/clients/futuro-alternativo-logo.jpeg",
    alt: "Futuro Alternativo",
  },
  {
    image: "/images/home/clients/Logo_OJP.jpeg",
    alt: "OJP",
  },
  {
    image: "/images/home/clients/logo_pardais.jpeg",
    alt: "Pardais",
  }
]

export default function Home() {
  const { t } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(0);
  const contactRef = useRef<HTMLDivElement>(null);
  const [beamsActive, setBeamsActive] = useState(false);

  // Só anima o fundo de "beams" quando a secção de contacto está perto do ecrã,
  // evitando ~50 animações SVG contínuas que tornavam o scroll menos fluido.
  useEffect(() => {
    const el = contactRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setBeamsActive(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setBeamsActive(entry.isIntersecting),
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Products with translations
  const PRODUCTS = [
    {
      name: "TimeEasier",
      slug: "time-easier",
      color: "#4285F4",
      logo: "/images/products/logos/time-easier.png",
      getTagline: () => t('products.timeEasier.tagline'),
      getDescription: () => t('products.timeEasier.description'),
      getLearnMore: () => t('products.timeEasier.learnMore')
    },
    {
      name: "ConstructionEasier",
      slug: "construction-easier",
      color: "#34A853",
      logo: "/images/products/logos/construction-easier.png",
      getTagline: () => t('products.constructionEasier.tagline'),
      getDescription: () => t('products.constructionEasier.description'),
      getLearnMore: () => t('products.constructionEasier.learnMore')
    },
    {
      name: "StockEasier",
      slug: "stock-easier",
      color: "#EA4335",
      logo: "/images/products/logos/stock-easier.png",
      getTagline: () => t('products.stockEasier.tagline'),
      getDescription: () => t('products.stockEasier.description'),
      getLearnMore: () => t('products.stockEasier.learnMore')
    },
    {
      name: "WoodEasier",
      slug: "wood-easier",
      color: "#D4A574",
      logo: "/images/products/logos/wood-easier.png",
      getTagline: () => t('products.woodEasier.tagline'),
      getDescription: () => t('products.woodEasier.description'),
      getLearnMore: () => t('products.woodEasier.learnMore')
    }
  ];

  // Instagram posts - Update with real Instagram post URLs
  // To get Instagram post image URLs:
  // 1. Open Instagram post in browser
  // 2. Right-click on image > "Copy image address" or inspect element to get image URL
  // 3. Replace the imageUrl and link below with actual values
  // Instagram posts - Update with real Instagram post URLs
  // To get Instagram post image URLs:
  // 1. Open Instagram post in browser
  // 2. Right-click on image > "Copy image address" or inspect element to get image URL
  // 3. Replace the imageUrl and link below with actual values
  const INSTAGRAM_POSTS = [
    {
      id: '1',
      imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="500" fill="%23f3f4f6"/%3E', // Placeholder até a API carregar
      caption: 'GetEasier Instagram post',
      link: 'https://www.instagram.com/geteasier.pt/',
      likes: 42,
      comments: 5
    },
    {
      id: '2',
      imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="500" fill="%23f3f4f6"/%3E', // Placeholder até a API carregar
      caption: 'GetEasier Instagram post',
      link: 'https://www.instagram.com/geteasier.pt/',
      likes: 38,
      comments: 3
    },
    {
      id: '3',
      imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="500" fill="%23f3f4f6"/%3E', // Placeholder até a API carregar
      caption: 'GetEasier Instagram post',
      link: 'https://www.instagram.com/geteasier.pt/',
      likes: 55,
      comments: 8
    },
    {
      id: '4',
      imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="500" fill="%23f3f4f6"/%3E', // Placeholder até a API carregar
      caption: 'GetEasier Instagram post',
      link: 'https://www.instagram.com/geteasier.pt/',
      likes: 29,
      comments: 2
    },
    {
      id: '5',
      imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="500" fill="%23f3f4f6"/%3E', // Placeholder até a API carregar
      caption: 'GetEasier Instagram post',
      link: 'https://www.instagram.com/geteasier.pt/',
      likes: 67,
      comments: 12
    },
    {
      id: '6',
      imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="500" fill="%23f3f4f6"/%3E', // Placeholder até a API carregar
      caption: 'GetEasier Instagram post',
      link: 'https://www.instagram.com/geteasier.pt/',
      likes: 44,
      comments: 6
    },
    {
      id: '7',
      imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="500" fill="%23f3f4f6"/%3E', // Placeholder até a API carregar
      caption: 'GetEasier Instagram post',
      link: 'https://www.instagram.com/geteasier.pt/',
      likes: 51,
      comments: 7
    },
    {
      id: '8',
      imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="500" fill="%23f3f4f6"/%3E', // Placeholder até a API carregar
      caption: 'GetEasier Instagram post',
      link: 'https://www.instagram.com/geteasier.pt/',
      likes: 33,
      comments: 4
    },
  ];

  return (
    <div className="px-0 relative z-0 bg-white" id="home">
      <BackToTop />
      
      {/* Hero Section - Texto + Mockup */}
      <section className="relative flex items-center pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden" style={{
        background: 'linear-gradient(to bottom, rgb(191, 219, 254) 0%, rgb(219, 234, 254) 5rem, rgb(255, 255, 255) 100%)'
      }}>
        {/* Padrão de grelha subtil */}
        <div
          className="absolute inset-0 bg-grid-blue-700/[0.04] pointer-events-none"
          style={{
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 35%, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 35%, black 30%, transparent 75%)',
          }}
        />
        <MaxWidthWrapper className="relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center px-4 md:px-0">

            {/* Conteúdo */}
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">

              <AnimationFadeUp delay={0.1} duration={0.6} once>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight">
                  <span className="block text-gray-900 mb-2">{t('hero.title')}</span>
                  <span className="block bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                    {t('hero.titleHighlight')}
                  </span>
                </h1>
              </AnimationFadeUp>

              <AnimationFadeUp delay={0.2} duration={0.6} once>
                <div className="space-y-4 max-w-xl mx-auto lg:mx-0">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    {t('hero.description1')}
                  </p>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    {t('hero.description2')}
                  </p>
                </div>
              </AnimationFadeUp>

              <AnimationFadeUp delay={0.3} duration={0.6} once>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 md:gap-4 pt-2">
                  <ScrollLink
                    to="contact"
                    smooth
                    offset={-80}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold text-base shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                  >
                    {t('hero.ctaPrimary')}
                    <ArrowRight className="w-4 h-4" />
                  </ScrollLink>
                  <ScrollLink
                    to="products-list"
                    smooth
                    offset={-80}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-white text-gray-800 font-semibold text-base border border-gray-200 shadow-sm hover:border-blue-300 hover:text-blue-700 hover:shadow-md transition-all duration-200 cursor-pointer"
                  >
                    {t('hero.ctaSecondary')}
                  </ScrollLink>
                </div>
              </AnimationFadeUp>
            </div>

            {/* Mockup visual */}
            <AnimationFadeUp delay={0.35} duration={0.7} once className="relative px-6 sm:px-10 lg:px-0 lg:pl-4 pt-4 lg:pt-0">
              <HeroMockup />
            </AnimationFadeUp>
          </div>
      </MaxWidthWrapper>
      </section>

      <article className="relative -mt-0 md:-mt-0 bg-white" id="products">
        <MaxWidthWrapper>
          {/* <div className="w-full flex items-center justify-center">
            <PresentationVideo />
          </div> */}
          <ClientsCarousel clients={CLIENTS_CARDS} />
        </MaxWidthWrapper>

        {/* O que fazemos - desenvolvimento à medida, produtos próprios e suporte */}
        <ServicesSection />
        <div className="w-full relative" style={{ overflow: 'visible' }}>
          {/* Background with smooth gradient - no diagonal shapes */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 pointer-events-none" style={{ overflow: 'visible' }}></div>
          {/* Background decorative shapes - subtle */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none transform-gpu will-change-transform"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gray-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none transform-gpu will-change-transform"></div>
          
          <div style={{ overflow: 'visible' }}>
            <MaxWidthWrapper className="relative z-10">
              <section className="w-full flex flex-col justify-center relative items-center py-16 md:py-20 px-4 md:px-8" id="products-list">
            {/* Header */}
            <div className="w-full max-w-7xl mb-0 md:mb-2 text-center">
              <h3 className="text-3xl md:text-5xl font-bold mb-3 text-gray-900 tracking-tight">
                {t('products.title')}
              </h3>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                {t('products.subtitle')}
              </p>
            </div>
            
            {/* Navegação de produtos — botões; swipe horizontal em mobile */}
            <div className="w-full max-w-7xl mb-6 md:mb-8">
              <ProductTabsCarousel
                products={PRODUCTS.map((p) => ({ name: p.name, logo: p.logo, color: p.color }))}
                selectedIndex={selectedProduct}
                onSelect={setSelectedProduct}
                ariaLabel={t('products.title')}
              />
            </div>

            {/* Product Content - Mobile First Design */}
            <div className="w-full max-w-7xl relative">
              {/* Mobile / tablet — mockups deslizáveis */}
              <div className="lg:hidden mb-6 md:mb-8">
                <ProductMockupsCarousel
                  products={PRODUCTS.map((p) => ({ name: p.name, color: p.color }))}
                  selectedIndex={selectedProduct}
                  onSelect={setSelectedProduct}
                />
              </div>

              {PRODUCTS.map((product, index) => (
                <div
                  key={product.name}
                  id={`product-panel-${index}`}
                  role="tabpanel"
                  aria-labelledby={`product-tab-${index}`}
                  hidden={selectedProduct !== index}
                  className={selectedProduct === index ? 'block' : 'hidden'}
                >
                  {/* Mobile Layout: Stacked */}
                  <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
                    
                    {/* Visual Card — só desktop; no mobile usa o carrossel acima */}
                    <div className="hidden lg:block relative h-[450px] rounded-2xl overflow-hidden order-last">
                      <div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background: `linear-gradient(135deg, ${product.color}1f 0%, ${product.color}0a 100%)`
                        }}
                      />
                      <ProductMockup name={product.name} color={product.color} className="relative z-10" />
                    </div>

                    {/* Text Content - Optimized for Reading */}
                    <div className="space-y-5 md:space-y-6 lg:space-y-8 flex flex-col justify-center order-first lg:order-none">
                      {/* Tagline - Impactful */}
                      <div>
                        <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.2] mb-4 md:mb-6">
                          {product.getTagline()}
                        </h4>
                      </div>

                      {/* Description - Optimized for mobile reading */}
                      <div className="space-y-4">
                        {product.getDescription().includes('. ') ? (
                          product.getDescription().split('. ').filter(s => s.trim().length > 0).map((sentence, idx, arr) => (
                            <p key={idx} className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                              {sentence.trim()}{idx < arr.length - 1 ? '.' : ''}
                            </p>
                          ))
                        ) : (
                          <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                            {product.getDescription()}
                          </p>
                        )}
                      </div>

                      {/* CTA - Prominent and Touch-Friendly with Product Color */}
                      <div className="pt-2">
                        <Link
                          href={`/${product.slug}`}
                          className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3.5 md:px-8 md:py-4 text-white font-semibold text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group active:scale-95"
                          style={{
                            background: `linear-gradient(to right, ${product.color}, ${product.color}dd, ${product.color})`,
                            boxShadow: `0 10px 15px -3px rgba(${(() => {
                              const hex = product.color.replace('#', '');
                              const r = parseInt(hex.substr(0, 2), 16);
                              const g = parseInt(hex.substr(2, 2), 16);
                              const b = parseInt(hex.substr(4, 2), 16);
                              return `${r}, ${g}, ${b}`;
                            })()}, 0.3), 0 4px 6px -2px rgba(${(() => {
                              const hex = product.color.replace('#', '');
                              const r = parseInt(hex.substr(0, 2), 16);
                              const g = parseInt(hex.substr(2, 2), 16);
                              const b = parseInt(hex.substr(4, 2), 16);
                              return `${r}, ${g}, ${b}`;
                            })()}, 0.2)`
                          }}
                          onMouseEnter={(e) => {
                            const hex = product.color.replace('#', '');
                            const r = parseInt(hex.substr(0, 2), 16);
                            const g = parseInt(hex.substr(2, 2), 16);
                            const b = parseInt(hex.substr(4, 2), 16);
                            e.currentTarget.style.background = `linear-gradient(to right, ${product.color}dd, ${product.color}cc, ${product.color}dd)`;
                            e.currentTarget.style.boxShadow = `0 20px 25px -5px rgba(${r}, ${g}, ${b}, 0.4), 0 10px 10px -5px rgba(${r}, ${g}, ${b}, 0.3)`;
                          }}
                          onMouseLeave={(e) => {
                            const hex = product.color.replace('#', '');
                            const r = parseInt(hex.substr(0, 2), 16);
                            const g = parseInt(hex.substr(2, 2), 16);
                            const b = parseInt(hex.substr(4, 2), 16);
                            e.currentTarget.style.background = `linear-gradient(to right, ${product.color}, ${product.color}dd, ${product.color})`;
                            e.currentTarget.style.boxShadow = `0 10px 15px -3px rgba(${r}, ${g}, ${b}, 0.3), 0 4px 6px -2px rgba(${r}, ${g}, ${b}, 0.2)`;
                          }}
                        >
                          <span>{product.getLearnMore()}</span>
                          <svg className="w-5 h-5 md:w-6 md:h-6 ml-2 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
            </MaxWidthWrapper>
          </div>
        </div>

        <div className="w-full bg-white relative z-10">
          <MaxWidthWrapper>
            <section className="w-full flex flex-col justify-center relative items-center py-16 md:py-20" id="testimonials">
            <Image src="/images/artifacts/bg-blue-ellipse.png" alt="testimonials background"
              className="absolute -bottom-24 -right-32 z-0 opacity-40"
              width={800} height={800} style={{ objectFit: 'cover', height: 'auto' }} />
            <div className="text-center relative z-10">
              <h3 className="text-3xl md:text-5xl font-bold mb-3 text-gray-900 tracking-tight">
                {t('testimonials.title')}
              </h3>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                {t('testimonials.subtitle')}
              </p>
            </div>
            <div className="min-h-[35rem] my-4 w-full rounded-md flex flex-col antialiased items-center justify-center relative overflow-visible">
              <Carousel 
                className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl relative"
                setApi={setApi}
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
                          className="w-full list-none relative rounded-2xl border flex-shrink-0 border-gray-200 px-5 py-5 h-[300px] bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
                          key={testimonial.name}
                        >
                          <blockquote className="flex flex-col justify-between h-full">
                            {/* Top Section - Quote */}
                            <div className="flex flex-col flex-1 min-h-0">
                              <Quote className="w-5 h-5 mb-2 text-blue-400 flex-shrink-0" />
                              <p className="text-sm text-gray-700 leading-relaxed overflow-hidden">
                              {testimonial.quote}
                              </p>
                            </div>

                            {/* Bottom Section - Author and Company Info */}
                            <div className="mt-auto pt-3 border-t border-gray-200 flex flex-col md:flex-row gap-3 items-start md:items-center justify-between flex-shrink-0">
                              {/* Left - Author Info with Company Logo */}
                              <div className="flex items-center gap-4">
                                {/* Company Logo */}
                                {testimonial.logo && (
                                  <div className="flex items-center justify-center h-14 w-14 flex-shrink-0">
                              <Image
                                      src={testimonial.logo}
                                      alt={testimonial.title}
                                      width={56}
                                      height={56}
                                      className="object-contain max-h-14 max-w-14"
                                    />
                                  </div>
                                )}
                                
                                {/* Author Details */}
                                <div className="flex flex-col">
                                  <span className="text-sm font-semibold text-gray-900">
                                  {testimonial.name}
                                  </span>
                                  <span className="text-xs text-gray-400 mt-1">
                                    {testimonial.title}
                                  </span>
                                </div>
                              </div>

                              {/* Right - Company Size */}
                              <div className="flex flex-col gap-1 text-right">
                                <span className="text-xs text-gray-500 uppercase tracking-wide">
                                  {t('testimonials.companySize')}
                                </span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {testimonial.employees || "N/A"} {t('testimonials.employees')}
                                </span>
                              </div>
                            </div>
                          </blockquote>
                        </li>
                      </CarouselItem>
                    ))

                  }
                </CarouselContent>
                <CarouselPrevious className="max-md:absolute max-md:-bottom-16 max-md:right-20 max-md:left-auto max-md:top-auto" />
                <CarouselNext className="max-md:absolute max-md:-bottom-16 max-md:right-10 max-md:left-auto max-md:top-auto" />
              </Carousel>
              <div className="pt-12 md:pt-16">
                <ScrollLink
                  to="contact"
                  smooth
                  offset={-80}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold text-base shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  {t('nav.contact')}
                  <ArrowRight className="w-4 h-4" />
                </ScrollLink>
              </div>
            </div>
          </section>
          <TeamSection />
          </MaxWidthWrapper>
        </div>

        {/* Instagram Carousel */}
        <InstagramCarousel initialPosts={INSTAGRAM_POSTS} />

        <div className="w-full bg-gray-50 relative z-0 py-16 md:py-20">
          <MaxWidthWrapper>
            <div className="text-center mb-6 md:mb-8 px-4" id="contact">
              <h3 className="text-3xl md:text-5xl font-bold mb-3 text-gray-900 tracking-tight">
                {t('contact.title')}
              </h3>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                {t('contact.subtitle')}
              </p>
            </div>
            <div ref={contactRef} className="w-full flex items-center justify-center relative py-6">
            {beamsActive && <BackgroundBeams />}
            <AnimationFadeUp
              delay={0.2}
              duration={0.5}
              once
                className="w-full relative flex justify-center px-6 z-10">
              <ContactForm />
            </AnimationFadeUp>
          </div>
        </MaxWidthWrapper>
        </div>
      </article>
    </div >
  )
}
