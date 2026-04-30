import Link from "next/link";
import type { Episode } from "@/lib/types";

function formatDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return "";
  const h = match[1] ? `${match[1]}h ` : "";
  const m = match[2] ? `${match[2]}m` : "";
  return `${h}${m}`.trim();
}

export function EpisodeCard({ episode: ep }: { episode: Episode }) {
  const date = new Date(ep.publishedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={`/episodes/${ep.slug}`}
      className="group block py-6 transition hover:opacity-80"
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1 min-w-0">
          {(ep.season || ep.episode) && (
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-zinc-400">
              {ep.season && `S${ep.season}`}
              {ep.season && ep.episode && " · "}
              {ep.episode && `EP${ep.episode}`}
            </p>
          )}
          <h3 className="mb-1 text-base font-semibold leading-snug text-zinc-900 group-hover:text-zinc-600">
            {ep.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-zinc-500">
            {ep.description}
          </p>
          <div className="mt-2 flex items-center gap-3 text-xs text-zinc-400">
            <span>{date}</span>
            {ep.duration && (
              <>
                <span>·</span>
                <span>{formatDuration(ep.duration)}</span>
              </>
            )}
          </div>
        </div>
        <span className="mt-1 shrink-0 text-zinc-300 transition group-hover:text-zinc-600">
          →
        </span>
      </div>
    </Link>
  );
}
