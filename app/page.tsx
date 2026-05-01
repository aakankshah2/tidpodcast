import Image from "next/image";
import { getAllEpisodes } from "@/lib/episodes";
import { EpisodeCard } from "@/components/EpisodeCard";
import { getChannelStats, getTopVideos, fmt } from "@/lib/youtube";

export default async function HomePage() {
  const episodes = getAllEpisodes();
  const [stats, topVideos] = await Promise.all([
    getChannelStats(),
    getTopVideos(4),
  ]);

  const topVideo = topVideos?.[0] ?? null;

  return (
    <main className="bg-black text-white">

      {/* ── First fold ── */}
      <section className="flex min-h-screen flex-col px-6 pt-10 pb-8 sm:px-12 lg:px-24">

        {/* Hero */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-zinc-500">
            TID Podcast
          </p>
          <h1 className="mb-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            The Innovators and Disruptors
          </h1>
          <p className="mb-5 max-w-2xl text-sm leading-relaxed text-zinc-400">
            India&apos;s founders, builders, and disruptors — unfiltered. Hosted by{" "}
            <a
              href="https://www.linkedin.com/in/abhaytandon/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-2"
            >
              Abhay Tandon
            </a>
            .
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="https://podcasts.apple.com/gb/podcast/the-innovators-and-disruptors-podcast/id1798971388"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
            >
              Apple Podcasts
            </a>
            <a
              href="https://creators.spotify.com/pod/profile/abhay-tandon"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
            >
              Spotify
            </a>
            <a
              href="https://www.youtube.com/@TheInnovatorsandDisruptorsPodc"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
            >
              YouTube
            </a>
          </div>
        </div>

        {/* Top episode thumbnail grid */}
        {topVideos && topVideos.length > 0 ? (
          <div className="mb-6 grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
            {topVideos.map((v) => (
              <a
                key={v.id}
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-xl bg-zinc-900"
              >
                <div className="relative flex-1 overflow-hidden">
                  <Image
                    src={v.thumbnail}
                    alt={v.title}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition duration-200 group-hover:opacity-75"
                  />
                </div>
                <div className="p-2.5">
                  <p className="line-clamp-2 text-xs font-medium leading-snug text-zinc-200">
                    {v.title}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">{fmt(v.viewCount)} views</p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          /* Placeholder grid if no API key — still shows layout */
          <div className="mb-6 flex-1" />
        )}

        {/* Stats bar */}
        <div className="border-t border-zinc-800 pt-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-8">
              {stats && !stats.hiddenSubscriberCount && (
                <div>
                  <p className="text-xl font-bold sm:text-2xl">{fmt(stats.subscriberCount)}</p>
                  <p className="text-xs text-zinc-500">subscribers</p>
                </div>
              )}
              {stats && (
                <div>
                  <p className="text-xl font-bold sm:text-2xl">{stats.videoCount}</p>
                  <p className="text-xs text-zinc-500">episodes</p>
                </div>
              )}
              {topVideo && (
                <div>
                  <p className="text-xl font-bold sm:text-2xl">{fmt(topVideo.viewCount)}</p>
                  <p className="text-xs text-zinc-500">top episode views</p>
                </div>
              )}
              {!stats && (
                <p className="text-xs text-zinc-600">
                  Add YOUTUBE_API_KEY to env to show live stats
                </p>
              )}
            </div>

            {topVideo && (
              <a
                href={`https://www.youtube.com/watch?v=${topVideo.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group hidden shrink-0 sm:block"
              >
                <div className="relative h-14 w-24 overflow-hidden rounded-lg">
                  <Image
                    src={topVideo.thumbnail}
                    alt={topVideo.title}
                    fill
                    sizes="96px"
                    className="object-cover transition group-hover:opacity-75"
                  />
                </div>
                <p className="mt-1 text-center text-xs text-zinc-600">most viewed</p>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── Episode list ── */}
      <section className="border-t border-zinc-800 px-6 py-14 sm:px-12 lg:px-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-xs font-medium uppercase tracking-widest text-zinc-500">
            All episodes
          </h2>
          <div className="divide-y divide-zinc-800">
            {episodes.map((ep) => (
              <EpisodeCard key={ep.slug} episode={ep} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
