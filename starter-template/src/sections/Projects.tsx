"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import ArrowupRightIcon from "@/assets/icons/arrow-up-right.svg";

// ─────────────────────────────────────────────────────
// HOW TO ADD SCREENSHOTS:
// 1. Visit each project URL in your browser
// 2. Take a full-page screenshot (1280×800 recommended)
//    → Free tool: screenshotmachine.com or Cmd+Shift+4 (Mac)
// 3. Save to /public/projects/ with the filenames below
// 4. Images show instantly — no API, no rate limits
// ─────────────────────────────────────────────────────

// ── TOP 3 FEATURED (big terminal cards) ───────────────
const ALL_PROJECTS = [
  {
    id: "01",
    title: "ASTROBHAVANA",
    shortTitle: "ASTROBHAVANA",
    description:
      "Full-stack astrology consultation platform with live chat, call, and video. Cashfree payments, WhatsApp reminders, and an admin dashboard for astrologers.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Cashfree", "JWT", "Socket.io"],
    link: "https://astrobhavana.com",
    github: null,
    screenshot: "/projects/astrobhavana.png",
    status: "LIVE",
    highlight: "MERN · PAYMENTS · REAL-TIME",
    category: "FULLSTACK",
  },
  {
    id: "02",
    title: "WELLBI — SHOPIFY PREORDER",
    shortTitle: "WELLBI",
    description:
      "Custom preorder system for out-of-stock products. WhatsApp notifications, automated restock alerts, and Bluedart real-time order tracking — all built on Shopify.",
    techStack: ["Shopify", "Liquid", "JavaScript", "Bluedart API", "WhatsApp API"],
    link: "https://wellbi.in",
    github: null,
    screenshot: "/projects/wellbi.png",
    status: "LIVE",
    highlight: "SHOPIFY · CUSTOM DEV",
    category: "SHOPIFY",
  },
  {
    id: "03",
    title: "BOMBUCHA — SHOPIFY STORE",
    shortTitle: "BOMBUCHA",
    description:
      "Built a brand-new Shopify store from scratch for Bombucha — a kombucha brand. Custom theme, product pages, collections, animations, and full storefront setup optimised for conversions.",
    techStack: ["Shopify", "Liquid", "JavaScript", "CSS"],
    link: "https://bombucha.in",
    github: null,
    screenshot: "/projects/Bombucha.png",
    status: "LIVE",
    highlight: "SHOPIFY · FULL BUILD",
    category: "SHOPIFY",
  },
];

