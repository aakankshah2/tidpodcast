import Link from "next/link";
import NavBar from "@/components/NavBar";
import GreenRoomPicker from "@/components/GreenRoomPicker";
import { GREEN_ROOM_EMAIL } from "@/lib/contact";
import { getChannelStats, fmt } from "@/lib/youtube";

const ACCENT = "#F5C518";
const BG = "#0B0B0B";
const TEXT = "#F4F1EA";
const MUTED = "#8A867E";

const SITE_URL = "https://tidpodcast.in";
const PAGE_URL = `${SITE_URL}/green-room`;
const PAGE_DESCRIPTION = "Partner with TID Podcast. Brands, future teammates and freelance creators can reach The Innovators and Disruptors Podcast at abhay@tidventures.com.";

export const metadata = {
  title: "The Green Room — Partner, Join or Collaborate",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "The Green Room | TID Podcast",
    description: "Every great episode starts backstage. Brands, builders and creators — the door's open.",
    url: PAGE_URL,
  },
};

const FAQS = [
  {
    q: "How can my brand partner with TID Podcast?",
    a: `Email ${GREEN_ROOM_EMAIL} with the subject "TID × Brand partnership". TID Podcast puts brand stories in front of India's founders, CXOs and builders through weekly long-form conversations on YouTube, Spotify and Apple Podcasts.`,
  },
  {
    q: "Is TID Podcast hiring?",
    a: `TID is a small team that is always open to hearing from curious people who love great content. Email ${GREEN_ROOM_EMAIL} with the subject "TID × I want to join" and tell us what you'd bring.`,
  },
  {
    q: "Can freelancers and creators work with TID Podcast?",
    a: `Yes. Video editors, designers, writers, motion designers and researchers can send their work to ${GREEN_ROOM_EMAIL} with the subject "TID × Freelance collab".`,
  },
];

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "The Green Room — TID Podcast",
  url: PAGE_URL,
  description: PAGE_DESCRIPTION,
  about: {
    "@type": "Organization",
    name: "The Innovators and Disruptors Podcast",
    alternateName: "TID Podcast",
    url: SITE_URL,
    contactPoint: [
      { "@type": "ContactPoint", contactType: "partnerships", email: GREEN_ROOM_EMAIL, areaServed: "IN" },
      { "@type": "ContactPoint", contactType: "careers", email: GREEN_ROOM_EMAIL, areaServed: "IN" },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default async function GreenRoomPage() {
  const channelStats = await getChannelStats();
  const proof = [
    channelStats && !channelStats.hiddenSubscriberCount ? { k: `${fmt(channelStats.subscriberCount)}+`, v: "YouTube subscribers" } : null,
    channelStats ? { k: `${channelStats.videoCount}`, v: "Episodes & counting" } : null,
    { k: "Weekly", v: "Long-form drops" },
  ].filter((p): p is { k: string; v: string } => p !== null);

  return (
    <div style={{ background: BG, color: TEXT, minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <NavBar />

      {/* Breadcrumb */}
      <div className="section-px" style={{ padding: "28px 32px 0", maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", gap: 10 }}>
        <Link href="/" style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: MUTED, textDecoration: "none", letterSpacing: 1 }}>HOME</Link>
        <span style={{ color: MUTED, fontSize: 12 }}>/</span>
        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: ACCENT, letterSpacing: 1 }}>THE GREEN ROOM</span>
      </div>

      {/* Hero + picker */}
      <section className="section-px" style={{ padding: "40px 32px 80px" }}>
        <div className="green-room-card" style={{
          maxWidth: 1280, margin: "0 auto", padding: "72px 64px", borderRadius: 24,
          background: "radial-gradient(110% 120% at 85% 0%, #2A1F0E 0%, #120D06 38%, #050505 75%)",
          border: `1px solid ${ACCENT}22`,
        }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <span style={{ width: 8, height: 8, borderRadius: 99, background: ACCENT, boxShadow: `0 0 12px ${ACCENT}`, animation: "pulse 1.6s ease-in-out infinite" }} />
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: ACCENT, letterSpacing: 1.8, fontWeight: 600 }}>THE GREEN ROOM</span>
          </div>

          <h1 style={{ fontFamily: "var(--font-display), system-ui", fontWeight: 800, fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 0.98, letterSpacing: -2.5, margin: 0, maxWidth: 900 }}>
            Every great episode starts <span style={{ color: ACCENT, fontStyle: "italic" }}>backstage.</span>
          </h1>

          <p style={{ fontSize: 18, lineHeight: 1.6, color: MUTED, margin: "24px 0 56px", maxWidth: 620 }}>
            Brands with a story. Builders who want in. Creators who make it look and sound unreal.
            If you&apos;ve got something to bring to the table, the door&apos;s open.
          </p>

          <GreenRoomPicker />
        </div>
      </section>

      {/* Proof strip */}
      <section className="section-px" style={{ padding: "0 32px 80px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="green-room-proof" style={{ display: "grid", gridTemplateColumns: `repeat(${proof.length}, 1fr)`, gap: 14 }}>
            {proof.map((p) => (
              <div key={p.v} style={{ padding: "28px 28px", borderRadius: 18, background: "linear-gradient(180deg, #161310 0%, #0E0E0D 100%)", border: `1px solid ${ACCENT}1F` }}>
                <div style={{ fontFamily: "var(--font-display), system-ui", fontSize: 44, fontWeight: 700, letterSpacing: -2, color: ACCENT, lineHeight: 1 }}>{p.k}</div>
                <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: MUTED, letterSpacing: 0.8, marginTop: 10, textTransform: "uppercase" }}>{p.v}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: MUTED, margin: "28px 0 0", textAlign: "center" }}>
            Past guests include leaders from <span style={{ color: TEXT }}>Revolut</span>, <span style={{ color: TEXT }}>Akasa Air</span>, <span style={{ color: TEXT }}>Aditya Birla Group</span> and the <span style={{ color: TEXT }}>Indian Air Force</span>.
          </p>
        </div>
      </section>

      {/* Quick answers */}
      <section className="section-px" style={{ padding: "0 32px 120px" }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
            <div style={{ width: 32, height: 3, background: ACCENT, borderRadius: 3 }} />
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: ACCENT, letterSpacing: 1.6, fontWeight: 600 }}>QUICK ANSWERS</span>
          </div>
          {FAQS.map((f) => (
            <div key={f.q} style={{ padding: "28px 0", borderBottom: `1px solid ${ACCENT}1F` }}>
              <h2 style={{ fontFamily: "var(--font-display), system-ui", fontSize: 22, fontWeight: 700, letterSpacing: -0.5, margin: "0 0 10px" }}>{f.q}</h2>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: MUTED, margin: 0 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
