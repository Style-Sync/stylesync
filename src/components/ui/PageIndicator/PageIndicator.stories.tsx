import { useState } from "react";

import { PageIndicator } from "./PageIndicator";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";


const meta: Meta<typeof PageIndicator> = {
  title: "Layout/PageIndicator",
  component: PageIndicator,
  tags: ["autodocs"],
  parameters: {
    backgrounds: { default: "stylesync" },
  },
  argTypes: {
    total: { control: { type: "number", min: 1 } },
    current: { control: { type: "number", min: 0 } },
  },
};

export default meta;

type Story = StoryObj<typeof PageIndicator>;

export const Default: Story = {
  args: { total: 4, current: 0 },
};

export const Middle: Story = {
  args: { total: 4, current: 1 },
};

export const Last: Story = {
  args: { total: 4, current: 3 },
};

export const FivePages: Story = {
  args: { total: 5, current: 2 },
};

export const ManyPages: Story = {
  args: { total: 7, current: 3 },
};

export const AllSteps: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8">
      <PageIndicator total={4} current={0} />
      <PageIndicator total={4} current={1} />
      <PageIndicator total={4} current={2} />
      <PageIndicator total={4} current={3} />
    </div>
  ),
};

export const Clickable: Story = {
  render: () => {
    const [page, setPage] = useState(0);

    return (
      <div className="flex flex-col items-start gap-4 p-8">
        <PageIndicator total={4} current={page} onChange={setPage} />

        <span className="text-sm text-neutral-500">현재 페이지: {page + 1} / 4</span>
      </div>
    );
  },
};
