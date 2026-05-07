import { Button } from "./Button";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    backgrounds: { default: "stylesync" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "지금 시작하기",
  },
};

export const Dark: Story = {
  args: {
    variant: "dark",
    children: "다음으로",
  },
};

export const Light: Story = {
  args: {
    variant: "light",
    children: "이전으로",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    children: "선택해주세요",
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    variant: "primary",
    children: "스타일 분석 시작하기",
    fullWidth: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8 max-w-sm">
      <Button variant="primary">지금 시작하기</Button>
      <Button variant="dark">다음으로</Button>
      <Button variant="light">이전으로</Button>
      <Button variant="primary" disabled>
        선택해주세요
      </Button>
    </div>
  ),
};
