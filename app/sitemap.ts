import type { MetadataRoute } from "next";
import { getAllEpisodes } from "@/lib/episodes";

const SITE_URL = "https://tidpodcast.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const episodes = getAllEpisodes();

  const episodeUrls = episodes.map((ep) => ({
    url: `${SITE_URL}/episodes/${ep.slug}`,
    lastModified: new Date(ep.publishedAt),
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
    ...episodeUrls,
  ];
}
