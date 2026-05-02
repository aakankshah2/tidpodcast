import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import { getChannelStats, fmt } from "@/lib/youtube";

const ACCENT = "#F5C518";
const BG = "#0B0B0B";
const SURFACE = "#141414";
const TEXT = "#F4F1EA";
const MUTED = "#8A867E";

export const metadata = {
  title: "TID Collective",
  description: "An ecosystem at the intersection of storytelling, strategy, and startups.",
};

const PILLARS = [
  {
    num: "01",
    title: "TID Podcast",
    tagline: "Innovators, leaders, and creators — building in India.",
    body: "Long-form conversations with India's top founders, operators, and iconoclasts. Every episode is a masterclass in building from scratch — from Revolut to Akasa Airlines to the Age of Bhaarat.",
    meta: "__PODCAST_META__",
    href: "/",
    cta: "Listen now",
    img: "/tid-podcast.jpg",
    color: ACCENT,
  },
  {
    num: "02",
    title: "TID Consulting",
    tagline: "Partnering with corporates and startups to unlock growth.",
    body: "Deep-tech and innovation advisory for enterprises navigating the next frontier — from emerging technologies to market strategy. 50+ high-impact engagements across retail, mobility, and FMCG.",
    meta: "50+ deep-tech engagements",
    href: "https://tidcollective.in",
    cta: "Learn more ↗",
    img: "/tid-consulting.jpg",
    color: "#A8E6CF",
  },
  {
    num: "03",
    title: "TID Ventures",
    tagline: "Investing in bold founders and emerging-tech startups.",
    body: "Angel investing at the early edge — founders who are building things that feel impossible today. A portfolio of 30+ companies across India's most ambitious technology bets.",
    meta: "30+ portfolio companies",
    href: "https://tidcollective.in",
    cta: "Learn more ↗",
    img: "/tid-ventures.jpg",
    color: "#C4B0FF",
  },
];

const VALUES = [
  { title: "Storytelling", body: "Every company has a breakthrough story. We help you tell it — and find the people worth telling it to." },
  { title: "Strategy", body: "Innovation isn't accidental. We bring frameworks from 50+ deep-tech projects to every engagement." },
  { title: "Startups", body: "We've been in the room with 30+ founders. We back bold people with capital, connections, and conviction." },
];

