import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// ── tailwind-merge 확장 설정 ──────────────────────────────────────────────────
// 기본 twMerge는 tailwind.config.ts에 정의된 커스텀 fontSize 토큰
// (text-label-lg, text-body-lg 등)을 인식하지 못해, text-* 색상 클래스와
// 같은 그룹으로 처리되어 색상이 지워지는 문제가 발생한다.
// fontSize 그룹에 프로젝트 토큰을 명시해서 충돌을 방지한다.
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-lg",
            "display-md",
            "display-sm",
            "headline-lg",
            "headline-md",
            "headline-sm",
            "title-lg",
            "title-md",
            "title-sm",
            "body-lg",
            "body-md",
            "body-sm",
            "label-lg",
            "label-md",
            "label-sm",
            "label-md-regular",
            "label-xs",
          ],
        },
      ],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => {
  return customTwMerge(clsx(inputs));
};
