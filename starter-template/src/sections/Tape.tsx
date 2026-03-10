"use client";

import { Fragment } from "react";
import { useAnimationFrame } from "framer-motion";
import { useRef } from "react";

const TAPE_ITEMS = [
  { word: "SECURE",       type: "word" },
  { word: "01",           type: "num"  },
  { word: "RELIABLE",     type: "word" },
  { word: "02",           type: "num"  },
  { word: "RESPONSIVE",   type: "word" },
  { word: "03",           type: "num"  },
  { word: "SCALABLE",     type: "word" },
  { word: "04",           type: "num"  },
  { word: "INTERACTIVE",  type: "word" },
  { word: "05",           type: "num"  },
  { word: "OPTIMIZED",    type: "word" },
  { word: "06",           type: "num"  },
  { word: "INNOVATIVE",   type: "word" },
  { word: "07",           type: "num"  },
  { word: "SEAMLESS",     type: "word" },
  { word: "08",           type: "num"  },
  { word: "FUTURE-PROOF", type: "word" },
  { word: "09",           type: "num"  },
  { word: "ACCESSIBLE",   type: "word" },
  { word: "10",           type: "num"  },
  { word: "DYNAMIC",      type: "word" },
  { word: "11",           type: "num"  },
  { word: "EFFICIENT",    type: "word" },
  { word: "12",           type: "num"  },
];

// ── Smooth RAF marquee (same engine as TechStack) ─────
function TapeTrack({ speed = 55, reverse = false, highlight = false }: {
  speed?: number;
  reverse?: boolean;
  highlight?: boolean;
}) {
  const x   = useRef(0);
  const ref = useRef<HTMLDivElement>(null);

  useAnimationFrame((_, delta) => {
    const dir = reverse ? 1 : -1;
    x.current += dir * (speed / 1000) * (delta ?? 16);
    const half = (ref.current?.scrollWidth ?? 0) / 2;
    if (!reverse && x.current <= -half) x.current += half;
    if (reverse  && x.current >= 0)     x.current -= half;
    if (ref.current) ref.current.style.transform = `translateX(${x.current}px)`;
  });

  const doubled = [...TAPE_ITEMS, ...TAPE_ITEMS];

  return (
    <div style={{
      overflow: "hidden", width: "100%",
      // Edge fade — same as the original mask
      WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      maskImage:        "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
    }}>
      <div
        ref={ref}
        style={{ display: "flex", gap: 0, width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 0,
              flexShrink: 0,
            }}
          >
            {item.type === "word" ? (
              <span style={{
                fontFamily:    "'Bebas Neue', cursive",
                fontSize:      highlight ? "clamp(13px, 1.4vw, 17px)" : "clamp(11px, 1.2vw, 14px)",
                letterSpacing: "0.2em",
                color:         highlight ? "#04050a" : "rgba(232,234,240,0.6)",
                padding:       highlight ? "0 28px" : "0 22px",
                whiteSpace:    "nowrap",
              }}>{item.word}</span>
            ) : (
              /* Separator — the "star" equivalent, terminal-style */
              <span style={{
                fontFamily:    "'IBM Plex Mono', monospace",
                fontSize:      highlight ? 10 : 9,
                color:         highlight ? "rgba(4,5,10,0.4)" : "#e8ff47",
                letterSpacing: "0.1em",
                padding:       highlight ? "0 4px" : "0 4px",
                opacity:       highlight ? 0.5 : 0.7,
                userSelect:    "none",
              }}>✦</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export const TapeSection = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400&family=Bebas+Neue&display=swap');
      `}</style>

      <div style={{
        background: "#04050a",
        position:   "relative",
        overflow:   "hidden",
      }}>
        {/* Top divider — continues the border language of the whole page */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />

        {/* ── Row 1: dark bg, yellow accents, moves left ── */}
        <div style={{
          padding:    "18px 0",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}>
          <TapeTrack speed={45} reverse={false} highlight={false} />
        </div>

        {/* ── Row 2: #e8ff47 bg, dark text, moves right ── */}
        <div style={{
          background:   "#e8ff47",
          padding:      "14px 0",
          position:     "relative",
          // Slight skew for energy — keeps the original spirit
          transform:    "skewY(-1.2deg)",
          margin:       "0 -4px",
          borderTop:    "1px solid rgba(0,0,0,0.08)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}>
          <div style={{ transform: "skewY(1.2deg)" }}>
            <TapeTrack speed={38} reverse={true} highlight={true} />
          </div>
        </div>

        {/* ── Row 3: dark again, moves left, slower ── */}
        <div style={{
          padding:  "18px 0",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}>
          <TapeTrack speed={30} reverse={false} highlight={false} />
        </div>

        {/* Bottom divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />
      </div>
    </>
  );
};

export default TapeSection;