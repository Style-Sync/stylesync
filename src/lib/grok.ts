import "server-only";

const GROK_API_URL = "https://api.x.ai/v1/chat/completions";
const GROK_MODEL = "grok-3";

export type GrokMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type GrokApiResponse = {
  choices: { message: { content: string } }[];
};

export async function callGrok(messages: GrokMessage[]): Promise<string> {
  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) throw new Error("GROK_API_KEY 환경변수가 설정되지 않았습니다.");

  const res = await fetch(GROK_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model: GROK_MODEL, messages, temperature: 0.7 }),
  });

  if (!res.ok) {
    throw new Error(`Grok API 오류: ${res.status} ${res.statusText}`);
  }

  const data: GrokApiResponse = await res.json();
  const content = data.choices[0]?.message?.content;
  if (!content) throw new Error("Grok 응답에 content가 없습니다.");
  return content;
}
