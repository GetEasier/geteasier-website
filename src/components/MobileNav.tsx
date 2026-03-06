'use client'

import { NAV_ITEMS } from '@/config'
import { Menu, X, ChevronDown, Clock, Building2, Package, TreePine } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Link as ScrollLink } from "react-scroll"
import Link from 'next/link'
import { createPortal } from 'react-dom'
import { useLanguage } from '@/contexts/LanguageContext'

// Map icon names to Lucide React components
const iconComponents: Record<string, any> = {
  Clock: Clock,
  Building2: Building2,
  Package: Package,
  TreePine: TreePine,
  clock: Clock,
  building: Building2,
  package: Package,
  tree: TreePine,
}

const MobileNav = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const pathname = usePathname()
  
  // Get translated name based on link
  const getTranslatedName = (link: string) => {
    const translationMap: Record<string, string> = {
      'products': t('nav.products'),
      'testimonials': t('nav.testimonials'),
      'team': t('nav.about'),
    };
    return translationMap[link] || '';
  };

  // whenever we click an item in the menu and navigate away, we want to close the menu
  useEffect(() => {
    setIsOpen(false)
    setExpandedCategory(null)
  }, [pathname])

  // remove second scrollbar when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
      setExpandedCategory(null)
    }
  }, [isOpen])

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName)
  }

  const handleLinkClick = () => {
    setIsOpen(false)
    setExpandedCategory(null)
  }

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!isOpen)
    return (
      <button
        type='button'
        onClick={() => setIsOpen(true)}
        className='md:hidden relative -m-2 inline-flex items-center justify-center rounded-lg p-2.5 z-[100] hover:bg-gray-100 active:bg-gray-200 transition-colors'>
        <Menu className='h-6 w-6 text-gray-800' aria-hidden='true' />
      </button>
    )

  const menuContent = (
    <>
      {/* Backdrop with blur effect and fade-in animation */}
      <div 
        className='fixed inset-0 bg-black/40 z-[9998] lg:hidden transition-opacity duration-300'
        onClick={() => setIsOpen(false)}
        style={{
          animation: 'fadeIn 0.3s ease-out'
        }}
      />

      {/* Menu Panel with slide-in animation */}
      <div className='fixed inset-y-0 left-0 z-[9999] w-[85%] max-w-sm lg:hidden'>
        <div 
          className='relative flex h-full w-full flex-col overflow-hidden bg-white shadow-2xl'
          style={{
            animation: 'slideInLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Header with close button */}
          <div className='flex items-center justify-end px-5 py-4 border-b border-gray-100'>
            <button
              type='button'
              onClick={() => setIsOpen(false)}
              className='inline-flex items-center justify-center rounded-lg p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-all duration-200'>
              <X className='h-5 w-5' aria-hidden='true' />
            </button>
          </div>

          {/* Menu Items with better spacing and staggered animation */}
          <div className='flex-1 overflow-y-auto py-2'>
            <ul className='space-y-1 px-4'>
              {NAV_ITEMS.map((category, index) => {
                const hasProducts = 'products' in category && category.products
                const isExpanded = expandedCategory === category.name

                return (
                  <li 
                    key={category.name} 
                    className='group'
                    style={{
                      animation: `slideUp 0.4s ease-out ${0.15 + index * 0.05}s both`
                    }}
                  >
                    {hasProducts ? (
                      <>
                        <button
                          type='button'
                          onClick={() => toggleCategory(category.name)}
                          className='w-full flex items-center justify-between px-5 py-4 rounded-xl text-base font-semibold text-gray-900 hover:bg-gradient-to-r hover:from-blue-50/80 hover:via-blue-50/40 hover:to-transparent active:scale-[0.98] transition-all duration-200 border border-transparent hover:border-blue-100/50 shadow-sm hover:shadow-md'>
                          <span className='flex items-center gap-3'>
                            <span className='text-blue-600 font-bold'>{category.link ? getTranslatedName(category.link) : category.name}</span>
                          </span>
                          <ChevronDown
                            className={`h-5 w-5 text-gray-400 transition-all duration-300 ${
                              isExpanded ? 'rotate-180 text-blue-600 scale-110' : 'group-hover:text-gray-600 group-hover:scale-110'
                            }`}
                          />
                        </button>
                        <div className={`overflow-hidden transition-all duration-400 ease-in-out ${
                          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          <div className='pl-2 pr-3 py-3 space-y-2'>
                            {category.products?.map((product, productIndex) => {
                              const iconName = product.icon || 'package'
                              const IconComponent = iconComponents[iconName] || Package
                              return (
                                <Link
                                  key={product.name}
                                  href={product.href}
                                  onClick={handleLinkClick}
                                  className='flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gradient-to-r hover:from-blue-50/70 hover:via-blue-50/30 hover:to-transparent active:scale-[0.98] transition-all duration-200 group/item border border-transparent hover:border-blue-100/30 shadow-sm hover:shadow-md'>
                                  <div
                                    className='w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover/item:scale-110 group-hover/item:rotate-3 shadow-sm'
                                    style={{ 
                                      backgroundColor: `${product.color}20`,
                                      boxShadow: `0 2px 8px ${product.color}20`
                                    }}
                                  >
                                    {IconComponent && <IconComponent className='w-5 h-5' style={{ color: product.color }} />}
                                  </div>
                                  <span className='flex-1 font-medium'>{product.name}</span>
                                  <div className='w-2 h-2 rounded-full shadow-sm' style={{ backgroundColor: product.color }}></div>
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      </>
                    ) : (
                      <ScrollLink
                        to={category.link || ''}
                        spy={true}
                        smooth={true}
                        offset={-80}
                        onClick={handleLinkClick}
                        className='flex items-center px-5 py-4 rounded-xl text-base font-semibold text-gray-900 hover:bg-gradient-to-r hover:from-blue-50/80 hover:via-blue-50/40 hover:to-transparent active:scale-[0.98] transition-all duration-200 border border-transparent hover:border-blue-100/50 shadow-sm hover:shadow-md'>
                        <span className='font-bold'>{category.link ? getTranslatedName(category.link) : category.name}</span>
                      </ScrollLink>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Footer CTA with gradient and animation */}
          <div 
            className='border-t border-gray-200/50 p-5 bg-gradient-to-b from-white via-gray-50/30 to-gray-50/50'
            style={{
              animation: `slideUp 0.4s ease-out ${0.15 + NAV_ITEMS.length * 0.05}s both`
            }}
          >
            <ScrollLink
              to="contact"
              spy={true}
              smooth={true}
              onClick={handleLinkClick}
              className='block w-full text-center px-6 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 hover:from-blue-700 hover:via-blue-800 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 active:scale-[0.98] hover:scale-[1.02]'>
              Contacte-nos
            </ScrollLink>
          </div>
        </div>
      </div>
    </>
  )

  if (!mounted) return null

  return createPortal(menuContent, document.body)
}

export default MobileNav
