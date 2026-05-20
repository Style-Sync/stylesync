import { DomainSelectCard } from "./DomainSelectCard";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof DomainSelectCard> = {
  title: "Domain/DomainSelectCard",
  component: DomainSelectCard,
  tags: ["autodocs"],
  parameters: {
    backgrounds: { default: "stylesync" },
  },
  argTypes: {
    domain: {
      control: "select",
      options: ["music", "movie", "fashion"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DomainSelectCard>;

export const Music: Story = {
  args: {
    domain: "music",
  },
};

export const Movie: Story = {
  args: {
    domain: "movie",
  },
};

export const Fashion: Story = {
  args: {
    domain: "fashion",
  },
};

export const AllDomains: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 p-8 bg-background">
      <DomainSelectCard domain="music" />
      <DomainSelectCard domain="movie" />
      <DomainSelectCard domain="fashion" />
    </div>
  ),
};
