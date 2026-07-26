import "server-only";

import { getGrokApiKey } from "@/lib/env/server";

const GROK_API_URL = "https://api.x.ai/v1/chat/completions";
const GROK_EMBED_URL = "https://api.x.ai/v1/embeddings";
const GROK_MODEL = "grok-3";
const GROK_EMBED_MODEL = "v1";
const GROK_TIMEOUT_MS = 30_000;

export type GrokMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type GrokApiResponse = {
  choices: { message: { content: string } }[];
};

export class GrokTimeoutError extends Error {
  constructor() {
    super("Grok API 응답 시간이 초과되었습니다.");
    this.name = "GrokTimeoutError";
  }
}

export class GrokApiError extends Error {
  constructor(
    public status: number,
    statusText: string
  ) {
    super(`Grok API 오류: ${status} ${statusText}`);
    this.name = "GrokApiError";
  }
}

async function fetchGrok(apiKey: string, messages: GrokMessage[]): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GROK_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(GROK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model: GROK_MODEL, messages, temperature: 0.7 }),
      signal: controller.signal,
    });
  } catch (e) {
    if (e instanceof Error && e.name === "AbortError") throw new GrokTimeoutError();
    throw e;
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) throw new GrokApiError(res.status, res.statusText);

  const data: GrokApiResponse = await res.json();
  const content = data.choices[0]?.message?.content;
  if (!content) throw new Error("Grok 응답에 content가 없습니다.");
  return content;
}

export async function callGrok(messages: GrokMessage[]): Promise<string> {
  const apiKey = getGrokApiKey();

  try {
    return await fetchGrok(apiKey, messages);
  } catch (e) {
    if (e instanceof GrokTimeoutError) {
      return await fetchGrok(apiKey, messages);
    }
    throw e;
  }
}

type EmbedApiResponse = {
  data: { embedding: number[] }[];
};

/**
 * 텍스트를 xAI embedding API로 벡터화. 실패 시 null 반환 (저장 흐름 블로킹 방지).
 */
export async function embedText(text: string): Promise<number[] | null> {
  const apiKey = getGrokApiKey();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GROK_TIMEOUT_MS);

  try {
    const res = await fetch(GROK_EMBED_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model: GROK_EMBED_MODEL, input: text }),
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const data: EmbedApiResponse = await res.json();
    return data.data[0]?.embedding ?? null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
