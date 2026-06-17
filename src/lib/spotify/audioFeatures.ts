import "server-only";

import { spotifyFetch } from "./client";

export type AudioFeatures = {
  id: string;
  danceability: number;
  energy: number;
  valence: number;
  tempo: number;
  acousticness: number;
  instrumentalness: number;
  speechiness: number;
  liveness: number;
  loudness: number;
};

type AudioFeaturesManyResponse = {
  audio_features: (AudioFeatures | null)[];
};

// 단일 트랙 audio features
export const getAudioFeatures = async (trackId: string): Promise<AudioFeatures> => {
  return spotifyFetch<AudioFeatures>(`/audio-features/${trackId}`);
};

// 여러 트랙 (최대 100개) — 응답의 null 항목은 제거
export const getAudioFeaturesMany = async (trackIds: string[]): Promise<AudioFeatures[]> => {
  if (trackIds.length === 0) return [];

  const ids = trackIds.slice(0, 100).join(",");
  const data = await spotifyFetch<AudioFeaturesManyResponse>(`/audio-features?ids=${ids}`);

  return data.audio_features.filter((f): f is AudioFeatures => f !== null);
};
