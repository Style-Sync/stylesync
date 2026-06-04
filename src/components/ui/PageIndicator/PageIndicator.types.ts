import type React from "react";

export interface IPageIndicatorProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  /** 전체 페이지 수 */
  total: number;
  /** 현재 활성 페이지 (0부터 시작) */
  current: number;
  /** 점 클릭 시 호출되는 콜백. 제공하지 않으면 클릭 불가(단순 표시 용도) */
  onChange?: (page: number) => void;
}
