"use client";

import { useCallback, useState } from "react";

import { RecommendCard } from "@/components/result/recommendCard";
import { ResultPageError } from "@/components/result/ResultPageError";
import { ResultPageSkeleton } from "@/components/result/ResultPageSkeleton";
import { ShareCard } from "@/components/result/shareCard";
import { StyleLabelHero } from "@/components/result/styleLabel";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/Icon";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import type { StyleResult } from "@/types/result";

// X(Twitter) 아이콘 — Icon 레지스트리에 없어서 인라인 처리
const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M15.18 2h2.6l-5.68 6.49L18.8 18h-5.23l-4.1-5.37L4.6 18H2l6.08-6.95L1.4 2h5.36l3.71 4.86L15.18 2Zm-.91 14.4h1.44L5.78 3.48H4.24l10.03 12.92Z" />
  </svg>
);

// ── Mock data (shell 단계 — 실제 API 연동 시 제거) ───────────────────────────
const MOCK_RESULT: StyleResult = {
  id: "mock-1",
  styleLabel: {
    title: "Melancholic Softboy",
    description:
      "향수 어린 빈티지 미학과 현대적인 감수성이 정교하게 어우러진 스타일입니다. 차분한 어스 톤과 오버사이즈 실루엣이 당신의 정체성을 정의합니다.",
    themeColor: "#e6e6fa",
    mood: { energy: "low", tone: "dark", aesthetic: "indie" },
  },
  music: [
    { id: "1", name: "Blonde", artist: "Frank Ocean", image: "", previewUrl: null },
    { id: "2", name: "Ivy", artist: "Frank Ocean", image: "", previewUrl: null },
    { id: "3", name: "Nights", artist: "Frank Ocean", image: "", previewUrl: null },
  ],
  movie: [
    { id: 1, title: "Call Me By Your Name", posterPath: "", genres: ["Drama", "Romance"] },
    { id: 2, title: "Moonlight", posterPath: "", genres: ["Drama"] },
    { id: 3, title: "Lost in Translation", posterPath: "", genres: ["Drama"] },
  ],
  fashion: [
    { keyword: "Oversized Earth Tone Coat", image: "" },
    { keyword: "Minimal Monochrome Set", image: "" },
    { keyword: "Soft Denim Layer", image: "" },
  ],
  createdAt: new Date().toISOString(),
};

// ─────────────────────────────────────────────────────────────────────────────

interface IResultPageProps {
  params: { id: string };
}

