import { cookies } from "next/headers";

import { createServerClient } from "@supabase/ssr";

/**
 * 서버(Server Component / Route Handler / Server Action)용 Supabase 클라이언트
 * 서버 컨텍스트에서만 호출 가능 (next/headers 사용)
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );
}
