"use client";
import { useState } from "react";

const ACCENT = "#F5C518";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const valid = /\S+@\S+\.\S+/.test(email);

  return (
    <section style={{ padding: "0 32px 100px" }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto", borderRadius: 28,
        background: `linear-gradient(135deg, ${ACCENT} 0%, #E8A317 100%)`,
        padding: "72px 56px", color: "#0B0B0B", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "relative", maxWidth: 620 }}>
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: 1.4, opacity: 0.7 }}>FRIDAY DROPS</span>
          <h2 style={{ fontFamily: "var(--font-display), system-ui", fontSize: "clamp(36px, 4.4vw, 56px)", fontWeight: 700, letterSpacing: -1.6, lineHeight: 1, margin: "16px 0 14px" }}>
            New episode. Every Friday. In your inbox.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.5, opacity: 0.78, margin: 0, maxWidth: 520 }}>
            Plus a short note on what surprised me, what we cut, and one thing the guest said off-mic.
          </p>
          {!submitted ? (
            <form
              onSubmit={(e) => { e.preventDefault(); if (valid) setSubmitted(true); }}
              style={{ display: "flex", gap: 8, marginTop: 36, padding: 6, background: "#0B0B0B", borderRadius: 999, maxWidth: 480 }}
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="founder@yourcompany.in"
                style={{
                  flex: 1, background: "transparent", border: "none", outline: "none",
                  color: "#F4F1EA", padding: "12px 18px", fontSize: 15, fontFamily: "inherit",
                }}
              />
              <button
                type="submit"
                disabled={!valid}
                style={{
                  background: valid ? ACCENT : "rgba(245,197,24,0.4)",
                  color: "#0B0B0B", border: "none", borderRadius: 999,
                  padding: "12px 22px", fontWeight: 600, fontSize: 14,
                  cursor: valid ? "pointer" : "not-allowed", fontFamily: "inherit",
                }}
              >
                Subscribe →
              </button>
            </form>
          ) : (
            <div style={{ marginTop: 36, padding: "18px 24px", background: "#0B0B0B", color: ACCENT, borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 12, fontWeight: 500 }}>
              <span style={{ width: 20, height: 20, borderRadius: 99, background: ACCENT, color: "#0B0B0B", display: "grid", placeItems: "center", fontSize: 12 }}>✓</span>
              You&apos;re in. First episode lands Friday at 7am IST.
            </div>
          )}
          <p style={{ fontSize: 12, marginTop: 18, opacity: 0.6 }}>No spam. Unsubscribe in one click.</p>
        </div>
      </div>
    </section>
  );
}
