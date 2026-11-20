import SectionWrapper from "./SectionWrapper";

const skillGroups = [
  {
    number: "01",
    title: "Frontend Development",
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    number: "02",
    title: "Backend & Databases",
    skills: ["Node.js", "MySQL", "SQLite", "Supabase", "Firebase"],
  },
  {
    number: "03",
    title: "Desktop Software",
    skills: ["Python", "Tkinter"],
  },
  {
    number: "04",
    title: "Tools & Version Control",
    skills: ["GitHub", "VS Code"],
  },
];

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <div className="section-heading">
        <p className="eyebrow">Core capabilities</p>
        <h2 className="section-title">
          The tools behind <span className="accent-word">the work.</span>
        </h2>
        <p className="section-subtitle">
          A focused toolkit spanning modern web development and desktop
          software.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {skillGroups.map((group) => (
          <article key={group.number} className="surface-card p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="card-kicker">Category {group.number}</span>
                <h3 className="mt-3 text-lg font-semibold text-deep-teal">
                  {group.title}
                </h3>
              </div>
              <span className="font-mono text-sm text-soft-peach">
                {group.number}
              </span>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li key={skill} className="skill-tag">
                  {skill}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
