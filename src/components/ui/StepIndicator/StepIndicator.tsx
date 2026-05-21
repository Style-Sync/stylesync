"use client";

import { stepIndicatorTrack, stepIndicatorVariants } from "./StepIndicator.variants";

import type { IStepIndicatorProps } from "./StepIndicator.types";

export const StepIndicator = ({
  current,
  total,
  variant = "active",
  label = "STEP",
  fullWidth = false,
  className,
  ...props
}: IStepIndicatorProps) => {
  const safeTotal = Math.max(total, 1);
  const safeCurrent = Math.max(0, Math.min(current, safeTotal));

  const percent =
    variant === "completed" ? 100 : variant === "inactive" ? 0 : (safeCurrent / safeTotal) * 100;

  const { fill, text } = stepIndicatorVariants[variant];

  return (
    <div className={`${fullWidth ? "w-full" : ""} ${className ?? ""}`} {...props}>
      <div className="mb-2 flex items-center justify-between">
        <span className={`text-sm font-semibold tracking-wide ${text}`}>{label}</span>

        <span className={`text-sm ${text}`}>
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