export default function ResultPage({ params: _params }: IResultPageProps) {
  // TODO: _params.id로 API에서 실제 데이터 fetch
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const { styleLabel, music, movie, fashion } = MOCK_RESULT;
  const { playingUrl, isPlaying: isAudioPlaying, toggle } = useAudioPlayer();

  const handleReanalyze = useCallback(() => {
    // TODO: 재분석 플로우 연결
  }, []);

  const handleShareCard = useCallback(() => {
    // TODO: 공유 카드 모달 연결
  }, []);

  if (isLoading) return <ResultPageSkeleton />;
  if (error) return <ResultPageError message={error} />;

  return (
    <div className="bg-background">
      <div className="mx-auto px-4 md:px-9 lg:px-[120px] max-w-[1280px] py-12 lg:py-20">
        {/* ── Hero Section (#72) ────────────────────────────────────────────── */}
        <StyleLabelHero
          title={styleLabel.title}
          description={styleLabel.description}
          themeColor={styleLabel.themeColor}
          onReanalyze={handleReanalyze}
          onShareCard={handleShareCard}
        />

        {/* ── Domain Sections ───────────────────────────────────────────────── */}
        <div className="flex flex-col gap-16 lg:gap-20 mb-16 lg:mb-20">
          {/* Music Mood */}
          <section>
            <div className="flex items-center justify-between mb-6 lg:mb-8">
              <h2 className="font-headline font-black text-headline-md lg:text-headline-lg text-on-background">
                MUSIC MOOD
              </h2>
              <span className="font-korean font-medium text-body-sm text-on-surface-variant cursor-pointer hover:text-on-background transition-colors">
                전체 플레이리스트
              </span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
              {music.map((track) => (
                <div key={track.id} className="min-w-[220px] flex-shrink-0 md:min-w-0">
                  <RecommendCard
                    domain="music"
                    title={track.name}
                    subtitle={track.artist}
                    imageUrl={track.image || undefined}
                    previewUrl={track.previewUrl}
                    isPlaying={
                      isAudioPlaying && playingUrl === track.previewUrl && track.previewUrl !== null
                    }
                    onPreviewClick={track.previewUrl ? () => toggle(track.previewUrl!) : undefined}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Cinematic Mood */}
          <section>
            <div className="flex items-center justify-between mb-6 lg:mb-8">
              <h2 className="font-headline font-black text-headline-md lg:text-headline-lg text-on-background">
                CINEMATIC MOOD
              </h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
              {movie.map((m) => (
                <div key={m.id} className="min-w-[220px] flex-shrink-0 md:min-w-0">
                  <RecommendCard
                    domain="movie"
                    title={m.title}
                    subtitle={m.genres.join(" · ")}
                    imageUrl={m.posterPath || undefined}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Fashion Mood */}
          <section>
            <div className="flex items-center justify-between mb-6 lg:mb-8">
              <h2 className="font-headline font-black text-headline-md lg:text-headline-lg text-on-background">
                FASHION MOOD
              </h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
              {fashion.map((item, i) => (
                <div key={i} className="min-w-[220px] flex-shrink-0 md:min-w-0">
                  <RecommendCard
                    domain="fashion"
                    title={item.keyword}
                    imageUrl={item.image || undefined}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Export Identity Section ───────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-on-background rounded-[48px] p-6 md:p-10 lg:p-24 mb-4 lg:mb-6">
          <div
            className="absolute top-[156px] left-0 pointer-events-none select-none whitespace-nowrap"
            aria-hidden="true"
          >
            <span className="font-headline font-black text-[72px] leading-none text-white/[0.03]">
              STYLESYNC ARCHIVE
            </span>
          </div>

          <div className="relative flex flex-col lg:flex-row lg:gap-24 lg:items-center">
            <div className="flex flex-col gap-6 lg:w-[376px] flex-shrink-0 mb-10 lg:mb-0">
              <h2 className="font-headline font-black text-white text-display-sm lg:text-display-lg leading-none uppercase">
                EXPORT
                <br />
                IDENTITY
              </h2>
              <p className="font-korean font-normal text-white/60 text-body-lg keep-all">
                당신의 디지털 페르소나를 세상에 보여주세요. 이 특별한 결과물을 공유하고 당신과 같은
                스타일 클러스터에 속한 영혼들을 찾아보세요.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="light"
                  size="sm"
                  icon={<Icon name="instagram" size={20} />}
                  iconPosition="left"
                >
                  Instagram 공유
                </Button>
                <Button variant="dark" size="sm" icon={<XIcon />} iconPosition="left">
                  Twitter 공유
                </Button>
              </div>
            </div>

            {/* ShareCard 프리뷰 — TODO: ISSUE-168-169 머지 후 새 props로 교체 */}
            <div className="lg:w-[376px] flex-shrink-0 flex justify-center lg:justify-start">
              <ShareCard
                styleLabel={{
                  title: styleLabel.title,
                  description: styleLabel.description,
                }}
                themeColor={styleLabel.themeColor}
                mood={styleLabel.mood}
                music={{
                  title: music[0]?.name ?? "",
                  artist: music[0]?.artist ?? "",
                }}
                movie={{ title: movie[0]?.title ?? "" }}
                fashion={{ keyword: fashion[0]?.keyword ?? "" }}
              />
            </div>
          </div>
        </section>

        {/* ── Guest Save Banner ─────────────────────────────────────────────── */}
        <section className="flex flex-col items-center gap-4 text-center bg-surface-variant rounded-[24px] px-8 py-8 md:flex-row md:items-center md:justify-between md:text-left md:py-0 md:h-[116px]">
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-3">
            <span className="text-[24px]" aria-hidden="true">
              ✨
            </span>
            <p className="font-korean font-normal text-body-lg text-on-background keep-all">
              결과를 저장하고 싶다면? 로그인하면 나만의 스타일 히스토리를 쌓을 수 있어요.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button variant="dark" size="sm">
              Google로 시작하기
            </Button>
            <Button variant="ghost" size="sm">
              나중에 할게요 →
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
