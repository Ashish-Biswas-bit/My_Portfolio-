import SectionWrapper from "./SectionWrapper";

const focusAreas = [
  {
    number: "01",
    title: "Full Stack Web Architecture",
    description:
      "Building connected experiences across the frontend, backend, and data layers.",
    className: "lg:col-span-2",
  },
  {
    number: "02",
    title: "Desktop Software",
    description:
      "Creating practical Python and Tkinter tools for desktop workflows.",
    className: "",
  },
];

export default function About() {
  return (
    <SectionWrapper id="about">
      <div className="section-heading">
        <p className="eyebrow">A little about me</p>
        <h2 className="section-title">
          Engineering with <span className="accent-word">purpose.</span>
        </h2>
        <p className="section-subtitle">
          I enjoy turning complex requirements into clear, useful software.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <article className="surface-card p-7 md:col-span-2 lg:row-span-2 lg:p-9">
          <span className="card-kicker">01 / Background</span>
          <h3 className="mt-7 max-w-md text-2xl font-semibold leading-snug tracking-tight text-deep-teal sm:text-3xl">
            Web, desktop, and the systems that connect them.
          </h3>
          <p className="mt-5 max-w-lg leading-7 text-deep-teal/70">
            I&apos;m Ashish Biswas, a Computer Science and Engineering student at
            North Western University, Khulna. I focus on building end-to-end web
            and desktop software with a practical, user-first approach.
          </p>
          <div className="mt-8 border-t border-deep-teal/10 pt-5">
            <span className="text-sm font-medium text-deep-teal">
              B.Sc. in Computer Science and Engineering
            </span>
            <p className="mt-1 text-sm text-deep-teal/55">
              North Western University · Khulna
            </p>
          </div>
        </article>

        {focusAreas.map((area) => (
          <article
            key={area.number}
            className={`surface-card p-6 ${area.className}`}
          >
            <span className="card-kicker">{area.number} / Focus</span>
            <h3 className="mt-5 text-lg font-semibold text-deep-teal">
              {area.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-deep-teal/65">
              {area.description}
            </p>
          </article>
        ))}

        <article className="surface-card bg-deep-teal p-6 text-ice-white lg:col-span-2">
          <span className="card-kicker !text-white/50">03 / Workflow</span>
          <h3 className="mt-5 text-lg font-semibold">Tools I work with</h3>
          <p className="mt-2 text-sm leading-6 text-white/65">
            A clean GitHub workflow, VS Code for focused development, and
            thoughtful database design.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["GitHub", "VS Code", "Database design"].map((item) => (
              <span key={item} className="dark-tag">
                {item}
              </span>
            ))}
          </div>
        </article>
      </div>
    </SectionWrapper>
  );
}
