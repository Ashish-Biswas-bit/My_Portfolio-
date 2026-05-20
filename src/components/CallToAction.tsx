"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function CallToAction() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <motion.h2
          className="text-3xl md:text-5xl font-extrabold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Have a project in mind?
        </motion.h2>

        <motion.p
          className="text-gray-400 max-w-lg mx-auto mb-10 text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Let&rsquo;s collaborate and turn your ideas into reality. I&rsquo;m
          always open to discussing new projects and creative challenges.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <a
            href="#contact"
            className="btn-primary px-10 py-4 text-lg inline-flex items-center justify-center gap-2 group"
          >
            Start a Conversation
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="https://github.com/ashishbiswas"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline px-10 py-4 text-lg inline-flex items-center justify-center"
          >
            View GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
