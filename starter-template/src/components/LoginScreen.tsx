"use client";
import { useState } from "react";

interface LoginScreenProps {
  visible: boolean;
  onUnlock: () => void;
}

export default function LoginScreen({ visible, onUnlock }: LoginScreenProps) {
  const [exiting, setExiting] = useState(false);

  const handleUnlock = () => {
    setExiting(true);
    setTimeout(onUnlock, 800);
  };

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "radial-gradient(ellipse at 60% 40%, #1a1f35 0%, #0d1120 40%, #080b18 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      zIndex: 8000,
      opacity: visible && !exiting ? 1 : 0,
      pointerEvents: visible && !exiting ? "auto" : "none",
      transition: "opacity 0.8s ease",
      overflow: "hidden",
    }}>
      {/* Wallpaper blobs */}
      {[
        { w: 600, h: 600, t: -100, l: -100, bg: "radial-gradient(circle,rgba(79,70,229,0.35),transparent)" },
        { w: 500, h: 500, b: -80, r: -80, bg: "radial-gradient(circle,rgba(59,130,246,0.25),transparent)" },
        { w: 400, h: 400, t: "40%", l: "30%", bg: "radial-gradient(circle,rgba(139,92,246,0.2),transparent)" },
      ].map((b, i) => (
        <div key={i} style={{
          position: "absolute",
          width: b.w, height: b.h,
          top: b.t, left: b.l,
          bottom: (b as any).b, right: (b as any).r,
          background: b.bg,
          borderRadius: "50%",
          filter: "blur(80px)",
          pointerEvents: "none",
        }} />
      ))}

      {/* Avatar */}
      <div style={{
        width: 96, height: 96, borderRadius: "50%",
        background: "linear-gradient(135deg,#3a7bd5,#6c63ff)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 38, fontWeight: 600, color: "#fff",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        marginBottom: 16,
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        letterSpacing: -1,
      }}>AY</div>

      <div style={{
        fontSize: 22, fontWeight: 500, color: "#fff",
        marginBottom: 28, letterSpacing: -0.3,
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      }}>Aditya Yadav</div>

      <button
        onClick={handleUnlock}
        style={{
          padding: "9px 32px",
          background: "rgba(255,255,255,0.18)",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: 8, color: "#fff", fontSize: 14,
          fontWeight: 500, cursor: "pointer", letterSpacing: "0.02em",
          backdropFilter: "blur(10px)",
          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
          transition: "background 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.28)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.18)")}
      >Unlock →</button>

      <div style={{
        marginTop: 14, fontSize: 11,
        color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em",
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      }}>Click to enter portfolio</div>
    </div>
  );
}
