"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { DomainGuard } from "@/components/domain/DomainGuard";
import { MovieInput } from "@/components/domain/movieInput";
import { MusicInput } from "@/components/domain/musicInput";
import { TasteInputForm } from "@/components/domain/tasteInputForm";
import { useTasteStore } from "@/store/tasteStore";
import type { Domain } from "@/types/taste";
// import { FashionInput } from "@/components/domain/fashionInput";
// TODO: FashionInput 구현 방향 확인 필요
// - 현재 FashionTasteCard는 placeholder 상태(return null)
// - fashion detail step이 Music/Movie와 동일한 TasteCard 구조인지
//   혹은 Step1(domain selection)과 동일한 카드 UI인지 확인 후 구현 예정
// - 이미지 구조 및 선택 방식 확정 후 분기 연결
{
  /* {params.domain === "fashion" && (
  <FashionInput />
)} */
}

interface ITasteDetailPageProps {
  params: { domain: string };
}

const DETAIL_CONTENT: Record<
  Domain,
  { titleMain: string; description: string; searchPlaceholder: string }
> = {
  music: {
    titleMain: "음악 취향",
    description:
      "가장 선호하는 스타일의 아티스트를 선택해 주세요. 선택한 아티스트들이 당신의 음악적 취향 프로필을 구성합니다.",
    searchPlaceholder: "아티스트 검색",
  },
  movie: {
    titleMain: "영화 취향",
    description:
      "가장 선호하는 스타일의 영화를 선택해 주세요. 선택한 영화들이 당신의 스타일 프로필을 구성합니다.",
    searchPlaceholder: "영화 검색",
  },
  fashion: {
    titleMain: "패션 취향",
    description:
      "가장 선호하는 스타일의 룩을 선택해 주세요. 선택한 룩들이 당신의 패션 취향 프로필을 구성합니다.",
    searchPlaceholder: "스타일 검색",
  },
};

export default function TasteStep2Page({ params }: ITasteDetailPageProps) {
  const router = useRouter();
  const musicSelections = useTasteStore((s) => s.musicSelections);

  // TODO: 도메인별 selection 체크 로직 분기 필요
  const isReady = musicSelections.length > 0;

  // TODO: 실제 검색 로직 (필터링은 다음 이슈에서)
  const [searchQuery, setSearchQuery] = useState("");

  const content = DETAIL_CONTENT[params.domain as Domain];

  const handleAnalyze = () => {
    // TODO: 실제 분석 API 응답으로 받은 resultId 사용
    // 현재는 /result/[id] 페이지의 mock 데이터(mock-1) 매칭용
    const tempResultId = "mock-1";
    router.push(`/result/${tempResultId}`);
  };

  return (
    <DomainGuard domain={params.domain}>
      <TasteInputForm
        domain={params.domain as Domain}
        title={content.titleMain}
        description={content.description}
        searchPlaceholder={content.searchPlaceholder}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isNextDisabled={!isReady}
        onNext={handleAnalyze}
      >
        {params.domain === "music" && <MusicInput />}

        {params.domain === "movie" && <MovieInput />}

        {/* {params.domain === "fashion" && (
        <FashionInput />
      )} */}
      </TasteInputForm>
    </DomainGuard>
  );
}
