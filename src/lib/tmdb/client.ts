import "server-only";

import { getServerEnv } from "@/lib/env/server";

const API_BASE = "https://api.themoviedb.org/3";

const getApiKey = () => {
  return getServerEnv().TMDB_API_KEY;
};

// TMDB GET 요청 시 api_key/언어를 자동 주입하고 오류를 일관되게 처리합니다.
export const tmdbFetch = async <T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> => {
  const url = new URL(`${API_BASE}${endpoint}`);
  url.searchParams.set("api_key", getApiKey());
  url.searchParams.set("language", "ko-KR");

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`TMDB API 오류 (${res.status}): ${detail}`);
  }

  return res.json() as Promise<T>;
};
