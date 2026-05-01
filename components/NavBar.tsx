"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const ACCENT = "#F5C518";

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abhaytandon/",
    path: "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8h4.56v14H.22V8zm7.4 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 7v8.44h-4.56v-7.48c0-1.78-.03-4.07-2.48-4.07-2.48 0-2.86 1.94-2.86 3.94V22H7.62V8z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@TheInnovatorsandDisruptorsPodc",
    path: "M23.5 6.2c-.27-1.02-1.07-1.83-2.09-2.1C19.55 3.6 12 3.6 12 3.6s-7.55 0-9.41.5C1.57 4.37.77 5.18.5 6.2 0 8.07 0 12 0 12s0 3.93.5 5.8c.27 1.02 1.07 1.83 2.09 2.1 1.86.5 9.41.5 9.41.5s7.55 0 9.41-.5c1.02-.27 1.82-1.08 2.09-2.1.5-1.87.5-5.8.5-5.8s0-3.93-.5-5.8zM9.6 15.6V8.4l6.24 3.6-6.24 3.6z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/theinnovatorsanddisruptors/",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.67 1.07-1.34 1.38-2.13.3-.76.5-1.64.56-2.91C23.99 15.67 24 15.26 24 12s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.38-2.13C21.32 1.35 20.65.94 19.86.63 19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 105.84 12 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 1116 12a4 4 0 01-4 4zm6.41-11.85a1.44 1.44 0 11-1.44-1.44 1.44 1.44 0 011.44 1.44z",
  },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(14px)",
        background: scrolled ? "rgba(11,11,11,0.82)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(245,197,24,0.14)" : "1px solid transparent",
        transition: "all 240ms ease",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo + wordmark */}
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none", color: "inherit" }}>
          <div style={{
            width: 48, height: 48, borderRadius: 10, background: "#F4F1EA",
            display: "grid", placeItems: "center", overflow: "hidden",
            border: `1px solid ${ACCENT}33`, flexShrink: 0,
          }}>
            <Image src="/logo.png" alt="TID Podcast" width={48} height={48} style={{ objectFit: "contain" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{ fontFamily: "var(--font-display), system-ui", fontWeight: 700, fontSize: 16, letterSpacing: -0.3 }}>
              TIDPodcast<span style={{ color: ACCENT }}>.in</span>
            </span>
            <span style={{ fontSize: 10, color: "var(--text)", opacity: 0.75, marginTop: 4, letterSpacing: 0.1 }}>
              The Innovators and Disruptors Podcast
            </span>
          </div>
        </a>

        {/* Nav links + socials + CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {[
            ["Episodes", "#episodes"],
            ["Guests", "/guests"],
            ["Collective", "/collective"],
            ["Meet the Host", "#about"],
          ].map(([label, href]) => (
            <a key={label} href={href} style={{ color: "var(--text)", textDecoration: "none", fontSize: 14, opacity: 0.72, transition: "opacity 160ms" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.72")}>
              {label}
            </a>
          ))}

          {/* Socials */}
          <div style={{ display: "flex", alignItems: "center", gap: 2, paddingLeft: 10, marginLeft: 4, borderLeft: `1px solid ${ACCENT}22` }}>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer"
                style={{ width: 34, height: 34, borderRadius: 8, display: "grid", placeItems: "center", color: "var(--text)", opacity: 0.65, textDecoration: "none", transition: "all 200ms" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.opacity = "1"; el.style.color = ACCENT; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.opacity = "0.65"; el.style.color = "var(--text)"; }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d={s.path} /></svg>
              </a>
            ))}
          </div>

          <a
            href="https://podcasts.apple.com/gb/podcast/the-innovators-and-disruptors-podcast/id1798971388"
            target="_blank" rel="noopener noreferrer"
            style={{
              background: ACCENT, color: "#0B0B0B", border: "none",
              padding: "9px 18px", borderRadius: 999, fontWeight: 600, fontSize: 13,
              cursor: "pointer", textDecoration: "none", fontFamily: "inherit", whiteSpace: "nowrap",
            }}>
            Listen ↗
          </a>
        </div>
      </div>
    </nav>
  );
}
