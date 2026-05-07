import { Header } from "./Header";

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

const meta: Meta<typeof Header> = {
  title: "Layout/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "stylesync" },
    docs: {
      story: {
        height: "80px",
      },
      description: {
        component: `
공통 헤더 컴포넌트입니다.

## 반응형 동작

| 구간 | 비로그인 | 로그인 후 |
|---|---|---|
| Mobile \`~767px\` | 로고 + 유저 아이콘 | 로고 + 유저 + 설정 아이콘 |
| Tablet \`768px~\` | 로고 + 로그인 + 시작하기 (12px) | 로고 + 유저 + 설정 아이콘 |
| PC \`1280px~\` | 로고 + 로그인 + 시작하기 (14px) | 로고 + 유저 + 설정 아이콘 |

## 디자인 스펙

- 배경: \`rgba(250, 249, 246, 0.8)\` + \`backdrop-filter: blur(24px)\`
- 높이: \`80px\` (전 구간 동일)
- 로고: Epilogue Black 24px / "Style" \`#1A1C1A\` · "Sync" \`#FF5C00\`
- 아이콘: 24×24px, stroke \`#1A1C1A\`

## 연관 이슈

- [#11 헤더 구현](https://github.com/Style-Sync/stylesync/issues/11)
- [#100 auth session store 구현](https://github.com/Style-Sync/stylesync/issues/100) — 로그인 상태 연결 예정
        `,
      },
    },
  },
  argTypes: {
    isLoggedIn: {
      control: "boolean",
      description: "로그인 상태 여부",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

/* ── Docs 기본 스토리 (Controls 패널로 상태 변경) ────────────── */

export const Default: Story = {
  name: "기본 (Controls로 상태 변경)",
  args: { isLoggedIn: false },
};

/* ── PC (1920px) ─────────────────────────────────────────────── */

export const PC_비로그인: Story = {
  name: "PC · 비로그인",
  args: { isLoggedIn: false },
  parameters: { viewport: { defaultViewport: "pc1920" } },
};

export const PC_로그인후: Story = {
  name: "PC · 로그인 후",
  args: { isLoggedIn: true },
  parameters: { viewport: { defaultViewport: "pc1920" } },
};

/* ── Tablet (768px) ──────────────────────────────────────────── */

export const Tablet_비로그인: Story = {
  name: "Tablet · 비로그인",
  args: { isLoggedIn: false },
  decorators: [withWidth(768)],
  parameters: { viewport: { defaultViewport: "tablet768" } },
};

export const Tablet_로그인후: Story = {
  name: "Tablet · 로그인 후",
  args: { isLoggedIn: true },
  decorators: [withWidth(768)],
  parameters: { viewport: { defaultViewport: "tablet768" } },
};

/* ── Mobile (390px) ──────────────────────────────────────────── */

export const Mobile_비로그인: Story = {
  name: "Mobile · 비로그인",
  args: { isLoggedIn: false },
  decorators: [withWidth(390)],
  parameters: { viewport: { defaultViewport: "mobile390" } },
};

export const Mobile_로그인후: Story = {
  name: "Mobile · 로그인 후",
  args: { isLoggedIn: true },
  decorators: [withWidth(390)],
  parameters: { viewport: { defaultViewport: "mobile390" } },
};
