// Spotify Web API 응답 타입 — 검색 wrapper(search.ts)에서 사용

export type SpotifyImage = {
  url: string;
  height: number | null;
  width: number | null;
};

export type SpotifyArtist = {
  id: string;
  name: string;
  images: SpotifyImage[];
  genres: string[];
};

export type SpotifyTrack = {
  id: string;
  name: string;
  artists: { id: string; name: string }[];
  album: {
    id: string;
    name: string;
    images: SpotifyImage[];
  };
  preview_url: string | null;
};

// /search 응답 — type 파라미터에 따라 artists / tracks 중 일부만 내려옴
export type SpotifySearchResponse = {
  artists?: {
    items: SpotifyArtist[];
  };
  tracks?: {
    items: SpotifyTrack[];
  };
};
