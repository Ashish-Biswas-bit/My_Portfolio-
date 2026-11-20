import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhyHireMe from "@/components/WhyHireMe";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhyHireMe />
        <Skills />
        <Services />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
