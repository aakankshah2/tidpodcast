import Link from "next/link";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import { getVideoById, getTranscript, fmt } from "@/lib/youtube";
import { getEpisodeMeta, guestId } from "@/lib/episodeMeta";
import type { Metadata } from "next";

const ACCENT = "#F5C518";
const BG = "#0B0B0B";
const SURFACE = "#141414";
const TEXT = "#F4F1EA";
const MUTED = "#8A867E";

export async function generateMetadata(
  { params }: { params: Promise<{ videoId: string }> }
): Promise<Metadata> {
  const { videoId } = await params;
  const video = await getVideoById(videoId);
  const meta = getEpisodeMeta(videoId);
  // Hand-written metadata still stands if the YouTube API is down or out of
  // quota — otherwise an outage silently costs us the page title.
  if (!video) {
    if (!meta?.seoTitle) return { title: "Episode" };
    return {
      title: meta.seoTitle,
      description: meta.description,
      alternates: { canonical: `https://tidpodcast.in/episodes/yt/${videoId}` },
    };
  }
  // A hand-written description beats a blind slice of the YouTube copy, which
  // tends to cut off mid-sentence.
  const description =
    meta?.description ||
    video.description.slice(0, 160) ||
    "The Innovators and Disruptors Podcast";
  // The YouTube title leads with the episode number; the SEO title leads with
  // the guest, which is what people actually search for.
  const pageTitle = meta?.seoTitle || video.title;
  const brandedTitle = `${pageTitle} | TID Podcast`;
  return {
    title: pageTitle,
    description,
    alternates: { canonical: `https://tidpodcast.in/episodes/yt/${videoId}` },
    openGraph: {
      type: "video.episode",
      title: brandedTitle,
      description,
      url: `https://tidpodcast.in/episodes/yt/${videoId}`,
      images: [{ url: video.thumbnail, width: 480, height: 360, alt: video.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
      images: [video.thumbnail],
    },
  };
}

// Transcript `start` values are stored in milliseconds.
function toSeconds(ms: number): number {
  return Math.floor(ms / 1000);
}

function formatTimestamp(ms: number): string {
  const total = toSeconds(ms);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default async function YTEpisodePage(
  { params }: { params: Promise<{ videoId: string }> }
) {
  const { videoId } = await params;
  const [video, transcript] = await Promise.all([
    getVideoById(videoId),
    getTranscript(videoId),
  ]);

  const title = video?.title ?? "Episode";
  const publishedDate = video?.publishedAt
    ? new Date(video.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : null;

  const meta = getEpisodeMeta(videoId);
  const guest = meta?.guest;
  // Naming the guest as a linked Person is what lets Google connect this page
  // to them as a public figure, rather than treating it as untitled video copy.
  const guestNode = guest
    ? {
        "@type": "Person",
        "@id": guestId(guest),
        name: guest.name,
        ...(guest.alternateName ? { alternateName: guest.alternateName } : {}),
        ...(guest.jobTitle ? { jobTitle: guest.jobTitle } : {}),
        ...(guest.description ? { description: guest.description } : {}),
        ...(guest.sameAs?.length ? { sameAs: guest.sameAs } : {}),
      }
    : null;
  const guestRef = guest ? { "@id": guestId(guest) } : null;
  const aboutNodes = meta?.about?.length
    ? meta.about.map((name) => ({ "@type": "Thing", name }))
    : null;

  // Fall back to hand-written metadata so a YouTube outage costs us the view
  // count, not the entire structured data block.
  const schemaName = meta?.seoTitle || video?.title;
  const schemaDescription =
    meta?.description ||
    video?.description.slice(0, 500) ||
    "Episode of The Innovators and Disruptors Podcast";
  const uploadDate = video?.publishedAt || meta?.publishedAt;
  const schemaDuration = video?.duration || meta?.duration;
  const thumbnail = video?.thumbnail || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const combinedSchema = schemaName && uploadDate ? {
    "@context": "https://schema.org",
    "@graph": [
      ...(guestNode ? [guestNode] : []),
      {
        "@type": "PodcastEpisode",
        name: schemaName,
        ...(video?.title && video.title !== schemaName ? { alternateName: video.title } : {}),
        description: schemaDescription.slice(0, 300),
        datePublished: uploadDate,
        url: `https://tidpodcast.in/episodes/yt/${videoId}`,
        image: thumbnail,
        author: { "@id": "https://tidpodcast.in/#abhay-tandon" },
        ...(guestRef ? { actor: guestRef, about: guestRef } : {}),
        ...(aboutNodes ? { mentions: aboutNodes } : {}),
        associatedMedia: {
          "@type": "MediaObject",
          embedUrl: `https://www.youtube.com/embed/${videoId}`,
          url: `https://www.youtube.com/watch?v=${videoId}`,
        },
        partOfSeries: {
          "@type": "PodcastSeries",
          name: "The Innovators and Disruptors Podcast",
          url: "https://tidpodcast.in",
        },
      },
      {
        "@type": "VideoObject",
        name: schemaName,
        ...(video?.title && video.title !== schemaName ? { alternateName: video.title } : {}),
        description: schemaDescription,
        ...(guestRef ? { actor: guestRef, about: guestRef } : {}),
        ...(aboutNodes ? { mentions: aboutNodes } : {}),
        thumbnailUrl: [
          thumbnail,
          `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        ],
        uploadDate,
        contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        ...(schemaDuration ? { duration: schemaDuration } : {}),
        ...(video?.tags.length ? { keywords: video.tags.join(", ") } : {}),
        ...(transcript && transcript.length > 0
          ? { transcript: transcript.map((p) => p.text).join(" ").slice(0, 50000) }
          : {}),
        publisher: {
          "@type": "Organization",
          name: "TID Podcast",
          url: "https://tidpodcast.in",
          logo: {
            "@type": "ImageObject",
            url: "https://tidpodcast.in/og-image.jpg",
          },
        },
        author: { "@id": "https://tidpodcast.in/#abhay-tandon" },
        ...(video
          ? {
              interactionStatistic: {
                "@type": "InteractionCounter",
                interactionType: { "@type": "WatchAction" },
                userInteractionCount: video.viewCount,
              },
            }
          : {}),
      },
    ],
  } : null;

  return (
    <div style={{ background: BG, color: TEXT, minHeight: "100vh" }}>
      {combinedSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
        />
      )}
      <NavBar />

      {/* Breadcrumb */}
      <div style={{ padding: "24px 32px 0", maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", gap: 10 }}>
        <Link href="/" style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: MUTED, textDecoration: "none", letterSpacing: 0.8 }}>HOME</Link>
        <span style={{ color: MUTED, fontSize: 12 }}>/</span>
        <Link href="/#episodes" style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: MUTED, textDecoration: "none", letterSpacing: 0.8 }}>SEASON 2</Link>
        <span style={{ color: MUTED, fontSize: 12 }}>/</span>
        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: ACCENT, letterSpacing: 0.8, maxWidth: 320, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</span>
      </div>

      <main style={{ padding: "40px 32px 100px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 48, alignItems: "start" }}>

          {/* Left: embed + title */}
          <div>
            {/* YouTube embed */}
            <div style={{ position: "relative", aspectRatio: "16/9", borderRadius: 18, overflow: "hidden", background: SURFACE, border: `1px solid ${ACCENT}18`, marginBottom: 28 }}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
              />
            </div>

            {/* Title + meta */}
            <h1 style={{ fontFamily: "var(--font-display), system-ui", fontWeight: 800, fontSize: "clamp(24px, 3vw, 38px)", letterSpacing: -1.2, lineHeight: 1.1, margin: "0 0 14px" }}>
              {title}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", marginBottom: 28 }}>
              {publishedDate && (
                <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: MUTED, letterSpacing: 0.6 }}>{publishedDate}</span>
              )}
              {video?.viewCount ? (
                <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: MUTED, letterSpacing: 0.6 }}>{fmt(video.viewCount)} views</span>
              ) : null}
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: 99, background: ACCENT }} />
                <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12, color: ACCENT, letterSpacing: 0.8 }}>THE INNOVATORS & DISRUPTORS PODCAST</span>
              </span>
            </div>

            {/* Description */}
            {video?.description && (
              <div style={{ padding: "24px 28px", borderRadius: 14, background: SURFACE, border: "1px solid rgba(244,241,234,0.06)" }}>
                <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, color: ACCENT, letterSpacing: 1.4, margin: "0 0 12px" }}>EPISODE NOTES</p>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, margin: 0, whiteSpace: "pre-line" }}>
                  {video.description.slice(0, 800)}{video.description.length > 800 ? "…" : ""}
                </p>
              </div>
            )}

            {/* Transcript */}
            {transcript && transcript.length > 0 && (
              <details style={{ marginTop: 20, padding: "24px 28px", borderRadius: 14, background: SURFACE, border: "1px solid rgba(244,241,234,0.06)" }}>
                <summary style={{ cursor: "pointer", listStyle: "none", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, color: ACCENT, letterSpacing: 1.4 }}>FULL TRANSCRIPT</span>
                    <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, color: MUTED, letterSpacing: 0.6 }}>{transcript.length} sections · auto-generated</span>
                  </span>
                  <span style={{ fontSize: 12, color: ACCENT, letterSpacing: 0.6 }}>Show ▾</span>
                </summary>
                <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${ACCENT}1F`, display: "flex", flexDirection: "column", gap: 18 }}>
                  {transcript.map((p, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 16 }}>
                      <a
                        href={`https://www.youtube.com/watch?v=${videoId}&t=${toSeconds(p.start)}s`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, color: ACCENT, textDecoration: "none", paddingTop: 2 }}
                      >
                        {formatTimestamp(p.start)}
                      </a>
                      <p style={{ fontSize: 14, color: TEXT, lineHeight: 1.7, margin: 0, opacity: 0.85 }}>{p.text}</p>
                    </div>
                  ))}
                </div>
              </details>
            )}
          </div>

          {/* Right: actions + info panel */}
          <div style={{ position: "sticky", top: 100 }}>
            <div style={{ padding: 28, borderRadius: 18, background: SURFACE, border: `1px solid ${ACCENT}22`, marginBottom: 16 }}>
              <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 10, color: MUTED, letterSpacing: 1.4, margin: "0 0 20px" }}>WATCH OR LISTEN</p>

              {/* Watch on YouTube — primary CTA */}
              <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 12, background: ACCENT, color: BG, textDecoration: "none", marginBottom: 12 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.5 6.2c-.27-1.02-1.07-1.83-2.09-2.1C19.55 3.6 12 3.6 12 3.6s-7.55 0-9.41.5C1.57 4.37.77 5.18.5 6.2 0 8.07 0 12 0 12s0 3.93.5 5.8c.27 1.02 1.07 1.83 2.09 2.1 1.86.5 9.41.5 9.41.5s7.55 0 9.41-.5c1.02-.27 1.82-1.08 2.09-2.1.5-1.87.5-5.8.5-5.8s0-3.93-.5-5.8zM9.6 15.6V8.4l6.24 3.6-6.24 3.6z" />
                </svg>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: -0.3 }}>Watch on YouTube</div>
                  <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>Opens in YouTube</div>
                </div>
              </a>

              {/* Apple Podcasts */}
              <a
                href="https://podcasts.apple.com/gb/podcast/the-innovators-and-disruptors-podcast/id1798971388"
                target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 18px", borderRadius: 12, border: `1px solid rgba(244,241,234,0.1)`, color: TEXT, textDecoration: "none", marginBottom: 10 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 4.8c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zm4.8 14.4H7.2c-.4 0-.6-.5-.4-.8l1.8-3.1c.1-.2.4-.3.6-.3h5.6c.2 0 .5.1.6.3l1.8 3.1c.2.3 0 .8-.4.8z" />
                </svg>
                <div style={{ fontSize: 14, fontWeight: 500 }}>Listen on Apple Podcasts</div>
              </a>

              {/* Spotify */}
              <a
                href="https://creators.spotify.com/pod/profile/abhay-tandon"
                target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 18px", borderRadius: 12, border: `1px solid rgba(244,241,234,0.1)`, color: TEXT, textDecoration: "none" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.52 17.28c-.24.36-.6.48-.96.24-2.64-1.56-5.88-1.92-9.72-1.08-.36.12-.72-.12-.84-.48-.12-.36.12-.72.48-.84 4.2-.96 7.8-.6 10.68 1.2.36.12.48.6.36.96zm1.44-3.24c-.24.48-.72.6-1.08.36-2.88-1.8-7.32-2.28-10.68-1.32-.48.12-.96-.12-1.08-.6-.12-.48.12-.96.6-1.08 3.96-1.2 8.88-.6 12.12 1.44.36.24.48.84.12 1.2zm.12-3.36C15.6 8.76 9.36 8.52 6 9.6c-.48.12-1.08-.12-1.2-.72-.12-.48.12-1.08.72-1.2 3.84-1.2 10.68-.96 14.88 1.44.48.24.6.84.24 1.32-.24.36-.84.48-1.2.24z" />
                </svg>
                <div style={{ fontSize: 14, fontWeight: 500 }}>Listen on Spotify</div>
              </a>
            </div>

            {/* Back to Season 2 */}
            <Link
              href="/#episodes"
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 20px", borderRadius: 12, border: `1px solid rgba(244,241,234,0.08)`, color: MUTED, textDecoration: "none", fontSize: 13 }}
            >
              <span>←</span>
              <span>Back to Season 2</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