// ── REMAINING PROJECTS (filterable grid) ──────────────
const MORE_PROJECTS = [
  {
    id: "04",
    title: "LAY'S INTERACTIVE LANDING PAGE",
    shortTitle: "LAYS_LANDING",
    description:
      "Pixel-perfect replica of the LAY'S brand site with smooth scroll animations. Ranked top 10% out of 1,000+ teams in a national hackathon.",
    techStack: ["HTML", "CSS", "JavaScript", "GSAP", "Intersection Observer"],
    link: "https://bug-busters-reimagine-round1.vercel.app/",
    github: null,
    screenshot: "/projects/lays.png",
    status: "LIVE",
    highlight: "TOP 100 / 1000+ TEAMS",
    category: "FRONTEND",
  },
  {
    id: "05",
    title: "SECURA PAY",
    shortTitle: "SECURA_PAY",
    description:
      "UPI-like decentralised payment system on Solana. Wallet-based login, smart contract transactions, fraud detection, and live CoinGecko crypto price feeds.",
    techStack: ["React.js", "Solana", "Node.js", "MongoDB", "Smart Contracts"],
    link: null,
    github: "https://github.com/OpAditya1109/SecuraPay",
    screenshot: "/projects/securapay.png",
    status: "GITHUB",
    highlight: "BLOCKCHAIN · WEB3",
    category: "WEB3",
  },
  {
    id: "06",
    title: "PORTFOLIO v2025",
    shortTitle: "PORTFOLIO_SITE",
    description:
      "This very site. Boot sequence, animated terminal, custom cursor, and a design system built from scratch. No templates — engineered top to bottom.",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    link: "https://portfolio-website-eight-ivory.vercel.app/",
    github: null,
    screenshot: "/projects/portfolio.png",
    status: "LIVE",
    highlight: "YOU ARE HERE",
    category: "FULLSTACK",
  },
  {
    id: "07",
    title: "BHAVANA MATRIMONY",
    shortTitle: "BHAVANA_MATRIMONY",
    description:
      "Full-featured matrimony platform with profile creation, partner matching, photo gallery, horoscope details, contact requests, and an admin dashboard for member management.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    link: "https://bhavanamatrimony.com",
    github: null,
    screenshot: "/projects/bhavanamatrimony.png",
    status: "LIVE",
    highlight: "MERN · MATRIMONY",
    category: "FULLSTACK",
  },
  {
    id: "08",
    title: "QUEUE MANAGEMENT SYSTEM",
    shortTitle: "QUEUE_MGR",
    description:
      "Multi-restaurant queue platform with real-time tracking, restaurant dashboard, and WhatsApp/SMS notification support.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    link: "https://restaurant-queue-management.vercel.app",
    github: null,
    screenshot: "/projects/queue.png",
    status: "FULLSTACK",
    highlight: "MERN · REAL-TIME",
    category: "FULLSTACK",
  },
  {
    id: "09",
    title: "CLOUDDRIVE",
    shortTitle: "CLOUD_DRIVE",
    description:
      "Cloud file storage with AWS S3, user auth, access permissions, chunked uploads, and progress tracking.",
    techStack: ["React.js", "Node.js", "MongoDB", "AWS S3", "JWT", "Multer"],
    link: null,
    github: "https://github.com/OpAditya1109",
    screenshot: "/projects/Github.png",
    status: "GITHUB",
    highlight: "MERN · AWS S3",
    category: "CLOUD",
  },
  {
    id: "10",
    title: "CHAT WITH AI",
    shortTitle: "CHAT_AI",
    description:
      "Real-time AI chatbot with Google Gemini, typing indicators, emoji support, and multi-user WebSocket chat.",
    techStack: ["React.js", "Node.js", "MongoDB", "Socket.io", "Google Gemini API"],
    link: null,
    github: "https://github.com/OpAditya1109",
    screenshot: "/projects/Github.png",
    status: "GITHUB",
    highlight: "AI · WEBSOCKETS",
    category: "FULLSTACK",
  },
  {
    id: "11",
    title: "HEMPBUTI — SHOPIFY STORE",
    shortTitle: "HEMPBUTI",
    description:
      "Custom Shopify store for a skincare brand — collections, product pages, responsive layouts, SEO, and conversion optimisation.",
    techStack: ["Shopify", "Liquid", "Tailwind CSS", "JavaScript"],
    link: "https://www.hempbuti.in",
    github: null,
    screenshot: "/projects/hempbuti.png",
    status: "FREELANCE",
    highlight: "SHOPIFY · E-COMMERCE",
    category: "SHOPIFY",
  },
  {
    id: "12",
    title: "ROBOKIDZ — WORDPRESS STORE",
    shortTitle: "ROBOKIDZ",
    description:
      "WordPress store improvements for Unitglo — UI, animations, performance, responsive pages, and SEO structure.",
    techStack: ["WordPress", "Tailwind CSS", "JavaScript", "PHP"],
    link: "https://store.robokidz.co.in",
    github: null,
    screenshot: "/projects/robokidz.png",
    status: "LIVE",
    highlight: "WORDPRESS · COMPANY",
    category: "WORDPRESS",
  },
];

const CATEGORIES = ["ALL", "FULLSTACK", "FRONTEND", "WEB3", "CLOUD", "SHOPIFY", "WORDPRESS"];

