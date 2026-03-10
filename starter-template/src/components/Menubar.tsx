"use client";
import { useEffect, useRef, useState } from "react";

type DropdownId =
  | "apple" | "finder" | "file" | "edit" | "view" | "go" | "window" | "help"
  | "battery" | "wifi" | "search" | "controlcenter"
  | null;

/* ─── click-outside hook ─── */
function useClickOutside(ref: React.RefObject<HTMLDivElement>, cb: () => void) {
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) cb();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [ref, cb]);
}

/* ─── Dropdown menu ─── */
interface MenuItem {
  label?: string;
  shortcut?: string;
  divider?: boolean;
  disabled?: boolean;
  checked?: boolean;
  danger?: boolean;
  action?: () => void;
}

function Menu({ items, style }: { items: MenuItem[]; style?: React.CSSProperties }) {
  return (
    <div style={{
      position: "absolute", top: "calc(100% + 2px)",
      background: "rgba(28,30,40,0.96)",
      backdropFilter: "blur(28px) saturate(200%)",
      WebkitBackdropFilter: "blur(28px) saturate(200%)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 8,
      boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
      padding: "4px 0", minWidth: 220,
      zIndex: 9999,
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      ...style,
    }}>
      {items.map((item, i) =>
        item.divider
          ? <div key={i} style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "3px 0" }} />
          : (
            <div key={i}
              onClick={() => !item.disabled && item.action?.()}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "4px 14px", fontSize: 13, borderRadius: 4, margin: "0 4px",
                color: item.disabled
                  ? "rgba(255,255,255,0.22)"
                  : item.danger ? "#ff6b6b" : "rgba(255,255,255,0.88)",
                cursor: item.disabled ? "default" : "pointer",
                transition: "background 0.08s",
                gap: 24,
              }}
              onMouseEnter={e => { if (!item.disabled) { (e.currentTarget as HTMLElement).style.background = "rgba(74,144,226,0.85)"; (e.currentTarget as HTMLElement).style.color = "#fff"; } }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = item.disabled ? "rgba(255,255,255,0.22)" : item.danger ? "#ff6b6b" : "rgba(255,255,255,0.88)"; }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {item.checked !== undefined && (
                  <span style={{ width: 12, fontSize: 11 }}>{item.checked ? "✓" : ""}</span>
                )}
                {item.label}
              </span>
              {item.shortcut && (
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{item.shortcut}</span>
              )}
            </div>
          )
      )}
    </div>
  );
}

/* ─── Panel ─── */
function Panel({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      position: "absolute", top: "calc(100% + 6px)",
      background: "rgba(28,30,40,0.96)",
      backdropFilter: "blur(28px) saturate(200%)",
      WebkitBackdropFilter: "blur(28px) saturate(200%)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 14,
      boxShadow: "0 24px 60px rgba(0,0,0,0.7)",
      padding: 16, zIndex: 9999,
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      ...style,
    }}>{children}</div>
  );
}

