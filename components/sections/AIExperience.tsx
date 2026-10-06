"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { Terminal, Cpu, Network, Database, Lock, Zap, BarChart, BrainCircuit, Activity, Globe, Code, Layers } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

// --- DATA ---

// Neural nodes data removed for AI Core Activation sequence

const TERMINAL_MSGS = [
  "Initializing Neural Core v4.2...",
  "Loading Weights [94%]...",
  "Optimizing Parameters...",
  "Syncing Edge Nodes...",
  "RAG Context Built successfully.",
  "Model Checkpoint Saved.",
  "Processing Stream...",
  "Scaling Compute Resources...",
  "Detecting Anomalies... None found.",
  "Connection established with Nexus."
];

const METRICS = [
  { id: 'm1', label: 'Inference Speed', value: 98, color: 'from-violet-500 to-fuchsia-500' },
  { id: 'm2', label: 'Model Accuracy', value: 94, color: 'from-cyan-500 to-blue-500' },
  { id: 'm3', label: 'Data Processing', value: 99, color: 'from-emerald-500 to-teal-500' },
  { id: 'm4', label: 'System Uptime', value: 100, color: 'from-amber-500 to-orange-500' },
];

const CAPABILITIES = [
  { id: 'c1', icon: BrainCircuit, label: 'Deep Learning' },
  { id: 'c2', icon: Database, label: 'Vector DB' },
  { id: 'c3', icon: Activity, label: 'Real-time' },
  { id: 'c4', icon: Lock, label: 'Secure Enclave' },
  { id: 'c5', icon: Network, label: 'Distributed' },
  { id: 'c6', icon: Cpu, label: 'Edge Compute' },
  { id: 'c7', icon: Layers, label: 'Multi-modal' },
  { id: 'c8', icon: Zap, label: 'Low Latency' },
];

// --- SUB-COMPONENTS ---

function AnimatedNumber({ value, inView }: { value: number, inView: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const startTime = performance.now();
      
      const updateValue = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeOutExpo)
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setDisplayValue(Math.floor(easeProgress * value));
        
        if (progress < 1) {
          requestAnimationFrame(updateValue);
        }
      };
      
      requestAnimationFrame(updateValue);
    } else {
      setDisplayValue(0);
    }
  }, [value, inView]);

  return <span>{displayValue}%</span>;
}

function DataStream() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % TERMINAL_MSGS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-6 left-6 max-w-sm w-full font-mono text-xs z-10 hidden md:block">
      <div className="glass glass-subtle rounded-lg p-3 border border-white/10 shadow-lg backdrop-blur-md overflow-hidden">
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5">
          <Terminal className="w-3 h-3 text-cyan-400" />
          <span className="text-white/50">SYSTEM_LOGS</span>
          <div className="ml-auto flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-amber-500/50" />
            <div className="w-2 h-2 rounded-full bg-green-500/50" />
          </div>
        </div>
        
        <div className="h-6 relative">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={msgIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center text-cyan-300"
            >
              <span className="text-emerald-400 mr-2">{">"}</span>
              {TERMINAL_MSGS[msgIndex]}
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-1.5 h-3.5 bg-cyan-400 ml-1 translate-y-0.5"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function CodeStream({ side, inView }: { side: 'left' | 'right', inView: boolean }) {
  const snippets = side === 'left' ? [
    "0x0012: MEMORY_ALLOC",
    "init_weights(1024)",
    "layer_4 -> active",
    "param_sync: OK",
    "SYS_READY"
  ] : [
    "hash: a9f38c",
    "token_limit: MAX",
    "vector_search()...",
    "latency: 12ms",
    "CONNECTION: ESTABLISHED"
  ];
  return (
    <div className={`absolute ${side === 'left' ? 'left-6' : 'right-6'} top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-6 font-mono text-[10px] text-cyan-400/80 z-20`}>
      {snippets.map((text, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, width: 0 }}
          animate={inView ? { opacity: 1, width: "100%" } : { opacity: 0, width: 0 }}
          transition={{ duration: 0.8, delay: 0.5 + i * 0.3 }}
          className="whitespace-nowrap overflow-hidden border-r-2 border-cyan-400/50 pr-1"
          style={{ width: "fit-content" }}
        >
          {text}
        </motion.div>
      ))}
    </div>
  );
}