const CATEGORY_COLORS: Record<string, string> = {
  FULLSTACK: "#e8ff47",
  FRONTEND:  "#28c840",
  WEB3:      "#47b8ff",
  CLOUD:     "#ff9f47",
  SHOPIFY:   "#c847ff",
  WORDPRESS: "#ff4747",
};

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

// ── Screenshot with fallback placeholder ──────────────
function ProjectImage({
  src, alt, fill = false, height,
}: {
  src: string; alt: string; fill?: boolean; height?: number;
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div style={{
        width:"100%", height: height ?? "100%",
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        background:"rgba(255,255,255,0.02)", gap:8,
      }}>
        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, letterSpacing:"0.2em", color:"rgba(232,234,240,0.15)" }}>
          ~$ screenshot not found
        </div>
        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:8, letterSpacing:"0.15em", color:"rgba(232,234,240,0.08)" }}>
          → add to /public/projects/
        </div>
        <div style={{ marginTop:8, fontFamily:"'Bebas Neue',cursive", fontSize:40, color:"rgba(255,255,255,0.03)", letterSpacing:"0.05em" }}>
          {alt.slice(0,4)}
        </div>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src} alt={alt} fill
        onError={() => setErrored(true)}
        style={{ objectFit:"cover", objectPosition:"top" }}
      />
    );
  }

  return (
    <div style={{ position:"relative", height, width:"100%" }}>
      <Image
        src={src} alt={alt} fill
        onError={() => setErrored(true)}
        style={{ objectFit:"cover", objectPosition:"top" }}
      />
    </div>
  );
}

