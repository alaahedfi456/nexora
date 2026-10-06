"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const stats = [
  {
    value: 50,
    suffix: "+",
    label: "Projects delivered",
    description: "From MVP to enterprise-scale platforms",
    color: "#7c3aed",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client satisfaction",
    description: "Measured across every engagement",
    color: "#06b6d4",
  },
  {
    value: 12,
    suffix: "",
    label: "Countries reached",
    description: "Global impact from day one",
    color: "#10b981",
  },
  {
    value: 4.9,
    suffix: "/5",
    label: "Average rating",
    description: "Verified across all client reviews",
    color: "#f59e0b",
    decimals: 1,
  },
];

export function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-primary)]" />
      <div className="absolute inset-0 dot-pattern opacity-30" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[var(--accent-violet)] opacity-[0.05] blur-[100px] pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6">
        {/* Label */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--accent-violet)]" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent-violet)]">
            Impact
          </span>
          <span className="h-px w-8 bg-gradient-to-r from-[var(--accent-violet)] to-transparent" />
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative group"
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] glass-hover overflow-hidden text-center">
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${stat.color}10 0%, transparent 70%)`,
                  }}
                />

                {/* Number */}
                <div
                  className="font-display text-5xl sm:text-6xl font-bold mb-2 transition-all duration-300"
                  style={{
                    color: stat.color,
                    textShadow: `0 0 40px ${stat.color}50`,
                  }}
                >
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals ?? 0}
                    duration={2.5}
                  />
                </div>

                <div className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-[var(--text-tertiary)] leading-relaxed">
                  {stat.description}
                </div>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-1/2 transition-all duration-500"
                  style={{ background: stat.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
