"use client";

import Link from "next/link";

interface HeaderProps {
  /** 로그인 상태 여부. 기본값 false (비로그인)
   * TODO: #100 auth session store 구현 후 useUserStore()로 교체 */
  isLoggedIn?: boolean;
}

/**
 * 공통 헤더 컴포넌트 — Figma: StyleSync-v2 / node 391:1407
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │  비로그인                                                    │
 * │  Mobile  (<md)  : 로고 + 유저 아이콘 (버튼 없음)             │
 * │  Tablet  (md~)  : 로고 + "로그인" + "시작하기" (12px)        │
 * │  PC      (lg~)  : 로고 + "로그인" + "시작하기" (14px)        │
 * ├─────────────────────────────────────────────────────────────┤
 * │  로그인 후                                                   │
 * │  전 브레이크포인트: 로고 + 아이콘 영역 (placeholder)          │
 * │  TODO: #11 아이콘 컴포넌트 완성 후 교체                       │
 * └─────────────────────────────────────────────────────────────┘
 *
 * 배경: rgba(250,249,246,0.8) + blur(24px) / 패딩: 20px 32px (전 구간 동일)
 */
export const Header = ({ isLoggedIn = false }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        style={{
          background: "rgba(250, 249, 246, 0.8)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        <nav className="flex items-center justify-between px-8 py-5">
          {/* ── 로고 ── */}
          <Link href="/" className="flex items-center" aria-label="StyleSync 홈으로">
            <span className="font-headline font-black text-headline-sm tracking-tighter text-on-background">
              Style
            </span>
            <span className="font-headline font-black text-headline-sm tracking-tighter text-primary-container">
              Sync
            </span>
          </Link>

          {/* ── 비로그인 ── */}
          {!isLoggedIn && (
            <div className="flex items-center">
              {/* Mobile: 유저 아이콘만 */}
              <Link
                href="/login"
                className="flex items-center justify-center w-6 h-6 md:hidden"
                aria-label="로그인"
              >
                {/* TODO: <UserIcon /> — 아이콘 컴포넌트 완성 후 교체 */}
                <div className="w-6 h-6 rounded-full bg-outline-variant" aria-hidden="true" />
              </Link>

              {/* Tablet / PC: 로그인 링크 + 시작하기 버튼 */}
              <div className="hidden md:flex items-center gap-3 lg:gap-4">
                <Link
                  href="/login"
                  className="px-4 py-2 text-label-md-regular lg:text-body-sm text-on-background hover:opacity-70 transition-opacity keep-all"
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full bg-primary-container text-white hover:scale-105 transition-transform keep-all
                             px-6 py-2 text-label-md-regular
                             lg:px-8 lg:py-3 lg:text-body-sm"
                >
                  시작하기
                </Link>
              </div>
            </div>
          )}

          {/* ── 로그인 후 ── */}
          {isLoggedIn && (
            <div className="flex items-center gap-6">
              {/* TODO: <SettingsIconButton /> — #11 완성 후 교체 */}
              <div className="w-6 h-6 rounded bg-outline-variant" aria-hidden="true" />
              {/* TODO: <UserAvatarMenu /> — #11 완성 후 교체 */}
              <div className="w-6 h-6 rounded-full bg-outline-variant" aria-hidden="true" />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
