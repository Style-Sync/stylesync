import type React from "react";

export type StepIndicatorVariant = "active" | "inactive" | "completed";

/** StepIndicator의 너비 옵션 (디자인 시스템 정의) */
export type StepIndicatorWidth = "160" | "220" | "358" | "full";

export interface IStepIndicatorProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** 현재 스텝 (1부터 시작) */
  current: number;
  /** 전체 스텝 수 */
  total: number;
  /** 진행 상태 (기본값: "active") */
  variant?: StepIndicatorVariant;
  /** 좌측 라벨 텍스트 (기본값: "STEP") */
  label?: string;
  /**
   * 너비 옵션
   * - `"160"` | `"220"` | `"358"`: 고정 너비(px)
   * - `"full"`: 부모 너비 100%
   * - 미지정: 콘텐츠 크기에 맞춤(최소 160px 보장)
   */
  width?: StepIndicatorWidth;
}
