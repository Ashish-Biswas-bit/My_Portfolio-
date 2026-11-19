"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { FiMail, FiSend, FiGithub, FiUser, FiMessageSquare } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { FiLinkedin } from "react-icons/fi";
import { db, doc, onSnapshot } from "@/lib/supabase-db";

interface SiteSettings {
  email: string;
  github: string;
  linkedin: string;
  whatsapp: string;
  phone: string;
}

const Contact = () => {
  const [contactInfo, setContactInfo] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "siteContent", "settings"), (snap) => {
      if (snap.exists()) {
        const s = snap.data() as SiteSettings;
        setContactInfo([
          { icon: FiMail, label: "Email", value: s.email, href: `mailto:${s.email}`, color: "#F59E7B" },
          { icon: FiGithub, label: "GitHub", value: s.github.replace("https://", ""), href: s.github, color: "#0F3D47" },
          { icon: FiLinkedin, label: "LinkedIn", value: s.linkedin.replace("https://", ""), href: s.linkedin, color: "#F59E7B" },
          { icon: FaWhatsapp, label: "WhatsApp", value: s.phone, href: `https://wa.me/${s.whatsapp.replace(/\D/g, "")}`, color: "#F59E7B" },
        ]);
      }
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("sent");
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <SectionWrapper id="contact">
      <h2 className="section-title">
        Get In <span className="neon-text">Touch</span>
      </h2>
      <p className="section-subtitle">
        Have a project in mind? Let&apos;s work together to create something amazing
      </p>
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-deep-teal mb-6">
            Let&apos;s talk about your project
            </h3>
            <p className="text-deep-teal/75 mb-8 leading-relaxed">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out through any of the channels below.
            </p>
            <div className="space-y-4">
              {contactInfo.map((info: any, i: number) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-deep-teal hover:text-soft-peach transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <info.icon className="text-xl" />
                  <span className="font-semibold">{info.label}:</span>
                  <span className="text-deep-teal/75">{info.value}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="glass-strong p-8 space-y-6">
            {/* Name */}
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-deep-teal/70" />
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full pl-12 pr-4 py-4 bg-white border border-deep-teal/10 rounded-xl text-deep-teal placeholder-deep-teal/60 focus:outline-none focus:border-soft-peach transition-colors"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-deep-teal/70" />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full pl-12 pr-4 py-4 bg-white border border-deep-teal/10 rounded-xl text-deep-teal placeholder-deep-teal/60 focus:outline-none focus:border-soft-peach transition-colors"
              />
            </div>

            {/* Message */}
            <div className="relative">
              <FiMessageSquare className="absolute left-4 top-4 text-deep-teal/70" />
              <textarea
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="w-full pl-12 pr-4 py-4 bg-white border border-deep-teal/10 rounded-xl text-deep-teal placeholder-deep-teal/60 focus:outline-none focus:border-soft-peach transition-colors resize-none"
              />
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              className="btn-primary w-full py-4"
              disabled={status === "sending"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2">
                {status === "sending" ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-deep-teal/30 border-t-deep-teal rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Sending...
                  </>
                ) : status === "sent" ? (
                  "Message Sent! ✓"
                ) : (
                  <>
                    Send Message
                    <FiSend />
                  </>
                )}
              </span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
