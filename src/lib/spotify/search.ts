import "server-only";

import type { MusicSelection } from "@/types/taste";

import { spotifyFetch } from "./client";
import { getArtistPreviewUrl } from "./preview";

import type { SpotifySearchResponse } from "./types";

const buildSearchPath = (query: string, type: "artist" | "track", limit: number) =>
  `/search?q=${encodeURIComponent(query)}&type=${type}&limit=${limit}`;

// 아티스트 검색 → MusicSelection 형태로 정규화. iTunes API로 previewUrl 보강
export const searchArtists = async (query: string, limit = 12): Promise<MusicSelection[]> => {
  const data = await spotifyFetch<SpotifySearchResponse>(buildSearchPath(query, "artist", limit));
  const artists = data.artists?.items ?? [];

  return Promise.all(
    artists.map(async (artist) => ({
      id: artist.id,
      name: artist.name,
      image: artist.images[0]?.url ?? "",
      genres: artist.genres,
      previewUrl: await getArtistPreviewUrl(artist.name),
    }))
  );
};

export type SpotifyTrackResult = {
  id: string;
  name: string;
  artistName: string;
  image: string;
  previewUrl: string | null;
};

// 트랙 검색 → preview_url 포함
export const searchTracks = async (query: string, limit = 12): Promise<SpotifyTrackResult[]> => {
  const data = await spotifyFetch<SpotifySearchResponse>(buildSearchPath(query, "track", limit));

  return (data.tracks?.items ?? []).map((track) => ({
    id: track.id,
    name: track.name,
    artistName: track.artists.map((a) => a.name).join(", "),
    image: track.album.images[0]?.url ?? "",
    previewUrl: track.preview_url,
  }));
};
