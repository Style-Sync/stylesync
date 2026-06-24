import { StepIndicator } from "./StepIndicator";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof StepIndicator> = {
  title: "Layout/StepIndicator",
  component: StepIndicator,
  argTypes: {
    variant: {
      control: "select",
      options: ["active", "inactive", "completed"],
    },
    width: {
      control: "select",
      options: ["160", "220", "358", "full", undefined],
    },
  },
};

export default meta;

type Story = StoryObj<typeof StepIndicator>;

/** 기본 — width 미지정 (콘텐츠 크기, 최소 160px) */
export const Default: Story = {
  args: { current: 1, total: 2 },
};

/** Width 160px */
export const Width160: Story = {
  args: { current: 1, total: 2, width: "160" },
};

/** Width 220px */
export const Width220: Story = {
  args: { current: 1, total: 2, width: "220" },
};

/** Width 358px */
export const Width358: Story = {
  args: { current: 1, total: 2, width: "358" },
};

/** Width Full (부모 너비 100%) */
export const WidthFull: Story = {
  args: { current: 1, total: 2, width: "full" },
};

/** Active 상태 (진행 중) */
export const Active: Story = {
  args: { current: 1, total: 2, variant: "active", width: "358" },
};

/** Inactive 상태 (비활성) */
export const Inactive: Story = {
  args: { current: 0, total: 2, variant: "inactive", width: "358" },
};

/** Completed 상태 (완료) */
export const Completed: Story = {
  args: { current: 2, total: 2, variant: "completed", width: "358" },
};
