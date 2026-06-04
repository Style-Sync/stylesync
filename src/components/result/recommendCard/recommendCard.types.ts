export interface IRecommendCardProps {
  domain: "music" | "movie" | "fashion";
  /** 곡명 / 영화 제목 / 패션 룩 이름 */
  title: string;
  /** 아티스트명 (music), 한줄 설명 (movie/fashion) */
  subtitle?: string;
  /** 앨범아트 / 포스터 / 패션 사진 URL */
  imageUrl?: string;
  /** 상단 라벨 (예: "RECOMMENDATION 01") — movie/fashion 전용 */
  label?: string;
  /** 30초 미리듣기 URL — music 전용, null 이면 버튼 비활성 */
  previewUrl?: string | null;
  /** 미리듣기 버튼 클릭 핸들러 — music 전용 */
  onPreviewClick?: () => void;
}
