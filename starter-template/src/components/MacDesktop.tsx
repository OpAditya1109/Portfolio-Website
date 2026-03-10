"use client";
import { useEffect, useState, useCallback } from "react";
import BootScreen from "./BootScreen";
import LoginScreen from "./LoginScreen";
import Menubar from "./Menubar";
import MacWindow from "./MacWindow";
import FinderWindow from "./FinderWindow";
import { AboutContent, ContactContent } from "./WindowContents";
import Dock from "./Dock";
import Notification from "./Notification";

type Stage = "boot" | "login" | "desktop";
type WindowId = "finder" | "about" | "contact";

interface WindowState {
  open: boolean;
  focused: boolean;
}

const DEFAULT_POSITIONS: Record<WindowId, { x: number; y: number }> = {
  finder:  { x: 80,  y: 48 },
  about:   { x: 200, y: 80 },
  contact: { x: 320, y: 100 },
};

const DEFAULT_SIZES: Record<WindowId, { w: number; h: number }> = {
  finder:  { w: 780, h: 520 },
  about:   { w: 500, h: 480 },
  contact: { w: 420, h: 400 },
};

const WINDOW_TITLES: Record<WindowId, string> = {
  finder:  "Finder — Projects",
  about:   "About — Aditya Yadav",
  contact: "Contact",
};

export default function MacDesktop() {
  const [stage, setStage]           = useState<Stage>("boot");
  const [desktopVisible, setDesktopVisible] = useState(false);
  const [showNotif, setShowNotif]   = useState(false);

  const [windows, setWindows] = useState<Record<WindowId, WindowState>>({
    finder:  { open: false, focused: false },
    about:   { open: false, focused: false },
    contact: { open: false, focused: false },
  });

  const openWindow = useCallback((id: WindowId) => {
    setWindows(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(k => (next[k as WindowId].focused = false));
      next[id] = { open: true, focused: true };
      return next;
    });
  }, []);

  const closeWindow = useCallback((id: WindowId) => {
    setWindows(prev => ({ ...prev, [id]: { ...prev[id], open: false, focused: false } }));
  }, []);

  const focusWindow = useCallback((id: WindowId) => {
    setWindows(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(k => (next[k as WindowId].focused = false));
      next[id].focused = true;
      return next;
    });
  }, []);

  const handleDesktopReady = useCallback(() => {
    setDesktopVisible(true);
    setTimeout(() => openWindow("finder"), 600);
    setTimeout(() => openWindow("about"),  1000);
    setTimeout(() => setShowNotif(true),   3500);
  }, [openWindow]);

  const openWindows = new Set(
    (Object.keys(windows) as WindowId[]).filter(k => windows[k].open)
  );

  const desktopIcons = [
    { icon: "📁", label: "Portfolio",    bg: "linear-gradient(145deg,#5b9bd5,#1e6cbf)", action: () => openWindow("finder") },
    { icon: "👤", label: "About Me",     bg: "linear-gradient(145deg,#7c6aff,#4f46e5)", action: () => openWindow("about") },
    { icon: "🐙", label: "GitHub",       bg: "linear-gradient(145deg,#333,#111)",       action: () => window.open("https://github.com/OpAditya1109","_blank") },
    { icon: "📄", label: "Resume.pdf",   bg: "linear-gradient(145deg,#ef4444,#b91c1c)", action: () => window.open("/Aditya_Yadav_Resume.pdf","_blank") },
  ];

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* Boot */}
      {stage === "boot" && (
        <BootScreen onComplete={() => setStage("login")} />
      )}

      {/* Login */}
      <LoginScreen
        visible={stage === "login"}
        onUnlock={() => {
          setStage("desktop");
          handleDesktopReady();
        }}
      />

      {/* Desktop */}
      <div style={{
        position: "fixed", inset: 0,
        background: "radial-gradient(ellipse at 65% 35%, #1e2a4a 0%, #121828 35%, #0a0e1a 100%)",
        opacity: desktopVisible ? 1 : 0,
        pointerEvents: desktopVisible ? "auto" : "none",
        transition: "opacity 0.8s ease",
        overflow: "hidden",
      }}>
        {/* Wallpaper blobs */}
        {[
          { w:700, h:700, t:-150, l:-100, bg:"radial-gradient(circle,rgba(79,70,229,0.4),transparent)" },
          { w:600, h:600, b:-100, r:-50,  bg:"radial-gradient(circle,rgba(59,130,246,0.3),transparent)" },
          { w:500, h:500, t:"30%",l:"40%",bg:"radial-gradient(circle,rgba(139,92,246,0.25),transparent)" },
          { w:400, h:400, b:"20%",l:"10%",bg:"radial-gradient(circle,rgba(16,185,129,0.15),transparent)" },
        ].map((b, i) => (
          <div key={i} style={{
            position: "absolute",
            width: b.w, height: b.h,
            top: (b as any).t, left: (b as any).l,
            bottom: (b as any).b, right: (b as any).r,
            background: b.bg, borderRadius: "50%",
            filter: "blur(120px)", pointerEvents: "none", opacity: 0.55,
          }} />
        ))}

        <Menubar />

        {/* Desktop icons */}
        <div style={{
          position: "absolute", top: 48, right: 20,
          display: "flex", flexDirection: "column", gap: 6, alignItems: "center",
        }}>
          {desktopIcons.map(item => (
            <div key={item.label}
              onClick={item.action}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
                padding: 8, borderRadius: 10, cursor: "pointer", width: 80,
                transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 12,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 26, background: item.bg,
                boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
              }}>{item.icon}</div>
              <span style={{
                fontSize: 11, color: "rgba(255,255,255,0.85)",
                textAlign: "center", textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                whiteSpace: "nowrap",
              }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Windows */}
        {(Object.keys(windows) as WindowId[]).map(id => (
          <MacWindow
            key={id}
            id={id}
            title={WINDOW_TITLES[id]}
            open={windows[id].open}
            focused={windows[id].focused}
            defaultPos={DEFAULT_POSITIONS[id]}
            defaultSize={DEFAULT_SIZES[id]}
            onClose={() => closeWindow(id)}
            onMinimize={() => closeWindow(id)}
            onFocus={() => focusWindow(id)}
          >
            {id === "finder"  && <FinderWindow />}
            {id === "about"   && <AboutContent />}
            {id === "contact" && <ContactContent />}
          </MacWindow>
        ))}

        <Dock openWindows={openWindows} onOpen={(id) => openWindow(id as WindowId)} />
        <Notification show={showNotif} />
      </div>
    </div>
  );
}
