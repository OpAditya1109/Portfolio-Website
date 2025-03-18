"use client";
import { useRef } from "react";
import { Header } from "@/sections/Header";
import { HeroSection } from "@/sections/Hero";
import { ProjectsSection } from "@/sections/Projects";
import { TapeSection } from "@/sections/Tape";
import { ContactSection } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import TechStack from "@/sections/TechStack";

export default function Home() {
  // Step 1: Create a reference to ProjectsSection
  const projectsRef = useRef<HTMLDivElement>(null);

  // Step 2: Function to scroll to ProjectsSection
  const scrollToProjects = () => {
    if (projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Header />
      <div id="home">
      {/* Step 3: Pass scrollToProjects to HeroSection */}
      <HeroSection scrollToProjects={scrollToProjects}  />
      </div>
      {/* Attach ref to ProjectsSection */}
      <div ref={projectsRef} id="projects">
        <ProjectsSection />
      </div>

      <TapeSection />
      <TechStack />
      <div id="contact">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
}
