"use client";

import Link from "next/link";

import { SettingsIcon, UserIcon } from "@/components/ui/icons";

import type { IHeaderProps } from "./Header.types";

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
 * │  전 브레이크포인트: 로고 + 유저 아이콘 + 설정 아이콘          │
 * │  TODO: #100 auth session store 연결 후 isLoggedIn 제거       │
 * └─────────────────────────────────────────────────────────────┘
 *
 * @container 기반 반응형: md(768px), lg(1280px)
 * 배경: rgba(250,249,246,0.8) + blur(24px) / 높이: 80px (전 구간 동일)
 */
export const Header = ({ isLoggedIn = false }: IHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full @container">
      <div
        style={{
          background: "rgba(250, 249, 246, 0.8)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        <nav className="flex h-[80px] items-center justify-between px-8">
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
                className="flex items-center justify-center w-6 h-6 @md:hidden text-on-background hover:opacity-70 transition-opacity"
                aria-label="로그인"
              >
                <UserIcon />
              </Link>

              {/* Tablet / PC: 로그인 링크 + 시작하기 버튼 */}
              <div className="hidden @md:flex items-center gap-3 @lg:gap-4">
                <Link
                  href="/login"
                  className="px-4 py-2 text-label-md-regular @lg:text-body-sm text-on-background hover:opacity-70 transition-opacity keep-all"
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full bg-primary-container text-white hover:scale-105 transition-transform keep-all
                             px-6 py-2 text-label-md-regular
                             @lg:px-8 @lg:py-3 @lg:text-body-sm"
                >
                  시작하기
                </Link>
              </div>
            </div>
          )}

          {/* ── 로그인 후 ── */}
          {isLoggedIn && (
            <div className="flex items-center gap-6">
              {/* 유저 아이콘 */}
              <Link
                href="/profile"
                className="flex items-center justify-center text-on-background hover:opacity-70 transition-opacity"
                aria-label="내 프로필"
              >
                <UserIcon />
              </Link>
              {/* 설정 아이콘 */}
              <Link
                href="/settings"
                className="flex items-center justify-center text-on-background hover:opacity-70 transition-opacity"
                aria-label="설정"
              >
                <SettingsIcon />
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
