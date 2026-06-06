"use client";

import { Button } from "@/components/ui/button";

interface IResultPageErrorProps {
  message?: string;
  onRetry?: () => void;
}

export const ResultPageError = ({
  message = "결과를 불러오는 중 문제가 발생했어요.",
  onRetry,
}: IResultPageErrorProps) => (
  <div className="bg-background min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4 text-center">
    <p className="font-korean text-title-lg text-on-background keep-all">{message}</p>
    {onRetry && (
      <Button variant="stroke" size="sm" onClick={onRetry}>
        다시 시도하기
      </Button>
    )}
  </div>
);
