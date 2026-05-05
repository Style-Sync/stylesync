import { Footer } from "./Footer";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Footer> = {
  title: "Layout/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "stylesync" },
    // inline: false → iframe 렌더링 → Tailwind media query가 iframe viewport 기준으로 작동
    docs: {
      story: {
        inline: false,
        height: "280px",
      },
      description: {
        component: `
공통 푸터 컴포넌트입니다.

## 반응형 동작

| 구간 | 레이아웃 | 패딩 | 브랜드 간격 |
|---|---|---|---|
| Mobile \`~767px\` | 세로 쌓임, 가운데 정렬 | \`px-4\` | \`20px\` |
| Tablet \`768px~\` | 가로 배치, 하단 정렬 | \`px-6 py-16\` | \`40px\` |
| PC \`1280px~\` | 가로 배치, 하단 정렬 | \`px-12 py-16\` | \`40px\` |

## 디자인 스펙

- 배경: \`#FAF9F6\`
- 상단 보더: \`1px solid #E9E8E5\`
- 높이: \`250px\` (전 구간 동일)
- 브랜드: Epilogue Black 30px / \`#1A1C1A\`
- 링크: Plus Jakarta Sans ExtraBold 12px / \`#5B4137\`

## 연관 이슈

- [#149 푸터 구현](https://github.com/Style-Sync/stylesync/issues/149)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

/* ── PC (1920px) ─────────────────────────────────────────────── */

export const PC: Story = {
  name: "PC · 1920px",
  parameters: {
    viewport: { defaultViewport: "pc1920" },
  },
};

/* ── Tablet (768px) ──────────────────────────────────────────── */

export const Tablet: Story = {
  name: "Tablet · 768px",
  parameters: {
    viewport: { defaultViewport: "tablet768" },
  },
};

/* ── Mobile (390px) ──────────────────────────────────────────── */

export const Mobile: Story = {
  name: "Mobile · 390px",
  parameters: {
    viewport: { defaultViewport: "mobile390" },
  },
};
