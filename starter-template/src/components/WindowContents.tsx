"use client";
import { useState } from "react";

/* ══ ABOUT WINDOW ══ */
export function AboutContent() {
  const tags = ["React.js","Next.js","Node.js","TypeScript","AWS","MongoDB","Solana","Docker","Socket.io","Shopify"];
  const links = [
    { icon:"🐙", label:"GitHub",   href:"https://github.com/OpAditya1109" },
    { icon:"💼", label:"LinkedIn", href:"https://linkedin.com/in/aditya-cyber-mern" },
    { icon:"📄", label:"Resume",   href:"/Aditya_Yadav_Resume.pdf", download: true },
    { icon:"🌐", label:"Portfolio",href:"https://aditya-yadav.vercel.app" },
  ];

  return (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 20, overflowY: "auto", height: "100%" }}>
      {/* Hero row */}
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg,#3a7bd5,#6c63ff)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 30, fontWeight: 600, color: "#fff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}>AY</div>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#fff", letterSpacing: -0.5, marginBottom: 4 }}>Aditya Yadav</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", letterSpacing: "0.02em" }}>Full Stack Developer · Pune, India</div>
          <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#28c840", boxShadow: "0 0 6px #28c840", display: "inline-block" }} />
            <span style={{ fontSize: 12, color: "#28c840", letterSpacing: "0.05em" }}>Available for Work</span>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div style={{
        fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.6)",
        padding: 16, background: "rgba(255,255,255,0.04)",
        borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)",
      }}>
        Full-stack developer with a passion for building real-world products. Experienced in React, Node.js, AWS, and Solana blockchain. I&apos;ve shipped production apps — from UPI-like decentralized payment systems to astrology platforms with live video and real-time booking. I care about clean architecture, great UX, and code that actually works.
      </div>

      {/* Stack */}
      <div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Tech Stack</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {tags.map(t => (
            <span key={t} style={{
              padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 500,
              background: "rgba(74,144,226,0.15)", color: "#4a90e2",
              border: "1px solid rgba(74,144,226,0.25)",
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {links.map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
            {...(l.download ? { download: true } : {})}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 14px", borderRadius: 8,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.7)", fontSize: 12, textDecoration: "none",
              transition: "background 0.15s, color 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
          >{l.icon} {l.label}</a>
        ))}
      </div>

      {/* Education */}
      <div style={{
        padding: 14, background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10,
      }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>Education</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginBottom: 4 }}>
          B.E. Electronics & Telecom — I2IT Pune <span style={{ color: "rgba(255,255,255,0.3)" }}>· 2025</span>
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>
          Diploma in IT — Sou. Venutai Chavan Polytechnic <span style={{ color: "rgba(255,255,255,0.3)" }}>· 2022</span>
        </div>
      </div>
    </div>
  );
}

/* ══ CONTACT WINDOW ══ */
export function ContactContent() {
  const [copied, setCopied] = useState(false);

  const copy = (e: React.MouseEvent, text: string) => {
    e.preventDefault(); e.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const cards = [
    { icon: "📧", bg: "rgba(239,68,68,0.15)", label: "EMAIL", value: "aditya8yadav8@gmail.com", href: "mailto:aditya8yadav8@gmail.com", copyVal: "aditya8yadav8@gmail.com" },
    { icon: "💼", bg: "rgba(59,130,246,0.15)", label: "LINKEDIN", value: "aditya-cyber-mern", href: "https://linkedin.com/in/aditya-cyber-mern" },
    { icon: "🐙", bg: "rgba(255,255,255,0.08)", label: "GITHUB", value: "OpAditya1109", href: "https://github.com/OpAditya1109" },
    { icon: "📱", bg: "rgba(16,185,129,0.15)", label: "PHONE", value: "+91 98344 14186", href: "tel:+919834414186" },
  ];

  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 6, letterSpacing: -0.4 }}>Let&apos;s Connect</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>Open to full-time roles & freelance projects</div>
      {cards.map(card => (
        <a key={card.label} href={card.href} target="_blank" rel="noopener noreferrer" style={{
          display: "flex", alignItems: "center", gap: 14,
          padding: "14px 16px", borderRadius: 10,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
          marginBottom: 10, cursor: "pointer",
          textDecoration: "none",
          transition: "background 0.15s",
        }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.09)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
        >
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, background: card.bg, flexShrink: 0,
          }}>{card.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>{card.label}</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#fff" }}>{card.value}</div>
          </div>
          {card.copyVal && (
            <button onClick={(e) => copy(e, card.copyVal!)} style={{
              fontSize: 11, padding: "4px 10px", borderRadius: 6,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: copied ? "#28c840" : "rgba(255,255,255,0.3)",
              borderColor: copied ? "#28c840" : "rgba(255,255,255,0.08)",
              cursor: "pointer", transition: "all 0.15s",
            }}>{copied ? "Copied!" : "Copy"}</button>
          )}
        </a>
      ))}
    </div>
  );
}
