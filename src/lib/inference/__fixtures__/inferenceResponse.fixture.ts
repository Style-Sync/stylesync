import type { InferenceResponse } from "../inference.types";

export const baseResponse: InferenceResponse = {
  styleLabel: {
    title: "Melancholic Indie",
    description: "감성적인 기타 리프와 몽환적인 보컬이 교차하는 서정적 인디 팝",
    themeColor: "#dce8f0",
    mood: { energy: "low", tone: "neutral", aesthetic: "indie" },
  },
  music: [
    { id: "track:001", name: "Cherry Wine", artist: "Hozier", image: "/img/1", previewUrl: null },
    {
      id: "track:002",
      name: "Motion Sickness",
      artist: "Phoebe Bridgers",
      image: "/img/2",
      previewUrl: null,
    },
  ],
  movie: [
    { id: 1001, title: "비포 선라이즈", posterPath: "/before-sunrise.jpg", genres: ["로맨스"] },
    { id: 1002, title: "이터널 선샤인", posterPath: "/eternal-sunshine.jpg", genres: ["SF"] },
  ],
  fashion: [
    { keyword: "oversized denim jacket", image: "/fashion/1" },
    { keyword: "striped knit sweater", image: "/fashion/2" },
  ],
};

export const responseWithDuplicates: InferenceResponse = {
  ...baseResponse,
  music: [
    { id: "track:001", name: "Cherry Wine", artist: "Hozier", image: "/img/1", previewUrl: null },
    {
      id: "track:001",
      name: "Cherry Wine (dup)",
      artist: "Hozier",
      image: "/img/1",
      previewUrl: null,
    },
    {
      id: "track:002",
      name: "Motion Sickness",
      artist: "Phoebe Bridgers",
      image: "/img/2",
      previewUrl: null,
    },
  ],
  movie: [
    { id: 1001, title: "비포 선라이즈", posterPath: "/before-sunrise.jpg", genres: ["로맨스"] },
    {
      id: 1001,
      title: "비포 선라이즈 (dup)",
      posterPath: "/before-sunrise.jpg",
      genres: ["로맨스"],
    },
  ],
  fashion: [
    { keyword: "oversized denim jacket", image: "/fashion/1" },
    { keyword: "oversized denim jacket", image: "/fashion/1" },
  ],
};

export const responseWithEmptyArrays: InferenceResponse = {
  ...baseResponse,
  music: [],
  movie: [],
  fashion: [],
};

export const responseWithLongFields: InferenceResponse = {
  ...baseResponse,
  styleLabel: {
    ...baseResponse.styleLabel,
    title: "A".repeat(40),
    description: "B".repeat(100),
  },
};

export const responseWithWhitespace: InferenceResponse = {
  ...baseResponse,
  music: [
    {
      id: "track:001",
      name: "  Cherry Wine  ",
      artist: "  Hozier  ",
      image: "/img/1",
      previewUrl: null,
    },
  ],
  movie: [
    {
      id: 1001,
      title: "  비포 선라이즈  ",
      posterPath: "  /before-sunrise.jpg  ",
      genres: ["로맨스"],
    },
  ],
  fashion: [{ keyword: "  oversized denim jacket  ", image: "/fashion/1" }],
};
