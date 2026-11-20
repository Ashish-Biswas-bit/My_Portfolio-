"use client";

import { useState, type FormEvent } from "react";
import {
  FiArrowUpRight,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiSend,
} from "react-icons/fi";
import SectionWrapper from "./SectionWrapper";
import { useSiteSettings } from "@/lib/useSiteSettings";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !email.endsWith("@example.com");
}

function isExternalUrl(value: string) {
  return /^https?:\/\//i.test(value);
}

export default function Contact() {
  const { settings, error: settingsError } = useSiteSettings();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [draftOpened, setDraftOpened] = useState(false);

  const email = settings && isValidEmail(settings.email) ? settings.email : "";
  const github =
    settings && isExternalUrl(settings.github) ? settings.github : "";
  const linkedin =
    settings && isExternalUrl(settings.linkedin) ? settings.linkedin : "";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;

    const subject = encodeURIComponent(`Portfolio inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\n${formData.message}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setDraftOpened(true);
  };

  return (
    <SectionWrapper id="contact" className="section-muted">
      <div className="section-heading">
        <p className="eyebrow">Let&apos;s talk</p>
        <h2 className="section-title">
          Have something in <span className="text-soft-peach">mind?</span>
        </h2>
        <p className="section-subtitle">
          Share a little about what you&apos;re building. I&apos;d be glad to hear
          about it.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="surface-card flex flex-col p-6 sm:p-8">
          <div>
            <p className="card-kicker">Contact details</p>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-deep-teal">
              Let&apos;s make something useful.
            </h3>
            <p className="mt-3 text-sm leading-6 text-deep-teal/65">
              Available to discuss full stack web applications and desktop
              software projects.
            </p>
          </div>

          <div className="my-7 flex items-center gap-3 rounded-xl border border-deep-teal/10 bg-ice-white p-4">
            <span className="status-dot" />
            <div>
              <p className="text-sm font-semibold text-deep-teal">
                Open to project conversations
              </p>
              <p className="mt-0.5 text-xs text-deep-teal/55">
                Web and desktop software
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {email && (
              <a className="contact-link" href={`mailto:${email}`}>
                <FiMail aria-hidden="true" />
                <span>{email}</span>
                <FiArrowUpRight className="ml-auto" aria-hidden="true" />
              </a>
            )}
            {github && (
              <a
                className="contact-link"
                href={github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub aria-hidden="true" />
                <span>GitHub</span>
                <FiArrowUpRight className="ml-auto" aria-hidden="true" />
              </a>
            )}
            {linkedin && (
              <a
                className="contact-link"
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiLinkedin aria-hidden="true" />
                <span>LinkedIn</span>
                <FiArrowUpRight className="ml-auto" aria-hidden="true" />
              </a>
            )}
            {!email && !github && !linkedin && (
              <p className="text-sm leading-6 text-deep-teal/55">
                Contact links will appear here once they are added in admin
                settings.
              </p>
            )}
          </div>
        </aside>

        <form onSubmit={handleSubmit} className="surface-card space-y-5 p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="form-field">
              <span>Your name</span>
              <input
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={(event) =>
                  setFormData({ ...formData, name: event.target.value })
                }
                placeholder="Name"
                required
              />
            </label>
            <label className="form-field">
              <span>Your email</span>
              <input
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={(event) =>
                  setFormData({ ...formData, email: event.target.value })
                }
                placeholder="you@example.com"
                required
              />
            </label>
          </div>
          <label className="form-field">
            <span>How can I help?</span>
            <textarea
              rows={6}
              value={formData.message}
              onChange={(event) =>
                setFormData({ ...formData, message: event.target.value })
              }
              placeholder="Tell me a little about your project..."
              required
            />
          </label>

          <div className="flex flex-col items-start justify-between gap-4 border-t border-deep-teal/10 pt-5 sm:flex-row sm:items-center">
            <p aria-live="polite" className="text-xs leading-5 text-deep-teal/55">
              {draftOpened
                ? "Your email app should open with a message draft. Please send it from there."
                : email
                  ? "This opens a pre-filled draft in your email app."
                  : settingsError
                    ? "Contact settings could not load. Check the Supabase schema and admin settings."
                    : "Set a valid contact email in admin settings to enable the form."}
            </p>
            <button
              type="submit"
              className="button-primary shrink-0"
              disabled={!email}
            >
              Open Email App <FiSend aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>
    </SectionWrapper>
  );
}
