"use client";
import { useState } from "react";
import { GREEN_ROOM_EMAIL } from "@/lib/contact";

const ACCENT = "#F5C518";
const BG = "#0B0B0B";
const TEXT = "#F4F1EA";
const MUTED = "#8A867E";

const OPTIONS = [
  {
    id: "brand",
    emoji: "🎙️",
    label: "I'm a brand",
    line: "Put your story in front of India's founders, CXOs and builders — inside conversations they actually finish.",
    subject: "TID × Brand partnership",
  },
  {
    id: "join",
    emoji: "🚀",
    label: "I want to join the team",
    line: "Small team, big conversations. If you're curious and allergic to boring content, we want to hear from you.",
    subject: "TID × I want to join",
  },
  {
    id: "freelance",
    emoji: "✂️",
    label: "I'm a freelancer / creator",
    line: "Editors, designers, writers, motion folks — your work, seen by people who care about what's next.",
    subject: "TID × Freelance collab",
  },
  {
    id: "hi",
    emoji: "👋",
    label: "Just saying hi",
    line: "No agenda needed. The best collabs start with \"this might be random, but…\"",
    subject: "TID × Hello",
  },
];

export default function GreenRoomPicker() {
  const [picked, setPicked] = useState(OPTIONS[0].id);
  const option = OPTIONS.find((o) => o.id === picked) ?? OPTIONS[0];
  const mailto = `mailto:${GREEN_ROOM_EMAIL}?subject=${encodeURIComponent(option.subject)}`;

  return (
    <div>
      <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: MUTED, letterSpacing: 1.4, marginBottom: 16 }}>
        WHAT BRINGS YOU HERE?
      </div>

      <div role="radiogroup" aria-label="What brings you here?" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {OPTIONS.map((o) => {
          const active = o.id === picked;
          return (
            <button
              key={o.id}
              role="radio"
              aria-checked={active}
              onClick={() => setPicked(o.id)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 18px", borderRadius: 999, cursor: "pointer",
                fontFamily: "inherit", fontSize: 15, fontWeight: 600,
                background: active ? ACCENT : "rgba(244,241,234,0.04)",
                color: active ? BG : TEXT,
                border: `1px solid ${active ? ACCENT : `${ACCENT}33`}`,
                transition: "all 180ms ease",
              }}>
              <span aria-hidden>{o.emoji}</span>
              {o.label}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" style={{ fontSize: 19, lineHeight: 1.55, color: TEXT, opacity: 0.88, margin: "28px 0 32px", maxWidth: 620, minHeight: 60 }}>
        {option.line}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 18 }}>
        <a
          href={mailto}
          style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 30px", borderRadius: 999, background: ACCENT, color: BG, textDecoration: "none", fontWeight: 700, fontSize: 16, boxShadow: `0 14px 36px -14px ${ACCENT}99` }}>
          Let&apos;s explore synergies →
        </a>
        <span style={{ fontSize: 14, color: MUTED }}>
          or write to{" "}
          <a href={mailto} style={{ color: ACCENT, textDecoration: "none", fontWeight: 600, wordBreak: "break-all" }}>{GREEN_ROOM_EMAIL}</a>
        </span>
      </div>
    </div>
  );
}
