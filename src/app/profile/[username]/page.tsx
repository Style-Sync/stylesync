import Link from "next/link";

import { requireAuthenticatedUser } from "@/lib/auth/guards";
import { createSupabaseServerClient } from "@/lib/supabase/server";

interface IProfilePageProps {
  params: { username: string };
}

type ResultRow = {
  id: string;
  style_label: { title: string; description: string; themeColor: string };
  start_domain: string;
  created_at: string;
};

export default async function ProfilePage({ params }: IProfilePageProps) {
  const user = await requireAuthenticatedUser();
  const supabase = await createSupabaseServerClient();

  const { data: results } = await supabase
    .from("results")
    .select("id, style_label, start_domain, created_at")
    .eq("profile_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20)
    .returns<ResultRow[]>();

  const displayName =
    (user.user_metadata?.nickname as string | undefined) ??
    user.email?.split("@")[0] ??
    params.username;

  const initial = displayName[0]?.toUpperCase() ?? "?";

  return (
    <main className="page-container section-wrapper">
      {/* ── 프로필 헤더 ────────────────────────────────────────────────── */}
      <section className="mb-12 flex items-center gap-5">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-surface-variant font-headline text-[28px] font-black text-on-background">
          {initial}
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="type-headline-lg">{displayName}</h1>
          <p className="type-body-sm text-on-surface-variant">@{params.username}</p>
        </div>
      </section>

      {/* ── 스타일 히스토리 ─────────────────────────────────────────────── */}
      <section>
        <h2 className="type-headline-sm mb-6">스타일 히스토리</h2>

        {!results || results.length === 0 ? (
          <div className="flex flex-col items-center gap-6 py-20 text-center">
            <p className="type-body-lg text-on-surface-variant keep-all">
              아직 저장된 분석 결과가 없어요.
            </p>
            <Link
              href="/select"
              className="rounded-full bg-primary-container px-8 py-3 text-white type-body-md hover:opacity-90 transition-opacity"
            >
              지금 분석 시작하기
            </Link>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {results.map((row) => (
              <li key={row.id}>
                <Link href={`/result/${row.id}`} className="group block">
                  <article className="overflow-hidden rounded-[24px] bg-surface-variant transition-transform group-hover:scale-[1.02]">
                    <div
                      className="h-[120px] w-full"
                      style={{ background: row.style_label.themeColor }}
                      aria-hidden="true"
                    />
                    <div className="flex flex-col gap-1 px-5 py-4">
                      <p className="type-headline-sm text-on-background truncate">
                        {row.style_label.title}
                      </p>
                      <p className="type-body-sm text-on-surface-variant line-clamp-2">
                        {row.style_label.description}
                      </p>
                      <time
                        dateTime={row.created_at}
                        className="mt-2 type-body-sm text-on-surface-variant/60"
                      >
                        {new Date(row.created_at).toLocaleDateString("ko-KR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
