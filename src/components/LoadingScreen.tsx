"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-8">
            {/* Animated logo */}
            <motion.div
              className="relative"
              animate={{ rotateY: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-20 h-20 rounded-xl neon-border flex items-center justify-center">
                <span className="text-3xl font-bold neon-text">AB</span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.h2
              className="text-2xl font-light tracking-[0.3em] text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              ASHISH BISWAS
            </motion.h2>

            {/* Progress bar */}
            <div className="w-64 h-[2px] bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #00f5ff, #7b2ff7, #ff00ff)",
                  width: `${progress}%`,
                }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Progress text */}
            <motion.span
              className="text-xs tracking-[0.5em] text-gray-500 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              LOADING {progress}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
