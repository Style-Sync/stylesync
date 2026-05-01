import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // ─── 반응형 브레이크포인트 (StyleSync 디자인 시스템 기준) ───────────────
    // Mobile-First: sm → md → lg → xl 순서로 작성
    // sm  390px  모바일   inner 여백 16px
    // md  768px  태블릿   inner 여백 36px
    // lg 1280px  데스크탑  inner 여백 120px
    // xl 1920px  와이드   최대 1440px 컨테이너
    screens: {
      sm:  "390px",
      md:  "768px",
      lg:  "1280px",
      xl:  "1920px",
    },
    extend: {
      colors: {
        // Core — CTA & Brand
        "primary-container": "#FF5C00",
        "primary": "#A73A00",
        "on-primary": "#FFFFFF",
        // Background & Surface (3단계)
        "background": "#FAF9F6",
        "surface": "#FFFFFF",
        "surface-variant": "#F4F3F1",
        // Text
        "on-background": "#1A1C1A",
        "on-surface-variant": "#5B4137",
        // Border
        "outline-variant": "#E4BEB1",
        // Inverse (공유카드·다크 컨텍스트)
        "inverse-surface": "#2F312F",
        // State
        "error": "#BA1A1A",
        // Special
        "neon-cyan": "#00F3FF",
        "scrim": "#000000",
        // Overlay — 카드 hover, 미묘한 배경 (black 5%)
        "surface-overlay": "rgba(0,0,0,0.05)",
      },
      fontFamily: {
        "headline": ["Epilogue", "Noto Sans KR", "sans-serif"],
        "body": ["Plus Jakarta Sans", "Noto Sans KR", "sans-serif"],
        "label": ["Plus Jakarta Sans", "Noto Sans KR", "sans-serif"],
        "korean": ["Noto Sans KR", "sans-serif"],
        "mono": ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        // Display — 대형 히어로 텍스트 (Epilogue Black)
        "display-lg": ["72px", { lineHeight: "72px", letterSpacing: "-0.05em" }],
        "display-md": ["60px", { lineHeight: "60px", letterSpacing: "-0.05em" }],
        "display-sm": ["48px", { lineHeight: "48px", letterSpacing: "-0.05em" }],
        // Headline — 페이지/섹션 제목 (Epilogue Black)
        "headline-lg": ["36px", { lineHeight: "40px", letterSpacing: "-0.05em" }],
        "headline-md": ["30px", { lineHeight: "36px", letterSpacing: "-0.04em" }],
        "headline-sm": ["24px", { lineHeight: "32px", letterSpacing: "-0.05em" }],
        // Title — UI 제목 (Plus Jakarta Sans Bold / Noto Sans KR Bold)
        "title-lg": ["20px", { lineHeight: "28px", letterSpacing: "-0.02em" }],
        "title-md": ["18px", { lineHeight: "28px", letterSpacing: "0" }],
        "title-sm": ["16px", { lineHeight: "24px", letterSpacing: "0" }],
        // Body — 본문 (Plus Jakarta Sans / Noto Sans KR)
        "body-lg": ["18px", { lineHeight: "28px", letterSpacing: "0" }],
        "body-md": ["16px", { lineHeight: "24px", letterSpacing: "0" }],
        "body-sm": ["14px", { lineHeight: "20px", letterSpacing: "0" }],
        // Label — 배지, 태그, 버튼 라벨 (Noto Sans KR Bold, uppercase)
        "label-lg": ["14px", { lineHeight: "20px", letterSpacing: "0.1em" }],
        "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.1em" }],
        "label-sm": ["10px", { lineHeight: "15px", letterSpacing: "0.1em" }],
        // Label variants — uppercase 없음 (일반 소형 텍스트)
        "label-md-regular": ["12px", { lineHeight: "16px", letterSpacing: "0" }],
        "label-xs":          ["10px", { lineHeight: "15px", letterSpacing: "0" }],
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px",
      },
      letterSpacing: {
        kerning: "-0.04em",
      },
    },
  },
  plugins: [],
};
export default config;
