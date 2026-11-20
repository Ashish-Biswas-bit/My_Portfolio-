import SectionWrapper from "./SectionWrapper";

const reasons = [
  {
    title: "Clean & Scalable Code",
    description:
      "Organized, maintainable solutions built to stay understandable as they grow.",
  },
  {
    title: "Fast Delivery",
    description:
      "Focused execution, clear priorities, and steady progress from start to finish.",
  },
  {
    title: "Full Stack Versatility",
    description:
      "One developer across web interfaces, backend services, databases, and desktop tools.",
  },
  {
    title: "Clear Communication",
    description:
      "Straightforward updates, shared expectations, and no surprises along the way.",
  },
  {
    title: "Reliable & Accountable",
    description:
      "Careful follow-through and ownership of the details that make software dependable.",
  },
  {
    title: "Long-Term Partnership",
    description:
      "A thoughtful collaborator for future improvements as your product evolves.",
  },
];

export default function WhyHireMe() {
  return (
    <SectionWrapper id="why-hire-me" className="section-muted">
      <div className="section-heading">
        <p className="eyebrow">Working together</p>
        <h2 className="section-title">
          A thoughtful partner for{" "}
          <span className="accent-word">your next build.</span>
        </h2>
        <p className="section-subtitle">
          Practical engineering, a dependable process, and attention to the
          details users notice.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason, index) => (
          <article key={reason.title} className="reason-card group">
            <span className="reason-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="card-kicker">Principle {String(index + 1).padStart(2, "0")}</p>
            <h3 className="mt-7 text-lg font-semibold text-deep-teal">
              {reason.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-deep-teal/65">
              {reason.description}
            </p>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
