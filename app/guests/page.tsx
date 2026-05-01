import Link from "next/link";
import NavBar from "@/components/NavBar";

const ACCENT = "#F5C518";
const BG = "#0B0B0B";
const SURFACE = "#141414";
const TEXT = "#F4F1EA";
const MUTED = "#8A867E";

const GUESTS_PREVIEW = [
  { name: "Paroma Chatterjee", role: "CEO, Revolut India", initials: "PC", ep: "S2 · EP.09" },
  { name: "Amish Tripathi & Mukul Deora", role: "Founders, The Age of Bhaarat", initials: "AT", ep: "S2 · EP.08" },
  { name: "Belson Coutinho", role: "Co-Founder & COO, Akasa Airlines", initials: "BC", ep: "S2 · UPCOMING" },
  { name: "Howard Dawber", role: "Deputy Mayor, London", initials: "HD", ep: "S2 · EP." },
  { name: "Kamal Sharma", role: "CIO, Carrier", initials: "KS", ep: "S2 · EP." },
  { name: "Ewout de Wit", role: "Consul General, Netherlands", initials: "EW", ep: "S2 · EP." },
];

export const metadata = {
  title: "Guests",
  description: "Every guest who has sat across from Abhay Tandon on The Innovators and Disruptors Podcast.",
};

export default function GuestsPage() {
  return (
    <div style={{ background: BG, color: TEXT, minHeight: "100vh" }}>
      <NavBar />

      {/* Hero */}
      <section style={{ padding: "80px 32px 60px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <Link href="/" style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: MUTED, textDecoration: "none", letterSpacing: 0.8 }}>
            HOME
          </Link>
          <span style={{ color: MUTED, fontSize: 12 }}>/</span>
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: ACCENT, letterSpacing: 0.8 }}>GUESTS</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", marginBottom: 80 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono), monospace", fontSize: 11, color: ACCENT, letterSpacing: 1.4, marginBottom: 20 }}>
              <span style={{ width: 14, height: 2, background: ACCENT }} />
              FEATURED GUESTS
            </div>
            <h1 style={{ fontFamily: "var(--font-display), system-ui", fontSize: "clamp(42px, 5vw, 72px)", fontWeight: 800, letterSpacing: -2.5, lineHeight: 0.92, margin: "0 0 24px" }}>
              Founders.<br />
              <span style={{ fontStyle: "italic", color: ACCENT }}>Operators.</span><br />
              Iconoclasts.
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: MUTED, maxWidth: 460, margin: "0 0 36px" }}>
              Every guest who has sat across from Abhay Tandon — leaders building India&apos;s future, one conversation at a time.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 24px", borderRadius: 12, background: SURFACE, border: `1px solid ${ACCENT}33` }}>
              <span style={{ width: 8, height: 8, borderRadius: 99, background: ACCENT, animation: "pulse 1.6s ease-in-out infinite" }} />
              <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: ACCENT, letterSpacing: 1.2 }}>FULL DIRECTORY COMING SOON</span>
            </div>
          </div>

          {/* WIP notice card */}
          <div style={{ padding: 48, borderRadius: 24, border: `1px solid ${ACCENT}22`, background: "linear-gradient(135deg, #141008 0%, #0B0B0B 100%)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: -20, bottom: -40, fontFamily: "Georgia, serif", fontSize: 240, lineHeight: 1, color: `${ACCENT}06`, pointerEvents: "none", userSelect: "none" }}>?</div>
            <div style={{ position: "relative" }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: ACCENT, display: "grid", placeItems: "center", marginBottom: 28 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B0B0B" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <h2 style={{ fontFamily: "var(--font-display), system-ui", fontSize: 26, fontWeight: 700, letterSpacing: -0.8, margin: "0 0 12px" }}>
                We&apos;re building this page.
              </h2>
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.6, margin: "0 0 28px" }}>
                A full searchable directory of every guest — their episode, role, and episode link. Check back soon.
              </p>
              <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 999, border: `1px solid ${ACCENT}44`, color: ACCENT, textDecoration: "none", fontFamily: "var(--font-mono), monospace", fontSize: 12, letterSpacing: 0.8 }}>
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Guest preview grid */}
      <section style={{ padding: "0 32px 120px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
            <div style={{ width: 32, height: 3, background: ACCENT, borderRadius: 3 }} />
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: MUTED, letterSpacing: 1.6 }}>PREVIEW — MORE COMING</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {GUESTS_PREVIEW.map((g) => (
              <div key={g.name} style={{ padding: "28px 28px 28px", borderRadius: 18, background: SURFACE, border: "1px solid rgba(244,241,234,0.06)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, borderBottomLeftRadius: 80, background: `${ACCENT}08` }} />
                <div style={{ width: 64, height: 64, borderRadius: 99, background: BG, border: `1px solid ${ACCENT}33`, display: "grid", placeItems: "center", fontFamily: "var(--font-display), system-ui", fontWeight: 700, fontSize: 20, letterSpacing: -0.5, color: ACCENT, marginBottom: 20 }}>
                  {g.initials}
                </div>
                <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, color: ACCENT, letterSpacing: 1.2, marginBottom: 8 }}>{g.ep}</div>
                <h3 style={{ fontFamily: "var(--font-display), system-ui", fontSize: 18, fontWeight: 600, letterSpacing: -0.4, margin: "0 0 6px" }}>{g.name}</h3>
                <p style={{ color: MUTED, fontSize: 13, margin: 0 }}>{g.role}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, padding: "28px 36px", borderRadius: 16, border: `1px dashed ${ACCENT}33`, display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: MUTED, letterSpacing: 0.8 }}>22+ GUEST PROFILES · FULL DIRECTORY IN PROGRESS</span>
          </div>
        </div>
      </section>
    </div>
  );
}
