"use client";
import { useState, useRef, useCallback } from "react";

interface DockProps {
  openWindows: Set<string>;
  onOpen: (name: string) => void;
}

const BASE  = 54;
const MAX   = 82;
const RANGE = 140;

/* ─── SVG icon renderers – pixel-close to macOS system icons ─── */

const FinderIcon = () => (
  <svg viewBox="0 0 60 60" width="40" height="40">
    <defs>
      <linearGradient id="fi-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6ac4fb"/>
        <stop offset="100%" stopColor="#1873d3"/>
      </linearGradient>
    </defs>
    <rect width="60" height="60" rx="13" fill="url(#fi-bg)"/>
    {/* Face */}
    <ellipse cx="30" cy="37" rx="20" ry="17" fill="white"/>
    {/* Left half face – blue */}
    <path d="M10 37 Q10 20 30 20 L30 54 Q10 54 10 37Z" fill="#1873d3"/>
    <ellipse cx="30" cy="37" rx="20" ry="17" fill="none" stroke="white" strokeWidth="0"/>
    {/* Left eye */}
    <ellipse cx="21" cy="29" rx="5.5" ry="7" fill="white"/>
    <ellipse cx="21" cy="30" rx="2.5" ry="3" fill="#0d1117"/>
    <ellipse cx="19.8" cy="28.2" rx="1.2" ry="1.6" fill="rgba(255,255,255,0.7)"/>
    {/* Right eye */}
    <ellipse cx="39" cy="29" rx="5.5" ry="7" fill="#1873d3"/>
    <ellipse cx="39" cy="30" rx="2.5" ry="3" fill="#0d1117"/>
    <ellipse cx="37.8" cy="28.2" rx="1.2" ry="1.6" fill="rgba(255,255,255,0.6)"/>
    {/* Nose */}
    <ellipse cx="30" cy="35.5" rx="2" ry="1.2" fill="#a8d4f5"/>
    {/* Smile */}
    <path d="M21 40 Q30 48 39 40" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round"/>
    <path d="M21 40 Q30 48 39 40" fill="none" stroke="#1873d3" strokeWidth="1" strokeLinecap="round" strokeDasharray="0" opacity="0.3"/>
    {/* Gloss */}
    <rect x="0" y="0" width="60" height="22" rx="13" fill="rgba(255,255,255,0.18)"/>
  </svg>
);

const AboutIcon = () => (
  <svg viewBox="0 0 60 60" width="36" height="36">
    <defs>
      <linearGradient id="ab-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#c4b5fd"/>
        <stop offset="100%" stopColor="#4f46e5"/>
      </linearGradient>
    </defs>
    <rect width="60" height="60" rx="13" fill="url(#ab-bg)"/>
    {/* Person silhouette */}
    <circle cx="30" cy="22" r="11" fill="rgba(255,255,255,0.92)"/>
    <path d="M8 57 Q8 38 30 38 Q52 38 52 57" fill="rgba(255,255,255,0.92)"/>
    <rect x="0" y="0" width="60" height="20" rx="13" fill="rgba(255,255,255,0.15)"/>
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 60 60" width="38" height="38">
    <defs>
      <linearGradient id="ml-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6ee7b7"/>
        <stop offset="100%" stopColor="#059669"/>
      </linearGradient>
    </defs>
    <rect width="60" height="60" rx="13" fill="url(#ml-bg)"/>
    {/* Envelope body */}
    <rect x="8" y="16" width="44" height="30" rx="4" fill="white" fillOpacity="0.95"/>
    {/* Flap */}
    <path d="M8 20 L30 35 L52 20 L52 16 L8 16Z" fill="#34d399"/>
    {/* Fold lines */}
    <path d="M8 46 L22 33" stroke="rgba(5,150,105,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M52 46 L38 33" stroke="rgba(5,150,105,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="0" y="0" width="60" height="20" rx="13" fill="rgba(255,255,255,0.15)"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 60 60" width="36" height="36">
    <defs>
      <linearGradient id="gh-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3a3f4b"/>
        <stop offset="100%" stopColor="#0d1117"/>
      </linearGradient>
    </defs>
    <rect width="60" height="60" rx="13" fill="url(#gh-bg)"/>
    <g fill="rgba(255,255,255,0.92)" transform="translate(8,6) scale(0.73)">
      <path d="M30 0C13.43 0 0 13.43 0 30c0 13.26 8.6 24.5 20.52 28.47 1.5.28 2.05-.65 2.05-1.44 0-.71-.03-3.07-.04-5.58-8.34 1.81-10.1-3.56-10.1-3.56-1.36-3.46-3.33-4.38-3.33-4.38-2.72-1.86.21-1.82.21-1.82 3 .21 4.58 3.08 4.58 3.08 2.67 4.57 7 3.25 8.7 2.49.27-1.94 1.04-3.26 1.9-4.01-6.65-.75-13.64-3.32-13.64-14.78 0-3.27 1.17-5.94 3.08-8.04-.31-.75-1.33-3.8.29-7.93 0 0 2.51-.8 8.22 3.07A28.6 28.6 0 0 1 30 19.7c2.54.01 5.1.34 7.49 1.01 5.7-3.87 8.2-3.07 8.2-3.07 1.63 4.13.61 7.18.3 7.93 1.92 2.1 3.08 4.77 3.08 8.04 0 11.49-6.99 14.02-13.66 14.76 1.07.93 2.03 2.75 2.03 5.54 0 4-.04 7.23-.04 8.21 0 .8.54 1.73 2.06 1.44C51.41 54.49 60 43.25 60 30 60 13.43 46.57 0 30 0z"/>
    </g>
    <rect x="0" y="0" width="60" height="20" rx="13" fill="rgba(255,255,255,0.1)"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 60 60" width="36" height="36">
    <defs>
      <linearGradient id="li-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#38bdf8"/>
        <stop offset="100%" stopColor="#0077b5"/>
      </linearGradient>
    </defs>
    <rect width="60" height="60" rx="13" fill="url(#li-bg)"/>
    <g fill="rgba(255,255,255,0.95)" transform="translate(10,10)">
      <rect x="0" y="12" width="8.5" height="26" rx="1"/>
      <circle cx="4.25" cy="4.5" r="4.5"/>
      <path d="M14 12h8.5v3.9h.1c1.2-2.3 4.1-4.8 8.5-4.8C39.8 11.1 41 17 41 23.5V38H32.5V25c0-3.1-.06-7-4.3-7-4.3 0-4.95 3.35-4.95 6.8V38H14V12z"/>
    </g>
    <rect x="0" y="0" width="60" height="20" rx="13" fill="rgba(255,255,255,0.15)"/>
  </svg>
);

