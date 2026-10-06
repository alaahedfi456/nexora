"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Brain, Code2, Package, Palette, Zap, Cloud, ArrowUpRight, LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const services = [
  {
    number: "01", icon: Brain, title: "AI & Machine Learning",
    shortDesc: "Intelligent systems that learn, adapt, and evolve.",
    longDesc: "We build custom AI solutions—from computer vision and NLP to predictive analytics. We architect ML pipelines, train models, and integrate intelligence at every layer of your product.",
    tags: ["LLMs", "Computer Vision", "MLOps", "Predictive Analytics"],
    color: "#7c3aed", gradient: "from-violet-600/20 to-violet-900/5",
  },
  {
    number: "02", icon: Code2, title: "Web & Product Engineering",
    shortDesc: "Full-stack engineering with craft-level attention.",
    longDesc: "Production-grade applications built with modern stacks. We move fast without breaking things—delivering scalable, maintainable code that powers ambitious products.",
    tags: ["Next.js", "TypeScript", "APIs", "Performance"],
    color: "#06b6d4", gradient: "from-cyan-600/20 to-cyan-900/5",
  },
  {
    number: "03", icon: Package, title: "SaaS & Digital Products",
    shortDesc: "Zero to launch, and beyond.",
    longDesc: "We turn product ideas into market-ready SaaS platforms. From architecture to subscription billing, we handle the full product lifecycle with a founder's mindset.",
    tags: ["Product Strategy", "SaaS", "Stripe", "Analytics"],
    color: "#f43f5e", gradient: "from-rose-600/20 to-rose-900/5",
  },
  {
    number: "04", icon: Palette, title: "UI/UX & Creative Design",
    shortDesc: "Design that commands attention and drives action.",
    longDesc: "Award-caliber interfaces combining visual beauty with behavioral science. We design systems that make users feel something—and come back for more.",
    tags: ["Design Systems", "Prototyping", "Motion", "Brand"],
    color: "#f59e0b", gradient: "from-amber-600/20 to-amber-900/5",
  },
  {
    number: "05", icon: Zap, title: "Automation & Intelligent Systems",
    shortDesc: "Eliminate friction. Multiply output.",
    longDesc: "We automate your most complex workflows using AI agents, RPA, and intelligent orchestration. Cut operational costs and unlock scale without headcount.",
    tags: ["AI Agents", "Workflow", "RPA", "Integration"],
    color: "#10b981", gradient: "from-emerald-600/20 to-emerald-900/5",
  },
  {
    number: "06", icon: Cloud, title: "Cloud & Digital Infrastructure",
    shortDesc: "Infrastructure built for the next decade.",
    longDesc: "We design resilient, cost-efficient cloud architectures on AWS, GCP, and Azure. CI/CD pipelines, Kubernetes clusters, and observability stacks—done right.",
    tags: ["AWS", "Kubernetes", "CI/CD", "Observability"],
    color: "#3b82f6", gradient: "from-blue-600/20 to-blue-900/5",
  },
];

