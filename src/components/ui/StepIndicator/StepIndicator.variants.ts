import type { StepIndicatorVariant } from "./StepIndicator.types";

interface IVariantStyle {
  /** 진행바 채워지는 색 */
  fill: string;
  /** 라벨/카운터 텍스트 색 */
  text: string;
}

export const stepIndicatorVariants: Record<StepIndicatorVariant, IVariantStyle> = {
  active: {
    fill: "bg-primary-container",
    text: "text-on-background",
  },
  inactive: {
    fill: "bg-neutral-300",
    text: "text-neutral-400",
  },
  completed: {
    fill: "bg-primary-container",
    text: "text-on-background",
  },
};

export const stepIndicatorTrack = "bg-neutral-200";
