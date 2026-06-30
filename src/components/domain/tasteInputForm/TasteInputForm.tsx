"use client";

import { BottomNav } from "@/components/layout/BottomNav";
import { ProgressBar } from "@/components/layout/ProgressBar";

import type { ITasteInputFormProps } from "./tasteInputForm.types";

// TODO: 디자인 시스템 Icon 세트로 교체 필요
// (lucide-react 등 공용 라이브러리 사용 가능)
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

function getSelectionMessage(count: number, max: number): { text: string; done: boolean } {
  if (count >= max) return { text: "완벽해요! 분석을 시작할게요", done: true };
  return { text: `${max - count}개 더 선택해주세요`, done: false };
}

export function TasteInputForm({
  title,
  description,
  searchPlaceholder,
  searchQuery,
  onSearchChange,
  domain,
  children,
  isNextDisabled,
  onNext,
  selectionCount,
  maxSelections = 3,
}: ITasteInputFormProps) {
  const selectionMsg =
    selectionCount !== undefined ? getSelectionMessage(selectionCount, maxSelections) : null;
  return (
    <div className="page-container section-wrapper">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="type-headline-lg">
            {title}
            <span className="text-orange-500"> 선택</span>
          </h1>

          <p className="type-body-lg text-stone-600">{description}</p>
        </div>

        <ProgressBar currentStep={2} totalSteps={2} />
      </header>

      {/* 
        TODO: 디자인 시스템 SearchInput 컴포넌트로 교체 필요
        - 현재 임시로 인라인 input + SVG 아이콘으로 구현
        - 별도 브랜치에서 작업 중인 공통 SearchInput / TextField가 머지되면
          <SearchInput
            value={searchQuery}
            onChange={...}
            placeholder={searchPlaceholder}
          />
          형태로 교체
        - 실제 검색 필터링 로직은 후속 이슈에서 추가 예정
      */}
      {/* 검색바 */}
      <div className="relative mb-8 w-full">
        <div className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-stone-400">
          <SearchIcon />
        </div>

        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
          className="w-full rounded-full bg-white py-3 pl-12 pr-5 text-sm shadow-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
        />
      </div>

      <section className="min-h-[60vh]">{children}</section>

      {selectionMsg && (
        <p
          className={`mb-2 text-center text-sm font-medium ${
            selectionMsg.done ? "text-primary-container" : "text-stone-400"
          }`}
        >
          {selectionMsg.text}
        </p>
      )}

      <BottomNav
        prevPath={`/taste/${domain}`}
        prevLabel="이전으로"
        nextLabel="스타일 분석 시작하기"
        isNextDisabled={isNextDisabled}
        onNext={onNext}
        isLastStep
      />
    </div>
  );
}