const AnimatedIcon = ({ icon: Icon, isActive, color, title }: { icon: LucideIcon, isActive: boolean, color: string, title: string }) => {
  let animation: any = {};
  
  if (isActive) {
    if (title === "AI & Machine Learning") animation = { scale: [1, 1.15, 1], transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } };
    else if (title === "Web & Product Engineering") animation = { rotate: [-10, 10, -10], transition: { repeat: Infinity, duration: 0.5, ease: "easeInOut" } };
    else if (title === "SaaS & Digital Products") animation = { y: [0, -4, 0], transition: { repeat: Infinity, duration: 1, ease: "easeInOut" } };
    else if (title === "UI/UX & Creative Design") animation = { rotate: 360, transition: { repeat: Infinity, duration: 3, ease: "linear" } };
    else if (title === "Automation & Intelligent Systems") animation = { opacity: [0.5, 1, 0.5], transition: { repeat: Infinity, duration: 0.2, ease: "easeInOut" } };
    else if (title === "Cloud & Digital Infrastructure") animation = { y: [-3, 3, -3], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } };
  } else {
    animation = { scale: 1, rotate: 0, y: 0, opacity: 1, transition: { duration: 0.3 } };
  }

  return (
    <motion.div animate={animation}>
      <Icon className="w-6 h-6" style={{ color }} />
    </motion.div>
  );
};

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="services" ref={sectionRef} className="py-24 relative section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Sticky Column */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-32">
            
            {/* Ambient Glow background */}
            <div className="absolute -inset-20 -z-10 pointer-events-none blur-[100px] opacity-30">
               <AnimatePresence mode="wait">
                  {hoveredIndex !== null && (
                     <motion.div
                       key={hoveredIndex}
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       exit={{ opacity: 0 }}
                       transition={{ duration: 0.5, ease: "easeOut" }}
                       className="absolute inset-0 rounded-full"
                       style={{ backgroundColor: services[hoveredIndex].color }}
                     />
                  )}
               </AnimatePresence>
            </div>

            <SectionHeading 
              label="Our Expertise"
              title="Capabilities"
              subtitle="We engineer solutions that give our clients an unfair advantage."
              align="left"
            />

            {/* Focus Area / Visual Representation */}
            <div className="mt-12 h-48 relative flex items-center justify-center border border-white/5 rounded-2xl bg-black/20 overflow-hidden glass-subtle">
               <AnimatePresence mode="wait">
                 {hoveredIndex !== null ? (
                   <motion.div
                     key={hoveredIndex}
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.8 }}
                     transition={{ duration: 0.4, ease: "easeOut" }}
                     className="relative flex items-center justify-center w-full h-full"
                   >
                     {/* Rotating ring */}
                     <motion.div 
                       animate={{ rotate: 360 }}
                       transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                       className="absolute w-32 h-32 rounded-full border border-dashed opacity-50"
                       style={{ borderColor: services[hoveredIndex].color }}
                     />
                     {/* Morphing shape behind */}
                     <div 
                       className="absolute w-24 h-24 morph-shape opacity-60 mix-blend-screen"
                       style={{ backgroundColor: services[hoveredIndex].color, filter: 'blur(12px)' }}
                     />
                     {/* Solid shape front */}
                     <div 
                       className="absolute w-12 h-12 morph-shape shadow-2xl"
                       style={{ backgroundColor: services[hoveredIndex].color }}
                     />
                   </motion.div>
                 ) : (
                   <motion.div
                     key="empty"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.3 }}
                     className="text-white/20 text-sm font-medium tracking-widest uppercase"
                   >
                     Select a service
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Right Content Column */}
        <div className="lg:col-span-7 flex flex-col gap-4">
           {services.map((service, idx) => {
             const isActive = hoveredIndex === idx;
             const isOtherHovered = hoveredIndex !== null && hoveredIndex !== idx;

             return (
               <motion.div
                 key={idx}
                 onMouseEnter={() => setHoveredIndex(idx)}
                 onMouseLeave={() => setHoveredIndex(null)}
                 onClick={() => setHoveredIndex(isActive ? null : idx)}
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ 
                   opacity: isOtherHovered ? 0.4 : 1,
                   scale: isActive ? 1.02 : (isOtherHovered ? 0.98 : 1),
                   filter: isOtherHovered ? 'blur(1px)' : 'blur(0px)',
                   y: isInView ? 0 : 30,
                 }}
                 transition={{ duration: 0.4, ease: "easeOut", delay: isInView ? idx * 0.05 : 0 }}
                 className={`relative rounded-2xl border transition-colors duration-400 overflow-hidden glass ${isActive ? 'bg-white/10' : 'bg-white/5'}`}
                 style={{
                   borderColor: isActive ? service.color : 'rgba(255,255,255,0.05)'
                 }}
               >
                 {/* Card Content */}
                 <div className="p-6 sm:p-8">
                   <div className="flex items-start justify-between gap-4">
                     <div className="flex gap-4 sm:gap-6">
                        {/* Icon Container */}
                        <motion.div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-colors duration-400"
                          style={{
                            backgroundColor: isActive ? `${service.color}20` : 'rgba(255,255,255,0.05)',
                            borderColor: isActive ? `${service.color}40` : 'rgba(255,255,255,0.1)'
                          }}
                        >
                          <AnimatedIcon 
                            icon={service.icon} 
                            isActive={isActive} 
                            color={isActive ? service.color : "rgba(255,255,255,0.5)"} 
                            title={service.title} 
                          />
                        </motion.div>
                        
                        <div>
                          <div className="flex items-center gap-3 sm:gap-4 mb-2">
                            <span className="text-white/40 font-mono text-sm hidden sm:inline-block">{service.number}</span>
                            <h3 className="text-lg sm:text-xl font-semibold text-white">{service.title}</h3>
                          </div>
                          <p className="text-white/60 text-sm">{service.shortDesc}</p>
                        </div>
                     </div>

                     {/* Arrow Button */}
                     <motion.div 
                       animate={{ rotate: isActive ? 45 : 0 }}
                       transition={{ duration: 0.3, ease: "easeOut" }}
                       className="w-10 h-10 rounded-full hidden sm:flex items-center justify-center border shrink-0 transition-colors duration-400"
                       style={{
                         borderColor: isActive ? service.color : 'rgba(255,255,255,0.1)',
                         backgroundColor: isActive ? `${service.color}10` : 'rgba(255,255,255,0.05)'
                       }}
                     >
                       <ArrowUpRight 
                         className="w-5 h-5 transition-colors duration-400" 
                         style={{ color: isActive ? service.color : "rgba(255,255,255,0.5)" }} 
                       />
                     </motion.div>
                   </div>

                   {/* Expanded Description */}
                   <motion.div
                     initial={false}
                     animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                     className="overflow-hidden"
                   >
                     <div className="pt-6 sm:pl-[72px]">
                       <motion.p 
                         initial={{ y: 10, opacity: 0 }}
                         animate={{ y: isActive ? 0 : 10, opacity: isActive ? 1 : 0 }}
                         transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                         className="text-white/70 mb-6 text-sm leading-relaxed"
                       >
                         {service.longDesc}
                       </motion.p>
                       
                       <div className="flex flex-wrap gap-2">
                         {service.tags.map((tag, tIdx) => (
                           <motion.span
                             key={tIdx}
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                             transition={{ 
                               type: "spring", 
                               stiffness: 300, 
                               damping: 20, 
                               delay: isActive ? 0.15 + tIdx * 0.05 : 0 
                             }}
                             className="px-3 py-1 rounded-full text-xs font-medium border text-white/80 transition-colors duration-400"
                             style={{
                               borderColor: isActive ? `${service.color}30` : 'rgba(255,255,255,0.1)',
                               backgroundColor: isActive ? `${service.color}10` : 'rgba(255,255,255,0.05)'
                             }}
                           >
                             {tag}
                           </motion.span>
                         ))}
                       </div>
                     </div>
                   </motion.div>
                 </div>
               </motion.div>
             )
           })}
        </div>
      </div>
    </section>
  )
}
