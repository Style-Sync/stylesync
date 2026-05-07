import Link from "next/link";

const FOOTER_LINKS = [
  { label: "개인정보 처리방침", href: "/privacy" },
  { label: "이용약관", href: "/terms" },
  { label: "문의하기", href: "/contact" },
] as const;

/**
 * 공통 푸터 컴포넌트 — Figma: StyleSync-v2 / node 391:1477
 *
 * ┌───────────────────────────────────────────────────────────┐
 * │  Mobile  (<md)  : flex-col, 세로 중앙정렬, px-4           │
 * │                   브랜드 gap 20px, 링크 아래 배치          │
 * │  Tablet  (md~)  : flex-row, items-end, px-6 py-16        │
 * │                   브랜드 gap 40px                          │
 * │  PC      (lg~)  : flex-row, items-end, px-12 py-16       │
 * │                   브랜드 gap 40px                          │
 * │  공통: h-[250px], border-t #E9E8E5, bg #FAF9F6           │
 * └───────────────────────────────────────────────────────────┘
 *
 * @container 기반 반응형: md(768px), lg(1280px)
 */
export const Footer = () => {
  return (
    <footer className="w-full border-t border-[#E9E8E5] bg-background @container">
      <div
        className="
          flex h-[250px] w-full
          flex-col items-start justify-center gap-8 px-4
          @md:flex-row @md:items-end @md:justify-between @md:gap-0 @md:px-6 @md:py-16
          @lg:px-12
        "
      >
        {/* ── 왼쪽: 브랜드 + 카피라이트 ── */}
        <div className="flex flex-col gap-5 @md:gap-10">
          <span className="font-headline font-black text-headline-md tracking-tighter text-on-background">
            StyleSync
          </span>
          <div className="flex flex-col gap-2">
            <p
              className="text-label-md-regular @md:text-body-sm"
              style={{ color: "rgba(91, 65, 55, 0.4)" }}
            >
              © 2026 STYLESYNC. All rights reserved.
            </p>
            <p
              className="text-label-md-regular @md:text-body-sm uppercase tracking-widest"
              style={{ color: "rgba(91, 65, 55, 0.3)" }}
            >
              A VISUAL CURATION ENGINE FOR MODERN IDENTITIES.
            </p>
          </div>
        </div>

        {/* ── 오른쪽: 링크 ── */}
        <div className="flex items-center gap-3">
          {FOOTER_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="font-label font-extrabold text-label-md uppercase tracking-widest text-on-surface-variant hover:text-primary-container transition-colors py-1 keep-all"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
