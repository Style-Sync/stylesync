"use client";

/**
 * TODO: 추후 다른 페이지에서도 재사용될 예정
 * - 디자인 시스템 Button 컴포넌트(@/components/ui/button) 사용
 * - 관련 이슈: #14 (단계별 이동 버튼)
 */

import { useRouter } from "next/navigation";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type BottomNavProps = {
  prevPath?: string;
  nextPath?: string;
  prevLabel?: string;
  nextLabel?: string;
  isNextDisabled?: boolean;
  onNext?: () => void;
  isLastStep?: boolean;
};

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
    <div className="flex items-center justify-between gap-4 py-6">
      <Button variant="stroke" size="sm" onClick={handlePrev}>
        {prevLabel}
      </Button>

      <Button
        variant="primary"
        size="sm"
        onClick={handleNext}
        disabled={isNextDisabled}
        icon={isLastStep ? <ArrowRight size={16} /> : undefined}
        iconPosition="right"
      >
        {nextLabel}
      </Button>
    </div>
  );
};
