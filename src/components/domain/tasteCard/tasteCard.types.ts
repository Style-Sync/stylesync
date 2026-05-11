export interface ITasteCardProps {
  domain: "music" | "movie";
  /** 아티스트명 / 영화 제목 */
  title: string;
  /** 장르 배지 텍스트 (예: "R&B / POP", "Sci-Fi") */
  genre?: string;
  /** 아티스트 사진 / 포스터 URL */
  imageUrl?: string;
  /** 선택 여부 */
  selected?: boolean;
  /** 카드 클릭 핸들러 */
  onClick?: () => void;
}
