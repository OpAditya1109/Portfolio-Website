"use client";

import { motion, useAnimationFrame } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

const TECH_STACK = [
  { name: "JavaScript", icon: "/skills/javascript.svg", category: "LANG" },
  { name: "TypeScript", icon: "/skills/typescript.svg", category: "LANG" },
  { name: "Java", icon: "/skills/java.svg", category: "LANG" },
  { name: "Python", icon: "/skills/python.svg", category: "LANG" },
  { name: "HTML", icon: "/skills/html5.svg", category: "FRONTEND" },
  { name: "CSS", icon: "/skills/css3.svg", category: "FRONTEND" },
  { name: "ReactJS", icon: "/skills/react.svg", category: "FRONTEND" },
  { name: "Next.js", icon: "/skills/nextjs.svg", category: "FRONTEND" },
  { name: "Tailwind CSS", icon: "/skills/tailwindcss.svg", category: "FRONTEND" },
  { name: "GSAP", icon: "/skills/gsap.svg", category: "FRONTEND" },
  { name: "Node.js", icon: "/skills/nodejs.svg", category: "BACKEND" },
  { name: "Express.js", icon: "/skills/express.svg", category: "BACKEND" },
  { name: "MongoDB", icon: "/skills/mongodb.svg", category: "BACKEND" },
  { name: "MySQL", icon: "/skills/mysql.svg", category: "BACKEND" },
  { name: "Socket.io", icon: "/skills/socketio.svg", category: "BACKEND" },
  { name: "AWS", icon: "/skills/aws.png", category: "CLOUD" },
  { name: "Docker", icon: "/skills/docker.svg", category: "CLOUD" },
  { name: "Git", icon: "/skills/git.svg", category: "TOOLS" },
  { name: "GitHub", icon: "/skills/github.svg", category: "TOOLS" },
  { name: "Solana", icon: "/skills/solana.png", category: "WEB3" },
];

const CATEGORIES = ["ALL", "LANG", "FRONTEND", "BACKEND", "CLOUD", "TOOLS", "WEB3"];

const CATEGORY_COLORS: Record<string, string> = {
  LANG:     "#e8ff47",
  FRONTEND: "#28c840",
  BACKEND:  "#47b8ff",
  CLOUD:    "#ff9f47",
  TOOLS:    "#c847ff",
  WEB3:     "#ff4747",
};

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

