"use client";

import { Button } from "@/components/ui/button";

export interface IStyleLabelHeroProps {
  title: string;
  description: string;
  themeColor: string;
  onReanalyze?: () => void;
  onShareCard?: () => void;
}

export const StyleLabelHero = ({
  title,
  description,
  themeColor,
  onReanalyze,
  onShareCard,
}: IStyleLabelHeroProps) => {
  // "Melancholic Softboy" → "MELANCHOLIC\nSOFTBOY"
  const words = title.toUpperCase().split(" ");
  const mid = Math.ceil(words.length / 2);
  const titleFormatted = [words.slice(0, mid).join(" "), words.slice(mid).join(" ")]
    .filter(Boolean)
    .join("\n");

  return (
    <section className="flex flex-col lg:flex-row lg:items-center gap-10 mb-16 lg:mb-20">
      {/* 텍스트 영역 */}
      <div className="flex flex-col items-center lg:items-start gap-6 flex-1">
        <span className="inline-block px-4 py-1 rounded-full bg-primary-container/10 font-korean font-medium text-body-sm text-primary-container">
          • 에스테틱 큐레이션 완료
        </span>

        <h1 className="font-headline font-black text-display-sm md:text-display-lg text-on-background uppercase leading-none tracking-tighter whitespace-pre-line text-center lg:text-left">
          {titleFormatted}
        </h1>

        <p className="font-korean font-normal text-body-md text-on-surface-variant keep-all text-center lg:text-left lg:font-bold lg:text-title-lg max-w-[480px] md:font-bold md:text-title-lg">
          {description}
        </p>

        <div className="flex flex-wrap justify-center lg:justify-start gap-3">
          <Button variant="stroke" size="sm" onClick={onReanalyze}>
            다시 분석하기
          </Button>
          <Button variant="primary" size="sm" onClick={onShareCard}>
            공유 카드 만들기
          </Button>
        </div>
      </div>

      {/* 캐릭터 플레이스홀더 — TODO: #88 캐릭터 컴포넌트 완성 후 교체 */}
      <div className="flex justify-center lg:justify-end flex-shrink-0">
        <div
          className="w-[336px] h-[336px] lg:w-[320px] lg:h-[320px]"
          style={{ background: themeColor, borderRadius: "64px" }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
};
