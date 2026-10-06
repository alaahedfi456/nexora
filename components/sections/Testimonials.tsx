"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    position: "Chief Product Officer",
    company: "Vantage Capital",
    quote:
      "NEXORA didn't just build us a product—they completely reimagined how our team works with data. The AI platform they delivered processes insights we used to wait weeks for, in under 40 seconds. Our analysts call it a superpower.",
    rating: 5,
    initials: "SC",
    accentColor: "#7c3aed",
  },
  {
    id: 2,
    name: "Marcus Reeves",
    position: "Founder & CEO",
    company: "Velance Studio",
    quote:
      "We approached NEXORA with a rough concept and left with a category-defining product. The design sensibility, engineering quality, and strategic input they brought was unlike any agency we'd worked with. They think like co-founders.",
    rating: 5,
    initials: "MR",
    accentColor: "#06b6d4",
  },
  {
    id: 3,
    name: "Isabelle Fontaine",
    position: "VP of Digital",
    company: "Lumière Group",
    quote:
      "The e-commerce platform NEXORA built for us is nothing short of spectacular. From the first scroll to checkout, every interaction feels luxurious. Our conversion rate tripled in 90 days. The ROI speaks for itself.",
    rating: 5,
    initials: "IF",
    accentColor: "#f59e0b",
  },
  {
    id: 4,
    name: "Dmitri Volkov",
    position: "CTO",
    company: "Synapse Health",
    quote:
      "Building a HIPAA-compliant AI platform seemed like a 12-month project. NEXORA delivered in four. The architecture is rock-solid, the UI is beautiful, and the AI clinical features are genuinely saving time for our doctors.",
    rating: 5,
    initials: "DV",
    accentColor: "#10b981",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, paused]);

  const t = testimonials[current];

  return (
    <section className="section-padding bg-[var(--bg-primary)]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionHeading
            label="Testimonials"
            title="Trusted by builders and leaders"
            align="center"
          />
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              className="relative p-10 lg:p-14 rounded-3xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden"
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Background glow */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-[0.06] blur-[80px] pointer-events-none"
                style={{ background: t.accentColor }}
              />

              {/* Quote mark */}
              <div className="font-display text-[120px] leading-none text-[var(--accent-violet)] opacity-10 absolute top-4 left-8 select-none pointer-events-none">
                "
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-[var(--accent-violet)] text-[var(--accent-violet)]" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl sm:text-2xl font-display font-medium text-[var(--text-primary)] leading-snug mb-10 relative z-10 max-w-2xl">
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${t.accentColor}, ${t.accentColor}80)` }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-[var(--text-primary)]">{t.name}</div>
                  <div className="text-sm text-[var(--text-secondary)]">
                    {t.position} · {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="transition-all duration-300"
                  aria-label={`Go to testimonial ${i + 1}`}
                >
                  <motion.div
                    className="rounded-full"
                    animate={{
                      width: i === current ? 24 : 8,
                      height: 8,
                      background: i === current ? "var(--accent-violet)" : "var(--border-hover)",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all duration-200"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all duration-200"
                aria-label="Next testimonial"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
