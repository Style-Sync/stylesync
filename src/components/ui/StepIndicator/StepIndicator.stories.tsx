import { StepIndicator } from "./StepIndicator";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof StepIndicator> = {
  title: "Layout/StepIndicator",
  component: StepIndicator,
};

export default meta;

export const Test: StoryObj<typeof StepIndicator> = {
  args: { current: 1, total: 2 },
};
