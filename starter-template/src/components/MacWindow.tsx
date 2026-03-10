"use client";
import { useEffect, useRef, useState, ReactNode } from "react";

interface MacWindowProps {
  id: string;
  title: string;
  open: boolean;
  focused: boolean;
  defaultPos: { x: number; y: number };
  defaultSize: { w: number; h: number };
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  children: ReactNode;
}

export default function MacWindow({
  title, open, focused, defaultPos, defaultSize,
  onClose, onMinimize, onFocus, children,
}: MacWindowProps) {
  const [pos, setPos] = useState(defaultPos);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const [animState, setAnimState] = useState<"open" | "closing" | "closed">("closed");

  useEffect(() => {
    if (open) {
      setAnimState("open");
    } else if (animState === "open") {
      setAnimState("closing");
      const t = setTimeout(() => setAnimState("closed"), 280);
      return () => clearTimeout(t);
    }
  }, [open]);

  const startDrag = (e: React.MouseEvent) => {
    dragging.current = true;
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    onFocus();
    e.preventDefault();
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      setPos({
        x: e.clientX - offset.current.x,
        y: Math.max(28, e.clientY - offset.current.y),
      });
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  if (animState === "closed") return null;

  return (
    <div
      onMouseDown={onFocus}
      style={{
        position: "absolute",
        left: pos.x, top: pos.y,
        width: defaultSize.w, height: defaultSize.h,
        background: "rgba(22,24,32,0.92)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 12,
        boxShadow: focused
          ? "0 24px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.05)"
          : "0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)",
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        zIndex: focused ? 50 : 10,
        animation: animState === "open" ? "macWindowOpen 0.25s cubic-bezier(0.34,1.56,0.64,1)" : "macWindowClose 0.28s ease forwards",
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Title bar */}
      <div
        onMouseDown={startDrag}
        style={{
          height: 40, background: "rgba(30,33,42,0.95)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex", alignItems: "center",
          padding: "0 14px", gap: 8,
          cursor: "move", flexShrink: 0, userSelect: "none",
        }}
      >
        {/* Traffic lights */}
        {[
          { bg: "#ff5f57", action: onClose },
          { bg: "#febc2e", action: onMinimize },
          { bg: "#28c840", action: () => {} },
        ].map(({ bg, action }, i) => (
          <div
            key={i}
            onClick={(e) => { e.stopPropagation(); action(); }}
            style={{
              width: 12, height: 12, borderRadius: "50%",
              background: bg, cursor: "pointer", flexShrink: 0,
              transition: "filter 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.3)")}
            onMouseLeave={e => (e.currentTarget.style.filter = "")}
          />
        ))}
        <div style={{
          flex: 1, textAlign: "center",
          fontSize: 13, fontWeight: 500,
          color: "rgba(255,255,255,0.7)",
          letterSpacing: -0.1,
          marginRight: 52,
        }}>{title}</div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflow: "auto", position: "relative" }}>
        {children}
      </div>

      <style>{`
        @keyframes macWindowOpen {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes macWindowClose {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(0.88); }
        }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.22); }
      `}</style>
    </div>
  );
}
