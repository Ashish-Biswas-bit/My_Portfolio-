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
      <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-white p-8 text-center shadow-[0_12px_35px_rgba(15,61,71,0.06)] sm:p-10">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-lg font-semibold text-red-600">
          !
        </div>
        <h1 className="text-xl font-semibold tracking-tight text-deep-teal">
          Dashboard data is unavailable
        </h1>
        <p className="mt-2 text-sm leading-6 text-deep-teal/60">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 rounded-xl bg-deep-teal px-5 py-2.5 text-sm font-semibold text-ice-white transition hover:bg-soft-peach hover:text-deep-teal"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-deep-teal/50">
            Your content at a glance
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-deep-teal">
            Dashboard
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-deep-teal/60">
            Keep your portfolio current and publish updates as your work grows.
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-deep-teal/12 bg-white px-4 py-2 text-xs font-semibold text-deep-teal/75 shadow-sm transition hover:border-soft-peach hover:text-deep-teal"
        >
          Preview portfolio <span aria-hidden="true">↗</span>
        </Link>
      </header>

      <section
        aria-label="Portfolio content totals"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {sections.map((s) => (
          <Link
            key={s.name}
            href={s.href}
            className="group rounded-2xl border border-deep-teal/10 bg-white p-5 shadow-[0_8px_24px_rgba(15,61,71,0.04)] transition-all duration-200 hover:-translate-y-1 hover:border-soft-peach/60 hover:shadow-[0_16px_34px_rgba(15,61,71,0.09)] sm:p-6"
          >
            <div className="mb-5 flex items-center justify-between">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: `${s.color}15`, color: s.color }}
              >
                <s.icon aria-hidden="true" size={19} />
              </div>
              <span className="text-3xl font-semibold tracking-tight" style={{ color: s.color }}>
                {loading ? (
                  <span className="text-deep-teal/30">—</span>
                ) : (
                  counts[s.col] ?? "—"
                )}
              </span>
            </div>
            <h2 className="font-semibold text-deep-teal transition-colors group-hover:text-soft-peach">
              {s.name}
            </h2>
            <p className="mt-1 text-xs leading-5 text-deep-teal/55">
              Click to manage {s.name.toLowerCase()}
            </p>
          </Link>
        ))}
      </section>

      <section className="rounded-2xl border border-deep-teal bg-deep-teal p-6 text-ice-white shadow-[0_16px_40px_rgba(15,61,71,0.12)] sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-soft-peach">
              A simple workflow
            </p>
            <h2 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
              Keep your portfolio in sync.
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-ice-white/65">
              Changes saved here are reflected in the matching sections of your
              public portfolio.
            </p>
          </div>
          <ol className="grid gap-3 sm:grid-cols-3">
            {[
              "Choose a section to edit",
              "Upload media where needed",
              "Save and preview the result",
            ].map((step, index) => (
              <li
                key={step}
                className="flex items-start gap-3 rounded-xl border border-ice-white/10 bg-ice-white/[0.06] p-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-soft-peach text-xs font-bold text-deep-teal">
                  0{index + 1}
                </span>
                <span className="pt-1 text-xs font-medium leading-5 text-ice-white/80">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