export default async function CollectivePage() {
  const channelStats = await getChannelStats();
  const subCount = channelStats ? `${fmt(channelStats.subscriberCount)}+` : "122K+";
  const videoCount = channelStats ? channelStats.videoCount : null;

  return (
    <div style={{ background: BG, color: TEXT, minHeight: "100vh" }}>
      <NavBar />

      {/* Breadcrumb */}
      <div style={{ padding: "28px 32px 0", maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", gap: 10 }}>
        <Link href="/" style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: MUTED, textDecoration: "none", letterSpacing: 0.8 }}>HOME</Link>
        <span style={{ color: MUTED, fontSize: 12 }}>/</span>
        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: ACCENT, letterSpacing: 0.8 }}>COLLECTIVE</span>
      </div>

      {/* Hero */}
      <section style={{ padding: "60px 32px 80px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono), monospace", fontSize: 11, color: ACCENT, letterSpacing: 1.4, marginBottom: 24 }}>
            <span style={{ width: 14, height: 2, background: ACCENT }} />
            TID COLLECTIVE
            <span style={{ width: 14, height: 2, background: ACCENT }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 72, alignItems: "center" }}>
            <div>
              <h1 style={{ fontFamily: "var(--font-display), system-ui", fontSize: "clamp(44px, 5.5vw, 80px)", fontWeight: 800, letterSpacing: -3, lineHeight: 0.9, margin: "0 0 28px" }}>
                Storytelling.<br />
                <span style={{ color: ACCENT, fontStyle: "italic" }}>Strategy.</span><br />
                Startups.
              </h1>
              <p style={{ fontSize: 18, lineHeight: 1.65, color: MUTED, maxWidth: 560, margin: "0 0 40px" }}>
                An ecosystem at the intersection of three deeply connected verticals — where India&apos;s founders, builders, and leaders go to grow, connect, and build.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <a
                  href="https://tidcollective.in"
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 24px", borderRadius: 999, background: ACCENT, color: BG, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
                  Visit TID Collective ↗
                </a>
                <Link
                  href="/#about"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 24px", borderRadius: 999, border: `1px solid ${ACCENT}44`, color: ACCENT, textDecoration: "none", fontSize: 14 }}>
                  Meet Abhay →
                </Link>
              </div>
            </div>

            {/* Stats column */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { k: subCount, v: "YouTube\nsubscribers", color: ACCENT },
                { k: "50+", v: "Deep-tech\nengagements", color: "#A8E6CF" },
                { k: "30+", v: "Portfolio\ncompanies", color: "#C4B0FF" },
                { k: "9+", v: "Years of\ninnovation", color: ACCENT },
              ].map((s) => (
                <div key={s.v} style={{ padding: "24px 22px", borderRadius: 16, border: `1px solid ${s.color}22`, background: SURFACE }}>
                  <div style={{ fontFamily: "var(--font-display), system-ui", fontSize: 38, fontWeight: 800, letterSpacing: -1.5, color: s.color, lineHeight: 1, marginBottom: 10 }}>{s.k}</div>
                  <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: MUTED, letterSpacing: 0.6, lineHeight: 1.5, whiteSpace: "pre-line" }}>{s.v.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section style={{ padding: "0 32px 100px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40 }}>
            <div style={{ width: 32, height: 3, background: ACCENT, borderRadius: 3 }} />
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: ACCENT, letterSpacing: 1.6, fontWeight: 600 }}>THREE VERTICALS</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {PILLARS.map((p, i) => (
              <div key={p.title} style={{ display: "grid", gridTemplateColumns: i % 2 === 0 ? "1fr 0.85fr" : "0.85fr 1fr", gap: 0, borderRadius: 24, overflow: "hidden", border: `1px solid rgba(244,241,234,0.07)`, background: SURFACE }}>
                {/* Image panel */}
                <div style={{ order: i % 2 === 0 ? 0 : 1, position: "relative", minHeight: 320 }}>
                  <Image src={p.img} alt={p.title} fill sizes="50vw" style={{ objectFit: "cover", filter: "brightness(0.8)" }} />
                  <div style={{ position: "absolute", inset: 0, background: i % 2 === 0 ? "linear-gradient(90deg, rgba(20,20,20,0) 60%, rgba(20,20,20,0.95) 100%)" : "linear-gradient(270deg, rgba(20,20,20,0) 60%, rgba(20,20,20,0.95) 100%)" }} />
                </div>
                {/* Content panel */}
                <div style={{ order: i % 2 === 0 ? 1 : 0, padding: "52px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: p.color, letterSpacing: 1.4, marginBottom: 20 }}>{p.num} / 03</span>
                  <h2 style={{ fontFamily: "var(--font-display), system-ui", fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.05, margin: "0 0 8px" }}>{p.title}</h2>
                  <p style={{ fontSize: 14, fontStyle: "italic", color: p.color, margin: "0 0 18px", fontFamily: "var(--font-display), system-ui", fontWeight: 500 }}>{p.tagline}</p>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: MUTED, margin: "0 0 28px" }}>{p.body}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 20, borderTop: `1px solid rgba(244,241,234,0.08)` }}>
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: MUTED, letterSpacing: 0.6 }}>
                      {p.meta === "__PODCAST_META__"
                        ? `${subCount} subscribers${videoCount ? ` · ${videoCount} episodes` : " · Weekly drops"}`
                        : p.meta}
                    </span>
                    <a href={p.href} target={p.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 999, background: `${p.color}18`, border: `1px solid ${p.color}44`, color: p.color, textDecoration: "none", fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: 0.8 }}>
                      {p.cta}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values / Philosophy */}
      <section style={{ padding: "100px 32px", background: "#050505" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono), monospace", fontSize: 11, color: ACCENT, letterSpacing: 1.4, marginBottom: 18 }}>
              <span style={{ width: 14, height: 2, background: ACCENT }} />
              HOW WE THINK
              <span style={{ width: 14, height: 2, background: ACCENT }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-display), system-ui", fontSize: "clamp(32px, 4vw, 54px)", fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, margin: 0 }}>
              One founder. Three ways to build.{" "}
              <span style={{ fontStyle: "italic", color: ACCENT }}>One mission.</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
            {VALUES.map((v, i) => (
              <div key={v.title} style={{ padding: "44px 36px", background: SURFACE, borderRadius: i === 0 ? "16px 0 0 16px" : i === 2 ? "0 16px 16px 0" : 0, borderLeft: i > 0 ? `1px solid rgba(244,241,234,0.06)` : "none" }}>
                <div style={{ fontFamily: "var(--font-display), system-ui", fontSize: 40, fontWeight: 800, letterSpacing: -1.5, color: ACCENT, lineHeight: 1, marginBottom: 20 }}>{v.title}</div>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: MUTED, margin: 0 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA footer */}
      <section style={{ padding: "100px 32px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display), system-ui", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, letterSpacing: -1.8, lineHeight: 1.05, margin: "0 0 20px" }}>
            Ready to build with India&apos;s boldest?
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: MUTED, margin: "0 0 40px" }}>
            Whether you&apos;re a founder, corporate, or investor — there&apos;s a place for you in the TID ecosystem.
          </p>
          <a
            href="https://www.linkedin.com/in/abhaytandon/"
            target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "16px 32px", borderRadius: 999, background: ACCENT, color: BG, textDecoration: "none", fontWeight: 700, fontSize: 15 }}>
            Connect with Abhay ↗
          </a>
        </div>
      </section>
    </div>
  );
}
