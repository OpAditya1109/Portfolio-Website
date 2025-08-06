"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ArrowupRightIcon from "@/assets/icons/arrow-up-right.svg";
import grainImage from "@/assets/images/grain.jpg";
import lays from "@/assets/images/LAY's Project.png";
import securapay from "@/assets/images/Secura-Pay.png";
import portfolioproject from "@/assets/images/Portfolio-Website.png";

const portfolioProjects = [
  {
    title: "LAY'S Interactive Landing Page",
    description: "An engaging landing page for LAY'S campaign designed to boost interaction and performance.",
    techStack: ["React.js", "Tailwind CSS", "Framer Motion", "Next.js"],
    link: "https://bug-busters-reimagine-round1.vercel.app/",
    image: lays,
  },
  {
    title: "Secura-Pay: Secure & Fast Blockchain Payments",
    description: "A blockchain-based payment platform enabling secure and efficient crypto transactions.",
    techStack: ["React.js", "Solidity", "Ethers.js", "Node.js", "Smart Contracts"],
    link: "https://github.com/OpAditya1109/SecuraPay.git",
    image: securapay,
  },
  {
    title: "Crafting Digital Experiences with Innovation",
    description: "A modern personal portfolio showcasing development work, animations, and contact integrations.",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "EmailJS"],
    link: "https://portfolio-website-eight-ivory.vercel.app/",
    image: portfolioproject,
  },
];

export const ProjectsSection = () => {
  return (
    <section className="pb-16 lg:py-24">
      <div className="container">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <p className="uppercase font-semibold tracking-widest bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-transparent">
            Featured Case Studies
          </p>
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-serif text-3xl md:text-5xl mt-6"
          >
            <span className="text-white">Elevated </span>
            <span className="text-transparent bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text italic">
              Works
            </span>
          </motion.h2>
        </motion.div>

        {/* Project Cards */}
        <div className="mt-10 flex flex-col gap-20 md:mt-20">
          {portfolioProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              className="bg-gray-800 rounded-3xl relative z-0 overflow-hidden px-8 pt-8 md:pt-12 md:px-10 lg:pt-16 lg:px-20 sticky top-16 shadow-lg"
            >
              {/* Background Texture */}
              <div
                className="absolute inset-0 -z-10 opacity-5"
                style={{ backgroundImage: `url(${grainImage.src})` }}
              ></div>

              <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                {/* Text Content */}
                <div className="lg:pb-16">
                  <h3 className="font-serif text-2xl mt-2 md:text-4xl md:mt-5">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-white/70 text-sm md:text-base mt-3">
                    {project.description}
                  </p>

                  <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-white/10 text-white text-xs md:text-sm px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Animated Button */}
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        background:
                          "linear-gradient(90deg, rgba(16,185,129,1) 0%, rgba(6,182,212,1) 100%)",
                        boxShadow: "0px 4px 15px rgba(16, 185, 129, 0.4)",
                        color: "black",
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="relative overflow-hidden text-gray-950 h-12 w-full rounded-xl font-semibold inline-flex items-center gap-2 mt-8 justify-center md:w-auto px-6 border border-white text-white"
                    >
                      <span>View Live Site</span>
                      <ArrowupRightIcon className="size-4" />
                    </motion.button>
                  </a>
                </div>

                {/* Project Image */}
                <div className="relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
