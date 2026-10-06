"use client";

import { useEffect, useState } from "react";
import { useMotionValue, useScroll, useTransform } from "framer-motion";

export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setScrollY(v);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  return { scrollYProgress, scrollY };
}
