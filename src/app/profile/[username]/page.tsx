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

type ProfileRow = {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  visibility: "public" | "followers" | "private";
};

export default async function ProfilePage({ params }: IProfilePageProps) {
  const viewer = await requireAuthenticatedUser();
  const supabase = await createSupabaseServerClient();

  // URL의 username으로 대상 프로필을 조회한다. (username은 DB에 소문자로 저장됨)
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, display_name, avatar_url, visibility")
    .eq("username", params.username.toLowerCase())
    .maybeSingle<ProfileRow>();

  const displayName = profile?.display_name ?? profile?.username ?? params.username;
  const initial = displayName[0]?.toUpperCase() ?? "?";

  if (!profile) {
    return (
      <main className="page-container section-wrapper">
        <div className="flex flex-col items-center gap-6 py-20 text-center">
          <p className="type-body-lg text-on-surface-variant keep-all">
            @{params.username} 프로필을 찾을 수 없어요.
          </p>
        </div>
      </main>
    );
  }

  const isOwner = viewer.id === profile.id;

  // 접근 제어: 본인 / 공개 프로필은 열람 가능. followers는 팔로워만.
  let canView = isOwner || profile.visibility === "public";
  if (!canView && profile.visibility === "followers") {
    const { data: follow } = await supabase
      .from("follows")
      .select("follower_id")
      .eq("follower_id", viewer.id)
      .eq("following_id", profile.id)
      .maybeSingle();
    canView = Boolean(follow);
  }

  // 히스토리 조회: 본인은 전체, 그 외에는 공개 결과만.
  let results: ResultRow[] = [];
  if (canView) {
    let query = supabase
      .from("results")
      .select("id, style_label, start_domain, created_at")
      .eq("profile_id", profile.id)
      .order("created_at", { ascending: false })
      .limit(20);
    if (!isOwner) query = query.eq("is_public", true);
    const { data } = await query.returns<ResultRow[]>();
    results = data ?? [];
  }

  return (
    <main className="page-container section-wrapper">
      {/* ── 프로필 헤더 ────────────────────────────────────────────────── */}
      <section className="mb-12 flex items-center gap-5">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-surface-variant font-headline text-[28px] font-black text-on-background">
          {initial}
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="type-headline-lg">{displayName}</h1>
          <p className="type-body-sm text-on-surface-variant">@{profile.username}</p>
        </div>
      </section>

      {/* ── 스타일 히스토리 ─────────────────────────────────────────────── */}
      <section>
        <h2 className="type-headline-sm mb-6">스타일 히스토리</h2>

        {!canView ? (
          <div className="flex flex-col items-center gap-6 py-20 text-center">
            <p className="type-body-lg text-on-surface-variant keep-all">
              비공개 프로필이에요. 스타일 히스토리를 볼 수 없어요.
            </p>
          </div>
        ) : !results || results.length === 0 ? (
          <div className="flex flex-col items-center gap-6 py-20 text-center">
            <p className="type-body-lg text-on-surface-variant keep-all">
              {isOwner ? "아직 저장된 분석 결과가 없어요." : "아직 공개된 분석 결과가 없어요."}
            </p>
            {isOwner && (
              <Link
                href="/select"
                className="rounded-full bg-primary-container px-8 py-3 text-white type-body-md hover:opacity-90 transition-opacity"
              >
                지금 분석 시작하기
              </Link>
            )}
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
