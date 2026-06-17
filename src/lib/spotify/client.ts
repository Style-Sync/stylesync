import "server-only";

import { getSpotifyToken } from "./auth";

const API_BASE = "https://api.spotify.com/v1";

export const spotifyFetch = async <T>(
  endpoint: string,
  init?: RequestInit,
  retry = true
): Promise<T> => {
  const token = await getSpotifyToken();

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...init?.headers,
    },
    cache: "no-store",
  });

  // 토큰 만료(401) 시 강제 갱신 후 1회 재시도
  if (res.status === 401 && retry) {
    await getSpotifyToken(true);
    return spotifyFetch<T>(endpoint, init, false);
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Spotify API 오류 (${res.status}): ${detail}`);
  }

  return res.json() as Promise<T>;
};
