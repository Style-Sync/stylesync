"use client";

import { useTasteStore } from "@/store/tasteStore";
import type { Domain } from "@/types/taste";

const VALID_DOMAINS: Domain[] = ["music", "movie", "fashion"];

export const isValidDomain = (value: string): value is Domain =>
  (VALID_DOMAINS as string[]).includes(value);

export const useStepValidation = () => {
  const selectedDomain = useTasteStore((s) => s.selectedDomain);
  const musicSelections = useTasteStore((s) => s.musicSelections);
  const movieSelections = useTasteStore((s) => s.movieSelections);
  const fashionSelection = useTasteStore((s) => s.fashionSelection);

  // 도메인 선택됐는지
  const isDomainSelected = selectedDomain !== null;

  // 현재 도메인의 선택값이 완료됐는지 (다음 단계 갈 수 있는지)
  const isSelectionComplete = (() => {
    if (!selectedDomain) return false;
    if (selectedDomain === "music") return musicSelections.length > 0;
    if (selectedDomain === "movie") return movieSelections.length > 0;
    if (selectedDomain === "fashion")
      return fashionSelection.styles.length > 0 || fashionSelection.moods.length > 0;
    return false;
  })();

  return { isDomainSelected, isSelectionComplete, selectedDomain };
};
