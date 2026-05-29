// ── StyleLabel ────────────────────────────────────────────────────────────────
// Grok API가 반환하는 스타일 정체성 레이블 구조.
// Feature A(#52)에서 이 구조로 출력되도록 prompt를 설계합니다.

export type StyleMood = {
  /** 에너지 레벨 */
  energy: "low" | "mid" | "high";
  /** 전반적 톤 */
  tone: "dark" | "neutral" | "bright";
  /** 감성 계열 */
  aesthetic: "mainstream" | "indie" | "artistic" | "experimental";
};

export type StyleLabel = {
  /**
   * 영문 스타일 정체성 이름 (Grok 생성)
   * - 최대 30자, 영문만, 단어 첫 글자 대문자
   * - 예: "Melancholic Softboy", "Quiet Cinephile", "Solar Punk Dresser"
   */
  title: string;

  /**
   * 한국어 2~3줄 감성 설명 (Grok 생성)
   * - 최대 80자
   * - 결과 페이지 히어로에 전체 표시 / 공유 카드에서는 2줄로 clamp
   * - 예: "감성적이고 내향적인 무드. R&B와 아트하우스 영화, 오버사이즈 어스톤 패션이 어울림"
   */
  description: string;

  /**
   * 공유 카드 배경 파스텔 단색 (hex)
   * - Grok이 레이블 톤에 맞춰 지정
   * - 예: "#e6e6fa" (라벤더 — Melancholic), "#ccf2e4" (민트 — Solar Punk)
   */
  themeColor: string;

  /** Grok 3축 감성 태그 — 크로스 추론 기반 */
  mood: StyleMood;
};

// ── StyleResult ───────────────────────────────────────────────────────────────
// /api/inference 응답 전체 구조

export type StyleResult = {
  id: string;

  /** 스타일 정체성 레이블 (Grok 생성) */
  styleLabel: StyleLabel;

  recommendations: {
    music: {
      id: string;
      /** 트랙명 */
      name: string;
      /** 아티스트명 */
      artist: string;
      /** Spotify 앨범아트 URL */
      image: string;
      /** 30초 미리듣기 URL — null이면 Spotify 앱 연결 버튼으로 대체 */
      previewUrl: string | null;
    }[];
    movies: {
      /** TMDB movie id */
      id: number;
      title: string;
      /** TMDB 포스터 경로 (/path.jpg 형식, 전체 URL은 클라이언트에서 조합) */
      posterPath: string;
      genres: string[];
    }[];
    fashion: {
      id: string;
      name: string;
      /** 네이버 쇼핑 상품 이미지 URL */
      image: string;
      price: number;
      /** 네이버 쇼핑 상품 페이지 링크 */
      link: string;
    }[];
  };

  createdAt: string;
};
