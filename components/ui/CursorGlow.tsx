"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CursorGlow() {
  const [isDesktop, setIsDesktop] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 40, damping: 15 });
  const springY = useSpring(cursorY, { stiffness: 40, damping: 15 });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    setIsDesktop(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDesktop, cursorX, cursorY]);

  if (!isDesktop) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-30"
      style={{
        x: springX,
        y: springY,
        width: 500,
        height: 500,
        marginLeft: -250,
        marginTop: -250,
        background:
          "radial-gradient(circle, rgba(124,58,237,0.06) 0%, rgba(6,182,212,0.02) 40%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(1px)",
        willChange: "transform",
      }}
    />
  );
}
