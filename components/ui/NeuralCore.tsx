"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function NeuralCore() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate random nodes
  const nodes = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i * 360) / 12;
    const radius = 100 + Math.random() * 150;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { id: i, x, y };
  });

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-40 lg:opacity-60">
      <div className="relative flex items-center justify-center transform scale-[0.45] sm:scale-75 md:scale-90 lg:scale-100" style={{ width: 600, height: 600 }}>
        
        {/* Central Core */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-32 h-32 bg-primary/20 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-48 h-48 border border-primary/30 rounded-full border-dashed"
        />

        {/* Outer Rings */}
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-96 h-96 border border-white/5 rounded-full"
        />
        
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.02, 1],
          }}
          transition={{
            rotate: {
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }
          }}
          className="absolute w-[500px] h-[500px] border border-primary/10 rounded-full"
        />

        {/* Nodes and Connections */}
        <svg className="absolute inset-0 w-full h-full overflow-visible">
          <defs>
            <radialGradient id="line-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>
          <g className="origin-center" style={{ transformOrigin: 'center' }}>
            {nodes.map((node, i) => (
              <motion.line
                key={`line-${i}`}
                x1="300"
                y1="300"
                x2={300 + node.x}
                y2={300 + node.y}
                stroke="url(#line-gradient)"
                strokeWidth="1"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.1, 0.5, 0.1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}
            
            {/* Connections between nodes */}
            {nodes.map((node, i) => {
              const nextNode = nodes[(i + 1) % nodes.length];
              return (
                <motion.line
                  key={`conn-${i}`}
                  x1={300 + node.x}
                  y1={300 + node.y}
                  x2={300 + nextNode.x}
                  y2={300 + nextNode.y}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.2,
                  }}
                />
              );
            })}
          </g>
        </svg>

        {/* Orbiting Particles */}
        {nodes.map((node, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            initial={{ 
              x: node.x, 
              y: node.y,
              scale: 0
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Data fragments */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = Math.random() * 360;
          const radius = 50 + Math.random() * 200;
          return (
            <motion.div
              key={`data-${i}`}
              className="absolute text-[10px] font-mono text-primary/40"
              initial={{
                x: Math.cos((angle * Math.PI) / 180) * radius,
                y: Math.sin((angle * Math.PI) / 180) * radius,
                opacity: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
                y: `+=${Math.random() > 0.5 ? 20 : -20}`,
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2,
              }}
            >
              {Math.random().toString(36).substring(2, 8).toUpperCase()}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
