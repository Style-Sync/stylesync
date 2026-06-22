"use client";

/**
 * TODO: 추후 다른 페이지에서도 재사용될 예정
 * - 디자인 시스템 Button 컴포넌트(@/components/ui/button) 사용
 * - 관련 이슈: #14 (단계별 이동 버튼)
 */

import { useRouter } from "next/navigation";

import { ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type BottomNavProps = {
  prevPath?: string;
  nextPath?: string;
  prevLabel?: string;
  nextLabel?: string;
  isNextDisabled?: boolean;
  onNext?: () => void;
  isLastStep?: boolean;
  /** 다음 액션 진행 중 여부 — 버튼 비활성 + 스피너 + 중복 클릭 방지 (#34) */
  isLoading?: boolean;
  /** 로딩 중 버튼 라벨 (미지정 시 nextLabel 유지) */
  loadingLabel?: string;
};

export const BottomNav = ({
  prevPath,
  nextPath,
  prevLabel = "이전으로",
  nextLabel = "다음으로",
  isNextDisabled = false,
  onNext,
  isLastStep = false,
  isLoading = false,
  loadingLabel,
}: BottomNavProps) => {
  const router = useRouter();

  const handlePrev = () => {
    if (isLoading) return;
    if (prevPath) router.push(prevPath);
    else router.back();
  };

  const handleNext = () => {
    // 비활성 / 로딩 중 중복 실행 방지
    if (isNextDisabled || isLoading) return;
    if (onNext) onNext();
    if (nextPath) router.push(nextPath);
  };

  const nextIcon = isLoading ? (
    <Loader2 size={16} className="animate-spin" />
  ) : isLastStep ? (
    <ArrowRight size={16} />
  ) : undefined;

  return (
    <div className="flex items-center justify-between gap-4 py-6">
      <Button variant="stroke" size="sm" onClick={handlePrev} disabled={isLoading}>
        {prevLabel}
      </Button>

      <Button
        variant="primary"
        size="sm"
        onClick={handleNext}
        disabled={isNextDisabled || isLoading}
        aria-busy={isLoading}
        icon={nextIcon}
        iconPosition="right"
      >
        {isLoading ? (loadingLabel ?? nextLabel) : nextLabel}
      </Button>
    </div>
  );
};
