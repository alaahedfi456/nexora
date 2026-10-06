"use client";

import { useEffect, useRef, useCallback } from "react";
import { useMotionValue, useSpring, MotionValue } from "framer-motion";

interface MousePositionResult {
  position: { x: MotionValue<number>; y: MotionValue<number> };
  normalized: { x: number; y: number };
  smooth: { x: MotionValue<number>; y: MotionValue<number> };
}

export function useMousePosition(): MousePositionResult {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const normalizedRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  // Spring-smoothed values for silky parallax
  const smoothX = useSpring(rawX, { stiffness: 50, damping: 20, restDelta: 0.001 });
  const smoothY = useSpring(rawY, { stiffness: 50, damping: 20, restDelta: 0.001 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;
        rawX.set(nx);
        rawY.set(ny);
        normalizedRef.current = { x: nx, y: ny };
        rafRef.current = null;
      });
    },
    [rawX, rawY]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  return {
    position: { x: rawX, y: rawY },
    normalized: normalizedRef.current,
    smooth: { x: smoothX, y: smoothY },
  };
}
