"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { ResultPageError } from "@/components/result/ResultPageError";
import { useResultStore } from "@/store/resultStore";
import type { StyleResult } from "@/types/result";

function useCompareSide(id: string | null) {
  const storedResult = useResultStore((s) => (id ? s.results[id] : undefined));
  const saveResult = useResultStore((s) => s.saveResult);
  const [fetched, setFetched] = useState<StyleResult | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    if (!id || storedResult || isFetching || fetchFailed) return;
    setIsFetching(true);
    fetch(`/api/results/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        saveResult(data.result);
        setFetched(data.result);
      })
      .catch(() => setFetchFailed(true))
      .finally(() => setIsFetching(false));
  }, [id, storedResult, isFetching, fetchFailed, saveResult]);

  return {
    result: storedResult ?? fetched,
    isFetching,
    fetchFailed,
  };
}

function CompareSide({
  result,
  isFetching,
  fetchFailed,
  label,
}: {
  result: StyleResult | null | undefined;
  isFetching: boolean;
  fetchFailed: boolean;
  label: string;
}) {
  if (isFetching) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[40vh]">
        <p className="type-body-lg text-on-surface-variant">{label} 불러오는 중...</p>
      </div>
    );
  }

  if (fetchFailed || !result) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[40vh]">
        <p className="type-body-md text-on-surface-variant">{label} 결과를 찾을 수 없어요.</p>
      </div>
    );
  }

  const { styleLabel, music, movie, fashion } = result;

  return (
    <div className="flex-1 min-w-0">
      {/* Style Label Hero */}
      <div className="rounded-[24px] p-6 mb-6" style={{ backgroundColor: styleLabel.themeColor }}>
        <p className="font-headline font-black text-headline-md text-on-background uppercase mb-2">
          {styleLabel.title}
        </p>
        <p className="font-korean text-body-md text-on-background/70 keep-all line-clamp-3">
          {styleLabel.description}
        </p>
      </div>

      {/* Music */}
      <section className="mb-6">
        <h3 className="font-headline font-black text-label-lg text-on-surface-variant uppercase mb-3">
          Music
        </h3>
        <ul className="flex flex-col gap-2">
          {music.slice(0, 3).map((track) => (
            <li key={track.id} className="flex items-center gap-3">
              {track.image && (
                <Image
                  src={track.image}
                  alt={track.name}
                  width={40}
                  height={40}
                  className="rounded-lg object-cover flex-shrink-0"
                />
              )}
              <div className="min-w-0">
                <p className="font-korean text-body-sm font-medium text-on-background truncate">
                  {track.name}
                </p>
                <p className="font-korean text-body-xs text-on-surface-variant truncate">
                  {track.artist}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Movie */}
      <section className="mb-6">
        <h3 className="font-headline font-black text-label-lg text-on-surface-variant uppercase mb-3">
          Cinema
        </h3>
        <ul className="flex flex-col gap-2">
          {movie.slice(0, 3).map((m) => (
            <li key={m.id} className="font-korean text-body-sm text-on-background">
              {m.title}
              <span className="text-on-surface-variant ml-2 text-body-xs">
                {m.genres.slice(0, 2).join(" · ")}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Fashion */}
      <section>
        <h3 className="font-headline font-black text-label-lg text-on-surface-variant uppercase mb-3">
          Fashion
        </h3>
        <ul className="flex flex-col gap-2">
          {fashion.slice(0, 3).map((item, i) => (
            <li key={i} className="font-korean text-body-sm text-on-background">
              {item.keyword}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default function ComparePage() {
  const searchParams = useSearchParams();
  const idA = searchParams.get("a");
  const idB = searchParams.get("b");

  const sideA = useCompareSide(idA);
  const sideB = useCompareSide(idB);

  if (!idA || !idB) {
    return (
      <ResultPageError message="비교할 결과 ID가 없어요. URL에 ?a=...&b=... 형식으로 입력해주세요." />
    );
  }

  return (
    <div className="page-container section-wrapper">
      <header className="mb-8">
        <h1 className="type-headline-lg keep-all">
          스타일 <span className="text-primary-container">비교</span>
        </h1>
        <p className="type-body-lg text-on-surface-variant mt-2">
          두 분석 결과를 나란히 확인해보세요.
        </p>
      </header>

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
        <CompareSide {...sideA} label="결과 A" />
        <div className="w-px bg-outline-variant hidden lg:block flex-shrink-0" aria-hidden="true" />
        <CompareSide {...sideB} label="결과 B" />
      </div>
    </div>
  );
}
