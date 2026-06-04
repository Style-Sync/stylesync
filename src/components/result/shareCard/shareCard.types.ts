import type { StyleLabel, StyleMood } from "@/types/result";

// ── IShareCardProps ───────────────────────────────────────────────────────────
// FT-005 공유 카드 스펙 기준 (설계 문서 10. 공유 카드 설계 참고)
//
// 카드 구성:
//   상단 바   — StyleSync 로고 + ✕ 닫기 버튼
//   캐릭터 영역 (55%) — 커스텀 캐릭터 placeholder (#88)
//   레이블 섹션 — title(bold 32px) + description(2줄 13px)
//   워터마크  — "stylesync.kr" 11px, 하단 흐리게
//
// API 데이터 매핑:
//   styleLabel.title       ← Grok 응답 StyleLabel.title
//   styleLabel.description ← Grok 응답 StyleLabel.description
//   themeColor             ← Grok 응답 StyleLabel.themeColor
//   mood                   ← Grok 응답 StyleLabel.mood (캐릭터 매핑용, #88)
//   username               ← Supabase Auth 유저 이름 (비회원 undefined)

export interface IShareCardProps {
  /**
   * 스타일 레이블 (Grok 생성)
   * title: "Cyberpunk Archivist" — 카드 타이틀로 표시
   * description: 2줄 감성 설명
   */
  styleLabel: Pick<StyleLabel, "title" | "description">;

  /**
   * 카드 마스코트 영역 배경 파스텔 단색 hex (Grok 생성)
   * 예: "#e6e6fa" (라벤더), "#ccf2e4" (민트)
   */
  themeColor: string;

  /**
   * Grok 3축 감성 태그 — 캐릭터 매핑용 (#88)
   * energy × tone × aesthetic 조합으로 캐릭터 결정
   */
  mood: StyleMood;

  /** 음악 추천 — 카드 하단 태그 표시용 */
  music?: {
    title: string;
    artist: string;
  };

  /** 영화 추천 — 카드 하단 태그 표시용 */
  movie?: {
    title: string;
  };

  /** 패션 추천 — 카드 하단 태그 표시용 */
  fashion?: {
    keyword: string;
  };

  /** 회원 닉네임 — 비회원은 undefined */
  username?: string;
}
