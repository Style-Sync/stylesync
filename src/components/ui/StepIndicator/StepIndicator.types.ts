import type React from "react";

export type StepIndicatorVariant = "active" | "inactive" | "completed";

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
  /** 가로 폭 100% 사용 여부 */
  fullWidth?: boolean;
}
