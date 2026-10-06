"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const values = [
  {
    label: "Craft over commodity",
    detail: "We obsess over details that most would overlook.",
  },
  {
    label: "Velocity with intention",
    detail: "We move fast—but every decision is deliberate.",
  },
  {
    label: "Honest partnership",
    detail: "We tell you what you need to hear, not what you want.",
  },
  {
    label: "Systems thinking",
    detail: "We design for where you're going, not just where you are.",
  },
];

const technologies = [
  "Next.js", "React", "TypeScript", "Python", "AWS", "GCP",
  "Kubernetes", "PostgreSQL", "Prisma", "OpenAI", "PyTorch", "Terraform",
];

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="section-padding bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <SectionHeading
              label="About NEXORA"
              title="We are architects of the digital future."
              subtitle=""
            />
            <motion.p
              className="text-lg text-[var(--text-secondary)] leading-relaxed mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              NEXORA is a digital innovation studio at the intersection of artificial intelligence and exceptional design. We partner with ambitious founders, product leaders, and enterprise teams to build the software that defines what's next.
            </motion.p>
            <motion.p
              className="text-base text-[var(--text-secondary)] leading-relaxed mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              We don't believe in good enough. Every pixel, every function, every interaction—crafted with the same standard of excellence we'd demand for our own products.
            </motion.p>
          </div>

          {/* Mission / philosophy panel */}
          <motion.div
            className="relative p-8 rounded-3xl border border-[var(--border)] bg-[var(--bg-primary)] overflow-hidden"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--accent-violet)] opacity-[0.07] rounded-full -translate-y-1/2 translate-x-1/2 blur-[60px]" />

            <blockquote className="font-display text-2xl font-bold text-[var(--text-primary)] leading-tight mb-6">
              "Exceptional software is<br />never accidental."
            </blockquote>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8">
              Our philosophy is simple: build it as if your name is on it forever. Because digital products outlast the teams that built them—and the best ones make that legacy something to be proud of.
            </p>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent-violet)] to-[var(--accent-cyan)] flex items-center justify-center text-xs font-bold text-white">
                N
              </div>
              <div>
                <div className="text-sm font-semibold text-[var(--text-primary)]">NEXORA Studio</div>
                <div className="text-xs text-[var(--text-tertiary)]">Founded 2021 · Remote-first</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div ref={ref} className="mb-20">
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent-violet)] mb-8">
            Our values
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.label}
                className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] group glass-hover"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="w-6 h-6 rounded-full bg-[var(--accent-violet-dim)] border border-[var(--accent-violet)] border-opacity-30 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="font-display font-semibold text-[var(--text-primary)] mb-2 text-sm">
                  {v.label}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{v.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div>
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--accent-violet)] mb-8">
            Technology we love
          </div>
          <div className="flex flex-wrap gap-3">
            {technologies.map((tech, i) => (
              <motion.span
                key={tech}
                className="px-4 py-2 rounded-full text-sm font-medium text-[var(--text-secondary)] border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent-violet)] hover:text-[var(--text-primary)] transition-all duration-200 cursor-default"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
