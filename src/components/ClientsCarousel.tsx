'use client'

import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

interface Client {
  image: string
  alt: string
}

interface ClientsCarouselProps {
  clients: Client[]
}

export default function ClientsCarousel({ clients }: ClientsCarouselProps) {
  return (
    <div className="w-full py-8 overflow-hidden" id="clients">
      <Carousel
        opts={{
          align: "start",
          loop: true,
          dragFree: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {/* Duplicar os logos para criar efeito infinito */}
          {[...clients, ...clients].map((card, idx) => (
            <CarouselItem
              key={`${card.alt}-${idx}`}
              className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <div className="flex items-center justify-center h-[150px] p-4">
                <div className="relative w-full h-full flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    width={200}
                    height={150}
                    className="object-contain max-w-full max-h-full"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

