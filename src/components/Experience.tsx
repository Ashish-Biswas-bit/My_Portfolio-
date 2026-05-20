"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { FiCode, FiBookOpen, FiTrendingUp, FiAward } from "react-icons/fi";
import { db } from "@/lib/firebase-db";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import type { ExperienceData } from "@/lib/useFirestore";

// ...existing code...

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);

  useEffect(() => {
    const q = query(collection(db, "experience"), orderBy("order"));
    const unsub = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        setExperiences(snap.docs.map((d) => d.data() as ExperienceData));
      }
    }, () => {});
    return () => unsub();
  }, []);

  return (
    <SectionWrapper id="experience">
      <h2 className="section-title">
        My <span className="neon-text">Journey</span>
      </h2>
      <p className="section-subtitle">
        A timeline of my development journey and professional growth
      </p>

      <div className="relative max-w-3xl mx-auto">
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent-purple to-accent-pink -translate-x-1/2 hidden md:block" />
        {/* Mobile line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent-purple to-accent-pink md:hidden" />

        {experiences.map((exp: ExperienceData, i: number) => (
          <motion.div
            key={exp.role + exp.period}
            className={`relative flex items-start mb-12 last:mb-0 ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            {/* Timeline dot */}
            <motion.div
              className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10"
              style={{
                backgroundColor: exp.color,
                boxShadow: `0 0 15px ${exp.color}80`,
              }}
              whileInView={{ scale: [0, 1.3, 1] }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 + 0.2 }}
            />

            {/* Content card */}
            <div
              className={`ml-14 md:ml-0 md:w-[calc(50%-30px)] ${
                i % 2 === 0 ? "md:pr-0 md:mr-auto" : "md:pl-0 md:ml-auto"
              }`}
            >
              <motion.div
                className="glass p-6 neon-glow-hover"
                whileHover={{ y: -5 }}
              >
                {/* Period */}
                <span
                  className="text-xs font-mono px-3 py-1 rounded-full mb-3 inline-block"
                  style={{
                    color: exp.color,
                    background: `${exp.color}15`,
                    border: `1px solid ${exp.color}30`,
                  }}
                >
                  {exp.period}
                </span>

                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `${exp.color}15` }}
                  >
                    <FiCode size={20} style={{ color: exp.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                  <span className="text-accent text-xs">{exp.company}</span>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 rounded bg-white/5 text-gray-500"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
