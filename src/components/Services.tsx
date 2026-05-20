"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import {
  FiGlobe,
  FiMonitor,
  FiCpu,
  FiDatabase,
  FiLayers,
} from "react-icons/fi";
import { FaGamepad } from "react-icons/fa";
import { db } from "@/lib/firebase-db";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import type { ServiceData } from "@/lib/useFirestore";
export default function Services() {
  const [services, setServices] = useState<ServiceData[]>([]);

  useEffect(() => {
    const q = query(collection(db, "services"), orderBy("order"));
    const unsub = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        setServices(snap.docs.map((d) => ({ id: d.id, ...d.data() } as ServiceData)));
      }
    }, () => {});
    return () => unsub();
  }, []);

  return (
    <SectionWrapper id="services">
      <h2 className="section-title">
        My <span className="neon-text">Services</span>
      </h2>
      <p className="section-subtitle">
        Professional services I offer to bring your ideas to reality
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => {
          const iconMap: Record<string, typeof FiGlobe> = { FiGlobe, FiMonitor, FiCpu, FiDatabase, FiLayers, FaGamepad };
          const Icon = iconMap[service.iconName] || FiGlobe;
          return (
            <motion.div
              key={service.title}
              className="group relative glass p-8 overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {/* Background gradient overlay on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              {/* Icon */}
              <motion.div
                className="w-14 h-14 rounded-xl glass flex items-center justify-center mb-6 neon-glow-hover"
                whileHover={{ rotate: -10 }}
              >
                <Icon className="text-2xl text-accent" />
              </motion.div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-3">
                {service.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {service.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
