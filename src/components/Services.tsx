import SectionWrapper from "./SectionWrapper";
import {
  FiCode,
  FiDatabase,
  FiMonitor,
  FiRefreshCw,
} from "react-icons/fi";

const services = [
  {
    icon: FiCode,
    title: "Full Stack Web Applications",
    description:
      "Responsive web products with cohesive frontend experiences and dependable backend integrations.",
    stack: "Next.js · React · Node.js",
  },
  {
    icon: FiMonitor,
    title: "Desktop Software & GUI Tools",
    description:
      "Purpose-built desktop applications and interfaces for everyday workflows.",
    stack: "Python · Tkinter",
  },
  {
    icon: FiDatabase,
    title: "Database & Backend Integration",
    description:
      "Structured data models and connected application services that fit the product.",
    stack: "MySQL · SQLite · Supabase · Firebase",
  },
  {
    icon: FiRefreshCw,
    title: "Website Redesign & Optimization",
    description:
      "A clearer, more responsive user experience with a leaner frontend and polished details.",
    stack: "React · Next.js · Tailwind CSS",
  },
];

export default function Services() {
  return (
    <SectionWrapper id="services" className="section-muted">
      <div className="section-heading">
        <p className="eyebrow">How I can help</p>
        <h2 className="section-title">
          Software built around{" "}
          <span className="accent-word">your needs.</span>
        </h2>
        <p className="section-subtitle">
          Clear, stack-aligned services for useful digital products.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((service, index) => (
          <article key={service.title} className="surface-card service-card p-6 sm:p-8">
            <div className="flex items-start justify-between">
              <span className="service-icon">
                <service.icon aria-hidden="true" size={21} />
              </span>
              <span className="card-kicker">
                0{index + 1} / SERVICE
              </span>
            </div>
            <h3 className="mt-7 text-xl font-semibold tracking-tight text-deep-teal">
              {service.title}
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-6 text-deep-teal/65">
              {service.description}
            </p>
            <p className="mt-6 border-t border-deep-teal/10 pt-4 font-mono text-xs leading-5 text-deep-teal/55">
              {service.stack}
            </p>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
