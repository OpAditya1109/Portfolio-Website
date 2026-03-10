"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface HeroSectionProps {
  scrollToProjects?: () => void;
}

const BOOT_LINES = [
  { html: '<span class="dim">BIOS v2.1.4 — Initializing hardware checks...</span>', delay: 0 },
  { html: '<span class="ok">[ OK ]</span> <span class="hi">CPU</span> <span class="dim">— AMD Ryzen 9 7950X detected</span>', delay: 220 },
  { html: '<span class="ok">[ OK ]</span> <span class="hi">RAM</span> <span class="dim">— 32GB DDR5 allocated</span>', delay: 380 },
  { html: '<span class="ok">[ OK ]</span> <span class="hi">GPU</span> <span class="dim">— Creativity core online</span>', delay: 520 },
  { html: '<span class="ok">[ OK ]</span> <span class="hi">NET</span> <span class="dim">— REST · WebSocket · gRPC stacks loaded</span>', delay: 680 },
  { html: '<span class="dim">Loading modules:</span>', delay: 860 },
  { html: '&nbsp;&nbsp;<span class="ok">✓</span> <span class="dim">react@18 · next@14 · typescript@5</span>', delay: 1000 },
  { html: '&nbsp;&nbsp;<span class="ok">✓</span> <span class="dim">node@20 · express · mongodb · jwt</span>', delay: 1120 },
  { html: '&nbsp;&nbsp;<span class="ok">✓</span> <span class="dim">aws-sdk · docker · solana/web3.js</span>', delay: 1240 },
  { html: '&nbsp;&nbsp;<span class="ok">✓</span> <span class="dim">gsap · socket.io · tailwindcss</span>', delay: 1360 },
  { html: '<span class="dim">Booting</span> <span class="hi">ADITYA_OS v2025.1</span><span class="dim">...</span>', delay: 1560 },
];

const TERMINAL_SEQ = [
  { cmd: "whoami", out: ["→ aditya-yadav — full stack developer"] },
  { cmd: "ls ./projects", out: ["secura-pay/  astrobhavana/  queue-mgr/", "cloud-drive/ chat-ai/     lays-clone/"] },
  { cmd: 'cat ./skills.json | grep "stack"', out: ['  "stack": ["React","Node","AWS","Solana"]'] },
  { cmd: "git log --oneline -3", out: ["a3f92c1 feat: add blockchain payment flow", "8d1e004 fix: real-time socket reconnect", "cc92aa0 chore: deploy to AWS EC2"] },
];

const SKILLS = ["REACT", "NEXT.JS", "NODE.JS", "AWS", "MONGODB", "TYPESCRIPT", "SOLANA", "DOCKER"];

const STATS = [
  { num: "6", sup: "+", label: "Projects Shipped" },
  { num: "2", sup: "+", label: "Freelance Clients" },
  { num: "Top", sup: "10%", label: "Hackathon Rank" },
];

