import type { NextConfig } from "next";
import episodeSlugs from "./data/episode-slugs.json";

const nextConfig: NextConfig = {
  // Episode pages moved from /episodes/yt/<videoId> to readable slugs. A
  // config-level 308 tells Google the move is permanent so the old URLs pass
  // their ranking on.
  async redirects() {
    return Object.entries(episodeSlugs as Record<string, string>).map(([id, slug]) => ({
      source: `/episodes/yt/${id}`,
      destination: `/episodes/${slug}`,
      permanent: true,
    }));
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "i9.ytimg.com" },
    ],
  },
};

export default nextConfig;
