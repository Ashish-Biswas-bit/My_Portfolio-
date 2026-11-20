"use client";

import { useEffect, useState } from "react";
import { FiArrowRight, FiFileText } from "react-icons/fi";
import { db, doc, onSnapshot } from "@/lib/supabase-db";
import type { HeroData } from "@/lib/useContent";
import LiveCodeEditor from "./LiveCodeEditor";

const defaultName = "Ashish Biswas";
const defaultRole = "Full Stack Web & Desktop Software Developer";
const defaultDescription =
  "I build thoughtful web applications and practical desktop software—from polished interfaces to reliable data-backed features.";

export default function Hero() {
  const [heroData, setHeroData] = useState<Partial<HeroData>>({});

  useEffect(
    () =>
      onSnapshot(
        doc(db, "siteContent", "hero"),
        (snapshot) => {
          setHeroData(
            snapshot.exists()
              ? (snapshot.data() as Partial<HeroData>)
              : {}
          );
        },
        (error) => console.error("Unable to load hero content:", error)
      ),
    []
  );

  const name =
    (typeof heroData.name === "string" && heroData.name.trim()) || defaultName;
  const roles = Array.isArray(heroData.roles)
    ? heroData.roles.filter((role) => typeof role === "string" && role.trim())
    : [];
  const role = roles.length > 0 ? roles.join(" · ") : defaultRole;
  const description =
    (typeof heroData.description === "string" &&
      heroData.description.trim()) ||
    defaultDescription;
  const cvUrl =
    typeof heroData.cvUrl === "string" ? heroData.cvUrl.trim() : "";
  const stats = Array.isArray(heroData.stats)
    ? heroData.stats.filter(
        (stat) =>
          stat &&
          typeof stat.label === "string" &&
          stat.label.trim() &&
          typeof stat.value === "number" &&
          Number.isFinite(stat.value) &&
          stat.value > 0 &&
          typeof stat.suffix === "string"
      )
    : [];

  return (
    <section
      id="home"
      className="hero-section scroll-mt-20 py-20 sm:py-28 lg:min-h-[calc(100svh-4rem)] lg:py-20"
    >
      <div className="section-container grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="max-w-2xl">
          <div className="status-pill mb-7">
            <span className="status-dot" />
            Available for Full Stack &amp; Desktop Projects
          </div>

          <p className="eyebrow mb-4">{role}</p>
          <h1 className="text-[clamp(2.75rem,7vw,5.75rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-deep-teal">
            Hi, I&apos;m
            <br />
            <span className="hero-name">
              <span>{name.replace(/[.!?]+$/, "")}.</span>
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-deep-teal/70 sm:text-xl">
            {description}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="button-primary hero-primary">
              View Projects <FiArrowRight aria-hidden="true" />
            </a>
            <a
              href={cvUrl || "#contact"}
              target={/^https?:\/\//i.test(cvUrl) ? "_blank" : undefined}
              rel={
                /^https?:\/\//i.test(cvUrl)
                  ? "noopener noreferrer"
                  : undefined
              }
              className="button-secondary"
            >
              <FiFileText aria-hidden="true" /> Request CV
            </a>
          </div>

          {stats.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              {stats.map((stat, index) => (
                <li key={`${stat.label}-${index}`}>
                  <p className="text-2xl font-semibold tracking-tight text-deep-teal">
                    {stat.value}
                    {stat.suffix}
                  </p>
                  <p className="mt-1 text-xs text-deep-teal/60">{stat.label}</p>
                </li>
              ))}
            </ul>
          )}

          <a href="#about" className="hero-scroll" aria-label="Scroll to About">
            <span className="hero-scroll-track" aria-hidden="true">
              <span />
            </span>
            <span>Scroll to explore</span>
          </a>
        </div>

        <LiveCodeEditor />
      </div>
    </section>
  );
}
