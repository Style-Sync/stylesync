"use client";

import { DomainGuard } from "@/components/domain/DomainGuard";
import { FashionInput } from "@/components/domain/fashionInput";
import { MovieInput } from "@/components/domain/movieInput";
import { MusicInput } from "@/components/domain/musicInput";
import { BottomNav } from "@/components/layout/BottomNav";
import { ProgressBar } from "@/components/layout/ProgressBar";
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

// TODO: 실제 분석 resultId로 교체 (현재 mock 매칭용)
const RESULT_PATH = "/result/mock-1";

export default function TasteStep1Page({ params }: ITastePageProps) {
  const domain = params.domain as Domain;
  const content = DOMAIN_CONTENT[domain];

  // 1뎁스 스타일 선택 여부로 다음 버튼 활성화
  const selectedStyles = useTasteStore((s) => s.selectedStyles);
  const isStyleSelected = Boolean(selectedStyles[domain]);

  // fashion은 detail(2뎁스) 없이 결과로 직행
  const isFashion = domain === "fashion";
  const nextPath = isFashion ? RESULT_PATH : `/taste/${domain}/detail`;
  const totalSteps = isFashion ? 1 : 2;

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

        <BottomNav prevPath="/select" nextPath={nextPath} isNextDisabled={!isStyleSelected} />
      </div>
    </DomainGuard>
  );
}
