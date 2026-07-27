import Link from "next/link";

import { requireAuthenticatedUser } from "@/lib/auth/guards";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { StyleLabel } from "@/types/result";

interface TimelineEntry {
  id: string;
  style_label: StyleLabel;
  start_domain: string;
  created_at: string;
}

const DOMAIN_LABEL: Record<string, string> = {
  music: "MUSIC",
  movie: "MOVIE",
  fashion: "FASHION",
};

export default async function TimelinePage() {
  const user = await requireAuthenticatedUser();
  const supabase = await createSupabaseServerClient();

  const { data } = await supabase
    .from("results")
    .select("id, style_label, start_domain, created_at")
    .eq("profile_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50)
    .returns<TimelineEntry[]>();

  const entries = data ?? [];

  return (
    <div className="page-container section-wrapper">
      <header className="mb-10">
        <h1 className="type-headline-lg keep-all">
          스타일 <span className="text-primary-container">타임라인</span>
        </h1>
        <p className="type-body-lg text-on-surface-variant mt-2">
          나의 취향 변화를 시간순으로 확인하세요.
        </p>
      </header>

      {entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3 text-center">
          <p className="type-body-lg text-on-surface-variant keep-all">
            아직 저장된 분석 결과가 없어요.
          </p>
          <Link
            href="/select"
            className="font-korean text-body-md text-primary underline underline-offset-4"
          >
            지금 분석 시작하기
          </Link>
        </div>
      ) : (
        <ol className="relative border-l border-outline-variant ml-4">
          {entries.map((entry) => {
            const date = new Date(entry.created_at);
            const dateLabel = date.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            const timeLabel = date.toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <li key={entry.id} className="mb-8 ml-6">
                {/* 타임라인 점 */}
                <span
                  className="absolute -left-2.5 w-5 h-5 rounded-full border-2 border-background"
                  style={{ backgroundColor: entry.style_label.themeColor }}
                  aria-hidden="true"
                />

                {/* 날짜 */}
                <p className="font-korean text-body-xs text-on-surface-variant mb-2">
                  {dateLabel} · {timeLabel} ·{" "}
                  <span className="font-headline uppercase text-label-xs">
                    {DOMAIN_LABEL[entry.start_domain] ?? entry.start_domain}
                  </span>
                </p>

                {/* 스타일 레이블 카드 */}
                <Link href={`/result/${entry.id}`} className="block group">
                  <div
                    className="rounded-[16px] p-5 max-w-md group-hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: entry.style_label.themeColor }}
                  >
                    <p className="font-headline font-black text-body-lg text-on-background uppercase mb-1">
                      {entry.style_label.title}
                    </p>
                    <p className="font-korean text-body-sm text-on-background/70 keep-all line-clamp-2">
                      {entry.style_label.description}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
