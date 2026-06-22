export interface ITasteSummaryItem {
  /** 선택 항목 식별자 (music: string id, movie: 숫자 id를 문자열로 변환) */
  id: string;
  /** 칩에 표시될 라벨 (아티스트명 / 영화 제목) */
  label: string;
}

export interface ITasteSummaryProps {
  /** 현재 선택된 취향 목록 */
  items: ITasteSummaryItem[];
  /** 완성에 필요한 선택 개수 (기본 3) */
  required?: number;
  /** 칩의 해제 버튼 클릭 핸들러 — 없으면 해제 버튼 미노출 */
  onRemove?: (id: string) => void;
  className?: string;
}
