"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { DomainGuard } from "@/components/domain/DomainGuard";
import { MovieTasteCard } from "@/components/domain/movieTasteCard";
import { MusicTasteCard } from "@/components/domain/musicTasteCard";
import { TasteInputForm } from "@/components/domain/tasteInputForm";
import { useInference } from "@/hooks/useInference";
import { buildInferenceRequest } from "@/lib/inference/normalizeRequest";
import { useResultStore } from "@/store/resultStore";
import { useTasteStore } from "@/store/tasteStore";
import type { Domain } from "@/types/taste";

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
  // fashion은 detail(2뎁스) 미사용 — 타입 충족용
  fashion: { titleMain: "", description: "", searchPlaceholder: "" },
};

// 2뎁스 mock 카드 데이터 (TODO: #41 Spotify 검색 / #44 TMDB 연동으로 교체)
const MOCK_ARTISTS = [
  { id: "1", title: "NewJeans", genre: "Y2K Pop", imageUrl: "" },
  { id: "2", title: "Keshi", genre: "Lo-fi", imageUrl: "" },
  { id: "3", title: "IU", genre: "Ballad", imageUrl: "" },
];

const MOCK_MOVIES = [
  { id: 1, title: "Interstellar", genre: "Sci-Fi", imageUrl: "" },
  { id: 2, title: "La La Land", genre: "Romance", imageUrl: "" },
  { id: 3, title: "Parasite", genre: "Thriller", imageUrl: "" },
];

export default function TasteStep2Page({ params }: ITasteDetailPageProps) {
  const router = useRouter();
  const domain = params.domain as Domain;

  const musicSelections = useTasteStore((s) => s.musicSelections);
  const movieSelections = useTasteStore((s) => s.movieSelections);
  const addMusicSelection = useTasteStore((s) => s.addMusicSelection);
  const removeMusicSelection = useTasteStore((s) => s.removeMusicSelection);
  const addMovieSelection = useTasteStore((s) => s.addMovieSelection);
  const removeMovieSelection = useTasteStore((s) => s.removeMovieSelection);
  const fashionSelections = useTasteStore((s) => s.fashionSelections);
  const selectedStyles = useTasteStore((s) => s.selectedStyles);
  const saveResult = useResultStore((s) => s.saveResult);
  const { infer, isLoading: isAnalyzing } = useInference();

  // fashion은 2뎁스 미사용 → 1뎁스로 되돌림 (렌더 중 호출 X, useEffect)
  useEffect(() => {
    if (domain === "fashion") router.replace("/taste/fashion");
  }, [domain, router]);

  // 도메인별 선택 상태로 분기 (music/movie 영향 분리)
  const isReady =
    domain === "music"
      ? musicSelections.length > 0
      : domain === "movie"
        ? movieSelections.length > 0
        : false;

  const [searchQuery, setSearchQuery] = useState("");
  const content = DETAIL_CONTENT[domain];

  const handleAnalyze = async () => {
    try {
      const request = buildInferenceRequest({
        domain,
        musicSelections,
        movieSelections,
        fashionSelections,
        selectedStyles,
      });
      const result = await infer(request);
      saveResult(result);
      router.push(`/result/${result.id}`);
    } catch (e) {
      // 정규화 실패(예: 3개 미만) 또는 API 실패
      console.error(e);
      alert(e instanceof Error ? e.message : "분석에 실패했습니다.");
    }
  };

  const handleSelectArtist = (artist: (typeof MOCK_ARTISTS)[number]) => {
    if (musicSelections.some((item) => item.id === artist.id)) {
      removeMusicSelection(artist.id);
      return;
    }
    addMusicSelection({
      id: artist.id,
      name: artist.title,
      image: artist.imageUrl,
      genres: [artist.genre],
      previewUrl: "",
    });
  };

  const handleSelectMovie = (movie: (typeof MOCK_MOVIES)[number]) => {
    if (movieSelections.some((item) => item.id === movie.id)) {
      removeMovieSelection(movie.id);
      return;
    }
    addMovieSelection({
      id: movie.id,
      title: movie.title,
      posterPath: movie.imageUrl,
      backdropPath: "",
      genres: [movie.genre],
      releaseYear: 2024,
    });
  };

  if (domain === "fashion") return null;

  return (
    <DomainGuard domain={params.domain}>
      <TasteInputForm
        domain={domain}
        title={content.titleMain}
        description={content.description}
        searchPlaceholder={content.searchPlaceholder}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isNextDisabled={!isReady || isAnalyzing}
        onNext={handleAnalyze}
      >
        {/* 2뎁스: TasteCard 그리드 */}
        <div className="grid-cols-responsive">
          {domain === "music" &&
            MOCK_ARTISTS.map((artist) => (
              <MusicTasteCard
                key={artist.id}
                domain="music"
                title={artist.title}
                genre={artist.genre}
                imageUrl={artist.imageUrl}
                selected={musicSelections.some((item) => item.id === artist.id)}
                onClick={() => handleSelectArtist(artist)}
              />
            ))}

          {domain === "movie" &&
            MOCK_MOVIES.map((movie) => (
              <MovieTasteCard
                key={movie.id}
                domain="movie"
                title={movie.title}
                genre={movie.genre}
                imageUrl={movie.imageUrl}
                selected={movieSelections.some((item) => item.id === movie.id)}
                onClick={() => handleSelectMovie(movie)}
              />
            ))}
        </div>
      </TasteInputForm>
    </DomainGuard>
  );
}
