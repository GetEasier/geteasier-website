'use client'

import { usePathname } from 'next/navigation'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Icons } from '@/components/Icons'
import Link from 'next/link'
import { Link as ScrollLink } from 'react-scroll'
import { Facebook, Instagram, Linkedin } from 'lucide-react'

const SOCIALS = [
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: Facebook,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: Instagram,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: Linkedin,
  },
]

const Footer = () => {
  const pathname = usePathname()
  const pathsToMinimize = [
    '/verify-email',
    '/sign-up',
    '/sign-in',
  ]

  return (
    <footer className='bg-white flex-grow-0  pt-8 md:pt-24'>
      <MaxWidthWrapper>
        <div className='border-t border-gray-200'>
          {/* {pathsToMinimize.includes(pathname) ? null : (
            <div className='pb-8 pt-16'>
              <div className='flex justify-center'>
                <Icons.logo className='h-12 w-auto' />
              </div>
            </div>
          )} */}

          {pathsToMinimize.includes(pathname) ? null : (
            <div>
              <div className='relative flex items-center px-6 py-6 sm:py-8 lg:mt-0'>
                <div className='absolute inset-0 overflow-hidden rounded-lg -z-1'>
                  <div
                    aria-hidden='true'
                    className='absolute bg-[#001d3d] inset-0 bg-gradient-to-br bg-opacity-90'
                  />
                </div>
                <Link href='/'>
                  <Icons.logo className='w-48 relative' />
                </Link>

                <div className='text-center relative mx-auto max-w-sm'>
                  <h3 className='font-semibold text-white'>
                    Pronto para simplificar o seu negócio?
                  </h3>
                  <p className='mt-2 text-sm text-muted'>
                    Entre em contacto e descubra todas as soluções que temos para si.{' '}
                    <ScrollLink
                      to='contact'
                      smooth
                      className='whitespace-nowrap font-medium text-white hover:underline'>
                      Contacte-nos &rarr;
                    </ScrollLink>
                  </p>
                </div>
                <div className='flex items-center relative justify-center space-x-4 '>
                  {SOCIALS.map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      className='text-gray-500 hover:text-white'>
                      <social.icon className='w-6 h-6' />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='py-10 md:flex md:items-center md:justify-between'>
          <div className='text-center md:text-left'>
            <p className='text-sm text-muted-foreground'>
              &copy; {new Date().getFullYear()} Todos os direitos reservados
            </p>
          </div>

          <div className='mt-4 flex items-center justify-center md:mt-0'>
            <div className='flex space-x-8'>
              <Link
                href='/terms-and-conditions'
                className='text-sm text-muted-foreground hover:text-gray-600'>
                Termos
              </Link>
              <Link
                href='/terms-and-conditions'
                className='text-sm text-muted-foreground hover:text-gray-600'>
                Política de Privacidade
              </Link>
              <Link
                href='/terms-and-conditions'
                className='text-sm text-muted-foreground hover:text-gray-600'>
                Política de Cookies
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer
