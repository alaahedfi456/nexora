"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useTransform, useSpring, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight, Cpu, Activity, Zap, CheckCircle2, ShieldCheck, ChevronDown } from "lucide-react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { NeuralCore } from "@/components/ui/NeuralCore";

// 1. Staggered Word Reveal Component (Fail-Safe)
function AnimatedText({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}>
      {words.map((word, wi) => (
        <span key={wi} className="overflow-hidden inline-block relative pb-2 -mb-2 pt-2 -mt-2">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: delay + wi * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// 2. Animated Counter Component
function Counter({ value, suffix = "", delay = 0 }: { value: number; suffix?: string; delay?: number }) {
  const [display, setDisplay] = useState(0);
  const springValue = useSpring(0, { stiffness: 40, damping: 20 });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        springValue.set(value);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, value, delay, springValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplay(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref} className="font-display">
      {display}{suffix}
    </span>
  );
}

// AIOperatingSystemVisual removed and replaced with NeuralCore
// 4. Main Hero Component
export function Hero() {
  const { smooth } = useMousePosition();
  const { ref, scrollYProgress } = useSmoothScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToNext = () => {
    const el = document.getElementById("services") || document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--bg-primary)] pt-32 pb-24 lg:py-0 z-10"
    >
      {/* Background Grid & Glow (Static/Failsafe) */}
      <div className="absolute inset-0 grid-bg opacity-30 z-0 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Content Container - Always Visible opacity 1 */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[75vh]">
          
          {/* LEFT COLUMN: Typography & CTAs (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center relative z-10 pt-12 lg:pt-0">
            
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-md mb-6 w-fit shadow-[0_0_25px_rgba(124,58,237,0.15)]"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4] animate-pulse" />
              <span className="text-xs font-semibold text-cyan-300 tracking-[0.2em] uppercase font-mono">
                AI & DIGITAL PRODUCT STUDIO
              </span>
            </motion.div>

            {/* Main Editorial Headline - Failsafe Direct Rendering */}
            <h1 className="font-display text-[clamp(2.5rem,9vw,7.2rem)] font-extrabold leading-[1.05] tracking-tight text-white mb-8">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="block"
              >
                WE BUILD
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="block mt-1 text-gradient drop-shadow-[0_0_40px_rgba(124,58,237,0.4)]"
              >
                WHAT'S NEXT.
              </motion.span>
            </h1>

            {/* Supporting Description */}
            <motion.p
              className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-xl leading-relaxed mb-10 font-normal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              NEXORA architects intelligent AI platforms, high-performance digital products, and autonomous systems for the world's most ambitious companies.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-4 mb-12"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Primary CTA */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:scale-105"
              >
                <span className="relative z-10 font-medium text-base">Start a project</span>
                <ArrowUpRight size={18} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
              </a>

              {/* Secondary CTA */}
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-medium rounded-full overflow-hidden transition-all duration-300 hover:border-violet-500/50 hover:bg-white/5"
              >
                <span className="text-base">Explore our work</span>
                <ArrowRight size={18} className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </a>
            </motion.div>

            {/* Integrated Metrics Row */}
            <motion.div
              className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-lg"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white">
                  <Counter value={50} suffix="+" delay={0.9} />
                </div>
                <div className="text-[11px] text-[var(--text-tertiary)] mt-1 font-mono uppercase tracking-wider">Projects Built</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-cyan-400">
                  <Counter value={98} suffix="%" delay={1.0} />
                </div>
                <div className="text-[11px] text-[var(--text-tertiary)] mt-1 font-mono uppercase tracking-wider">Satisfaction</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-violet-400">
                  <Counter value={99} suffix=".9%" delay={1.1} />
                </div>
                <div className="text-[11px] text-[var(--text-tertiary)] mt-1 font-mono uppercase tracking-wider">Uptime</div>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Futuristic AI Operating System Visual & Floating UI (5 Cols) */}
          <div className="absolute inset-0 lg:relative lg:inset-auto lg:col-span-5 flex items-center justify-center pointer-events-none lg:pointer-events-auto z-0 lg:z-10 opacity-70 lg:opacity-100 overflow-hidden lg:overflow-visible">
            <NeuralCore />
          </div>

        </div>
      </div>

      {/* Bottom Center Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors cursor-pointer z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        onClick={scrollToNext}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-mono font-semibold">SCROLL TO EXPLORE</span>
        <div className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1 h-2 bg-cyan-400 rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
