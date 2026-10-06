"use client";

import { motion } from "framer-motion";

const technologies = [
  "Artificial Intelligence",
  "Next.js",
  "React",
  "TypeScript",
  "Cloud Infrastructure",
  "Automation",
  "Data Engineering",
  "UI/UX Design",
  "Machine Learning",
  "LLM Integration",
  "DevOps",
  "Microservices",
];

// Duplicate for seamless loop
const allTech = [...technologies, ...technologies];

function TechItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-5 shrink-0">
      <span className="text-sm font-medium text-[var(--text-secondary)] tracking-wide whitespace-nowrap">
        {label}
      </span>
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-violet)] opacity-60 shrink-0" />
    </div>
  );
}

export function TechMarquee() {
  return (
    <section id="tech" className="relative py-8 border-y border-[var(--border)] overflow-hidden bg-[var(--bg-secondary)]">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--bg-secondary)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--bg-secondary)] to-transparent z-10 pointer-events-none" />

      {/* Marquee track */}
      <div className="flex gap-5 animate-marquee will-change-transform">
        {allTech.map((tech, i) => (
          <TechItem key={i} label={tech} />
        ))}
      </div>
    </section>
  );
}
