import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllEpisodes, getEpisodeBySlug, getRelatedEpisodes } from "@/lib/episodes";
import { EpisodeCard } from "@/components/EpisodeCard";

const SITE_URL = "https://tidpodcast.in";

// ── Static generation: pre-render all episode pages at build time ──
export function generateStaticParams() {
  return getAllEpisodes().map((ep) => ({ slug: ep.slug }));
}

// ── Per-episode meta tags ──
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const ep = getEpisodeBySlug(slug);
  if (!ep) return {};

  const title = `${ep.title}`;
  const url = `${SITE_URL}/episodes/${ep.slug}`;

  return {
    title,
    description: ep.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title,
      description: ep.description,
      url,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: ep.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: ep.description,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function EpisodePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const ep = getEpisodeBySlug(slug);
  if (!ep) notFound();

  const related = getRelatedEpisodes(slug, 3);

  // PodcastEpisode JSON-LD schema
  const episodeSchema = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: ep.title,
    description: ep.description,
    url: `${SITE_URL}/episodes/${ep.slug}`,
    datePublished: ep.publishedAt,
    duration: ep.duration,
    ...(ep.season && ep.episode
      ? { episodeNumber: ep.episode, partOfSeason: { "@type": "PodcastSeason", seasonNumber: ep.season } }
      : {}),
    partOfSeries: {
      "@type": "PodcastSeries",
      name: "The Innovators and Disruptors Podcast",
      url: SITE_URL,
    },
    author: {
      "@type": "Person",
      name: "Abhay Tandon",
      url: "https://www.linkedin.com/in/abhaytandon/",
    },
    ...(ep.youtubeId !== "REPLACE_WITH_YOUTUBE_ID"
      ? {
          associatedMedia: {
            "@type": "MediaObject",
            contentUrl: `https://www.youtube.com/watch?v=${ep.youtubeId}`,
            embedUrl: `https://www.youtube.com/embed/${ep.youtubeId}`,
          },
        }
      : {}),
  };

  const formattedDate = new Date(ep.publishedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(episodeSchema) }}
      />

      <main className="min-h-screen bg-black text-white">
        {/* ── Nav ── */}
        <nav className="border-b border-zinc-800 px-6 py-4 sm:px-12 lg:px-24">
          <Link
            href="/"
            className="text-sm font-medium text-zinc-500 transition hover:text-white"
          >
            ← TID Podcast
          </Link>
        </nav>

        <article className="px-6 py-12 sm:px-12 lg:px-24">
          <div className="mx-auto max-w-3xl">

            {/* ── Header ── */}
            <header className="mb-10">
              {(ep.season || ep.episode) && (
                <p className="mb-2 text-sm font-medium uppercase tracking-widest text-zinc-400">
                  {ep.season && `Season ${ep.season}`}
                  {ep.season && ep.episode && " · "}
                  {ep.episode && `Episode ${ep.episode}`}
                </p>
              )}
              <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                {ep.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500">
                <span>{formattedDate}</span>
                {ep.guestRole && <span className="text-zinc-700">·</span>}
                {ep.guestRole && <span>{ep.guestRole}</span>}
              </div>
            </header>

            {/* ── YouTube embed ── */}
            {ep.youtubeId !== "REPLACE_WITH_YOUTUBE_ID" && (
              <div className="mb-10 aspect-video w-full overflow-hidden rounded-xl bg-zinc-900">
                <iframe
                  src={`https://www.youtube.com/embed/${ep.youtubeId}`}
                  title={ep.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            )}

            {/* ── Platform links ── */}
            <div className="mb-10 flex flex-wrap gap-3">
              {ep.applePodcastsUrl && (
                <a
                  href={ep.applePodcastsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
                >
                  Listen on Apple Podcasts
                </a>
              )}
              {ep.spotifyUrl && (
                <a
                  href={ep.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
                >
                  Listen on Spotify
                </a>
              )}
              {ep.youtubeId !== "REPLACE_WITH_YOUTUBE_ID" && (
                <a
                  href={`https://www.youtube.com/watch?v=${ep.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
                >
                  Watch on YouTube
                </a>
              )}
            </div>

            {/* ── Pull quotes ── */}
            {ep.pullQuotes.length > 0 && (
              <div className="mb-10 space-y-4">
                {ep.pullQuotes.map((q, i) => (
                  <blockquote
                    key={i}
                    className="border-l-2 border-white pl-5 text-lg font-medium italic leading-relaxed text-zinc-300"
                  >
                    &ldquo;{q}&rdquo;
                  </blockquote>
                ))}
              </div>
            )}

            {/* ── Chapters / Timestamps ── */}
            {ep.chapters.length > 0 && (
              <section className="mb-10" aria-label="Episode chapters">
                <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-zinc-400">
                  Chapters
                </h2>
                <ol className="space-y-3">
                  {ep.chapters.map((ch, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="w-14 shrink-0 font-mono text-sm text-zinc-400">
                        {ch.timestamp}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-zinc-200">{ch.title}</p>
                        <p className="text-sm text-zinc-500">{ch.summary}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* ── Show notes ── */}
            <section className="mb-10" aria-label="Show notes">
              <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-zinc-400">
                Show notes
              </h2>
              <div className="prose max-w-none text-sm leading-relaxed">
                {ep.showNotes.split("\n").map((line, i) => {
                  if (line.startsWith("**") && line.endsWith("**")) {
                    return (
                      <p key={i} className="mt-4 mb-1 font-semibold text-zinc-200">
                        {line.slice(2, -2)}
                      </p>
                    );
                  }
                  if (line.startsWith("- ")) {
                    return (
                      <p key={i} className="ml-4 text-zinc-400 before:mr-2 before:content-['–']">
                        {line.slice(2)}
                      </p>
                    );
                  }
                  if (line.trim() === "") return <br key={i} />;
                  return <p key={i} className="text-zinc-400">{line}</p>;
                })}
              </div>
            </section>

            {/* ── Guest bio ── */}
            {ep.guestBio && (
              <section className="mb-10 rounded-xl bg-zinc-900 p-6" aria-label="About the guest">
                <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
                  About {ep.guest}
                </h2>
                <p className="text-sm leading-relaxed text-zinc-400">{ep.guestBio}</p>
                {ep.guestLinkedIn && (
                  <a
                    href={ep.guestLinkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm font-medium text-white underline underline-offset-2"
                  >
                    LinkedIn →
                  </a>
                )}
              </section>
            )}

            {/* ── Transcript ── */}
            {ep.transcript && (
              <section className="mb-10" aria-label="Episode transcript">
                <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-zinc-400">
                  Transcript
                </h2>
                <div className="max-h-96 overflow-y-auto rounded-xl border border-zinc-800 p-6">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-500">
                    {ep.transcript}
                  </p>
                </div>
              </section>
            )}

            {/* ── Tags ── */}
            {ep.tags && ep.tags.length > 0 && (
              <div className="mb-12 flex flex-wrap gap-2">
                {ep.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>

        {/* ── Related episodes ── */}
        {related.length > 0 && (
          <section className="border-t border-zinc-800 px-6 py-12 sm:px-12 lg:px-24">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-sm font-medium uppercase tracking-widest text-zinc-500">
                More episodes
              </h2>
              <div className="divide-y divide-zinc-800">
                {related.map((ep) => (
                  <EpisodeCard key={ep.slug} episode={ep} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
