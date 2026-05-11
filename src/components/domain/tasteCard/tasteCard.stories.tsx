import { TasteCard } from "./TasteCard";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof TasteCard> = {
  title: "Domain/TasteCard",
  component: TasteCard,
  tags: ["autodocs"],
  parameters: {
    backgrounds: { default: "stylesync" },
  },
  argTypes: {
    domain: {
      control: "select",
      options: ["music", "movie"],
    },
    selected: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TasteCard>;

// ── Music ─────────────────────────────────────────────────────────────────────

export const MusicDefault: Story = {
  args: {
    domain: "music",
    title: "The Weeknd",
    genre: "R&B / POP",
    selected: false,
  },
};

export const MusicSelected: Story = {
  args: {
    domain: "music",
    title: "Daft Punk",
    genre: "Electronic",
    selected: true,
  },
};

// ── Movie ─────────────────────────────────────────────────────────────────────

export const MovieDefault: Story = {
  args: {
    domain: "movie",
    title: "Parasite",
    genre: "Thriller",
    selected: false,
  },
};

export const MovieSelected: Story = {
  args: {
    domain: "movie",
    title: "Interstellar",
    genre: "Sci-Fi",
    selected: true,
  },
};

// ── 전체 비교 ─────────────────────────────────────────────────────────────────

export const AllDefault: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 p-8 bg-background">
      <TasteCard domain="music" title="The Weeknd" genre="R&B / POP" />
      <TasteCard domain="movie" title="Parasite" genre="Thriller" />
    </div>
  ),
};

export const AllSelected: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 p-8 bg-background">
      <TasteCard domain="music" title="The Weeknd" genre="R&B / POP" selected />
      <TasteCard domain="movie" title="Parasite" genre="Thriller" selected />
    </div>
  ),
};
