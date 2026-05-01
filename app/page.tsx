import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import NewsletterSection from "@/components/NewsletterSection";
import { getChannelStats, getTopVideos, getLatestVideos, fmt } from "@/lib/youtube";
import { getAllEpisodes } from "@/lib/episodes";

const ACCENT = "#F5C518";
const BG = "#0B0B0B";
const SURFACE = "#141414";
const TEXT = "#F4F1EA";
const MUTED = "#8A867E";

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abhaytandon/", path: "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8h4.56v14H.22V8zm7.4 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 7v8.44h-4.56v-7.48c0-1.78-.03-4.07-2.48-4.07-2.48 0-2.86 1.94-2.86 3.94V22H7.62V8z" },
  { label: "YouTube", href: "https://www.youtube.com/@TheInnovatorsandDisruptorsPodc", path: "M23.5 6.2c-.27-1.02-1.07-1.83-2.09-2.1C19.55 3.6 12 3.6 12 3.6s-7.55 0-9.41.5C1.57 4.37.77 5.18.5 6.2 0 8.07 0 12 0 12s0 3.93.5 5.8c.27 1.02 1.07 1.83 2.09 2.1 1.86.5 9.41.5 9.41.5s7.55 0 9.41-.5c1.02-.27 1.82-1.08 2.09-2.1.5-1.87.5-5.8.5-5.8s0-3.93-.5-5.8zM9.6 15.6V8.4l6.24 3.6-6.24 3.6z" },
  { label: "Instagram", href: "https://www.instagram.com/theinnovatorsanddisruptors/", path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.67 1.07-1.34 1.38-2.13.3-.76.5-1.64.56-2.91C23.99 15.67 24 15.26 24 12s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.38-2.13C21.32 1.35 20.65.94 19.86.63 19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 105.84 12 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 1116 12a4 4 0 01-4 4zm6.41-11.85a1.44 1.44 0 11-1.44-1.44 1.44 1.44 0 011.44 1.44z" },
];

const GUESTS = [
  { name: "Paroma Chatterjee", role: "CEO, Revolut India", initials: "PC", slug: "paroma-chatterjee-revolut-india" },
  { name: "Amish Tripathi & Mukul Deora", role: "Founders, The Age of Bhaarat", initials: "AT", slug: "amish-tripathi-mukul-deora-indian-mythology-gaming" },
  { name: "Belson Coutinho", role: "Co-Founder & COO, Akasa Airlines", initials: "BC", slug: null },
  { name: "Howard Dawber", role: "Deputy Mayor, London", initials: "HD", slug: null },
  { name: "Kamal Sharma", role: "CIO, Carrier", initials: "KS", slug: null },
  { name: "Ewout de Wit", role: "Consul General, Netherlands", initials: "EW", slug: null },
];

const STELLAR_LIVE = [
  { ep: "S2 EP9", title: "Building for a Billion — India's Future with Revolut", guest: "Paroma Chatterjee", role: "CEO, Revolut India", dur: "1:10:48", initials: "PC", slug: "paroma-chatterjee-revolut-india" },
  { ep: "S2 EP8", title: "Indian Mythology x Gaming — The Age of Bhaarat", guest: "Amish Tripathi & Mukul Deora", role: "Founders, The Age of Bhaarat", dur: "1:21:49", initials: "AT", slug: "amish-tripathi-mukul-deora-indian-mythology-gaming" },
];
const STELLAR_SOON = [
  { title: "Reinventing aviation, the Akasa way", guest: "Belson Coutinho", role: "Co-Founder & COO, Akasa Airlines", drop: "DROPPING SOON", initials: "BC" },
];

const LIVE_SERIES = [
  {
    title: "Season 2",
    description: "Long-form conversations with India's top innovators, founders, and leaders.",
    href: "https://www.youtube.com/watch?v=RXVysfTfLTU&list=PLzz8OqkiSLALxl70gl4KImCriufD9yIaB",
    videoId: "RXVysfTfLTU",
    tag: "ONGOING",
  },
  {
    title: "GCC Mini Series",
    description: "Deep dives into India's Global Capability Centre ecosystem and what it means for the future.",
    href: "https://www.youtube.com/watch?v=mRzFo2O2hp4&list=PLzz8OqkiSLAJk7FAG4Ec30FNpUbLxCti7",
    videoId: "mRzFo2O2hp4",
    tag: "MINI SERIES",
  },
  {
    title: "Founders Corner",
    description: "Unfiltered stories from India's most bold and ambitious founders.",
    href: "https://www.youtube.com/watch?v=jstfeUM53WA&list=PLzz8OqkiSLAJVMXwwA-xc-rYfz14DtW1H",
    videoId: "jstfeUM53WA",
    tag: "MINI SERIES",
  },
];

