"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { id: "home",     label: "HOME",     prefix: "01" },
  { id: "work",     label: "WORK",     prefix: "02" },
  { id: "about",    label: "STACK",    prefix: "03" },
  { id: "contact",  label: "CONTACT",  prefix: "04" },
];

export const Header = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // ── Scroll detection ────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = NAV_ITEMS.map(n => n.id);
      let current = "home";
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = id;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Bebas+Neue&display=swap');
        @keyframes pulse-dot {
          0%,100% { transform:scale(1); opacity:1; }
          50%      { transform:scale(1.6); opacity:0.5; }
        }
      `}</style>

      {/* ── Desktop header ── */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0,
          zIndex: 500,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 48px",
          height: 56,
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid transparent",
          background: scrolled
            ? "rgba(4,5,10,0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
          fontFamily: "'IBM Plex Mono', monospace",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNav("home")}
          style={{
            display: "flex", alignItems: "center", gap: 12,
            background: "none", border: "none", cursor: "none",
          }}
        >
          <span style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: 22, letterSpacing: "0.06em", color: "#e8eaf0",
          }}>AY</span>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#e8ff47", boxShadow: "0 0 8px #e8ff47",
            animation: "pulse-dot 2s ease-in-out infinite",
          }} />
          <span style={{
            fontSize: 10, letterSpacing: "0.12em",
            color: "rgba(232,234,240,0.35)",
          }}>PORTFOLIO v2025</span>
        </button>

        {/* Nav links — desktop */}
        <nav
          style={{ display: "flex", alignItems: "center", gap: 2 }}
          className="desktop-nav"
        >
          {NAV_ITEMS.map(item => {
            const isActive = activeSection === item.id;
            const isHovered = hoveredItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  position: "relative",
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "6px 16px",
                  background: isActive
                    ? "rgba(232,255,71,0.08)"
                    : isHovered
                    ? "rgba(255,255,255,0.03)"
                    : "transparent",
                  border: `1px solid ${isActive ? "rgba(232,255,71,0.25)" : "transparent"}`,
                  borderRadius: 2,
                  cursor: "none",
                  transition: "background 0.2s, border-color 0.2s",
                }}
              >
                <span style={{
                  fontSize: 8, letterSpacing: "0.15em",
                  color: isActive ? "#e8ff47" : "rgba(232,234,240,0.2)",
                  transition: "color 0.2s",
                }}>{item.prefix}</span>
                <span style={{
                  fontSize: 10, letterSpacing: "0.18em",
                  color: isActive ? "#e8ff47" : isHovered ? "#e8eaf0" : "rgba(232,234,240,0.4)",
                  fontWeight: isActive ? 600 : 400,
                  transition: "color 0.2s",
                }}>{item.label}</span>

                {/* Active underline */}
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    style={{
                      position: "absolute", bottom: -1, left: 0, right: 0,
                      height: 1, background: "#e8ff47",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            );
          })}

          {/* Resume pill — same as Hero topbar */}
          <a
            href="/Aditya_Yadav_Resume.pdf"
            download target="_blank" rel="noopener noreferrer"
            style={{
              marginLeft: 12,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10, letterSpacing: "0.15em",
              padding: "6px 16px",
              border: "1px solid #e8ff47",
              color: "#e8ff47", borderRadius: 2,
              textDecoration: "none", cursor: "none",
              fontWeight: 600,
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "#e8ff47";
              (e.currentTarget as HTMLElement).style.color = "#04050a";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#e8ff47";
            }}
          >RÉSUMÉ ↓</a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="mobile-menu-btn"
          style={{
            display: "none",
            background: "none", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2, padding: "6px 10px", cursor: "none",
            flexDirection: "column", gap: 4,
          }}
        >
          {[0,1,2].map(i => (
            <motion.span
              key={i}
              animate={
                menuOpen
                  ? i === 0 ? { rotate: 45,  y: 7,  opacity: 1 }
                  : i === 1 ? { opacity: 0 }
                  :           { rotate: -45, y: -7, opacity: 1 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              style={{
                display: "block", width: 18, height: 1,
                background: "#e8eaf0", transformOrigin: "center",
              }}
            />
          ))}
        </button>
      </motion.header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed", top: 56, left: 0, right: 0,
              zIndex: 499,
              background: "rgba(4,5,10,0.97)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(16px)",
              padding: "16px 24px 24px",
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => handleNav(item.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  width: "100%", padding: "14px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  background: "none", border: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  cursor: "none", textAlign: "left",
                }}
              >
                <span style={{
                  fontSize: 9, letterSpacing: "0.2em",
                  color: activeSection === item.id ? "#e8ff47" : "rgba(232,234,240,0.2)",
                }}>{item.prefix}</span>
                <span style={{
                  fontSize: 14, letterSpacing: "0.15em",
                  color: activeSection === item.id ? "#e8ff47" : "rgba(232,234,240,0.6)",
                  fontWeight: activeSection === item.id ? 600 : 400,
                }}>{item.label}</span>
                {activeSection === item.id && (
                  <span style={{
                    marginLeft: "auto", fontSize: 8,
                    color: "#e8ff47", letterSpacing: "0.15em",
                  }}>ACTIVE</span>
                )}
              </motion.button>
            ))}

            <a
              href="/Aditya_Yadav_Resume.pdf"
              download target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: 8, marginTop: 20,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11, letterSpacing: "0.18em",
                padding: "13px",
                background: "#e8ff47", color: "#04050a",
                borderRadius: 2, textDecoration: "none",
                fontWeight: 700, cursor: "none",
              }}
            >DOWNLOAD RÉSUMÉ ↓</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Progress bar — tracks scroll depth ── */}
      <motion.div
        style={{
          position: "fixed", top: 55, left: 0, zIndex: 501,
          height: 1, background: "#e8ff47",
          transformOrigin: "left",
          boxShadow: "0 0 8px rgba(232,255,71,0.5)",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        id="scroll-progress"
      />

      <ScrollProgressBar />

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
};

// ── Thin scroll-progress line under header ─────────────
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{
      position: "fixed", top: 55, left: 0, right: 0,
      height: 1, zIndex: 501,
      background: "rgba(255,255,255,0.04)",
    }}>
      <motion.div
        style={{
          height: "100%", background: "#e8ff47",
          boxShadow: "0 0 8px rgba(232,255,71,0.4)",
          transformOrigin: "left",
          scaleX: progress,
        }}
      />
    </div>
  );
}

export default Header;