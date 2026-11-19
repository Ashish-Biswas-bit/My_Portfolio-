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
  { name: "Projects", col: "projects", icon: FiFolder, color: "#F59E7B", href: "/admin/dashboard/projects" },
  { name: "Skills", col: "skills", icon: FiCode, color: "#0F3D47", href: "/admin/dashboard/skills" },
  { name: "Services", col: "services", icon: FiBriefcase, color: "#F59E7B", href: "/admin/dashboard/services" },
  { name: "Experience", col: "experience", icon: FiClock, color: "#F59E7B", href: "/admin/dashboard/experience" },
  { name: "Testimonials", col: "testimonials", icon: FiMessageSquare, color: "#0F3D47", href: "/admin/dashboard/testimonials" },
  { name: "Education", col: "education", icon: FiBookOpen, color: "#0F3D47", href: "/admin/dashboard/education" },
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
          className="mt-4 px-4 py-2 bg-deep-teal text-ice-white rounded-lg hover:bg-soft-peach hover:text-deep-teal transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
      <p className="text-deep-teal/70 text-sm mb-8">
        Manage your portfolio content from here
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link
            key={s.name}
            href={s.href}
            className="bg-white border border-deep-teal/10 rounded-xl p-6 hover:border-soft-peach transition-colors group"
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
                  <span className="text-deep-teal/75">...</span>
                ) : (
                  counts[s.col] ?? "—"
                )}
              </span>
            </div>
            <h3 className="text-deep-teal font-semibold group-hover:text-soft-peach transition-colors">
              {s.name}
            </h3>
            <p className="text-deep-teal/60 text-xs mt-1">
              Click to manage {s.name.toLowerCase()}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-white border border-deep-teal/10 rounded-xl p-6">
        <h2 className="text-lg font-bold mb-2">Quick Start</h2>
        <ul className="text-deep-teal/75 text-sm space-y-2">
          <li>
            1. Go to each section to add/edit/delete content
          </li>
          <li>
            2. Upload images — they auto-save to Cloudinary &amp; links are stored
            in Supabase
          </li>
          <li>
            3. Changes reflect on the live site in real-time
          </li>
        </ul>
      </div>
    </div>
  );
}
