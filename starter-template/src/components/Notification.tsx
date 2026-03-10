"use client";
import { useEffect, useState } from "react";

interface NotificationProps {
  show: boolean;
}

export default function Notification({ show }: NotificationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      const t1 = setTimeout(() => setVisible(true), 100);
      const t2 = setTimeout(() => setVisible(false), 5000);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [show]);

  return (
    <div style={{
      position: "fixed", top: 48, right: 16,
      background: "rgba(30,33,44,0.88)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 14, padding: "12px 16px",
      display: "flex", gap: 12, alignItems: "flex-start",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      zIndex: 9999, width: 300,
      transform: visible ? "translateX(0)" : "translateX(320px)",
      transition: "transform 0.4s cubic-bezier(0.34,1.2,0.64,1)",
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <div style={{ fontSize: 28, flexShrink: 0 }}>💼</div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 2 }}>New Message — Recruiter</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>
          &ldquo;We&apos;d love to have you on our team, Aditya!&rdquo;
        </div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>now</div>
      </div>
    </div>
  );
}
