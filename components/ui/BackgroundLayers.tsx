"use client";

import { useEffect, useState } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

interface BackgroundLayersProps {
  children: React.ReactNode;
  /** Scroll progress MotionValue (0 to 1) for parallax effects */
  scrollProgress?: MotionValue<number>;
  /** Mouse smooth X MotionValue (normalized -1 to 1) */
  mouseX?: MotionValue<number>;
  /** Mouse smooth Y MotionValue (normalized -1 to 1) */
  mouseY?: MotionValue<number>;
  /** Show animated grid */
  showGrid?: boolean;
  /** Show particles */
  showParticles?: boolean;
  /** Show atmospheric glow */
  showGlow?: boolean;
  /** Custom glow color */
  glowColor?: string;
  /** Parallax intensity multiplier */
  parallaxIntensity?: number;
  className?: string;
}

const particles = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x: `${(i * 37 + 17) % 100}%`,
  y: `${(i * 53 + 23) % 100}%`,
  size: 1 + ((i * 3) % 2),
  delay: (i * 0.4) % 6,
  duration: 4 + ((i * 1.5) % 6),
}));

export function BackgroundLayers({
  children,
  scrollProgress,
  mouseX,
  mouseY,
  showGrid = true,
  showParticles = true,
  showGlow = true,
  glowColor = "rgba(124,58,237,0.08)",
  parallaxIntensity = 1,
  className = "",
}: BackgroundLayersProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  // Parallax transforms based on scroll
  const glowY = scrollProgress
    ? useTransform(scrollProgress, [0, 1], [40 * parallaxIntensity, -40 * parallaxIntensity])
    : undefined;
  const gridOpacity = scrollProgress
    ? useTransform(scrollProgress, [0, 0.3, 0.7, 1], [0.02, 0.04, 0.04, 0.02])
    : undefined;
  const particleY = scrollProgress
    ? useTransform(scrollProgress, [0, 1], [20 * parallaxIntensity, -20 * parallaxIntensity])
    : undefined;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Layer 0: Gradient background (static) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" />

      {/* Layer 1: Atmospheric glow */}
      {showGlow && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={glowY ? { y: glowY } : undefined}
        >
          <div
            className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px]"
            style={{ background: glowColor }}
          />
          <div
            className="absolute bottom-1/4 right-1/5 w-[400px] h-[400px] rounded-full blur-[100px]"
            style={{ background: "rgba(6,182,212,0.05)" }}
          />
        </motion.div>
      )}

      {/* Layer 2: Animated grid */}
      {showGrid && (
        <motion.div
          className="absolute inset-0 grid-bg pointer-events-none"
          style={gridOpacity ? { opacity: gridOpacity } : { opacity: 0.03 }}
        />
      )}

      {/* Layer 3: Particles */}
      {mounted && showParticles && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={particleY ? { y: particleY } : undefined}
        >
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-[var(--accent-violet)]"
              style={{
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
              }}
              animate={{
                opacity: [0, 0.6, 0],
                y: [0, -20, -40],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Layer 4: Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