const TIMELINE = [
  { year: "Early career", title: "Startups & Consulting", body: "Cut his teeth across early-stage startups, venture capital and management consulting." },
  { year: "2015–2019", title: "Innovation, scaled", body: "Led innovation programs across Retail, FMCG and Mobility — driving 50+ deep-tech projects in NanoTech, Drones, Haptics, AR/VR/XR and Quantum Computing." },
  { year: "2021", title: "Top 10 Innovation Leaders", body: "Recognized as one of India's Top 10 Corporate Innovation Leaders. Becomes Charter Member at TiE and Forbes Technology Council member." },
  { year: "2023", title: "Live Commerce for TVS", body: "Implements innovative live-commerce for TVS Motor Company. Begins angel investing across emerging-tech startups." },
  { year: "2024", title: "Gold at India Digital Summit", body: "Wins IAMAI Gold Award for Innovation in e-Commerce. Launches the Innovators and Disruptors Podcast." },
  { year: "2025", title: "TEDx & G20 Stage", body: "Delivers TEDx talk 'From Observation to Breakthroughs'. Represents India at the G20 Summit on India's innovation potential." },
  { year: "Today", title: "Founder, TID Collective", body: "Runs TID Podcast (122K+), TID Consulting and TID Ventures (30+ portfolio companies). Upcoming author on Corporate Innovation." },
];

