"use client";

import { useRouter } from "next/navigation";

import { DomainSelectCard } from "@/components/domain/domainSelectCard";
import { useTasteStore } from "@/store/tasteStore";
import type { Domain } from "@/types/taste";

const DOMAINS: Domain[] = ["music", "movie", "fashion"];

export default function SelectPage() {
  const router = useRouter();
  const setSelectedDomain = useTasteStore((s) => s.setSelectedDomain);

  const handleSelect = (domain: Domain) => {
    setSelectedDomain(domain); // #25: store에 저장
    router.push(`/taste/${domain}`);
  };

  return (
    <main className="page-container section-wrapper">
      <div className="flex flex-col items-center gap-12">
        {/* 텍스트 섹션 */}
        <section className="flex flex-col items-center gap-4 text-center">
          <h1 className="heading-display">
            어느 분야부터 <span className="text-orange-500">분석</span>해볼까요?
          </h1>
          <p className="text-stone-600">
            분석하고 싶은 도메인을 선택하면 AI가 당신의 스타일을 매칭해드립니다.
          </p>
        </section>

        {/* 카드 섹션 - 가이드의 grid-cols-responsive (1→2→3열) 사용 */}
        <section className="grid-cols-responsive w-full">
          {DOMAINS.map((domain) => (
            <DomainSelectCard key={domain} domain={domain} onClick={() => handleSelect(domain)} />
          ))}
        </section>
      </div>
    </main>
  );
}
