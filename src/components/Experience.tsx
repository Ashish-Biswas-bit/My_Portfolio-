import SectionWrapper from "./SectionWrapper";

const milestones = [
  {
    label: "Full Stack Web",
    title: "From interface to data layer",
    description:
      "Working across responsive web interfaces, application logic, backend services, and connected databases.",
    stack: ["React", "Next.js", "Node.js", "MySQL", "Supabase"],
  },
  {
    label: "Desktop Software",
    title: "Useful tools for desktop workflows",
    description:
      "Building desktop application interfaces and utility software with Python and Tkinter.",
    stack: ["Python", "Tkinter", "SQLite"],
  },
  {
    label: "Academic Foundation",
    title: "Computer Science & Engineering",
    description:
      "Pursuing a B.Sc. in Computer Science and Engineering at North Western University, Khulna.",
    stack: [],
  },
];

export default function Experience() {
  return (
    <SectionWrapper id="experience" className="section-muted">
      <div className="section-heading">
        <p className="eyebrow">Work &amp; learning</p>
        <h2 className="section-title">
          My engineering <span className="accent-word">journey.</span>
        </h2>
        <p className="section-subtitle">
          A view of the areas I build in and the academic foundation behind them.
        </p>
      </div>

      <ol className="timeline mx-auto max-w-3xl">
        {milestones.map((milestone, index) => (
          <li key={milestone.label} className="timeline-item">
            <span className="timeline-node" aria-hidden="true" />
            <article className="surface-card p-6 sm:p-7">
              <span className="card-kicker">
                0{index + 1} / {milestone.label}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-deep-teal">
                {milestone.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-deep-teal/65">
                {milestone.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {milestone.stack.map((item) => (
                  <li key={item} className="skill-tag">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </SectionWrapper>
  );
}
