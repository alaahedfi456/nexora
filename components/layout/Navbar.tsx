"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 160) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[rgba(5,5,10,0.85)] backdrop-blur-xl border-b border-[var(--border)]"
            : "py-6"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
            className="relative z-10"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <span className="font-display text-xl font-bold tracking-wider text-[var(--text-primary)]">
              NEX<span className="text-[var(--accent-violet)]">ORA</span>
            </span>
          </motion.a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                  activeSection === link.href.slice(1)
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
                whileHover={{ y: -1 }}
                transition={{ duration: 0.15 }}
              >
                {activeSection === link.href.slice(1) && (
                  <motion.span
                    className="absolute inset-0 bg-[var(--surface)] rounded-lg border border-[var(--border)]"
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent-violet)] text-white text-sm font-medium rounded-full hover:bg-[var(--accent-violet-light)] transition-colors duration-200"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Start a project
              <ArrowUpRight size={14} />
            </motion.a>
          </div>

          {/* Mobile menu toggle */}
          <motion.button
            className="md:hidden relative z-10 w-10 h-10 flex items-center justify-center text-[var(--text-primary)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[rgba(5,5,10,0.98)] backdrop-blur-2xl flex flex-col items-center justify-center"
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col items-center gap-2 w-full px-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="w-full text-center py-4 text-3xl font-display font-bold text-[var(--text-primary)] border-b border-[var(--border)] hover:text-[var(--accent-violet)] transition-colors duration-200"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
                className="mt-8 flex items-center gap-2 px-8 py-4 bg-[var(--accent-violet)] text-white text-lg font-medium rounded-full"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.4, delay: navLinks.length * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                Start a project
                <ArrowUpRight size={18} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
