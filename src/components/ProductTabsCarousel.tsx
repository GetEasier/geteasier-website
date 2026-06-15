'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'

export interface ProductTab {
  name: string
  logo: string
  color: string
}

interface ProductTabsCarouselProps {
  products: ProductTab[]
  selectedIndex: number
  onSelect: (index: number) => void
  ariaLabel: string
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null
}

function ProductTabButton({
  product,
  index,
  isActive,
  onClick,
  fullWidth = false,
}: {
  product: ProductTab
  index: number
  isActive: boolean
  onClick: () => void
  fullWidth?: boolean
}) {
  const rgb = hexToRgb(product.color)
  const colorRgb = rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : '66, 133, 244'

  return (
    <button
      type="button"
      role="tab"
      id={`product-tab-${index}`}
      aria-selected={isActive}
      aria-controls={`product-panel-${index}`}
      onClick={onClick}
      className={`flex-shrink-0 flex items-center justify-center px-4 sm:px-5 md:px-6 py-2.5 md:py-3 rounded-xl bg-white border-2 transition-all duration-200 touch-manipulation ${
        fullWidth ? 'w-full' : ''
      } ${
        isActive
          ? 'shadow-md'
          : 'border-gray-200 lg:hover:border-gray-300 lg:hover:shadow-sm active:scale-[0.98]'
      }`}
      style={
        isActive
          ? {
              borderColor: product.color,
              boxShadow: `0 8px 24px -8px rgba(${colorRgb}, 0.45)`,
            }
          : undefined
      }
    >
      <Image
        src={product.logo}
        alt={product.name}
        width={140}
        height={36}
        className={`h-6 sm:h-7 md:h-8 w-auto object-contain transition-all duration-200 ${
          isActive ? 'opacity-100' : 'opacity-70 lg:hover:opacity-100'
        }`}
      />
    </button>
  )
}

export default function ProductTabsCarousel({
  products,
  selectedIndex,
  onSelect,
  ariaLabel,
}: ProductTabsCarouselProps) {
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
    <div className="w-full relative z-20" role="tablist" aria-label={ariaLabel}>
      {/* Desktop — todos os botões visíveis numa linha */}
      <div className="hidden lg:flex flex-wrap justify-center gap-4">
        {products.map((product, idx) => (
          <ProductTabButton
            key={product.name}
            product={product}
            index={idx}
            isActive={idx === selectedIndex}
            onClick={() => onSelect(idx)}
          />
        ))}
      </div>

      {/* Mobile / tablet — carrossel deslizável */}
      <div className="lg:hidden relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-6 sm:w-10 z-10 bg-gradient-to-r from-gray-50 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-6 sm:w-10 z-10 bg-gradient-to-l from-gray-50 to-transparent"
          aria-hidden="true"
        />

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
            {products.map((product, idx) => (
              <CarouselItem
                key={product.name}
                className="pl-3 basis-[82%] sm:basis-[58%] md:basis-[48%]"
              >
                <ProductTabButton
                  product={product}
                  index={idx}
                  isActive={idx === selectedIndex}
                  fullWidth
                  onClick={() => {
                    onSelect(idx)
                    api?.scrollTo(idx)
                  }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Indicadores de swipe */}
        <div className="flex justify-center items-center gap-2 mt-4" role="presentation">
          {products.map((product, idx) => {
            const isActive = idx === selectedIndex
            return (
              <button
                key={product.name}
                type="button"
                aria-label={product.name}
                onClick={() => {
                  onSelect(idx)
                  api?.scrollTo(idx)
                }}
                className="h-2 rounded-full transition-all duration-300 touch-manipulation"
                style={{
                  width: isActive ? 20 : 8,
                  backgroundColor: isActive ? product.color : '#d1d5db',
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
