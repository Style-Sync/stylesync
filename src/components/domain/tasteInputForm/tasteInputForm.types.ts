import { ReactNode } from "react";

import type { Domain } from "@/types/taste";

export interface ITasteInputFormProps {
  title: string;
  description: string;
  searchPlaceholder: string;

  searchQuery: string;
  onSearchChange: (value: string) => void;

  domain: Domain;
  children: ReactNode;

  isNextDisabled?: boolean;
  onNext?: () => void;

  guideMessage?: string;

  /** 선택 요약 영역 (#33 TasteSummary 등) — guideMessage 아래 노출 */
  summary?: ReactNode;

  /** 분석 요청 진행 중 여부 (#34) — 버튼 로딩/비활성 처리 */
  isNextLoading?: boolean;
  /** 로딩 중 버튼 라벨 (기본: nextLabel 유지) */
  nextLoadingLabel?: string;
}
