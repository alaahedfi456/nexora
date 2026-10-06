"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const alignClass = align === "center" ? "text-center" : "text-left";
  const words = title.split(" ");

  return (
    <div ref={ref} className={alignClass}>
      {/* Label with animated line decoration */}
      {label && (
        <motion.div
          className={`flex items-center gap-3 mb-5 ${
            align === "center" ? "justify-center" : ""
          }`}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Animated line that draws in */}
          <motion.span
            className="h-px bg-gradient-to-r from-transparent to-[var(--accent-violet)]"
            initial={{ width: 0 }}
            animate={inView ? { width: 32 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent-violet)]">
            {label}
          </span>
          {align === "center" && (
            <motion.span
              className="h-px bg-gradient-to-r from-[var(--accent-violet)] to-transparent"
              initial={{ width: 0 }}
              animate={inView ? { width: 32 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          )}
        </motion.div>
      )}

      {/* Title with word-by-word reveal and clip mask */}
      <h2
        className={`font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-[1.05] tracking-tight ${
          subtitle ? "mb-5" : ""
        }`}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
            <motion.span
              className="inline-block"
              initial={{ y: "110%", rotateX: -40 }}
              animate={inView ? { y: "0%", rotateX: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.15 + i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>

      {/* Subtitle with fade-up */}
      {subtitle && (
        <motion.p
          className={`text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed ${
            align === "center" ? "max-w-2xl mx-auto" : "max-w-xl"
          }`}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.7,
            delay: 0.4 + words.length * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