// ── Featured terminal card ─────────────────────────────
function TerminalCard({ project, index }: { project: typeof ALL_PROJECTS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity:0, y:60 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:"-80px" }}
      transition={{ duration:0.7, delay:index * 0.12, ease:[0.16,1,0.3,1] }}
      style={{
        border:"1px solid rgba(255,255,255,0.07)",
        borderRadius:4, overflow:"hidden",
        background:"rgba(255,255,255,0.015)",
        backdropFilter:"blur(10px)",
      }}
    >
      {/* Title bar */}
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"10px 20px",
        borderBottom:"1px solid rgba(255,255,255,0.07)",
        background:"rgba(255,255,255,0.025)",
        fontFamily:"'IBM Plex Mono',monospace",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          {(["#ff5f57","#febc2e","#28c840"] as const).map((c,i) => (
            <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:c }} />
          ))}
          <span style={{ fontSize:10, color:"rgba(232,234,240,0.35)", marginLeft:8, letterSpacing:"0.1em" }}>
            aditya@portfolio — ./{project.shortTitle.toLowerCase()}
          </span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <span style={{
            fontSize:9, letterSpacing:"0.2em",
            color: project.status === "LIVE" ? "#28c840" : "#e8ff47",
            padding:"2px 8px",
            border:`1px solid ${project.status === "LIVE" ? "rgba(40,200,64,0.3)" : "rgba(232,255,71,0.3)"}`,
            borderRadius:2,
          }}>{project.status}</span>
          <span style={{ fontFamily:"'Bebas Neue',cursive", fontSize:20, color:"rgba(255,255,255,0.08)" }}>
            {project.id}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0 }} className="project-grid">
        {/* Left — text */}
        <div style={{
          padding:"36px 40px",
          borderRight:"1px solid rgba(255,255,255,0.07)",
          display:"flex", flexDirection:"column", justifyContent:"space-between",
        }}>
          <div>
            <div style={{
              fontFamily:"'IBM Plex Mono',monospace", fontSize:9,
              letterSpacing:"0.25em", color:"#e8ff47", marginBottom:16,
              display:"flex", alignItems:"center", gap:8,
            }}>
              <span style={{ display:"inline-block", width:16, height:1, background:"#e8ff47" }} />
              {project.highlight}
            </div>
            <h3 style={{
              fontFamily:"'Bebas Neue',cursive",
              fontSize:"clamp(28px,3vw,42px)",
              letterSpacing:"0.02em", color:"#e8eaf0",
              lineHeight:1, marginBottom:20,
            }}>{project.title}</h3>
            <p style={{
              fontFamily:"'DM Sans',sans-serif",
              fontSize:"clamp(12px,1.1vw,14px)",
              color:"rgba(232,234,240,0.45)", lineHeight:1.9, maxWidth:380,
            }}>{project.description}</p>
          </div>
          <div>
            <div style={{ height:1, background:"rgba(255,255,255,0.06)", margin:"28px 0 20px" }} />
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:32 }}>
              {project.techStack.map(tech => (
                <span key={tech} className="skill-chip" style={{
                  fontFamily:"'IBM Plex Mono',monospace", fontSize:10,
                  letterSpacing:"0.1em", padding:"4px 12px",
                  border:"1px solid rgba(255,255,255,0.07)",
                  color:"rgba(232,234,240,0.35)", borderRadius:2,
                  transition:"border-color 0.2s, color 0.2s",
                }}>{tech}</span>
              ))}
            </div>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              {project.link && (
                <motion.a href={project.link} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
                  style={{
                    fontFamily:"'IBM Plex Mono',monospace", fontSize:11,
                    letterSpacing:"0.18em", padding:"11px 24px",
                    background:"#e8ff47", color:"#04050a", border:"none",
                    borderRadius:2, fontWeight:700, textDecoration:"none",
                    display:"inline-flex", alignItems:"center", gap:6, cursor:"none",
                  }}>
                  LIVE SITE <ArrowupRightIcon style={{ width:12, height:12 }} />
                </motion.a>
              )}
              {project.github && (
                <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
                  whileHover={{ borderColor:"#e8eaf0", color:"#e8eaf0" }}
                  style={{
                    fontFamily:"'IBM Plex Mono',monospace", fontSize:11,
                    letterSpacing:"0.18em", padding:"11px 24px",
                    background:"none", color:"rgba(232,234,240,0.4)",
                    border:"1px solid rgba(255,255,255,0.1)", borderRadius:2,
                    textDecoration:"none", display:"inline-flex", alignItems:"center",
                    gap:6, cursor:"none", transition:"border-color 0.2s, color 0.2s",
                  }}>
                  VIEW GITHUB <ArrowupRightIcon style={{ width:12, height:12 }} />
                </motion.a>
              )}
            </div>
          </div>
        </div>

        {/* Right — screenshot */}
        <div style={{ position:"relative", overflow:"hidden", minHeight:340, background:"rgba(0,0,0,0.25)" }}>
          <div style={{
            position:"absolute", inset:0, zIndex:2, pointerEvents:"none",
            backgroundImage:"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
          }} />
          <div style={{
            position:"absolute", top:14, left:14, zIndex:3,
            fontFamily:"'IBM Plex Mono',monospace", fontSize:8,
            letterSpacing:"0.2em", color:"rgba(232,234,240,0.5)",
            background:"rgba(4,5,10,0.8)", padding:"3px 8px",
            border:"1px solid rgba(255,255,255,0.1)", borderRadius:2,
            display:"flex", alignItems:"center", gap:6,
          }}>
            <div style={{ width:5, height:5, borderRadius:"50%", background:"#28c840", boxShadow:"0 0 5px #28c840" }} />
            PREVIEW
          </div>
          <motion.div
            whileHover={{ scale:1.03 }}
            transition={{ duration:0.5, ease:"easeOut" }}
            style={{ height:"100%", width:"100%", position:"relative", minHeight:340 }}
          >
            <ProjectImage src={project.screenshot} alt={project.shortTitle} fill />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Compact grid card ──────────────────────────────────
