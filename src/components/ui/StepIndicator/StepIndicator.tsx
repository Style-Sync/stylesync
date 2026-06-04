"use client";

import { stepIndicatorTrack, stepIndicatorVariants } from "./StepIndicator.variants";

import type { IStepIndicatorProps, StepIndicatorWidth } from "./StepIndicator.types";

// width 값과 Tailwind 클래스 매핑 (정적으로 작성해야 JIT가 인식)
const WIDTH_CLASS_MAP: Record<StepIndicatorWidth, string> = {
  "160": "w-[160px]",
  "220": "w-[220px]",
  "358": "w-[358px]",
  full: "w-full",
};

export const StepIndicator = ({
  current,
  total,
  variant = "active",
  label = "STEP",
  width,
  className,
  ...props
}: IStepIndicatorProps) => {
  const safeTotal = Math.max(total, 1);
  const safeCurrent = Math.max(0, Math.min(current, safeTotal));

  const percent =
    variant === "completed" ? 100 : variant === "inactive" ? 0 : (safeCurrent / safeTotal) * 100;

  const { fill, text } = stepIndicatorVariants[variant];

  const widthClass = width !== undefined ? WIDTH_CLASS_MAP[width] : "w-fit min-w-[160px]";

  return (
    <div className={`${widthClass} ${className ?? ""}`} {...props}>
      <div className="mb-2 flex items-center justify-between gap-5">
        <span className={`font-label font-extrabold ${text}`}>{label}</span>
        <span className={`font-label font-extrabold ${text}`}>
          {safeCurrent}/{safeTotal}
        </span>
      </div>

      <div
        className={`h-1.5 w-full overflow-hidden rounded-full ${stepIndicatorTrack}`}
        role="progressbar"
        aria-valuenow={safeCurrent}
        aria-valuemin={0}
        aria-valuemax={safeTotal}
        aria-label={label}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-300 ease-out ${fill}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
