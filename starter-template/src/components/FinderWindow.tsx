"use client";
import { useState, useEffect } from "react";
import { PROJECTS, SKILLS_DATA, EXPERIENCE } from "./data";

type View = "projects" | "skills" | "experience";

const badge = (text: string) => (
  <span key={text} style={{
    padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 600,
    background: "rgba(99,102,241,0.15)", color: "#818cf8",
    border: "1px solid rgba(99,102,241,0.2)",
  }}>{text}</span>
);

const CardItem = ({ item }: { item: { emoji: string; name: string; stack: string; desc: string; tags: string[] } }) => (
  <div style={{
    padding: 16, borderRadius: 10,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    marginBottom: 8, cursor: "default",
    transition: "background 0.15s, border-color 0.15s",
  }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
      <div style={{
        fontSize: 22, width: 36, height: 36,
        display: "flex", alignItems: "center", justifyContent: "center",
        borderRadius: 8, background: "rgba(255,255,255,0.06)", flexShrink: 0,
      }}>{item.emoji}</div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", letterSpacing: -0.2 }}>{item.name}</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{item.stack}</div>
      </div>
    </div>
    <div style={{ fontSize: 12, lineHeight: 1.6, color: "rgba(255,255,255,0.55)", marginBottom: 10 }}>{item.desc}</div>
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{item.tags.map(badge)}</div>
  </div>
);

const SkillBar = ({ name, pct, color, animate }: { name: string; pct: number; color: string; animate: boolean }) => (
  <div style={{ marginBottom: 10 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{name}</span>
      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{pct}%</span>
    </div>
    <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden" }}>
      <div style={{
        height: "100%", borderRadius: 4, background: color,
        width: animate ? `${pct}%` : "0%",
        transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
      }} />
    </div>
  </div>
);

export default function FinderWindow() {
  const [view, setView] = useState<View>("projects");
  const [skillsAnimated, setSkillsAnimated] = useState(false);

  useEffect(() => {
    if (view === "skills") setTimeout(() => setSkillsAnimated(true), 80);
  }, [view]);

  const sidebarItems: { icon: string; label: string; view?: View; href?: string }[] = [
    { icon: "💼", label: "Projects", view: "projects" },
    { icon: "⚡", label: "Skills", view: "skills" },
    { icon: "🏢", label: "Experience", view: "experience" },
  ];

  const s = (v: string) => ({
    fontSize: 13, color: view === v ? "#fff" : "rgba(255,255,255,0.75)",
    display: "flex", alignItems: "center", gap: 9,
    padding: "5px 16px", borderRadius: 6, margin: "1px 6px",
    cursor: "pointer",
    background: view === v ? "rgba(74,144,226,0.25)" : "transparent",
    transition: "background 0.12s",
  } as React.CSSProperties);

  return (
    <div style={{ display: "flex", height: "100%" }}>
      {/* Sidebar */}
      <div style={{
        width: 180, flexShrink: 0,
        background: "rgba(18,20,28,0.8)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        padding: "12px 0", overflowY: "auto",
      }}>
        <div style={{
          fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.08em", textTransform: "uppercase",
          padding: "8px 16px 4px",
        }}>Favourites</div>
        {sidebarItems.map(item => (
          <div key={item.label} style={s(item.view || "")} onClick={() => item.view && setView(item.view)}
            onMouseEnter={e => { if (view !== item.view) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; }}
            onMouseLeave={e => { if (view !== item.view) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            <span style={{ fontSize: 14, width: 18, textAlign: "center" }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
        <div style={{
          fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.08em", textTransform: "uppercase",
          padding: "12px 16px 4px",
        }}>Locations</div>
        {[
          { icon: "🐙", label: "GitHub", href: "https://github.com/OpAditya1109" },
          { icon: "🌐", label: "Live Site", href: "https://aditya-yadav.vercel.app" },
          { icon: "💼", label: "LinkedIn", href: "https://linkedin.com/in/aditya-cyber-mern" },
        ].map(item => (
          <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" style={{
            ...s(""), textDecoration: "none",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <span style={{ fontSize: 14, width: 18, textAlign: "center" }}>{item.icon}</span>
            {item.label}
          </a>
        ))}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "rgba(16,18,26,0.5)" }}>
        {/* Toolbar */}
        <div style={{
          height: 40, borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", padding: "0 16px", gap: 12,
          background: "rgba(20,22,30,0.6)", flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
            <span>Aditya</span>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>›</span>
            <span style={{ color: "rgba(255,255,255,0.6)" }}>{view.charAt(0).toUpperCase() + view.slice(1)}</span>
          </div>
        </div>

        {/* Projects */}
        {view === "projects" && (
          <div style={{ padding: 12, overflowY: "auto", flex: 1 }}>
            {PROJECTS.map(p => <CardItem key={p.name} item={p} />)}
          </div>
        )}

        {/* Skills */}
        {view === "skills" && (
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
            padding: 16, overflowY: "auto", flex: 1,
          }}>
            {SKILLS_DATA.map(cat => (
              <div key={cat.cat} style={{
                padding: 16, borderRadius: 10,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12,
                }}>{cat.cat}</div>
                {cat.items.map(([name, pct]) => (
                  <SkillBar key={name} name={name} pct={pct} color={cat.color} animate={skillsAnimated} />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {view === "experience" && (
          <div style={{ padding: 12, overflowY: "auto", flex: 1 }}>
            {EXPERIENCE.map(e => <CardItem key={e.name} item={e} />)}
          </div>
        )}
      </div>
    </div>
  );
}
