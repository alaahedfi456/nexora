"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useTransform, useMotionValueEvent } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const steps = [
  {
    number: "01", title: "Discover",
    shortDesc: "Understanding before building.",
    detail: "We start with deep discovery: stakeholder interviews, user research, competitive analysis, and technical audits. We map every constraint, opportunity, and success metric before writing a single line of code.",
    icon: "◎", duration: "1–2 weeks",
  },
  {
    number: "02", title: "Strategize",
    shortDesc: "A roadmap that actually works.",
    detail: "We synthesize discovery into a clear product strategy. Prioritized feature sets, technical architecture decisions, risk assessment, and a delivery roadmap with defined milestones.",
    icon: "◈", duration: "1 week",
  },
  {
    number: "03", title: "Design",
    shortDesc: "Interfaces that move people.",
    detail: "From wireframes to pixel-perfect prototypes. We design systematic, accessible interfaces with a clear visual language—validated through user testing before development begins.",
    icon: "◇", duration: "2–3 weeks",
  },
  {
    number: "04", title: "Build",
    shortDesc: "Engineering at velocity.",
    detail: "Iterative development in two-week sprints. Clean code, code reviews, CI/CD pipelines, and weekly demos. You see progress every week, not every quarter.",
    icon: "◆", duration: "4–12 weeks",
  },
  {
    number: "05", title: "Launch",
    shortDesc: "Go-live, without drama.",
    detail: "Staged rollouts, performance monitoring, and real-time error tracking. Launch is not the finish line—it's the starting gun. We stay close through the critical first weeks.",
    icon: "◉", duration: "1 week",
  },
  {
    number: "06", title: "Scale",
    shortDesc: "Built for what comes next.",
    detail: "Post-launch optimization, feature expansion, and ongoing technical partnership. We build systems designed to grow with your ambition—not ones you'll need to replace in 18 months.",
    icon: "⬡", duration: "Ongoing",
  },
];

export function Process() {
  const { ref, smoothProgress } = useSmoothScroll();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (isMobile) return;
    const index = Math.min(
      steps.length - 1,
      Math.max(0, Math.floor(latest * steps.length))
    );
    setActiveIndex(index);
  });

  // Animated progress line
  const lineFillHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // For click-based behavior
  const handleStepClick = (index: number) => {
    if (isMobile) {
      setActiveIndex(index);
    } else {
      // Calculate scroll position on desktop
      if (!ref.current) return;
      const rect = (ref.current as HTMLElement).getBoundingClientRect();
      const scrollTarget = window.scrollY + rect.top + (index / steps.length) * rect.height;
      window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative w-full ${isMobile ? "py-24" : "h-[300vh]"}`}
    >
      {/* We use a sticky container for desktop */}
      <div className={`w-full ${isMobile ? "" : "sticky top-0 h-screen flex flex-col justify-center overflow-hidden"}`}>
        <div className="max-w-7xl mx-auto px-6 w-full h-full flex flex-col pt-24 pb-12">
          <SectionHeading 
            title="How We Work" 
            subtitle="The Process" 
            align="left" 
          />
          
          <div className="mt-12 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start relative h-full">
            
            {/* Left side: Timeline */}
            <div className="relative flex flex-col gap-6 lg:gap-12 h-full justify-center">
              {/* Progress Line */}
              <div className="absolute left-6 top-4 bottom-4 w-px bg-white/10 hidden lg:block">
                <motion.div 
                  className="w-full bg-gradient-to-b from-violet-500 to-cyan-400"
                  style={{ height: lineFillHeight, originY: 0 }}
                />
              </div>

              {steps.map((step, idx) => {
                const isActive = activeIndex === idx;
                const isPast = idx < activeIndex;

                return (
                  <div 
                    key={step.number}
                    onClick={() => handleStepClick(idx)}
                    className={`relative lg:pl-16 cursor-pointer group transition-all duration-500 ${
                      isActive ? "opacity-100" : "opacity-40 hover:opacity-70"
                    }`}
                  >
                    {/* Node */}
                    <div className="absolute left-[24px] top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-800 border-2 border-white/20 transition-all duration-300 z-10 hidden lg:block">
                      {isActive && (
                        <motion.div 
                          layoutId="activeNode"
                          className="absolute inset-0 -m-[2px] rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                        />
                      )}
                      {isPast && !isActive && (
                        <div className="absolute inset-0 -m-[2px] rounded-full bg-violet-500" />
                      )}
                    </div>

                    {/* Card */}
                    <motion.div 
                      className={`p-6 rounded-2xl border transition-all duration-500 ${
                        isActive 
                          ? "glass-strong border-violet-500/50 shadow-[0_0_30px_rgba(139,92,246,0.15)] scale-[1.02]" 
                          : "border-white/5 bg-white/5 scale-100"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`text-2xl font-display font-bold ${isActive ? "text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400" : "text-white/30"}`}>
                          {step.number}
                        </span>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                          <p className="text-sm text-slate-400 mt-1">{step.shortDesc}</p>
                        </div>
                      </div>
                      
                      {/* Mobile detail (accordion style) */}
                      <AnimatePresence>
                        {isMobile && isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="mt-4 text-slate-300 text-sm leading-relaxed">
                              {step.detail}
                            </p>
                            <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-slate-300">
                              <span className="mr-2 text-violet-400">{step.icon}</span>
                              {step.duration}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Right side: Detail Panel (Desktop only) */}
            {!isMobile && (
              <div className="h-full flex flex-col justify-center">
                <div className="glass-strong rounded-3xl p-10 border border-white/10 relative overflow-hidden flex flex-col min-h-[400px]">
                  {/* Background Glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="flex-1 flex flex-col relative z-10"
                    >
                      <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-3xl text-white mb-8 shadow-lg shadow-violet-500/20"
                      >
                        {steps[activeIndex].icon}
                      </motion.div>

                      <div className="overflow-hidden mb-4">
                        <motion.h4 
                          initial={{ y: "100%" }}
                          animate={{ y: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="text-3xl font-display font-bold text-white"
                        >
                          {steps[activeIndex].title}
                        </motion.h4>
                      </div>

                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-lg text-slate-300 leading-relaxed max-w-md"
                      >
                        {steps[activeIndex].detail}
                      </motion.p>

                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="mt-auto pt-8"
                      >
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-slate-200 backdrop-blur-md">
                          <span className="text-cyan-400 mr-2">Duration:</span>
                          {steps[activeIndex].duration}
                        </div>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Segmented Progress Bar */}
                  <div className="mt-12 flex flex-col gap-3 relative z-10">
                    <div className="flex justify-between items-center text-xs font-semibold tracking-wider text-slate-500 uppercase">
                      <span>Process</span>
                      <span>Step {activeIndex + 1} of {steps.length}</span>
                    </div>
                    <div className="flex gap-2">
                      {steps.map((_, i) => (
                        <div key={i} className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden relative">
                          {i <= activeIndex && (
                            <motion.div 
                              className={`absolute inset-0 ${i === activeIndex ? "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" : "bg-violet-500"}`}
                              initial={{ x: "-100%" }}
                              animate={{ x: 0 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
