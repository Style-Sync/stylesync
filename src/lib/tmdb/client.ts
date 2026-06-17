import "server-only";

const API_BASE = "https://api.themoviedb.org/3";

const getApiKey = () => {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error("TMDB 환경변수 누락: TMDB_API_KEY 확인");
  }
  return apiKey;
};

// TMDB GET 요청 — api_key/언어 자동 주입 + 에러 처리
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
