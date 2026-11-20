"use client";

import { useEffect, useState } from "react";
import { db, doc, onSnapshot } from "@/lib/supabase-db";

const defaultName = "Ashish Biswas";

const navLinks = [
  { name: "ABOUT", href: "#about" },
  { name: "SKILLS", href: "#skills" },
  { name: "SERVICES", href: "#services" },
  { name: "PROJECTS", href: "#projects" },
  { name: "EXPERIENCE", href: "#experience" },
  { name: "EDUCATION", href: "#education" },
];

const ringOuterRadii = [166, 230, 294, 358, 422, 486];
const ringColors = [
  "#F4F8FA",
  "#FCE2D6",
  "#F9C0A8",
  "#F59E7B",
  "#1A5663",
  "#0F3D47",
];
const radialLayers = navLinks.map((link, index) => ({ link, index })).reverse();

function getRingPath(outerRadius: number) {
  return [
    "M 520 0",
    `L 520 ${outerRadius}`,
    `A ${outerRadius} ${outerRadius} 0 0 1 ${520 - outerRadius} 0`,
    "Z",
  ].join(" ");
}

function getLabelPath(radius: number) {
  return `M ${520 - radius} 0 A ${radius} ${radius} 0 0 0 520 ${radius}`;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: defaultName,
    avatarUrl: "",
  });
  const [avatarLoadFailed, setAvatarLoadFailed] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        doc(db, "siteContent", "hero"),
        (snapshot) => {
          const data = snapshot.exists() ? snapshot.data() : {};
          setProfile({
            name:
              typeof data.name === "string" && data.name.trim()
                ? data.name.trim()
                : defaultName,
            avatarUrl:
              typeof data.avatarUrl === "string" &&
              /^https:\/\//i.test(data.avatarUrl)
                ? data.avatarUrl
                : "",
          });
          setAvatarLoadFailed(false);
        },
        (error) => console.error("Unable to load navbar profile image:", error)
      ),
    []
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 pointer-events-none bg-transparent">
        <nav
          aria-label="Main navigation"
          className="section-container pointer-events-none flex min-h-16 items-center justify-between gap-3 py-3"
        >
          <a
            href="#home"
            className="pointer-events-auto relative z-50 flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-deep-teal/10 bg-ice-white shadow-sm"
            aria-label="Ashish Biswas home"
          >
            {profile.avatarUrl && !avatarLoadFailed ? (
              <img
                src={profile.avatarUrl}
                alt={`${profile.name} profile`}
                className="h-full w-full object-cover"
                onError={() => setAvatarLoadFailed(true)}
              />
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6 text-deep-teal/45"
              >
                <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M5.5 20c.7-3.5 3.1-5.3 6.5-5.3s5.8 1.8 6.5 5.3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </a>

          <div className="pointer-events-none ml-auto flex items-center gap-2 sm:gap-3">
            <a
              href="https://wa.me/8801744502112?text=Hello%20Ashish%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.%20Could%20you%20share%20your%20availability%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary pointer-events-auto relative z-30 min-h-11 rounded-lg px-3 py-2 text-xs sm:px-4 sm:text-sm"
            >
              Hire Me <span aria-hidden="true">↗</span>
            </a>

            <button
              type="button"
              className={`nav-menu-toggle pointer-events-auto group relative z-50 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-deep-teal/15 bg-ice-white/60 text-deep-teal transition-[transform,color,background-color,border-color] hover:border-soft-peach hover:bg-soft-peach/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soft-peach ${
                isOpen
                  ? "translate-x-[22px] scale-[0.88] min-[1230px]:translate-x-[34px]"
                  : ""
              }`}
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls="radial-navigation"
              aria-label={
                isOpen ? "Close navigation menu" : "Open navigation menu"
              }
            >
              <span
                className={`nav-menu-line nav-menu-line--top ${
                  isOpen ? "nav-menu-line--open" : ""
                }`}
              />
              <span
                className={`nav-menu-line nav-menu-line--middle ${
                  isOpen ? "nav-menu-line--open" : ""
                }`}
              />
              <span
                className={`nav-menu-line nav-menu-line--bottom ${
                  isOpen ? "nav-menu-line--open" : ""
                }`}
              />
            </button>
          </div>
        </nav>

      <nav
        id="radial-navigation"
        aria-label="Section navigation"
        aria-hidden={!isOpen}
        className={`radial-menu-overlay pointer-events-none fixed inset-0 z-40 ${
          isOpen ? "radial-menu-overlay--open" : ""
        }`}
      >
        <button
          type="button"
          className="radial-menu-backdrop absolute inset-0"
          onClick={() => setIsOpen(false)}
          aria-label="Dismiss navigation overlay"
          tabIndex={isOpen ? 0 : -1}
        />

        <svg
          className="radial-menu-canvas fixed right-0 top-0 z-40"
          viewBox="0 0 520 520"
        >
          <defs>
            {navLinks.map((link, index) => {
              const outerRadius = ringOuterRadii[index];
              const labelRadius = outerRadius - (index === 0 ? 8 : 31);

              return (
                <path
                  key={link.name}
                  id={`radial-menu-label-${index}`}
                  d={getLabelPath(labelRadius)}
                />
              );
            })}
          </defs>

          {radialLayers.map(({ link, index }) => {
            const outerRadius = ringOuterRadii[index];
            const isLightRing = index < 4;

            return (
              <g
                key={link.name}
                className="radial-menu-ring"
                data-open={isOpen}
                style={{ transitionDelay: `${index * 40}ms` }}
              >
                <a
                  href={link.href}
                  className="radial-menu-link"
                  aria-label={link.name}
                  tabIndex={isOpen ? 0 : -1}
                  onClick={() => setIsOpen(false)}
                >
                  <path
                    className="radial-menu-shape"
                    d={getRingPath(outerRadius)}
                    fill={ringColors[index]}
                    stroke="none"
                  />
                  <text
                    className={`radial-menu-label ${
                      isLightRing ? "" : "radial-menu-label--light"
                    }`}
                  >
                    <textPath
                      href={`#radial-menu-label-${index}`}
                      startOffset="50%"
                      textAnchor="middle"
                    >
                      {link.name}
                    </textPath>
                  </text>
                </a>
              </g>
            );
          })}
        </svg>
      </nav>
      </header>
    </>
  );
}
