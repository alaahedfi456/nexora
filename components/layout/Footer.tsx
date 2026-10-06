"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

const Twitter = ({ size = 24 }: { size?: number }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const Linkedin = ({ size = 24 }: { size?: number }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
const Github = ({ size = 24 }: { size?: number }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>;
const Instagram = ({ size = 24 }: { size?: number }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;


const footerLinks = {
  Navigation: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  Services: [
    { label: "AI & Machine Learning", href: "#services" },
    { label: "Web Engineering", href: "#services" },
    { label: "SaaS Products", href: "#services" },
    { label: "UI/UX Design", href: "#services" },
    { label: "Automation", href: "#services" },
    { label: "Cloud Infrastructure", href: "#services" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const socials = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--bg-primary)]">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[var(--accent-violet)] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-[var(--border)]">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="font-display text-2xl font-bold tracking-wider text-[var(--text-primary)] mb-4">
              NEX<span className="text-[var(--accent-violet)]">ORA</span>
            </div>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-sm mb-6">
              We craft exceptional digital products and AI-powered experiences that define the future. Your vision, engineered to perfection.
            </p>

            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded-full px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] outline-none focus:border-[var(--accent-violet)] transition-colors duration-200"
              />
              <button className="flex items-center gap-1.5 px-4 py-2.5 bg-[var(--accent-violet)] text-white text-sm font-medium rounded-full hover:bg-[var(--accent-violet-light)] transition-colors duration-200 whitespace-nowrap">
                Subscribe
                <ArrowUpRight size={14} />
              </button>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--text-tertiary)] mb-5">
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 animated-underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs text-[var(--text-tertiary)]">
            © 2025 NEXORA Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="mailto:hello@nexora.studio" className="flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200">
              <Mail size={12} />
              hello@nexora.studio
            </a>
            <span className="text-xs text-[var(--text-tertiary)]">
              Built with precision ·{" "}
              <span className="text-[var(--accent-violet)]">NEXORA</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
