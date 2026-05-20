"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FiFolder,
  FiCode,
  FiBriefcase,
  FiMessageSquare,
  FiBookOpen,
  FiClock,
} from "react-icons/fi";

const sections = [
  { name: "Projects", col: "projects", icon: FiFolder, color: "#00f5ff", href: "/admin/dashboard/projects" },
  { name: "Skills", col: "skills", icon: FiCode, color: "#7b2ff7", href: "/admin/dashboard/skills" },
  { name: "Services", col: "services", icon: FiBriefcase, color: "#ff00ff", href: "/admin/dashboard/services" },
  { name: "Experience", col: "experience", icon: FiClock, color: "#f59e0b", href: "/admin/dashboard/experience" },
  { name: "Testimonials", col: "testimonials", icon: FiMessageSquare, color: "#10b981", href: "/admin/dashboard/testimonials" },
  { name: "Education", col: "education", icon: FiBookOpen, color: "#00d4ff", href: "/admin/dashboard/education" },
];

export default function DashboardHome() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch("/api/dashboard/counts");
        if (!response.ok) {
          throw new Error("Failed to fetch counts");
        }
        const data = await response.json();
        setCounts(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard counts:", err);
        setError("Failed to load dashboard data");
        setCounts({});
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
      <p className="text-gray-500 text-sm mb-8">
        Manage your portfolio content from here
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link
            key={s.name}
            href={s.href}
            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${s.color}15`, color: s.color }}
              >
                <s.icon size={20} />
              </div>
              <span className="text-2xl font-bold" style={{ color: s.color }}>
                {loading ? (
                  <span className="text-gray-400">...</span>
                ) : (
                  counts[s.col] ?? "—"
                )}
              </span>
            </div>
            <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors">
              {s.name}
            </h3>
            <p className="text-gray-600 text-xs mt-1">
              Click to manage {s.name.toLowerCase()}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-bold mb-2">Quick Start</h2>
        <ul className="text-gray-400 text-sm space-y-2">
          <li>
            1. Go to each section to add/edit/delete content
          </li>
          <li>
            2. Upload images — they auto-save to Cloudinary &amp; links are stored
            in Firebase
          </li>
          <li>
            3. Changes reflect on the live site in real-time
          </li>
        </ul>
      </div>
    </div>
  );
}
