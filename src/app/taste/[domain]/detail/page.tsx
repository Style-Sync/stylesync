"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { DomainGuard } from "@/components/domain/DomainGuard";
import { BottomNav } from "@/components/layout/BottomNav";
import { ProgressBar } from "@/components/layout/ProgressBar";
import { useTasteStore } from "@/store/tasteStore";

import type { Domain } from "@/types/taste";

interface ITasteDetailPageProps {
  params: { domain: string };
}

const DETAIL_CONTENT: Record<
  Domain,
  { titleMain: string; description: string; searchPlaceholder: string }
> = {
  music: {
    titleMain: "음악 취향",
    description:
      "가장 선호하는 스타일의 아티스트를 선택해 주세요. 선택한 아티스트들이 당신의 음악적 취향 프로필을 구성합니다.",
    searchPlaceholder: "아티스트 검색",
  },
  movie: {
    titleMain: "영화 취향",
    description:
      "가장 선호하는 스타일의 영화를 선택해 주세요. 선택한 영화들이 당신의 스타일 프로필을 구성합니다.",
    searchPlaceholder: "영화 검색",
  },
  fashion: {
    titleMain: "패션 취향",
    description:
      "가장 선호하는 스타일의 룩을 선택해 주세요. 선택한 룩들이 당신의 패션 취향 프로필을 구성합니다.",
    searchPlaceholder: "스타일 검색",
  },
};

// TODO: 디자인 시스템 Icon 세트로 교체 필요 (lucide-react 등 공용 라이브러리 사용 가능)
const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export default function TasteStep2Page({ params }: ITasteDetailPageProps) {
  const router = useRouter();
  const musicSelections = useTasteStore((s) => s.musicSelections);

  // TODO: 도메인별 selection 체크 로직 분기 필요
  const isReady = musicSelections.length > 0;

  // TODO: 실제 검색 로직 (필터링은 다음 이슈에서)
  const [searchQuery, setSearchQuery] = useState("");

  const content = DETAIL_CONTENT[params.domain as Domain];

  const handleAnalyze = () => {
    // TODO: 실제 분석 API 응답으로 받은 resultId 사용
    // 현재는 /result/[id] 페이지의 mock 데이터(mock-1) 매칭용
    const tempResultId = "mock-1";
    router.push(`/result/${tempResultId}`);
  };

  return (
    <DomainGuard domain={params.domain}>
      <div className="page-container section-wrapper">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="heading-section">
              {content?.titleMain} <span className="text-orange-500">선택</span>
            </h1>
            <p className="text-sm text-stone-600">{content?.description}</p>
          </div>
          <ProgressBar currentStep={2} totalSteps={2} />
        </header>

        {/* 
          TODO: 디자인 시스템 SearchInput 컴포넌트로 교체 필요
          - 현재 임시로 인라인 input + SVG 아이콘으로 구현
          - 별도 브랜치에서 작업 중인 공통 SearchInput / TextField가 머지되면
            <SearchInput value={searchQuery} onChange={...} placeholder={...} /> 형태로 교체
          - 실제 검색 필터링 로직도 후속 이슈에서 추가 예정
        */}
        {/* 검색바 */}
        <div className="relative mb-8 w-full">
          <div className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-stone-400">
            <SearchIcon />
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={content?.searchPlaceholder}
            className="w-full rounded-full bg-white py-3 pl-12 pr-5 text-sm shadow-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
          />
        </div>

        <section className="min-h-[60vh]">
          {/* 카드 그리드 - 다음 이슈에서 */}
          <p className="text-stone-400">선택 UI 영역</p>
        </section>

        <BottomNav
          prevPath={`/taste/${params.domain}`}
          prevLabel="이전으로"
          nextLabel="스타일 분석 시작하기"
          isNextDisabled={!isReady}
          onNext={handleAnalyze}
          isLastStep
        />
      </div>
    </DomainGuard>
  );
}