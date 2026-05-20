"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiPython,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiTypescript,
  SiGit,
  SiNodedotjs,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import type { AboutData } from "@/lib/useFirestore";

const techStack = [
  { icon: SiNextdotjs, name: "Next.js", color: "#ffffff" },
  { icon: SiReact, name: "React", color: "#61DAFB" },
  { icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4" },
  { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { icon: SiPython, name: "Python", color: "#3776AB" },
  { icon: FaJava, name: "Java", color: "#ED8B00" },
  { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
  { icon: SiGit, name: "Git", color: "#F05032" },
];

export default function About() {
  const [about, setAbout] = useState<AboutData | undefined>(undefined);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "siteContent", "about"), (snap) => {
      if (snap.exists()) setAbout(snap.data() as AboutData);
    });
    return () => unsub();
  }, []);

  return (
    <SectionWrapper id="about">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Profile Image */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            {/* Gradient border ring */}
            <div className="w-72 h-72 md:w-80 md:h-80 rounded-full p-1 bg-gradient-to-br from-accent via-accent-purple to-accent-pink">
              <div className="w-full h-full rounded-full bg-primary flex items-center justify-center overflow-hidden">
                {about?.avatarUrl ? (
                  <img src={about.avatarUrl} alt="Ashish Biswas" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                    <span className="text-7xl font-bold neon-text">AB</span>
                  </div>
                )}
              </div>
            </div>
            {/* Floating decoration */}
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 rounded-xl glass neon-glow flex items-center justify-center"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-2xl">🚀</span>
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl glass neon-glow flex items-center justify-center"
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-xl">💻</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Bio */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            About <span className="neon-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent-purple rounded mb-6" />

          {/* Render bio from Firestore */}
          {Array.isArray(about?.bio)
            ? about.bio.map((paragraph: string, idx: number) => (
                <p key={idx} className={idx === 0 ? "text-gray-300 text-lg leading-relaxed mb-4" : "text-gray-400 leading-relaxed mb-8"}>
                  {paragraph}
                </p>
              ))
            : about?.bio && (
                <p className="text-gray-300 text-lg leading-relaxed mb-4">{about.bio}</p>
              )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {about?.stats?.map((stat: {label: string, value: string}, i: number) => (
              <motion.div
                key={stat.label}
                className="glass p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="text-2xl font-bold neon-text">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Tech stack icons */}
          <div>
            <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, i: number) => (
                <motion.div
                  key={tech.name}
                  className="group relative glass p-3 cursor-pointer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <tech.icon
                    size={24}
                    style={{ color: tech.color }}
                    className="transition-transform duration-300 group-hover:drop-shadow-lg"
                  />
                  {/* Tooltip */}
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs bg-gray-900 text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
// ...existing code...
}
