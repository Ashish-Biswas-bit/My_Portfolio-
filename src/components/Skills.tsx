"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiNextdotjs,
  SiPython,
  SiMongodb,
  SiPostgresql,
  SiMysql,
} from "react-icons/si";
import { FaJava, FaGamepad, FaDesktop } from "react-icons/fa";
import { db } from "@/lib/firebase-db";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import type { SkillData } from "@/lib/useFirestore";
import { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  SiHtml5, SiCss, SiJavascript, SiNextdotjs, SiPython, SiMongodb, SiPostgresql, SiMysql,
  FaJava, FaGamepad, FaDesktop,
  JavaScript: SiJavascript,
  Python: SiPython,
  Java: FaJava,
  HTML: SiHtml5,
  CSS: SiCss,
  NextJS: SiNextdotjs,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Game: FaGamepad,
  Desktop: FaDesktop,
};



export default function Skills() {
  const [skills, setSkills] = useState<SkillData[]>([]);

  useEffect(() => {
    const q = query(collection(db, "skills"), orderBy("order"));
    const unsub = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        setSkills(snap.docs.map((d) => ({ id: d.id, ...d.data() } as SkillData)));
      }
    });
    return () => unsub();
  }, []);

  return (
    <SectionWrapper id="skills">
      <h2 className="section-title">
        My <span className="neon-text">Skills</span>
      </h2>
      <p className="section-subtitle">
        Technologies and tools I use to bring ideas to life
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {skills.map((skill, i) => {
          // Auto-adjust icon based on language if present
          const Icon = skill.language && iconMap[skill.language]
            ? iconMap[skill.language]
            : iconMap[skill.iconName] || FaDesktop;
          return (
            <motion.div
              key={skill.name}
              className="group glass p-6 text-center cursor-pointer neon-glow-hover transition-all duration-300"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -10 }}
            >
              {/* Icon */}
              <motion.div
                className="mb-4 flex justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Icon
                  size={40}
                  style={{ color: skill.color }}
                  className="drop-shadow-lg"
                />
              </motion.div>

              {/* Name */}
              <h3 className="text-sm font-semibold text-white mb-3">
                {skill.name}
              </h3>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.08 + 0.3 }}
                />
              </div>

              {/* Level text */}
              <span className="text-xs text-gray-500 mt-2 block">
                {skill.level}%
              </span>

              {/* Category badge */}
              <span
                className="inline-block mt-2 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{
                  color: skill.color,
                  background: `${skill.color}15`,
                  border: `1px solid ${skill.color}30`,
                }}
              >
                {skill.category}
              </span>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