const ResumeIcon = () => (
  <svg viewBox="0 0 60 60" width="36" height="36">
    <defs>
      <linearGradient id="re-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fca5a5"/>
        <stop offset="100%" stopColor="#b91c1c"/>
      </linearGradient>
    </defs>
    <rect width="60" height="60" rx="13" fill="url(#re-bg)"/>
    {/* Page */}
    <rect x="12" y="8" width="30" height="40" rx="3.5" fill="white" fillOpacity="0.95"/>
    {/* Dog-ear fold */}
    <path d="M36 8 L42 8 L42 14 L36 14 Z" fill="#fca5a5"/>
    <path d="M36 8 L42 14 L36 14 Z" fill="#e5e7eb"/>
    {/* Header bar */}
    <rect x="12" y="8" width="30" height="11" rx="3.5" fill="#dc2626" fillOpacity="0.9"/>
    <rect x="12" y="15" width="30" height="4" fill="#dc2626" fillOpacity="0.9"/>
    {/* Text lines */}
    <rect x="17" y="24" width="20" height="2.5" rx="1.2" fill="#374151" fillOpacity="0.65"/>
    <rect x="17" y="29" width="14" height="2" rx="1" fill="#374151" fillOpacity="0.4"/>
    <rect x="17" y="33" width="20" height="2" rx="1" fill="#374151" fillOpacity="0.4"/>
    <rect x="17" y="37" width="12" height="2" rx="1" fill="#374151" fillOpacity="0.4"/>
    <rect x="17" y="41" width="17" height="2" rx="1" fill="#374151" fillOpacity="0.4"/>
    {/* PDF badge */}
    <rect x="35" y="5" width="16" height="11" rx="3" fill="#7f1d1d"/>
    <text x="43" y="14" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="white" fontFamily="-apple-system,sans-serif">PDF</text>
    <rect x="0" y="0" width="60" height="20" rx="13" fill="rgba(255,255,255,0.12)"/>
  </svg>
);

const PortfolioIcon = () => (
  <svg viewBox="0 0 60 60" width="36" height="36">
    <defs>
      <linearGradient id="po-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fde68a"/>
        <stop offset="100%" stopColor="#d97706"/>
      </linearGradient>
    </defs>
    <rect width="60" height="60" rx="13" fill="url(#po-bg)"/>
    {/* Globe */}
    <circle cx="30" cy="30" r="18" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5"/>
    <ellipse cx="30" cy="30" rx="8" ry="18" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2"/>
    <line x1="12" y1="30" x2="48" y2="30" stroke="rgba(255,255,255,0.9)" strokeWidth="2"/>
    <path d="M13 22 Q30 27 47 22" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5"/>
    <path d="M13 38 Q30 33 47 38" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5"/>
    <rect x="0" y="0" width="60" height="20" rx="13" fill="rgba(255,255,255,0.15)"/>
  </svg>
);

