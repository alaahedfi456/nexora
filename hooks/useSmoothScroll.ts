"use client";

import { useRef } from "react";
import { useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

interface SmoothScrollResult {
  ref: React.RefObject<HTMLDivElement | null>;
  progress: MotionValue<number>;
  smoothProgress: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
}

/**
 * Track scroll progress for a specific section.
 * Returns raw progress (0→1) and spring-smoothed progress.
 */
export function useSmoothScroll(
  offset: any = ["start end", "end start"]
): SmoothScrollResult {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: offset as any });

  // Raw 0→1 progress
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Smoothed version with spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return { ref, progress, smoothProgress, scrollYProgress };
}

/**
 * Track scroll progress with custom input/output ranges.
 */
export function useScrollTransform(
  scrollYProgress: MotionValue<number>,
  inputRange: number[],
  outputRange: number[]
): MotionValue<number> {
  return useTransform(scrollYProgress, inputRange, outputRange);
}
