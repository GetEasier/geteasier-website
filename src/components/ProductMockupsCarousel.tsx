'use client'

import { useEffect, useState } from 'react'
import { ProductMockup } from '@/components/AppMockup'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'

export interface ProductMockupItem {
  name: string
  color: string
}

interface ProductMockupsCarouselProps {
  products: ProductMockupItem[]
  selectedIndex: number
  onSelect: (index: number) => void
}

export default function ProductMockupsCarousel({
  products,
  selectedIndex,
  onSelect,
}: ProductMockupsCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api) return

    const onSelectSlide = () => {
      const idx = api.selectedScrollSnap() % products.length
      onSelect(idx)
    }

    api.on('select', onSelectSlide)
    return () => {
      api.off('select', onSelectSlide)
    }
  }, [api, onSelect, products.length])

  useEffect(() => {
    if (!api) return
    const current = api.selectedScrollSnap() % products.length
    if (current !== selectedIndex) {
      api.scrollTo(selectedIndex)
    }
  }, [api, selectedIndex, products.length])

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'center',
          loop: true,
          dragFree: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {products.map((product) => (
            <CarouselItem key={product.name} className="pl-3 basis-[92%] sm:basis-[85%]">
              <div className="relative h-[260px] sm:h-[300px] rounded-2xl overflow-hidden">
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${product.color}1f 0%, ${product.color}0a 100%)`,
                  }}
                />
                <ProductMockup name={product.name} color={product.color} className="relative z-10" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
