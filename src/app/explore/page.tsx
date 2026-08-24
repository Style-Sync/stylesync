"use client";

import { useEffect, useState } from "react";

import { UserCard } from "@/components/social/UserCard";
import { useAuthSessionStore } from "@/store/authSessionStore";

interface SimilarUser {
  profile_id: string;
  username: string;
  display_name: string | null;
  similarity: number;
}

export default function ExplorePage() {
  const isAuthenticated = useAuthSessionStore((s) => s.isAuthenticated);
  const userId = useAuthSessionStore((s) => s.user?.id);

  const [users, setUsers] = useState<SimilarUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !userId) return;

    setIsLoading(true);
    fetch(`/api/users/similar?user_id=${userId}&limit=20`)
      .then((res) => {
        if (!res.ok) throw new Error("유사 사용자를 불러오는 데 실패했습니다.");
        return res.json();
      })
      .then((data) => setUsers(data.users ?? []))
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, [isAuthenticated, userId]);

  return (
    <div className="page-container section-wrapper">
      <header className="mb-8">
        <h1 className="type-headline-lg keep-all">
          스타일 <span className="text-primary-container">탐색</span>
        </h1>
        <p className="type-body-lg text-on-surface-variant mt-2">
          당신과 비슷한 취향을 가진 사람들을 만나보세요.
        </p>
      </header>

      {!isAuthenticated && (
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3 text-center">
          <p className="type-body-lg text-on-surface-variant keep-all">
            유사한 스타일의 사용자를 찾으려면 로그인이 필요해요.
          </p>
        </div>
      )}

      {isAuthenticated && isLoading && (
        <div className="flex items-center justify-center min-h-[40vh]">
          <p className="type-body-lg text-on-surface-variant">유사 사용자를 분석 중...</p>
        </div>
      )}

      {isAuthenticated && !isLoading && error && (
        <div className="flex items-center justify-center min-h-[40vh]">
          <p className="type-body-lg text-on-surface-variant">{error}</p>
        </div>
      )}

      {isAuthenticated && !isLoading && !error && users.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3 text-center">
          <p className="type-body-lg text-on-surface-variant keep-all">
            아직 탐색할 유사 스타일 사용자가 없어요.
          </p>
          <p className="type-body-md text-on-surface-variant">먼저 스타일 분석을 완료해 보세요.</p>
        </div>
      )}

      {isAuthenticated && !isLoading && users.length > 0 && (
        <div className="flex flex-col gap-3 max-w-2xl">
          {users.map((user) => (
            <UserCard
              key={user.profile_id}
              profileId={user.profile_id}
              username={user.username}
              displayName={user.display_name}
              similarity={user.similarity}
            />
          ))}
        </div>
      )}
    </div>
  );
}
