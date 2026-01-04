'use client';

import { useEffect, useRef, useState } from 'react';

const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = scrollRef.current as HTMLElement | null;

      if (element) {
        const scrollPosition = document.documentElement.scrollTop;
        const topOfElement = getOffsetTop(element);
        const elementHeight = element.offsetHeight;

        const viewportHeight = window.innerHeight;

        const percent =
          (scrollPosition - topOfElement + viewportHeight) /
          (elementHeight + viewportHeight);

        const clampedPercent = Math.min(1, Math.max(0, percent));

        setScrollProgress(clampedPercent);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollRef]);

  return { scrollRef, scrollProgress };
};

const getOffsetTop = (element: HTMLElement) => {
  let offsetTop = 0;
  let currentElement = element;
  while (currentElement) {
    offsetTop += currentElement.offsetTop;
    currentElement = currentElement.offsetParent as HTMLElement;
  }
  return offsetTop;
};

export default useScrollProgress;