function AICoreVisual({ inView, scrollYProgress }: { inView: boolean, scrollYProgress: any }) {
  // Orb pulse in sync with scroll
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Central Glowing Orb */}
      <motion.div 
        style={{ scale: orbScale, opacity: orbOpacity }}
        className="absolute w-40 h-40 bg-cyan-400/30 rounded-full blur-2xl z-0"
      />
      <motion.div 
        style={{ scale: orbScale }}
        className="absolute w-24 h-24 bg-white/10 rounded-full shadow-[0_0_50px_rgba(34,211,238,0.5)] backdrop-blur-md border border-white/20 flex items-center justify-center z-20"
      >
        <Cpu className="w-10 h-10 text-cyan-300 animate-pulse" />
      </motion.div>

      {/* Processing Rings */}
      <motion.div
        animate={inView ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-72 h-72 border-2 border-dashed border-violet-500/40 rounded-full z-10"
      />
      <motion.div
        animate={inView ? { rotate: -360 } : { rotate: 0 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-96 h-96 border border-cyan-500/20 rounded-full z-10 flex items-center justify-center"
      >
        <div className="w-full h-full rounded-full border-t-2 border-cyan-400/80 absolute" />
      </motion.div>
      
      <motion.div
        animate={inView ? { rotate: 180 } : { rotate: 0 }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-48 h-48 border border-white/10 rounded-full z-10 flex items-center justify-center"
      >
        <div className="w-3 h-3 rounded-full bg-violet-400 absolute top-0" />
        <div className="w-3 h-3 rounded-full bg-cyan-400 absolute bottom-0" />
      </motion.div>

      {/* NEURAL ENGINE ACTIVE Text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="absolute bottom-12 z-30 flex flex-col items-center"
      >
        <span className="text-cyan-300 font-mono tracking-[0.5em] text-sm font-bold shadow-cyan-400/50 drop-shadow-lg">
          NEURAL ENGINE ACTIVE
        </span>
        <div className="w-48 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-3 opacity-50" />
      </motion.div>

      {/* Code Snippets Left and Right */}
      <CodeStream side="left" inView={inView} />
      <CodeStream side="right" inView={inView} />
    </div>
  )
}

// --- MAIN COMPONENT ---

export function AIExperience() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const inView = useInView(sectionRef, { once: false, margin: "-10%" });
  
  // Parallax effects
  const yShift = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacityGrid = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 0.3]);

  // Particles
  const particles = Array.from({ length: 12 });

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden section-padding">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="mb-16">
          <SectionHeading 
            title="Immersive AI Architecture" 
            subtitle="Step inside the neural network powering our platform. Real-time data processing meets elegant architecture."
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* VISUAL PANEL (2/3) */}
          <motion.div 
            className="lg:col-span-2 relative h-[500px] lg:h-[600px] rounded-2xl glass-strong border border-white/10 overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Animated Grid Underlay */}
            <motion.div 
              className="absolute inset-0 grid-bg-animated opacity-50"
              style={{ opacity: opacityGrid }}
            />
            
            {/* Soft Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-violet-500/20 rounded-full blur-[100px] pointer-events-none" />

            <DataStream />

            {/* AI Core Visual component */}
            <AICoreVisual inView={inView} scrollYProgress={scrollYProgress} />

            {/* Particle Effects */}
            {mounted && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 12 }, (_, i) => {
                  const x = `${(i * 29 + 13) % 100}%`;
                  const duration = 10 + ((i * 7) % 10);
                  const delay = (i * 1.3) % 5;
                  return (
                    <motion.div
                      key={`particle-${i}`}
                      className="absolute w-1 h-1 bg-white/30 rounded-full"
                      style={{ left: x }}
                      initial={{ 
                        y: "110%",
                        opacity: 0
                      }}
                      animate={inView ? {
                        y: "-10%",
                        opacity: [0, 0.5, 0]
                      } : {}}
                      transition={{
                        duration,
                        repeat: Infinity,
                        delay,
                        ease: "linear"
                      }}
                    />
                  );
                })}
              </div>
            )}
            
          </motion.div>

          {/* METRICS PANEL (1/3) */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            
            {/* Bars Box */}
            <motion.div 
              className="glass-strong rounded-2xl p-6 border border-white/10 flex-1 flex flex-col justify-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h3 className="text-lg font-display font-medium text-white mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-violet-400" />
                Live Telemetry
              </h3>
              
              <div className="space-y-5">
                {METRICS.map((metric, i) => (
                  <div key={metric.id}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/70">{metric.label}</span>
                      <span className="text-white font-mono font-medium">
                        <AnimatedNumber value={metric.value} inView={inView} />
                      </span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full bg-gradient-to-r ${metric.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${metric.value}%` } : { width: 0 }}
                        transition={{ duration: 1.5, delay: 0.4 + i * 0.1, type: "spring", bounce: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Capabilities Grid */}
            <motion.div 
              className="glass-strong rounded-2xl p-6 border border-white/10"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="grid grid-cols-2 gap-3">
                {CAPABILITIES.map((cap, i) => {
                  const Icon = cap.icon;
                  return (
                    <motion.div 
                      key={cap.id}
                      className="glass glass-subtle rounded-xl p-3 flex flex-col items-center justify-center gap-2 text-center border border-white/5 hover:border-violet-500/30 transition-colors"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                      transition={{ 
                        type: "spring", stiffness: 200, damping: 15,
                        delay: 0.6 + i * 0.05 
                      }}
                    >
                      <Icon className="w-5 h-5 text-cyan-400" />
                      <span className="text-xs text-white/80 font-medium">{cap.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}
