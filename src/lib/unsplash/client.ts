import "server-only";

const API_BASE = "https://api.unsplash.com";

const getAccessKey = (): string => {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) throw new Error("Unsplash 환경변수 누락: UNSPLASH_ACCESS_KEY 확인");
  return key;
};

export const unsplashFetch = async <T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> => {
  const url = new URL(`${API_BASE}${endpoint}`);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }

  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${getAccessKey()}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Unsplash API 오류 (${res.status}): ${detail}`);
  }

  return res.json() as Promise<T>;
};
