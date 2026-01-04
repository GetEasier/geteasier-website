"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimationFadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export default function AnimationFadeRight({
  children, className, delay, duration, once, ...props
}: AnimationFadeUpProps) {
  return !!children && (
    <motion.div
      className={cn('animation-fade-up', className)}
      initial={{ opacity: 0, x: 50 }}
      transition={{
        delay,
        duration,
        ease: 'easeOut',
      }}
      viewport={{ once }}
      whileInView={{ opacity: 1, x: 0 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};


