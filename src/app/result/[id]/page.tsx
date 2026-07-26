"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import { RecommendCard } from "@/components/result/recommendCard";
import { ResultPageError } from "@/components/result/ResultPageError";
import { ShareCard } from "@/components/result/shareCard";
import { StyleLabelHero } from "@/components/result/styleLabel";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/Icon";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useAuthSessionStore } from "@/store/authSessionStore";
import { useResultStore } from "@/store/resultStore";
import { useTasteStore } from "@/store/tasteStore";

// X(Twitter) 아이콘 — Icon 레지스트리에 없어서 인라인 처리
const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M15.18 2h2.6l-5.68 6.49L18.8 18h-5.23l-4.1-5.37L4.6 18H2l6.08-6.95L1.4 2h5.36l3.71 4.86L15.18 2Zm-.91 14.4h1.44L5.78 3.48H4.24l10.03 12.92Z" />
  </svg>
);

interface IResultPageProps {
  params: { id: string };
}

export default function ResultPage({ params }: IResultPageProps) {
  const router = useRouter();
  const result = useResultStore((s) => s.results[params.id]);
  const saveStatus = useResultStore((s) => s.saveStatuses[params.id]);
  const saveResult = useResultStore((s) => s.saveResult);
  const resetTaste = useTasteStore((s) => s.reset);

  const isAuthenticated = useAuthSessionStore((s) => s.isAuthenticated);
  const loginBannerRef = useRef<HTMLElement>(null);

  const { playingUrl, isPlaying: isAudioPlaying, toggle } = useAudioPlayer();
  const [shareCopied, setShareCopied] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  // 세션스토리지에 없으면 DB에서 조회
  useEffect(() => {
    if (result || isFetching || fetchFailed) return;
    setIsFetching(true);
    fetch(`/api/results/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => saveResult(data.result))
      .catch(() => setFetchFailed(true))
      .finally(() => setIsFetching(false));
  }, [result, params.id, isFetching, fetchFailed, saveResult]);

  const handleReanalyze = useCallback(() => {
    resetTaste();
    router.push("/select");
  }, [resetTaste, router]);

  const handleShareCard = useCallback(async () => {
    if (!isAuthenticated) {
      loginBannerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const shareData = {
      title: result ? `${result.styleLabel.title} — StyleSync` : "StyleSync",
      text: result?.styleLabel.description ?? "나만의 크로스 도메인 스타일을 확인해보세요.",
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // 사용자 취소 시 무시
      }
    }
    await navigator.clipboard.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  }, [isAuthenticated, result]);

  const handleDownloadCard = useCallback(async () => {
    if (!result || isDownloading) return;
    setIsDownloading(true);
    try {
      const searchParams = new URLSearchParams({
        variant: "story",
        title: result.styleLabel.title,
        description: result.styleLabel.description,
        themeColor: result.styleLabel.themeColor,
        music: result.music[0]?.name ?? "",
        movie: result.movie[0]?.title ?? "",
        fashion: result.fashion[0]?.keyword ?? "",
      });
      const res = await fetch(`/api/og?${searchParams.toString()}`);
      if (!res.ok) throw new Error("이미지 생성에 실패했습니다.");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `StyleSync_${result.styleLabel.title.replace(/\s+/g, "_")}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      setDownloadError("이미지 저장에 실패했습니다. 다시 시도해주세요.");
      setTimeout(() => setDownloadError(null), 3000);
    } finally {
      setIsDownloading(false);
    }
  }, [result, isDownloading]);

  if (!result) {
    if (isFetching) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="type-body-lg text-on-surface-variant">결과를 불러오는 중...</p>
        </div>
      );
    }
    return <ResultPageError message="결과를 찾을 수 없어요. 다시 분석해 주세요." />;
  }

  const { styleLabel, music, movie, fashion } = result;

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
            <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible xl:gap-6">
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
            <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible xl:gap-6">
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
            <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible xl:gap-6">
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
                  onClick={handleShareCard}
                >
                  {shareCopied ? "링크 복사됨!" : "Instagram 공유"}
                </Button>
                <Button
                  variant="dark"
                  size="sm"
                  icon={<XIcon />}
                  iconPosition="left"
                  onClick={() => {
                    const text = result
                      ? `${result.styleLabel.title}\n${result.styleLabel.description} #StyleSync`
                      : "#StyleSync";
                    window.open(
                      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                >
                  Twitter 공유
                </Button>
                <Button
                  variant="dark"
                  size="sm"
                  icon={<Icon name="download" size={20} />}
                  iconPosition="left"
                  onClick={handleDownloadCard}
                  disabled={isDownloading}
                >
                  {isDownloading ? "저장 중..." : "이미지 저장"}
                </Button>
              </div>
              {downloadError && (
                <p className="font-korean text-body-sm text-red-400" role="alert">
                  {downloadError}
                </p>
              )}
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

        {/* ── Save Banner ───────────────────────────────────────────────────── */}
        {isAuthenticated ? (
          <section className="flex flex-col items-center gap-4 text-center bg-surface-variant rounded-[24px] px-8 py-8 md:flex-row md:items-center md:justify-between md:text-left md:py-0 md:h-[116px]">
            <div className="flex flex-col items-center gap-2 md:flex-row md:gap-3">
              <span className="text-[24px]" aria-hidden="true">
                {saveStatus === "error" ? "⚠️" : saveStatus === "saving" ? "⏳" : "✅"}
              </span>
              <p className="font-korean font-normal text-body-lg text-on-background keep-all">
                {saveStatus === "error"
                  ? "결과 저장에 실패했어요. 네트워크 상태를 확인하고 다시 시도해주세요."
                  : saveStatus === "saving"
                    ? "분석 결과를 저장하고 있어요..."
                    : "분석 결과가 히스토리에 저장됐어요. 마이 페이지에서 다시 확인할 수 있어요."}
              </p>
            </div>
            {saveStatus !== "error" && (
              <div className="flex items-center gap-3 flex-shrink-0">
                <Button variant="dark" size="sm" onClick={() => router.push("/profile")}>
                  히스토리 보기
                </Button>
              </div>
            )}
          </section>
        ) : (
          <section
            ref={loginBannerRef}
            className="flex flex-col items-center gap-4 text-center bg-surface-variant rounded-[24px] px-8 py-8 md:flex-row md:items-center md:justify-between md:text-left md:py-0 md:h-[116px]"
          >
            <div className="flex flex-col items-center gap-2 md:flex-row md:gap-3">
              <span className="text-[24px]" aria-hidden="true">
                ✨
              </span>
              <p className="font-korean font-normal text-body-lg text-on-background keep-all">
                결과를 저장하고 싶다면? 로그인하면 나만의 스타일 히스토리를 쌓을 수 있어요.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Button variant="dark" size="sm" onClick={() => router.push("/login")}>
                Google로 시작하기
              </Button>
              <Button variant="ghost" size="sm">
                나중에 할게요 →
              </Button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
