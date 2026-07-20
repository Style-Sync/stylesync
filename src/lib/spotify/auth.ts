import "server-only";

import { getSpotifyCredentials } from "@/lib/env/server";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const EXPIRY_BUFFER_MS = 60_000; // 만료 60초 전에 미리 갱신

type SpotifyTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

type CachedToken = {
  accessToken: string;
  expiresAt: number; // epoch ms
};

let cachedToken: CachedToken | null = null;
let inFlight: Promise<CachedToken> | null = null;

const getCredentials = () => {
  return getSpotifyCredentials();
};

const fetchNewToken = async (): Promise<CachedToken> => {
  const { clientId, clientSecret } = getCredentials();
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
    cache: "no-store",
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Spotify 토큰 발급 실패 (${res.status}): ${detail}`);
  }

  const data = (await res.json()) as SpotifyTokenResponse;

  return {
    accessToken: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
};

export const getSpotifyToken = async (forceRefresh = false): Promise<string> => {
  const valid = cachedToken && cachedToken.expiresAt - EXPIRY_BUFFER_MS > Date.now();

  if (!forceRefresh && valid && cachedToken) return cachedToken.accessToken;

  // 동시 요청에는 같은 토큰 발급 Promise를 공유해 중복 호출을 막습니다.
  if (!inFlight) {
    inFlight = fetchNewToken().finally(() => {
      inFlight = null;
    });
  }

  cachedToken = await inFlight;
  return cachedToken.accessToken;
};
