"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, TrendingUp, Shield, Zap, Activity, BarChart3, ShoppingBag, Cpu, CheckCircle2, Layers } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const projects = [
  {
    number: "01",
    name: "AURA",
    fullName: "AURA Finance",
    category: "AI Finance Platform",
    description: "An intelligent financial operating system powered by AI. Real-time portfolio analytics, risk modeling, and automated compliance reporting for institutional investors.",
    tags: ["AI", "Fintech", "React", "Python", "AWS"],
    year: "2025",
    accentColor: "#7c3aed",
    metrics: ["$2.4B assets managed", "99.97% uptime"],
  },
  {
    number: "02",
    name: "VELORA",
    fullName: "VELORA Commerce",
    category: "Luxury E-commerce",
    description: "A premium digital boutique experience for a global luxury fashion house. Immersive 3D product visualization, AI-powered style recommendations, and a seamless checkout experience.",
    tags: ["E-commerce", "Three.js", "Next.js", "AI", "Stripe"],
    year: "2025",
    accentColor: "#f59e0b",
    metrics: ["380% conversion lift", "42 countries"],
  },
  {
    number: "03",
    name: "SYNQ",
    fullName: "SYNQ Automation",
    category: "AI Business Automation",
    description: "An enterprise-grade AI automation platform that eliminates manual workflows across sales, operations, and customer success. Natural language process orchestration.",
    tags: ["LLMs", "Automation", "TypeScript", "Kubernetes"],
    year: "2024",
    accentColor: "#10b981",
    metrics: ["70% cost reduction", "10,000+ workflows"],
  },
  {
    number: "04",
    name: "NOVA",
    fullName: "NOVA Health",
    category: "Digital Health Platform",
    description: "A clinician-grade digital health platform combining remote patient monitoring, AI diagnostics, and predictive care pathways. Built for scale across healthcare systems.",
    tags: ["HealthTech", "AI", "HIPAA", "React Native"],
    year: "2024",
    accentColor: "#06b6d4",
    metrics: ["50K+ patients", "FDA cleared"],
  },
  {
    number: "05",
    name: "ORBIT",
    fullName: "ORBIT Analytics",
    category: "SaaS Analytics Platform",
    description: "A next-generation business intelligence platform with natural language querying, automated insights, and stunning data visualizations. Analytics for every team, without the technical barrier.",
    tags: ["SaaS", "DataViz", "LLM", "PostgreSQL"],
    year: "2024",
    accentColor: "#f43f5e",
    metrics: ["500+ companies", "4.9/5 rating"],
  },
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const containerVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: (direction: number) => ({
    scale: 0.95,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const visualVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "20%" : "-20%",
    scale: 1.05,
    opacity: 0,
  }),
  center: {
    x: "0%",
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    scale: 0.95,
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

const contentVariants = {
  enter: { opacity: 0, y: 20 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, staggerChildren: 0.05, delayChildren: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const titleVariants = {
  enter: { opacity: 0 },
  center: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.2 },
  },
  exit: { opacity: 0 },
};

const charVariants = {
  enter: { opacity: 0, y: 20 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: { opacity: 0 },
};

function MagneticButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.2;
    const y = (clientY - (top + height / 2)) * 0.2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-colors ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-white/10"
      }`}
    >
      {children}
    </motion.button>
  );
}

// Rich Project Visual Interfaces
function ProjectVisual({ project }: { project: (typeof projects)[0] }) {
  const accent = project.accentColor;

  return (
    <div className="relative w-full h-full p-6 sm:p-8 flex items-center justify-center overflow-hidden bg-slate-950/80">
      {/* Background Gradient & Grid */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[100px] opacity-25 pointer-events-none"
        style={{ backgroundColor: accent }}
      />

      {/* PROJECT 01: AURA (AI Finance Dashboard) */}
      {project.name === "AURA" && (
        <div className="relative w-full max-w-lg glass-strong rounded-2xl border border-white/15 p-5 shadow-2xl backdrop-blur-2xl text-white">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-violet-400" />
              <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">AURA FINANCIAL OS</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE TRADING
            </span>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-[9px] font-mono text-white/50 uppercase">TOTAL ASSETS</div>
              <div className="text-sm font-bold font-mono text-white mt-0.5">$2.48B</div>
              <div className="text-[9px] font-mono text-emerald-400">↑ +14.2%</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-[9px] font-mono text-white/50 uppercase">RISK SCORE</div>
              <div className="text-sm font-bold font-mono text-cyan-300 mt-0.5">0.02</div>
              <div className="text-[9px] font-mono text-cyan-400">OPTIMAL</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-[9px] font-mono text-white/50 uppercase">AI CONFIDENCE</div>
              <div className="text-sm font-bold font-mono text-violet-300 mt-0.5">99.4%</div>
              <div className="text-[9px] font-mono text-violet-400">EXECUTED</div>
            </div>
          </div>

          {/* SVG Growth Line Chart */}
          <div className="relative h-32 w-full bg-white/5 rounded-xl border border-white/10 p-2 overflow-hidden mb-3">
            <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="auraGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d="M 0 80 Q 50 20, 100 60 T 200 30 T 300 50 T 400 10 L 400 100 L 0 100 Z" fill="url(#auraGrad)" />
              <path d="M 0 80 Q 50 20, 100 60 T 200 30 T 300 50 T 400 10" fill="none" stroke="#7c3aed" strokeWidth="3" />
            </svg>
            <div className="absolute top-3 right-3 text-[9px] font-mono text-white/70 bg-black/40 px-2 py-1 rounded">Real-time Yield</div>
          </div>
        </div>
      )}

      {/* PROJECT 02: VELORA (Luxury E-commerce) */}
      {project.name === "VELORA" && (
        <div className="relative w-full max-w-lg glass-strong rounded-2xl border border-white/15 p-5 shadow-2xl backdrop-blur-2xl text-white">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">VELORA BOUTIQUE 3D</span>
            </div>
            <span className="text-[10px] font-mono text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
              3D VIEW ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 items-center">
            {/* Product Graphic */}
            <div className="relative aspect-square rounded-xl bg-gradient-to-tr from-amber-500/20 to-violet-600/20 border border-white/15 flex items-center justify-center overflow-hidden group">
              <motion.div
                animate={{ rotateY: 360, rotateX: 15 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-amber-400 to-violet-500 border border-white/40 shadow-2xl flex items-center justify-center"
              >
                <div className="text-2xl font-bold font-display text-white">V</div>
              </motion.div>
            </div>

            {/* Product Meta */}
            <div>
              <div className="text-[10px] font-mono text-amber-400 tracking-widest uppercase">AUTUMN COLLECTION</div>
              <div className="text-base font-bold font-display text-white mt-1">Atelier No. 04</div>
              <div className="text-lg font-bold font-mono text-amber-300 mt-1">$4,850.00</div>

              <div className="mt-3 flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-400 border border-white" />
                <span className="w-3 h-3 rounded-full bg-violet-600 border border-white/40" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white/40" />
                <span className="text-[9px] text-white/60 ml-1">3 Colors</span>
              </div>

              <button className="w-full mt-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold text-xs rounded-lg shadow-lg">
                AI Style Recommendation (98% Match)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROJECT 03: SYNQ (AI Business Automation) */}
      {project.name === "SYNQ" && (
        <div className="relative w-full max-w-lg glass-strong rounded-2xl border border-white/15 p-5 shadow-2xl backdrop-blur-2xl text-white">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">SYNQ WORKFLOW GRAPH</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/30">
              ORCHESTRATING
            </span>
          </div>

          {/* Workflow Graph Nodes */}
          <div className="grid grid-cols-2 gap-3 relative z-10">
            {[
              { label: "1. TRIGGER", sub: "Webhook Ingest", color: "#10b981" },
              { label: "2. LLM AGENT", sub: "Intent Parsing", color: "#06b6d4" },
              { label: "3. DECISION GATE", sub: "Risk Assessment", color: "#7c3aed" },
              { label: "4. ACTION", sub: "Database Sync", color: "#f59e0b" },
            ].map((node, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold" style={{ color: node.color }}>{node.label}</span>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: node.color }} />
                </div>
                <div className="text-xs font-semibold text-white mt-1">{node.sub}</div>
                <div className="text-[8px] font-mono text-white/50 mt-1">42ms latency</div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs font-mono text-emerald-300">
            <span>10,000+ Automated Tasks Running</span>
            <span>70% Cost Saved</span>
          </div>
        </div>
      )}

      {/* PROJECT 04: NOVA (Digital Health Platform) */}
      {project.name === "NOVA" && (
        <div className="relative w-full max-w-lg glass-strong rounded-2xl border border-white/15 p-5 shadow-2xl backdrop-blur-2xl text-white">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">NOVA HEALTH MONITOR</span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/30">
              FDA CLEARED
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-[9px] font-mono text-white/50">HEART RATE</div>
              <div className="text-base font-bold font-mono text-cyan-300 mt-0.5">82 BPM</div>
              <div className="text-[9px] font-mono text-emerald-400">STABLE</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-[9px] font-mono text-white/50">SpO2</div>
              <div className="text-base font-bold font-mono text-white mt-0.5">99%</div>
              <div className="text-[9px] font-mono text-cyan-400">NORMAL</div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-[9px] font-mono text-white/50">AI RISK</div>
              <div className="text-base font-bold font-mono text-emerald-400 mt-0.5">LOW</div>
              <div className="text-[9px] font-mono text-emerald-300">PREDICTIVE</div>
            </div>
          </div>

          {/* ECG Pulse Wave */}
          <div className="h-24 bg-white/5 rounded-xl border border-white/10 p-2 relative overflow-hidden flex items-center justify-center">
            <svg className="w-full h-16" viewBox="0 0 300 60">
              <path
                d="M 0 30 L 40 30 L 50 10 L 60 50 L 70 30 L 120 30 L 130 5 L 140 55 L 150 30 L 300 30"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.5"
              />
            </svg>
          </div>
        </div>
      )}

      {/* PROJECT 05: ORBIT (SaaS Analytics Platform) */}
      {project.name === "ORBIT" && (
        <div className="relative w-full max-w-lg glass-strong rounded-2xl border border-white/15 p-5 shadow-2xl backdrop-blur-2xl text-white">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">ORBIT ANALYTICS HUB</span>
            </div>
            <span className="text-[10px] font-mono text-rose-400 bg-rose-400/10 px-2 py-0.5 rounded border border-rose-400/30">
              NL QUERY
            </span>
          </div>

          {/* Natural Language Query Bar */}
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 mb-4 flex items-center gap-2 text-xs font-mono text-white/80">
            <span className="text-rose-400 font-bold">{">"}</span>
            <span>"Show Q3 revenue conversion lift by region"</span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="grid grid-cols-5 gap-2 items-end h-28 p-2 rounded-xl bg-white/5 border border-white/10">
            {[45, 70, 85, 60, 95].map((val, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${val}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className="w-full bg-gradient-to-t from-rose-600 to-rose-400 rounded-t"
                />
                <span className="text-[8px] font-mono text-white/50">Q{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Work() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);

  const currentIndex = ((page % projects.length) + projects.length) % projects.length;
  const activeProject = projects[currentIndex];

  const paginate = useCallback((newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  }, [page]);

  // Autoplay
  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        paginate(1);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [isHovered, paginate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      else if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate]);

  return (
    <section id="work" className="relative section-padding overflow-hidden bg-black text-white min-h-screen flex flex-col justify-center">
      {/* Background Atmosphere Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.25, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full blur-[120px]"
            style={{ backgroundColor: activeProject.accentColor }}
          />
        </AnimatePresence>
      </div>

      <div className="container mx-auto relative z-10">
        <SectionHeading title="Selected Work" subtitle="Our Projects" align="left" />

        <div
          className="relative w-full min-h-0 lg:min-h-[560px] rounded-3xl border border-white/10 glass-strong flex flex-col overflow-hidden mt-12 shadow-2xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Content Area */}
          <div className="flex-1 relative overflow-hidden group touch-pan-y">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={containerVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="w-full min-h-0 lg:min-h-[480px] grid grid-cols-1 lg:grid-cols-2 cursor-grab active:cursor-grabbing"
              >
                {/* Left: Rich Abstract UI Mockup Visual */}
                <motion.div variants={visualVariants} custom={direction} className="relative aspect-square sm:aspect-video lg:aspect-auto lg:min-h-[480px] border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden">
                  <ProjectVisual project={activeProject} />
                </motion.div>

                {/* Right: Project Info & Metrics */}
                <motion.div variants={contentVariants} className="p-8 lg:p-12 flex flex-col justify-between relative bg-slate-950/40">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <motion.span variants={contentVariants} className="text-xs font-mono text-white/50 tracking-widest uppercase">{activeProject.number} / 05</motion.span>
                      <motion.span variants={contentVariants} className="text-xs font-mono px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/80">
                        {activeProject.year}
                      </motion.span>
                    </div>

                    <motion.div variants={contentVariants} className="text-xs font-mono uppercase tracking-widest mb-2 font-semibold" style={{ color: activeProject.accentColor }}>
                      {activeProject.category}
                    </motion.div>

                    <motion.h3 variants={titleVariants} className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 flex flex-wrap">
                      {activeProject.fullName.split('').map((char, i) => (
                        <motion.span key={i} variants={charVariants} className="inline-block relative">
                          {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                      ))}
                    </motion.h3>

                    <motion.p variants={contentVariants} className="text-base text-white/70 leading-relaxed mb-6 font-light">
                      {activeProject.description}
                    </motion.p>

                    {/* Metrics Row */}
                    <motion.div variants={contentVariants} className="flex flex-wrap gap-4 mb-6">
                      {activeProject.metrics.map((metric, i) => (
                        <div key={i} className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white font-medium flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeProject.accentColor }} />
                          {metric}
                        </div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Tags & Action Link */}
                  <motion.div variants={contentVariants} className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div className="flex flex-wrap gap-2">
                      {activeProject.tags.map((tag) => (
                        <span key={tag} className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/5 text-white/60 border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href="#contact"
                      className="group/link flex items-center gap-2 text-sm font-semibold text-white hover:text-cyan-400 transition-colors"
                    >
                      View Case Study
                      <ArrowUpRight size={16} className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                    </a>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Navigation & Progress Bar */}
          <div className="p-6 border-t border-white/10 bg-slate-950/80 backdrop-blur-md flex items-center justify-between">
            {/* Segmented Progress Bar */}
            <div className="flex-1 max-w-xs flex gap-2">
              {projects.map((p, idx) => (
                <button
                  key={p.name}
                  onClick={() => setPage([idx, idx > currentIndex ? 1 : -1])}
                  className="h-1.5 flex-1 rounded-full overflow-hidden bg-white/10 transition-all"
                >
                  <div
                    className="h-full transition-all duration-500 rounded-full"
                    style={{
                      width: idx === currentIndex ? "100%" : "0%",
                      backgroundColor: activeProject.accentColor,
                      boxShadow: idx === currentIndex ? `0 0 10px ${activeProject.accentColor}` : "none",
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-3">
              <MagneticButton onClick={() => paginate(-1)}>
                <ArrowLeft size={18} />
              </MagneticButton>
              <MagneticButton onClick={() => paginate(1)}>
                <ArrowRight size={18} />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
