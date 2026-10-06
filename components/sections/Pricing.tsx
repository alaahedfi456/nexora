"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowUpRight, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const plans = [
  {
    name: "STARTER",
    tagline: "For early-stage products",
    price: "$4,800",
    period: "/ project",
    description: "Perfect for startups validating an idea or building an MVP with limited scope.",
    features: [
      "Up to 4 weeks delivery",
      "1 core feature set",
      "Responsive web application",
      "Basic UI/UX design",
      "Source code delivery",
      "2 rounds of revisions",
      "30-day post-launch support",
    ],
    cta: "Get started",
    highlighted: false,
    color: "#7c3aed",
  },
  {
    name: "GROWTH",
    tagline: "Most popular",
    price: "$14,500",
    period: "/ project",
    description: "For serious product teams ready to build something that competes at the highest level.",
    features: [
      "6–10 weeks delivery",
      "Full-featured product",
      "AI integration included",
      "Premium UI/UX design system",
      "Performance optimization",
      "Unlimited revisions",
      "90-day post-launch support",
      "Monthly strategy call",
      "Dedicated Slack channel",
    ],
    cta: "Start growth plan",
    highlighted: true,
    color: "#7c3aed",
  },
  {
    name: "ENTERPRISE",
    tagline: "For mission-critical systems",
    price: "Custom",
    period: "",
    description: "Fully bespoke engagements for enterprise teams with complex technical and compliance requirements.",
    features: [
      "Dedicated team of specialists",
      "Custom architecture design",
      "On-site workshops available",
      "HIPAA / SOC2 support",
      "SLA guarantees",
      "White-label options",
      "12-month retainer available",
      "Executive reporting",
      "Priority support 24/7",
    ],
    cta: "Contact us",
    highlighted: false,
    color: "#06b6d4",
  },
];

export function Pricing() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  return (
    <section className="section-padding bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionHeading
            label="Pricing"
            title="Transparent investment, exceptional return"
            subtitle="Every engagement is tailored to your goals. Our packages give you a clear starting point."
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-3xl border overflow-hidden transition-all duration-500 ${
                plan.highlighted
                  ? "border-[var(--accent-violet)] lg:-mt-4 lg:-mb-4"
                  : "border-[var(--border)]"
              }`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHoveredPlan(i)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Highlighted badge */}
              {plan.highlighted && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-violet)] to-[var(--accent-cyan)]" />
              )}

              <div
                className={`p-8 h-full ${
                  plan.highlighted
                    ? "bg-[var(--bg-secondary)]"
                    : "bg-[var(--surface)]"
                }`}
              >
                {/* Header */}
                <div className="mb-6">
                  {plan.highlighted && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-violet)] mb-3">
                      <Sparkles size={12} />
                      {plan.tagline}
                    </div>
                  )}
                  {!plan.highlighted && (
                    <div className="text-xs font-semibold tracking-wide text-[var(--text-tertiary)] mb-3">
                      {plan.tagline}
                    </div>
                  )}
                  <div className="font-display text-xs font-bold tracking-[0.2em] uppercase text-[var(--text-tertiary)] mb-2">
                    {plan.name}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className={`font-display text-5xl font-bold ${plan.highlighted ? "text-gradient-static" : "text-[var(--text-primary)]"}`}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-sm text-[var(--text-tertiary)]">{plan.period}</span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8">
                  {plan.description}
                </p>

                {/* CTA */}
                <motion.a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                  className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-sm font-semibold transition-all duration-300 mb-8 ${
                    plan.highlighted
                      ? "bg-[var(--accent-violet)] text-white hover:bg-[var(--accent-violet-light)]"
                      : "bg-[var(--surface)] border border-[var(--border-hover)] text-[var(--text-primary)] hover:border-[var(--accent-violet)]"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.cta}
                  <ArrowUpRight size={16} />
                </motion.a>

                {/* Features */}
                <div className="flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: `${plan.color}20`, border: `1px solid ${plan.color}40` }}
                      >
                        <Check size={10} style={{ color: plan.color }} />
                      </div>
                      <span className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-sm text-[var(--text-tertiary)] mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          All prices are project-based estimates. Final scope and pricing determined during discovery.{" "}
          <a href="#contact" className="text-[var(--accent-violet)] hover:underline" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
            Talk to us
          </a>{" "}
          about your specific needs.
        </motion.p>
      </div>
    </section>
  );
}
