"use client";

import { useCallback, useState } from "react";

import { useRouter } from "next/navigation";

import { DomainGuard } from "@/components/domain/DomainGuard";
import { FashionInput } from "@/components/domain/fashionInput";
import { MovieInput } from "@/components/domain/movieInput";
import { MusicInput } from "@/components/domain/musicInput";
import { BottomNav } from "@/components/layout/BottomNav";
import { ProgressBar } from "@/components/layout/ProgressBar";
import { useInference } from "@/hooks/useInference";
import { buildInferenceRequest } from "@/lib/inference/normalizeRequest";
import { useResultStore } from "@/store/resultStore";
import { useTasteStore } from "@/store/tasteStore";
import type { Domain } from "@/types/taste";

interface ITastePageProps {
  params: { domain: string };
}

const DOMAIN_CONTENT: Record<Domain, { titleMain: string; description: string }> = {
  music: {
    titleMain: "뮤직 스타일",
    description: "당신의 청각적 취향을 대변하는 뮤직 마스코트를 선택하세요.",
  },
  movie: {
    titleMain: "영화 취향",
    description: "당신의 시네마틱 감성을 대변하는 영화 마스코트를 선택하세요.",
  },
  fashion: {
    titleMain: "패션 스타일",
    description: "당신의 고유한 감각을 대변하는 스타일 마스코트를 선택하세요.",
  },
};

export default function TasteStep1Page({ params }: ITastePageProps) {
  const router = useRouter();
  const domain = params.domain as Domain;
  const content = DOMAIN_CONTENT[domain];

  const selectedStyles = useTasteStore((s) => s.selectedStyles);
  const musicSelections = useTasteStore((s) => s.musicSelections);
  const movieSelections = useTasteStore((s) => s.movieSelections);
  const fashionSelections = useTasteStore((s) => s.fashionSelections);
  const isStyleSelected = Boolean(selectedStyles[domain]);

  const saveResult = useResultStore((s) => s.saveResult);
  const { infer, isLoading: isAnalyzing } = useInference();

  const [analyzeError, setAnalyzeError] = useState<string | null>(null);

  const isFashion = domain === "fashion";
  const totalSteps = isFashion ? 1 : 2;

  const handleFashionAnalyze = useCallback(async () => {
    setAnalyzeError(null);
    try {
      const request = buildInferenceRequest({
        domain: "fashion",
        musicSelections,
        movieSelections,
        fashionSelections,
        selectedStyles,
      });
      const result = await infer(request);
      saveResult(result);
      router.push(`/result/${result.id}`);
    } catch (e) {
      setAnalyzeError(e instanceof Error ? e.message : "분석에 실패했습니다.");
    }
  }, [
    musicSelections,
    movieSelections,
    fashionSelections,
    selectedStyles,
    infer,
    saveResult,
    router,
  ]);

  return (
    <DomainGuard domain={params.domain}>
      <div className="page-container section-wrapper">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="type-headline-lg keep-all">
              {content?.titleMain} <span className="text-primary-container">셀렉션</span>
            </h1>
            <p className="type-body-lg keep-all text-on-surface-variant">{content?.description}</p>
          </div>
          <ProgressBar currentStep={1} totalSteps={totalSteps} />
        </header>

        <section className="min-h-[60vh]">
          {domain === "music" && <MusicInput />}
          {domain === "movie" && <MovieInput />}
          {domain === "fashion" && <FashionInput />}
        </section>

        {analyzeError && <p className="mb-4 text-center text-sm text-red-400">{analyzeError}</p>}

        {isFashion ? (
          <BottomNav
            prevPath="/select"
            isNextDisabled={!isStyleSelected || isAnalyzing}
            onNext={handleFashionAnalyze}
            nextLabel={isAnalyzing ? "분석 중..." : "스타일 분석 시작하기"}
            isLastStep
          />
        ) : (
          <BottomNav
            prevPath="/select"
            nextPath={`/taste/${domain}/detail`}
            isNextDisabled={!isStyleSelected}
          />
        )}
      </div>
    </DomainGuard>
  );
}
