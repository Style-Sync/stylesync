import { createBrowserClient } from "@supabase/ssr";

/**
 * 브라우저(Client Component)용 Supabase 클라이언트
 * "use client" 컴포넌트 또는 커스텀 훅 내부에서 사용
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
