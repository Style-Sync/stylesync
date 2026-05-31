import { ArrowRight, RefreshCw, Share2 } from "lucide-react";

import { Button } from "./Button";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    backgrounds: { default: "stylesync" },
    docs: {
      description: {
        component: `
공통 버튼 컴포넌트입니다. 전 페이지에서 사용됩니다.

## Variants
| Variant | 용도 |
|---|---|
| \`primary\` | 주요 CTA — 오렌지 배경 |
| \`stroke\` | 보조 액션 — 아웃라인 |
| \`dark\` | 다크 컨텍스트 (예: Google 로그인) |
| \`light\` | 밝은 카드 위 — 흰 배경 + 그림자 |
| \`ghost\` | 텍스트 전용 인라인 액션 |

## Sizes
| Size | Height | Font | 용도 |
|---|---|---|---|
| \`sm\` | 48px | 14px Medium | 소형 인라인, 소셜 공유 |
| \`md\` | auto (py-5) | 18px Regular | 기본 CTA |
| \`lg\` | auto (py-10) | 20px Bold | 히어로 CTA |
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "stroke", "dark", "light", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: "primary", size: "md", children: "지금 시작하기" },
};

export const PrimaryWithIcon: Story = {
  name: "Primary · 아이콘",
  args: {
    variant: "primary",
    size: "md",
    children: "지금 시작하기",
    icon: <ArrowRight size={16} />,
  },
};

export const Stroke: Story = {
  args: { variant: "stroke", size: "md", children: "둘러보기" },
};

export const Dark: Story = {
  args: { variant: "dark", size: "sm", children: "Google로 시작하기" },
};

export const Light: Story = {
  args: {
    variant: "light",
    size: "sm",
    children: "Instagram 공유",
    icon: <Share2 size={20} />,
    iconPosition: "left",
  },
};

export const Ghost: Story = {
  args: { variant: "ghost", size: "sm", children: "나중에 할게요 →" },
};

export const HeroCTA: Story = {
  name: "Hero CTA · lg",
  args: {
    variant: "primary",
    size: "lg",
    children: "첫 취향 분석 시작하기",
    icon: <ArrowRight size={24} />,
  },
};

export const FullWidth: Story = {
  args: {
    variant: "primary",
    size: "md",
    fullWidth: true,
    children: "메일함으로 이동",
    icon: <ArrowRight size={16} />,
  },
};

export const StrokeFullWidth: Story = {
  name: "Stroke · Full Width",
  args: {
    variant: "stroke",
    size: "md",
    fullWidth: true,
    children: "메일 다시 받기",
    icon: <RefreshCw size={16} />,
    iconPosition: "right",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "선택해주세요",
    disabled: true,
  },
};

export const AllVariants: Story = {
  name: "전체 Variants",
  render: () => (
    <div className="flex flex-col gap-4 p-8 max-w-sm">
      <Button variant="primary" icon={<ArrowRight size={16} />}>
        지금 시작하기
      </Button>
      <Button variant="stroke">둘러보기</Button>
      <Button variant="dark" size="sm">
        Google로 시작하기
      </Button>
      <Button variant="light" size="sm" icon={<Share2 size={20} />} iconPosition="left">
        Instagram 공유
      </Button>
      <Button variant="ghost" size="sm">
        나중에 할게요 →
      </Button>
      <Button variant="primary" disabled>
        선택해주세요
      </Button>
    </div>
  ),
};
