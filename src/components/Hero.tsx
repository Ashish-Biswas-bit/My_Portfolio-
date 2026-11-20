import { FiArrowRight, FiFileText } from "react-icons/fi";
import LiveCodeEditor from "./LiveCodeEditor";

export default function Hero() {
  return (
    <section
      id="home"
      className="hero-section scroll-mt-20 py-20 sm:py-28 lg:min-h-[calc(100svh-4rem)] lg:py-20"
    >
      <div className="section-container grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="max-w-2xl">
          <div className="status-pill mb-7">
            <span className="status-dot" />
            Available for Full Stack &amp; Desktop Projects
          </div>

          <p className="eyebrow mb-4">Full Stack Web &amp; Desktop Software Developer</p>
          <h1 className="text-[clamp(2.75rem,7vw,5.75rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-deep-teal">
            Hi, I&apos;m
            <br />
            <span className="hero-name">
              <span>Ashish Biswas.</span>
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-deep-teal/70 sm:text-xl">
            I build thoughtful web applications and practical desktop software—from
            polished interfaces to reliable data-backed features.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="button-primary hero-primary">
              View Projects <FiArrowRight aria-hidden="true" />
            </a>
            <a href="#contact" className="button-secondary">
              <FiFileText aria-hidden="true" /> Request CV
            </a>
          </div>

          <a href="#about" className="hero-scroll" aria-label="Scroll to About">
            <span className="hero-scroll-track" aria-hidden="true">
              <span />
            </span>
            <span>Scroll to explore</span>
          </a>
        </div>

        <LiveCodeEditor />
      </div>
    </section>
  );
}
