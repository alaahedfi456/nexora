"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Clock } from "lucide-react";

export function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section id="contact" className="relative section-padding overflow-hidden bg-[var(--bg-primary)]">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
            y,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
            y: y2,
          }}
        />
      </div>

      {/* Top border glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[var(--accent-violet)] to-transparent" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-[var(--text-secondary)] tracking-wide">
              Currently accepting new projects
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-8">
            <motion.h2
              className="font-display text-[clamp(3rem,8vw,7.5rem)] font-bold leading-[0.95] tracking-tight"
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="block text-[var(--text-primary)]">READY TO BUILD</span>
              <span className="block text-gradient-static">WHAT'S NEXT?</span>
            </motion.h2>
          </div>

          <motion.p
            className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Let's talk about your vision. We'll tell you exactly how we'd build it, and what it would take to make it exceptional.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.65 }}
          >
            <motion.a
              href="mailto:hello@nexora.studio"
              className="group flex items-center gap-2.5 px-9 py-4.5 bg-[var(--accent-violet)] text-white font-semibold rounded-full transition-all duration-300 text-base"
              whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(124,58,237,0.5)" }}
              whileTap={{ scale: 0.97 }}
            >
              Let's work together
              <motion.span
                className="inline-flex"
                animate={{ rotate: [0, 0] }}
                whileHover={{ rotate: 45 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight size={20} />
              </motion.span>
            </motion.a>

            <motion.a
              href="mailto:hello@nexora.studio"
              className="flex items-center gap-2.5 px-9 py-4.5 border border-[var(--border-hover)] text-[var(--text-primary)] font-semibold rounded-full hover:border-[var(--accent-violet)] hover:bg-[var(--accent-violet-dim)] transition-all duration-300 text-base"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <Mail size={18} />
              hello@nexora.studio
            </motion.a>
          </motion.div>

          {/* Contact info */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 pt-10 border-t border-[var(--border)]"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            {[
              { icon: Mail, label: "hello@nexora.studio" },
              { icon: MapPin, label: "Remote · Global" },
              { icon: Clock, label: "Response within 24h" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-[var(--text-tertiary)]">
                <Icon size={14} />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
