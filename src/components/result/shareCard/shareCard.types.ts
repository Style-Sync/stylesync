import type { StyleLabel } from "@/types/result";
import type { Domain } from "@/types/taste";

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
//   domains                ← 사용자가 선택한 도메인 + AI 추론 결과 도메인
//   username               ← Supabase Auth 유저 이름 (비회원 undefined)

export interface IShareCardProps {
  /** 스타일 레이블 (title + description만 사용) */
  styleLabel: Pick<StyleLabel, "title" | "description">;

  /**
   * 카드 배경 파스텔 단색 hex
   * StyleLabel.themeColor 값을 그대로 전달
   */
  themeColor: string;

  /**
   * 분석에 사용된 도메인 목록 (카드 하단 도메인 태그 표시용)
   * 예: ["music", "movie", "fashion"]
   */
  domains: Domain[];

  /**
   * 회원 닉네임 — 카드 하단 소유자 표시
   * 비회원은 undefined (표시 생략)
   */
  username?: string;
}
