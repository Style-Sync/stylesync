import { Footer } from "./Footer";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

/** 컨테이너 폭을 고정해 @container 쿼리가 정확히 반응하게 만드는 데코레이터 */
const withWidth = (width: number) =>
  function WidthWrapper(Story: React.ComponentType) {
    return (
      <div style={{ width: `${width}px`, overflow: "hidden" }}>
        <Story />
      </div>
    );
  };

const meta: Meta<typeof Footer> = {
  title: "Layout/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "stylesync" },
    docs: {
      story: {
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
  decorators: [withWidth(1440)],
  parameters: { viewport: { defaultViewport: "pc1920" } },
};

/* ── Tablet (768px) ──────────────────────────────────────────── */

export const Tablet: Story = {
  name: "Tablet · 768px",
  decorators: [withWidth(768)],
  parameters: { viewport: { defaultViewport: "tablet768" } },
};

/* ── Mobile (390px) ──────────────────────────────────────────── */

export const Mobile: Story = {
  name: "Mobile · 390px",
  decorators: [withWidth(390)],
  parameters: { viewport: { defaultViewport: "mobile390" } },
};
