"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { FiBookOpen, FiAward, FiCalendar } from "react-icons/fi";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import type { EducationData, CertificationData } from "@/lib/useFirestore";

// ...existing code...

export default function Education() {
  const [education, setEducation] = useState<EducationData[]>([]);
  const [certifications, setCertifications] = useState<CertificationData[]>([]);

  useEffect(() => {
    const q1 = query(collection(db, "education"), orderBy("order"));
    const unsub1 = onSnapshot(q1, (snap) => {
      if (!snap.empty) {
        setEducation(snap.docs.map((d) => d.data() as EducationData));
      }
    });
    const q2 = query(collection(db, "certifications"), orderBy("order"));
    const unsub2 = onSnapshot(q2, (snap) => {
      if (!snap.empty) {
        setCertifications(snap.docs.map((d) => d.data() as CertificationData));
      }
    });
    return () => { unsub1(); unsub2(); };
  }, []);

  return (
    <SectionWrapper id="education">
      <h2 className="section-title">
        Education &amp; <span className="neon-text">Certifications</span>
      </h2>
      <p className="section-subtitle">
        My academic background and professional credentials
      </p>

      {/* Education Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-14">
        {education.map((edu, i) => (
          <motion.div
            key={edu.degree}
            className="glass p-8 relative overflow-hidden group"
            initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ y: -4 }}
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-xl mb-4"
              style={{ background: `#00f5ff15`, color: "#00f5ff" }}
            >
              <FiBookOpen />
            </div>

            <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
              <FiCalendar size={12} />
              {edu.year}
            </div>

            <h3 className="text-white text-lg font-bold mb-1">{edu.degree}</h3>
            <p className="text-accent text-sm mb-3">{edu.institution}</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              {edu.description}
            </p>

            <div
              className="absolute -bottom-2 -right-2 w-28 h-28 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle, ${edu.color}08, transparent 70%)`,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Certifications */}
      <h3 className="text-white text-xl font-bold text-center mb-6 flex items-center justify-center gap-2">
        <FiAward className="text-accent" /> Certifications
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.title}
            className="glass p-5 text-center group hover:border-white/10 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -3 }}
          >
            <FiAward
              size={28}
              className="mx-auto mb-3 transition-colors"
              style={{ color: cert.color }}
            />
            <h4 className="text-white text-sm font-semibold mb-1">
              {cert.title}
            </h4>
            <p className="text-gray-500 text-xs">
              {cert.issuer} &middot; {cert.year}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
