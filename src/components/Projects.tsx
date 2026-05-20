"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { db } from "@/lib/firebase-db";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import type { ProjectData } from "@/lib/useFirestore";

// ...existing code...

const categories = ["All", "Web", "Desktop", "Game"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [projects, setProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("order"));
    const unsub = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() } as ProjectData)));
      }
    }, () => {});
    return () => unsub();
  }, []);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <SectionWrapper id="projects">
      <h2 className="section-title">
        My <span className="neon-text">Projects</span>
      </h2>
      <p className="section-subtitle">
        A showcase of my recent work across different domains
      </p>

      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === cat
                ? "bg-gradient-to-r from-accent to-accent-purple text-white shadow-lg shadow-accent/20"
                : "glass text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveCategory(cat)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Projects grid */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              className="group glass overflow-hidden cursor-pointer"
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {/* Image area */}
              <div className="relative h-48 bg-gradient-to-br from-secondary to-primary flex items-center justify-center overflow-hidden">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-accent transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiGithub size={18} />
                    </a>
                    <a
                      href={project.live}
                      className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-accent transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiExternalLink size={18} />
                    </a>
                  </div>
                </div>
                {/* Category badge */}
                <span className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/30">
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                  {project.description}
                </p>

                {/* Highlights */}
                {"highlights" in project && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project as any).highlights.map((h: string) => (
                      <span
                        key={h}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded bg-white/5 text-gray-500 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
}
