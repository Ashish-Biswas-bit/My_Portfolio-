import SectionWrapper from "./SectionWrapper";
import { FiBookOpen, FiMapPin } from "react-icons/fi";

const educationDetails = [
  { label: "Degree", value: "B.Sc." },
  { label: "Field", value: "Computer Science and Engineering" },
  { label: "Institution", value: "North Western University" },
  { label: "Location", value: "Khulna" },
];

export default function Education() {
  return (
    <SectionWrapper id="education">
      <div className="section-heading">
        <p className="eyebrow">Academic background</p>
        <h2 className="section-title">
          Education &amp; <span className="accent-word">foundation.</span>
        </h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="surface-card p-7 sm:p-9">
          <span className="education-icon">
            <FiBookOpen aria-hidden="true" size={23} />
          </span>
          <p className="mt-7 card-kicker">Undergraduate degree</p>
          <h3 className="mt-3 max-w-xl text-2xl font-semibold leading-snug tracking-tight text-deep-teal sm:text-3xl">
            B.Sc. in Computer Science and Engineering (CSE)
          </h3>
          <p className="mt-3 text-base font-medium text-deep-teal/75">
            North Western University
          </p>
          <p className="mt-2 inline-flex items-center gap-2 text-sm text-deep-teal/55">
            <FiMapPin aria-hidden="true" /> Khulna
          </p>
        </article>

        <div className="surface-card divide-y divide-deep-teal/10 p-6 sm:p-8">
          <div className="pb-4">
            <p className="card-kicker">Verified details</p>
            <h3 className="mt-2 text-lg font-semibold text-deep-teal">
              Academic record
            </h3>
          </div>
          {educationDetails.map((detail) => (
            <div
              key={detail.label}
              className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
            >
              <span className="text-xs font-medium uppercase tracking-wide text-deep-teal/50">
                {detail.label}
              </span>
              <span className="text-sm font-medium text-deep-teal sm:text-right">
                {detail.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