const TrashIcon = ({ full }: { full?: boolean }) => (
  <svg viewBox="0 0 60 60" width="34" height="34">
    {full ? (
      <>
        {/* Filled trash */}
        <rect x="14" y="20" width="32" height="32" rx="4.5" fill="rgba(255,255,255,0.82)"/>
        <rect x="10" y="13" width="40" height="8" rx="3.5" fill="rgba(255,255,255,0.72)"/>
        <path d="M22 7 L38 7 Q41 7 41 10 L41 13 L19 13 L19 10 Q19 7 22 7Z" fill="rgba(255,255,255,0.6)"/>
        <line x1="22" y1="27" x2="22" y2="45" stroke="#4b5563" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="30" y1="27" x2="30" y2="45" stroke="#4b5563" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="38" y1="27" x2="38" y2="45" stroke="#4b5563" strokeWidth="2.2" strokeLinecap="round"/>
        {/* Badge */}
        <circle cx="44" cy="16" r="8.5" fill="#ef4444"/>
        <text x="44" y="19.5" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="white" fontFamily="-apple-system,sans-serif">3</text>
      </>
    ) : (
      <>
        <rect x="14" y="20" width="32" height="32" rx="4.5" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2.4"/>
        <rect x="10" y="13" width="40" height="8" rx="3.5" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2.2"/>
        <path d="M22 7 L38 7 Q41 7 41 10 L41 13 L19 13 L19 10 Q19 7 22 7Z" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8"/>
        <line x1="22" y1="27" x2="22" y2="45" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="30" y1="27" x2="30" y2="45" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round"/>
        <line x1="38" y1="27" x2="38" y2="45" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round"/>
      </>
    )}
  </svg>
);

/* ─── App items ─── */
const APP_ITEMS = [
  { id: "finder",  label: "Finder",   Icon: FinderIcon  },
  { id: "about",   label: "About Me", Icon: AboutIcon   },
  { id: "contact", label: "Contact",  Icon: MailIcon    },
];

const EXT_ITEMS = [
  { id: "github",    label: "GitHub",    Icon: GitHubIcon,    href: "https://github.com/OpAditya1109" },
  { id: "linkedin",  label: "LinkedIn",  Icon: LinkedInIcon,  href: "https://linkedin.com/in/aditya-cyber-mern" },
  { id: "resume",    label: "Resume",    Icon: ResumeIcon,    href: "/Aditya_Yadav_Resume.pdf", download: true },
  { id: "portfolio", label: "Portfolio", Icon: PortfolioIcon, href: "https://aditya-yadav.vercel.app" },
];

