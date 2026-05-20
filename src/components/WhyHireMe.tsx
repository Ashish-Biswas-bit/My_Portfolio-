"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import {
  FiZap,
  FiCode,
  FiClock,
  FiMessageCircle,
  FiLayers,
  FiShield,
} from "react-icons/fi";

const reasons = [
  {
    icon: FiCode,
    title: "Clean & Scalable Code",
    description:
      "I write well-structured, maintainable code following best practices and design patterns — no messy shortcuts.",
    color: "#00f5ff",
  },
  {
    icon: FiZap,
    title: "Fast Delivery",
    description:
      "I work with focus and efficiency, delivering high-quality results within tight deadlines without compromising standards.",
    color: "#ff00ff",
  },
  {
    icon: FiLayers,
    title: "Full Stack Versatility",
    description:
      "From frontend UI to backend APIs to desktop apps and games — I handle the entire stack so you need only one developer.",
    color: "#7b2ff7",
  },
  {
    icon: FiMessageCircle,
    title: "Clear Communication",
    description:
      "I keep you in the loop at every stage with regular updates, transparent timelines, and responsive availability.",
    color: "#00d4ff",
  },
  {
    icon: FiShield,
    title: "Reliable & Accountable",
    description:
      "I take ownership of every project. If something isn't right, I fix it — your satisfaction is my priority.",
    color: "#f59e0b",
  },
  {
    icon: FiClock,
    title: "Long-Term Partnership",
    description:
      "I don't just build and disappear. I offer ongoing support, maintenance, and feature updates after delivery.",
    color: "#10b981",
  },
];

export default function WhyHireMe() {
  return (
    <SectionWrapper id="why-hire-me">
      <h2 className="section-title">
        Why <span className="neon-text">Hire Me</span>
      </h2>
      <p className="section-subtitle">
        What sets me apart and why clients choose to work with me
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, i) => (
          <motion.div
            key={reason.title}
            className="glass p-7 relative overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
          >
            {/* Icon */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-5 transition-transform duration-300 group-hover:scale-110"
              style={{
                background: `${reason.color}12`,
                color: reason.color,
                border: `1px solid ${reason.color}25`,
              }}
            >
              <reason.icon />
            </div>

            {/* Content */}
            <h3 className="text-white text-lg font-bold mb-2">
              {reason.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {reason.description}
            </p>

            {/* Number watermark */}
            <span className="absolute top-4 right-5 text-5xl font-black text-white/[0.03] select-none">
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Hover glow */}
            <div
              className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
              style={{ background: `${reason.color}08` }}
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom highlight bar */}
      <motion.div
        className="mt-12 glass p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-gray-300 text-sm text-center sm:text-left">
          Ready to bring your project to life? Let&rsquo;s discuss how I can help
          you achieve your goals.
        </p>
        <a
          href="#contact"
          className="btn-primary whitespace-nowrap px-8 py-3 text-sm"
        >
          Get in Touch
        </a>
      </motion.div>
    </SectionWrapper>
  );
}
