"use client";

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CursorBlinker from "./cursor-blinker";


export default function TypeWriterText({ baseText }: { baseText: string }) {
  const [done, setDone] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest)
  );
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    const controls = animate(count, baseText.length, {
      type: "tween",
      delay: 0.2,
      duration: 1,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 3,
      // onComplete: () => {
      //   setDone(true);
      // }
    });
    return controls.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className="flex items-center gap-0" ref={ref}>
      <motion.span className="text-primary text-5xl">{displayText}</motion.span>
      {done && (
        <>
          <br /> <br />
        </>
      )}
      {/* <RedoAnimText delay={delay + 1} /> */}
      <CursorBlinker />
    </span>
  );
}
