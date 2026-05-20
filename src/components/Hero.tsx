"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { db } from "@/lib/firebase-db";
import { doc, getDoc } from "firebase/firestore";
import type { HeroData } from "@/lib/useFirestore";

function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(count, target, { duration: 2.5, delay: 3 });
    const unsubscribe = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = String(v) + "+";
    });
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, rounded, target]);

  return (
    <div className="text-center">
      <span ref={ref} className="text-3xl md:text-4xl font-bold neon-text">
        0
      </span>
      <p className="text-xs md:text-sm text-gray-500 mt-1 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

const defaultHero: HeroData = {
  name: "Ashish Biswas",
  roles: ["Full Stack Developer", "Desktop App Developer", "2D Game Developer", "UI/UX Enthusiast", "Creative Problem Solver"],
  description: "I craft high-performance web applications, robust desktop software, and immersive 2D games — turning complex ideas into elegant, user-centric digital experiences.",
  cvUrl: "#about",
  avatarUrl: "",
  stats: [
    { label: "Projects", value: 10, suffix: "+" },
    { label: "Years Exp.", value: 3, suffix: "+" },
    { label: "Technologies", value: 15, suffix: "+" },
    { label: "Happy Clients", value: 5, suffix: "+" },
  ],
};

export default function Hero() {
  const [hero, setHero] = useState<HeroData>(defaultHero);

  useEffect(() => {
    getDoc(doc(db, "siteContent", "hero")).then((snap) => {
      if (snap.exists()) setHero(snap.data() as HeroData);
    }).catch(() => {});
  }, []);

  const roleSequence = hero.roles.flatMap((r) => [r, 2000]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Greeting badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-gray-400">
            Available for freelance &amp; collaboration
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <span className="text-white">Hi, I&apos;m </span>
          <span className="neon-text animate-glow-pulse">{hero.name}</span>
        </motion.h1>

        {/* Typing animation */}
        <motion.div
          className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-6 h-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.3 }}
        >
          <TypeAnimation
            sequence={roleSequence}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="font-mono text-accent"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.5 }}
        >
          {hero.description}
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.7 }}
        >
          <a href="#contact" className="btn-primary group">
            <span className="flex items-center gap-2">
              Hire Me
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a href="#projects" className="btn-outline group">
            <span className="flex items-center gap-2">
              View Projects
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a
            href={hero.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <FiDownload size={16} />
            Download CV
          </a>
        </motion.div>

        {/* Stats counters */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.9 }}
        >
          {hero.stats.map((s) => (
            <div key={s.label} className="glass p-4">
              <AnimatedCounter target={s.value} label={s.label} />
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 3.5 },
            y: { duration: 1.5, repeat: Infinity },
          }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex items-start justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-accent animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
