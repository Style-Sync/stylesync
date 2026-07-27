"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

interface IFollowButtonProps {
  targetUserId: string;
  initialIsFollowing?: boolean;
}

export function FollowButton({ targetUserId, initialIsFollowing }: IFollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing ?? false);
  const [isLoading, setIsLoading] = useState(initialIsFollowing === undefined);

  useEffect(() => {
    if (initialIsFollowing !== undefined) return;
    fetch(`/api/follows/status?following_id=${targetUserId}`)
      .then((res) => res.json())
      .then((data) => setIsFollowing(data.isFollowing ?? false))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [targetUserId, initialIsFollowing]);

  const handleClick = async () => {
    setIsLoading(true);
    const next = !isFollowing;

    try {
      if (next) {
        await fetch("/api/follows", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ following_id: targetUserId }),
        });
      } else {
        await fetch(`/api/follows?following_id=${targetUserId}`, { method: "DELETE" });
      }
      setIsFollowing(next);
    } catch {
      // 네트워크 오류 시 다음 렌더에서 서버 상태와 재동기화
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={isFollowing ? "ghost" : "dark"}
      size="sm"
      disabled={isLoading}
      onClick={handleClick}
    >
      {isLoading ? "..." : isFollowing ? "팔로잉" : "팔로우"}
    </Button>
  );
}
