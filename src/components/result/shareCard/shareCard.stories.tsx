import { ShareCard } from "./ShareCard";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof ShareCard> = {
  title: "Result/ShareCard",
  component: ShareCard,
  tags: ["autodocs"],
  parameters: {
    // Figma 기준: ShareCard는 dark(#1A1C1A) 배경 위에 표시
    backgrounds: { default: "dark" },
  },
  argTypes: {
    inputDomain: {
      control: "select",
      options: ["music", "movie", "fashion"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ShareCard>;

// ── Music Input ────────────────────────────────────────────────────────────────

export const MusicInput: Story = {
  args: {
    styleLabel: "STYLE IDENTITY",
    styleTitle: "Cyberpunk\nArchivist",
    inputDomain: "music",
    music: {
      title: "Starboy",
      artist: "The Weeknd",
    },
    movie: {
      title: "Blade Runner 2049",
    },
    fashion: {
      keyword: "Techwear",
    },
    username: "hoon730",
  },
};

// ── Movie Input ────────────────────────────────────────────────────────────────

export const MovieInput: Story = {
  args: {
    styleLabel: "STYLE IDENTITY",
    styleTitle: "Neon\nNomad",
    inputDomain: "movie",
    music: {
      title: "Get Lucky",
      artist: "Daft Punk",
    },
    movie: {
      title: "Interstellar",
    },
    fashion: {
      keyword: "Minimal Futurism",
    },
    username: "stylesync",
  },
};

// ── Fashion Input ──────────────────────────────────────────────────────────────

export const FashionInput: Story = {
  args: {
    styleLabel: "STYLE IDENTITY",
    styleTitle: "Romantic\nSurrealist",
    inputDomain: "fashion",
    music: {
      title: "Pink + White",
      artist: "Frank Ocean",
    },
    movie: {
      title: "Amélie",
    },
    fashion: {
      keyword: "Avant-garde",
    },
    username: "stylesync",
  },
};

// ── With Images ────────────────────────────────────────────────────────────────

export const WithImages: Story = {
  args: {
    styleLabel: "STYLE IDENTITY",
    styleTitle: "Cyberpunk\nArchivist",
    inputDomain: "music",
    music: {
      title: "Starboy",
      artist: "The Weeknd",
      imageUrl: "https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a",
    },
    movie: {
      title: "Blade Runner 2049",
      imageUrl: "https://image.tmdb.org/t/p/w92/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    },
    fashion: {
      keyword: "Techwear",
      imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&q=80",
    },
    username: "hoon730",
  },
};

// ── No User Info ───────────────────────────────────────────────────────────────

export const NoUserInfo: Story = {
  args: {
    styleLabel: "STYLE IDENTITY",
    styleTitle: "Street\nPhilosopher",
    inputDomain: "fashion",
    music: {
      title: "SICKO MODE",
      artist: "Travis Scott",
    },
    movie: {
      title: "Parasite",
    },
    fashion: {
      keyword: "Street",
    },
  },
};

// ── Minimal (no recommendations) ──────────────────────────────────────────────

export const Minimal: Story = {
  args: {
    styleTitle: "Chill\nExplorer",
    inputDomain: "music",
    username: "guest",
  },
};

// ── 전체 비교 ──────────────────────────────────────────────────────────────────

export const AllDomains: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 p-8 bg-background">
      <ShareCard
        styleLabel="STYLE IDENTITY"
        styleTitle={"Cyberpunk\nArchivist"}
        inputDomain="music"
        music={{ title: "Starboy", artist: "The Weeknd" }}
        movie={{ title: "Blade Runner 2049" }}
        fashion={{ keyword: "Techwear" }}
        username="hoon730"
      />
      <ShareCard
        styleLabel="STYLE IDENTITY"
        styleTitle={"Neon\nNomad"}
        inputDomain="movie"
        music={{ title: "Get Lucky", artist: "Daft Punk" }}
        movie={{ title: "Interstellar" }}
        fashion={{ keyword: "Minimal Futurism" }}
        username="stylesync"
      />
      <ShareCard
        styleLabel="STYLE IDENTITY"
        styleTitle={"Romantic\nSurrealist"}
        inputDomain="fashion"
        music={{ title: "Pink + White", artist: "Frank Ocean" }}
        movie={{ title: "Amélie" }}
        fashion={{ keyword: "Avant-garde" }}
        username="stylesync"
      />
    </div>
  ),
};
