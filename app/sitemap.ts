import type { MetadataRoute } from "next";
import { getAllEpisodes } from "@/lib/episodes";
import { getAllVideos, filterLongForm } from "@/lib/youtube";

const SITE_URL = "https://tidpodcast.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const episodes = getAllEpisodes();
  const ytVideos = filterLongForm(await getAllVideos());

  const slugEpisodeUrls = episodes.map((ep) => ({
    url: `${SITE_URL}/episodes/${ep.slug}`,
    lastModified: new Date(ep.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const ytEpisodeUrls = ytVideos.map((v) => ({
    url: `${SITE_URL}/episodes/yt/${v.id}`,
    lastModified: new Date(v.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/guests`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/collective`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...slugEpisodeUrls,
    ...ytEpisodeUrls,
  ];
}
