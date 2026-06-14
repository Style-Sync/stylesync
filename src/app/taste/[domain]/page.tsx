"use client";

import { DomainGuard } from "@/components/domain/DomainGuard";
import { BottomNav } from "@/components/layout/BottomNav";
import { ProgressBar } from "@/components/layout/ProgressBar";
import type { Domain } from "@/types/taste";

interface ITastePageProps {
  params: { domain: string };
}

// 도메인별 콘텐츠 매핑
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
  // TODO: 실제 선택값으로 교체
  const isStyleSelected = true;

  // DomainGuard가 유효성 검증하므로 안전하게 캐스팅
  const content = DOMAIN_CONTENT[params.domain as Domain];

  return (
    <DomainGuard domain={params.domain}>
      <div className="page-container section-wrapper">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="type-headline-lg">
              {content?.titleMain} <span className="text-orange-500">셀렉션</span>
            </h1>

            <p className="type-body-lg text-stone-600">{content?.description}</p>
          </div>
          <ProgressBar currentStep={1} totalSteps={2} />
        </header>

        <section className="min-h-[60vh]">
          {/* 선택 UI - 다음 이슈에서 */}
          <p className="text-stone-400">선택 UI 영역</p>
        </section>

        <BottomNav
          prevPath="/select"
          nextPath={`/taste/${params.domain}/detail`}
          isNextDisabled={!isStyleSelected}
        />
      </div>
    </DomainGuard>
  );
}
