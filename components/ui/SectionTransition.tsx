"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface SectionTransitionProps {
  scrollProgress: MotionValue<number>;
  fromColor?: string;
  toColor?: string;
  variant?: "gradient" | "line" | "dots";
}

export function SectionTransition({
  scrollProgress,
  fromColor = "var(--bg-primary)",
  toColor = "var(--bg-secondary)",
  variant = "gradient",
}: SectionTransitionProps) {
  const opacity = useTransform(scrollProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
  const scaleX = useTransform(scrollProgress, [0.2, 0.5, 0.8], [0.3, 1, 0.3]);
  const lineWidth = useTransform(scrollProgress, [0.3, 0.6], ["0%", "80%"]);

  if (variant === "line") {
    return (
      <div className="relative h-32 overflow-hidden flex items-center justify-center">
        <motion.div
          className="h-px"
          style={{
            width: lineWidth,
            background: `linear-gradient(90deg, transparent, var(--accent-violet), var(--accent-cyan), transparent)`,
            opacity,
          }}
        />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className="relative h-24 overflow-hidden flex items-center justify-center gap-3">
        {[0, 1, 2, 3, 4].map((i) => {
          const dotOpacity = useTransform(
            scrollProgress,
            [0.2 + i * 0.08, 0.35 + i * 0.08, 0.7, 0.85],
            [0, 1, 1, 0]
          );
          const dotScale = useTransform(
            scrollProgress,
            [0.2 + i * 0.08, 0.4 + i * 0.08],
            [0, 1]
          );
          return (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[var(--accent-violet)]"
              style={{ opacity: dotOpacity, scale: dotScale }}
            />
          );
        })}
      </div>
    );
  }

  // Default gradient transition
  return (
    <div className="relative h-40 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${fromColor} 0%, transparent 30%, transparent 70%, ${toColor} 100%)`,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px"
        style={{
          width: "60%",
          scaleX,
          opacity,
          background: `linear-gradient(90deg, transparent, var(--accent-violet), transparent)`,
          transformOrigin: "center",
        }}
      />
    </div>
  );
}
