"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";

const CONTACT_LINKS = [
  { label: "GITHUB", handle: "OpAditya1109", href: "https://github.com/OpAditya1109", prefix: "gh/" },
  { label: "LINKEDIN", handle: "aditya-cyber-mern", href: "https://linkedin.com/in/aditya-cyber-mern", prefix: "in/" },
  { label: "EMAIL", handle: "aditya8yadav8@gmail.com", href: "mailto:aditya8yadav8@gmail.com", prefix: "@" },
  { label: "PORTFOLIO", handle: "aditya-yadav.vercel.app", href: "https://aditya-yadav.vercel.app", prefix: "www/" },
];

const TERMINAL_LINES = [
  { delay: 0,    text: "Initializing contact protocol...",         color: "rgba(232,234,240,0.25)" },
  { delay: 600,  text: "✓ Email channel — OPEN",                   color: "#28c840" },
  { delay: 1100, text: "✓ LinkedIn — ACTIVE",                      color: "#28c840" },
  { delay: 1600, text: "✓ GitHub — PUBLIC",                        color: "#28c840" },
  { delay: 2200, text: "→ Status: AVAILABLE FOR WORK",             color: "#e8ff47" },
  { delay: 2800, text: "→ Response time: < 24 hours",              color: "rgba(232,234,240,0.35)" },
  { delay: 3400, text: "Ready. Awaiting your message...",          color: "rgba(232,234,240,0.2)" },
];

// ── Animated terminal boot output ─────────────────────
function ContactTerminal() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    TERMINAL_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
      }, line.delay);
      return () => clearTimeout(t);
    });

    const blink = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <div style={{
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 4,
      overflow: "hidden",
      background: "rgba(255,255,255,0.015)",
      flex: 1,
      minWidth: 280,
    }}>
      {/* Title bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "10px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.025)",
      }}>
        {(["#ff5f57","#febc2e","#28c840"] as const).map((c, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
        ))}
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 10, color: "rgba(232,234,240,0.35)",
          marginLeft: 8, letterSpacing: "0.1em",
        }}>aditya@portfolio — ./contact.sh</span>
      </div>

      {/* Body */}
      <div style={{
        padding: "20px 24px",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "clamp(10px, 1vw, 12px)",
        lineHeight: 2.2, minHeight: 200,
      }}>
        <div style={{ marginBottom: 8 }}>
          <span style={{ color: "#e8ff47" }}>~$ </span>
          <span style={{ color: "rgba(232,234,240,0.5)" }}>./contact.sh --init</span>
        </div>
        {TERMINAL_LINES.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={visibleLines.includes(i) ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.25 }}
            style={{ color: line.color }}
          >
            {line.text}
          </motion.div>
        ))}
        {visibleLines.length >= TERMINAL_LINES.length && (
          <div style={{ marginTop: 4 }}>
            <span style={{ color: "#e8ff47" }}>~$ </span>
            <span style={{
              display: "inline-block", width: 7, height: 13,
              background: cursor ? "#e8ff47" : "transparent",
              verticalAlign: "middle",
              transition: "background 0.1s",
            }} />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Contact link row ──────────────────────────────────
function ContactLink({ item, index }: { item: typeof CONTACT_LINKS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    if (item.label === "EMAIL") {
      navigator.clipboard.writeText(item.handle);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      window.open(item.href, "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleCopy}
      style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 24px",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 4,
        background: hovered ? "rgba(232,255,71,0.04)" : "rgba(255,255,255,0.01)",
        cursor: "none",
        transition: "background 0.2s, border-color 0.2s",
        borderColor: hovered ? "rgba(232,255,71,0.25)" : "rgba(255,255,255,0.07)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 9, letterSpacing: "0.25em",
          color: hovered ? "#e8ff47" : "rgba(232,234,240,0.25)",
          minWidth: 80,
          transition: "color 0.2s",
        }}>{item.label}</span>
        <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.07)" }} />
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "clamp(10px, 1.1vw, 13px)",
          color: hovered ? "#e8eaf0" : "rgba(232,234,240,0.4)",
          letterSpacing: "0.05em",
          transition: "color 0.2s",
        }}>
          <span style={{ color: hovered ? "#e8ff47" : "rgba(232,234,240,0.2)", transition: "color 0.2s" }}>
            {item.prefix}
          </span>
          {item.handle}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {copied && (
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 9, letterSpacing: "0.15em",
            color: "#28c840",
            padding: "2px 8px",
            border: "1px solid rgba(40,200,64,0.3)",
            borderRadius: 2,
          }}>COPIED ✓</span>
        )}
        <div style={{
          width: 28, height: 28,
          border: `1px solid ${hovered ? "rgba(232,255,71,0.4)" : "rgba(255,255,255,0.07)"}`,
          borderRadius: 2,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "border-color 0.2s",
        }}>
          <ArrowUpRightIcon style={{
            width: 12, height: 12,
            color: hovered ? "#e8ff47" : "rgba(232,234,240,0.2)",
            transition: "color 0.2s",
          }} />
        </div>
      </div>
    </motion.div>
  );
}

