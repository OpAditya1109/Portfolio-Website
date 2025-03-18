"use client";

import { motion } from "framer-motion";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import backgroundImage from "@/assets/images/custom-bg.png"; // Your uploaded image

export const ContactSection = () => {
  return (
    <div className="py-20 lg:py-28">
      <div className="container">
        {/* 🔥 Luxurious Dark Background */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl text-center md:text-left shadow-2xl p-12 md:p-16  "
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 opacity-50 -z-10"
            style={{
              backgroundImage: `url(${backgroundImage.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <div className="flex flex-col gap-10 items-center md:flex-row md:gap-16">
            {/* 🚀 Power Statement */}
            <div>
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-4xl md:text-5xl font-bold text-white leading-snug tracking-tight uppercase"
              >
                Build the <span className="text-purple-500">Future</span>, <br /> Let's Make It <span className="text-cyan-400">Happen</span>.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-lg mt-4 text-gray-300 max-w-2xl"
              >
                Don’t just dream it. Execute it. Let’s create something groundbreaking that sets new standards.
              </motion.p>
            </div>

            {/* ⚡ High-Energy CTA Button */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
            >
              <motion.button
                whileHover={{
                  scale: 1.1,
                  background: "whitesmoke",
                  color: "black",
                  boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative px-8 py-4 text-lg font-semibold uppercase tracking-wider text-white rounded-lg flex items-center gap-2 border border-gray-500 shadow-xl backdrop-blur-md bg-white/10"
              >
                <span>Let's Talk</span>
                <ArrowUpRightIcon className="size-6" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
