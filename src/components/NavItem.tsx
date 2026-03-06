'use client';

import { Button } from './ui/button';
import { ChevronDown, Clock, Building2, Package, TreePine } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Link } from "react-scroll";
import LinkNext from 'next/link';
import { NAV_ITEMS } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';

type Category = (typeof NAV_ITEMS)[number];

interface NavItemProps {
  category: Category;
  handleOpen: () => void;
  close: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

const NavItem = ({
  isAnyOpen,
  category,
  handleOpen,
  close,
  isOpen,
}: NavItemProps) => {
  const { t } = useLanguage();
  const hasProducts = 'products' in category && category.products;
  
  // Get translated name based on link
  const getTranslatedName = (link: string) => {
    const translationMap: Record<string, string> = {
      'products': t('nav.products'),
      'testimonials': t('nav.testimonials'),
      'team': t('nav.about'),
    };
    return translationMap[link] || category.name;
  };

  // Get translated description for products
  const getTranslatedDescription = (productName: string) => {
    const translationMap: Record<string, string> = {
      'TimeEasier': t('products.timeEasier.shortDescription'),
      'ConstructionEasier': t('products.constructionEasier.shortDescription'),
      'StockEasier': t('products.stockEasier.shortDescription'),
      'WoodEasier': t('products.woodEasier.shortDescription'),
    };
    return translationMap[productName] || '';
  };

  return (
    <div className="flex">
      <div 
        className="relative"
        onMouseEnter={() => hasProducts && handleOpen()}
        onMouseLeave={() => close()}
      >
        {category.link && !hasProducts ? (
          <Link
            to={category.link}
            spy={true}
            smooth={true}
            offset={-80}
            className="text-gray-900 hover:text-blue-700 font-semibold cursor-pointer transition-colors duration-200">
            {getTranslatedName(category.link)}
          </Link>
        ) : (
          <div className="flex items-center gap-1.5">
            {category.link ? (
              <Link
                to={category.link}
                spy={true}
                smooth={true}
                offset={-80}
                className="text-gray-900 hover:text-blue-700 font-semibold cursor-pointer transition-colors duration-200">
                {getTranslatedName(category.link)}
              </Link>
            ) : (
              <Button
                className="gap-1.5 text-gray-900 hover:text-blue-700 font-semibold cursor-pointer transition-colors duration-200 !text-gray-900 hover:!text-blue-700"
                onClick={handleOpen}
                variant={'link'}>
                {category.name}
              </Button>
            )}
            {hasProducts && (
              <ChevronDown
                className={cn('h-4 w-4 transition-all text-gray-900', {
                  '-rotate-180': isOpen,
                })}
              />
            )}
          </div>
        )}

        {/* Products Dropdown - com padding-top para criar ponte invisível */}
        {hasProducts && isOpen && (
          <div
            className="absolute top-full left-0 z-50"
            style={{ paddingTop: '8px' }}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200/60 overflow-hidden min-w-[320px]">
              <div className="p-2">
              {category.products?.map((product, index) => {
                const getIcon = () => {
                  switch (product.icon) {
                    case 'clock':
                      return <Clock className="w-5 h-5" />;
                    case 'building':
                      return <Building2 className="w-5 h-5" />;
                    case 'package':
                      return <Package className="w-5 h-5" />;
                    case 'tree':
                      return <TreePine className="w-5 h-5" />;
                    default:
                      return <div className="w-5 h-5 rounded-full" style={{ backgroundColor: product.color }} />;
                  }
                };

                return (
                  <LinkNext
                    key={product.name}
                    href={product.href}
                    className="block px-5 py-4 rounded-xl hover:bg-gradient-to-r transition-all duration-300 group cursor-pointer"
                    style={{
                      background: isOpen ? 'transparent' : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `linear-gradient(to right, ${product.color}08, ${product.color}03)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                    onClick={() => {
                      close();
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                        style={{ 
                          backgroundColor: `${product.color}15`,
                          width: '40px',
                          height: '40px',
                        }}
                      >
                        <div style={{ color: product.color }}>
                          {getIcon()}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span 
                            className="text-base font-bold text-gray-900 group-hover:text-gray-900 transition-colors duration-300"
                            style={{
                              color: isOpen ? '#1f2937' : '#1f2937'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = product.color;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = '#1f2937';
                            }}
                          >
                            {product.name}
                          </span>
                        </div>
                        {getTranslatedDescription(product.name) && (
                          <p className="text-xs text-gray-500 leading-tight">
                            {getTranslatedDescription(product.name)}
                          </p>
                        )}
                      </div>
                      <svg 
                        className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-all duration-300 group-hover:translate-x-1 flex-shrink-0" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </LinkNext>
                );
              })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavItem;
