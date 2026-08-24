import Link from "next/link";

import { FollowButton } from "@/components/social/FollowButton";

interface IUserCardProps {
  profileId: string;
  username: string;
  displayName: string | null;
  similarity?: number;
}

export function UserCard({ profileId, username, displayName, similarity }: IUserCardProps) {
  return (
    <article className="flex items-center justify-between gap-4 rounded-[16px] border border-outline-variant px-5 py-4 bg-surface">
      <Link href={`/profile/${username}`} className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
          <span className="font-headline font-black text-label-md text-on-primary-container uppercase">
            {(displayName ?? username).charAt(0)}
          </span>
        </div>
        <div className="min-w-0">
          <p className="font-korean text-body-md font-medium text-on-background truncate">
            {displayName ?? username}
          </p>
          <p className="font-korean text-body-xs text-on-surface-variant truncate">@{username}</p>
          {similarity !== undefined && (
            <p className="font-korean text-body-xs text-primary mt-0.5">
              유사도 {Math.round(similarity * 100)}%
            </p>
          )}
        </div>
      </Link>
      <div className="flex-shrink-0">
        <FollowButton targetUserId={profileId} />
      </div>
    </article>
  );
}
