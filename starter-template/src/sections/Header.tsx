"use client";
import { useState, useEffect } from "react";

export const Header = () => {
  const [activeSection, setActiveSection] = useState("home");

  // Function to handle smooth scrolling
  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id); // Update active section on click
    }
  };

  // Detect which section is currently visible
  useEffect(() => {
    const handleScrollEvent = () => {
      const sections = ["home", "projects", "contact"];
      let currentSection = "home";

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  return (
    <div className="flex justify-center items-center top-3 w-full fixed z-50">
      <nav className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur">
        <button
          onClick={() => handleScroll("home")}
          className={`nav-item ${activeSection === "home" ? "bg-white text-gray-900" : ""}`}
        >
          Home
        </button>
        <button
          onClick={() => handleScroll("projects")}
          className={`nav-item ${activeSection === "projects" ? "bg-white text-gray-900" : ""}`}
        >
          Projects
        </button>
        <button
          onClick={() => handleScroll("contact")}
          className={`nav-item ${activeSection === "contact" ? "bg-white text-gray-900" : ""}`}
        >
          Contact
        </button>
      </nav>
    </div>
  );
};
