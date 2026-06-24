"use client";

import { Icon } from "@/components/ui/Icon";
import { useTasteStore } from "@/store/tasteStore";

import type { IStyleSelectListProps } from "./styleSelectList.types";

// ── StyleSelectList ─────────────────────────────────────────────────────────
// 1뎁스 스타일/무드 선택 — 리스트 + 프리뷰 UI (TasteCard 미사용)

export const StyleSelectList = ({ domain, options }: IStyleSelectListProps) => {
  const selectedStyles = useTasteStore((s) => s.selectedStyles);
  const setSelectedStyle = useTasteStore((s) => s.setSelectedStyle);

  const selectedId = selectedStyles[domain] ?? null;
  const selectedOption = options.find((option) => option.id === selectedId) ?? null;

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
      {/* ── 스타일 리스트 ─────────────────────────────────────────────── */}
      <ul className="flex-1">
        {options.map((option, index) => {
          const isSelected = option.id === selectedId;

          return (
            <li key={option.id} className="border-b border-outline-variant">
              <button
                type="button"
                onClick={() => setSelectedStyle(domain, option.id)}
                aria-pressed={isSelected}
                className="group flex w-full items-baseline gap-5 py-6 text-left"
              >
                <span className="font-label text-label-sm text-on-surface-variant/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={[
                    "font-headline font-black uppercase keep-all leading-tight",
                    "text-headline-md md:text-headline-lg",
                    "transition-colors duration-200",
                    isSelected
                      ? "text-primary-container"
                      : "text-on-background/25 group-hover:text-on-background/50",
                  ].join(" ")}
                >
                  {option.title}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* ── 프리뷰 카드 (데스크탑) ────────────────────────────────────── */}
      <aside className="hidden lg:block lg:w-[360px] lg:shrink-0">
        <div className="sticky top-8 flex h-[420px] flex-col justify-end rounded-[2.5rem] bg-surface-variant p-8 editorial-shadow">
          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-label text-label-sm uppercase text-on-surface-variant/60">
                Preview Selection
              </span>
              <span className="font-headline font-black text-headline-sm text-on-background keep-all">
                {selectedOption?.title ?? "—"}
              </span>
            </div>
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-on-background"
              aria-hidden="true"
            >
              <Icon name="arrowUpRight" className="text-white" size={18} />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
