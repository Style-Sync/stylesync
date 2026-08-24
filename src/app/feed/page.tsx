"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { FeedCard } from "@/components/social/FeedCard";
import type { StyleLabel } from "@/types/result";

interface FeedItem {
  id: string;
  style_label: StyleLabel;
  start_domain: string;
  created_at: string;
  profiles: {
    username: string;
    display_name: string | null;
  };
}

export default function FeedPage() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const fetchFeed = useCallback(async (cursor?: string) => {
    const params = new URLSearchParams({ limit: "10" });
    if (cursor) params.set("cursor", cursor);

    const res = await fetch(`/api/feed?${params}`);
    if (!res.ok) {
      if (res.status === 401) throw new Error("LOGIN_REQUIRED");
      throw new Error("피드를 불러오는 데 실패했습니다.");
    }
    return res.json() as Promise<{ items: FeedItem[]; nextCursor: string | null }>;
  }, []);

  useEffect(() => {
    fetchFeed()
      .then(({ items: newItems, nextCursor: nc }) => {
        setItems(newItems);
        setNextCursor(nc);
      })
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, [fetchFeed]);

  // 무한 스크롤 — sentinel IntersectionObserver
  useEffect(() => {
    if (!sentinelRef.current || !nextCursor) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || isLoadingMore || !nextCursor) return;
        setIsLoadingMore(true);
        fetchFeed(nextCursor)
          .then(({ items: newItems, nextCursor: nc }) => {
            setItems((prev) => [...prev, ...newItems]);
            setNextCursor(nc);
          })
          .catch(() => {})
          .finally(() => setIsLoadingMore(false));
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [nextCursor, isLoadingMore, fetchFeed]);

  if (isLoading) {
    return (
      <div className="page-container section-wrapper flex items-center justify-center min-h-[50vh]">
        <p className="type-body-lg text-on-surface-variant">피드를 불러오는 중...</p>
      </div>
    );
  }

  if (error === "LOGIN_REQUIRED") {
    return (
      <div className="page-container section-wrapper flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
        <p className="type-body-lg text-on-surface-variant">피드를 보려면 로그인이 필요해요.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container section-wrapper flex items-center justify-center min-h-[50vh]">
        <p className="type-body-lg text-on-surface-variant">{error}</p>
      </div>
    );
  }

  return (
    <div className="page-container section-wrapper">
      <header className="mb-8">
        <h1 className="type-headline-lg keep-all">
          피드 <span className="text-primary-container">타임라인</span>
        </h1>
        <p className="type-body-lg text-on-surface-variant mt-2">
          팔로우한 사람들의 최신 스타일을 확인하세요.
        </p>
      </header>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[30vh] gap-3 text-center">
          <p className="type-body-lg text-on-surface-variant keep-all">
            아직 팔로우한 사람이 없거나 최신 결과가 없어요.
          </p>
          <p className="type-body-md text-on-surface-variant">
            유사한 취향의 사람들을 팔로우해 보세요.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <FeedCard
                key={item.id}
                id={item.id}
                styleLabel={item.style_label}
                startDomain={item.start_domain}
                createdAt={item.created_at}
                username={item.profiles.username}
                displayName={item.profiles.display_name}
              />
            ))}
          </div>

          {/* Infinite scroll sentinel */}
          <div ref={sentinelRef} className="h-10 mt-6" />
          {isLoadingMore && (
            <p className="text-center type-body-md text-on-surface-variant pb-4">
              더 불러오는 중...
            </p>
          )}
          {!nextCursor && items.length > 0 && (
            <p className="text-center type-body-md text-on-surface-variant pb-4">
              모두 확인했어요.
            </p>
          )}
        </>
      )}
    </div>
  );
}
