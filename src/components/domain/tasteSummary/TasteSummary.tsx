"use client";

import { X } from "lucide-react";

import { cn } from "@/lib/utils";

import type { ITasteSummaryProps } from "./tasteSummary.types";

// ── TasteSummary ───────────────────────────────────────────────────────────────
// 현재까지 선택한 취향을 한눈에 보여주는 요약 영역 (#33)
// - 선택 개수 / 필요 개수 표시
// - 각 항목을 칩으로 노출, 칩에서 바로 선택 해제 가능

export const TasteSummary = ({ items, required = 3, onRemove, className }: ITasteSummaryProps) => {
  return (
    <section className={cn("mb-10 flex flex-col gap-3", className)} aria-label="선택한 취향 요약">
      <div className="flex items-center gap-2">
        <span className="type-title-sm text-on-background">선택한 취향</span>
        <span className="type-label-md rounded-full bg-primary-container/10 px-2.5 py-0.5 text-primary-container">
          {items.length}/{required}
        </span>
      </div>

      {items.length === 0 ? (
        <p className="type-body-md text-stone-400">아직 선택한 취향이 없어요</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {items.map((item) => (
            <li key={item.id}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-container/10 py-1.5 pl-3.5 pr-2 text-primary-container">
                <span className="type-label-lg">{item.label}</span>

                {onRemove && (
                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    aria-label={`${item.label} 선택 해제`}
                    className="flex h-5 w-5 items-center justify-center rounded-full transition-colors hover:bg-primary-container/20"
                  >
                    <X size={14} />
                  </button>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
