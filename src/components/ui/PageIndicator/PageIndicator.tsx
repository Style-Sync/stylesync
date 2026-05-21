"use client";

import type { IPageIndicatorProps } from "./PageIndicator.types";

export const PageIndicator = ({
  total,
  current,
  onChange,
  className,
  ...props
}: IPageIndicatorProps) => {
  const safeTotal = Math.max(total, 1);
  const safeCurrent = Math.max(0, Math.min(current, safeTotal - 1));
  const isInteractive = typeof onChange === "function";

  return (
    <div
      role="group"
      aria-label={`페이지 ${safeCurrent + 1} / ${safeTotal}`}
      className={`flex items-center gap-2 ${className ?? ""}`}
      {...props}
    >
      {Array.from({ length: safeTotal }).map((_, idx) => {
        const isActive = idx === safeCurrent;
        const dotClass = `h-3 rounded-full transition-all duration-300 ease-out ${
          isActive ? "w-12 bg-primary-container" : "w-3 bg-neutral-200"
        }`;

        if (isInteractive) {
          return (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.currentTarget.blur();
                onChange?.(idx);
              }}
              aria-label={`${idx + 1}번 페이지로 이동`}
              aria-current={isActive ? "page" : undefined}
              className={`${dotClass} cursor-pointer hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container focus-visible:ring-offset-2`}
            />
          );
        }

        return <span key={idx} aria-hidden="true" className={dotClass} />;
      })}
    </div>
  );
};
