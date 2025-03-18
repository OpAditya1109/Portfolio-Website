import Image from "next/image";
import { useState } from "react";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import ProfileImage from "@/assets/images/Profile-Image.png";
import { ClipboardIcon, CheckIcon, DocumentArrowDownIcon } from "@heroicons/react/24/solid";

interface HeroSectionProps {
  scrollToProjects: () => void;
}

export const HeroSection = ({ scrollToProjects }: HeroSectionProps) => {
  const [showEmail, setShowEmail] = useState(false);
  const [copied, setCopied] = useState(false);
  const email = "aditya8yadav8@gmail.com";

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/bgBluredHero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0A0A0A]"></div>

      {/* Resume Button (Fixed Position) */}
      <div className="absolute top-6 right-6 z-50">
        <a
          href="/Aditya_Yadav_Resume.pdf"
          download="Aditya_Yadav_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition flex items-center justify-center group"
          title="Download Resume"
        >
          <DocumentArrowDownIcon className="w-6 h-6 text-white group-hover:text-gray-300 transition" />
        </a>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 py-32 md:py-48 lg:py-55 flex items-center justify-center">
        <div className="container text-white text-center">
          {/* Profile Text with Image in the Middle */}
          <div className="flex items-center justify-center gap-3 md:gap-5 text-lg md:text-2xl font-semibold">
            <span>Hello, I'm Aditya Yadav</span>
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden">
              <Image
                src={ProfileImage}
                alt="Aditya Yadav"
                width={100}
                height={100}
                className="object-cover w-full h-full"
              />
            </div>
            <span>a Full Stack Developer</span>
          </div>

          {/* Subtitle */}
          <p className="mt-4 text-white/70 text-3xl md:text-4xl">
            Crafting seamless digital solutions that drive engagement and innovation.
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-4">
            <button
              onClick={scrollToProjects}
              className="inline-flex items-center px-6 h-12 rounded-xl gap-2 border border-white/15 hover:bg-white/10 transition"
            >
              <span className="font-semibold">Explore my Work</span>
              <ArrowDown className="size-4" />
            </button>

            {/* Let's Connect Button (Reveals Email on Click) */}
            <button
              onClick={() => setShowEmail(true)}
              className="inline-flex items-center gap-2 border border-white bg-white text-gray-900 h-12 px-6 rounded-xl hover:bg-gray-200 transition relative"
            >
              {showEmail ? (
                <>
                  <span className="font-mono">{email}</span>
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-md bg-white/20 hover:bg-white/30 transition"
                  >
                    {copied ? (
                      <CheckIcon className="w-5 h-5 text-green-400" />
                    ) : (
                      <ClipboardIcon className="w-5 h-5" />
                    )}
                  </button>
                </>
              ) : (
                <>
                  <span>Hello</span>
                  <span className="font-semibold">Let's Connect</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
