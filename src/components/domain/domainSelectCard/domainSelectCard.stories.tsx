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
    selected: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DomainSelectCard>;

export const Music: Story = {
  args: {
    domain: "music",
    selected: false,
  },
};

export const Movie: Story = {
  args: {
    domain: "movie",
    selected: false,
  },
};

export const Fashion: Story = {
  args: {
    domain: "fashion",
    selected: false,
  },
};

export const MusicSelected: Story = {
  args: {
    domain: "music",
    selected: true,
  },
};

export const MovieSelected: Story = {
  args: {
    domain: "movie",
    selected: true,
  },
};

export const FashionSelected: Story = {
  args: {
    domain: "fashion",
    selected: true,
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

export const AllDomainsSelected: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 p-8 bg-background">
      <DomainSelectCard domain="music" selected />
      <DomainSelectCard domain="movie" selected />
      <DomainSelectCard domain="fashion" selected />
    </div>
  ),
};
