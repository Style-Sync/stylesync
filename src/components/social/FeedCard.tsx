import Link from "next/link";

import type { StyleLabel } from "@/types/result";

interface IFeedCardProps {
  id: string;
  styleLabel: StyleLabel;
  startDomain: string;
  createdAt: string;
  username: string;
  displayName: string | null;
}

const DOMAIN_LABEL: Record<string, string> = {
  music: "MUSIC",
  movie: "MOVIE",
  fashion: "FASHION",
};

export function FeedCard({
  id,
  styleLabel,
  startDomain,
  createdAt,
  username,
  displayName,
}: IFeedCardProps) {
  const date = new Date(createdAt).toLocaleDateString("ko-KR", {
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/result/${id}`} className="block group">
      <article className="rounded-[24px] overflow-hidden border border-outline-variant hover:border-outline transition-colors">
        {/* 스타일 레이블 헤더 */}
        <div className="px-5 py-4" style={{ backgroundColor: styleLabel.themeColor }}>
          <p className="font-headline font-black text-body-lg text-on-background uppercase">
            {styleLabel.title}
          </p>
          <p className="font-korean text-body-sm text-on-background/70 keep-all line-clamp-2 mt-1">
            {styleLabel.description}
          </p>
        </div>

        {/* 메타 */}
        <div className="flex items-center justify-between px-5 py-3 bg-surface">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
              <span className="font-headline font-black text-label-sm text-on-primary-container uppercase">
                {(displayName ?? username).charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-korean text-body-sm font-medium text-on-background leading-none">
                {displayName ?? username}
              </p>
              <p className="font-korean text-body-xs text-on-surface-variant leading-none mt-0.5">
                @{username}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="font-headline text-label-xs text-on-surface-variant uppercase">
              {DOMAIN_LABEL[startDomain] ?? startDomain}
            </span>
            <span className="font-korean text-body-xs text-on-surface-variant">{date}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