/* ══════════════════════════════════
   DOCK
══════════════════════════════════ */
export default function Dock({ openWindows, onOpen }: DockProps) {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [bounce, setBounce] = useState<Record<string, boolean>>({});
  const dockRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => setMouseX(e.clientX), []);
  const onMouseLeave = useCallback(() => setMouseX(null), []);

  const getSize = useCallback((id: string): number => {
    if (mouseX === null || !dockRef.current) return BASE;
    const el = dockRef.current.querySelector(`[data-dock-id="${id}"]`) as HTMLElement | null;
    if (!el) return BASE;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const d = Math.abs(mouseX - cx);
    if (d >= RANGE) return BASE;
    const t = 1 - d / RANGE;
    return BASE + (MAX - BASE) * Math.pow(t, 1.6);
  }, [mouseX]);

  const launch = useCallback((id: string) => {
    onOpen(id);
    setBounce(p => ({ ...p, [id]: true }));
    setTimeout(() => setBounce(p => ({ ...p, [id]: false })), 800);
  }, [onOpen]);

  return (
    <>
      <style>{`
        @keyframes dockBounce {
          0%   { transform: translateY(0); }
          18%  { transform: translateY(-22px); }
          36%  { transform: translateY(-2px); }
          54%  { transform: translateY(-12px); }
          72%  { transform: translateY(-1px); }
          90%  { transform: translateY(-5px); }
          100% { transform: translateY(0); }
        }
        .bouncing { animation: dockBounce 0.80s cubic-bezier(0.36,0.07,0.19,0.97); }

        .dock-item-icon {
          transition:
            width  0.12s cubic-bezier(0.34,1.56,0.64,1),
            height 0.12s cubic-bezier(0.34,1.56,0.64,1),
            box-shadow 0.15s ease;
        }
      `}</style>

      {/* Dock shell */}
      <div
        ref={dockRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          position: "absolute",
          bottom: 10,
          left: "50%",
          transform: "translateX(-50%)",
          /* Frosted glass – matches macOS dock exactly */
          background: "rgba(40,40,46,0.62)",
          backdropFilter: "blur(40px) saturate(180%) brightness(1.1)",
          WebkitBackdropFilter: "blur(40px) saturate(180%) brightness(1.1)",
          border: "1px solid rgba(255,255,255,0.18)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 20,
          padding: "6px 10px 0 10px",
          display: "flex",
          alignItems: "flex-end",
          gap: 4,
          boxShadow:
            "0 0 0 0.5px rgba(0,0,0,0.55), " +
            "0 8px 32px rgba(0,0,0,0.55), " +
            "inset 0 1px 0 rgba(255,255,255,0.14)",
          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
          zIndex: 200,
        }}
      >
        {APP_ITEMS.map(item => (
          <DockItem
            key={item.id}
            id={item.id}
            label={item.label}
            size={getSize(item.id)}
            isOpen={openWindows.has(item.id)}
            isBouncing={!!bounce[item.id]}
            onClick={() => launch(item.id)}
          >
            <item.Icon />
          </DockItem>
        ))}

        <Divider />

        {EXT_ITEMS.map(item => (
          <DockItem
            key={item.id}
            id={item.id}
            label={item.label}
            size={getSize(item.id)}
            href={item.href}
            download={item.download}
          >
            <item.Icon />
          </DockItem>
        ))}

        <Divider />

        <DockItem
          id="trash"
          label="Trash"
          size={getSize("trash")}
        >
          <TrashIcon full />
        </DockItem>
      </div>
    </>
  );
}

/* ── Divider ── */
function Divider() {
  return (
    <div style={{
      width: 1,
      height: 44,
      alignSelf: "flex-end",
      background: "rgba(255,255,255,0.2)",
      margin: "0 3px 6px",
      flexShrink: 0,
    }} />
  );
}

/* ── DockItem ── */
interface DockItemProps {
  id: string;
  label: string;
  size: number;
  isOpen?: boolean;
  isBouncing?: boolean;
  onClick?: () => void;
  href?: string;
  download?: boolean;
  children: React.ReactNode;
}

function DockItem({ id, label, size, isOpen, isBouncing, onClick, href, download, children }: DockItemProps) {
  const [hov, setHov] = useState(false);
  const radius = Math.round(size * 0.225);

  const inner = (
    <div
      data-dock-id={id}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: MAX + 8,
        alignSelf: "flex-end",
        paddingBottom: 5,
        cursor: "pointer",
        position: "relative",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* Tooltip – matches macOS label style */}
      {hov && (
        <div style={{
          position: "absolute",
          bottom: `calc(100% + 8px)`,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(28,28,32,0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "0.5px solid rgba(255,255,255,0.18)",
          borderRadius: 8,
          padding: "5px 11px",
          fontSize: 12.5,
          fontWeight: 500,
          color: "#f5f5f7",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          zIndex: 9999,
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          letterSpacing: "-0.1px",
        }}>{label}</div>
      )}

      {/* Icon container */}
      <div
        className={`dock-item-icon ${isBouncing ? "bouncing" : ""}`}
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
          boxShadow: hov
            ? "0 14px 40px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.35)"
            : "0 4px 16px rgba(0,0,0,0.45), 0 1px 3px rgba(0,0,0,0.25)",
        }}
      >
        {children}

        {/* Gloss overlay – subtle iOS-style sheen */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "46%",
          background: "linear-gradient(180deg,rgba(255,255,255,0.28) 0%,rgba(255,255,255,0.02) 100%)",
          borderRadius: `${radius}px ${radius}px 55% 55%`,
          pointerEvents: "none",
        }} />
      </div>

      {/* Running dot */}
      <div style={{
        width: isOpen ? 4 : 0,
        height: isOpen ? 4 : 0,
        borderRadius: "50%",
        marginTop: 3,
        background: "rgba(255,255,255,0.85)",
        boxShadow: isOpen ? "0 0 4px rgba(255,255,255,0.6)" : "none",
        transition: "all 0.2s ease",
        flexShrink: 0,
      }} />
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={download ? "_self" : "_blank"}
        rel="noopener noreferrer"
        {...(download ? { download: true } : {})}
        style={{ textDecoration: "none", display: "flex" }}
      >
        {inner}
      </a>
    );
  }

  return inner;
}