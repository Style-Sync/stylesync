import { useState } from "react";

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

// ── 클릭 인터랙션 (클릭 시 selected 토글) ─────────────────────────────────────

export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    const cards = [
      { id: "weeknd", title: "The Weeknd", genre: "R&B / POP" },
      { id: "daftpunk", title: "Daft Punk", genre: "Electronic" },
      { id: "lana", title: "Lana Del Rey", genre: "Dream Pop" },
    ];
    return (
      <div className="flex flex-wrap gap-6 p-8 bg-background">
        {cards.map((card) => (
          <TasteCard
            key={card.id}
            domain="music"
            title={card.title}
            genre={card.genre}
            selected={selected === card.id}
            onClick={() => setSelected(selected === card.id ? null : card.id)}
          />
        ))}
      </div>
    );
  },
};
