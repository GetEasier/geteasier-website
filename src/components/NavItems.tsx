'use client';

import { NAV_ITEMS } from '@/config';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';
import { useEffect, useRef, useState } from 'react';
import NavItem from '@/components/NavItem';
import { Link } from "react-scroll";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null);
      }
    };

    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, []);

  const isAnyOpen = activeIndex !== null;

  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => setActiveIndex(null));

  const navItems = [...NAV_ITEMS];

  return (
    <div
      className="flex gap-4 h-full"
      ref={navRef}>
      {navItems.map((category, i) => {
        const handleOpen = () => {
          if (activeIndex === i) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        };

        const close = () => setActiveIndex(null);

        const isOpen = i === activeIndex;

        return (
          <NavItem
            category={category}
            close={close}
            handleOpen={handleOpen}
            isOpen={isOpen}
            key={category.link}
            isAnyOpen={isAnyOpen}
          />
        );
      })}
      <Link to="contact" spy={true} smooth={true} className="border cursor-pointer text-white font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
        <span>Contacte-nos</span>
        <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
      </Link>
    </div>
  );
};

export default NavItems;
