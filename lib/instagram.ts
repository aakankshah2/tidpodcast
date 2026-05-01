export async function getInstagramFollowers(username: string): Promise<number | null> {
  try {
    const res = await fetch(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15",
          "x-ig-app-id": "936619743392459",
          "Accept": "application/json",
        },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data?.user?.edge_followed_by?.count ?? null;
  } catch {
    return null;
  }
}
