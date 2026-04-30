export type Chapter = {
  timestamp: string;
  title: string;
  summary: string;
};

export type Episode = {
  slug: string;
  title: string;          // SEO title: "Paroma Chatterjee on Building Revolut India"
  guest: string;
  topic: string;          // Short topic phrase for meta/schema
  publishedAt: string;    // ISO date: "2026-04-01"
  duration: string;       // ISO 8601: "PT1H11M"
  season?: number;
  episode?: number;
  description: string;    // 150-160 chars for meta description
  showNotes: string;      // Full markdown show notes
  transcript?: string;
  pullQuotes: string[];
  chapters: Chapter[];
  youtubeId: string;
  spotifyUrl?: string;
  applePodcastsUrl?: string;
  guestBio?: string;
  guestLinkedIn?: string;
  guestRole?: string;     // e.g. "Co-founder & CEO, Rephrase.ai"
  tags?: string[];
};
