import metaCache from "@/data/episode-meta.json";

// Hand-written SEO overrides for YouTube-backed episode pages.
// Without an entry here a page falls back to the raw YouTube title and a
// blind 160-character slice of the YouTube description — fine for most
// episodes, bad for ones with a searchable guest. Add an entry when the
// guest is someone people search for by name.
export type GuestMeta = {
  name: string;
  alternateName?: string;
  jobTitle?: string;
  description?: string;
  sameAs?: string[];
};

export type EpisodeMeta = {
  seoTitle?: string;
  description?: string;
  // Lets the page emit valid schema even when the YouTube API is unavailable —
  // Google requires uploadDate on a VideoObject.
  publishedAt?: string;
  duration?: string;
  guest?: GuestMeta;
  about?: string[];
  // Questions the episode answers, in plain words, shown near the top of the
  // page and as FAQPage schema. AI search tools quote pages that answer a
  // question directly; a 10,000-word transcript buries the answer. `t` is the
  // second in the video where the guest says it. Every answer must be
  // checked against the transcript — never add a claim the guest didn't make.
  faq?: { q: string; a: string; t?: number }[];
};

export function getEpisodeMeta(videoId: string): EpisodeMeta | null {
  const cache = metaCache as Record<string, EpisodeMeta>;
  return cache[videoId] ?? null;
}

export function guestId(guest: GuestMeta): string {
  const slug = guest.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `https://tidpodcast.in/#${slug}`;
}