// ── Infinite marquee row ──────────────────────────────
function MarqueeRow({ items, speed = 40, reverse = false }: {
  items: typeof TECH_STACK;
  speed?: number;
  reverse?: boolean;
}) {
  const x   = useRef(0);
  const ref = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    const dir = reverse ? 1 : -1;
    x.current += dir * (speed / 1000) * (delta ?? 16);
    const half = (ref.current?.scrollWidth ?? 0) / 2;
    if (!reverse && x.current <= -half) x.current += half;
    if (reverse  && x.current >= 0)     x.current -= half;
    if (ref.current) ref.current.style.transform = `translateX(${x.current}px)`;
  });

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div ref={ref} style={{ display: "flex", gap: 12, width: "max-content" }}>
        {[...items, ...items].map((tech, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "8px 18px",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 2,
            background: "rgba(255,255,255,0.02)",
            whiteSpace: "nowrap", flexShrink: 0,
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: CATEGORY_COLORS[tech.category] ?? "#e8ff47",
              flexShrink: 0,
            }} />
            <Image src={tech.icon} alt={tech.name} width={16} height={16}
              style={{ opacity: 0.7, width: 16, height: 16, objectFit: "contain" }} />
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11, letterSpacing: "0.1em",
              color: "rgba(232,234,240,0.5)",
            }}>{tech.name}</span>
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 8, letterSpacing: "0.2em",
              color: CATEGORY_COLORS[tech.category] ?? "#e8ff47",
              opacity: 0.6,
            }}>{tech.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tech chip ─────────────────────────────────────────
// FIX: Split into two nested motion.divs so entrance animation
// (whileInView, runs once) and filter animation (animate, reactive)
// never share a `transition` prop and don't conflict.
function TechChip({ tech, index, active }: {
  tech: typeof TECH_STACK[0];
  index: number;
  active: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const color = CATEGORY_COLORS[tech.category] ?? "#e8ff47";

  return (
    // Outer: entrance only — transition applies to whileInView
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Inner: filter + hover — has its own independent transition */}
      <motion.div
        animate={{
          opacity: active ? 1 : 0.15,
          scale:   hovered ? 1.04 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={()   => setHovered(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          padding: "20px 16px",
          border: `1px solid ${hovered ? color : "rgba(255,255,255,0.07)"}`,
          borderRadius: 4,
          background: hovered
            ? `rgba(${hexToRgb(color)}, 0.06)`
            : "rgba(255,255,255,0.015)",
          cursor: "none",
          transition: "border-color 0.2s, background 0.2s",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute", top: 8, right: 8,
          width: 5, height: 5, borderRadius: "50%",
          background: color, opacity: hovered ? 1 : 0.3,
          transition: "opacity 0.2s",
        }} />

        <Image
          src={tech.icon} alt={tech.name}
          width={32} height={32}
          style={{
            width: 32, height: 32, objectFit: "contain",
            opacity: hovered ? 1 : 0.5,
            transition: "opacity 0.2s",
            filter: hovered ? "none" : "grayscale(0.4)",
          }}
        />

        <div style={{ textAlign: "center" }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 10, letterSpacing: "0.08em",
            color: hovered ? "#e8eaf0" : "rgba(232,234,240,0.4)",
            transition: "color 0.2s", whiteSpace: "nowrap",
          }}>{tech.name}</div>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 8, letterSpacing: "0.2em",
            color: hovered ? color : "transparent",
            transition: "color 0.2s", marginTop: 2,
          }}>{tech.category}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ══ Main section ═══════════════════════════════════════
const TechStackSection = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const row1 = TECH_STACK.slice(0, 10);
  const row2 = TECH_STACK.slice(10);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;600&family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      <section id="about" style={{
        background: "#04050a",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />

        {/* Noise */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }} />

        {/* Marquees
        <div style={{ padding: "48px 0 0", opacity: 0.6 }}>
          <MarqueeRow items={row1} speed={35} />
        </div>
        <div style={{ padding: "12px 0 48px", opacity: 0.4 }}>
          <MarqueeRow items={row2} speed={28} reverse />
        </div> */}

        <div style={{
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(232,255,71,0.15), transparent)",
        }} />

        {/* Main content */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 48px 100px" }}>

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: 60 }}
          >
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10, letterSpacing: "0.3em",
              color: "#e8ff47", textTransform: "uppercase",
              marginBottom: 20,
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: "#e8ff47" }} />
              Arsenal
            </div>
            <div style={{
              display: "flex", alignItems: "flex-end",
              justifyContent: "space-between", flexWrap: "wrap", gap: 24,
            }}>
              <h2 style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "clamp(56px, 8vw, 110px)",
                lineHeight: 0.92, letterSpacing: "0.01em",
                color: "#e8eaf0", margin: 0,
              }}>
                TECH<br />
                <span style={{ WebkitTextStroke: "1px rgba(232,234,240,0.25)", color: "transparent" }}>
                  STACK
                </span>
              </h2>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11, color: "rgba(232,234,240,0.3)",
                letterSpacing: "0.15em", paddingBottom: 8,
              }}>
                {String(TECH_STACK.length).padStart(2, "0")} / TECHNOLOGIES
              </div>
            </div>
          </motion.div>

          {/* Filter bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              display: "flex",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 4, overflow: "hidden",
              marginBottom: 40, width: "fit-content",
            }}
          >
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10, letterSpacing: "0.1em",
              color: "#e8ff47", padding: "9px 16px",
              background: "rgba(232,255,71,0.05)",
              borderRight: "1px solid rgba(255,255,255,0.07)",
              display: "flex", alignItems: "center",
            }}>~$ filter</div>

            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 10, letterSpacing: "0.15em",
                  padding: "9px 18px",
                  background: activeFilter === cat ? "#e8ff47" : "transparent",
                  color: activeFilter === cat ? "#04050a" : "rgba(232,234,240,0.35)",
                  border: "none",
                  borderRight: "1px solid rgba(255,255,255,0.07)",
                  cursor: "none",
                  transition: "background 0.15s, color 0.15s",
                  fontWeight: activeFilter === cat ? 700 : 400,
                }}
              >{cat}</button>
            ))}
          </motion.div>

          {/* Legend — also clickable as filter shortcuts */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 40 }}
          >
            {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(activeFilter === cat ? "ALL" : cat)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 9, letterSpacing: "0.2em",
                  color: activeFilter === cat ? color : "rgba(232,234,240,0.35)",
                  background: "none", border: "none", cursor: "none",
                  transition: "color 0.2s",
                }}
              >
                <div style={{
                  width: 6, height: 6, borderRadius: "50%", background: color,
                  opacity: activeFilter === cat || activeFilter === "ALL" ? 1 : 0.3,
                  transition: "opacity 0.2s",
                }} />
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Grid — all chips always rendered; active prop controls opacity */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
            gap: 10,
          }}>
            {TECH_STACK.map((tech, i) => (
              <TechChip
                key={tech.name}
                tech={tech}
                index={i}
                active={activeFilter === "ALL" || tech.category === activeFilter}
              />
            ))}
          </div>

          {/* Terminal about */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              marginTop: 60,
              padding: "20px 24px",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 4,
              background: "rgba(255,255,255,0.015)",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "clamp(10px, 1vw, 12px)",
              lineHeight: 2,
            }}
          >
            <div>
              <span style={{ color: "#e8ff47" }}>~$ </span>
              <span style={{ color: "rgba(232,234,240,0.5)" }}>cat ./about.txt</span>
            </div>
            <div style={{ color: "rgba(232,234,240,0.35)", marginTop: 4 }}>
              → Currently pursuing B.E. in Electronics &amp; Telecom — graduating June 2025.
            </div>
            <div style={{ color: "rgba(232,234,240,0.35)" }}>
              → Built 6+ full-stack products spanning Web2 and Web3.
            </div>
            <div style={{ color: "rgba(232,234,240,0.35)" }}>
              → Open to full-time roles, freelance, and collaboration.
            </div>
            <div style={{ marginTop: 4 }}>
              <span style={{ color: "#28c840" }}>✓ </span>
              <span style={{ color: "rgba(232,234,240,0.25)" }}>EOF — Pune, India</span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TechStackSection;