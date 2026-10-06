"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({ children, className = "", strength = 0.3 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * strength);
      y.set((e.clientY - centerY) * strength);
    },
    [x, y, strength]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: (e?: React.MouseEvent) => void;
  className?: string;
  magnetic?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  magnetic = false,
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const sizeClasses = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-sm",
    lg: "px-9 py-4.5 text-base",
  };

  const variantClasses = {
    primary: `
      relative overflow-hidden
      bg-[var(--accent-violet)] text-white
      border border-[var(--accent-violet)]
      group
    `,
    secondary: `
      relative overflow-hidden
      bg-transparent text-[var(--text-primary)]
      border border-[var(--border-hover)]
      group
    `,
    ghost: `
      relative overflow-hidden
      bg-transparent text-[var(--text-secondary)]
      border border-transparent
      hover:text-[var(--text-primary)]
      group
    `,
  };

  const baseClasses = `
    inline-flex items-center gap-2.5 rounded-full
    font-medium tracking-wide
    transition-all duration-300
    cursor-pointer select-none
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      // Create ripple effect
      const btn = buttonRef.current;
      if (btn) {
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement("span");
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        ripple.className = "ripple";
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      }
      onClick?.(e);
    },
    [onClick]
  );

  const inner = (
    <motion.button
      ref={buttonRef}
      className={`${baseClasses} ripple-container`}
      onClick={handleClick}
      whileTap={{ scale: 0.97 }}
      whileHover={{
        boxShadow:
          variant === "primary"
            ? "0 0 40px rgba(124,58,237,0.4), 0 0 80px rgba(124,58,237,0.15)"
            : variant === "secondary"
            ? "0 0 30px rgba(255,255,255,0.05)"
            : "none",
      }}
    >
      {/* Gradient overlay on hover */}
      {variant === "primary" && (
        <span className="absolute inset-0 bg-gradient-to-r from-[var(--accent-violet)] to-[var(--accent-violet-light)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      {variant === "secondary" && (
        <span className="absolute inset-0 bg-[var(--surface-hover)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
      )}

      {/* Animated border glow for primary */}
      {variant === "primary" && (
        <motion.span
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "conic-gradient(from 0deg, transparent 60%, rgba(157,92,240,0.6) 80%, transparent 100%)",
            filter: "blur(4px)",
            margin: "-1px",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      )}

      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </motion.button>
  );

  const wrapped = href ? (
    <a href={href} className="inline-block">
      {inner}
    </a>
  ) : (
    inner
  );

  if (magnetic) {
    return <MagneticButton>{wrapped}</MagneticButton>;
  }

  return wrapped;
}
