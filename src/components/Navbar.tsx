

import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Icons } from '@/components/Icons'
import NavItems from './NavItems'
import { cookies } from 'next/headers'
import MobileNav from './MobileNav'

const Navbar = async () => {
  const nextCookies = cookies()

  return (
    <div className='bg-transparent  z-50 top-0 inset-x-0 h-16 w-full'>
      <header className='relative bg-transparent w-full h-full' id='nav-bar'>
        <MaxWidthWrapper>
          <div className=''>
            <div className='flex min-h-16 items-center '>
              <MobileNav />

              <div className='ml-4 flex lg:ml-0'>
                <Link href='/'>
                  <Icons.logo className='w-48' />
                </Link>
              </div>


              <div className='ml-auto flex items-center'>
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                  <NavItems />
                </div>
              </div>
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

