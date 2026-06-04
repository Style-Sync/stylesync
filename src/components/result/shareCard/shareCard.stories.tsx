import { ShareCard } from "./ShareCard";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof ShareCard> = {
  title: "Result/ShareCard",
  component: ShareCard,
  tags: ["autodocs"],
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export default meta;
type Story = StoryObj<typeof ShareCard>;

const defaultMood = {
  energy: "low" as const,
  tone: "dark" as const,
  aesthetic: "indie" as const,
};

// ── Music Input ────────────────────────────────────────────────────────────────

export const MusicInput: Story = {
  args: {
    styleLabel: { title: "Cyberpunk Archivist", description: "디지털과 아날로그가 교차하는 감성." },
    themeColor: "#e6e6fa",
    mood: { energy: "high", tone: "dark", aesthetic: "experimental" },
    music: { title: "Starboy", artist: "The Weeknd" },
    movie: { title: "Blade Runner 2049" },
    fashion: { keyword: "Techwear" },
    username: "hoon730",
  },
};

// ── Movie Input ────────────────────────────────────────────────────────────────

export const MovieInput: Story = {
  args: {
    styleLabel: { title: "Neon Nomad", description: "경계 없이 떠도는 감성의 여행자." },
    themeColor: "#ffd6e0",
    mood: { energy: "mid", tone: "bright", aesthetic: "artistic" },
    music: { title: "Get Lucky", artist: "Daft Punk" },
    movie: { title: "Interstellar" },
    fashion: { keyword: "Minimal Futurism" },
    username: "stylesync",
  },
};

// ── Fashion Input ──────────────────────────────────────────────────────────────

export const FashionInput: Story = {
  args: {
    styleLabel: { title: "Romantic Surrealist", description: "꿈과 현실 사이의 아름다운 모순." },
    themeColor: "#ccf2e4",
    mood: defaultMood,
    music: { title: "Pink + White", artist: "Frank Ocean" },
    movie: { title: "Amélie" },
    fashion: { keyword: "Avant-garde" },
    username: "stylesync",
  },
};

// ── No User Info ───────────────────────────────────────────────────────────────

export const NoUserInfo: Story = {
  args: {
    styleLabel: { title: "Street Philosopher", description: "거리에서 철학을 찾는 사람." },
    themeColor: "#ffe4b5",
    mood: { energy: "high", tone: "neutral", aesthetic: "mainstream" },
    music: { title: "SICKO MODE", artist: "Travis Scott" },
    movie: { title: "Parasite" },
    fashion: { keyword: "Street" },
  },
};

// ── Minimal ────────────────────────────────────────────────────────────────────

export const Minimal: Story = {
  args: {
    styleLabel: { title: "Chill Explorer", description: "여유롭게 탐험하는 감성." },
    themeColor: "#d4edda",
    mood: { energy: "low", tone: "bright", aesthetic: "indie" },
  },
};

// ── 전체 비교 ──────────────────────────────────────────────────────────────────

export const AllDomains: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 p-8 bg-background">
      <ShareCard
        styleLabel={{
          title: "Cyberpunk Archivist",
          description: "디지털과 아날로그가 교차하는 감성.",
        }}
        themeColor="#e6e6fa"
        mood={{ energy: "high", tone: "dark", aesthetic: "experimental" }}
        music={{ title: "Starboy", artist: "The Weeknd" }}
        movie={{ title: "Blade Runner 2049" }}
        fashion={{ keyword: "Techwear" }}
        username="hoon730"
      />
      <ShareCard
        styleLabel={{ title: "Neon Nomad", description: "경계 없이 떠도는 감성의 여행자." }}
        themeColor="#ffd6e0"
        mood={{ energy: "mid", tone: "bright", aesthetic: "artistic" }}
        music={{ title: "Get Lucky", artist: "Daft Punk" }}
        movie={{ title: "Interstellar" }}
        fashion={{ keyword: "Minimal Futurism" }}
        username="stylesync"
      />
      <ShareCard
        styleLabel={{
          title: "Romantic Surrealist",
          description: "꿈과 현실 사이의 아름다운 모순.",
        }}
        themeColor="#ccf2e4"
        mood={{ energy: "low", tone: "dark", aesthetic: "indie" }}
        music={{ title: "Pink + White", artist: "Frank Ocean" }}
        movie={{ title: "Amélie" }}
        fashion={{ keyword: "Avant-garde" }}
        username="stylesync"
      />
    </div>
  ),
};
