"use client";

import { useEffect, useMemo, useState } from "react";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import SectionWrapper from "./SectionWrapper";
import { db, collection, onSnapshot, query, orderBy } from "@/lib/supabase-db";
import type { ProjectData } from "@/lib/useContent";

const categories = ["All", "Full Stack Web", "Desktop Software"] as const;
type ProjectCategory = (typeof categories)[number];

const verifiedStack = new Set([
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "MySQL",
  "SQLite",
  "Supabase",
  "Firebase",
  "Python",
  "Tkinter",
  "GitHub",
  "VS Code",
]);

function getCategory(category: string): Exclude<ProjectCategory, "All"> | null {
  const normalized = category.trim().toLowerCase();
  if (normalized === "web" || normalized === "full stack web") {
    return "Full Stack Web";
  }
  if (normalized === "desktop" || normalized === "desktop software") {
    return "Desktop Software";
  }
  return null;
}

function isExternalUrl(value: string | undefined) {
  return Boolean(value && /^https?:\/\//i.test(value));
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [projectsError, setProjectsError] = useState(false);

  useEffect(() => {
    const projectsQuery = query(collection(db, "projects"), orderBy("order"));
    return onSnapshot(
      projectsQuery,
      (snapshot) => {
        setProjectsError(false);
        setProjects(
          snapshot.docs.map(
            (document) =>
              ({ id: document.id, ...document.data() }) as ProjectData
          )
        );
      },
      () => setProjectsError(true)
    );
  }, []);

  const visibleProjects = useMemo(
    () =>
      projects.filter((project) => {
        const category = getCategory(project.category);
        const hasRealLink =
          isExternalUrl(project.github) || isExternalUrl(project.live);
        return (
          category !== null &&
          hasRealLink &&
          (activeCategory === "All" || category === activeCategory)
        );
      }),
    [activeCategory, projects]
  );

  return (
    <SectionWrapper id="projects">
      <div className="section-heading">
        <p className="eyebrow">Selected work</p>
        <h2 className="section-title">
          Projects with a <span className="accent-word">purpose.</span>
        </h2>
        <p className="section-subtitle">
          Web and desktop software projects, presented with the tools and links
          available.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-2" aria-label="Filter projects">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`filter-button ${
              activeCategory === category ? "filter-button-active" : ""
            }`}
            onClick={() => setActiveCategory(category)}
            aria-pressed={activeCategory === category}
          >
            {category}
          </button>
        ))}
      </div>

      {projectsError ? (
        <p
          role="status"
          className="surface-card mx-auto max-w-2xl px-6 py-8 text-center text-sm leading-6 text-deep-teal/65"
        >
          Project data could not load. Check the Supabase schema and project
          settings.
        </p>
      ) : visibleProjects.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2">
          {visibleProjects.map((project) => {
            const category = getCategory(project.category);
            const projectTech = Array.isArray(project.tech)
              ? project.tech.filter((technology) => verifiedStack.has(technology))
              : [];
            const hasImage = isExternalUrl(project.image);
            const hasGithub = isExternalUrl(project.github);
            const hasLive = isExternalUrl(project.live);

            return (
              <article
                key={project.id ?? project.title}
                  className="surface-card project-card group overflow-hidden"
              >
                <div className="project-visual">
                  {hasImage ? (
                    <img
                      src={project.image}
                      alt={`${project.title} project preview`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="project-placeholder">
                      <span className="font-mono text-5xl font-semibold tracking-tight text-deep-teal/10">
                        {category === "Desktop Software" ? "DS" : "WEB"}
                      </span>
                    </div>
                  )}
                  {category && <span className="project-category">{category}</span>}
                </div>

                <div className="p-6 sm:p-7">
                  <p className="card-kicker">Project overview</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-deep-teal">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-deep-teal/65">
                    {project.description}
                  </p>

                  {projectTech.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {projectTech.map((technology) => (
                        <li key={technology} className="project-tech">
                          {technology}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 border-t border-deep-teal/10 pt-5">
                    {hasLive && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        Live Demo <FiArrowUpRight aria-hidden="true" />
                      </a>
                    )}
                    {hasGithub && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <FiGithub aria-hidden="true" /> GitHub Source
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="surface-card mx-auto max-w-2xl px-6 py-12 text-center sm:px-10">
          <p className="card-kicker">Case studies</p>
          <h3 className="mt-3 text-xl font-semibold text-deep-teal">
            Project write-ups are being prepared.
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-deep-teal/65">
            Only projects with a working demo or source link are shown here.
            Get in touch to discuss my web and desktop software work.
          </p>
          <a href="#contact" className="button-secondary mt-6">
            Discuss a project <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>
      )}
    </SectionWrapper>
  );
}
