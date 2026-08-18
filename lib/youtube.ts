import transcriptCache from "@/data/transcripts.json";

const CHANNEL_ID = "UCjzl0rmHy63eYE6dItBj9TQ";

export type ChannelStats = {
  subscriberCount: number;
  videoCount: number;
  hiddenSubscriberCount: boolean;
};

export type YTVideo = {
  id: string;
  title: string;
  thumbnail: string;
  viewCount: number;
};

export function fmt(n: number): string {
  if (n >= 1_000_000) {
    const v = n / 1_000_000;
    return `${v % 1 === 0 ? v : v.toFixed(1)}M`;
  }
  if (n >= 1_000) return `${Math.floor(n / 1_000)}K`;
  return n.toLocaleString("en-IN");
}

async function yt<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      const body = await res.text();
      console.error(`[yt] HTTP ${res.status} for ${url.split("?")[0]}:`, body.slice(0, 300));
      return null;
    }
    return res.json() as Promise<T>;
  } catch (e) {
    console.error(`[yt] fetch error for ${url.split("?")[0]}:`, e);
    return null;
  }
}

export async function getChannelStats(): Promise<ChannelStats | null> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return null;

  const data = await yt<any>(
    `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${key}`
  );
  const s = data?.items?.[0]?.statistics;
  if (!s) return null;

  return {
    subscriberCount: parseInt(s.subscriberCount ?? "0"),
    videoCount: parseInt(s.videoCount ?? "0"),
    hiddenSubscriberCount: s.hiddenSubscriberCount === true,
  };
}

export async function getLatestVideos(count = 3): Promise<YTVideo[] | null> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return null;

  const search = await yt<any>(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&order=date&maxResults=${count}&videoDuration=long&key=${key}`
  );
  if (!search?.items?.length) return null;

  const ids = search.items.map((v: any) => v.id.videoId).join(",");

  const details = await yt<any>(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${ids}&key=${key}`
  );
  if (!details?.items?.length) return null;

  return details.items.map((v: any) => ({
    id: v.id,
    title: v.snippet.title,
    thumbnail: `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`,
    viewCount: parseInt(v.statistics.viewCount ?? "0"),
  }));
}

export type YTVideoDetail = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  viewCount: number;
  publishedAt: string;
  duration: string;
  tags: string[];
};

export type TranscriptParagraph = {
  start: number;
  text: string;
};

// Reads from the static cache at data/transcripts.json. Refresh with
// `npx tsx scripts/fetch-transcripts.ts` (uses your laptop's IP, which YouTube
// doesn't block — Vercel's serverless IPs do get blocked).
export async function getTranscript(videoId: string): Promise<TranscriptParagraph[] | null> {
  const cache = transcriptCache as Record<string, TranscriptParagraph[]>;
  return cache[videoId] ?? null;
}

export async function getVideoById(videoId: string): Promise<YTVideoDetail | null> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return null;

  const data = await yt<any>(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet,contentDetails&id=${videoId}&key=${key}`
  );
  const item = data?.items?.[0];
  if (!item) return null;

  return {
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description ?? "",
    thumbnail: `https://img.youtube.com/vi/${item.id}/hqdefault.jpg`,
    viewCount: parseInt(item.statistics.viewCount ?? "0"),
    publishedAt: item.snippet.publishedAt,
    duration: item.contentDetails?.duration ?? "",
    tags: Array.isArray(item.snippet.tags) ? item.snippet.tags.slice(0, 10) : [],
  };
}

export type YTVideoFull = {
  id: string;
  title: string;
  thumbnail: string;
  viewCount: number;
  publishedAt: string;
  durationSeconds: number;
};

function parseISODuration(iso: string): number {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return 0;
  return (parseInt(m[1] || "0") * 3600) + (parseInt(m[2] || "0") * 60) + parseInt(m[3] || "0");
}

