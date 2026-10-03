import Link from "next/link";
import NavBar from "@/components/NavBar";
import { getAllVideos, filterLongForm, type YTVideoFull } from "@/lib/youtube";
import { getGuestProfile } from "@/lib/guests";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All Guests",
  description: "Every guest who has sat across from Abhay Tandon on TID Podcast — founders, CEOs, operators, and innovation leaders building India's future.",
  alternates: { canonical: "https://tidpodcast.in/guests" },
  openGraph: {
    title: "All Guests | TID Podcast",
    description: "Every guest who has sat across from Abhay Tandon on TID Podcast — founders, CEOs, operators, and innovation leaders building India's future.",
    url: "https://tidpodcast.in/guests",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

const ACCENT = "#F5C518";
const BG = "#0B0B0B";
const SURFACE = "#141414";
const TEXT = "#F4F1EA";
const MUTED = "#8A867E";

function parseGuest(title: string): { name: string; topic: string } {
  const parts = title.split(/\s*\|\s*/);
  if (parts.length >= 2) {
    const name = parts[0].trim();
    const topic = parts
      .slice(1)
      .join(" | ")
      .replace(/\s*\|\s*(TID Podcast|The Innovators.*?Podcast)\s*$/i, "")
      .trim();
    return { name, topic };
  }
  const dash = title.split(/\s*–\s*|\s*-\s*/);
  if (dash.length >= 2) {
    return { name: dash[0].trim(), topic: dash.slice(1).join(" – ").trim() };
  }
  return { name: title, topic: "" };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function GuestRow({ video, index }: { video: YTVideoFull; index: number }) {
  const profile = getGuestProfile(video.id);
  const parsed = parseGuest(video.title);
  const name = profile?.name ?? parsed.name;
  const role = profile?.role ?? null;
  const topic = profile?.topic ?? parsed.topic;

  return (
    <Link
      href={`/episodes/yt/${video.id}`}
      className="guest-row"
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "grid",
        gridTemplateColumns: "60px 1fr auto 32px",
        alignItems: "center",
        gap: 24,
        padding: "22px 8px",
        borderBottom: "1px solid rgba(244,241,234,0.06)",
        transition: "background 160ms",
      }}
    >
      <div style={{
        fontFamily: "var(--font-mono), monospace",
        fontSize: 12,
        color: MUTED,
        letterSpacing: 0.6,
      }}>
        {String(index + 1).padStart(3, "0")}
      </div>

      <div style={{ minWidth: 0 }}>
        <h3 style={{
          fontFamily: "var(--font-display), system-ui",
          fontSize: 19,
          fontWeight: 600,
          letterSpacing: -0.4,
          lineHeight: 1.25,
          margin: "0 0 4px",
          color: TEXT,
        }}>
          {name}
          {role && (
            <span style={{ color: ACCENT, fontWeight: 500, fontSize: 16, letterSpacing: -0.2 }}>
              {" — "}{role}
            </span>
          )}
        </h3>
        {topic && (
          <p style={{
            fontSize: 14,
            color: MUTED,
            margin: 0,
            lineHeight: 1.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}>
            {topic}
          </p>
        )}
      </div>

      <div className="guest-row-meta" style={{
        fontFamily: "var(--font-mono), monospace",
        fontSize: 11,
        color: MUTED,
        letterSpacing: 0.5,
        display: "flex",
        gap: 14,
        alignItems: "center",
        whiteSpace: "nowrap",
      }}>
        <span>{formatDuration(video.durationSeconds)}</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>{formatDate(video.publishedAt)}</span>
      </div>

      <div style={{
        width: 32,
        height: 32,
        borderRadius: 99,
        display: "grid",
        placeItems: "center",
        border: `1px solid ${ACCENT}33`,
        color: ACCENT,
        fontSize: 14,
      }}>
        →
      </div>
    </Link>
  );
}

export default async function GuestsPage() {
  const allVideos = await getAllVideos();
  const videos = filterLongForm(allVideos);

  return (
    <div style={{ background: BG, color: TEXT, minHeight: "100vh" }}>
      <NavBar />

      {/* Header */}
      <section style={{ padding: "72px 32px 48px", maxWidth: 1100, margin: "0 auto" }} className="section-px">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
          <Link href="/" style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: MUTED, textDecoration: "none", letterSpacing: 0.8 }}>HOME</Link>
          <span style={{ color: MUTED, fontSize: 12 }}>/</span>
          <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: ACCENT, letterSpacing: 0.8 }}>GUESTS</span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono), monospace", fontSize: 11, color: ACCENT, letterSpacing: 1.4, marginBottom: 18 }}>
              <span style={{ width: 14, height: 2, background: ACCENT, borderRadius: 2 }} />
              GUEST DIRECTORY
            </div>
            <h1 style={{
              fontFamily: "var(--font-display), system-ui",
              fontSize: "clamp(40px, 5vw, 68px)",
              fontWeight: 800, letterSpacing: -2.5, lineHeight: 0.95,
              margin: "0 0 18px",
            }}>
              Founders.<br />
              <span style={{ fontStyle: "italic", color: ACCENT }}>Operators.</span><br />
              Iconoclasts.
            </h1>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.6, maxWidth: 480, margin: 0 }}>
              Every long-form conversation from The Innovators &amp; Disruptors Podcast — in one place.
            </p>
          </div>

          {videos.length > 0 && (
            <div style={{
              padding: "16px 28px", borderRadius: 14,
              background: SURFACE,
              border: `1px solid ${ACCENT}22`,
              textAlign: "center",
            }}>
              <div style={{ fontFamily: "var(--font-display), system-ui", fontSize: 40, fontWeight: 800, letterSpacing: -2, color: ACCENT, lineHeight: 1 }}>
                {videos.length}
              </div>
              <div style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: MUTED, letterSpacing: 1.2, marginTop: 6 }}>
                EPISODES
              </div>
            </div>
          )}
        </div>
      </section>

      {/* List */}
      <section style={{ padding: "0 32px 120px", maxWidth: 1100, margin: "0 auto" }} className="section-px">
        {videos.length > 0 ? (
          <div style={{ borderTop: "1px solid rgba(244,241,234,0.06)" }}>
            {videos.map((v, i) => (
              <GuestRow key={v.id} video={v} index={i} />
            ))}
          </div>
        ) : (
          <div style={{ padding: "80px 0", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 13, color: MUTED, letterSpacing: 0.8 }}>
              Episodes loading… check back shortly.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