/* ══════════════════════════════════════
   MENUBAR
══════════════════════════════════════ */
export default function Menubar() {
  const [timeStr, setTimeStr]     = useState("");
  const [open, setOpen]           = useState<DropdownId>(null);
  const [battery, setBattery]     = useState<{ level: number; charging: boolean } | null>(null);
  const [online, setOnline]       = useState(true);
  const [searchVal, setSearchVal] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const barRef    = useRef<HTMLDivElement>(null!);

  useClickOutside(barRef, () => { setOpen(null); setSearchVal(""); });

  /* real clock */
  useEffect(() => {
    const tick = () => {
      const n = new Date();
      const d = n.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
      const t = n.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
      setTimeStr(`${d}  ${t}`);
    };
    tick(); const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  /* real Battery API */
  useEffect(() => {
    const nav = navigator as any;
    if (!nav.getBattery) { setBattery({ level: 85, charging: false }); return; }
    nav.getBattery().then((bat: any) => {
      const upd = () => setBattery({ level: Math.round(bat.level * 100), charging: bat.charging });
      upd();
      bat.addEventListener("levelchange", upd);
      bat.addEventListener("chargingchange", upd);
    });
  }, []);

  /* real online/offline */
  useEffect(() => {
    setOnline(navigator.onLine);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);

  /* focus search input when panel opens */
  useEffect(() => {
    if (open === "search") setTimeout(() => searchRef.current?.focus(), 60);
  }, [open]);

  const toggle = (id: DropdownId) => setOpen(p => (p === id ? null : id));
  const close  = () => setOpen(null);

  /* ── menu data ── */
  const appleItems: MenuItem[] = [
    { label: "About This Mac", action: close },
    { divider: true },
    { label: "System Settings…", shortcut: "⌘," , action: close },
    { label: "App Store…", action: close },
    { divider: true },
    { label: "Recent Items", disabled: true },
    { divider: true },
    { label: "Force Quit…", shortcut: "⌥⌘⎋", action: close },
    { divider: true },
    { label: "Sleep", action: close },
    { label: "Restart…", action: close },
    { label: "Shut Down…", danger: true, action: close },
    { divider: true },
    { label: "Lock Screen", shortcut: "⌃⌘Q", action: close },
    { label: "Log Out Aditya…", shortcut: "⇧⌘Q", action: close },
  ];
  const finderItems: MenuItem[] = [
    { label: "About Finder", action: close },
    { divider: true },
    { label: "Preferences…", shortcut: "⌘,", action: close },
    { divider: true },
    { label: "Empty Trash…", shortcut: "⇧⌘⌫", disabled: true },
    { divider: true },
    { label: "Hide Finder", shortcut: "⌘H", action: close },
    { label: "Hide Others", shortcut: "⌥⌘H", action: close },
    { label: "Show All", disabled: true },
  ];
  const fileItems: MenuItem[] = [
    { label: "New Finder Window", shortcut: "⌘N", action: close },
    { label: "New Folder", shortcut: "⇧⌘N", action: close },
    { label: "New Tab", shortcut: "⌘T", action: close },
    { divider: true },
    { label: "Open", shortcut: "⌘O", action: close },
    { label: "Print", shortcut: "⌘P", disabled: true },
    { divider: true },
    { label: "Get Info", shortcut: "⌘I", action: close },
    { label: "Rename", action: close },
    { label: "Compress", action: close },
    { divider: true },
    { label: "Move to Trash", shortcut: "⌘⌫", action: close },
    { divider: true },
    { label: "Close Window", shortcut: "⌘W", action: close },
  ];
  const editItems: MenuItem[] = [
    { label: "Undo", shortcut: "⌘Z", disabled: true },
    { label: "Redo", shortcut: "⇧⌘Z", disabled: true },
    { divider: true },
    { label: "Cut", shortcut: "⌘X", disabled: true },
    { label: "Copy", shortcut: "⌘C", disabled: true },
    { label: "Paste", shortcut: "⌘V", disabled: true },
    { label: "Select All", shortcut: "⌘A", action: close },
    { divider: true },
    { label: "Find", shortcut: "⌘F", action: () => toggle("search") },
  ];
  const viewItems: MenuItem[] = [
    { label: "as Icons", shortcut: "⌘1", checked: true, action: close },
    { label: "as List",  shortcut: "⌘2", checked: false, action: close },
    { label: "as Columns", shortcut: "⌘3", checked: false, action: close },
    { label: "as Gallery", shortcut: "⌘4", checked: false, action: close },
    { divider: true },
    { label: "Use Stacks", action: close },
    { label: "Sort By", disabled: true },
    { label: "Clean Up", action: close },
    { divider: true },
    { label: "Hide Sidebar", shortcut: "⌥⌘S", action: close },
    { label: "Enter Full Screen", shortcut: "⌃⌘F", action: close },
  ];
  const goItems: MenuItem[] = [
    { label: "Back",    shortcut: "⌘[", disabled: true },
    { label: "Forward", shortcut: "⌘]", disabled: true },
    { divider: true },
    { label: "Recents",      shortcut: "⇧⌘F", action: close },
    { label: "Documents",    shortcut: "⇧⌘O", action: close },
    { label: "Desktop",      shortcut: "⇧⌘D", action: close },
    { label: "Downloads",    shortcut: "⌥⌘L", action: close },
    { label: "Applications", shortcut: "⇧⌘A", action: () => { window.open("https://aditya-yadav.vercel.app","_blank"); close(); } },
    { divider: true },
    { label: "Connect to Server…", shortcut: "⌘K", action: () => { window.location.href = "mailto:aditya8yadav8@gmail.com"; close(); } },
  ];
  const windowItems: MenuItem[] = [
    { label: "Minimize", shortcut: "⌘M", action: close },
    { label: "Zoom",     action: close },
    { divider: true },
    { label: "About Me", action: close },
    { label: "Projects", action: close },
    { label: "Contact",  action: close },
  ];
  const helpItems: MenuItem[] = [
    { label: "Search", action: () => toggle("search") },
    { divider: true },
    { label: "macOS Help", action: close },
    { divider: true },
    { label: "Aditya's Portfolio", action: () => { window.open("https://aditya-yadav.vercel.app","_blank"); close(); } },
    { label: "GitHub",   action: () => { window.open("https://github.com/OpAditya1109","_blank"); close(); } },
    { label: "LinkedIn", action: () => { window.open("https://linkedin.com/in/aditya-cyber-mern","_blank"); close(); } },
  ];

  const appMenus = [
    { id: "finder" as DropdownId, label: "Finder",  items: finderItems, bold: true },
    { id: "file"   as DropdownId, label: "File",    items: fileItems },
    { id: "edit"   as DropdownId, label: "Edit",    items: editItems },
    { id: "view"   as DropdownId, label: "View",    items: viewItems },
    { id: "go"     as DropdownId, label: "Go",      items: goItems },
    { id: "window" as DropdownId, label: "Window",  items: windowItems },
    { id: "help"   as DropdownId, label: "Help",    items: helpItems },
  ];

  /* Spotlight results */
  const ALL_RESULTS = [
    { icon: "💼", label: "Projects",   sub: "Finder › Portfolio" },
    { icon: "👤", label: "About Me",   sub: "Finder › About" },
    { icon: "✉️", label: "Contact",    sub: "Finder › Contact" },
    { icon: "🐙", label: "GitHub",     sub: "github.com/OpAditya1109" },
    { icon: "📄", label: "Resume",     sub: "Aditya_Yadav_Resume.pdf" },
    { icon: "🔐", label: "Secura Pay", sub: "Projects › Blockchain" },
    { icon: "🔮", label: "AstroBhavana", sub: "Projects › Full-Stack" },
    { icon: "☁️", label: "CloudDrive", sub: "Projects › AWS" },
  ];
  const results = searchVal
    ? ALL_RESULTS.filter(r =>
        r.label.toLowerCase().includes(searchVal.toLowerCase()) ||
        r.sub.toLowerCase().includes(searchVal.toLowerCase())
      )
    : [];

  /* ── Battery SVG icon ── */
  const lvl      = battery?.level ?? 85;
  const charging = battery?.charging ?? false;
  const batColor = lvl <= 20 ? "#ff5f57" : lvl <= 40 ? "#febc2e" : "rgba(255,255,255,0.75)";

  /* ── WiFi SVG icon ── */
  const WifiSVG = ({ size = 15 }: { size?: number }) => (
    <svg width={size} height={size * 0.75} viewBox="0 0 20 15" fill="none">
      {online ? (
        <>
          <circle cx="10" cy="13.5" r="1.8" fill="rgba(255,255,255,0.85)" />
          <path d="M6 9.5C7.2 8.3 8.5 7.6 10 7.6s2.8.7 4 1.9" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
          <path d="M2.5 6C5 3.5 7.4 2.2 10 2.2s5 1.3 7.5 3.8" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
        </>
      ) : (
        <>
          <circle cx="10" cy="13.5" r="1.8" fill="rgba(255,100,100,0.8)" />
          <path d="M2 2l16 13" stroke="rgba(255,100,100,0.8)" strokeWidth="1.6" strokeLinecap="round"/>
        </>
      )}
    </svg>
  );

  /* ── Spotlight SVG ── */
  const SpotlightSVG = () => (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <circle cx="6.5" cy="6.5" r="4.5" stroke="rgba(255,255,255,0.8)" strokeWidth="1.7"/>
      <path d="M10.2 10.2l3.5 3.5" stroke="rgba(255,255,255,0.8)" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  );

  /* ── Control center SVG ── */
  const ControlSVG = () => (
    <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
      <circle cx="5"  cy="5"  r="2.5" fill="rgba(255,255,255,0.82)"/>
      <circle cx="13" cy="5"  r="2.5" fill="rgba(255,255,255,0.82)"/>
      <circle cx="5"  cy="13" r="2.5" fill="rgba(255,255,255,0.82)"/>
      <circle cx="13" cy="13" r="2.5" fill="rgba(255,255,255,0.82)"/>
    </svg>
  );

  /* ── Apple logo SVG ── */
  const AppleSVG = () => (
    <svg viewBox="0 0 14 17" width="14" height="17" fill="rgba(255,255,255,0.88)">
      <path d="M11.76 8.9c-.02-1.9 1.55-2.82 1.62-2.88-.88-1.3-2.26-1.47-2.75-1.5-1.17-.12-2.29.7-2.89.7-.6 0-1.52-.68-2.5-.66-1.28.02-2.47.75-3.13 1.87C.5 8.7 1.47 12.45 2.62 14.51c.56.94 1.24 2 2.15 1.97.87-.04 1.2-.57 2.25-.57 1.05 0 1.35.57 2.26.55 1.3-.04 1.87-1.31 2.46-2.26.64-1.08 1.06-2.16 1.07-2.2-.03-.03-2.04-.81-2.05-3.1zM9.94 2.93c.49-.65.82-1.55.73-2.44-.71.03-1.57.5-2.08 1.13-.46.55-.87 1.43-.76 2.28.79.07 1.62-.43 2.11-1z"/>
    </svg>
  );

  const itemBase = (id: DropdownId, extra?: React.CSSProperties): React.CSSProperties => ({
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "2px 7px", borderRadius: 4, cursor: "default",
    background: open === id ? "rgba(255,255,255,0.2)" : "transparent",
    transition: "background 0.1s",
    position: "relative",
    ...extra,
  });

  return (
    <div ref={barRef}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 28,
        background: "rgba(18,20,30,0.8)",
        backdropFilter: "blur(24px) saturate(200%)",
        WebkitBackdropFilter: "blur(24px) saturate(200%)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 6px", zIndex: 100,
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        userSelect: "none",
      }}>

        {/* ── LEFT ── */}
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>

          {/* Apple */}
          <div style={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}>
            <div style={itemBase("apple", { padding: "2px 10px" })} onClick={() => toggle("apple")}>
              <AppleSVG />
            </div>
            {open === "apple" && <Menu items={appleItems} style={{ left: 0 }} />}
          </div>

          {/* App menus */}
          {appMenus.map(m => (
            <div key={m.id} style={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}>
              <div
                style={{
                  ...itemBase(m.id),
                  fontSize: 13,
                  fontWeight: m.bold ? 600 : 500,
                  color: "rgba(255,255,255,0.88)",
                  letterSpacing: -0.1,
                  padding: "2px 8px",
                }}
                onClick={() => toggle(m.id)}
                onMouseEnter={() => { if (open && open !== m.id && !["battery","wifi","search","controlcenter"].includes(open as string)) setOpen(m.id); }}
              >{m.label}</div>
              {open === m.id && <Menu items={m.items} style={{ left: 0 }} />}
            </div>
          ))}
        </div>

        {/* ── RIGHT ── */}
        <div style={{ display: "flex", alignItems: "center", height: "100%", gap: 0 }}>

          {/* Battery */}
          <div style={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}>
            <div style={itemBase("battery", { gap: 4, padding: "2px 8px" })} onClick={() => toggle("battery")}>
              {charging && <span style={{ fontSize: 9, color: "#febc2e" }}>⚡</span>}
              {/* Battery body */}
              <div style={{ position: "relative", width: 22, height: 11, display: "flex", alignItems: "center" }}>
                <div style={{
                  width: 20, height: 11,
                  border: `1.5px solid ${batColor}`,
                  borderRadius: 3, overflow: "hidden", position: "relative",
                }}>
                  <div style={{
                    position: "absolute", left: 0, top: 0, bottom: 0,
                    width: `${lvl}%`,
                    background: batColor,
                    transition: "width 1s",
                  }} />
                </div>
                {/* Terminal nub */}
                <div style={{
                  position: "absolute", right: -3.5,
                  width: 2.5, height: 5, background: batColor,
                  borderRadius: "0 2px 2px 0",
                }} />
              </div>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", minWidth: 30 }}>{lvl}%</span>
            </div>
            {open === "battery" && (
              <Panel style={{ right: 0, width: 260 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>Battery</div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                  <span style={{ fontSize: 40 }}>{charging ? "🔌" : "🔋"}</span>
                  <div>
                    <div style={{ fontSize: 30, fontWeight: 700, color: lvl <= 20 ? "#ff5f57" : "#34d399", lineHeight: 1 }}>{lvl}%</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 3 }}>
                      {charging ? "Charging…" : "On Battery Power"}
                    </div>
                  </div>
                </div>
                <div style={{ height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: 4, width: `${lvl}%`,
                    background: lvl <= 20 ? "#ff5f57" : "#34d399",
                    transition: "width 1s",
                  }} />
                </div>
                <div style={{ marginTop: 10, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                  {charging ? "Plugged in, charging" : "Not plugged in"}
                </div>
              </Panel>
            )}
          </div>

          {/* Wi-Fi */}
          <div style={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}>
            <div style={itemBase("wifi")} onClick={() => toggle("wifi")}>
              <WifiSVG />
            </div>
            {open === "wifi" && (
              <Panel style={{ right: 0, width: 250 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>Wi-Fi</div>
                <div style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px", borderRadius: 10,
                  background: online ? "rgba(74,144,226,0.1)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${online ? "rgba(74,144,226,0.25)" : "rgba(255,255,255,0.08)"}`,
                  marginBottom: 10,
                }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 8,
                    background: online ? "rgba(74,144,226,0.2)" : "rgba(255,255,255,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <WifiSVG size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{online ? "Connected" : "Not Connected"}</div>
                    <div style={{ fontSize: 11, color: online ? "#4a90e2" : "rgba(255,255,255,0.35)" }}>
                      {online ? "Wi-Fi On" : "No Internet"}
                    </div>
                  </div>
                </div>
                <div style={{
                  fontSize: 12, color: "rgba(255,255,255,0.4)",
                  textAlign: "center", paddingTop: 8,
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  cursor: "pointer",
                }}>Wi-Fi Preferences…</div>
              </Panel>
            )}
          </div>

          {/* Spotlight */}
          <div style={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}>
            <div style={itemBase("search")} onClick={() => toggle("search")}>
              <SpotlightSVG />
            </div>
            {open === "search" && (
              <Panel style={{ right: "-120px", width: 560, top: "calc(100% + 8px)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: results.length || searchVal ? 12 : 0 }}>
                  <SpotlightSVG />
                  <input
                    ref={searchRef}
                    value={searchVal}
                    onChange={e => setSearchVal(e.target.value)}
                    placeholder="Spotlight Search"
                    style={{
                      flex: 1, background: "none", border: "none", outline: "none",
                      fontSize: 18, color: "#fff",
                      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                    }}
                  />
                  {searchVal && (
                    <button onClick={() => setSearchVal("")} style={{
                      background: "rgba(255,255,255,0.1)", border: "none",
                      color: "rgba(255,255,255,0.6)", cursor: "pointer",
                      width: 20, height: 20, borderRadius: "50%", fontSize: 11,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>✕</button>
                  )}
                </div>
                {results.length > 0 && (
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 10 }}>
                    {results.map((r, i) => (
                      <div key={i} style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "8px 10px", borderRadius: 8, cursor: "pointer",
                        transition: "background 0.1s",
                      }}
                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(74,144,226,0.22)")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                      >
                        <span style={{ fontSize: 22, width: 34, textAlign: "center" }}>{r.icon}</span>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 500, color: "#fff" }}>{r.label}</div>
                          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{r.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {searchVal && results.length === 0 && (
                  <div style={{ textAlign: "center", padding: "20px 0", color: "rgba(255,255,255,0.3)", fontSize: 13, borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 2 }}>
                    No results for &ldquo;{searchVal}&rdquo;
                  </div>
                )}
              </Panel>
            )}
          </div>

          {/* Control Center */}
          <div style={{ position: "relative", height: "100%", display: "flex", alignItems: "center" }}>
            <div style={itemBase("controlcenter")} onClick={() => toggle("controlcenter")}>
              <ControlSVG />
            </div>
            {open === "controlcenter" && (
              <Panel style={{ right: 0, width: 300 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>Control Centre</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                  {[
                    { icon: "📶", label: "Wi-Fi",     sub: online ? "Connected" : "Off",     on: online },
                    { icon: "🔷", label: "Bluetooth", sub: "On",                             on: true  },
                    { icon: "✈️", label: "AirDrop",   sub: "Contacts Only",                  on: false },
                    { icon: "🌙", label: "Focus",     sub: "Off",                            on: false },
                  ].map(item => (
                    <div key={item.label} style={{
                      background: item.on ? "rgba(74,144,226,0.18)" : "rgba(255,255,255,0.05)",
                      borderRadius: 10, padding: "12px 14px",
                      border: `1px solid ${item.on ? "rgba(74,144,226,0.28)" : "rgba(255,255,255,0.07)"}`,
                    }}>
                      <div style={{ fontSize: 18, marginBottom: 4 }}>{item.icon}</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: item.on ? "#4a90e2" : "rgba(255,255,255,0.35)" }}>{item.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Brightness slider */}
                <div style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 14 }}>🔆</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Display</span>
                  </div>
                  <input type="range" min={0} max={100} defaultValue={80}
                    style={{ width: "100%", accentColor: "#4a90e2" }} />
                </div>

                {/* Volume slider */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 14 }}>🔊</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Sound</span>
                  </div>
                  <input type="range" min={0} max={100} defaultValue={60}
                    style={{ width: "100%", accentColor: "#4a90e2" }} />
                </div>

                {/* Battery row */}
                {battery && (
                  <div style={{
                    padding: "10px 12px", borderRadius: 10,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 18 }}>{charging ? "🔌" : "🔋"}</span>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Battery</div>
                        <div style={{ fontSize: 11, color: lvl <= 20 ? "#ff5f57" : "rgba(255,255,255,0.4)" }}>
                          {charging ? "Charging" : lvl <= 20 ? "Low Battery" : "Normal"}
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 700, color: lvl <= 20 ? "#ff5f57" : "#34d399" }}>{lvl}%</span>
                  </div>
                )}
              </Panel>
            )}
          </div>

          {/* Clock */}
          <div style={{
            fontSize: 12, fontWeight: 500,
            color: "rgba(255,255,255,0.88)",
            padding: "2px 8px", cursor: "default",
            letterSpacing: -0.1, whiteSpace: "nowrap",
          }}>{timeStr}</div>
        </div>
      </div>
    </div>
  );
}