export async function getAllVideos(): Promise<YTVideoFull[]> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return [];

  // Get the actual uploads playlist ID from the channel (most reliable)
  const channelData = await yt<any>(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${key}`
  );
  const playlistId =
    channelData?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads ??
    CHANNEL_ID.replace(/^UC/, "UU");

  const videos: YTVideoFull[] = [];
  let pageToken: string | undefined;

  do {
    const params = new URLSearchParams({
      part: "snippet",
      playlistId,
      maxResults: "50",
      key,
      ...(pageToken ? { pageToken } : {}),
    });

    const page = await yt<any>(
      `https://www.googleapis.com/youtube/v3/playlistItems?${params}`
    );
    if (!page?.items?.length) break;

    const ids = page.items
      .map((i: any) => i.snippet?.resourceId?.videoId)
      .filter(Boolean)
      .join(",");

    if (ids) {
      const details = await yt<any>(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet,contentDetails&id=${ids}&key=${key}`
      );
      if (details?.items) {
        for (const v of details.items) {
          videos.push({
            id: v.id,
            title: v.snippet.title,
            thumbnail:
              v.snippet.thumbnails.maxres?.url ??
              v.snippet.thumbnails.high?.url ??
              `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`,
            viewCount: parseInt(v.statistics.viewCount ?? "0"),
            publishedAt: v.snippet.publishedAt,
            durationSeconds: parseISODuration(v.contentDetails?.duration ?? ""),
          });
        }
      }
    }

    pageToken = page.nextPageToken ?? undefined;
  } while (pageToken);

  if (videos.length > 0) {
    return videos.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  // Fallback: search API (100 quota units per call but reliable)
  console.log("[getAllVideos] playlistItems empty, falling back to search API");
  const fallbackVideos: YTVideoFull[] = [];
  let searchToken: string | undefined;

  do {
    const params = new URLSearchParams({
      part: "snippet",
      channelId: CHANNEL_ID,
      type: "video",
      order: "date",
      maxResults: "50",
      key,
      ...(searchToken ? { pageToken: searchToken } : {}),
    });

    const page = await yt<any>(
      `https://www.googleapis.com/youtube/v3/search?${params}`
    );
    if (!page?.items?.length) break;

    const ids = page.items
      .map((i: any) => i.id?.videoId)
      .filter(Boolean)
      .join(",");

    if (ids) {
      const details = await yt<any>(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet,contentDetails&id=${ids}&key=${key}`
      );
      if (details?.items) {
        for (const v of details.items) {
          fallbackVideos.push({
            id: v.id,
            title: v.snippet.title,
            thumbnail:
              v.snippet.thumbnails.maxres?.url ??
              v.snippet.thumbnails.high?.url ??
              `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`,
            viewCount: parseInt(v.statistics.viewCount ?? "0"),
            publishedAt: v.snippet.publishedAt,
            durationSeconds: parseISODuration(v.contentDetails?.duration ?? ""),
          });
        }
      }
    }

    searchToken = page.nextPageToken ?? undefined;
  } while (searchToken);

  return fallbackVideos;
}

// Long-form filter: excludes YouTube Shorts (any video ≤ 180s).
// Use this on the guests page to keep only actual episodes.
export function filterLongForm(videos: YTVideoFull[], minSeconds = 180): YTVideoFull[] {
  return videos.filter((v) => v.durationSeconds > minSeconds);
}

export async function getTopVideos(count = 6): Promise<YTVideo[] | null> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return null;

  // search is expensive (100 quota units) but gives us view-sorted results
  const search = await yt<any>(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&order=viewCount&maxResults=${count}&videoDuration=long&key=${key}`
  );
  if (!search?.items?.length) return null;

  const ids = search.items.map((v: any) => v.id.videoId).join(",");

  const details = await yt<any>(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${ids}&key=${key}`
  );
  if (!details?.items?.length) return null;

  return details.items.map((v: any) => ({
    id: v.id,
    title: v.snippet.title,
    thumbnail:
      v.snippet.thumbnails.maxres?.url ??
      v.snippet.thumbnails.high?.url ??
      `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`,
    viewCount: parseInt(v.statistics.viewCount ?? "0"),
  }));
}