function GridCard({ project, index }: { project: typeof MORE_PROJECTS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const color = CATEGORY_COLORS[project.category] ?? "#e8ff47";

  return (
    <motion.div
      initial={{ opacity:0, y:40 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:"-60px" }}
      transition={{ duration:0.6, delay:index * 0.08, ease:[0.16,1,0.3,1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        border:`1px solid ${hovered ? color : "rgba(255,255,255,0.07)"}`,
        borderRadius:4, overflow:"hidden",
        background: hovered ? `rgba(${hexToRgb(color)},0.04)` : "rgba(255,255,255,0.015)",
        transition:"border-color 0.2s, background 0.2s",
        display:"flex", flexDirection:"column", position:"relative",
      }}
    >
      {/* Mini title bar */}
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"8px 14px",
        borderBottom:"1px solid rgba(255,255,255,0.07)",
        background:"rgba(255,255,255,0.02)",
        fontFamily:"'IBM Plex Mono',monospace",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:5 }}>
          {(["#ff5f57","#febc2e","#28c840"] as const).map((c,i) => (
            <div key={i} style={{ width:7, height:7, borderRadius:"50%", background:c }} />
          ))}
          <span style={{ fontSize:9, color:"rgba(232,234,240,0.2)", marginLeft:4, letterSpacing:"0.08em" }}>
            ./{project.shortTitle.toLowerCase()}
          </span>
        </div>
        <span style={{
          fontSize:8, letterSpacing:"0.2em",
          color: project.status === "LIVE" ? "#28c840"
               : project.status === "FREELANCE" ? "#e8ff47"
               : "rgba(232,234,240,0.3)",
          padding:"1px 6px",
          border:`1px solid ${
            project.status === "LIVE" ? "rgba(40,200,64,0.25)"
            : project.status === "FREELANCE" ? "rgba(232,255,71,0.25)"
            : "rgba(255,255,255,0.07)"
          }`,
          borderRadius:2,
        }}>{project.status}</span>
      </div>

      {/* Screenshot thumbnail */}
      <div style={{
        height:140, position:"relative", overflow:"hidden",
        borderBottom:"1px solid rgba(255,255,255,0.07)",
        background:"rgba(0,0,0,0.2)",
      }}>
        <div style={{
          position:"absolute", inset:0, zIndex:2, pointerEvents:"none",
          backgroundImage:"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
        }} />
        <motion.div
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration:0.4 }}
          style={{ height:"100%", width:"100%", position:"relative" }}
        >
          <ProjectImage src={project.screenshot} alt={project.shortTitle} fill />
        </motion.div>
        <div style={{
          position:"absolute", bottom:0, left:0, right:0, height:2,
          background: color, opacity: hovered ? 0.6 : 0.2,
          transition:"opacity 0.2s", zIndex:3,
        }} />
      </div>

      {/* Text */}
      <div style={{ padding:"20px 22px 18px", flex:1, display:"flex", flexDirection:"column" }}>
        <div style={{
          fontFamily:"'IBM Plex Mono',monospace", fontSize:8,
          letterSpacing:"0.25em", color, marginBottom:8,
          display:"flex", alignItems:"center", gap:6,
          opacity: hovered ? 1 : 0.6, transition:"opacity 0.2s",
        }}>
          <div style={{ width:10, height:1, background:color }} />
          {project.highlight}
        </div>

        <h3 style={{
          fontFamily:"'Bebas Neue',cursive",
          fontSize:"clamp(18px,1.8vw,24px)",
          letterSpacing:"0.02em", color:"#e8eaf0",
          lineHeight:1, marginBottom:10,
        }}>{project.title}</h3>

        <p style={{
          fontFamily:"'DM Sans',sans-serif",
          fontSize:"clamp(11px,0.9vw,12px)",
          color:"rgba(232,234,240,0.4)", lineHeight:1.8,
          flex:1, marginBottom:16,
        }}>{project.description}</p>

        <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:16 }}>
          {project.techStack.map(tech => (
            <span key={tech} style={{
              fontFamily:"'IBM Plex Mono',monospace", fontSize:8,
              letterSpacing:"0.08em", padding:"3px 8px",
              border:"1px solid rgba(255,255,255,0.07)",
              color:"rgba(232,234,240,0.3)", borderRadius:2,
            }}>{tech}</span>
          ))}
        </div>

        <div style={{ display:"flex", gap:8 }}>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
              fontFamily:"'IBM Plex Mono',monospace", fontSize:9,
              letterSpacing:"0.15em", padding:"6px 12px",
              background:"#e8ff47", color:"#04050a",
              borderRadius:2, fontWeight:700, textDecoration:"none",
              display:"inline-flex", alignItems:"center", gap:4, cursor:"none",
            }}>
              LIVE <ArrowupRightIcon style={{ width:9, height:9 }} />
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
              fontFamily:"'IBM Plex Mono',monospace", fontSize:9,
              letterSpacing:"0.15em", padding:"6px 12px",
              background:"none", color:"rgba(232,234,240,0.35)",
              border:"1px solid rgba(255,255,255,0.1)", borderRadius:2,
              textDecoration:"none", display:"inline-flex",
              alignItems:"center", gap:4, cursor:"none",
              transition:"border-color 0.2s, color 0.2s",
            }}>
              GITHUB <ArrowupRightIcon style={{ width:9, height:9 }} />
            </a>
          )}
        </div>
      </div>

      <div style={{
        position:"absolute", bottom:10, right:14,
        fontFamily:"'Bebas Neue',cursive", fontSize:28,
        color:"rgba(255,255,255,0.03)", letterSpacing:"0.05em",
        pointerEvents:"none", userSelect:"none",
      }}>{project.id}</div>
    </motion.div>
  );
}