// ══ Main section ═══════════════════════════════════════
export const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const handleEmailCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText("aditya8yadav8@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;600&family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      <section
        id="contact"
        style={{
          background: "#04050a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top border */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />

        {/* Noise overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }} />

        {/* Yellow glow — subtle ambient */}
        <div style={{
          position: "absolute", bottom: -200, left: "50%",
          transform: "translateX(-50%)",
          width: 600, height: 300,
          background: "radial-gradient(ellipse, rgba(232,255,71,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 48px 100px" }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: 72 }}
          >
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10, letterSpacing: "0.3em",
              color: "#e8ff47", textTransform: "uppercase",
              marginBottom: 20,
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: "#e8ff47" }} />
              Contact
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
                LET'S
                <br />
                <span style={{ WebkitTextStroke: "1px rgba(232,234,240,0.25)", color: "transparent" }}>
                  CONNECT
                </span>
              </h2>

              {/* Availability badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "6px 14px",
                border: "1px solid rgba(40,200,64,0.25)",
                borderRadius: 2,
                background: "rgba(40,200,64,0.05)",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 10, color: "#28c840",
                letterSpacing: "0.15em",
                marginBottom: 8,
              }}>
                <span style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background: "#28c840", boxShadow: "0 0 6px #28c840",
                  animation: "pulse-dot 2s ease-in-out infinite",
                  display: "inline-block",
                }} />
                OPEN TO WORK
              </div>
            </div>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(13px, 1.2vw, 15px)",
              color: "rgba(232,234,240,0.35)",
              lineHeight: 1.9, marginTop: 24,
              maxWidth: 520,
            }}>
              Got a project, a role, or just want to talk tech?
              I'm available for full-time positions, freelance work, and open-source collaboration.
            </p>
          </motion.div>

          {/* Two-column layout */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            alignItems: "start",
          }}
          className="contact-grid"
          >
            {/* Left — contact links */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {CONTACT_LINKS.map((item, i) => (
                <ContactLink key={item.label} item={item} index={i} />
              ))}

              {/* Primary CTA */}
              <motion.a
                href="mailto:aditya8yadav8@gmail.com"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.45 }}
                whileHover={{ boxShadow: "0 0 30px rgba(232,255,71,0.25)" }}
                style={{
                  marginTop: 8,
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 12, letterSpacing: "0.18em",
                  padding: "15px 32px",
                  background: "#e8ff47", color: "#04050a",
                  border: "none", borderRadius: 2,
                  fontWeight: 700, textDecoration: "none",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", gap: 8,
                  cursor: "none",
                  transition: "box-shadow 0.2s",
                }}
              >
                SEND A MESSAGE
                <ArrowUpRightIcon style={{ width: 14, height: 14 }} />
              </motion.a>
            </div>

            {/* Right — terminal */}
            <ContactTerminal />
          </div>

          {/* ── Footer bar — same as Hero bottom bar ── */}
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              marginTop: 80,
              paddingTop: 28,
              borderTop: "1px solid rgba(255,255,255,0.07)",
              display: "flex", alignItems: "center",
              justifyContent: "space-between", flexWrap: "wrap", gap: 20,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10, letterSpacing: "0.15em",
              color: "rgba(232,234,240,0.25)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: 20, letterSpacing: "0.06em",
                color: "rgba(232,234,240,0.4)",
              }}>AY</span>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "#e8ff47", boxShadow: "0 0 8px #e8ff47",
                animation: "pulse-dot 2s ease-in-out infinite",
              }} />
              <span>PORTFOLIO v2025</span>
            </div>

            <span>PUNE, INDIA — 2025</span>

            <div style={{ display: "flex", gap: 24 }}>
              {[
                { l: "GITHUB",   h: "https://github.com/OpAditya1109" },
                { l: "LINKEDIN", h: "https://linkedin.com/in/aditya-cyber-mern" },
                { l: "LIVE",     h: "https://aditya-yadav.vercel.app" },
              ].map(({ l, h }) => (
                <a key={l} href={h} target="_blank" rel="noopener noreferrer"
                  style={{
                    color: "rgba(232,234,240,0.25)", textDecoration: "none",
                    cursor: "none", transition: "color 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#e8eaf0")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(232,234,240,0.25)")}
                >{l}</a>
              ))}
            </div>
          </motion.footer>
        </div>
      </section>

      <style>{`
        @keyframes pulse-dot {
          0%,100% { transform:scale(1); opacity:1; }
          50%      { transform:scale(1.6); opacity:0.5; }
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
};

export default ContactSection;