export default async function HomePage() {
  const [channelStats, topVideos, latestVideos] = await Promise.all([
    getChannelStats(),
    getTopVideos(3),
    getLatestVideos(3),
  ]);
  const episodes = getAllEpisodes();
  const episodeCount = channelStats?.videoCount ?? episodes.length;

  return (
    <div style={{ background: BG, color: TEXT, minHeight: "100vh" }}>
      <NavBar />

      {/* ── Hero ── */}
      <section id="top" style={{ padding: "32px 32px 48px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{
            position: "relative", borderRadius: 20, overflow: "hidden",
            background: "radial-gradient(120% 100% at 75% 50%, #2A1F0E 0%, #120D06 35%, #050505 70%)",
            border: `1px solid ${ACCENT}22`,
            minHeight: 460,
            display: "grid", gridTemplateColumns: "1.05fr 1fr",
          }}>
            {/* LEFT: copy */}
            <div style={{ position: "relative", padding: "56px 56px 56px 64px", display: "flex", flexDirection: "column", justifyContent: "center", zIndex: 2 }}>
              {/* Yellow rule + tagline */}
              <div style={{ display: "flex", gap: 18, alignItems: "stretch", marginBottom: 28 }}>
                <div style={{ width: 4, background: ACCENT, borderRadius: 2 }} />
                <div>
                  <div style={{ fontFamily: "var(--font-display), system-ui", fontWeight: 700, fontSize: 22, letterSpacing: 0.5, color: ACCENT, lineHeight: 1.1 }}>
                    IDEAS THAT BUILD INDIA
                  </div>
                  <div style={{ fontFamily: "var(--font-display), system-ui", fontWeight: 500, fontSize: 16, letterSpacing: 1, color: "rgba(244,241,234,0.85)", lineHeight: 1.2, marginTop: 14 }}>
                    IMPACT THAT SHAPES THE WORLD
                  </div>
                </div>
              </div>

              {/* Wordmark */}
              <div style={{ fontFamily: "var(--font-display), system-ui", fontWeight: 800, fontSize: "clamp(64px, 7.4vw, 112px)", lineHeight: 0.86, letterSpacing: -3, color: TEXT, textTransform: "uppercase", marginTop: 4 }}>
                Innovative<br />Stories
              </div>

              {/* Hosted by + socials */}
              <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 36 }}>
                <div>
                  <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: 1.4, color: MUTED }}>HOSTED BY</div>
                  <div style={{ fontFamily: "var(--font-display), system-ui", fontWeight: 600, fontSize: 22, marginTop: 4, letterSpacing: -0.4 }}>Abhay Tandon</div>
                </div>
                <div style={{ width: 1, height: 36, background: "rgba(244,241,234,0.18)" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {SOCIALS.map((s) => (
                    <a key={s.label} href={s.href} aria-label={`Abhay on ${s.label}`} target="_blank" rel="noopener noreferrer"
                      style={{ width: 40, height: 40, borderRadius: 10, display: "grid", placeItems: "center", background: "rgba(244,241,234,0.04)", border: `1px solid ${ACCENT}33`, color: TEXT, textDecoration: "none" }}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d={s.path} /></svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: photo + badge */}
            <div style={{ position: "relative", overflow: "hidden" }}>
              <Image
                src="/abhay.jpg"
                alt="Abhay Tandon, host of The Innovators and Disruptors Podcast"
                fill
                sizes="50vw"
                style={{ objectFit: "cover", objectPosition: "center 30%" }}
                priority
              />
              {/* Left fade */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(5,5,5,1) 0%, rgba(5,5,5,0.7) 18%, rgba(5,5,5,0.0) 45%, rgba(5,5,5,0.0) 70%, rgba(5,5,5,0.55) 100%)" }} />
              {/* Bottom fade */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.55) 100%)" }} />

              {/* New Episode card */}
              <div style={{ position: "absolute", top: 36, right: 36, zIndex: 3, display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
                <div style={{ background: ACCENT, color: BG, padding: "10px 18px", borderRadius: 8, fontFamily: "var(--font-display), system-ui", fontWeight: 700, fontSize: 18, letterSpacing: -0.3, boxShadow: `0 12px 32px -12px ${ACCENT}80` }}>
                  New Episode
                </div>
                <div style={{ background: "rgba(11,11,11,0.7)", color: TEXT, border: `1px solid ${ACCENT}55`, backdropFilter: "blur(10px)", padding: "8px 16px", borderRadius: 8, fontFamily: "var(--font-display), system-ui", fontWeight: 500, fontSize: 14, letterSpacing: 0.2 }}>
                  Every week
                </div>
              </div>

              {/* Live pulse pill */}
              <div style={{ position: "absolute", bottom: 28, right: 32, zIndex: 3, display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 16px", borderRadius: 14, background: "rgba(11,11,11,0.78)", border: `1px solid ${ACCENT}44`, backdropFilter: "blur(10px)", maxWidth: 360 }}>
                <span style={{ width: 8, height: 8, borderRadius: 99, background: ACCENT, boxShadow: `0 0 12px ${ACCENT}`, animation: "pulse 1.6s ease-in-out infinite", flexShrink: 0 }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 2, lineHeight: 1.1, minWidth: 0 }}>
                  <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, letterSpacing: 1.4, color: ACCENT, fontWeight: 600 }}>S2 · EP. 09 — OUT NOW</span>
                  <span style={{ fontFamily: "var(--font-display), system-ui", fontWeight: 600, fontSize: 13, color: TEXT, letterSpacing: -0.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Building for a Billion — India&apos;s Future with Revolut
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats + Currently Live + Stellar Episodes ── */}
      <section id="episodes" style={{ padding: "40px 32px 100px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* KPI strip */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0,
            padding: "32px 36px", borderRadius: 18,
            background: "linear-gradient(180deg, #161310 0%, #0E0E0D 100%)",
            border: `1px solid ${ACCENT}1F`, marginBottom: 56,
          }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
              <div style={{ fontFamily: "var(--font-display), system-ui", fontSize: 56, fontWeight: 700, letterSpacing: -2.5, color: ACCENT, lineHeight: 1 }}>
                {channelStats && !channelStats.hiddenSubscriberCount ? `${fmt(channelStats.subscriberCount)}+` : "132K+"}
              </div>
              <div style={{ fontSize: 13, color: MUTED, fontFamily: "var(--font-mono), monospace", letterSpacing: 0.8 }}>LISTENERS</div>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 18, paddingLeft: 36, borderLeft: `1px solid ${ACCENT}1F` }}>
              <div style={{ fontFamily: "var(--font-display), system-ui", fontSize: 56, fontWeight: 700, letterSpacing: -2.5, color: ACCENT, lineHeight: 1 }}>4.9★</div>
              <div style={{ fontSize: 13, color: MUTED, fontFamily: "var(--font-mono), monospace", letterSpacing: 0.8 }}>APPLE PODCASTS</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: 36, borderLeft: `1px solid ${ACCENT}1F`, gap: 8 }}>
              <div style={{ fontSize: 11, color: MUTED, fontFamily: "var(--font-mono), monospace", letterSpacing: 1.2, marginBottom: 2 }}>3 ACTIVE SERIES</div>
              {LIVE_SERIES.map((s) => (
                <a key={s.title} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
                  <span style={{ width: 6, height: 6, borderRadius: 99, background: ACCENT, flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-display), system-ui", fontWeight: 600, fontSize: 15, letterSpacing: -0.3, color: TEXT }}>{s.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Currently Live series */}
          <div style={{ marginBottom: 72 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 32, height: 3, background: ACCENT, borderRadius: 3 }} />
                <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: ACCENT, letterSpacing: 1.6, fontWeight: 600 }}>CURRENTLY LIVE</span>
              </div>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: 99, background: ACCENT, animation: "pulse 1.6s ease-in-out infinite" }} />
                <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: MUTED, letterSpacing: 0.8 }}>3 ACTIVE SERIES</span>
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
              {LIVE_SERIES.map((s) => (
                <a key={s.title} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", gap: 0, borderRadius: 16, overflow: "hidden", border: `1px solid ${ACCENT}22`, background: "#0F0F0E" }}>
                  <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                    <Image
                      src={`https://img.youtube.com/vi/${s.videoId}/hqdefault.jpg`}
                      alt={s.title}
                      fill
                      sizes="33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%)" }} />
                    <div style={{ position: "absolute", top: 12, left: 12, padding: "4px 10px", borderRadius: 6, background: ACCENT, color: BG, fontFamily: "var(--font-mono), monospace", fontSize: 10, letterSpacing: 1, fontWeight: 700 }}>
                      {s.tag}
                    </div>
                  </div>
                  <div style={{ padding: "18px 20px 20px" }}>
                    <h3 style={{ fontFamily: "var(--font-display), system-ui", fontSize: 18, fontWeight: 700, letterSpacing: -0.4, margin: "0 0 8px", lineHeight: 1.2 }}>{s.title}</h3>
                    <p style={{ fontSize: 13, color: MUTED, margin: 0, lineHeight: 1.5 }}>{s.description}</p>
                    <div style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 6, color: ACCENT, fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: 0.8 }}>
                      WATCH PLAYLIST ↗
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Latest episodes header + CTA */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 32, height: 3, background: ACCENT, borderRadius: 3 }} />
              <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: ACCENT, letterSpacing: 1.6, fontWeight: 600 }}>LATEST EPISODES</span>
            </div>
            <a
              href="https://www.youtube.com/@TheInnovatorsandDisruptorsPodc"
              target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 18px", borderRadius: 999, border: `1px solid ${ACCENT}44`, color: ACCENT, textDecoration: "none", fontFamily: "var(--font-mono), monospace", fontSize: 12, letterSpacing: 0.8 }}>
              View full channel ↗
            </a>
          </div>

          {/* Cards — auto-populated from YouTube latest videos */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            {(latestVideos ?? []).map((v, i) => (
              <a
                key={v.id}
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", gap: 14 }}
              >
                <div style={{ position: "relative", aspectRatio: "16/9", borderRadius: 12, overflow: "hidden", background: "#1a1208", border: `1px solid ${ACCENT}22` }}>
                  <Image
                    src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                    alt={v.title}
                    fill
                    sizes="33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", top: 10, left: 10, padding: "4px 10px", borderRadius: 6, background: "rgba(11,11,11,0.85)", border: `1px solid ${ACCENT}55`, color: ACCENT, fontFamily: "var(--font-mono), monospace", fontSize: 10, letterSpacing: 1, fontWeight: 600 }}>
                    {i === 0 ? "LATEST" : `#${i + 1}`}
                  </div>
                  {v.viewCount > 0 && (
                    <div style={{ position: "absolute", bottom: 10, right: 10, padding: "3px 8px", borderRadius: 4, background: "rgba(11,11,11,0.85)", color: TEXT, fontFamily: "var(--font-mono), monospace", fontSize: 11 }}>
                      {fmt(v.viewCount)} views
                    </div>
                  )}
                </div>
                <h3 style={{ fontFamily: "var(--font-display), system-ui", fontSize: 15, fontWeight: 600, letterSpacing: -0.3, margin: 0, lineHeight: 1.35 }}>{v.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guests ── */}
      <section id="guests" style={{ padding: "100px 32px", background: SURFACE }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32, marginBottom: 56, flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono), monospace", fontSize: 11, color: ACCENT, letterSpacing: 1.4, marginBottom: 16 }}>
                <span style={{ width: 14, height: 2, background: ACCENT }} />
                FEATURED GUESTS
              </div>
              <h2 style={{ fontFamily: "var(--font-display), system-ui", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, letterSpacing: -2, lineHeight: 1, margin: 0, maxWidth: 720 }}>
                Founders, operators, investors.{" "}
                <span style={{ fontStyle: "italic", color: ACCENT, fontWeight: 600 }}>Always unfiltered.</span>
              </h2>
            </div>
            <a href="/guests" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: ACCENT, color: BG, textDecoration: "none", padding: "14px 22px", borderRadius: 999, fontWeight: 600, fontSize: 14, whiteSpace: "nowrap" }}>
              See full guest list <span>→</span>
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {GUESTS.map((g) => (
              <div key={g.name} style={{ padding: 28, borderRadius: 18, background: "#0F0F0E", border: "1px solid rgba(244,241,234,0.06)", position: "relative", overflow: "hidden" }}>
                <div style={{ width: 72, height: 72, borderRadius: 99, background: BG, border: "1px solid rgba(244,241,234,0.14)", display: "grid", placeItems: "center", fontFamily: "var(--font-display), system-ui", fontWeight: 700, fontSize: 22, letterSpacing: -0.5, color: ACCENT, marginBottom: 24 }}>{g.initials}</div>
                <h4 style={{ fontFamily: "var(--font-display), system-ui", fontSize: 22, fontWeight: 600, letterSpacing: -0.5, margin: 0 }}>{g.name}</h4>
                <p style={{ color: MUTED, fontSize: 14, margin: "6px 0 0" }}>{g.role}</p>
                {g.slug && (
                  <Link href={`/episodes/${g.slug}`} style={{ position: "absolute", top: 24, right: 24, color: ACCENT, fontSize: 18, textDecoration: "none" }}>↗</Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TID Collective ── */}
      <section id="collective" style={{ padding: "120px 32px", background: BG }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono), monospace", fontSize: 11, color: ACCENT, letterSpacing: 1.4, marginBottom: 18 }}>
              <span style={{ width: 14, height: 2, background: ACCENT }} />
              WHAT IS TID COLLECTIVE
              <span style={{ width: 14, height: 2, background: ACCENT }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-display), system-ui", fontSize: "clamp(36px, 4.8vw, 64px)", fontWeight: 700, letterSpacing: -2, lineHeight: 1, margin: 0 }}>
              An ecosystem at the intersection of{" "}
              <span style={{ fontStyle: "italic", color: ACCENT, fontWeight: 600 }}>storytelling, strategy & startups</span>.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: MUTED, marginTop: 22, maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
              Where India&apos;s founders, builders and leaders go for inspiration — across three deeply connected verticals.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            {[
              { num: "01", title: "TID Podcast", tagline: "Innovators, leaders, and creators — Building in India.", meta: "122K+ subscribers · Weekly drops", img: "/tid-podcast.jpg" },
              { num: "02", title: "TID Consulting", tagline: "Partnering with corporates and startups to unlock growth.", meta: "50+ deep-tech engagements", img: "/tid-consulting.jpg" },
              { num: "03", title: "TID Ventures", tagline: "Investing in bold founders and emerging-tech startups.", meta: "30+ portfolio companies", img: "/tid-ventures.jpg" },
            ].map((p) => (
              <div key={p.title} style={{ padding: 32, borderRadius: 18, background: "#0F0F0E", border: "1px solid rgba(244,241,234,0.06)", display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: ACCENT, letterSpacing: 1.2 }}>{p.num} / 03</span>
                </div>
                <div style={{ height: 200, borderRadius: 12, overflow: "hidden", border: `1px solid ${ACCENT}22`, position: "relative" }}>
                  <Image src={p.img} alt={p.title} fill sizes="33vw" style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display), system-ui", fontSize: 26, fontWeight: 700, letterSpacing: -0.8, margin: 0 }}>{p.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.5, color: TEXT, opacity: 0.85, margin: "10px 0 0" }}>{p.tagline}</p>
                </div>
                <div style={{ marginTop: "auto", paddingTop: 18, borderTop: `1px solid ${ACCENT}1F`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: MUTED, letterSpacing: 0.6 }}>{p.meta}</span>
                  <span style={{ width: 32, height: 32, borderRadius: 99, display: "grid", placeItems: "center", border: `1px solid ${ACCENT}33`, color: ACCENT, fontSize: 14 }}>↗</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" style={{ padding: "120px 32px", background: SURFACE, position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 64, alignItems: "center" }}>
            {/* Photo */}
            <div style={{ position: "relative" }}>
              <div style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${ACCENT}22`, aspectRatio: "4/5", background: BG, position: "relative" }}>
                <Image src="/abhay.jpg" alt="Abhay Tandon" fill sizes="35vw" style={{ objectFit: "cover", objectPosition: "center 25%" }} />
              </div>
              <div style={{ position: "absolute", bottom: -24, right: -24, background: ACCENT, color: BG, padding: "16px 22px", borderRadius: 14, fontFamily: "var(--font-display), system-ui", fontWeight: 700, fontSize: 14, letterSpacing: 0.4, boxShadow: `0 20px 50px -20px ${ACCENT}80` }}>
                <div style={{ fontSize: 11, opacity: 0.7, letterSpacing: 1, marginBottom: 4 }}>HOST · FOUNDER</div>
                ABHAY TANDON
              </div>
            </div>

            {/* Copy */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono), monospace", fontSize: 11, color: ACCENT, letterSpacing: 1.4, marginBottom: 18 }}>
                <span style={{ width: 14, height: 2, background: ACCENT }} />
                MEET THE HOST
              </div>
              <h2 style={{ fontFamily: "var(--font-display), system-ui", fontSize: "clamp(36px, 4.6vw, 56px)", fontWeight: 700, letterSpacing: -2, lineHeight: 1, margin: 0 }}>
                A global innovation leader, in the host&apos;s chair.
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: MUTED, marginTop: 24, maxWidth: 580 }}>
                Abhay Tandon is a global corporate-innovation leader and the founder of <span style={{ color: TEXT }}>TID Collective</span> — a podcast, advisory and investment platform. He&apos;s led innovation across retail, FMCG and mobility, executed 50+ deep-tech projects across NanoTech, Drones, Haptics, AR/VR/XR and Quantum Computing, and angel-invested in 30+ early-stage startups.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: MUTED, marginTop: 14, maxWidth: 580 }}>
                He has represented India at the G20 Summit, delivered a TEDx in 2025, and is an upcoming author on Corporate Innovation.
              </p>

              {/* Stats grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 36 }}>
                {[
                  { k: "122K+", v: "YouTube subscribers" },
                  { k: "30+", v: "Startup investments" },
                  { k: "50+", v: "Deep-tech projects" },
                  { k: "G20", v: "Summit speaker" },
                ].map((s) => (
                  <div key={s.v} style={{ padding: "18px 16px", border: `1px solid ${ACCENT}1F`, borderRadius: 12, background: "#0F0F0E" }}>
                    <div style={{ fontFamily: "var(--font-display), system-ui", fontSize: 26, fontWeight: 700, letterSpacing: -1, color: ACCENT }}>{s.k}</div>
                    <div style={{ fontSize: 11, color: MUTED, fontFamily: "var(--font-mono), monospace", letterSpacing: 0.6, marginTop: 6, lineHeight: 1.3 }}>{s.v.toUpperCase()}</div>
                  </div>
                ))}
              </div>

              {/* Credentials */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 32 }}>
                {[
                  "Founder & GP, TID Collective",
                  "Global Head of Innovation",
                  "TEDx 2025 — From Observation to Breakthroughs",
                  "Trailblazer Award · Karnataka Ecosystem",
                  "Top 10 Corporate Innovation Leaders, India 2021",
                  "Forbes Technology Council · Charter Member, TiE",
                  "Super-Mentor — NITI Aayog AIM iCREST",
                  "Contributing Author — Times of India, Forbes",
                ].map((c) => (
                  <div key={c} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13.5, color: TEXT, opacity: 0.85, lineHeight: 1.4 }}>
                    <span style={{ width: 6, height: 6, borderRadius: 99, background: ACCENT, marginTop: 7, flexShrink: 0 }} />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div style={{ marginTop: 100 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono), monospace", fontSize: 11, color: ACCENT, letterSpacing: 1.4, marginBottom: 18 }}>
              <span style={{ width: 14, height: 2, background: ACCENT }} />
              THE JOURNEY
            </div>
            <h3 style={{ fontFamily: "var(--font-display), system-ui", fontSize: 40, fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.05, margin: "0 0 56px", maxWidth: 760 }}>
              From operator, to investor, to <span style={{ fontStyle: "italic", color: ACCENT }}>storyteller</span>.
            </h3>
            <div style={{ position: "relative", paddingLeft: 32 }}>
              <div style={{ position: "absolute", left: 7, top: 6, bottom: 6, width: 2, background: `linear-gradient(180deg, ${ACCENT} 0%, ${ACCENT}33 80%, transparent 100%)` }} />
              {TIMELINE.map((t, i) => (
                <div key={i} style={{ position: "relative", paddingBottom: 36, display: "grid", gridTemplateColumns: "180px 1fr", gap: 32 }}>
                  <div style={{ position: "absolute", left: -32, top: 4, width: 16, height: 16, borderRadius: 99, background: BG, border: `2px solid ${ACCENT}`, boxShadow: i === TIMELINE.length - 1 ? `0 0 0 6px ${ACCENT}33` : "none" }} />
                  <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, letterSpacing: 1.2, color: ACCENT, paddingTop: 4 }}>{t.year.toUpperCase()}</div>
                  <div>
                    <h4 style={{ fontFamily: "var(--font-display), system-ui", fontSize: 22, fontWeight: 600, letterSpacing: -0.5, margin: 0, lineHeight: 1.2 }}>{t.title}</h4>
                    <p style={{ color: MUTED, fontSize: 14.5, lineHeight: 1.55, margin: "8px 0 0", maxWidth: 640 }}>{t.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <NewsletterSection />

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid rgba(244,241,234,0.08)", padding: "56px 32px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: ACCENT, display: "grid", placeItems: "center", color: BG, fontFamily: "var(--font-display), system-ui", fontWeight: 800, fontSize: 14 }}>T</div>
              <span style={{ fontFamily: "var(--font-display), system-ui", fontWeight: 700, fontSize: 17, letterSpacing: -0.3 }}>TIDPodcast<span style={{ color: ACCENT }}>.in</span></span>
            </div>
            <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.6, margin: 0, maxWidth: 320 }}>
              The Innovators and Disruptors Podcast. Long-form conversations with the people rebuilding India.
            </p>
          </div>
          {[
            { h: "Listen", l: [["Spotify", "https://creators.spotify.com/pod/profile/abhay-tandon"], ["Apple Podcasts", "https://podcasts.apple.com/gb/podcast/the-innovators-and-disruptors-podcast/id1798971388"], ["YouTube", "https://www.youtube.com/@TheInnovatorsandDisruptorsPodc"]] },
            { h: "Explore", l: [["All episodes", "#episodes"], ["Guests", "/guests"], ["About Abhay", "#about"], ["TID Collective", "/collective"]] },
            { h: "Connect", l: [["LinkedIn", "https://www.linkedin.com/in/abhaytandon/"], ["Instagram", "https://www.instagram.com/theinnovatorsanddisruptors/"]] },
          ].map((c) => (
            <div key={c.h}>
              <h5 style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: 1.4, color: ACCENT, margin: "0 0 16px" }}>{c.h.toUpperCase()}</h5>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {c.l.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} style={{ color: TEXT, textDecoration: "none", fontSize: 14, opacity: 0.78 }}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1280, margin: "56px auto 0", paddingTop: 24, borderTop: "1px solid rgba(244,241,234,0.06)", display: "flex", justifyContent: "space-between", color: MUTED, fontSize: 12, fontFamily: "var(--font-mono), monospace", letterSpacing: 0.6 }}>
          <span>© 2026 TIDPODCAST.IN</span>
          <span>RECORDED IN BENGALURU · MUMBAI</span>
        </div>
      </footer>
    </div>
  );
}
