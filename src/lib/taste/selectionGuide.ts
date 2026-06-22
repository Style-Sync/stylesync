export const REQUIRED_SELECTION = 3;

export type SelectionGuide = {
  isComplete: boolean;
  message: string;
};

// 남은 개수별 안내 (진행감을 주는 카피)
const REMAINING_MESSAGES: Record<number, string> = {
  3: "마음이 가는 취향을 3개 골라주세요",
  2: "좋아요! 2개만 더 골라볼까요?",
  1: "거의 다 왔어요, 딱 하나만 더!",
};

// 선택 개수 → 버튼 활성 여부 + 안내 메시지 (FT-002)
export const getSelectionGuide = (count: number, required = REQUIRED_SELECTION): SelectionGuide => {
  const remaining = required - count;

  if (remaining <= 0) {
    return { isComplete: true, message: "취향이 완성됐어요! 분석을 시작할게요 ✨" };
  }

  return {
    isComplete: false,
    message: REMAINING_MESSAGES[remaining] ?? `${remaining}개 더 골라주세요`,
  };
};
