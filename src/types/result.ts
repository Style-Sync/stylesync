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
// /api/inference 저장 결과 구조 — InferenceResponse 평탄 구조 + id/createdAt
// (순환 import 방지를 위해 InferenceResponse를 직접 import하지 않고 필드를 명시)

export type StyleResult = {
  id: string;
  styleLabel: StyleLabel;
  music: {
    id: string;
    name: string;
    artist: string;
    image: string;
    previewUrl: string | null;
  }[];
  movie: {
    id: number;
    title: string;
    posterPath: string;
    genres: string[];
  }[];
  fashion: {
    keyword: string;
    image: string;
  }[];
  createdAt: string;
};
