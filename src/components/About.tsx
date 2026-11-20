import { FiBookOpen, FiCode, FiDatabase, FiGitBranch } from "react-icons/fi";
import SectionWrapper from "./SectionWrapper";

const lightCardClasses =
  "rounded-2xl border border-deep-teal/10 bg-white p-6 shadow-[0_8px_26px_rgba(15,61,71,0.04)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-soft-peach/60 hover:shadow-lg hover:shadow-deep-teal/5 sm:p-8";

const focusAreas = [
  {
    number: "02",
    title: "Full Stack Web Architecture",
    description:
      "Building connected experiences across the frontend, backend, and data layers.",
    technologies: ["Next.js", "React", "Node.js"],
  },
  {
    number: "03",
    title: "Desktop Software",
    description:
      "Creating practical Python and Tkinter tools for desktop workflows.",
    technologies: ["Python", "Tkinter", "SQLite"],
  },
];

const workflowTools = [
  { label: "GitHub", icon: FiGitBranch },
  { label: "VS Code", icon: FiCode },
  { label: "Database Design", icon: FiDatabase },
];

export default function About() {
  return (
    <SectionWrapper id="about" className="!py-20 lg:!py-28">
      <header className="mb-10 grid gap-5 lg:mb-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-deep-teal/70">
            <span className="h-px w-8 bg-soft-peach" aria-hidden="true" />
            A little about me
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-deep-teal sm:text-4xl lg:text-5xl">
            Engineering with purpose.
          </h2>
        </div>
        <p className="max-w-2xl text-base leading-7 text-deep-teal/75 sm:text-lg sm:leading-8 lg:col-span-5 lg:pb-1">
          I enjoy turning complex requirements into clear, useful software.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <article
          className={`${lightCardClasses} flex flex-col lg:col-span-7 lg:min-h-[28rem]`}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-soft-peach">
              01 / BACKGROUND
            </p>
            <h3 className="mt-7 max-w-xl text-3xl font-semibold leading-tight tracking-tight text-deep-teal sm:text-4xl">
              Web, desktop, and the systems that connect them.
            </h3>
            <p className="mt-5 max-w-xl text-base leading-7 text-deep-teal/70 sm:text-lg sm:leading-8">
              I&apos;m Ashish Biswas, a Computer Science and Engineering
              student at North Western University, Khulna. I focus on building
              end-to-end web and desktop software with a practical, user-first
              approach.
            </p>
          </div>

          <div className="mt-auto pt-8">
            <div className="flex items-start gap-4 rounded-xl border border-deep-teal/10 bg-ice-white p-4 sm:items-center">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-soft-peach/20 text-deep-teal">
                <FiBookOpen size={19} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold leading-6 text-deep-teal sm:text-base">
                  B.Sc. in Computer Science and Engineering
                </p>
                <p className="mt-1 text-sm text-deep-teal/65">
                  North Western University · Khulna
                </p>
              </div>
            </div>
          </div>
        </article>

        <div className="grid gap-6 md:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:grid-rows-2 lg:min-h-[28rem]">
          {focusAreas.map((area) => (
            <article
              key={area.number}
              className={`${lightCardClasses} flex min-h-64 flex-col lg:min-h-0`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-soft-peach">
                {area.number} / FOCUS
              </p>
              <h3 className="mt-5 text-xl font-semibold leading-snug tracking-tight text-deep-teal sm:text-2xl">
                {area.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-deep-teal/70 sm:text-base">
                {area.description}
              </p>
              <ul
                aria-label={`${area.title} technologies`}
                className="mt-auto flex flex-wrap gap-2 pt-5"
              >
                {area.technologies.map((technology) => (
                  <li
                    key={technology}
                    className="rounded-full border border-deep-teal/10 bg-ice-white px-3 py-1 text-xs font-medium text-deep-teal/80"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <article className="group flex flex-col gap-6 rounded-2xl border border-deep-teal bg-deep-teal p-6 text-ice-white transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-soft-peach hover:shadow-lg hover:shadow-deep-teal/10 md:flex-row md:items-center md:justify-between sm:p-8 lg:col-span-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-soft-peach">
              04 / WORKFLOW
            </p>
            <h3 className="mt-4 text-xl font-semibold tracking-tight sm:text-2xl">
              Tools I work with
            </h3>
            <p className="mt-2 text-sm leading-6 text-ice-white/70 sm:text-base">
              A clean GitHub workflow, VS Code for focused development, and
              thoughtful database design.
            </p>
          </div>

          <ul className="flex flex-wrap gap-2">
            {workflowTools.map(({ label, icon: Icon }) => (
              <li key={label}>
                <span className="inline-flex items-center gap-2 rounded-full border border-ice-white/15 bg-ice-white/10 px-4 py-2.5 text-sm font-medium text-ice-white transition-colors hover:border-soft-peach hover:bg-ice-white/15">
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </SectionWrapper>
  );
}
