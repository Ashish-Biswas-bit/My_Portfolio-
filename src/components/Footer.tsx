"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiArrowUp } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { db, doc, onSnapshot } from "@/lib/supabase-db";
import type { SiteSettings } from "@/lib/useContent";

const staticSocialLinks = [
  { icon: FiGithub, href: "https://github.com/ashishbiswas", label: "GitHub" },
  {
    icon: FiLinkedin,
    href: "https://linkedin.com/in/ashishbiswas",
    label: "LinkedIn",
  },
  { icon: FiMail, href: "mailto:ashish@example.com", label: "Email" },
  { icon: FaWhatsapp, href: "https://wa.me/880", label: "WhatsApp" },
];

const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState(staticSocialLinks);
  const [footerText, setFooterText] = useState(
    "Full Stack Developer crafting modern web applications, desktop software, and games with passion and precision."
  );

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "siteContent", "settings"), (snap) => {
      if (snap.exists()) {
        const s = snap.data() as SiteSettings;
        setSocialLinks([
          { icon: FiGithub, href: s.github, label: "GitHub" },
          { icon: FiLinkedin, href: s.linkedin, label: "LinkedIn" },
          { icon: FiMail, href: `mailto:${s.email}`, label: "Email" },
          { icon: FaWhatsapp, href: `https://wa.me/${s.whatsapp.replace(/\D/g, "")}`, label: "WhatsApp" },
        ]);
        if (s.footerText) setFooterText(s.footerText);
      }
    });
    return () => unsub();
  }, []);

  return (
    <footer className="relative bg-deep-teal text-ice-white pt-16 pb-8 px-6 border-t border-ice-white/20">
      <div className="max-w-7xl mx-auto">
        {/* Top grid */}
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <motion.a
              href="#home"
              className="text-2xl font-bold neon-text inline-block mb-3"
              whileHover={{ scale: 1.05 }}
            >
              AB<span className="text-soft-peach">.</span>
            </motion.a>
            <p className="text-ice-white/75 text-sm leading-relaxed max-w-xs">
              {footerText}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-ice-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-ice-white/75 hover:text-soft-peach text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-ice-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-ice-white/10 border border-ice-white/20 flex items-center justify-center text-ice-white/75 hover:text-soft-peach transition-colors"
                  whileHover={{ y: -3, scale: 1.1 }}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-ice-white/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-ice-white/60 text-xs flex items-center gap-1">
            &copy; {new Date().getFullYear()} Ashish Biswas. Made with
            <FiHeart className="text-soft-peach" size={12} />
            and lots of coffee.
          </p>

          <motion.a
            href="#home"
            className="w-9 h-9 rounded-full bg-ice-white/10 border border-ice-white/20 flex items-center justify-center text-ice-white/75 hover:text-soft-peach transition-colors"
            whileHover={{ y: -3 }}
            aria-label="Back to top"
          >
            <FiArrowUp size={16} />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
