'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

interface Client {
  image: string
  alt: string
}

interface ClientsCarouselProps {
  clients: Client[]
}

export default function ClientsCarousel({ clients }: ClientsCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const allClients = [...clients, ...clients]
  
  // O item central é o que está selecionado (com align: "center")
  const centerIndex = current % clients.length

  return (
    <div className="w-full py-8 overflow-hidden" id="clients">
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-4 w-full max-w-md">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-300"></div>
          <p className="text-center text-gray-500 text-xs md:text-sm font-semibold uppercase tracking-wider whitespace-nowrap">
            Trusted by
          </p>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-300 to-gray-300"></div>
        </div>
      </div>
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
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
          {allClients.map((card, idx) => {
            // Verificar se este item está no centro (considerando a duplicação)
            const isCenter = idx === current || idx === current + clients.length
            return (
              <CarouselItem
                key={`${card.alt}-${idx}`}
                className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <div className="flex items-center justify-center h-[150px] p-4">
                  <div className={`relative w-full h-full flex items-center justify-center transition-all duration-500 ${
                    isCenter 
                      ? 'grayscale-0 opacity-100 scale-110' 
                      : 'grayscale opacity-50 scale-100'
                  }`}>
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
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

