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
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
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
};

export async function getVideoById(videoId: string): Promise<YTVideoDetail | null> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return null;

  const data = await yt<any>(
    `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoId}&key=${key}`
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
  };
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
