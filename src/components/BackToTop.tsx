"use client";

import { ArrowUpIcon } from 'lucide-react'
import { Link } from 'react-scroll'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function BackToTop() {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction > 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-screen fixed bottom-4 right-4 z-[5000] w-14 h-14",
        )}
      >
        <Link
          to='nav-bar'
          spy={true}
          smooth={true}
          className="p-4 border-0 w-14 h-14 rounded-full shadow-md bg-blue-800 hover:bg-blue-700 text-white text-lg font-semibold transition-colors duration-300"
        >
          <ArrowUpIcon className="w-6 h-6" />
          <span className="sr-only">Go to top</span>
        </Link>
      </motion.div>
    </AnimatePresence>
  )
}
