'use client'

import MaxWidthWrapper from './MaxWidthWrapper'
import { Icons } from '@/components/Icons'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Linkedin } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const FUNDING_PDF = '/documents/ficha-projeto-universal-ideas.pdf'
const FUNDING_LOGO = '/images/funding/prr-financiamento.png'

const SOCIALS = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/people/GetEasier/61558913198805/',
    icon: Facebook,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/geteasier.pt/',
    icon: Instagram,
  },
  {
    name: 'LinkedIn',
    href: 'https://pt.linkedin.com/company/geteasier',
    icon: Linkedin,
  },
]

const PRODUCT_LINKS = [
  { name: 'TimeEasier', href: '/time-easier', logo: '/images/products/icons/time-easier.png' },
  { name: 'ConstructionEasier', href: '/construction-easier', logo: '/images/products/icons/construction-easier.png' },
  { name: 'StockEasier', href: '/stock-easier', logo: '/images/products/icons/stock-easier.png' },
  { name: 'WoodEasier', href: '/wood-easier', logo: '/images/products/icons/wood-easier.png' },
]

const Footer = () => {
  const { t } = useLanguage()

  const companyLinks = [
    { label: 'Planos', href: '/planos' },
    { label: t('footer.contactLink'), href: '/#contact' },
  ]

  return (
    <footer className='bg-[#001d3d] text-white'>
      <MaxWidthWrapper>
        {/* Colunas */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 py-12 md:py-16 px-4'>
          {/* Marca */}
          <div className='lg:col-span-2 space-y-4'>
            <Link href='/' className='inline-block'>
              <Icons.logo className='w-44' />
            </Link>
            <div className='flex items-center gap-3 pt-1'>
              {SOCIALS.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={social.name}
                  className='p-2.5 rounded-full bg-white/5 border border-white/10 text-blue-100/80 hover:bg-white/15 hover:text-white transition-all duration-200'
                >
                  <social.icon className='w-5 h-5' />
                </Link>
              ))}
            </div>
          </div>

          {/* Produtos */}
          <div>
            <h4 className='text-sm font-semibold uppercase tracking-wider text-blue-200 mb-4'>
              {t('footer.productsTitle')}
            </h4>
            <ul className='space-y-2.5'>
              {PRODUCT_LINKS.map((product) => (
                <li key={product.name}>
                  <Link
                    href={product.href}
                    className='inline-flex items-center gap-2 text-sm text-blue-100/70 hover:text-white transition-colors duration-200 group'
                  >
                    <div className='w-5 h-5 rounded-md overflow-hidden bg-white flex-shrink-0 opacity-90 group-hover:opacity-100 transition-opacity duration-200'>
                      <Image src={product.logo} alt={product.name} width={20} height={20} className='w-full h-full object-contain' />
                    </div>
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className='text-sm font-semibold uppercase tracking-wider text-blue-200 mb-4'>
              {t('footer.companyTitle')}
            </h4>
            <ul className='space-y-2.5'>
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-sm text-blue-100/70 hover:text-white transition-colors duration-200'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Financiamento PRR / República Portuguesa / União Europeia */}
        <div className='px-4 pb-2 flex justify-center sm:justify-start'>
          <a
            href={FUNDING_PDF}
            download
            aria-label={t('funding.alt')}
            title={t('funding.download')}
            className='inline-flex transition-opacity duration-200 hover:opacity-80'
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FUNDING_LOGO}
              alt={t('funding.alt')}
              className='h-10 md:h-12 w-auto'
            />
          </a>
        </div>

        {/* Barra legal */}
        <div className='border-t border-white/10 py-6 px-4 flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className='text-sm text-blue-100/60'>
            &copy; {new Date().getFullYear()} GetEasier. {t('footer.rights')}.
          </p>
          <div className='flex items-center gap-6'>
            <Link
              href='/terms-and-conditions'
              className='text-sm text-blue-100/60 hover:text-white transition-colors duration-200'
            >
              {t('footer.terms')}
            </Link>
            <Link
              href='/privacy-policy'
              className='text-sm text-blue-100/60 hover:text-white transition-colors duration-200'
            >
              {t('footer.privacy')}
            </Link>
            <Link
              href='/privacy-policy#cookies'
              className='text-sm text-blue-100/60 hover:text-white transition-colors duration-200'
            >
              {t('footer.cookies')}
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer
