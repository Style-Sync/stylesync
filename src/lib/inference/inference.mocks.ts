import type { InferenceResponse } from "./inference.types";

// ─── Music ────────────────────────────────────────────────────────────────────

export const mockMusicInferenceResponse: InferenceResponse = {
  styleLabel: "인디 멜랑꼴리",
  description:
    "감성적인 기타 리프와 몽환적인 보컬이 교차하는 인디 팝의 서정성. 고요한 도시의 밤과 개인적인 감상이 어우러지는 공간에서 자신만의 미학을 완성합니다.",
  music: [
    {
      id: "spotify:track:mock001",
      name: "Cherry Wine",
      artist: "Hozier",
      image: "https://placehold.co/300x300/1a1c1a/faf9f6",
      previewUrl: "https://p.scdn.co/mp3-preview/mock001",
    },
    {
      id: "spotify:track:mock002",
      name: "Motion Sickness",
      artist: "Phoebe Bridgers",
      image: "https://placehold.co/300x300/1a1c1a/faf9f6",
      previewUrl: null,
    },
    {
      id: "spotify:track:mock003",
      name: "Moon Song",
      artist: "Phoebe Bridgers",
      image: "https://placehold.co/300x300/1a1c1a/faf9f6",
      previewUrl: "https://p.scdn.co/mp3-preview/mock003",
    },
  ],
  movie: [
    {
      id: 1001,
      title: "비포 선라이즈",
      posterPath: "/mock/before-sunrise.jpg",
      genres: ["로맨스", "드라마"],
    },
    {
      id: 1002,
      title: "이터널 선샤인",
      posterPath: "/mock/eternal-sunshine.jpg",
      genres: ["로맨스", "SF", "드라마"],
    },
  ],
  fashion: [
    {
      id: "fashion:mock001",
      name: "오버사이즈 데님 재킷",
      image: "https://placehold.co/400x500/f4f3f1/1a1c1a",
      price: 89000,
      link: "https://stylesync.example.com/shop/mock001",
    },
    {
      id: "fashion:mock002",
      name: "스트라이프 니트 스웨터",
      image: "https://placehold.co/400x500/f4f3f1/1a1c1a",
      price: 65000,
      link: "https://stylesync.example.com/shop/mock002",
    },
  ],
};
