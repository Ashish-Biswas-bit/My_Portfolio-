"use client";

import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { useSiteSettings } from "@/lib/useSiteSettings";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const { settings, error: settingsError } = useSiteSettings();

  const socials = [
    ...(settings?.github.startsWith("https://")
      ? [{ label: "GitHub", href: settings.github, icon: FiGithub }]
      : []),
    ...(settings?.linkedin.startsWith("https://")
      ? [{ label: "LinkedIn", href: settings.linkedin, icon: FiLinkedin }]
      : []),
    ...(settings?.email.includes("@") &&
    !settings.email.endsWith("@example.com")
      ? [
          {
            label: "Email",
            href: `mailto:${settings.email}`,
            icon: FiMail,
          },
        ]
      : []),
  ];

  return (
    <footer className="site-footer">
      <div className="section-container py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <a href="#home" className="text-2xl font-bold tracking-tight text-white">
              AB<span className="text-soft-peach">.</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
              Full Stack Web &amp; Desktop Software Developer building useful
              software with a thoughtful approach.
            </p>
          </div>

          <div>
            <h2 className="footer-heading">Navigate</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
              {navigation.map((item) => (
                <li key={item.label}>
                  <a className="footer-link" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer-heading">Connect</h2>
            {socials.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={
                      social.href.startsWith("mailto:")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="footer-social"
                    aria-label={social.label}
                  >
                    <social.icon aria-hidden="true" size={17} />
                    <span>{social.label}</span>
                    <FiArrowUpRight aria-hidden="true" size={13} />
                  </a>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-white/50" aria-live="polite">
                {settingsError
                  ? "Contact settings could not load. Check the Supabase schema."
                  : "Social links can be added in admin settings."}
              </p>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Ashish Biswas</p>
          <a href="#home" className="footer-link w-fit">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
