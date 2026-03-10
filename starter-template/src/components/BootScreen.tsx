"use client";
import { useEffect, useState } from "react";

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [logoVisible, setLogoVisible] = useState(false);
  const [barVisible, setBarVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLogoVisible(true), 300);
    const t2 = setTimeout(() => setBarVisible(true), 900);
    const t3 = setTimeout(() => {
      let p = 0;
      const iv = setInterval(() => {
        p += Math.random() * 2.5 + 0.5;
        if (p >= 100) {
          p = 100;
          clearInterval(iv);
          setTimeout(() => {
            setExiting(true);
            setTimeout(onComplete, 1200);
          }, 400);
        }
        setProgress(Math.min(Math.floor(p), 100));
      }, 50);
    }, 950);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "#000",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        zIndex: 9000,
        transition: "opacity 1.2s ease",
        opacity: exiting ? 0 : 1,
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      {/* Apple SVG Logo */}
      <div style={{
        width: 80, height: 96, marginBottom: 48,
        opacity: logoVisible ? 1 : 0,
        transition: "opacity 1.2s ease 0.3s",
      }}>
        <svg viewBox="0 0 56 68" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <path
            d="M47.3 35.7c-.1-7.6 6.2-11.3 6.5-11.5-3.6-5.2-9.1-5.9-11-6-4.7-.5-9.2 2.8-11.6 2.8-2.4 0-6.1-2.7-10-2.6-5.1.1-9.9 3-12.5 7.5-5.4 9.3-1.4 23 3.8 30.6 2.6 3.7 5.6 7.9 9.6 7.7 3.9-.2 5.3-2.5 10-2.5 4.6 0 5.9 2.5 10 2.4 4.2-.1 6.8-3.8 9.3-7.5 3-4.3 4.2-8.4 4.3-8.6-.1-.1-8.3-3.2-8.4-12.3zM39.7 11.8c2.1-2.6 3.5-6.2 3.1-9.8-3 .1-6.7 2-8.8 4.5-1.9 2.2-3.6 5.9-3.2 9.4 3.4.3 6.8-1.7 8.9-4.1z"
            fill="white" fillOpacity="0.9"
          />
        </svg>
      </div>

      {/* Progress bar */}
      <div style={{
        width: 200,
        opacity: barVisible ? 1 : 0,
        transition: "opacity 0.6s ease",
      }}>
        <div style={{
          height: 4, background: "rgba(255,255,255,0.15)",
          borderRadius: 4, overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            background: "linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.9))",
            borderRadius: 4,
            width: `${progress}%`,
            transition: "width 0.06s linear",
            boxShadow: "0 0 8px rgba(255,255,255,0.4)",
          }} />
        </div>
      </div>
    </div>
  );
}
