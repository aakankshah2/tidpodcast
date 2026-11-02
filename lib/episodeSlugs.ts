import slugCache from "@/data/episode-slugs.json";
import { getAllVideos } from "@/lib/youtube";

// Readable URLs for YouTube-backed episode pages: /episodes/<slug> instead of
// /episodes/yt/<videoId>. Words in the URL help Google and AI search match a
// page to what people type. Slugs are pinned in data/episode-slugs.json so a
// later YouTube title edit can't silently change a live URL — add an entry
// there when a new episode goes up. Old /episodes/yt/<id> links 308 to these
// (see next.config.ts).
const pinned = slugCache as Record<string, string>;

export function slugify(title: string): string {
  return title
    .toLowerCase()
    // Drop episode prefixes like "S2E8:", "Ep3", "FC EP3:" — nobody searches for them.
    .replace(/^(fc\s+)?(s\d+\s*)?(ep\s*\d+|e\d+)\s*:?\s*/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 70)
    .replace(/-+$/, "");
}

export function slugForVideo(videoId: string, title?: string): string | null {
  return pinned[videoId] ?? (title ? slugify(title) : null);
}

export async function videoIdForSlug(slug: string): Promise<string | null> {
  const hit = Object.entries(pinned).find(([, s]) => s === slug);
  if (hit) return hit[0];
  // Unpinned (newly uploaded) episodes fall back to a slug made from the title.
  const videos = await getAllVideos();
  return videos.find((v) => !pinned[v.id] && slugify(v.title) === slug)?.id ?? null;
}

export function pinnedSlugEntries(): [string, string][] {
  return Object.entries(pinned);
}
