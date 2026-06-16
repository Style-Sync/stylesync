import "server-only";

import type { MusicSelection } from "@/types/taste";

import { spotifyFetch } from "./client";

import type { SpotifySearchResponse } from "./types";

const buildSearchPath = (query: string, type: "artist" | "track", limit: number) =>
  `/search?q=${encodeURIComponent(query)}&type=${type}&limit=${limit}`;

// 아티스트 검색 → MusicSelection 형태로 정규화 (store와 동일 타입)
export const searchArtists = async (query: string, limit = 12): Promise<MusicSelection[]> => {
  const data = await spotifyFetch<SpotifySearchResponse>(buildSearchPath(query, "artist", limit));

  return (data.artists?.items ?? []).map((artist) => ({
    id: artist.id,
    name: artist.name,
    image: artist.images[0]?.url ?? "",
    genres: artist.genres,
    previewUrl: null, // 아티스트엔 preview 없음 → #43에서 top-track으로 보강
  }));
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
