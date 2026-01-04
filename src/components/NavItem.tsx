'use client';

import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Link } from "react-scroll";
import { NAV_ITEMS } from '@/config';

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
  return (
    <div className="flex">
      <div className="relative flex items-center">
        {category.link ? (
          <Link
            to={category.link}
            spy={true}
            smooth={true}
            className=" text-white font-medium cursor-pointer">
            {category.name}
          </Link>
        ) : (
          <Button
            className="gap-1.5 text-white font-medium cursor-pointer"
            onClick={handleOpen}
            variant={'link'}>
            {category.name}
            {/* {category.featured && (
              <ChevronDown
                className={cn('h-4 w-4 transition-all ', {
                  '-rotate-180': isOpen,
                })}
              />
            )} */}
          </Button>
        )}
      </div>

      {/* {category.featured && (
        <>
          {
            isOpen ? (
              <div
                onClick={() => close()}
                className={cn(
                  'absolute inset-x-0 top-full text-sm ',
                  {
                    'animate-in fade-in-10 slide-in-from-top-5': !isAnyOpen,
                  }
                )}>
                <div
                  className="absolute inset-0 top-1/2 bg-white rounded-3xl shadow"
                  aria-hidden="true"
                />

                <div className="relative bg-white rounded-3xl">
                  <div className="mx-auto max-w-7xl px-8">
                    <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                      <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
                        {category.featured?.map(item => (
                          <Link
                            link={item.link}
                            key={item.name}
                            className="group relative text-base sm:text-sm">
                            <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                              <Image
                                src={item.imageSrc}
                                alt="product category image"
                                fill
                                className="object-cover object-center"
                              />
                            </div>

                            <div
                              className="mt-6 block font-medium text-gray-900">
                              {item.name}
                            </div>
                            <p
                              className="mt-1 -foreground"
                              aria-hidden="true">
                              {item.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null
          }

        </>)} */}
    </div >
  );
};

export default NavItem;
