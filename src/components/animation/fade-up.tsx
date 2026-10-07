"use client";
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
interface Props { children: React.ReactNode; className?: string; delay?: number; duration?: number; once?: boolean }
export default function AnimationFadeUp({children, className, delay = 0, duration = .5}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window) || !el.animate) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animation: Animation | undefined;
    const stop = () => { if (preference.matches) animation?.cancel(); };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (!preference.matches) animation = el.animate([{opacity: .35, transform: 'translateY(14px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: Math.min(duration, .6) * 1000, delay: Math.min(delay, .2) * 1000, easing: 'cubic-bezier(.22,1,.36,1)'});
      observer.disconnect();
    }, {threshold: .08});
    observer.observe(el);
    preference.addEventListener('change', stop);
    return () => { observer.disconnect(); animation?.cancel(); preference.removeEventListener('change', stop); };
  }, [delay, duration]);
  return <div ref={ref} className={cn('reveal-section', className)}>{children}</div>;
}
