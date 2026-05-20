"use client";

import dynamic from "next/dynamic";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhyHireMe from "@/components/WhyHireMe";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Education from "@/components/Education";
import CallToAction from "@/components/CallToAction";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const ThreeBackground = dynamic(
  () => import("@/components/ThreeBackground"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <ThreeBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <WhyHireMe />
        <Skills />
        <Services />
        <Projects />
        <Experience />
        <Testimonials />
        <Education />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
