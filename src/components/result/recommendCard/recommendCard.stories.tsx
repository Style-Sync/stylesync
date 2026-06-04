import { RecommendCard } from "./RecommendCard";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof RecommendCard> = {
  title: "Result/RecommendCard",
  component: RecommendCard,
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
type Story = StoryObj<typeof RecommendCard>;

// ── Music ─────────────────────────────────────────────────────────────────────

export const MusicDefault: Story = {
  args: {
    domain: "music",
    title: "Midnight City",
    subtitle: "더 신세틱 에코즈",
    previewUrl: "https://example.com/preview.mp3",
  },
};

export const MusicNoPreview: Story = {
  args: {
    domain: "music",
    title: "Velvet Rain",
    subtitle: "올리버 블루",
    previewUrl: null,
  },
};

export const MusicWithImage: Story = {
  args: {
    domain: "music",
    title: "After Hours",
    subtitle: "어반 멜랑콜리",
    imageUrl: "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452",
    previewUrl: "https://example.com/preview.mp3",
  },
};

// ── Movie ─────────────────────────────────────────────────────────────────────

export const MovieDefault: Story = {
  args: {
    domain: "movie",
    title: "SUBURBAN GHOSTS",
    label: "RECOMMENDATION 01",
    subtitle: "기억들 사이에 맺힌 고요한 순간들에 대한 시각적 시(詩).",
  },
};

export const MovieWithImage: Story = {
  args: {
    domain: "movie",
    title: "STATIC MEMORY",
    label: "RECOMMENDATION 02",
    subtitle: "잊혀진 것들이 되살아나는 순간.",
    imageUrl: "https://image.tmdb.org/t/p/w500/example.jpg",
  },
};

// ── Fashion ───────────────────────────────────────────────────────────────────

export const FashionDefault: Story = {
  args: {
    domain: "fashion",
    title: "인트로스펙티브 시크",
    subtitle: "레이어드 테일러링 & 린넨 실루엣",
  },
};

export const FashionWithImage: Story = {
  args: {
    domain: "fashion",
    title: "어스 톤 오버사이즈",
    subtitle: "뉴트럴 팔레트 & 와이드 핏",
    imageUrl: "https://images.unsplash.com/photo-example",
  },
};

// ── All Together ──────────────────────────────────────────────────────────────

export const AllDomains: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 p-8 bg-background">
      <RecommendCard
        domain="music"
        title="Midnight City"
        subtitle="더 신세틱 에코즈"
        previewUrl="https://example.com/preview.mp3"
      />
      <RecommendCard
        domain="movie"
        title="SUBURBAN GHOSTS"
        label="RECOMMENDATION 01"
        subtitle="기억들 사이에 맺힌 고요한 순간들에 대한 시각적 시(詩)."
      />
      <RecommendCard
        domain="fashion"
        title="인트로스펙티브 시크"
        subtitle="레이어드 테일러링 & 린넨 실루엣"
      />
    </div>
  ),
};
