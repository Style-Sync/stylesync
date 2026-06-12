interface IEqualizerBarsProps {
  /** 막대 크기 — sm: 버튼 안 / lg: 앨범아트 중앙 */
  size?: "sm" | "lg";
  /** 막대 색상 (Tailwind bg-* 클래스). 기본 currentColor 사용 */
  className?: string;
}

const BAR_DELAYS_MS = [0, 150, 300, 450, 600];

const SIZE_CONFIG = {
  sm: { wrap: "h-3 gap-[2px]", bar: "w-[2px] h-full", count: 3 },
  lg: { wrap: "h-12 gap-1.5", bar: "w-2 h-full rounded-full", count: 5 },
} as const;

/**
 * 음악 재생 중 시각화용 이퀄라이저. 각 막대가 다른 delay로 위아래 스케일 애니메이션.
 * - sm: 버튼 안 (3 bars, height 12px)
 * - lg: 앨범아트 중앙 (5 bars, height 48px)
 */
export const EqualizerBars = ({ size = "sm", className = "" }: IEqualizerBarsProps) => {
  const { wrap, bar, count } = SIZE_CONFIG[size];

  return (
    <div className={`inline-flex items-end ${wrap} ${className}`} role="img" aria-label="재생 중">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`${bar} bg-current animate-eq-bar origin-bottom inline-block`}
          style={{ animationDelay: `${BAR_DELAYS_MS[i % BAR_DELAYS_MS.length]}ms` }}
        />
      ))}
    </div>
  );
};
