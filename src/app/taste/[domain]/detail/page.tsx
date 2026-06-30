"use client";

import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { DomainGuard } from "@/components/domain/DomainGuard";
import { MovieTasteCard } from "@/components/domain/movieTasteCard";
import { MusicTasteCard } from "@/components/domain/musicTasteCard";
import { TasteInputForm } from "@/components/domain/tasteInputForm";
import { useInference } from "@/hooks/useInference";
import { buildInferenceRequest } from "@/lib/inference/normalizeRequest";
import { useResultStore } from "@/store/resultStore";
import { useTasteStore } from "@/store/tasteStore";
import type { Domain, MovieSelection, MusicSelection } from "@/types/taste";

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

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<MusicSelection[] | MovieSelection[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // fashion은 2뎁스 미사용 → 1뎁스로 되돌림
  useEffect(() => {
    if (domain === "fashion") router.replace("/taste/fashion");
  }, [domain, router]);

  const fetchResults = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      setIsSearchLoading(true);
      setSearchError(null);

      try {
        const endpoint =
          domain === "music"
            ? `/api/spotify?q=${encodeURIComponent(query)}&type=artist`
            : `/api/tmdb?q=${encodeURIComponent(query)}`;

        const res = await fetch(endpoint);
        if (!res.ok) throw new Error("검색에 실패했습니다.");
        const data = await res.json();
        setSearchResults(data.results ?? []);
      } catch (e) {
        setSearchError(e instanceof Error ? e.message : "검색에 실패했습니다.");
        setSearchResults([]);
      } finally {
        setIsSearchLoading(false);
      }
    },
    [domain]
  );

  // 300ms 디바운스 검색
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResults(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, fetchResults]);

  const selectionCount =
    domain === "music" ? musicSelections.length : domain === "movie" ? movieSelections.length : 0;

  const isReady = selectionCount >= 3;

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
      console.error(e);
      alert(e instanceof Error ? e.message : "분석에 실패했습니다.");
    }
  };

  const handleSelectArtist = (artist: MusicSelection) => {
    if (musicSelections.some((item) => item.id === artist.id)) {
      removeMusicSelection(artist.id);
    } else {
      addMusicSelection(artist);
    }
  };

  const handleSelectMovie = (movie: MovieSelection) => {
    if (movieSelections.some((item) => item.id === movie.id)) {
      removeMovieSelection(movie.id);
    } else {
      addMovieSelection(movie);
    }
  };

  if (domain === "fashion") return null;

  const content = DETAIL_CONTENT[domain];

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
        selectionCount={selectionCount}
      >
        <div className="grid-cols-responsive">
          {isSearchLoading && (
            <p className="col-span-full py-10 text-center text-sm text-stone-400">검색 중...</p>
          )}

          {!isSearchLoading && searchError && (
            <p className="col-span-full py-10 text-center text-sm text-red-400">{searchError}</p>
          )}

          {!isSearchLoading && !searchError && searchQuery && searchResults.length === 0 && (
            <p className="col-span-full py-10 text-center text-sm text-stone-400">
              검색 결과가 없습니다.
            </p>
          )}

          {!isSearchLoading && !searchError && !searchQuery && (
            <p className="col-span-full py-10 text-center text-sm text-stone-400">
              {content.searchPlaceholder}을 입력해 결과를 확인하세요.
            </p>
          )}

          {domain === "music" &&
            !isSearchLoading &&
            (searchResults as MusicSelection[]).map((artist) => (
              <MusicTasteCard
                key={artist.id}
                domain="music"
                title={artist.name}
                genre={artist.genres.join(" / ")}
                imageUrl={artist.image}
                selected={musicSelections.some((item) => item.id === artist.id)}
                onClick={() => handleSelectArtist(artist)}
              />
            ))}

          {domain === "movie" &&
            !isSearchLoading &&
            (searchResults as MovieSelection[]).map((movie) => (
              <MovieTasteCard
                key={movie.id}
                domain="movie"
                title={movie.title}
                genre={movie.genres.join(" / ")}
                imageUrl={movie.posterPath}
                selected={movieSelections.some((item) => item.id === movie.id)}
                onClick={() => handleSelectMovie(movie)}
              />
            ))}
        </div>
      </TasteInputForm>
    </DomainGuard>
  );
}
