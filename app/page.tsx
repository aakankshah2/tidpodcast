import Link from "next/link";
import { getAllEpisodes } from "@/lib/episodes";
import { EpisodeCard } from "@/components/EpisodeCard";

export default function HomePage() {
  const episodes = getAllEpisodes();

  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="border-b border-zinc-100 px-6 py-16 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-400">
            TID Podcast
          </p>
          <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-5xl">
            The Innovators and Disruptors Podcast
          </h1>
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-zinc-500">
            India&apos;s founders, builders, and disruptors — unfiltered. Conversations on
            startups, technology, and what it actually takes to build India&apos;s future.
            Hosted by{" "}
            <a
              href="https://www.linkedin.com/in/abhaytandon/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-900 underline underline-offset-2"
            >
              Abhay Tandon
            </a>
            .
          </p>

          {/* Platform links */}
          <div className="flex flex-wrap gap-3">
            <a
              href="https://podcasts.apple.com/gb/podcast/the-innovators-and-disruptors-podcast/id1798971388"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              Apple Podcasts
            </a>
            <a
              href="https://creators.spotify.com/pod/profile/abhay-tandon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              Spotify
            </a>
            <a
              href="https://www.youtube.com/@TheInnovatorsandDisruptorsPodc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              YouTube
            </a>
          </div>
        </div>
      </section>

      {/* ── Episode list ── */}
      <section className="px-6 py-14 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-sm font-medium uppercase tracking-widest text-zinc-400">
            All episodes
          </h2>
          <div className="divide-y divide-zinc-100">
            {episodes.map((ep) => (
              <EpisodeCard key={ep.slug} episode={ep} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
