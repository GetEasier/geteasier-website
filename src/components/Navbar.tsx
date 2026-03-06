
'use client'

import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Icons } from '@/components/Icons'
import NavItems from './NavItems'
import MobileNav from './MobileNav'
import LanguageSelector from './LanguageSelector'
import { useEffect, useState } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { useLanguage } from '@/contexts/LanguageContext'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'shadow-lg border-b border-blue-200/50 backdrop-blur-md' 
        : ''
    }`} id='nav-bar' style={{
      background: scrolled ? 'rgb(191, 219, 254)' : 'transparent'
    }}>
      <header className='relative w-full h-20 mx-4 md:mx-6 lg:mx-8 pt-3 pb-3'>
        <MaxWidthWrapper>
          <div className='flex h-full items-center justify-between px-4 md:px-6'>
            {/* Logo */}
            <div className='flex items-center flex-shrink-0'>
              <MobileNav />
              <Link href='/' className='ml-3 lg:ml-0 flex items-center group'>
                <Icons.logo className='w-36 md:w-40 transition-all duration-300 group-hover:opacity-90' />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className='hidden lg:flex items-center gap-8 flex-1 justify-center'>
              <NavItems />
            </nav>

            {/* Language Selector and CTA Button */}
            <div className='hidden lg:flex items-center gap-4 flex-shrink-0'>
              <LanguageSelector />
              <ScrollLink 
                to="contact" 
                spy={true} 
                smooth={true}
                className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold px-6 py-2.5 rounded-lg transition-all duration-200 cursor-pointer text-sm shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                {t('nav.contact')}
              </ScrollLink>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}

export default Navbar




// export function NavbarDemo() {
//   return (
//     <div className="relative w-full flex items-center justify-center">
//       <Navbar className="top-2" />
//       <p className="text-black dark:text-white">
//         The Navbar will show on top of the page
//       </p>
//     </div>
//   );
// }

