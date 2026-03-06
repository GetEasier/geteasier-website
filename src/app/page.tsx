"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/moving-border";
import { BackgroundBeams } from "@/components/ui/background-beams";
import AnimationFadeUp from "@/components/animation/fade-up";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Quote, ChevronDown } from "lucide-react";
import ClientsCarousel from "@/components/ClientsCarousel";
import BackToTop from "@/components/BackToTop";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    avatarFallback: "PP",
    quote: `A forma como lidaram com todo o processo fez nos ficar muito satisfeitos com o serviço e o resultado final. Ouviram as nossas ideias e foram sempre de encontro a elas e mais além.
            A geteasier torna mesmo os processo mais fáceis. Obrigado pelo vosso trabalho e dedicação`,
    name: "Paulo Pinto",
    title: "Poder Imobiliário",
    role: "Gestor",
    logo: "/images/home/clients/poder-imobiliario-logo.jpeg",
    employees: "1-10",
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

interface ProductCardProps {
  name: string;
  color: string;
  description: string;
  tagline: string;
}

function ProductCard({ name, color, description, tagline }: ProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="group h-full cursor-pointer transition-all duration-500 ease-out"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
        {/* Image/Logo Section */}
        <div 
          className="relative w-full h-[240px] flex items-center justify-center transition-all duration-500 group-hover:scale-105"
          style={{ 
            background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span 
            className={`font-bold relative z-10 transition-all duration-500 group-hover:scale-110 ${
              name === "ConstructionEasier" ? "text-2xl md:text-3xl" : "text-4xl"
            }`} 
            style={{ color }}
          >
            {name}
          </span>
        </div>

        {/* Content Section */}
        <div className="p-2">
          <div className="flex items-start justify-between mb-1">
            <p className="text-sm text-gray-700 leading-relaxed pr-2 flex-1">
              {tagline}
            </p>
            <div 
              className="p-2 rounded-full transition-all duration-300 group-hover:bg-gray-50 flex-shrink-0"
              style={{ 
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            >
              <ChevronDown 
                className="w-5 h-5 transition-colors duration-300"
                style={{ color }}
              />
            </div>
          </div>
          
          <div 
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isExpanded ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="text-sm text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(0);

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
      getTagline: () => t('products.timeEasier.tagline'),
      getDescription: () => t('products.timeEasier.description'),
      getLearnMore: () => t('products.timeEasier.learnMore')
    },
    {
      name: "ConstructionEasier",
      slug: "construction-easier",
      color: "#34A853",
      getTagline: () => t('products.constructionEasier.tagline'),
      getDescription: () => t('products.constructionEasier.description'),
      getLearnMore: () => t('products.constructionEasier.learnMore')
    },
    {
      name: "StockEasier",
      slug: "stock-easier",
      color: "#EA4335",
      getTagline: () => t('products.stockEasier.tagline'),
      getDescription: () => t('products.stockEasier.description'),
      getLearnMore: () => t('products.stockEasier.learnMore')
    },
    {
      name: "WoodEasier",
      slug: "wood-easier",
      color: "#D4A574",
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
      imageUrl: 'https://via.placeholder.com/500', // Replace with actual Instagram image URL
      caption: 'GetEasier Instagram post',
      link: 'https://www.instagram.com/geteasier.pt/',
      likes: 42,
      comments: 5
    },
    {
      id: '2',
      imageUrl: 'https://via.placeholder.com/500', // Replace with actual Instagram image URL
      caption: 'GetEasier Instagram post',
      link: 'https://www.instagram.com/geteasier.pt/',
      likes: 38,
      comments: 3
    },
    {
      id: '3',
      imageUrl: 'https://via.placeholder.com/500', // Replace with actual Instagram image URL
      caption: 'GetEasier Instagram post',
      link: 'https://www.instagram.com/geteasier.pt/',
      likes: 55,
      comments: 8
    },
    {
      id: '4',
      imageUrl: 'https://via.placeholder.com/500', // Replace with actual Instagram image URL
      caption: 'GetEasier Instagram post',
      link: 'https://www.instagram.com/geteasier.pt/',
      likes: 29,
      comments: 2
    },
    {
      id: '5',
      imageUrl: 'https://via.placeholder.com/500', // Replace with actual Instagram image URL
      caption: 'GetEasier Instagram post',
      link: 'https://www.instagram.com/geteasier.pt/',
      likes: 67,
      comments: 12
    },
    {
      id: '6',
      imageUrl: 'https://via.placeholder.com/500', // Replace with actual Instagram image URL
      caption: 'GetEasier Instagram post',
      link: 'https://www.instagram.com/geteasier.pt/',
      likes: 44,
      comments: 6
    },
    {
      id: '7',
      imageUrl: 'https://via.placeholder.com/500', // Replace with actual Instagram image URL
      caption: 'GetEasier Instagram post',
      link: 'https://www.instagram.com/geteasier.pt/',
      likes: 51,
      comments: 7
    },
    {
      id: '8',
      imageUrl: 'https://via.placeholder.com/500', // Replace with actual Instagram image URL
      caption: 'GetEasier Instagram post',
      link: 'https://www.instagram.com/geteasier.pt/',
      likes: 33,
      comments: 4
    },
  ];

  return (
    <div className="px-0 relative z-0 bg-white" id="home">
      <BackToTop />
      
      {/* Hero Section - Centralizado */}
      <section className="relative min-h-[60vh] flex items-center pt-28 md:pt-32 pb-20 md:pb-24" style={{
        background: 'linear-gradient(to bottom, rgb(191, 219, 254) 0%, rgb(219, 234, 254) 5rem, rgb(255, 255, 255) 100%)'
      }}>
        <MaxWidthWrapper className="relative z-10 w-full">
          <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
            
            {/* Conteúdo - Centralizado */}
            <div className="space-y-6 md:space-y-8">
              <AnimationFadeUp delay={0.1} duration={0.6} once>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                  <span className="block text-gray-900 mb-2">{t('hero.title')}</span>
                  <span className="block bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                    {t('hero.titleHighlight')}
                  </span>
            </h1>
              </AnimationFadeUp>
              
              <AnimationFadeUp delay={0.2} duration={0.6} once>
                <div className="space-y-4 text-center max-w-3xl mx-auto">
                  <p className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed">
                    {t('hero.description1')}
                  </p>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    {t('hero.description2')}
                  </p>
                </div>
              </AnimationFadeUp>

              <AnimationFadeUp delay={0.4} duration={0.6} once>
                <div className="flex flex-col items-center gap-4 pt-4 max-w-lg mx-auto w-full">
                  {!newsletterSubmitted ? (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        // Aqui pode adicionar a lógica para enviar o email para a newsletter
                        console.log("Newsletter email:", newsletterEmail);
                        setNewsletterSubmitted(true);
                        setNewsletterEmail("");
                      }}
                      className="w-full relative group"
                    >
                      <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-200/50 p-1 sm:p-1.5 hover:shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                        <input
                          type="email"
                          placeholder={t('hero.newsletterPlaceholder')}
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          required
                          className="flex-1 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base bg-transparent border-none outline-none text-gray-700 placeholder:text-gray-400"
                        />
                        <button
                          type="submit"
                          className="px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 whitespace-nowrap hover:scale-105"
                        >
                          {t('hero.newsletterButton')}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="w-full text-center p-5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl shadow-sm">
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-green-700 font-semibold">{t('hero.newsletterSuccess')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </AnimationFadeUp>
            </div>
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
        <div className="w-full relative" style={{ overflow: 'visible' }}>
          {/* Background with smooth gradient - no diagonal shapes */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50" style={{ overflow: 'visible' }}></div>
          {/* Background decorative shapes - subtle */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gray-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
          
          <div style={{ overflow: 'visible' }}>
            <MaxWidthWrapper className="relative z-10">
              <section className="w-full flex flex-col justify-center relative items-center py-12 md:py-20 px-4 md:px-8" id="about" style={{ overflow: 'visible', paddingBottom: '4rem' }}>
            {/* Header */}
            <div className="w-full max-w-7xl mb-0 md:mb-2 text-center">
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-0 md:mb-2 text-gray-900">
                {t('products.title')}
            </h3>
            </div>
            
            {/* Navigation Tabs - Desktop Optimized */}
            <div className="w-full max-w-7xl mb-0 relative" style={{ overflow: 'visible', paddingTop: '3rem', paddingBottom: '1rem' }}>
              <div className="flex overflow-x-auto scrollbar-hide gap-3 md:gap-4 pb-3 md:pb-0 px-2 md:px-4 md:justify-center relative z-20" style={{ overflowY: 'visible', overflowX: 'auto' }}>
                {PRODUCTS.map((product, index) => {
                  // Convert hex to RGB for opacity
                  const hexToRgb = (hex: string) => {
                    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                    return result ? {
                      r: parseInt(result[1], 16),
                      g: parseInt(result[2], 16),
                      b: parseInt(result[3], 16)
                    } : null;
                  };
                  const rgb = hexToRgb(product.color);
                  const colorRgb = rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : '66, 133, 244';
                  
                  return (
                    <button
                      key={product.name}
                      onClick={() => setSelectedProduct(index)}
                      className={`flex-shrink-0 px-6 md:px-8 py-3 md:py-3.5 rounded-xl md:rounded-2xl font-bold text-sm md:text-base transition-all duration-300 whitespace-nowrap relative overflow-visible group ${
                        selectedProduct === index
                          ? 'text-white'
                          : 'bg-white text-gray-700 hover:text-gray-900 border-2 border-gray-200 hover:shadow-lg hover:scale-105 active:scale-95'
                      }`}
                      style={selectedProduct === index ? {
                        background: `linear-gradient(to right, ${product.color}, ${product.color}dd, ${product.color})`
                      } : {}}
                    >
                      {/* Active indicator glow */}
                      {selectedProduct === index && (
                        <div 
                          className="absolute inset-0 animate-pulse rounded-xl md:rounded-2xl"
                          style={{
                            background: `linear-gradient(to right, rgba(${colorRgb}, 0.2), rgba(${colorRgb}, 0.3), rgba(${colorRgb}, 0.2))`
                          }}
                        ></div>
                      )}
                      {/* Hover effect for inactive buttons */}
                      {selectedProduct !== index && (
                        <div 
                          className="absolute inset-0 transition-all duration-300 rounded-xl md:rounded-2xl group-hover:opacity-100 opacity-0"
                          style={{
                            background: `linear-gradient(to right, rgba(${colorRgb}, 0.05), rgba(${colorRgb}, 0.1), rgba(${colorRgb}, 0.05))`
                          }}
                        ></div>
                      )}
                      {/* Border color on hover for inactive */}
                      {selectedProduct !== index && (
                        <div 
                          className="absolute inset-0 rounded-xl md:rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 border-2 pointer-events-none"
                          style={{
                            borderColor: product.color
                          }}
                        ></div>
                      )}
                      <span className="relative z-10">{product.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product Content - Mobile First Design */}
            <div className="w-full max-w-7xl relative z-10">
              {PRODUCTS.map((product, index) => (
                <div
                  key={product.name}
                  className={`${
                    selectedProduct === index ? 'block' : 'hidden'
                  }`}
                >
                  {/* Mobile Layout: Stacked */}
                  <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
                    
                    {/* Visual Card - Mobile First */}
                    <div className="relative h-[200px] sm:h-[280px] md:h-[350px] lg:h-[450px] rounded-2xl overflow-hidden shadow-lg order-first lg:order-last">
                      <div 
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${product.color}20 0%, ${product.color}10 100%)`
                        }}
                      >
                        <div className="text-center px-4">
                          <span
                            className={`font-bold block ${
                              product.name === "ConstructionEasier" 
                                ? "text-2xl sm:text-3xl md:text-4xl lg:text-5xl" 
                                : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                            }`}
                            style={{ color: product.color }}
                          >
                            {product.name}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Text Content - Optimized for Reading */}
                    <div className="space-y-5 md:space-y-6 lg:space-y-8 flex flex-col justify-center">
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
            <section className="w-full flex flex-col justify-center relative items-center py-20 md:py-24" id="testimonials">
            <Image src="/images/artifacts/bg-blue-ellipse.png" alt="testimonials background"
              className="absolute -bottom-24 -right-32 z-0 opacity-40"
              width={800} height={800} objectFit="cover" />
            <h3 className="text-4xl text-center font-bold mb-0">
              {t('testimonials.title')}
            </h3>
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
                          className="w-full list-none relative rounded-2xl border flex-shrink-0 border-slate-200 px-5 py-5 h-[300px] bg-gradient-to-r from-gray-50 to-pink-50 flex flex-col"
                          key={testimonial.name}
                        >
                          <blockquote className="flex flex-col justify-between h-full">
                            {/* Top Section - Quote */}
                            <div className="flex flex-col flex-1 min-h-0">
                              <Quote className="w-4 h-4 mb-2 text-gray-400 flex-shrink-0" />
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
              <div className="pt-20">
                <Button
                  className="bg-white dark:bg-slate-900 font-medium text-black dark:text-white border-neutral-200 dark:border-slate-800"
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    contactSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {t('nav.contact')}
                </Button>
              </div>
            </div>
          </section>
          <section className="w-full flex flex-col justify-center relative items-center py-16 px-8" id="team">
            <div className="w-[100vw] h-[100%] bg-[#003566] absolute top-0 transform  -z-1 -skew-y-3  " />
            <h3 className="text-4xl md:text-6xl text-center text-white font-bold mb-0 relative z-10">
              {t('team.title')}
            </h3>
            <div className="w-full sm:w-[70%] grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-16 py-8 md:py-16 px-4 md:px-8">
              <AnimationFadeUp
                delay={0.2}
                duration={0.5}
                once
                className="flex flex-col justify-center items-center relative overflow-hidden rounded-xl bg-gray-50 z-0 h-[200px] md:h-[500px]"
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
                  <div className="absolute bottom-0 z-20 m-0 pb-2 md:pb-4 ps-2 md:ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                    <h1 className="text-xs md:text-2xl font-bold text-white shadow-xl">Alexandre Barreto</h1>
                    <h1 className="text-[10px] md:text-sm text-white shadow-xl">{t('team.roles.development')}</h1>
                  </div>
                </div>
              </AnimationFadeUp>
              <AnimationFadeUp
                delay={0.4}
                duration={0.5}
                once
                className="flex flex-col justify-center items-center relative overflow-hidden rounded-xl bg-gray-50 z-0 h-[200px] md:h-[500px]"
              >
                <div className="absolute inset-0 bg-center dark:bg-black"></div>
                <div className="group relative m-0 flex h-full w-full rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg">
                  <div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                    <Image
                      src="/images/team/geteasier-2.jpeg"
                      alt="Nelson Luís"
                      fill
                      objectFit="cover"
                      className="object-cover object-center rounded-xl animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute bottom-0 z-20 m-0 pb-2 md:pb-4 ps-2 md:ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                    <h1 className="text-xs md:text-2xl font-bold text-white shadow-xl">Nelson Luís</h1>
                    <h1 className="text-[10px] md:text-sm text-white shadow-xl">{t('team.roles.development')}</h1>
                  </div>
                </div>
              </AnimationFadeUp>
              <AnimationFadeUp
                delay={0.6}
                duration={0.5}
                once
                className="flex flex-col justify-center items-center relative overflow-hidden rounded-xl bg-gray-50 z-0 h-[200px] md:h-[500px]"
              >
                <div className="absolute inset-0 bg-center dark:bg-black"></div>
                <div className="group relative m-0 flex h-full w-full rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg">
                  <div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
                    <Image
                      src="/images/team/geteasier-3.jpeg"
                      alt="Rui Peixoto"
                      fill
                      objectFit="cover"
                      className="object-cover object-center rounded-xl animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute bottom-0 z-20 m-0 pb-2 md:pb-4 ps-2 md:ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
                    <h1 className="text-xs md:text-2xl font-bold text-white shadow-xl">Rui Peixoto</h1>
                    <h1 className="text-[10px] md:text-sm text-white shadow-xl">{t('team.roles.productManager')}</h1>
                  </div>
                </div>
              </AnimationFadeUp>
            </div>
          </section>
          </MaxWidthWrapper>
        </div>

        {/* Instagram Carousel */}
        <InstagramCarousel initialPosts={INSTAGRAM_POSTS} />

        <div className="w-full bg-gray-50 relative z-0 pt-12 pb-20">
          <MaxWidthWrapper>
            <h3 className="text-4xl md:text-6xl text-center font-bold mb-0 bg-clip-text text-transparent bg-gradient-to-b from-sky-500 to-blue-900" id="contact">
              {t('contact.title')}
          </h3>
            <div className="w-full flex items-center justify-center relative py-6">
            <BackgroundBeams />
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
