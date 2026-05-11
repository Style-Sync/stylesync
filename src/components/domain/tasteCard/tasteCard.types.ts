export interface ITasteCardProps {
  domain: "music" | "movie" | "fashion";
  /** 아티스트명 / 영화 제목 / 패션 룩 이름 */
  title: string;
  /** 장르 배지 텍스트 (예: "R&B / POP", "Sci-Fi", "테일러드") */
  genre?: string;
  /** 아티스트 사진 / 포스터 / 패션 이미지 URL */
  imageUrl?: string;
  /** 선택 여부 */
  selected?: boolean;
  /** 카드 클릭 핸들러 */
  onClick?: () => void;
}
