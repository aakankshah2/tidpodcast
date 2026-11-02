import { notFound, permanentRedirect } from "next/navigation";
import { getVideoById } from "@/lib/youtube";
import { slugForVideo } from "@/lib/episodeSlugs";

// Old address. Pinned episodes are 308'd in next.config.ts before reaching
// here; this catches newer, unpinned uploads.
export default async function OldYTEpisodeRoute(
  { params }: { params: Promise<{ videoId: string }> }
) {
  const { videoId } = await params;
  const video = await getVideoById(videoId);
  const slug = slugForVideo(videoId, video?.title);
  if (!slug) notFound();
  permanentRedirect(`/episodes/${slug}`);
}
