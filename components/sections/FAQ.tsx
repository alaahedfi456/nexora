"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines depend on scope. An MVP or focused feature set typically takes 3–6 weeks. A full-scale product with AI integration usually runs 8–14 weeks. We'll give you a precise timeline after our discovery session.",
  },
  {
    question: "Do you work with early-stage startups?",
    answer:
      "Absolutely. Some of our most exciting work has been with seed-stage founders who have a clear vision but need a technical partner to bring it to life. We understand the constraints of early-stage and can help you prioritize ruthlessly.",
  },
  {
    question: "Can you work with our existing team?",
    answer:
      "Yes. We frequently embed with in-house engineering and product teams. Whether you need us to lead development or collaborate as specialist contributors, we adapt to your workflow.",
  },
  {
    question: "What does the discovery process look like?",
    answer:
      "Discovery is a structured 1–2 week phase where we run stakeholder interviews, map user journeys, audit any existing systems, and produce a technical architecture proposal and project roadmap. It ensures we build the right thing before building it right.",
  },
  {
    question: "Do you offer ongoing retainer support after launch?",
    answer:
      "Yes. Post-launch support ranges from included bug-fix periods (30–90 days depending on plan) to dedicated monthly retainers for ongoing development, scaling, and optimization. We're in it for the long game.",
  },
  {
    question: "What happens if we need to change scope mid-project?",
    answer:
      "Scope changes are handled through a transparent change request process. We document what changed, the impact on timeline and budget, and get sign-off before continuing. No hidden costs, no surprises.",
  },
  {
    question: "Do you sign NDAs?",
    answer:
      "Yes, always. Confidentiality is fundamental. We sign NDA agreements as part of our standard onboarding process before any sensitive project details are shared.",
  },
];

interface FAQItemProps {
  faq: (typeof faqs)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ faq, index, isOpen, onToggle }: FAQItemProps) {
  return (
    <motion.div
      className="border-b border-[var(--border)] last:border-0"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        className="w-full flex items-center justify-between gap-4 py-6 text-left group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={`font-medium text-base transition-colors duration-200 ${isOpen ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"}`}>
          {faq.question}
        </span>
        <motion.div
          className="shrink-0 w-7 h-7 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-tertiary)] group-hover:border-[var(--accent-violet)] group-hover:text-[var(--accent-violet)] transition-all duration-200"
          animate={{ rotate: isOpen ? 0 : 0 }}
        >
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed pb-6 max-w-2xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex((current) => (current === i ? null : i));
  };

  return (
    <section className="section-padding bg-[var(--bg-secondary)]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionHeading
            label="FAQ"
            title="Questions, answered."
            align="center"
          />
        </div>

        <div className="divide-y divide-[var(--border)] border border-[var(--border)] rounded-3xl bg-[var(--bg-primary)] overflow-hidden px-8">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