export const HeroSection = ({ scrollToProjects }: HeroSectionProps) => {
  // ── Boot state ─────────────────────────────────────────
  const [booted, setBooted]             = useState(false);
  const [bootExit, setBootExit]         = useState(false);
  const [heroVisible, setHeroVisible]   = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [progressVisible, setProgressVisible] = useState(false);
  const [bootLineShow, setBootLineShow] = useState<boolean[]>(
    Array(BOOT_LINES.length).fill(false)
  );

  // ── Terminal state ─────────────────────────────────────
  const [termCmd, setTermCmd]     = useState("");
  const [termOut, setTermOut]     = useState<string[]>([]);
  const [termCursor, setTermCursor] = useState(true);

  // ── UI state ───────────────────────────────────────────
  const [showEmail, setShowEmail] = useState(false);
  const [copied, setCopied]       = useState(false);

  // ── Cursor state ───────────────────────────────────────
  const mouseRef  = useRef({ x: 0, y: 0 });
  const ringRef   = useRef({ x: 0, y: 0 });
  const rafRef    = useRef<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [ringPos,   setRingPos]   = useState({ x: 0, y: 0 });

  // ── Misc refs ──────────────────────────────────────────
  const bootedRef  = useRef(false);
  const tIdxRef    = useRef(0);
  const termTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // ── Cursor animation ───────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove);

    const animate = () => {
      ringRef.current.x += (mouseRef.current.x - ringRef.current.x) * 0.18;
      ringRef.current.y += (mouseRef.current.y - ringRef.current.y) * 0.18;
      setRingPos({ x: ringRef.current.x, y: ringRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Terminal runner ────────────────────────────────────
  const runTermCmd = useCallback(() => {
    const seq = TERMINAL_SEQ[tIdxRef.current % TERMINAL_SEQ.length];
    tIdxRef.current++;
    setTermOut([]);
    setTermCmd("");
    setTermCursor(true);

    let i = 0;
    const iv = setInterval(() => {
      setTermCmd(seq.cmd.slice(0, i + 1));
      i++;
      if (i >= seq.cmd.length) {
        clearInterval(iv);
        setTermCursor(false);
        seq.out.forEach((line, li) => {
          const t = setTimeout(
            () => setTermOut(prev => [...prev, line]),
            400 + li * 120
          );
          termTimers.current.push(t);
        });
        const next = setTimeout(runTermCmd, 400 + seq.out.length * 120 + 3200);
        termTimers.current.push(next);
      }
    }, 55);
  }, []);

  // ── Boot sequence ──────────────────────────────────────
  const launchHero = useCallback(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;
    setBootExit(true);
    setTimeout(() => {
      setBooted(true);
      setHeroVisible(true);
      runTermCmd();
    }, 650);
  }, [runTermCmd]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setBootLineShow(prev => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, BOOT_LINES[i].delay)
      );
    });

    timers.push(setTimeout(() => setProgressVisible(true), 1600));

    timers.push(
      setTimeout(() => {
        let p = 0;
        const iv = setInterval(() => {
          p += Math.random() * 3.5 + 1;
          if (p >= 100) {
            p = 100;
            clearInterval(iv);
            setTimeout(launchHero, 300);
          }
          setBootProgress(Math.min(Math.floor(p), 100));
        }, 40);
      }, 1650)
    );

    return () => timers.forEach(clearTimeout);
  }, [launchHero]);

  useEffect(() => () => termTimers.current.forEach(clearTimeout), []);

  // ── Email copy ─────────────────────────────────────────
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText("aditya8yadav8@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Helpers ────────────────────────────────────────────
  const anim = (delay: string) =>
    heroVisible
      ? { animation: `slideUp 0.7s cubic-bezier(0.16,1,0.3,1) ${delay} forwards` as const }
      : {};

  // ══════════════════════════════════════════════════════
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,600;1,400&family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        html { cursor: none !important; }

        .ok  { color: #e8ff47; }
        .err { color: #ff4747; }
        .dim { color: rgba(232,234,240,0.2); }
        .hi  { color: #fff; }

        @keyframes pulse-dot {
          0%,100% { transform:scale(1);   opacity:1;   }
          50%      { transform:scale(1.6); opacity:0.5; }
        }
        @keyframes blink   { 50% { opacity:0; } }
        @keyframes slideUp { to  { opacity:1; transform:translateY(0); } }
        @keyframes scroll-drop {
          0%,100% { opacity:0.3; transform:scaleY(0.6) translateY(0);   }
          50%     { opacity:1;   transform:scaleY(1)   translateY(4px);  }
        }

        .skill-chip:hover        { border-color:#e8ff47 !important; color:#e8ff47 !important; }
        .nav-link:hover          { color:#e8eaf0 !important; }
        .bottom-link:hover       { color:#e8eaf0 !important; }
        .resume-pill:hover       { background:#e8ff47 !important; color:#04050a !important; }
        .btn-ghost:hover         { border-color:#e8eaf0 !important; color:#e8eaf0 !important; }
        .copy-btn-el:hover       { background:rgba(232,255,71,0.1); }
        .skip-btn:hover          { color:#e8eaf0 !important; }

        .btn-primary { position:relative; overflow:hidden; }
        .btn-primary::after {
          content:''; position:absolute; inset:0;
          background:rgba(255,255,255,0.12);
          transform:translateX(-100%);
          transition:transform 0.3s ease;
        }
        .btn-primary:hover::after { transform:translateX(0); }
        .btn-primary:hover        { box-shadow:0 0 30px rgba(232,255,71,0.35) !important; }
        .btn-primary:active       { transform:scale(0.97); }
      `}</style>

      {/* Custom cursor */}
      <div style={{
        position:"fixed", top:cursorPos.y, left:cursorPos.x,
        width:12, height:12, background:"#e8ff47", borderRadius:"50%",
        pointerEvents:"none", zIndex:9999,
        transform:"translate(-50%,-50%)", mixBlendMode:"difference",
      }} />
      <div style={{
        position:"fixed", top:ringPos.y, left:ringPos.x,
        width:36, height:36,
        border:"1px solid rgba(232,255,71,0.4)", borderRadius:"50%",
        pointerEvents:"none", zIndex:9998,
        transform:"translate(-50%,-50%)",
      }} />

      {/* Noise overlay */}
      <div style={{
        position:"fixed", inset:0, pointerEvents:"none", zIndex:998, opacity:0.028,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      {/* ══ BOOT SCREEN ══ */}
      {!booted && (
        <div style={{
          position:"fixed", inset:0, background:"#04050a", zIndex:1000,
          display:"flex", flexDirection:"column", justifyContent:"center",
          padding:"10vw", fontFamily:"'IBM Plex Mono',monospace",
          transition:"opacity 0.6s ease, transform 0.6s ease",
          opacity: bootExit ? 0 : 1,
          transform: bootExit ? "scale(1.03)" : "scale(1)",
          pointerEvents: bootExit ? "none" : "auto",
        }}>
          <div>
            {BOOT_LINES.map((line, i) => (
              <div
                key={i}
                dangerouslySetInnerHTML={{ __html: line.html }}
                style={{
                  fontSize:"clamp(11px,1.2vw,13px)", lineHeight:2,
                  color:"rgba(232,234,240,0.35)", whiteSpace:"nowrap",
                  opacity: bootLineShow[i] ? 1 : 0,
                  transform: bootLineShow[i] ? "translateX(0)" : "translateX(-8px)",
                  transition:"opacity 0.2s, transform 0.2s",
                }}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div style={{
            marginTop:32, display:"flex", alignItems:"center", gap:16,
            opacity: progressVisible ? 1 : 0, transition:"opacity 0.4s",
          }}>
            <div style={{
              flex:1, height:2,
              background:"rgba(255,255,255,0.08)", borderRadius:2, overflow:"hidden",
            }}>
              <div style={{
                height:"100%", background:"#e8ff47",
                width:`${bootProgress}%`, transition:"width 0.05s linear",
                boxShadow:"0 0 12px #e8ff47",
              }} />
            </div>
            <span style={{
              fontFamily:"'IBM Plex Mono',monospace", fontSize:11,
              color:"#e8ff47", minWidth:36, textAlign:"right",
            }}>{bootProgress}%</span>
          </div>

          <button
            onClick={launchHero}
            className="skip-btn"
            style={{
              position:"absolute", bottom:40, right:60,
              fontFamily:"'IBM Plex Mono',monospace", fontSize:11,
              color:"rgba(232,234,240,0.35)", background:"none", border:"none",
              cursor:"none", letterSpacing:"0.15em", transition:"color 0.2s",
            }}
          >[ SKIP → ]</button>
        </div>
      )}

      {/* ══ HERO ══ */}
      <div style={{
        minHeight:"100vh",
        display:"grid",
        gridTemplateColumns:"1fr 1fr",
        gridTemplateRows:"auto 1fr auto",
        background:"#04050a", color:"#e8eaf0",
        position:"relative", overflow:"hidden",
        fontFamily:"'DM Sans',sans-serif",
        opacity: heroVisible ? 1 : 0,
        transition:"opacity 0.8s ease 0.1s",
      }}>
        {/* Vertical divider */}
        <div style={{
          position:"absolute", left:"50%", top:0, bottom:0,
          width:1, background:"rgba(255,255,255,0.07)", pointerEvents:"none",
        }} />

        {/* ── TOPBAR ──
        <header style={{
          gridColumn:"1 / -1",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"20px 48px",
          borderBottom:"1px solid rgba(255,255,255,0.07)",
          fontFamily:"'IBM Plex Mono',monospace",
          fontSize:11, color:"rgba(232,234,240,0.35)", letterSpacing:"0.12em",
        }}>
          <div style={{ display:"flex", gap:28, alignItems:"center" }}>
            <span style={{
              fontFamily:"'Bebas Neue',cursive",
              fontSize:22, letterSpacing:"0.06em", color:"#e8eaf0",
            }}>AY</span>
            <div style={{
              width:6, height:6, borderRadius:"50%",
              background:"#e8ff47", boxShadow:"0 0 10px #e8ff47",
              animation:"pulse-dot 2s ease-in-out infinite",
            }} />
            <span>PORTFOLIO v2025</span>
          </div>
          <nav style={{ display:"flex", gap:24, alignItems:"center" }}>
            {(["WORK","ABOUT","CONTACT"] as const).map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="nav-link"
                style={{
                  color:"rgba(232,234,240,0.35)", textDecoration:"none",
                  cursor:"none", letterSpacing:"0.1em", transition:"color 0.2s",
                }}>{l}</a>
            ))}
            <a
              href="/Aditya_Yadav_Resume.pdf"
              download target="_blank" rel="noopener noreferrer"
              className="resume-pill"
              style={{
                padding:"6px 16px",
                border:"1px solid #e8ff47", color:"#e8ff47",
                borderRadius:2, fontWeight:600, letterSpacing:"0.15em",
                textDecoration:"none", cursor:"none",
                transition:"background 0.2s, color 0.2s",
              }}
            >RÉSUMÉ ↓</a>
          </nav>
        </header> */}

        {/* ── LEFT PANEL ── */}
        <section style={{
          gridColumn:1, padding:"60px 48px",
          display:"flex", flexDirection:"column", justifyContent:"center",
          borderRight:"1px solid rgba(255,255,255,0.07)",
        }}>

          {/* Available badge */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8,
            padding:"5px 12px",
            border:"1px solid rgba(40,200,64,0.25)", borderRadius:2,
            background:"rgba(40,200,64,0.05)",
            fontFamily:"'IBM Plex Mono',monospace", fontSize:10,
            color:"#28c840", letterSpacing:"0.15em", marginBottom:28,
            opacity:0, ...anim("0.05s"),
          }}>
            <span style={{
              width:5, height:5, borderRadius:"50%", display:"inline-block",
              background:"#28c840", boxShadow:"0 0 6px #28c840",
              animation:"pulse-dot 2s ease-in-out infinite",
            }} />
            AVAILABLE FOR WORK
          </div>

          {/* Label */}
          <div style={{
            fontFamily:"'IBM Plex Mono',monospace", fontSize:10,
            letterSpacing:"0.3em", color:"#e8ff47", textTransform:"uppercase",
            marginBottom:24, display:"flex", alignItems:"center", gap:10,
            opacity:0, ...anim("0.15s"),
          }}>
            <span style={{ display:"inline-block", width:24, height:1, background:"#e8ff47" }} />
            Full Stack Developer
          </div>

          {/* Name */}
          <h1 style={{
            fontFamily:"'Bebas Neue',cursive",
            fontSize:"clamp(72px,9vw,140px)",
            lineHeight:0.92, letterSpacing:"0.01em",
            color:"#e8eaf0", marginBottom:12,
            opacity:0, ...anim("0.25s"),
          }}>
            ADITYA<br />
            <span style={{ WebkitTextStroke:"1px rgba(232,234,240,0.3)", color:"transparent" }}>
              YADAV
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontFamily:"'IBM Plex Mono',monospace",
            fontSize:"clamp(11px,1.1vw,13px)",
            color:"rgba(232,234,240,0.35)", lineHeight:2,
            marginTop:28, maxWidth:380,
            opacity:0, ...anim("0.35s"),
          }}>
            Building products at the intersection of<br />
            <span style={{ color:"#e8eaf0" }}>engineering</span> and{" "}
            <span style={{ color:"#e8eaf0" }}>craft</span>.<br />
            React · Node · AWS · Solana
          </p>

          {/* Skills */}
          <div style={{
            display:"flex", flexWrap:"wrap", gap:8, marginTop:36,
            opacity:0, ...anim("0.45s"),
          }}>
            {SKILLS.map(s => (
              <span key={s} className="skill-chip" style={{
                fontFamily:"'IBM Plex Mono',monospace", fontSize:10,
                letterSpacing:"0.1em", padding:"5px 12px",
                border:"1px solid rgba(255,255,255,0.07)",
                color:"rgba(232,234,240,0.35)", borderRadius:2,
                transition:"border-color 0.2s, color 0.2s", cursor:"none",
              }}>{s}</span>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{
            display:"flex", gap:14, marginTop:48,
            alignItems:"center", flexWrap:"wrap",
            opacity:0, ...anim("0.55s"),
          }}>
            <button
              onClick={scrollToProjects}
              className="btn-primary"
              style={{
                fontFamily:"'IBM Plex Mono',monospace", fontSize:12,
                letterSpacing:"0.18em", padding:"14px 32px",
                background:"#e8ff47", color:"#04050a",
                border:"none", borderRadius:2, cursor:"none", fontWeight:700,
                transition:"transform 0.15s, box-shadow 0.2s",
              }}
            >EXPLORE WORK ↓</button>

            <button
              onClick={() => setShowEmail(true)}
              className="btn-ghost"
              style={{
                fontFamily:"'IBM Plex Mono',monospace", fontSize:12,
                letterSpacing:"0.18em", padding:"14px 32px",
                background:"none", color:"rgba(232,234,240,0.35)",
                border:"1px solid rgba(255,255,255,0.07)", borderRadius:2,
                cursor:"none", transition:"border-color 0.2s, color 0.2s",
              }}
            >LET&apos;S CONNECT</button>
          </div>

          {/* Email reveal */}
          <div style={{
            fontFamily:"'IBM Plex Mono',monospace", fontSize:12,
            letterSpacing:"0.08em", color:"#e8ff47",
            display:"flex", alignItems:"center", gap:10,
            opacity: showEmail ? 1 : 0,
            transform: showEmail ? "translateY(0)" : "translateY(8px)",
            transition:"opacity 0.3s, transform 0.3s",
            pointerEvents: showEmail ? "auto" : "none",
            marginTop:12,
          }}>
            aditya8yadav8@gmail.com
            <button
              onClick={handleCopy}
              className="copy-btn-el"
              style={{
                fontFamily:"'IBM Plex Mono',monospace", fontSize:9,
                padding:"3px 8px",
                border:`1px solid ${copied ? "#28c840" : "#e8ff47"}`,
                color: copied ? "#28c840" : "#e8ff47",
                background:"none", borderRadius:2, cursor:"none",
                letterSpacing:"0.1em", transition:"background 0.15s, color 0.15s",
              }}
            >{copied ? "COPIED ✓" : "COPY"}</button>
          </div>
        </section>

        {/* ── RIGHT PANEL ── */}
        <section style={{
          gridColumn:2, display:"flex", flexDirection:"column",
          position:"relative", overflow:"hidden",
        }}>
          {/* Ghost number */}
          <div style={{
            fontFamily:"'Bebas Neue',cursive",
            fontSize:"clamp(160px,22vw,320px)",
            lineHeight:1, color:"rgba(255,255,255,0.025)",
            position:"absolute", top:-20, right:-20,
            pointerEvents:"none", userSelect:"none", letterSpacing:"-0.04em",
            opacity: heroVisible ? 1 : 0, transition:"opacity 1s ease 0.8s",
          }}>6+</div>

          {/* Terminal */}
          <div style={{
            margin:"60px 48px 0 48px",
            border:"1px solid rgba(255,255,255,0.07)", borderRadius:6,
            overflow:"hidden", background:"rgba(255,255,255,0.02)",
            backdropFilter:"blur(10px)",
            position:"relative", zIndex:2, flexShrink:0,
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(20px)",
            transition:"opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s",
          }}>
            {/* Title bar */}
            <div style={{
              display:"flex", alignItems:"center", gap:8, padding:"10px 16px",
              borderBottom:"1px solid rgba(255,255,255,0.07)",
              background:"rgba(255,255,255,0.025)",
            }}>
              {(["#ff5f57","#febc2e","#28c840"] as const).map((c,i) => (
                <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:c }} />
              ))}
              <span style={{
                fontFamily:"'IBM Plex Mono',monospace", fontSize:10,
                color:"rgba(232,234,240,0.35)", marginLeft:8, letterSpacing:"0.1em",
              }}>aditya@portfolio — bash</span>
            </div>

            {/* Body */}
            <div style={{
              padding:20, fontFamily:"'IBM Plex Mono',monospace",
              fontSize:"clamp(10px,1vw,12px)", lineHeight:2, minHeight:160,
              color:"rgba(232,234,240,0.35)",
            }}>
              <div>
                <span style={{ color:"#e8ff47" }}>~$ </span>
                <span style={{ color:"#e8eaf0" }}>{termCmd}</span>
                {termCursor && (
                  <span style={{
                    display:"inline-block", width:7, height:13,
                    background:"#e8ff47", verticalAlign:"middle",
                    animation:"blink 1s step-end infinite",
                  }} />
                )}
              </div>
              {termOut.map((line, i) => (
                <div key={i} style={{ color:"rgba(232,234,240,0.4)" }}>{line}</div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div style={{
            display:"grid", gridTemplateColumns:"1fr 1fr 1fr",
            borderTop:"1px solid rgba(255,255,255,0.07)", marginTop:"auto",
            opacity: heroVisible ? 1 : 0, transition:"opacity 0.6s ease 0.7s",
          }}>
            {STATS.map(({ num, sup, label }, i) => (
              <div key={label} style={{
                padding:"28px 32px",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}>
                <div style={{
                  fontFamily:"'Bebas Neue',cursive",
                  fontSize:"clamp(32px,3.5vw,48px)",
                  color:"#e8eaf0", lineHeight:1,
                }}>
                  {num}<span style={{ color:"#e8ff47" }}>{sup}</span>
                </div>
                <div style={{
                  fontFamily:"'IBM Plex Mono',monospace", fontSize:9,
                  color:"rgba(232,234,240,0.35)", marginTop:6,
                  letterSpacing:"0.2em", textTransform:"uppercase",
                }}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── BOTTOM BAR ── */}
        <footer style={{
          gridColumn:"1 / -1",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"16px 48px",
          borderTop:"1px solid rgba(255,255,255,0.07)",
          fontFamily:"'IBM Plex Mono',monospace", fontSize:10,
          color:"rgba(232,234,240,0.35)", letterSpacing:"0.15em",
          opacity: heroVisible ? 1 : 0, transition:"opacity 0.6s ease 0.9s",
        }}>
          <div style={{ display:"flex", gap:32 }}>
            {[
              { label:"GITHUB",    href:"https://github.com/OpAditya1109" },
              { label:"LINKEDIN",  href:"https://linkedin.com/in/aditya-cyber-mern" },
              { label:"LIVE SITE", href:"https://aditya-yadav.vercel.app" },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="bottom-link"
                style={{
                  color:"rgba(232,234,240,0.35)", textDecoration:"none",
                  cursor:"none", transition:"color 0.2s",
                }}>{label}</a>
            ))}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span>SCROLL</span>
            <div style={{
              width:1, height:40,
              background:"linear-gradient(to bottom, transparent, #e8ff47)",
              animation:"scroll-drop 2s ease-in-out infinite",
            }} />
          </div>
          <span>PUNE, INDIA — 2025</span>
        </footer>
      </div>
    </>
  );
};

export default HeroSection;