// ══ Main section ═══════════════════════════════════════
export const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredMore = activeFilter === "ALL"
    ? MORE_PROJECTS
    : MORE_PROJECTS.filter(p => p.category === activeFilter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;600&family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');
        .skill-chip:hover { border-color:#e8ff47 !important; color:#e8ff47 !important; }
        @media (max-width: 768px) {
          .project-grid { grid-template-columns: 1fr !important; }
          .project-grid > div:first-child { border-right:none !important; border-bottom:1px solid rgba(255,255,255,0.07); }
          .more-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section id="work" style={{
        background:"#04050a", padding:"120px 48px",
        position:"relative", overflow:"hidden",
      }}>
        <div style={{
          position:"absolute", top:0, left:"50%", transform:"translateX(-50%)",
          width:1, height:80,
          background:"linear-gradient(to bottom, #e8ff47, transparent)", opacity:0.25,
        }} />
        <div style={{
          position:"absolute", inset:0, pointerEvents:"none", opacity:0.025,
          backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }} />

        <div style={{ maxWidth:1280, margin:"0 auto", position:"relative" }}>

          {/* Header */}
          <motion.div
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}
            style={{ marginBottom:72 }}
          >
            <div style={{
              fontFamily:"'IBM Plex Mono',monospace", fontSize:10,
              letterSpacing:"0.3em", color:"#e8ff47", textTransform:"uppercase",
              marginBottom:20, display:"flex", alignItems:"center", gap:10,
            }}>
              <span style={{ display:"inline-block", width:24, height:1, background:"#e8ff47" }} />
              Selected Work
            </div>
            <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:24 }}>
              <h2 style={{
                fontFamily:"'Bebas Neue',cursive",
                fontSize:"clamp(56px,8vw,110px)",
                lineHeight:0.92, letterSpacing:"0.01em", color:"#e8eaf0", margin:0,
              }}>
                FEATURED<br />
                <span style={{ WebkitTextStroke:"1px rgba(232,234,240,0.25)", color:"transparent" }}>PROJECTS</span>
              </h2>
              <div style={{
                fontFamily:"'IBM Plex Mono',monospace", fontSize:11,
                color:"rgba(232,234,240,0.3)", letterSpacing:"0.15em", paddingBottom:8,
              }}>
                {String(ALL_PROJECTS.length + MORE_PROJECTS.length).padStart(2,"0")} / TOTAL PROJECTS
              </div>
            </div>
          </motion.div>

          {/* Featured */}
          <div style={{ display:"flex", flexDirection:"column", gap:24, marginBottom:80 }}>
            {ALL_PROJECTS.map((p, i) => <TerminalCard key={p.id} project={p} index={i} />)}
          </div>

          {/* Divider */}
          <motion.div
            initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
            style={{ display:"flex", alignItems:"center", gap:20, marginBottom:36 }}
          >
            <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.07)" }} />
            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, letterSpacing:"0.25em", color:"rgba(232,234,240,0.3)", whiteSpace:"nowrap" }}>
              MORE PROJECTS
            </div>
            <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.07)" }} />
          </motion.div>

          {/* Filter */}
          <motion.div
            initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
            transition={{ duration:0.5, delay:0.1 }}
            style={{ display:"flex", border:"1px solid rgba(255,255,255,0.07)", borderRadius:4, overflow:"hidden", marginBottom:28, width:"fit-content" }}
          >
            <div style={{
              fontFamily:"'IBM Plex Mono',monospace", fontSize:10,
              letterSpacing:"0.1em", color:"#e8ff47",
              padding:"9px 16px", background:"rgba(232,255,71,0.05)",
              borderRight:"1px solid rgba(255,255,255,0.07)",
              display:"flex", alignItems:"center",
            }}>~$ filter</div>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)} style={{
                fontFamily:"'IBM Plex Mono',monospace", fontSize:10,
                letterSpacing:"0.15em", padding:"9px 14px",
                background: activeFilter === cat ? "#e8ff47" : "transparent",
                color: activeFilter === cat ? "#04050a" : "rgba(232,234,240,0.35)",
                border:"none", borderRight:"1px solid rgba(255,255,255,0.07)",
                cursor:"none", transition:"background 0.15s, color 0.15s",
                fontWeight: activeFilter === cat ? 700 : 400,
              }}>{cat}</button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div layout style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:16 }} className="more-grid">
            {filteredMore.map((p, i) => <GridCard key={p.id} project={p} index={i} />)}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
            transition={{ duration:0.6, delay:0.3 }}
            style={{
              marginTop:72, paddingTop:48,
              borderTop:"1px solid rgba(255,255,255,0.07)",
              display:"flex", alignItems:"center",
              justifyContent:"space-between", flexWrap:"wrap", gap:24,
              fontFamily:"'IBM Plex Mono',monospace",
            }}
          >
            <div>
              <div style={{ fontSize:10, letterSpacing:"0.25em", color:"rgba(232,234,240,0.3)", marginBottom:8 }}>
                {ALL_PROJECTS.length + MORE_PROJECTS.length} PROJECTS TOTAL
              </div>
              <div style={{ fontSize:13, color:"rgba(232,234,240,0.6)" }}>
                Full-stack · Blockchain · Shopify · WordPress · Cloud
              </div>
            </div>
            <motion.a
              href="https://github.com/OpAditya1109" target="_blank" rel="noopener noreferrer"
              whileHover={{ background:"#e8ff47", color:"#04050a" }}
              style={{
                fontFamily:"'IBM Plex Mono',monospace", fontSize:11,
                letterSpacing:"0.18em", padding:"12px 28px",
                border:"1px solid rgba(255,255,255,0.12)",
                color:"rgba(232,234,240,0.5)", borderRadius:2,
                textDecoration:"none", cursor:"none",
                transition:"background 0.2s, color 0.2s",
              }}
            >VIEW ALL REPOS ↗</motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ProjectsSection;