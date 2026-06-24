import "server-only";

import { spotifyFetch } from "./client";

type SpotifyTopTracksResponse = {
  tracks: { id: string; name: string; preview_url: string | null }[];
};

// 아티스트 top-tracks 중 첫 번째 preview_url 반환 (없으면 null)
export const getArtistPreviewUrl = async (
  artistId: string,
  market = "US"
): Promise<string | null> => {
  const data = await spotifyFetch<SpotifyTopTracksResponse>(
    `/artists/${artistId}/top-tracks?market=${market}`
  );

  const trackWithPreview = data.tracks.find((track) => track.preview_url);
  return trackWithPreview?.preview_url ?? null;
};
