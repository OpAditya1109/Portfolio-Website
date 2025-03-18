"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const techStack = [
  { name: "JavaScript", icon: "/skills/javascript.svg" },
  { name: "Java", icon: "/skills/java.svg" },
  { name: "MySQL", icon: "/skills/mysql.svg" },
  { name: "HTML", icon: "/skills/html5.svg" },
  { name: "CSS", icon: "/skills/css3.svg" },
  { name: "ReactJS", icon: "/skills/react.svg" },
  { name: "Next.js", icon: "/skills/nextjs.svg" },
  { name: "Tailwind CSS", icon: "/skills/tailwindcss.svg" },
  { name: "Node.js", icon: "/skills/nodejs.svg" },
  { name: "Express.js", icon: "/skills/express.svg" },
  { name: "MongoDB", icon: "/skills/mongodb.svg" },
  { name: "AWS", icon: "/skills/aws.png" },
  { name: "Docker", icon: "/skills/docker.svg" },

  { name: "Git", icon: "/skills/git.svg" },
  { name: "GitHub", icon: "/skills/github.svg" },
];

const getAnimation = (index: number) => {
  const directions = ["left", "right", "top", "bottom"];
  const direction = directions[index % directions.length];

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "top" ? -100 : direction === "bottom" ? 100 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, delay: index * 0.1 },
    },
  };

  return variants;
};

const TechStack = () => {
  return (
    <section className="flex flex-col items-center justify-center bg-[#0A0A0A] text-white py-16">
      {/* Title */}
      <motion.h2
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        My Tech Stack
      </motion.h2>

      {/* Grid of Tech Stack */}
      <motion.div
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {techStack.map((tech, index) => (
          <motion.div
            key={index}
            variants={getAnimation(index)}
            whileHover={{ scale: 1.1, rotate: -3 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-full bg-gray-900/80 shadow-md backdrop-blur-lg"
          >
            <Image src={tech.icon} alt={tech.name} width={24} height={24} className="w-6 h-6" />
            <motion.span
              className="text-white font-medium"
              whileHover={{ color: "#38bdf8" }} // Changes to Tailwind's sky-400 color on hover
            >
              {tech.name}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TechStack;
