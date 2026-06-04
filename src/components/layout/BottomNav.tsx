"use client";

/**
 * TODO: 디자인 시스템 Button 컴포넌트로 교체 필요
 * - 관련 이슈: #14
 */

import { useRouter } from "next/navigation";

type BottomNavProps = {
  prevPath?: string;
  nextPath?: string;
  prevLabel?: string;
  nextLabel?: string;
  isNextDisabled?: boolean;
  onNext?: () => void;
  isLastStep?: boolean;
};

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export const BottomNav = ({
  prevPath,
  nextPath,
  prevLabel = "이전으로",
  nextLabel = "다음으로",
  isNextDisabled = false,
  onNext,
  isLastStep = false,
}: BottomNavProps) => {
  const router = useRouter();

  const handlePrev = () => {
    if (prevPath) router.push(prevPath);
    else router.back();
  };

  const handleNext = () => {
    if (onNext) onNext();
    if (nextPath) router.push(nextPath);
  };

  return (
    <div className="flex flex-col items-stretch justify-between gap-3 py-6 md:flex-row md:items-center">
      <button
        type="button"
        onClick={handlePrev}
        className="cta-width rounded-full border border-orange-500 px-5 py-2 text-sm text-orange-500 transition hover:bg-orange-50"
      >
        {prevLabel}
      </button>

      <button
        type="button"
        onClick={handleNext}
        disabled={isNextDisabled}
        className="cta-width flex items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {nextLabel}
        {isLastStep && <ArrowIcon />}
      </button>
    </div>
  );
};
