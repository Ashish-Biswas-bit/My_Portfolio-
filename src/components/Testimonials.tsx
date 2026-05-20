"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { FiStar } from "react-icons/fi";
import { db } from "@/lib/firebase-db";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import type { TestimonialData } from "@/lib/useFirestore";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);

  useEffect(() => {
    const q = query(collection(db, "testimonials"), orderBy("order"));
    const unsub = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        setTestimonials(snap.docs.map((d) => ({ id: d.id, ...d.data() } as TestimonialData)));
      }
    }, () => {});
    return () => unsub();
  }, []);

  return (
    <SectionWrapper id="testimonials">
      <h2 className="section-title">
        Client <span className="neon-text">Reviews</span>
      </h2>
      <p className="section-subtitle">
        What people say about working with me
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            className="glass p-8 relative overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            whileHover={{ y: -5 }}
          >
            {/* Quote mark */}
            <div className="absolute top-4 right-6 text-6xl font-serif text-white/5 select-none">
              &ldquo;
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, idx) => (
                <FiStar
                  key={idx}
                  size={16}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            {/* Text */}
            <p className="text-gray-300 leading-relaxed mb-6 text-sm">
              &ldquo;{t.text}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white"
                style={{ background: `${t.color}30`, border: `1px solid ${t.color}50` }}
              >
                {t.avatar}
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">{t.name}</h4>
                <p className="text-gray-500 text-xs">{t.role}</p>
              </div>
            </div>

            {/* Accent corner */}
            <div
              className="absolute bottom-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at bottom right, ${t.color}10, transparent 70%)`,
              }}
            />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
