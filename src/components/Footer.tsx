"use client";

import {
  FiArrowUpRight,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMessageCircle,
} from "react-icons/fi";
import { useSiteSettings } from "@/lib/useSiteSettings";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const { settings } = useSiteSettings();
  const email = settings?.email?.trim() ?? "";
  const github = settings?.github?.trim() ?? "";
  const linkedin = settings?.linkedin?.trim() ?? "";
  const whatsappDigits = settings?.whatsapp?.replace(/\D/g, "") ?? "";
  const whatsappNumber = whatsappDigits.startsWith("0")
    ? `880${whatsappDigits.slice(1)}`
    : whatsappDigits;

  const socials = [
    ...(github.startsWith("https://")
      ? [{ label: "GitHub", href: github, icon: FiGithub }]
      : []),
    ...(linkedin.startsWith("https://")
      ? [{ label: "LinkedIn", href: linkedin, icon: FiLinkedin }]
      : []),
    ...(whatsappNumber.length >= 8 && whatsappNumber.length <= 15
      ? [
          {
            label: "WhatsApp",
            href: `https://wa.me/${whatsappNumber}`,
            icon: FiMessageCircle,
          },
        ]
      : []),
    ...(email.includes("@") &&
    !email.toLowerCase().endsWith("@example.com")
      ? [{ label: "Email", href: `mailto:${email}`, icon: FiMail }]
      : []),
  ];

  return (
    <footer className="bg-deep-teal text-ice-white">
      <div className="section-container py-8 md:py-10">
        <div className="mb-6 flex flex-col gap-4 border-b border-ice-white/10 pb-5 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="inline-flex w-fit items-center rounded-full border border-ice-white/15 bg-ice-white/5 px-3 py-1 text-xs font-medium text-ice-white/85">
              <span className="relative mr-2 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-soft-peach opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-soft-peach" />
              </span>
              Available for Full Stack &amp; Desktop Projects
            </p>
            <h2 className="text-lg font-semibold tracking-tight md:text-xl">
              Ready to turn your idea into reliable software?
            </h2>
          </div>

          <a
            href="#contact"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-soft-peach px-4 py-2 text-sm font-semibold text-deep-teal transition-colors hover:bg-ice-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soft-peach"
          >
            Start a Conversation <FiArrowUpRight aria-hidden="true" size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
          <div className="md:col-span-4">
            <a
              href="#home"
              className="text-2xl font-bold tracking-tight text-ice-white"
              aria-label="Ashish Biswas home"
            >
              AB<span className="text-soft-peach">.</span>
            </a>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-ice-white/75">
              Full Stack Web &amp; Desktop Software Developer building useful
              software with a thoughtful approach.
            </p>
            <p className="mt-2 text-[11px] text-ice-white/50">
              Khulna, Bangladesh · B.Sc. in CSE (NWU)
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="md:col-span-5 md:justify-self-center"
          >
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {navigation.map((item) => (
                <li key={item.label}>
                  <a
                    className="inline-flex text-ice-white/70 transition-colors duration-200 hover:text-soft-peach"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-wrap gap-2 md:col-span-3 md:justify-self-end">
            {socials.length > 0 ? (
              socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={
                    social.href.startsWith("mailto:") ? undefined : "_blank"
                  }
                  rel={
                    social.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ice-white/15 text-ice-white/75 transition-all hover:border-soft-peach hover:bg-soft-peach hover:text-deep-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soft-peach"
                  aria-label={social.label}
                  title={social.label}
                >
                  <social.icon aria-hidden="true" size={16} />
                </a>
              ))
            ) : (
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 rounded-full border border-ice-white/15 px-3 py-2 text-xs text-ice-white/80 transition-all hover:border-soft-peach hover:text-soft-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soft-peach"
              >
                Direct Email <FiArrowUpRight aria-hidden="true" size={14} />
              </a>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-ice-white/10 pt-5 text-xs sm:flex-row">
          <p className="text-center text-ice-white/60 sm:text-left">
            © 2026 Ashish Biswas
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-1.5 text-ice-white/70 transition-colors hover:text-soft-peach focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soft-peach"
          >
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
