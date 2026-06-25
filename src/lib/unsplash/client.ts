import "server-only";

const API_BASE = "https://api.unsplash.com";

const getAccessKey = () => {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) {
    throw new Error("Unsplash 환경변수 누락: UNSPLASH_ACCESS_KEY 확인");
  }
  return key;
};

// 공용 fetch 래퍼 — Unsplash는 Access Key 헤더 인증 (OAuth 불필요)
export const unsplashFetch = async <T>(endpoint: string, init?: RequestInit): Promise<T> => {
  const accessKey = getAccessKey();

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...init,
    headers: {
      Authorization: `Client-ID ${accessKey}`,
      "Accept-Version": "v1",
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Unsplash API 오류 (${res.status}): ${detail}`);
  }

  return res.json() as Promise<T>;
};
